import React, { useEffect, useRef, useState } from 'react';
import { F, AI, COMPANION_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar } from '../../atomic/ai-avatar/AIAvatar';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AILedNavVariant =
  | 'default'
  | 'collapsed'
  | 'workspace-focused'
  | 'agent-focused'
  | 'product-embedded'
  | 'minimal';

export type AILedNavState =
  | 'default'
  | 'nested-open'
  | 'loading-recents'
  | 'empty-recents'
  | 'permission-restricted';

export type AILedNavItemType =
  | 'action'
  | 'workspace'
  | 'project'
  | 'conversation'
  | 'agent'
  | 'app'
  | 'artifact'
  | 'dashboard'
  | 'setting';

export interface AILedNavItem {
  id:                  string;
  label:               string;
  icon?:               string;             // zs-icon name (without prefix), e.g. 'chat'
  type?:               AILedNavItemType;
  href?:               string;
  selected?:           boolean;
  disabled?:           boolean;
  badge?:              string;             // e.g. 'NEW', '12'
  children?:           AILedNavItem[];
  pinned?:             boolean;
  recent?:             boolean;
  tooltip?:            string;
  permissionRequired?: boolean;
  onClick?:            () => void;
}

export interface AILedNavGroup {
  id:        string;
  label?:    string;
  items:     AILedNavItem[];
  collapsible?: boolean;
}

export interface AILedNavigationProps {
  brandLabel?:        string;
  brandIcon?:         React.ReactNode;
  currentWorkspace?:  { id: string; label: string; tone?: 'ai' | 'tan' };
  primaryActions?:    AILedNavItem[];
  workspaceGroups?:   AILedNavGroup[];
  pinnedItems?:       AILedNavItem[];
  recentItems?:       AILedNavItem[];
  user?:              { initials: string; name: string; subtitle: string };
  variant?:           AILedNavVariant;
  state?:             AILedNavState;
  selectedItemId?:    string;
  collapsed?:         boolean;
  onToggleCollapse?:  () => void;
  onItemSelect?:      (item: AILedNavItem) => void;
  onNewChat?:         () => void;
  onSearch?:          (query: string) => void;
}

// ─── Default content (shared by demos + Full Page gallery) ────────────────────

