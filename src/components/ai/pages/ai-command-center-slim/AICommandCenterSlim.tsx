import React, { useState, useRef, useEffect } from 'react';
import { RiMicLine, RiArrowUpLine, RiAddLine, RiAttachmentLine, RiFolderAddLine, RiFlashlightLine, RiArrowRightSLine } from '@remixicon/react';
import { F, ZDS, AI, AI_THEME } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar3D } from '../../atomic/ai-avatar/AIAvatar';
import { AIUserBubble } from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIWorkingIndicator, AIThinkingIndicator, AIGettingInfoIndicator } from '../../atomic/ai-loading-indicators/AILoadingIndicators';
import { AIPatternMessage, type ChatMsg, type UserMsg, type LoadingMsg, type AIMsg } from '../../_support/AIResponsePatterns';
import { useAIChat } from '../../_support/useAIChat';

export type AICommandCenterVariant = 'gray' | 'aqua';

// ── Combined + menu (Add items + Agent/Plan/Ask) ───────────────────────────────
const ADD_ITEMS = [
  { icon: RiAttachmentLine,  label: 'Add files',       hasArrow: false },
  { icon: RiFolderAddLine, label: 'Add to project',   hasArrow: true  },
  { icon: RiFlashlightLine,        label: 'Skills',            hasArrow: true  },
] as const;

const MODE_ITEMS = ['Agent', 'Plan', 'Ask'] as const;
type AIMode = typeof MODE_ITEMS[number];

function PlusMenu({ mode, onModeChange, onClose }: {
  mode: AIMode;
  onModeChange: (m: AIMode) => void;
  onClose: () => void;
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
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: 0,
      width: '220px',
      background: 'var(--ai-card-bg)',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.12)',
      border: `1px solid ${ZDS.border}`,
      overflow: 'hidden',
      zIndex: 100,
    }}>
      {/* Add section */}
      <div style={{ padding: '6px 0 2px', borderBottom: `1px solid ${ZDS.border}` }}>
        <div style={{ padding: '4px 14px 6px', fontFamily: F, fontSize: '12px', color: ZDS.textHelper, letterSpacing: '0.05em' }}>
          ADD CONTENT
        </div>
        {ADD_ITEMS.map(({ icon: Icon, label, hasArrow }) => (
          <PlusMenuItem key={label} icon={Icon} label={label} hasArrow={hasArrow} onClick={onClose} />
        ))}
      </div>

      {/* Mode section */}
      <div style={{ padding: '6px 0' }}>
        <div style={{ padding: '4px 14px 6px', fontFamily: F, fontSize: '12px', color: ZDS.textHelper, letterSpacing: '0.05em' }}>
          MODE
        </div>
        {MODE_ITEMS.map(m => (
          <ModeItem
            key={m}
            label={m}
            isActive={mode === m}
            onSelect={() => { onModeChange(m); onClose(); }}
          />
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
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '9px 14px',
        background: hov ? ZDS.menuHoverBg : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s',
      }}
    >
      <Icon size={15} color={hov ? ZDS.iconHover : ZDS.iconDefault} strokeWidth={1.8} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontFamily: F, fontSize: '13px', color: ZDS.textDefault }}>{label}</span>
      {hasArrow && <RiArrowRightSLine size={13} color={ZDS.iconDefault} />}
    </button>
  );
}

