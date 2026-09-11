import React, { useRef, useEffect, useState } from 'react';
import { RiMicLine, RiArrowUpLine, RiArrowRightLine, RiAddLine, RiAttachmentLine, RiFolderAddLine, RiFlashlightLine, RiArrowRightSLine } from '@remixicon/react';
import { F, ZDS, AI, AI_THEME } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar, AIAvatar3D } from '../../atomic/ai-avatar/AIAvatar';
import { AIUserBubble } from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIWorkingIndicator, AIThinkingIndicator, AIGettingInfoIndicator } from '../../atomic/ai-loading-indicators/AILoadingIndicators';
import { AIPatternMessage, type UserMsg, type LoadingMsg, type AIMsg } from '../../_support/AIResponsePatterns';
import { AIInputCard } from '../ai-dialog/AIDialog';
import { useAIChat } from '../../_support/useAIChat';

// ── Types ─────────────────────────────────────────────────────────────────────
export type CommandCenterVariant =
  | 'robust'         // Default: greeting + input + suggestions (full hero)
  | 'slim'           // Trimmed greeting + slim input bar
  | 'bottom-docked'; // Sticky-to-viewport-bottom centered input only
export type CommandCenterTheme   = 'gray' | 'aqua';

/**
 * Dialog title size variant.
 *   'md' — 16 / 700, matches Standard zds-dialog title (default).
 *   'lg' — 24 / 700, larger heading for full-page hero contexts.
 * Per typography.md §2 (16 body / 18–24 heading tier).
 */
export type CommandCenterTitleSize = 'md' | 'lg';

/** Demo greeting/subtitle for bare mounts / galleries. */
export const SAMPLE_COMMAND_CENTER = {
  greeting: 'Good afternoon, Theo!',
  subtitle: 'Ask about territories, briefs, or next best actions.',
};

export interface AICommandCenterDialogProps {
  variant?:        CommandCenterVariant;
  theme?:          CommandCenterTheme;
  greeting?:       string;
  subtitle?:       string;   // omit to hide subtitle entirely
  showBackground?: boolean;
  onSubmit?:       (text: string) => void;

  /** Title size — 'md' (16/700, Standard parity) or 'lg' (24/700). Defaults to 'md'. */
  titleSize?:      CommandCenterTitleSize;

  // Bottom-docked-only knobs
  /** Max content width for the bottom-docked input. Default 680px. */
  maxWidth?:       number | string;
  /** Page background color the gradient backdrop fades into. Default '#F7F8FC'. */
  backdropColor?:  string;
}

const TITLE_SIZE_CFG: Record<CommandCenterTitleSize, { fontSize: string; letterSpacing: string }> = {
  md: { fontSize: '16px', letterSpacing: '-0.2px' },
  lg: { fontSize: '24px', letterSpacing: '-0.3px' },
};

// ── CSS keyframes ─────────────────────────────────────────────────────────────
function DialogAnimStyles() {
  return (
    <style>{`
      @keyframes ai-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes ai-in   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `}</style>
  );
}

// ── Slim input bar (internal) ─────────────────────────────────────────────────
const ADD_ITEMS = [
  { icon: RiAttachmentLine,  label: 'Add files',     hasArrow: false },
  { icon: RiFolderAddLine, label: 'Add to project', hasArrow: true  },
  { icon: RiFlashlightLine,        label: 'Skills',          hasArrow: true  },
] as const;

const MODE_ITEMS = ['Agent', 'Plan', 'Ask'] as const;
type AIMode = typeof MODE_ITEMS[number];

function PlusMenu({ mode, onModeChange, onClose }: {
  mode: AIMode; onModeChange: (m: AIMode) => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{
      position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
      width: '220px', background: 'var(--ai-card-bg)', borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.12)',
      border: `1px solid ${ZDS.border}`, overflow: 'hidden', zIndex: 100,
    }}>
      <div style={{ padding: '6px 0 2px', borderBottom: `1px solid ${ZDS.border}` }}>
        <div style={{ padding: '4px 14px 6px', fontFamily: F, fontSize: '12px', color: ZDS.textHelper, letterSpacing: '0.05em' }}>ADD CONTENT</div>
        {ADD_ITEMS.map(({ icon: Icon, label, hasArrow }) => (
          <PlusMenuItem key={label} icon={Icon} label={label} hasArrow={hasArrow} onClick={onClose} />
        ))}
      </div>
      <div style={{ padding: '6px 0' }}>
        <div style={{ padding: '4px 14px 6px', fontFamily: F, fontSize: '12px', color: ZDS.textHelper, letterSpacing: '0.05em' }}>MODE</div>
        {MODE_ITEMS.map(m => (
          <ModeItem key={m} label={m} isActive={mode === m} onSelect={() => { onModeChange(m); onClose(); }} />
        ))}
      </div>
    </div>
  );
}

