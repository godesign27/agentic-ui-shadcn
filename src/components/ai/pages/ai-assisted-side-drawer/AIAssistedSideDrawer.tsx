/**
 * AI Assisted Side Drawer — Page Pattern
 *
 * Two variants sharing the same ZAIDYN Agent interior content model:
 *   Standard  — persistent right-side drawer, resizable by grabbing the left edge
 *   Floating  — draggable floating panel that can be docked into the Standard drawer
 *
 * Resize (Standard only):
 *   Mouse: drag left edge • Keyboard: Arrow Left/Right, Shift+Arrow (large), Home/End
 *   Escape cancels an active drag. Double-click handle resets to default width.
 *   Min: max(320, 75% of default) • Max: min(640, 50vw)
 *
 * Docking:
 *   Floating panel → dock icon (RiSideBarLine) → Standard drawer (conversation preserved)
 *   Standard drawer → grip icon → Floating panel (optional, first-pass only)
 */

import React, { useState, useRef, useEffect } from 'react';
import { RiSendPlaneLine, RiCloseLine, RiSparklingLine, RiDraggable, RiSideBarLine } from '@remixicon/react';
import { AIAvatar } from '../../atomic/ai-avatar/AIAvatar';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ─────────────────────────────────────────────────────────────────────────────
// Local design tokens (mirrors ai-tokens.ts values for self-contained pattern)
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  brand:        '#4D60E6',
  brandSubtle:  'var(--ai-brand-surface-hover)',
  brandSurface: 'var(--ai-brand-surface)',
  brandBorder:  'var(--ai-brand-border)',
  brandStrong:  'var(--ai-brand-text)',
  gradBtn:      'linear-gradient(135deg, #4D60E6 0%, #3544A4 100%)',
  shadow:       { sm: '0 2px 8px rgba(26,22,40,0.10)', md: '0 8px 32px rgba(26,22,40,0.14)' },
  radius:       { full: '100px', lg: '20px', md: '12px', sm: '8px' },
  text:         { primary: 'var(--ai-zds-text)', secondary: 'var(--ai-zds-helper)' },
  border:       'var(--ai-card-border)',
};
const F = '"Open Sans", sans-serif';

const DEFAULT_WIDTH = 380;
const MIN_WIDTH     = Math.max(320, Math.round(DEFAULT_WIDTH * 0.75));
const FLOATING_W    = 360;
const FLOATING_H    = 480;

// ─────────────────────────────────────────────────────────────────────────────
// Chat types + hook
// ─────────────────────────────────────────────────────────────────────────────
interface Message  { id: number; role: 'user' | 'bot'; text: string; }
interface ChatState { messages: Message[]; input: string; setInput: (v: string) => void; send: () => void; loading: boolean; }

export const SEED_MESSAGES: Message[] = [
  { id: 1, role: 'bot', text: "Hi Theo! I can help with your reports — summarize results, identify alignment trends, or suggest next actions. What would you like to explore?" },
];

const QUICK_SUGGESTIONS = ['Summarize my reports', 'Identify Q1 trends', 'Compare alignments', 'Suggest improvements'];

export function useAIChat(seed: Message[] = []): ChatState {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);

  function send() {
    const text = input.trim();
    if (!text) return;
    const id = Date.now();
    setMessages(p => [...p, { id, role: 'user', text }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(p => [...p, {
        id: id + 1, role: 'bot',
        text: 'Based on your Q1 data, the Northeast region shows a 23% engagement uplift. Three territories in the Southwest are underutilized. Would you like a breakdown by team or account?',
      }]);
      setLoading(false);
    }, 1800);
  }

  return { messages, input, setInput, send, loading };
}