export const DEFAULT_NAV_CONFIG = {
  brandLabel: 'Guild AI',
  currentWorkspace: { id: 'ws-a', label: 'Workspace Name A', tone: 'ai' as const },
  primaryActions: [
    { id: 'new-chat', label: 'New chat', icon: 'chat',         type: 'action' as const },
    { id: 'search',   label: 'RiSearchLine',   icon: 'search',       type: 'action' as const },
    { id: 'library',  label: 'Library',  icon: 'doc-generic',  type: 'action' as const },
    { id: 'agents',   label: 'Agents',   icon: 'team',         type: 'action' as const, badge: 'NEW' },
    { id: 'apps',     label: 'Apps',     icon: 'app-nav',      type: 'action' as const },
  ] as AILedNavItem[],
  workspaceGroups: [
    {
      id: 'projects',
      label: 'Projects',
      items: [
        { id: 'new-project', label: 'New project', icon: 'add',           type: 'action' as const },
        {
          id: 'project-a', label: 'Project A', icon: 'folder-closed', type: 'project' as const,
          children: [
            { id: 'chat-a', label: 'Chat A', selected: true },
            { id: 'chat-b', label: 'Chat B' },
            { id: 'chat-c', label: 'Chat C' },
            { id: 'chat-d', label: 'Chat D' },
            { id: 'chat-e', label: 'Chat E' },
          ],
        },
        { id: 'project-b', label: 'Project B', icon: 'folder-closed', type: 'project' as const },
        { id: 'project-c', label: 'Project C', icon: 'folder-closed', type: 'project' as const, permissionRequired: true },
      ],
    },
  ] as AILedNavGroup[],
  pinnedItems: [
    { id: 'pin-a', label: 'Pinned A', icon: 'folder-closed', pinned: true },
    { id: 'pin-b', label: 'Pinned B', icon: 'folder-closed', pinned: true },
  ] as AILedNavItem[],
  recentItems: [
    { id: 'r-a', label: 'Chat Name A', recent: true },
    { id: 'r-b', label: 'Chat Name B', recent: true },
    { id: 'r-c', label: 'Chat Name C', recent: true },
    { id: 'r-d', label: 'Chat Name D', recent: true },
  ] as AILedNavItem[],
  user: { initials: 'UN', name: 'User Name', subtitle: 'Workspace · Plan' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AILedNavigation({
  brandLabel       = DEFAULT_NAV_CONFIG.brandLabel,
  brandIcon        = <AIAvatar size={22} />,
  currentWorkspace = DEFAULT_NAV_CONFIG.currentWorkspace,
  primaryActions   = DEFAULT_NAV_CONFIG.primaryActions,
  workspaceGroups  = DEFAULT_NAV_CONFIG.workspaceGroups,
  pinnedItems      = DEFAULT_NAV_CONFIG.pinnedItems,
  recentItems      = DEFAULT_NAV_CONFIG.recentItems,
  user             = DEFAULT_NAV_CONFIG.user,
  variant          = 'default',
  state            = 'default',
  selectedItemId,
  collapsed: collapsedProp,
  onToggleCollapse,
  onItemSelect,
  onSearch,
}: AILedNavigationProps) {
  // Resolve effective collapsed state: `variant="collapsed"` OR `collapsed` prop.
  const isCollapsed = collapsedProp ?? variant === 'collapsed';
  const width = isCollapsed ? 64 : 260;

  // Inline-search state — clicking the "RiSearchLine" primary row morphs that row
  // into an inline input (or a popover in collapsed mode) instead of just
  // firing onItemSelect. See SearchField below.
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const handleItemSelect = (item: AILedNavItem) => {
    if (item.id === 'search') { setSearchActive(true); return; }
    onItemSelect?.(item);
  };
  const dismissSearch = () => { setSearchActive(false); setSearchQuery(''); };
  const submitSearch  = (q: string) => { onSearch?.(q); dismissSearch(); };

  // Variant-specific content filters
  const showWorkspaces = variant === 'workspace-focused' || variant === 'default' || variant === 'product-embedded';
  const showAgents     = variant === 'agent-focused';
  const showProjects   = variant !== 'minimal' && variant !== 'workspace-focused' && variant !== 'agent-focused';
  const showPinned     = variant !== 'minimal' && variant !== 'collapsed';
  const showRecents    = variant !== 'collapsed';

  return (
    <nav
      role="navigation"
      aria-label="AI Led navigation"
      style={{
        position: 'relative',
        width,
        height: '100%',
        minHeight: 540,
        background: 'var(--ai-card-bg, #FFFFFF)',
        borderRight: '1px solid var(--ai-card-border, #E2E0E6)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: F,
        transition: 'width 0.18s ease',
        flexShrink: 0,
      }}
    >
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: isCollapsed ? '14px 12px' : '14px 16px',
        borderBottom: '1px solid var(--ai-card-border, #E2E0E6)',
        justifyContent: isCollapsed ? 'center' : undefined,
        // Reserve space for the absolutely-positioned toggle so the title
        // doesn't slide under it on narrow rails.
        paddingRight: !isCollapsed ? 44 : undefined,
      }}>
        {isCollapsed ? (
          // ChatGPT / Gemini pattern: collapsed rail shows only the brand
          // logo; hovering swaps in the expand icon + tooltip. No edge tab.
          <LogoToggleButton brandIcon={brandIcon} onClick={onToggleCollapse} />
        ) : (
          <>
            <span aria-hidden="true" style={{ flexShrink: 0 }}>{brandIcon}</span>
            <span style={{
              ...AI_TYPOGRAPHY['@ai-h5'],
              color: 'var(--ai-ds-text)',
              flex: 1, minWidth: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {variant === 'workspace-focused' || variant === 'agent-focused' ? currentWorkspace.label : brandLabel}
            </span>
          </>
        )}
      </div>

      {/* ── Toggle handle ── only rendered in the expanded state. The
            collapsed rail uses the logo-hover affordance above instead of
            an overhanging edge tab. */}
      {!isCollapsed && (
        <EdgeCollapseButton collapsed={false} onClick={onToggleCollapse} />
      )}

      {/* ── Workspace switcher — workspace-focused variant ONLY ── */}
      {!isCollapsed && variant === 'workspace-focused' && (
        <div style={{ padding: '10px 12px 6px' }}>
          <WorkspaceSwitcher label={currentWorkspace.label} />
        </div>
      )}

      {/* ── Body — scrollable ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: isCollapsed ? '8px 0' : '6px 8px' }}>
        {/* Primary actions */}
        <ItemList
          items={primaryActions}
          isCollapsed={isCollapsed}
          selectedItemId={selectedItemId ?? 'new-chat'}
          onItemSelect={handleItemSelect}
          permissionRestricted={state === 'permission-restricted'}
          searchActive={searchActive}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={submitSearch}
          onSearchDismiss={dismissSearch}
        />

        {/* Workspaces (workspace-focused variant) */}
        {showWorkspaces && variant === 'workspace-focused' && !isCollapsed && (
          <Section label="Workspaces">
            {[
              { id: 'ws-a', label: 'Workspace Name A', icon: 'folder-closed', selected: true },
              { id: 'ws-b', label: 'Workspace Name B', icon: 'folder-closed' },
              { id: 'ws-c', label: 'Workspace Name C', icon: 'folder-closed' },
              { id: 'ws-d', label: 'Workspace Name D', icon: 'folder-closed' },
              { id: 'ws-e', label: 'Workspace Name E', icon: 'folder-closed' },
            ].map((item) => (
              <NavItem key={item.id} item={item} isCollapsed={false} selectedItemId={item.selected ? item.id : undefined} onSelect={onItemSelect} />
            ))}
            <ShowMore />
          </Section>
        )}

        {/* Agents pinned list (agent-focused variant) */}
        {showAgents && !isCollapsed && (
          <Section label="Pinned Agents">
            {[
              { id: 'agent-a', label: 'Agent A', icon: 'ai-assist' },
              { id: 'agent-b', label: 'Agent B', icon: 'ai-assist' },
              { id: 'agent-c', label: 'Agent C', icon: 'ai-assist' },
            ].map((item) => (
              <NavItem key={item.id} item={item} isCollapsed={false} onSelect={onItemSelect} />
            ))}
          </Section>
        )}

        {/* Projects */}
        {showProjects && !isCollapsed && (
          <Section label="Projects">
            {workspaceGroups[0]?.items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isCollapsed={false}
                selectedItemId={selectedItemId ?? 'chat-a'}
                onSelect={onItemSelect}
                forceExpanded={state === 'nested-open' && item.id === 'project-a'}
                permissionRestricted={state === 'permission-restricted'}
              />
            ))}
          </Section>
        )}

        {/* Pinned */}
        {showPinned && pinnedItems.length > 0 && (
          <Section label={isCollapsed ? undefined : 'Pinned'}>
            {pinnedItems.map((item) => (
              <NavItem key={item.id} item={item} isCollapsed={isCollapsed} onSelect={onItemSelect} />
            ))}
          </Section>
        )}

        {/* Recents */}
        {showRecents && (
          <Section
            label={isCollapsed ? undefined : 'Recents'}
            icon={!isCollapsed ? 'clock-pending' : undefined}
          >
            {state === 'loading-recents' && !isCollapsed && (
              <>
                <SkeletonBar width="80%" />
                <SkeletonBar width="92%" />
                <SkeletonBar width="65%" />
                <SkeletonBar width="78%" />
              </>
            )}
            {state === 'empty-recents' && !isCollapsed && (
              <div style={{
                padding: '20px 12px',
                border: '1px dashed var(--ai-card-border, #E2E0E6)',
                borderRadius: AI.radius.sm,
                textAlign: 'center',
                margin: '4px 4px',
              }}>
                <span className="zs-master-style" style={{ display: 'inline-block', marginBottom: 6 }}>
                  <i className="zs-icon zs-icon-clock-pending" style={{ fontSize: 18, color: 'var(--ai-ds-helper)' }} aria-hidden="true" />
                </span>
                <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], fontWeight: 600, color: 'var(--ai-ds-text)' }}>
                  No recent activity
                </div>
                <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>
                  Start a new chat to see it appear here.
                </div>
              </div>
            )}
            {state !== 'loading-recents' && state !== 'empty-recents' && (
              recentItems.slice(0, isCollapsed ? 0 : 4).map((item) => (
                <NavItem key={item.id} item={item} isCollapsed={isCollapsed} quiet onSelect={onItemSelect} />
              ))
            )}
          </Section>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: isCollapsed ? '10px 12px' : '12px 14px',
        borderTop: '1px solid var(--ai-card-border, #E2E0E6)',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--ai-card-bg-raised, #F4F3F3)',
          color: 'var(--ai-ds-text)',
          ...AI_TYPOGRAPHY['@ai-meta-label'],
          fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {user.initials}
        </div>
        {!isCollapsed && (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], fontWeight: 600, color: 'var(--ai-ds-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </div>
              <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.subtitle}
              </div>
            </div>
            <button
              type="button"
              aria-label="Open settings"
              style={iconBtnStyle()}
            >
              <DsGlyph name="settings" size={15} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function DsGlyph({ name, size = 16, color }: { name: string; size?: number; color?: string }) {
  // `.zs-master-style` hard-codes `color: var(--zs-text-color, #2F2C3C)` on
  // its wrapper, which would mask the surrounding text color (and disappear
  // in dark mode). Force the span to `color: inherit` so the icon adopts the
  // parent button's color (which is `--ai-ds-text` and flips with the theme).
  return (
    <span
      className="zs-master-style"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}
    >
      <i className={`zs-icon zs-icon-${name}`} style={{ fontSize: size, lineHeight: 1, color: color ?? 'currentColor' }} aria-hidden="true" />
    </span>
  );
}

