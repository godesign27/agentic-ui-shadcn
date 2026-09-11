import React from 'react';
import { F, ZDS, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar } from '../../atomic/ai-avatar/AIAvatar';
import { AIUserBubble } from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIThinkingIndicator, AIGettingInfoIndicator } from '../../atomic/ai-loading-indicators/AILoadingIndicators';
import { AIPatternMessage, type UserMsg, type LoadingMsg, type AIMsg } from '../../_support/AIResponsePatterns';
import { AIInputCard, AIDialogSlim } from '../ai-dialog/AIDialog';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { RiFileTextLine, RiArrowRightUpLine, RiPulseLine, RiLightbulbLine, RiSparklingLine, RiDraggable, RiSidebarFoldLine, RiSidebarUnfoldLine, RiHistoryLine } from '@remixicon/react';
import { useAIChat } from '../../_support/useAIChat';

export type QuickSuggestion = string | { icon: React.ElementType; label: string };

// Hanging-panel chrome dimensions — used for clamping drag bounds.
const HANGING_WIDTH  = 360;
const HANGING_HEIGHT = 520;

// ── Types ─────────────────────────────────────────────────────────────────────
export type AgentDrawerVariant = 'default' | 'focused-dialog' | 'hanging-panel';

/**
 * Header surface treatment. Orthogonal to `variant` (which drives the input
 * widget + panel chrome), so any variant can pair with either tone.
 * - 'light' → default card-surface header (the established AI look).
 * - 'dark'  → inverse brand-ink bar with white title + icons, mirroring the
 *             AISupervisorBar `tone: 'dark'` / AIMenu `inverse` pattern.
 */
export type AgentDrawerHeaderTone = 'light' | 'dark';

/**
 * Per-tone header token map. Light reads the existing card/divider CSS vars and
 * ZDS neutrals; dark reads AI brand tokens + white-alpha overlays so the whole
 * bar re-themes when the ai-tokens ramp moves. No brand hex is hardcoded here.
 */
const HEADER_TONE: Record<AgentDrawerHeaderTone, {
  bg: string; borderBottom: string; titleColor: string;
  iconResting: string; iconHoverBg: string; iconHoverColor: string; iconHoverBorder: string;
}> = {
  light: {
    bg:             'var(--ai-card-bg)',
    borderBottom:   '1px solid var(--ai-divider)',
    titleColor:     ZDS.textDefault,
    iconResting:    ZDS.iconDefault,
    iconHoverBg:    'var(--ai-btn-outline-hover-bg)',
    iconHoverColor: ZDS.textDefault,
    iconHoverBorder: ZDS.border,
  },
  dark: {
    bg:             AI.color.brandInk,
    borderBottom:   '1px solid rgba(255,255,255,0.14)',
    titleColor:     AI.color.text.onAction,
    iconResting:    'rgba(255,255,255,0.82)',
    iconHoverBg:    'rgba(255,255,255,0.12)',
    iconHoverColor: AI.color.text.onAction,
    iconHoverBorder: 'rgba(255,255,255,0.24)',
  },
};

export interface AIAgentDrawerProps {
  title?:            string;
  greeting?:         string;
  quickSuggestions?: QuickSuggestion[];
  width?:            number;
  /** When true, renders a self-contained demo shell with a Chat trigger button */
  showTrigger?:      boolean;
  /**
   * Drawer chrome + input form.
   * - 'default'        → docked side panel + AIInputCard (multi-line + full toolbar).
   * - 'focused-dialog' → docked side panel + AIDialogSlim (single-line pill).
   * - 'hanging-panel'  → floating panel (draggable, rounded, shadowed) + AIDialogSlim.
   *                      Header shows a grab handle (left) and a dock icon (right).
   */
  variant?:          AgentDrawerVariant;
  /** Header surface treatment — 'light' (default) or 'dark' inverse brand-ink bar. Orthogonal to `variant`. */
  headerTone?:       AgentDrawerHeaderTone;
  /** Optional history / recent-chats affordance. When provided, a clock icon appears in the header (left of More options). */
  onHistory?:        () => void;
  /** Drag handle in the hanging-panel header. Pointer-down starts drag. */
  onDragHandlePointerDown?: (e: React.PointerEvent) => void;
  /** Dock-icon click handler (only relevant for the hanging panel variant — toggles dock/undock). */
  onDock?:           () => void;
  /** Whether the hanging-panel variant is currently docked. Drives the dock icon and grab handle visibility. */
  isDocked?:         boolean;
  onClose?:          () => void;
  onMoreOptions?:    () => void;
}