// ─────────────────────────────────────────────────────────────────────────────
// AITooltip — accessible tooltip following AI design system tokens
// Wraps any child; shows tooltip on hover and keyboard focus.
// ─────────────────────────────────────────────────────────────────────────────
function AITooltip({
  label,
  position = 'below',
  children,
}: {
  label:     string;
  position?: 'above' | 'below';
  children:  React.ReactNode;
}) {
  const [vis, setVis]     = useState(false);
  const reduced           = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}
      onMouseEnter={() => setVis(true)}
      onMouseLeave={() => setVis(false)}
      onFocusCapture={() => setVis(true)}
      onBlurCapture={() => setVis(false)}
    >
      {children}
      <div
        role="tooltip"
        aria-hidden={!vis}
        style={{
          position:     'absolute',
          ...(position === 'above'
            ? { bottom: 'calc(100% + 6px)' }
            : { top:    'calc(100% + 6px)' }),
          left:         '50%',
          transform:    'translateX(-50%)',
          pointerEvents:'none',
          zIndex:       400,
          background:   'rgba(26,22,40,0.88)',
          color:        '#fff',
          padding:      '4px 9px',
          borderRadius: '5px',
          fontSize:     '12px',
          fontFamily:   F,
          fontWeight:   500,
          whiteSpace:   'nowrap',
          lineHeight:   1.4,
          opacity:      vis ? 1 : 0,
          visibility:   vis ? 'visible' : 'hidden',
          transition:   reduced ? 'none' : 'opacity 0.12s ease',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeaderIconButton — accessible icon button with AI focus ring
// ─────────────────────────────────────────────────────────────────────────────
function HeaderIconButton({
  onClick,
  'aria-label': ariaLabel,
  children,
}: {
  onClick:      () => void;
  'aria-label': string;
  children:     React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        border:          'none',
        background:      hov ? T.brandSurface : 'transparent',
        cursor:          'pointer',
        padding:         4,
        borderRadius:    6,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
        outline:         foc ? `2px solid ${T.brand}` : 'none',
        outlineOffset:   '1px',
        transition:      'background 0.12s',
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Chat UI primitives
// ─────────────────────────────────────────────────────────────────────────────
function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
      <div style={{
        maxWidth: '80%', background: T.brandSurface,
        border: `1px solid ${T.brandBorder}`,
        borderRadius: '16px 16px 4px 16px',
        padding: '9px 13px', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-section-subtitle'],
        color: T.text.primary,
      }}>
        {text}
      </div>
    </div>
  );
}

function BotMessage({ text }: { text: string }) {
  // Agent identity already lives in the drawer header — bubbles no longer
  // carry their own avatar or "ZAIDYN Agent" label.
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        background: 'var(--ai-card-bg)',
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: '9px 13px', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-section-subtitle'],
        color: T.text.primary,
      }}>
        {text}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display: 'inline-flex', gap: 4, padding: '9px 13px',
        background: 'var(--ai-card-bg)', border: `1px solid ${T.border}`,
        borderRadius: 16,
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: T.brandStrong,
            display: 'inline-block',
            animation: `ai-dot-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <style>{`@keyframes ai-dot-pulse{0%,80%,100%{transform:scale(.75);opacity:.4}40%{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}

function ChatThread({ messages, loading }: { messages: Message[]; loading: boolean }) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 0' }}>
      {messages.map(m =>
        m.role === 'user'
          ? <UserBubble key={m.id} text={m.text} />
          : <BotMessage key={m.id} text={m.text} />
      )}
      {loading && <ThinkingDots />}
      <div ref={endRef} />
    </div>
  );
}

function QuickChips({ onSelect }: { onSelect?: (s: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, padding: '8px 14px' }}>
      {QUICK_SUGGESTIONS.map(s => (
        <QuickChip key={s} label={s} onClick={() => onSelect?.(s)} />
      ))}
    </div>
  );
}

function QuickChip({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: F, fontSize: 12, fontWeight: 500,
        color: T.brand,
        background: hov ? T.brandSubtle : T.brandSurface,
        border: `1px solid ${hov ? T.brandStrong : T.brandBorder}`,
        borderRadius: T.radius.full,
        padding: '4px 10px',
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {label}
    </button>
  );
}