function iconBtnStyle(active = false): React.CSSProperties {
  return {
    width: 24, height: 24, borderRadius: 6,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: active ? 'var(--ai-brand-surface, rgba(77, 96, 230,0.08))' : 'transparent',
    color: active ? AI.color.brand : 'var(--ai-ds-helper)',
    border: 'none', cursor: 'pointer',
    flexShrink: 0,
  };
}

function CollapseButton({ collapsed, onClick }: { collapsed: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      aria-expanded={!collapsed}
      style={iconBtnStyle()}
    >
      <DsGlyph name="side-panel" size={15} />
    </button>
  );
}

// Collapsed-rail header affordance — mirrors the ChatGPT / Gemini pattern:
// the logo sits alone in the header until the user hovers, at which point
// it cross-fades into a side-panel expand glyph with a tooltip. Clicking
// expands the rail.
function LogoToggleButton({
  brandIcon, onClick,
}: { brandIcon: React.ReactNode; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    // The button is rendered inside a flex header with `justifyContent: center`.
    // The brand mark has a small amount of internal right-side
    // whitespace, which made it read as shifted right inside the 64px rail.
    // Nudge the whole control 6px left so the optical center of the logo
    // matches the optical center of the rail.
    <span style={{ position: 'relative', display: 'inline-flex', transform: 'translateX(-6px)' }}>
      {hov && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            left: 'calc(100% + 10px)', top: '50%', transform: 'translateY(-50%)',
            background: '#1A1628', color: '#FFFFFF',
            fontFamily: F, fontSize: 12, fontWeight: 600,
            padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          Open Side Navigation
        </span>
      )}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onFocus={() => setHov(true)}
        onBlur={() => setHov(false)}
        aria-label="Open side navigation"
        aria-expanded={false}
        style={{
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'pointer',
          width: 28, height: 28,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ai-ds-helper, #6B6876)',
          borderRadius: 6,
        }}
      >
        {/* Cross-fade: logo by default, expand glyph on hover/focus. Both
            occupy the same slot so the layout never reflows. */}
        <span
          aria-hidden="true"
          style={{
            position: 'relative',
            width: 22, height: 22,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            position: 'absolute', inset: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            opacity: hov ? 0 : 1, transition: 'opacity 0.12s ease',
          }}>
            {brandIcon}
          </span>
          <span style={{
            position: 'absolute', inset: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            opacity: hov ? 1 : 0, transition: 'opacity 0.12s ease',
            color: 'var(--ai-ds-text, #1A1628)',
          }}>
            <DsGlyph name="side-panel" size={16} />
          </span>
        </span>
      </button>
    </span>
  );
}