function ModeItem({ label, isActive, onSelect }: { label: string; isActive: boolean; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '9px 14px',
        background: hov ? ZDS.menuHoverBg : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s',
      }}
    >
      <span style={{
        flex: 1, fontFamily: F, fontSize: '13px',
        fontWeight: isActive ? 600 : 400, color: ZDS.textDefault,
      }}>
        {label}
      </span>
      {isActive && (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 6.5l3.5 3.5 6-6" stroke={AI.color.action.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Slim pill input bar ───────────────────────────────────────────────────────
interface SlimBarProps {
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
}

function SlimBar({ inputValue, onInputChange, onSend }: SlimBarProps) {
  const [focused,   setFocused]   = useState(false);
  const [plusOpen,  setPlusOpen]  = useState(false);
  const [mode,      setMode]      = useState<AIMode>('Agent');
  const inputRef = useRef<HTMLInputElement>(null);
  const filled = inputValue.trim().length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); onSend(); }
  };

  const borderColor = filled
    ? AI.color.action.primary
    : focused
      ? 'rgba(77, 96, 230,0.45)'
      : 'var(--ai-input-border)';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '680px',
        height: '56px',
        background: 'white',
        borderRadius: '999px',
        border: `1.5px solid ${borderColor}`,
        boxShadow: focused ? AI.shadow.input.focus : AI.shadow.input.default,
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: '6px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* + button (left) */}
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
            color: plusOpen ? AI.color.action.primary : ZDS.iconDefault,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { if (!plusOpen) e.currentTarget.style.background = 'var(--ai-btn-outline-hover-bg)'; }}
          onMouseLeave={e => { if (!plusOpen) e.currentTarget.style.background = 'var(--ai-btn-outline-hover-bg)'; }}
        >
          <RiAddLine size={17} strokeWidth={2} />
        </button>
        {plusOpen && (
          <PlusMenu
            mode={mode}
            onModeChange={setMode}
            onClose={() => setPlusOpen(false)}
          />
        )}
      </div>

      {/* Mode badge — shows current mode when not 'Agent' */}
      {mode !== 'Agent' && (
        <span style={{
          fontFamily: F, fontSize: '12px', fontWeight: 500,
          color: AI.color.action.primary,
          background: 'rgba(77, 96, 230,0.08)',
          borderRadius: '999px', padding: '2px 8px',
          flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          {mode}
        </span>
      )}

      {/* Text input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=""
        aria-label="Message ZAIDYN"
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '15px',
          fontFamily: F,
          color: ZDS.textDefault,
          minWidth: 0,
        }}
      />

      {/* RiMicLine → RiSendPlaneLine button */}
      <button
        onClick={filled ? onSend : undefined}
        aria-label={filled ? 'Send message' : 'Voice input'}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: filled ? AI.gradient.action.full : 'var(--ai-track-bg)',
          border: 'none',
          cursor: filled ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: filled ? AI.color.text.onAction : ZDS.iconDefault,
          flexShrink: 0,
          transition: 'background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
          boxShadow: filled ? `0 4px 14px ${AI.shadow.action.emphasis}` : 'none',
        }}
      >
        {filled ? <RiArrowUpLine size={17} strokeWidth={2.5} /> : <RiMicLine size={17} strokeWidth={2} />}
      </button>
    </div>
  );
}

// ── Main slim component ───────────────────────────────────────────────────────
export function AICommandCenterSlim({
  variant = 'gray',
  showBackground = true,
}: {
  variant?: AICommandCenterVariant;
  showBackground?: boolean;
}) {
  const { inputValue, setInputValue, messages, handleSend } = useAIChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const theme    = AI_THEME[variant === 'aqua' ? 'aqua' : 'default'];
  const bgEmpty  = showBackground ? theme['gradient.surface.idle']  : 'var(--background)';
  const bgActive = showBackground ? theme['gradient.surface.active'] : 'var(--background)';
  const hasMessages = messages.length > 0;

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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background crossfade */}
      <div style={{ position: 'absolute', inset: 0, background: bgEmpty,  opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: bgActive, opacity: hasMessages ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />

      {/* Ambient blobs — only when showBackground */}
      {showBackground && (
        <div style={{ opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,176,182,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,176,182,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
        </div>
      )}

      {!hasMessages ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', zIndex: 1, gap: '24px' }}>
          <style>{`
            @media (max-width: 480px) {
              .slim-greeting { flex-direction: column !important; gap: 12px !important; text-align: center; }
              .slim-greeting h1 { font-size: 24px !important; }
            }
          `}</style>

          {showBackground && (
            <div style={{
              position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '820px', height: '260px',
              background: 'radial-gradient(ellipse at center, rgba(180,170,255,0.45) 0%, rgba(165,236,243,0.28) 32%, transparent 68%)',
              pointerEvents: 'none', filter: 'blur(22px)',
            }} />
          )}

          <div className="slim-greeting" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <AIAvatar3D />
            <h1 style={{ ...AI_TYPOGRAPHY['@zsai-h1'], color: ZDS.textDefault, margin: 0, letterSpacing: '-0.5px', fontFamily: F }}>
              {greeting}, Theo!
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
                if (msg.kind === 'user') return <AIUserBubble key={msg.id} text={(msg as UserMsg).text} />;
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