// Shared slim input used by both variants
function SlimInput({ value, onChange, onSend, placeholder = 'Message ZAIDYN Agent…' }: {
  value:        string;
  onChange:     (v: string) => void;
  onSend:       () => void;
  placeholder?: string;
}) {
  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); }
  }
  return (
    <div style={{
      border: `1.5px solid ${T.brandBorder}`,
      borderRadius: '14px',
      background: 'var(--ai-card-bg)',
      padding: '8px 10px 8px 14px',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <textarea
        rows={1}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKey}
        placeholder={placeholder}
        aria-label="Message ZAIDYN Agent"
        style={{
          flex: 1, border: 'none', outline: 'none', resize: 'none',
          fontFamily: F, ...AI_TYPOGRAPHY['@zsai-caption-1'], color: T.text.primary,
          background: 'transparent',
        }}
      />
      <button
        onClick={onSend}
        aria-label="Send message"
        style={{
          width: 26, height: 26, borderRadius: '50%',
          border: 'none', cursor: 'pointer',
          background: value.trim() ? T.gradBtn : 'var(--ai-track-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s',
        }}
      >
        <RiSendPlaneLine size={11} color="white" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ResizeHandle — keyboard-accessible left-edge drag strip
// ─────────────────────────────────────────────────────────────────────────────
function ResizeHandle({
  onDragStart,
  onKeyResize,
  onDoubleClick,
  isAtMin,
  isActive,
  currentWidth,
}: {
  onDragStart:   (e: React.MouseEvent) => void;
  onKeyResize:   (delta: number) => void;
  onDoubleClick: () => void;
  isAtMin:       boolean;
  isActive:      boolean;
  currentWidth:  number;
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const highlighted   = hov || isActive || foc;
  const maxW          = Math.min(640, typeof window !== 'undefined' ? Math.round(window.innerWidth * 0.5) : 640);

  function onKeyDown(e: React.KeyboardEvent) {
    const sm = 8, lg = 40;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); onKeyResize(e.shiftKey ? lg : sm);  }  // wider
    if (e.key === 'ArrowRight') { e.preventDefault(); onKeyResize(e.shiftKey ? -lg : -sm); }  // narrower
    if (e.key === 'Home')       { e.preventDefault(); onKeyResize(MIN_WIDTH - currentWidth); }
    if (e.key === 'End')        { e.preventDefault(); onKeyResize(maxW - currentWidth); }
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Resize ZAIDYN Agent panel"
      aria-valuenow={currentWidth}
      aria-valuemin={MIN_WIDTH}
      aria-valuemax={maxW}
      aria-orientation="horizontal"
      title="Resize assistant panel"
      onMouseDown={onDragStart}
      onDoubleClick={onDoubleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      onKeyDown={onKeyDown}
      style={{
        position:  'absolute',
        left:      0, top: 0, bottom: 0,
        width:     '8px',
        cursor:    'ew-resize',
        zIndex:    20,
        display:   'flex',
        alignItems:'center',
        justifyContent: 'center',
        background: highlighted
          ? `linear-gradient(to right, ${T.brandStrong}40, transparent)`
          : 'transparent',
        outline:    foc ? `2px solid ${T.brand}` : 'none',
        outlineOffset: '0px',
        transition: 'background 0.15s',
        userSelect: 'none',
      }}
    >
      {/* Drag pill */}
      <div style={{
        width:        '3px',
        height:       '28px',
        borderRadius: '2px',
        background:   isAtMin ? '#EC7200' : highlighted ? T.brandStrong : T.brandBorder,
        opacity:      highlighted ? 1 : 0.45,
        transition:   'background 0.15s, opacity 0.15s',
        pointerEvents:'none',
      }} />

      {/* Hover/focus tooltip — appears to right of handle inside drawer */}
      {highlighted && (
        <div style={{
          position:      'absolute',
          left:          12,
          top:           '50%',
          transform:     'translateY(-50%)',
          background:    'rgba(26,22,40,0.88)',
          color:         '#fff',
          padding:       '4px 9px',
          borderRadius:  '5px',
          fontSize:      '12px',
          fontFamily:    F,
          fontWeight:    500,
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          zIndex:        300,
        }}>
          {isAtMin ? 'Minimum width — double-click to reset' : 'Resize assistant panel'}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StandardDrawer — persistent right-side drawer with left-edge resize
// ─────────────────────────────────────────────────────────────────────────────
export function StandardDrawer({
  chat,
  initialWidth = DEFAULT_WIDTH,
  onUndock,
}: {
  chat:          ChatState;
  initialWidth?: number;
  onUndock?:     () => void;
}) {
  const { messages, input, setInput, send, loading } = chat;
  const maxW = Math.min(640, typeof window !== 'undefined' ? Math.round(window.innerWidth * 0.5) : 640);

  const [width, setWidth]             = useState(initialWidth);
  const [isAtMin, setIsAtMin]         = useState(false);
  const [isDragging, setIsDragging]   = useState(false);
  const prevWidth                     = useRef(initialWidth);

  function applyWidth(raw: number) {
    const clamped = Math.max(MIN_WIDTH, Math.min(maxW, Math.round(raw)));
    setWidth(clamped);
    setIsAtMin(clamped <= MIN_WIDTH);
  }

  function keyResize(delta: number) { applyWidth(width + delta); }

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX    = e.clientX;
    const startW    = width;
    prevWidth.current = width;

    setIsDragging(true);
    document.body.style.cursor     = 'ew-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev: MouseEvent) => applyWidth(startW + (startX - ev.clientX));

    const onUp = () => {
      setIsDragging(false);
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('keydown',   onEsc);
    };

    const onEsc = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') { applyWidth(prevWidth.current); onUp(); }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('keydown',   onEsc);
  };

  return (
    <div
      role="complementary"
      aria-label="ZAIDYN Agent side drawer"
      style={{
        position:   'relative',
        width,
        flexShrink: 0,
        display:    'flex',
        flexDirection: 'column',
        borderLeft: `1px solid ${T.brandBorder}`,
        background: 'var(--ai-card-bg)',
        height:     '100%',
        transition: isDragging ? 'none' : 'width 0.15s ease-out',
        boxSizing:  'border-box',
      }}
    >
      {/* Min-width lock accent */}
      {isAtMin && (
        <div
          aria-label="Drawer at minimum width"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#EC7200', zIndex: 10, pointerEvents: 'none' }}
        />
      )}

      <ResizeHandle
        onDragStart={startResize}
        onKeyResize={keyResize}
        onDoubleClick={() => applyWidth(initialWidth)}
        isAtMin={isAtMin}
        isActive={isDragging}
        currentWidth={width}
      />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 14px 10px',
        borderBottom: `1px solid ${T.brandBorder}`,
        flexShrink: 0,
      }}>
        <AIAvatar size={22} />
        <span style={{ flex: 1, fontFamily: F, ...AI_TYPOGRAPHY['@zsai-button-label'], color: T.text.primary }}>
          ZAIDYN Agent
        </span>
        {onUndock && (
          <AITooltip label="Open as floating panel" position="below">
            <HeaderIconButton onClick={onUndock} aria-label="Open as floating panel">
              <RiDraggable size={14} color={T.text.secondary} />
            </HeaderIconButton>
          </AITooltip>
        )}
      </div>

      <ChatThread messages={messages} loading={loading} />
      <QuickChips onSelect={t => setInput(t)} />

      <div style={{ padding: '0 12px 12px', flexShrink: 0, borderTop: `1px solid ${T.brandBorder}` }}>
        <div style={{ height: 8 }} />
        <SlimInput value={input} onChange={setInput} onSend={send} />
      </div>

      {/* Width readout while dragging */}
      {isDragging && (
        <div style={{
          position:   'absolute',
          top:        '50%',
          left:       '50%',
          transform:  'translate(-50%, -50%)',
          background: 'rgba(26,22,40,0.78)',
          color:      '#fff',
          padding:    '4px 10px',
          borderRadius: '6px',
          fontFamily: '"Roboto Mono", monospace',
          fontSize:   '12px',
          fontWeight: 600,
          pointerEvents: 'none',
          zIndex:     30,
          whiteSpace: 'nowrap',
        }}>
          {width}px{isAtMin ? ' — min' : ''}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FloatingPanel — draggable overlay panel with dock behavior
// ─────────────────────────────────────────────────────────────────────────────
export function FloatingPanel({
  chat,
  onDock,
  onClose,
}: {
  chat:    ChatState;
  onDock:  () => void;
  onClose: () => void;
}) {
  const { messages, input, setInput, send, loading } = chat;

  // Default position: top-right, 24px from edge
  const [pos, setPos] = useState(() => ({
    x: typeof window !== 'undefined' ? Math.max(0, window.innerWidth - FLOATING_W - 24) : 800,
    y: 80,
  }));

  const dragging = useRef(false);
  const offset   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const nx = Math.max(0, Math.min(window.innerWidth  - FLOATING_W, e.clientX - offset.current.x));
      const ny = Math.max(0, Math.min(window.innerHeight - FLOATING_H, e.clientY - offset.current.y));
      setPos({ x: nx, y: ny });
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current           = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  function startDrag(e: React.MouseEvent) {
    // Don't drag when clicking a button inside the handle area
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    dragging.current               = true;
    offset.current                 = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    document.body.style.cursor     = 'grabbing';
    document.body.style.userSelect = 'none';
  }

  return (
    <div
      role="complementary"
      aria-label="ZAIDYN Agent floating panel"
      style={{
        position:      'fixed',
        left:          pos.x,
        top:           pos.y,
        width:         FLOATING_W,
        maxHeight:     FLOATING_H,
        display:       'flex',
        flexDirection: 'column',
        background:    'var(--ai-card-bg)',
        border:        `1px solid ${T.brandBorder}`,
        borderRadius:  '12px',
        boxShadow:     T.shadow.md,
        overflow:      'hidden',
        zIndex:        100,
      }}
    >
      {/* ── Drag grip strip ──────────────────────────────────────────────────── */}
      <div
        onMouseDown={startDrag}
        role="button"
        tabIndex={0}
        aria-label="RiDragMoveLine ZAIDYN Agent panel"
        title="RiDragMoveLine panel"
        onKeyDown={e => {
          // Keyboard drag not fully supported; avoid focus trap
          if (e.key === 'Escape') { /* no-op, allow focus to escape naturally */ }
        }}
        style={{
          height:        20,
          background:    T.brandSurface,
          borderBottom:  `1px solid ${T.brandBorder}`,
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          cursor:        'grab',
          flexShrink:    0,
          userSelect:    'none',
        }}
      >
        <RiDraggable size={12} color={T.brandStrong} style={{ opacity: 0.65 }} />
      </div>

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div style={{
        display:      'flex',
        alignItems:   'center',
        gap:          6,
        padding:      '10px 12px 8px',
        borderBottom: `1px solid ${T.brandBorder}`,
        flexShrink:   0,
      }}>
        <AIAvatar size={18} />
        <span style={{ flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600, color: T.text.primary }}>
          ZAIDYN Agent
        </span>

        {/* Dock icon — primary focus of this spec */}
        <AITooltip label="Dock as side drawer" position="below">
          <HeaderIconButton onClick={onDock} aria-label="Dock as side drawer">
            <RiSideBarLine size={14} color={T.text.secondary} />
          </HeaderIconButton>
        </AITooltip>

        {/* Close */}
        <AITooltip label="Close assistant" position="below">
          <HeaderIconButton onClick={onClose} aria-label="Close AI assistant">
            <RiCloseLine size={13} color={T.text.secondary} />
          </HeaderIconButton>
        </AITooltip>
      </div>

      {/* ── Conversation ─────────────────────────────────────────────────────── */}
      <ChatThread messages={messages} loading={loading} />

      {/* ── Quick suggestions ────────────────────────────────────────────────── */}
      <QuickChips onSelect={t => setInput(t)} />

      {/* ── Slim input ───────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 12px 12px', flexShrink: 0, borderTop: `1px solid ${T.brandBorder}` }}>
        <div style={{ height: 8 }} />
        <SlimInput value={input} onChange={setInput} onSend={send} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating trigger pill button
// ─────────────────────────────────────────────────────────────────────────────
function FloatingTrigger({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      aria-expanded={isOpen}
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          8,
        padding:      '8px 16px',
        background:   isOpen ? T.gradBtn : 'var(--ai-card-bg)',
        border:       `1.5px solid ${isOpen ? 'transparent' : T.brandBorder}`,
        borderRadius: T.radius.full,
        cursor:       'pointer',
        boxShadow:    T.shadow.sm,
        fontFamily:   F,
        fontSize:     13,
        fontWeight:   600,
        color:        isOpen ? '#FFF' : T.text.primary,
        transition:   'all 0.2s',
      }}
    >
      <RiSparklingLine size={14} color={isOpen ? '#FFF' : T.brand} />
      Ask AI
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AIAssistedSideDrawer — demo page
// Conversation state is lifted here so docking preserves context.
// ─────────────────────────────────────────────────────────────────────────────
export default function AIAssistedSideDrawer() {
  const [variant, setVariant]           = useState<'standard' | 'floating'>('standard');
  const [floatingOpen, setFloatingOpen] = useState(true);

  // Shared chat — same instance used by both variants
  const chat = useAIChat(SEED_MESSAGES);

  function handleDock() {
    setVariant('standard');
  }

  function handleUndock() {
    setFloatingOpen(true);
    setVariant('floating');
  }

  const CONTENT_LINES = [
    { w: 200, o: 0.5 }, { w: 280, o: 0.2 }, { w: 240, o: 0.2 }, { w: 260, o: 0.2 },
    { w: 210, o: 0.2 }, { w: 270, o: 0.5 }, { w: 220, o: 0.2 }, { w: 250, o: 0.2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: F }}>
      {/* ── Variant switcher toolbar ─────────────────────────────────────────── */}
      <div style={{
        display:      'flex',
        alignItems:   'center',
        gap:          8,
        padding:      '10px 20px',
        background:   'var(--ai-card-bg-raised)',
        borderBottom: '1px solid var(--ai-card-border)',
        flexShrink:   0,
      }}>
        <span style={{ fontSize: 12, color: T.text.secondary, marginRight: 4 }}>Variant:</span>

        {(['standard', 'floating'] as const).map(v => (
          <button
            key={v}
            onClick={() => { setVariant(v); if (v === 'floating') setFloatingOpen(true); }}
            style={{
              padding:    '4px 14px',
              borderRadius: T.radius.full,
              border:     `1.5px solid ${variant === v ? T.brandStrong : T.brandBorder}`,
              background: variant === v ? T.brandSubtle : 'var(--ai-card-bg)',
              color:      variant === v ? T.brand : T.text.secondary,
              fontFamily: F, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {v === 'standard' ? 'Standard Drawer' : 'Floating Panel'}
          </button>
        ))}

        {variant === 'floating' && !floatingOpen && (
          <button
            onClick={() => setFloatingOpen(true)}
            style={{
              padding: '3px 10px', borderRadius: T.radius.full,
              border: `1px solid ${T.brandBorder}`, background: 'var(--ai-card-bg)',
              fontFamily: F, fontSize: 12, color: T.brand, cursor: 'pointer',
            }}
          >
            Reopen panel
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: 12, color: T.text.secondary, opacity: 0.7 }}>
          {variant === 'standard'
            ? 'Drag left edge to resize · Double-click to reset · Arrow keys when focused'
            : 'Drag grip strip to reposition · Click dock icon to attach as drawer'}
        </span>
      </div>

      {/* ── Page shell ───────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* Main workspace content */}
        <main
          aria-label="Application workspace"
          style={{ flex: 1, padding: 32, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div>
            <div style={{ width: 160, height: 12, borderRadius: 6, background: 'var(--ai-track-bg)', marginBottom: 12 }} />
            <div style={{ width: 300, height: 8, borderRadius: 4, background: 'var(--ai-track-bg)', marginBottom: 6 }} />
            {CONTENT_LINES.map((l, i) => (
              <div key={i} style={{ width: l.w, height: 8, borderRadius: 4, background: `rgba(26,22,40,${l.o * 0.4})`, marginBottom: 6 }} />
            ))}
          </div>

          <div style={{ background: 'var(--ai-card-bg-raised)', borderRadius: 10, padding: 20, border: '1px solid var(--ai-card-border)' }}>
            <div style={{ width: 120, height: 10, borderRadius: 4, background: 'var(--ai-track-bg)', marginBottom: 12 }} />
            {CONTENT_LINES.slice(0, 4).map((l, i) => (
              <div key={i} style={{ width: l.w * 1.1, height: 7, borderRadius: 3.5, background: 'rgba(26,22,40,0.12)', marginBottom: 6 }} />
            ))}
          </div>

          {/* Floating trigger — shown in floating mode at bottom-right of content */}
          {variant === 'floating' && (
            <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <FloatingTrigger isOpen={floatingOpen} onToggle={() => setFloatingOpen(v => !v)} />
            </div>
          )}
        </main>

        {/* Standard Drawer — attached to right side */}
        {variant === 'standard' && (
          <StandardDrawer chat={chat} onUndock={handleUndock} />
        )}

        {/* Floating Panel — fixed overlay, draggable */}
        {variant === 'floating' && floatingOpen && (
          <FloatingPanel chat={chat} onDock={handleDock} onClose={() => setFloatingOpen(false)} />
        )}
      </div>
    </div>
  );
}
