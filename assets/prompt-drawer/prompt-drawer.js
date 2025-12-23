/**
 * Prompt Drawer - A right-side drawer for browsing and copying prompts
 * Hotkeys: Cmd+L / Ctrl+L or Cmd+K / Ctrl+K (Mac/Windows/Linux)
 */

class PromptDrawer {
  constructor() {
    this.isOpen = false;
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
        <div class="prompt-drawer-sidebar">
          <div class="prompt-drawer-loading">Loading prompts...</div>
          <div class="prompt-drawer-error" style="display: none;"></div>
          <div class="prompt-drawer-list"></div>
        </div>
        <div class="prompt-drawer-content">
          <div class="prompt-drawer-empty">
            <p>Select a prompt to view its content</p>
          </div>
          <div class="prompt-drawer-prompt" style="display: none;">
            <div class="prompt-drawer-prompt-header">
              <h3 class="prompt-drawer-prompt-title"></h3>
              <button class="prompt-drawer-copy" type="button">Copy Prompt</button>
            </div>
            <div class="prompt-drawer-prompt-body">
              <pre class="prompt-drawer-prompt-content"></pre>
            </div>
          </div>
        </div>
      </div>
    `;

    // Close button handler
    const closeBtn = this.drawer.querySelector('.prompt-drawer-close');
    closeBtn.addEventListener('click', () => this.close());

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

      // ESC to close
      if (e.key === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
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
    const focusableElements = this.drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.drawer.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      if (e.key === 'Tab') {
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
      const response = await fetch('/prompts/PROMPTS_INDEX.json');
      if (!response.ok) {
        throw new Error(`Failed to load prompts: ${response.status}`);
      }
      const data = await response.json();
      this.prompts = data.prompts || [];
      this.renderPrompts();
    } catch (error) {
      this.showError('Prompts could not be loaded. Serve this repo via a local web server.');
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
    const listEl = this.drawer.querySelector('.prompt-drawer-list');
    loadingEl.style.display = 'none';

    // Group by category
    const categories = {};
    this.prompts.forEach(prompt => {
      if (!categories[prompt.category]) {
        categories[prompt.category] = [];
      }
      categories[prompt.category].push(prompt);
    });

    // Render categories
    listEl.innerHTML = Object.keys(categories).map(category => {
      const prompts = categories[category];
      return `
        <div class="prompt-drawer-category">
          <h3 class="prompt-drawer-category-title">${category}</h3>
          <ul class="prompt-drawer-category-list">
            ${prompts.map(prompt => `
              <li>
                <button 
                  class="prompt-drawer-item" 
                  data-prompt-id="${prompt.id}"
                  type="button"
                >
                  <span class="prompt-drawer-item-title">${prompt.title}</span>
                  <span class="prompt-drawer-item-desc">${prompt.description}</span>
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }).join('');

    // Add click handlers
    listEl.querySelectorAll('.prompt-drawer-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptId = btn.getAttribute('data-prompt-id');
        this.selectPrompt(promptId);
      });
    });
  }

  async selectPrompt(promptId) {
    const prompt = this.prompts.find(p => p.id === promptId);
    if (!prompt) return;

    this.selectedPrompt = prompt;

    // Update active state
    this.drawer.querySelectorAll('.prompt-drawer-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-prompt-id') === promptId);
    });

    // Show loading
    const emptyEl = this.drawer.querySelector('.prompt-drawer-empty');
    const promptEl = this.drawer.querySelector('.prompt-drawer-prompt');
    const contentEl = this.drawer.querySelector('.prompt-drawer-prompt-content');
    emptyEl.style.display = 'none';
    promptEl.style.display = 'block';
    contentEl.textContent = 'Loading...';

    // Update title
    this.drawer.querySelector('.prompt-drawer-prompt-title').textContent = prompt.title;

    // Load prompt content
    try {
      const response = await fetch(prompt.file);
      if (!response.ok) {
        throw new Error(`Failed to load prompt: ${response.status}`);
      }
      const content = await response.text();
      contentEl.textContent = content;
    } catch (error) {
      contentEl.textContent = `Error loading prompt: ${error.message}`;
      console.error('Failed to load prompt content:', error);
    }
  }

  copyPrompt() {
    if (!this.selectedPrompt) return;

    const contentEl = this.drawer.querySelector('.prompt-drawer-prompt-content');
    const text = contentEl.textContent;

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
    this.overlay.setAttribute('aria-hidden', 'false');
    this.drawer.setAttribute('aria-hidden', 'false');
    this.overlay.classList.add('active');
    this.drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first element
    const firstBtn = this.drawer.querySelector('.prompt-drawer-close');
    if (firstBtn) firstBtn.focus();
  }

  close() {
    this.isOpen = false;
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