// Toggle handle. Always absolutely positioned at the same `top` so the icon
// stays put when the rail collapses/expands — only its horizontal position
// changes (in-header chip when expanded, overhanging edge tab when collapsed).
function EdgeCollapseButton({ collapsed, onClick }: { collapsed: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      aria-expanded={!collapsed}
      style={{
        position: 'absolute',
        top: 16,
        right: collapsed ? -13 : 12,
        zIndex: 2,
        width: 26,
        height: 26,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ai-card-bg, #FFFFFF)',
        border: collapsed ? '1px solid var(--ai-card-border, #E2E0E6)' : '1px solid transparent',
        borderRadius: 6,
        boxShadow: collapsed ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
        cursor: 'pointer',
        color: 'var(--ai-ds-helper, #6B6876)',
        padding: 0,
        transition: 'right 0.18s ease, border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <DsGlyph name="side-panel" size={14} />
    </button>
  );
}

function WorkspaceSwitcher({ label, subtitle }: { label: string; subtitle?: string }) {
  return (
    <button
      type="button"
      aria-label="Switch workspace"
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 10px',
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: AI.radius.sm,
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: AI.color.brand, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], fontWeight: 600, color: 'var(--ai-ds-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
        {subtitle && <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>{subtitle}</div>}
      </div>
      <DsGlyph name="carat-down" size={12} />
    </button>
  );
}

function Section({ label, icon, children }: { label?: string; icon?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 12 }}>
      {label && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px 4px',
          ...AI_TYPOGRAPHY['@ai-micro-eyebrow'],
          textTransform: 'uppercase' as const,
          color: 'var(--ai-ds-helper)',
        }}>
          {icon && <DsGlyph name={icon} size={11} />}
          {label}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {children}
      </div>
    </div>
  );
}