// ── Keyframes ─────────────────────────────────────────────────────────────────
function DrawerAnimStyles() {
  return (
    <style>{`
      @keyframes ai-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes ai-in   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      @keyframes ai-drawer-in {
        from { transform: translateX(40px); opacity: 0; }
        to   { transform: translateX(0);    opacity: 1; }
      }
    `}</style>
  );
}

// ── Quick suggestion chip (internal) ─────────────────────────────────────────
function SuggestionChip({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '5px 12px', borderRadius: '100px',
        background: hov ? 'var(--ai-chip-bg-hover)' : 'var(--ai-chip-bg)',
        border: hov ? '1.5px solid rgba(77, 96, 230,0.4)' : '1.5px solid var(--ai-chip-border)',
        cursor: 'pointer',
        color: hov ? AI.color.action.primary : ZDS.textDefault,
        whiteSpace: 'nowrap', transition: 'all 0.15s ease',
        fontFamily: F,
      }}
    >
      {label}
    </button>
  );
}

// ── Welcome message bubble ────────────────────────────────────────────────────
// The agent identity already lives in the drawer header (avatar + "ZAIDYN Agent"
// title), so the bubble shows only the greeting copy — no duplicated avatar/name.
function WelcomeBubble({ greeting }: { greeting: string }) {
  return (
    <div style={{
      background: 'var(--ai-card-bg)', borderRadius: '14px', padding: '14px 16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
      border: '1px solid rgba(26,22,40,0.09)',
    }}>
      <p style={{ margin: 0, fontFamily: F, fontSize: '14px', color: ZDS.textDefault, lineHeight: 1.65 }}>
        {greeting}
      </p>
    </div>
  );
}


/** Demo drawer content for bare mounts / galleries. */
export const SAMPLE_DRAWER_TITLE = 'ZAIDYN Agent';
export const SAMPLE_DRAWER_GREETING =
  'Hi Theo! I can help with your reports — summarize results, identify alignment trends, or suggest next actions. What would you like to explore?';
export const SAMPLE_DRAWER_SUGGESTIONS: QuickSuggestion[] = [
  { icon: RiFileTextLine,   label: 'Summarize my reports' },
  { icon: RiArrowRightUpLine, label: 'Identify Q1 trends' },
  { icon: RiPulseLine,   label: 'Compare alignments' },
  { icon: RiLightbulbLine,  label: 'Suggest improvements' },
];

