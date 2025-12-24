/**
 * Prompt Drawer - Cards + Takeover View
 * Hotkeys: Cmd/Ctrl+L or Cmd/Ctrl+K
 */

class PromptDrawer {
  constructor() {
    this.isOpen = false;
    this.view = 'list'; // 'list' or 'detail'
    this.prompts = [];
    this.selectedPrompt = null;
    this.drawer = null;
    this.overlay = null;
    this.init();
  }

  init() {
    this.createDrawer();
    this.setupHotkeys();
    this.setupClickTriggers();
    this.loadPrompts();
  }

  createDrawer() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'prompt-drawer-overlay';
    this.overlay.setAttribute('aria-hidden', 'true');
    this.overlay.addEventListener('click', () => this.close());

    // Create drawer container
    this.drawer = document.createElement('div');
    this.drawer.className = 'prompt-drawer';
    this.drawer.setAttribute('role', 'dialog');
    this.drawer.setAttribute('aria-labelledby', 'prompt-drawer-title');
    this.drawer.setAttribute('aria-hidden', 'true');

    // Create drawer content
    this.drawer.innerHTML = `
      <div class="prompt-drawer-header">
        <h2 id="prompt-drawer-title">Prompt Library</h2>
        <button class="prompt-drawer-close" aria-label="Close drawer" type="button">×</button>
      </div>
      <div class="prompt-drawer-body">
        <div class="prompt-drawer-list-view">
          <div class="prompt-drawer-loading">Loading prompts...</div>
          <div class="prompt-drawer-error" style="display: none;"></div>
          <div class="prompt-drawer-cards"></div>
        </div>
        <div class="prompt-drawer-detail-view" style="display: none;">
          <div class="prompt-drawer-detail-header">
            <button class="prompt-drawer-back" type="button">← Back</button>
            <h3 class="prompt-drawer-detail-title"></h3>
            <button class="prompt-drawer-close-detail" aria-label="Close drawer" type="button">×</button>
          </div>
          <div class="prompt-drawer-detail-content">
            <div class="prompt-drawer-detail-description"></div>
            <pre class="prompt-drawer-detail-text"></pre>
          </div>
          <div class="prompt-drawer-detail-footer">
            <button class="prompt-drawer-copy" type="button">Copy Prompt</button>
          </div>
        </div>
      </div>
    `;

    // Close button handlers
    const closeBtn = this.drawer.querySelector('.prompt-drawer-close');
    closeBtn.addEventListener('click', () => this.close());
    
    const closeDetailBtn = this.drawer.querySelector('.prompt-drawer-close-detail');
    closeDetailBtn.addEventListener('click', () => this.close());

    // Back button handler
    const backBtn = this.drawer.querySelector('.prompt-drawer-back');
    backBtn.addEventListener('click', () => this.showList());

    // Copy button handler
    const copyBtn = this.drawer.querySelector('.prompt-drawer-copy');
    copyBtn.addEventListener('click', () => this.copyPrompt());