function ItemList({
  items, isCollapsed, selectedItemId, onItemSelect, permissionRestricted,
  searchActive, searchQuery, onSearchChange, onSearchSubmit, onSearchDismiss,
}: {
  items: AILedNavItem[]; isCollapsed: boolean; selectedItemId?: string;
  onItemSelect?: (item: AILedNavItem) => void; permissionRestricted?: boolean;
  searchActive?:   boolean;
  searchQuery?:    string;
  onSearchChange?: (q: string) => void;
  onSearchSubmit?: (q: string) => void;
  onSearchDismiss?: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 4 }}>
      {items.map((item) => {
        if (item.id === 'search' && searchActive) {
          return (
            <SearchField
              key={item.id}
              isCollapsed={isCollapsed}
              value={searchQuery ?? ''}
              onChange={onSearchChange ?? (() => {})}
              onSubmit={onSearchSubmit ?? (() => {})}
              onDismiss={onSearchDismiss ?? (() => {})}
            />
          );
        }
        return (
          <NavItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            selectedItemId={selectedItemId}
            onSelect={onItemSelect}
            permissionRestricted={permissionRestricted}
          />
        );
      })}
    </div>
  );
}

// Inline search row that swaps in for the "RiSearchLine" NavItem when active.
// Expanded variants: the row morphs in place (height-matched to NavItem so
// nothing shifts). Collapsed variant: a small popover floats to the right of
// the rail, anchored alongside where the icon would normally render.
function SearchField({
  isCollapsed, value, onChange, onSubmit, onDismiss,
}: {
  isCollapsed: boolean;
  value:       string;
  onChange:    (q: string) => void;
  onSubmit:    (q: string) => void;
  onDismiss:   () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef  = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Outside-click dismiss — collapsed popover only. In expanded mode the row
  // sits inline and dismissing on outside-click is too eager.
  useEffect(() => {
    if (!isCollapsed) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) onDismiss();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isCollapsed, onDismiss]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); onDismiss(); }
    else if (e.key === 'Enter') { e.preventDefault(); onSubmit(value); }
  };

  const Field = (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 8,
        height: 32,
        padding: '6px 8px 6px 10px',
        background: 'var(--ai-card-bg-raised, #F4F3F3)',
        borderRadius: 6,
        boxShadow: `inset 0 0 0 1px ${AI.color.brand}`,
      }}
    >
      <span style={{ color: 'var(--ai-ds-helper)', display: 'inline-flex', flexShrink: 0 }}>
        <DsGlyph name="search" size={15} />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder="RiSearchLine"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          flex: 1, minWidth: 0,
          border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'inherit',
          ...AI_TYPOGRAPHY['@ai-section-subtitle'],
          color: 'var(--ai-ds-text)',
          padding: 0,
        }}
      />
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close search"
        style={{
          background: 'none', border: 'none', padding: 2, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ai-ds-helper)', flexShrink: 0,
        }}
      >
        <DsGlyph name="close" size={12} />
      </button>
    </div>
  );

  if (!isCollapsed) {
    // Expanded morph — inline in the list flow.
    return Field;
  }

  // Collapsed popover — absolute, anchored just outside the 64px rail. The
  // wrapper preserves the row height so the surrounding gap math is identical
  // to NavItem; the popover floats outside the rail edge.
  return (
    <div style={{ position: 'relative', height: 32, margin: '2px auto', width: 40 }}>
      <div style={{
        position: 'absolute',
        left: 56,
        top: 0,
        width: 240,
        zIndex: 5,
        background: 'var(--ai-card-bg, #FFFFFF)',
        border: '1px solid var(--ai-card-border, #E2E0E6)',
        borderRadius: 8,
        boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        padding: 4,
      }}>
        {Field}
      </div>
    </div>
  );
}