function PlusMenuItem({ icon: Icon, label, hasArrow, onClick }: {
  icon: React.ElementType; label: string; hasArrow: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      width: '100%', padding: '9px 14px',
      background: hov ? ZDS.menuHoverBg : 'transparent',
      border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s',
    }}>
      <Icon size={15} color={hov ? ZDS.iconHover : ZDS.iconDefault} strokeWidth={1.8} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, ...AI_TYPOGRAPHY['@zsai-menu-item'], fontFamily: F, color: ZDS.textDefault }}>{label}</span>
      {hasArrow && <RiArrowRightSLine size={13} color={ZDS.iconDefault} />}
    </button>
  );
}

function ModeItem({ label, isActive, onSelect }: { label: string; isActive: boolean; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onSelect} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      width: '100%', padding: '9px 14px',
      background: hov ? ZDS.menuHoverBg : 'transparent',
      border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s',
    }}>
      <span style={{ flex: 1, ...AI_TYPOGRAPHY['@zsai-menu-item'], fontFamily: F, fontWeight: isActive ? 600 : 400, color: ZDS.textDefault }}>{label}</span>
      {isActive && (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 6.5l3.5 3.5 6-6" stroke={AI.color.action.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function SlimBar({ inputValue, onInputChange, onSend, sendIconDirection = 'up' }: {
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  /** Direction for the send-button arrow icon. Default 'up' (matches the
      slim variant inside the centered greeting layout). 'right' is used
      by the bottom-docked variant where the bar is anchored at the
      bottom of the viewport and a horizontal send reads more naturally. */
  sendIconDirection?: 'up' | 'right';
}) {
  const [focused,  setFocused]  = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [mode,     setMode]     = useState<AIMode>('Agent');
  const filled = inputValue.trim().length > 0;

  const borderColor = filled
    ? AI.color.action.primary
    : focused ? 'rgba(77, 96, 230,0.45)' : 'var(--ai-input-border)';

  return (
    <div style={{
      width: '100%', maxWidth: '680px', height: '56px',
      background: 'white', borderRadius: '999px',
      border: `1.5px solid ${borderColor}`,
      boxShadow: focused ? AI.shadow.input.focus : AI.shadow.input.default,
      transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      display: 'flex', alignItems: 'center', padding: '0 8px', gap: '6px',
      boxSizing: 'border-box', position: 'relative',
    }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setPlusOpen(v => !v)}
          aria-label="Add content or choose mode"
          aria-expanded={plusOpen}
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: plusOpen ? 'rgba(77, 96, 230,0.10)' : 'var(--ai-btn-outline-hover-bg)',
            border: plusOpen ? `1.5px solid ${AI.color.action.primary}` : '1.5px solid transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: plusOpen ? AI.color.action.primary : ZDS.iconDefault, transition: 'all 0.15s ease',
          }}
        >
          <RiAddLine size={17} strokeWidth={2} />
        </button>
        {plusOpen && <PlusMenu mode={mode} onModeChange={setMode} onClose={() => setPlusOpen(false)} />}
      </div>

      {mode !== 'Agent' && (
        <span style={{
          fontFamily: F, fontSize: '12px', fontWeight: 500, color: AI.color.action.primary,
          background: 'rgba(77, 96, 230,0.08)', borderRadius: '999px', padding: '2px 8px',
          flexShrink: 0, whiteSpace: 'nowrap',
        }}>{mode}</span>
      )}

      <input
        type="text"
        value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onSend(); } }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Message ZAIDYN Agent..."
        aria-label="Message ZAIDYN"
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', ...AI_TYPOGRAPHY['@zsai-input-text'], fontFamily: F, color: ZDS.textDefault, minWidth: 0 }}
      />

      <button
        onClick={filled ? onSend : undefined}
        aria-label={filled ? 'Send message' : 'Voice input'}
        style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: filled ? AI.gradient.action.full : 'var(--ai-track-bg)',
          border: 'none', cursor: filled ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: filled ? AI.color.text.onAction : ZDS.iconDefault, flexShrink: 0,
          transition: 'background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
          boxShadow: filled ? `0 4px 14px ${AI.shadow.action.emphasis}` : 'none',
        }}
      >
        {filled
          ? (sendIconDirection === 'right'
              ? <RiArrowRightLine size={17} strokeWidth={2.5} />
              : <RiArrowUpLine    size={17} strokeWidth={2.5} />)
          : <RiMicLine size={17} strokeWidth={2} />}
      </button>
    </div>
  );
}