    // Add to DOM
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.drawer);

    // Focus trap
    this.setupFocusTrap();
  }

  setupHotkeys() {
    document.addEventListener('keydown', (e) => {
      // Ignore shortcuts when typing in form elements
      const target = e.target;
      const isFormElement = target.tagName === 'INPUT' || 
                           target.tagName === 'TEXTAREA' || 
                           target.tagName === 'SELECT' ||
                           target.isContentEditable;
      
      if (isFormElement) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      
      // Only handle if Cmd/Ctrl is pressed, ignore other modifiers
      if (!modifier || e.shiftKey || e.altKey) {
        return;
      }
      
      // Cmd/Ctrl+L or Cmd/Ctrl+K to toggle
      if ((e.key === 'l' || e.key === 'k') && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        this.toggle();
        return;
      }

      // ESC to close or go back
      if (e.key === 'Escape' && this.isOpen) {
        e.preventDefault();
        if (this.view === 'detail') {
          this.showList();
        } else {
          this.close();
        }
      }
    });
  }

  setupClickTriggers() {
    // Delegated click handler for data-open-prompt-drawer attribute
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-prompt-drawer]');
      if (trigger) {
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        }
      }
    });
  }

  setupFocusTrap() {
    this.drawer.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      if (e.key === 'Tab') {
        const focusableElements = this.drawer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const visibleElements = Array.from(focusableElements).filter(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });
        
        if (visibleElements.length === 0) return;
        
        const firstElement = visibleElements[0];
        const lastElement = visibleElements[visibleElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  async loadPrompts() {
    try {
      const response = await fetch('/public/prompts/PROMPTS_INDEX.json');
      if (!response.ok) {
        throw new Error(`Failed to load prompts: ${response.status}`);
      }
      const data = await response.json();
      this.prompts = data.prompts || [];
      this.renderPrompts();
    } catch (error) {
      this.showError('Serve via a local web server; file:// won\'t work.');
      console.error('Failed to load prompts:', error);
    }
  }

  showError(message) {
    const loadingEl = this.drawer.querySelector('.prompt-drawer-loading');
    const errorEl = this.drawer.querySelector('.prompt-drawer-error');
    loadingEl.style.display = 'none';
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  renderPrompts() {
    const loadingEl = this.drawer.querySelector('.prompt-drawer-loading');
    const cardsEl = this.drawer.querySelector('.prompt-drawer-cards');
    loadingEl.style.display = 'none';

    // Group by category
    const categories = {};
    this.prompts.forEach(prompt => {
      if (!categories[prompt.category]) {
        categories[prompt.category] = [];
      }
      categories[prompt.category].push(prompt);
    });

    // Render categories and cards
    cardsEl.innerHTML = Object.keys(categories).map(category => {
      const prompts = categories[category];
      return `
        <div class="prompt-drawer-category">
          <h3 class="prompt-drawer-category-title">${category}</h3>
          <div class="prompt-drawer-cards-grid">
            ${prompts.map(prompt => `
              <button 
                class="prompt-drawer-card" 
                data-prompt-id="${prompt.id}"
                type="button"
              >
                <div class="prompt-drawer-card-title">${prompt.title}</div>
                <div class="prompt-drawer-card-description">${prompt.description}</div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Add click handlers
    cardsEl.querySelectorAll('.prompt-drawer-card').forEach(card => {
      card.addEventListener('click', () => {
        const promptId = card.getAttribute('data-prompt-id');
        this.showDetail(promptId);
      });
    });
  }

  async showDetail(promptId) {
    const prompt = this.prompts.find(p => p.id === promptId);
    if (!prompt) return;

    this.selectedPrompt = prompt;
    this.view = 'detail';

    // Update active state
    this.drawer.querySelectorAll('.prompt-drawer-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-prompt-id') === promptId);
    });

    // Show detail view, hide list view
    const listView = this.drawer.querySelector('.prompt-drawer-list-view');
    const detailView = this.drawer.querySelector('.prompt-drawer-detail-view');
    
    // Hide list view completely (this will hide all elements inside it including loading)
    listView.style.display = 'none';
    detailView.style.display = 'flex';
    
    // Ensure any loading/error elements are hidden (in case they're somehow visible)
    const allLoadingEls = this.drawer.querySelectorAll('.prompt-drawer-loading');
    const allErrorEls = this.drawer.querySelectorAll('.prompt-drawer-error');
    allLoadingEls.forEach(el => el.style.display = 'none');
    allErrorEls.forEach(el => el.style.display = 'none');

    // Update detail header
    const titleEl = this.drawer.querySelector('.prompt-drawer-detail-title');
    const descEl = this.drawer.querySelector('.prompt-drawer-detail-description');
    const textEl = this.drawer.querySelector('.prompt-drawer-detail-text');
    
    titleEl.textContent = prompt.title;
    descEl.textContent = prompt.description;
    textEl.textContent = 'Loading...';

    // Focus back button
    const backBtn = this.drawer.querySelector('.prompt-drawer-back');
    backBtn.focus();

    // Load prompt content
    try {
      const response = await fetch(prompt.file);
      if (!response.ok) {
        throw new Error(`Failed to load prompt: ${response.status}`);
      }
      const content = await response.text();
      textEl.textContent = content;
    } catch (error) {
      textEl.textContent = `Error loading prompt: ${error.message}`;
      console.error('Failed to load prompt content:', error);
    }
  }

  showList() {
    this.view = 'list';
    const listView = this.drawer.querySelector('.prompt-drawer-list-view');
    const detailView = this.drawer.querySelector('.prompt-drawer-detail-view');
    listView.style.display = 'block';
    detailView.style.display = 'none';
    
    // Focus first card
    const firstCard = this.drawer.querySelector('.prompt-drawer-card');
    if (firstCard) firstCard.focus();
  }

  copyPrompt() {
    if (!this.selectedPrompt) return;

    const textEl = this.drawer.querySelector('.prompt-drawer-detail-text');
    const text = textEl.textContent;

    navigator.clipboard.writeText(text).then(() => {
      const copyBtn = this.drawer.querySelector('.prompt-drawer-copy');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    });
  }

  open() {
    this.isOpen = true;
    this.view = 'list';
    this.overlay.setAttribute('aria-hidden', 'false');
    this.drawer.setAttribute('aria-hidden', 'false');
    this.overlay.classList.add('active');
    this.drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show list view
    const listView = this.drawer.querySelector('.prompt-drawer-list-view');
    const detailView = this.drawer.querySelector('.prompt-drawer-detail-view');
    listView.style.display = 'block';
    detailView.style.display = 'none';
    
    // Focus first element
    const firstCard = this.drawer.querySelector('.prompt-drawer-card');
    if (firstCard) {
      firstCard.focus();
    } else {
      const closeBtn = this.drawer.querySelector('.prompt-drawer-close');
      if (closeBtn) closeBtn.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.view = 'list';
    this.overlay.setAttribute('aria-hidden', 'true');
    this.drawer.setAttribute('aria-hidden', 'true');
    this.overlay.classList.remove('active');
    this.drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.promptDrawer = new PromptDrawer();
  });
} else {
  window.promptDrawer = new PromptDrawer();
}

// Expose global method for manual opening
window.openPromptDrawer = () => {
  if (window.promptDrawer) {
    window.promptDrawer.open();
  }
};