function NavItem({
  item, isCollapsed, selectedItemId, onSelect, quiet, forceExpanded, permissionRestricted,
}: {
  item: AILedNavItem;
  isCollapsed: boolean;
  selectedItemId?: string;
  onSelect?: (item: AILedNavItem) => void;
  quiet?: boolean;
  forceExpanded?: boolean;
  permissionRestricted?: boolean;
}) {
  const [expanded, setExpanded] = useState<boolean>(forceExpanded ?? false);
  const [hov, setHov] = useState(false);
  const [tipPos, setTipPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isExpanded = forceExpanded ?? expanded;
  const isSelected = item.selected || item.id === selectedItemId;
  const isLocked   = permissionRestricted && item.permissionRequired;
  const isDisabled = item.disabled || isLocked;
  const hasChildren = !!item.children?.length;
  const showHover = hov && !isSelected && !isDisabled;
  // Custom dark-bubble tooltip for collapsed rows. Native `title` is
  // replaced by a styled bubble that escapes the rail body's `overflow: auto`
  // clip via `position: fixed` with computed coords. Mirrors the same
  // affordance pattern used by LogoToggleButton + ExpandButton.
  const showCollapsedTooltip = isCollapsed && hov;
  const captureTipPos = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setTipPos({ top: r.top + r.height / 2, left: r.right + 10 });
  };

  const handleClick = () => {
    if (isDisabled) return;
    if (hasChildren) setExpanded((e) => !e);
    onSelect?.(item);
    item.onClick?.();
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={() => { setHov(true); captureTipPos(); }}
        onMouseLeave={() => { setHov(false); setTipPos(null); }}
        onFocus={() => { setHov(true); captureTipPos(); }}
        onBlur={() => { setHov(false); setTipPos(null); }}
        aria-label={isCollapsed ? (item.tooltip ?? item.label) : undefined}
        aria-current={isSelected ? 'page' : undefined}
        aria-disabled={isDisabled || undefined}
        aria-expanded={hasChildren ? isExpanded : undefined}
        disabled={isDisabled}
        style={{
          position: 'relative',
          width: isCollapsed ? 40 : 'auto',
          height: 32,
          margin: isCollapsed ? '2px auto' : 0,
          padding: isCollapsed ? 0 : '6px 10px',
          display: 'flex', alignItems: 'center', gap: 10,
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          background: isSelected
            ? 'var(--ai-brand-surface, rgba(77, 96, 230,0.10))'
            : showHover
              ? 'var(--ai-card-bg-raised, #F4F3F3)'
              : 'transparent',
          border: 'none',
          borderRadius: 6,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          color: isLocked ? 'var(--ai-ds-helper)'
              : isSelected ? AI.color.brand
              : 'var(--ai-ds-text)',
          opacity: isDisabled && !isLocked ? 0.45 : (isLocked ? 0.5 : 1),
          textAlign: 'left',
          fontFamily: 'inherit',
          transition: 'background 0.12s ease',
        }}
      >
        {/* Selected accent rail */}
        {isSelected && !isCollapsed && (
          <span aria-hidden="true" style={{
            position: 'absolute', left: 0, top: 4, bottom: 4, width: 2,
            background: AI.color.brand, borderRadius: 2,
          }} />
        )}

        {item.icon && (
          <DsGlyph name={item.icon} size={15} color={isSelected ? AI.color.brand : undefined} />
        )}
        {!isCollapsed && (
          <>
            <span style={{
              flex: 1, minWidth: 0,
              ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              fontWeight: isSelected ? 600 : 400,
              opacity: quiet && !isSelected ? 0.85 : 1,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{item.label}</span>

            {isLocked && (
              <>
                <DsGlyph name="lock" size={12} color="var(--ai-ds-helper)" />
                <span style={{
                  ...AI_TYPOGRAPHY['@ai-action-link'],
                  color: 'var(--ai-ds-helper)',
                  background: 'var(--ai-card-bg-raised, #F4F3F3)',
                  padding: '2px 6px',
                  borderRadius: 999,
                  marginLeft: 4,
                }}>LOCKED</span>
              </>
            )}

            {item.badge && !isLocked && (
              <span style={{
                ...AI_TYPOGRAPHY['@ai-action-link'],
                color: AI.color.brand,
                background: 'var(--ai-brand-surface, rgba(77, 96, 230,0.10))',
                padding: '2px 7px',
                borderRadius: 999,
                marginLeft: 4,
              }}>{item.badge}</span>
            )}

            {hasChildren && (
              <span aria-hidden="true" style={{
                color: 'var(--ai-ds-helper)',
                transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.15s ease',
                display: 'inline-flex',
              }}>
                <DsGlyph name="carat-down" size={11} color="var(--ai-ds-helper)" />
              </span>
            )}
          </>
        )}
      </button>

      {/* Collapsed-rail tooltip — fixed-position so it escapes the rail
          body's `overflow: auto` clip. Suppressed when the row already
          carries a meaningful inline affordance (selected items already
          read as active; locked items carry their lock glyph elsewhere). */}
      {showCollapsedTooltip && tipPos && (
        <span
          role="tooltip"
          style={{
            position: 'fixed',
            top: tipPos.top, left: tipPos.left,
            transform: 'translateY(-50%)',
            background: '#1A1628', color: '#FFFFFF',
            fontFamily: F, fontSize: 12, fontWeight: 600,
            padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          {item.tooltip ?? item.label}
        </span>
      )}

      {/* Nested children */}
      {hasChildren && isExpanded && !isCollapsed && (
        <div style={{ paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {item.children!.map((child) => (
            <NavItem key={child.id} item={child} isCollapsed={false} selectedItemId={selectedItemId} onSelect={onSelect} quiet />
          ))}
        </div>
      )}
    </>
  );
}

function ShowMore() {
  return (
    <button type="button" style={{
      ...AI_TYPOGRAPHY['@ai-meta-label'],
      color: 'var(--ai-ds-helper)',
      background: 'transparent',
      border: 'none',
      padding: '4px 12px',
      cursor: 'pointer',
      textAlign: 'left',
    }}>
      Show more
    </button>
  );
}

function SkeletonBar({ width }: { width: string }) {
  return (
    <div style={{
      height: 10, width, margin: '6px 12px',
      borderRadius: 4,
      background: 'linear-gradient(90deg, #ECEDF1 0%, #F5F5F8 50%, #ECEDF1 100%)',
      backgroundSize: '200% 100%',
      animation: 'ai-led-nav-shimmer 1400ms ease-in-out infinite',
    }} />
  );
}

// Inject shimmer keyframes once
if (typeof document !== 'undefined' && !document.getElementById('ai-led-nav-keyframes')) {
  const style = document.createElement('style');
  style.id = 'ai-led-nav-keyframes';
  style.textContent = `
    @keyframes ai-led-nav-shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      [class*="ai-led-nav-shimmer"] { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default AILedNavigation;