// ── Main export ───────────────────────────────────────────────────────────────
export function AIAgentDrawer({
  title            = SAMPLE_DRAWER_TITLE,
  greeting         = SAMPLE_DRAWER_GREETING,
  quickSuggestions = SAMPLE_DRAWER_SUGGESTIONS,
  variant          = 'default',
  headerTone       = 'light',
  onHistory,
  onDragHandlePointerDown,
  onDock,
  isDocked         = false,
  onClose,
  onMoreOptions,
}: AIAgentDrawerProps) {
  const tone             = HEADER_TONE[headerTone];
  const useSlimInput     = variant === 'focused-dialog' || variant === 'hanging-panel';
  const isHangingVariant = variant === 'hanging-panel';
  const showDragHandle   = isHangingVariant && !isDocked;
  const showDockButton   = isHangingVariant;
  const { inputValue, setInputValue, messages, handleSend } = useAIChat();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const didMountRef    = React.useRef(false);

  React.useEffect(() => {
    // Skip the mount scroll — opening the drawer should NOT move the host
    // page. Only scroll on subsequent message updates, and constrain the
    // scroll to the nearest scroll container (the messages list) so it
    // never bubbles up to scroll the page.
    if (!didMountRef.current) { didMountRef.current = true; return; }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  return (
    <>
      <DrawerAnimStyles />
      <div
        role="complementary"
        aria-label={`${title} panel`}
        style={{
          display: 'flex', flexDirection: 'column',
          height: '100%', width: '100%',
          background: 'var(--ai-card-bg-raised)',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          height: '56px', padding: '0 18px',
          borderBottom: tone.borderBottom,
          flexShrink: 0, background: tone.bg,
        }}>
          <AIAvatar size={30} />
          <div style={{ flex: 1, minWidth: 0, fontFamily: F, ...AI_TYPOGRAPHY['@zsai-button-label'], color: tone.titleColor, letterSpacing: '-0.15px' }}>
            {title}
          </div>

          {/* Drag handle — hanging panel only, hidden once docked */}
          {showDragHandle && (
            <button
              onPointerDown={onDragHandlePointerDown}
              aria-label="Drag to move"
              title="Drag to move"
              style={{
                width: 28, height: 28, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: '1px solid transparent', cursor: 'grab',
                color: tone.iconResting, borderRadius: '6px', transition: 'all 0.12s',
                touchAction: 'none',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = tone.iconHoverBg; b.style.borderColor = tone.iconHoverBorder; b.style.color = tone.iconHoverColor; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.borderColor = 'transparent'; b.style.color = tone.iconResting; }}
            >
              <RiDraggable size={15} strokeWidth={2} />
            </button>
          )}

          {/* Dock / undock toggle — hanging panel only */}
          {showDockButton && (
            <button
              onClick={onDock}
              aria-label={isDocked ? 'Undock to floating panel' : 'Dock panel to the side'}
              title={isDocked ? 'Undock to floating' : 'Dock to side'}
              style={{
                width: 28, height: 28, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: '1px solid transparent', cursor: 'pointer',
                color: tone.iconResting, borderRadius: '6px', transition: 'all 0.12s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = tone.iconHoverBg; b.style.borderColor = tone.iconHoverBorder; b.style.color = tone.iconHoverColor; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.borderColor = 'transparent'; b.style.color = tone.iconResting; }}
            >
              {isDocked
                ? <RiSidebarUnfoldLine  size={15} strokeWidth={2} />
                : <RiSidebarFoldLine size={15} strokeWidth={2} />}
            </button>
          )}

          {/* History / recent chats — opt-in via onHistory (matches dark-header reference) */}
          {onHistory && (
            <button
              onClick={onHistory}
              aria-label="Chat history"
              title="Chat history"
              style={{
                width: 28, height: 28, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: '1px solid transparent', cursor: 'pointer',
                color: tone.iconResting, borderRadius: '6px', transition: 'all 0.12s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = tone.iconHoverBg; b.style.borderColor = tone.iconHoverBorder; b.style.color = tone.iconHoverColor; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.borderColor = 'transparent'; b.style.color = tone.iconResting; }}
            >
              <RiHistoryLine size={15} strokeWidth={2} />
            </button>
          )}

          {/* More options button */}
          <button
            onClick={onMoreOptions}
            aria-label="More options"
            style={{
              width: 28, height: 28, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: '1px solid transparent', cursor: 'pointer',
              color: tone.iconResting, borderRadius: '6px', transition: 'all 0.12s',
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = tone.iconHoverBg; b.style.borderColor = tone.iconHoverBorder; b.style.color = tone.iconHoverColor; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.borderColor = 'transparent'; b.style.color = tone.iconResting; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" />
            </svg>
          </button>

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              aria-label={`Close ${title} panel`}
              style={{
                width: 28, height: 28, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                color: tone.iconResting, borderRadius: '6px', transition: 'background 0.12s, color 0.12s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = tone.iconHoverBg; b.style.color = tone.iconHoverColor; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.color = tone.iconResting; }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Messages area ── */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <WelcomeBubble greeting={greeting} />

          {messages.map(msg => {
            if (msg.kind === 'user')    return <AIUserBubble key={msg.id} text={(msg as UserMsg).text} />;
            if (msg.kind === 'loading') {
              const v = (msg as LoadingMsg).variant;
              return v === 'thinking'
                ? <AIThinkingIndicator key={msg.id} />
                : <AIGettingInfoIndicator key={msg.id} />;
            }
            if (msg.kind === 'ai') return (
              <AIPatternMessage key={msg.id} pattern={(msg as AIMsg).pattern} userText={(msg as AIMsg).userText} />
            );
            return null;
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Quick suggestion chips (hidden once conversation starts) ── */}
        {messages.length === 0 && quickSuggestions.length > 0 && (
          <div style={{ padding: '10px 16px 6px', display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
            {quickSuggestions.map((chip, i) => {
              const label = typeof chip === 'string' ? chip : chip.label;
              const Icon  = typeof chip === 'string' ? RiSparklingLine : chip.icon;
              return (
                <AIButton
                  key={`${label}-${i}`}
                  variant="secondary"
                  size="sm"
                  icon={<Icon />}
                  label={label}
                  onClick={() => setInputValue(label)}
                />
              );
            })}
          </div>
        )}

        {/* ── Input ── */}
        <div style={{ padding: '8px 16px 20px', flexShrink: 0 }}>
          {useSlimInput ? (
            <AIDialogSlim inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} />
          ) : (
            <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={messages.length > 0} />
          )}
        </div>
      </div>
    </>
  );
}

// ── Self-contained demo shell with Chat trigger ───────────────────────────────
function AIAgentDrawerWithTrigger({
  title, greeting, quickSuggestions, width = 380, variant, headerTone, onHistory,
}: Omit<AIAgentDrawerProps, 'showTrigger' | 'onClose' | 'onMoreOptions'>) {
  const [open, setOpen] = React.useState(false);

  // Docked drawer width — user can grab the left edge and drag left to widen
  // or right to narrow. Clamped to a sensible minimum and to half the host
  // container's width so the page content always has room.
  const DOCK_MIN_WIDTH = 320;
  const [dockedWidth, setDockedWidth] = React.useState(width);
  const [isResizing,  setIsResizing]  = React.useState(false);
  React.useEffect(() => { setDockedWidth(width); }, [width]);

  const onResizePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const host = containerRef.current?.getBoundingClientRect();
    const startX = e.clientX;
    const startW = dockedWidth;
    const maxW = host ? Math.max(DOCK_MIN_WIDTH, Math.round(host.width * 0.7)) : 9999;
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev: PointerEvent) => {
      // Dragging the LEFT edge: moving the cursor LEFT (negative dx) widens
      // the drawer. delta = startX - clientX (positive when cursor moves left).
      const next = startW + (startX - ev.clientX);
      setDockedWidth(Math.max(DOCK_MIN_WIDTH, Math.min(maxW, Math.round(next))));
    };
    const onUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup',   onUp);
  };
  // When variant === 'hanging-panel', the panel opens floating by default; clicking dock toggles to docked.
  // Reset whenever the variant prop changes so switching state pills in the docs page picks up cleanly.
  const [docked, setDocked] = React.useState(variant !== 'hanging-panel');
  React.useEffect(() => { setDocked(variant !== 'hanging-panel'); }, [variant]);

  // Floating panel position (only used when variant='hanging-panel' AND !docked).
  // null = use default top-right offset until the user drags.
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const dragOffset = React.useRef<{ dx: number; dy: number } | null>(null);

  // Close handler — for the hanging variant, also resets dock state and drag position so
  // the next open returns to the floating panel rather than persisting the previous layout.
  const handleClose = React.useCallback(() => {
    setOpen(false);
    if (variant === 'hanging-panel') {
      setDocked(false);
      setPos(null);
    }
  }, [variant]);

  const onDragHandlePointerDown = (e: React.PointerEvent) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const panel = (e.currentTarget as HTMLElement).closest('[data-hanging-panel]') as HTMLElement | null;
    if (!containerRect || !panel) return;
    const panelRect = panel.getBoundingClientRect();
    dragOffset.current = {
      dx: e.clientX - panelRect.left,
      dy: e.clientY - panelRect.top,
    };
    setPos({ x: panelRect.left - containerRect.left, y: panelRect.top - containerRect.top });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const c = containerRef.current?.getBoundingClientRect();
      if (!c || !dragOffset.current) return;
      const PANEL_W = HANGING_WIDTH;
      const PANEL_H = HANGING_HEIGHT;
      const nx = Math.min(Math.max(0, ev.clientX - c.left - dragOffset.current.dx), c.width  - PANEL_W);
      const ny = Math.min(Math.max(0, ev.clientY - c.top  - dragOffset.current.dy), c.height - PANEL_H);
      setPos({ x: nx, y: ny });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      dragOffset.current = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const isHanging = variant === 'hanging-panel' && !docked;
  const DRAWER_WIDTH   = isHanging ? HANGING_WIDTH : dockedWidth;
  const HANGING_TOP    = 70;  // sits just under the fake topbar
  const HANGING_RIGHT  = 16;

  return (
    <>
      <DrawerAnimStyles />
      <style>{`
        @keyframes agent-drawer-slide-in {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>

      {/* Demo surface */}
      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: 'var(--background)', overflow: 'hidden', position: 'relative' }}>

        {/* Fake topbar row */}
        <div style={{
          height: '52px', background: 'var(--ai-card-bg)', borderBottom: '1px solid var(--ai-divider)',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px', flexShrink: 0, zIndex: 10,
        }}>
          {/* RiSearchLine icon stub — left side */}
          <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ai-zds-icon)', borderRadius: 6 }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13.5 13.5l3 3"/></svg>
          </button>

          <div style={{ flex: 1 }} />

          {/* Chat trigger button — right side */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close ZAIDYN Agent' : 'Open ZAIDYN Agent'}
            aria-expanded={open}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px 6px 9px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: open
                ? 'linear-gradient(135deg, #000000 0%, #2D2D2D 100%)'
                : 'linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%)',
              boxShadow: open
                ? '0 2px 10px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)'
                : '0 2px 10px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'all 0.18s ease', flexShrink: 0,
            }}
          >
            <AIAvatar size={22} />
            <span style={{ fontFamily: F, ...AI_TYPOGRAPHY['@zsai-button-label'], color: 'white', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>Chat</span>
          </button>
        </div>

        {/* Content row: page area + optional drawer */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Page content placeholder */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-color-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="var(--ai-zds-icon)" opacity="0.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="var(--ai-zds-icon)" opacity="0.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="var(--ai-zds-icon)" opacity="0.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="var(--ai-zds-icon)" opacity="0.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: F, fontSize: '13px', color: 'var(--ai-zds-icon)' }}>Product content</span>
          </div>

          {/* Docked drawer panel — slides in from right. Resize handle on
              the LEFT edge lets the user drag left to widen / right to narrow.
              Pointer events on the 6px handle take precedence over the
              underlying drawer content, so this can't interfere with the
              header drag handle (which lives on the hanging variant only). */}
          {open && !isHanging && (
            <div style={{
              width: DRAWER_WIDTH, flexShrink: 0,
              borderLeft: '1px solid var(--ai-divider)',
              height: '100%', overflow: 'hidden',
              position: 'relative',
              animationName: isResizing ? undefined : 'agent-drawer-slide-in',
              animationDuration: '0.28s',
              animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              animationFillMode: 'both',
            }}>
              <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize agent drawer"
                onPointerDown={onResizePointerDown}
                style={{
                  position: 'absolute', left: -3, top: 0, bottom: 0,
                  width: 6, cursor: 'ew-resize', zIndex: 5,
                  background: isResizing ? 'var(--ai-brand-text, #4252C7)' : 'transparent',
                  opacity: isResizing ? 0.4 : 1,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isResizing) (e.currentTarget as HTMLDivElement).style.background = 'rgba(77, 96, 230,0.2)';
                }}
                onMouseLeave={(e) => {
                  if (!isResizing) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              />
              <AIAgentDrawer
                title={title}
                greeting={greeting}
                quickSuggestions={quickSuggestions}
                variant={variant}
                headerTone={headerTone}
                onHistory={onHistory}
                isDocked={variant === 'hanging-panel' ? docked : undefined}
                onDock={variant === 'hanging-panel' ? () => setDocked(d => !d) : undefined}
                onClose={handleClose}
              />
            </div>
          )}
        </div>

        {/* Hanging floating panel — only when variant='hanging-panel' and not docked */}
        {open && isHanging && (
          <div
            data-hanging-panel
            style={{
              position: 'absolute',
              top: pos ? pos.y : HANGING_TOP,
              left: pos ? pos.x : undefined,
              right: pos ? undefined : HANGING_RIGHT,
              width: HANGING_WIDTH,
              height: HANGING_HEIGHT,
              background: 'var(--ai-card-bg-raised)',
              borderRadius: 12,
              boxShadow: '0 24px 60px rgba(15, 15, 30, 0.18), 0 8px 24px rgba(15, 15, 30, 0.12), 0 0 0 1px rgba(15, 15, 30, 0.06)',
              overflow: 'hidden',
              zIndex: 50,
              animationName: 'agent-drawer-slide-in',
              animationDuration: '0.22s',
              animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              animationFillMode: 'both',
            }}
          >
            <AIAgentDrawer
              title={title}
              greeting={greeting}
              quickSuggestions={quickSuggestions}
              variant={variant}
              headerTone={headerTone}
              onHistory={onHistory}
              isDocked={docked}
              onDragHandlePointerDown={onDragHandlePointerDown}
              onDock={() => setDocked(d => !d)}
              onClose={handleClose}
            />
          </div>
        )}
      </div>
    </>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
// Re-export the panel content and update the main export to route to the
// trigger-shell version when showTrigger=true.
export { AIAgentDrawer as AIAgentDrawerPanel };

// Override the default export to wrap with trigger when requested
const AIAgentDrawerExport = function AIAgentDrawer_({
  showTrigger, ...rest
}: AIAgentDrawerProps) {
  if (showTrigger) {
    return <AIAgentDrawerWithTrigger {...rest} />;
  }
  return <AIAgentDrawer {...rest} />;
};
AIAgentDrawerExport.displayName = 'AIAgentDrawer';

export { AIAgentDrawerExport as AIAgentDrawerDemo };
export default AIAgentDrawer;