// ── Robust variant ────────────────────────────────────────────────────────────
function RobustDialog({ theme = 'gray', greeting, subtitle, showBackground, titleSize = 'md' }: {
  theme: CommandCenterTheme; greeting: string; subtitle?: string; showBackground: boolean; titleSize?: CommandCenterTitleSize;
}) {
  const { inputValue, setInputValue, messages, handleSend } = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef  = useRef<HTMLDivElement>(null);
  const hasMessages    = messages.length > 0;
  const titleCfg       = TITLE_SIZE_CFG[titleSize];

  const resolvedTheme = AI_THEME[theme === 'aqua' ? 'aqua' : 'default'];
  const bgEmpty  = showBackground ? resolvedTheme['gradient.surface.idle']  : 'var(--background)';
  const bgActive = showBackground ? resolvedTheme['gradient.surface.active'] : 'var(--background)';

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || messages.length === 0) return;
    const last         = messages[messages.length - 1];
    const userMsgCount = messages.filter(m => m.kind === 'user').length;
    if (last.kind === 'ai' && userMsgCount === 1) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: bgEmpty,  opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: bgActive, opacity: hasMessages ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />

      {/* Ambient blobs */}
      <div style={{ opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        {theme === 'aqua' ? (
          <>
            <div style={{ position: 'absolute', top: '-140px', left: '50%', transform: 'translateX(-50%)', width: '860px', height: '640px', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 25%, rgba(199,210,254,0.50) 0%, rgba(165,236,243,0.32) 42%, transparent 68%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(165,236,243,0.28) 0%, rgba(39,166,164,0.10) 52%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,176,182,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,176,182,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
          </>
        )}
      </div>

      {!hasMessages ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', zIndex: 1 }}>
          <div style={{
            position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '820px', height: '260px',
            background: 'radial-gradient(ellipse at center, rgba(180,170,255,0.45) 0%, rgba(165,236,243,0.28) 32%, transparent 68%)',
            pointerEvents: 'none', filter: 'blur(22px)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: subtitle ? '10px' : '28px' }}>
            {theme === 'aqua' ? <AIAvatar3D /> : <AIAvatar />}
            <h1 style={{ fontSize: titleCfg.fontSize, fontWeight: 700, color: ZDS.textDefault, margin: 0, letterSpacing: titleCfg.letterSpacing, lineHeight: 1.3, fontFamily: F }}>
              {greeting}
            </h1>
          </div>
          {subtitle && (
            <p style={{ fontSize: '14px', color: ZDS.textHelper, fontFamily: F, marginBottom: '28px', textAlign: 'center' }}>
              {subtitle}
            </p>
          )}
          <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={false} />
        </div>
      ) : (
        <>
          <div ref={scrollAreaRef} style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1, padding: '36px 24px 16px' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, idx) => {
                const nextMsg     = messages[idx + 1];
                const showDivider = msg.kind === 'ai' && nextMsg != null && nextMsg.kind !== 'loading';
                if (msg.kind === 'user')    return <AIUserBubble key={msg.id} text={(msg as UserMsg).text} />;
                if (msg.kind === 'loading') {
                  const v = (msg as LoadingMsg).variant;
                  if (v === 'working')  return <AIWorkingIndicator key={msg.id} />;
                  if (v === 'thinking') return <AIThinkingIndicator key={msg.id} />;
                  return <AIGettingInfoIndicator key={msg.id} />;
                }
                if (msg.kind === 'ai') return (
                  <React.Fragment key={msg.id}>
                    <AIPatternMessage pattern={(msg as AIMsg).pattern} userText={(msg as AIMsg).userText} />
                    {showDivider && <hr style={{ border: 'none', borderTop: '1px solid var(--ai-divider)', margin: '0' }} />}
                  </React.Fragment>
                );
                return null;
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, padding: '16px 24px 20px', background: 'transparent' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={true} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Slim variant ──────────────────────────────────────────────────────────────
function SlimDialog({ theme = 'gray', greeting, showBackground, titleSize = 'md' }: {
  theme: CommandCenterTheme; greeting: string; showBackground: boolean; titleSize?: CommandCenterTitleSize;
}) {
  const { inputValue, setInputValue, messages, handleSend } = useAIChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasMessages   = messages.length > 0;
  const titleCfg      = TITLE_SIZE_CFG[titleSize];

  const resolvedTheme = AI_THEME[theme === 'aqua' ? 'aqua' : 'default'];
  const bgEmpty  = showBackground ? resolvedTheme['gradient.surface.idle']  : 'var(--background)';
  const bgActive = showBackground ? resolvedTheme['gradient.surface.active'] : 'var(--background)';

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || messages.length === 0) return;
    const last         = messages[messages.length - 1];
    const userMsgCount = messages.filter(m => m.kind === 'user').length;
    if (last.kind === 'ai' && userMsgCount === 1) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: bgEmpty,  opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: bgActive, opacity: hasMessages ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />

      {showBackground && (
        <div style={{ opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,176,182,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,176,182,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
        </div>
      )}

      {!hasMessages ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', zIndex: 1, gap: '24px' }}>
          {showBackground && (
            <div style={{
              position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '820px', height: '260px',
              background: 'radial-gradient(ellipse at center, rgba(180,170,255,0.45) 0%, rgba(165,236,243,0.28) 32%, transparent 68%)',
              pointerEvents: 'none', filter: 'blur(22px)',
            }} />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <AIAvatar3D />
            <h1 style={{ fontSize: titleCfg.fontSize, fontWeight: 700, color: ZDS.textDefault, margin: 0, letterSpacing: titleCfg.letterSpacing, lineHeight: 1.3, fontFamily: F }}>
              {greeting}
            </h1>
          </div>
          <SlimBar inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} />
        </div>
      ) : (
        <>
          <div ref={scrollAreaRef} style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1, padding: '36px 24px 16px' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, idx) => {
                const nextMsg     = messages[idx + 1];
                const showDivider = msg.kind === 'ai' && nextMsg != null && nextMsg.kind !== 'loading';
                if (msg.kind === 'user')    return <AIUserBubble key={msg.id} text={(msg as UserMsg).text} />;
                if (msg.kind === 'loading') {
                  const v = (msg as LoadingMsg).variant;
                  if (v === 'working')  return <AIWorkingIndicator key={msg.id} />;
                  if (v === 'thinking') return <AIThinkingIndicator key={msg.id} />;
                  return <AIGettingInfoIndicator key={msg.id} />;
                }
                if (msg.kind === 'ai') return (
                  <React.Fragment key={msg.id}>
                    <AIPatternMessage pattern={(msg as AIMsg).pattern} userText={(msg as AIMsg).userText} />
                    {showDivider && <hr style={{ border: 'none', borderTop: '1px solid var(--ai-divider)', margin: '0' }} />}
                  </React.Fragment>
                );
                return null;
              })}
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, padding: '12px 24px 20px', background: 'transparent', display: 'flex', justifyContent: 'center' }}>
            <SlimBar inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} />
          </div>
        </>
      )}
    </div>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export function AICommandCenterDialog({
  variant        = 'robust',
  theme          = 'gray',
  greeting       = SAMPLE_COMMAND_CENTER.greeting,
  subtitle       = SAMPLE_COMMAND_CENTER.subtitle,
  showBackground = true,
  titleSize      = 'md',
  maxWidth       = 680,
  backdropColor  = '#F7F8FC',
}: AICommandCenterDialogProps) {
  const resolvedGreeting = greeting;

  return (
    <>
      <DialogAnimStyles />
      {variant === 'bottom-docked'
        ? <BottomDockedDialog maxWidth={maxWidth} backdropColor={backdropColor} />
        : variant === 'slim'
          ? <SlimDialog   theme={theme} greeting={resolvedGreeting} showBackground={showBackground} titleSize={titleSize} />
          : <RobustDialog theme={theme} greeting={resolvedGreeting} subtitle={subtitle} showBackground={showBackground} titleSize={titleSize} />
      }
    </>
  );
}

// ── Bottom-docked variant ────────────────────────────────────────────────────
// Sticky-to-viewport-bottom centered slim input. No greeting, no avatar,
// no background card — just the input pill (SlimBar) centered inside a
// configurable max-width column on a solid backdrop. The send button uses
// a right-facing arrow to read as "send forward" in this bottom-of-page
// reading position.
function BottomDockedDialog({
  maxWidth,
  backdropColor,
}: {
  maxWidth: number | string;
  backdropColor: string;
}) {
  const { inputValue, setInputValue, handleSend } = useAIChat();
  const widthValue = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

  return (
    <div
      role="region"
      aria-label="AI command bar"
      style={{
        // Sticky to the bottom of the nearest scrolling ancestor.
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        // Span the full width so the solid backdrop covers any content
        // that scrolls behind the bar.
        width: '100%',
        padding: '20px 24px 16px',
        background: backdropColor,
        // Thin top hairline so the bar separates cleanly from content
        // scrolled all the way down.
        boxShadow: 'inset 0 1px 0 rgba(15,17,38,0.06)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: widthValue }}>
        <SlimBar
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          sendIconDirection="right"
        />
      </div>
    </div>
  );
}

export default AICommandCenterDialog;
