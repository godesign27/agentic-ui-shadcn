/**
 * AI Assisted Side Panel — Page Pattern
 *
 * Two variants that share the same AI primitives:
 *   Standard — persistent right column (360px), visible on load
 *   Floating — on-demand popover anchored to a trigger button
 *
 * Design tokens: AI.* semantic values from ai-tokens.ts
 */

import React, { useState, useRef, useEffect } from 'react';
import { RiSendPlaneLine, RiMicLine, RiArrowDownSLine, RiFullscreenLine, RiCloseLine, RiSparklingLine } from '@remixicon/react';
import { AIAvatar, BotAvatar } from '../../atomic/ai-avatar/AIAvatar';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ─────────────────────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────────────────────
const AI = {
  gradientBtn:    'linear-gradient(135deg, #4D60E6 0%, #3544A4 100%)',
  gradient:       'linear-gradient(135deg, #657CEC 0%, #4D60E6 100%)',
  color: {
    surface: { default: 'var(--ai-brand-surface)', subtle: 'var(--ai-brand-surface-hover)' },
    border:  { default: 'var(--ai-brand-border)', strong: 'var(--ai-brand-text)' },
    text:    { primary: 'var(--ai-ds-text)', secondary: 'var(--ai-ds-helper)', disabled: 'var(--ai-btn-disabled-text)' },
  },
  radius: { full: '100px', lg: '20px', md: '12px', sm: '8px' },
};

const F = '"Open Sans", sans-serif';

// ─────────────────────────────────────────────────────────────────────────────
// Shared chat types
// ─────────────────────────────────────────────────────────────────────────────
type Role = 'user' | 'bot';
interface Message { id: number; role: Role; text: string }

const SEED_MESSAGES: Message[] = [
  { id: 1, role: 'bot',  text: 'Hello! I\'m your AI assistant. How can I help you today?' },
  { id: 2, role: 'user', text: 'Can you summarize the key findings from this dataset?' },
  { id: 3, role: 'bot',  text: 'Sure — the dataset shows a 23% uplift in engagement following the Q2 product update, with the highest gains in the 25–34 cohort.' },
];

function useAIChat(seed: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  function send() {
    const text = input.trim();
    if (!text) return;
    const id = Date.now();
    setMessages(prev => [...prev, { id, role: 'user', text }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: id + 1, role: 'bot', text: 'Thanks for your question. Based on the current context, I recommend focusing on the trend lines in Q3 — they indicate a significant pattern shift.' },
      ]);
      setLoading(false);
    }, 1800);
  }

  return { messages, input, setInput, send, loading };
}

// ─────────────────────────────────────────────────────────────────────────────
// UserBubble
// ─────────────────────────────────────────────────────────────────────────────
function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
      <div style={{
        maxWidth: '80%',
        background: AI.color.surface.subtle,
        border: `1px solid ${AI.color.border.default}`,
        borderRadius: '16px 16px 4px 16px',
        padding: '10px 14px',
        fontFamily: F,
        ...AI_TYPOGRAPHY['@ai-section-subtitle'],
        color: AI.color.text.primary,
      }}>
        {text}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BotMessage
// ─────────────────────────────────────────────────────────────────────────────
function BotMessage({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
      <BotAvatar size={18} />
      <div style={{
        flex: 1,
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: '4px 16px 16px 16px',
        padding: '10px 14px',
        fontFamily: F,
        ...AI_TYPOGRAPHY['@ai-section-subtitle'],
        color: AI.color.text.primary,
      }}>
        {text}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ThinkingIndicator
// ─────────────────────────────────────────────────────────────────────────────
function ThinkingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
      <BotAvatar size={18} />
      <div style={{
        display: 'flex', gap: 4, padding: '10px 14px',
        background: 'var(--ai-card-bg)', border: '1px solid var(--ai-card-border)',
        borderRadius: '4px 16px 16px 16px',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: AI.color.border.strong,
            display: 'inline-block',
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            opacity: 0.7,
          }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,80%,100%{transform:scale(.75);opacity:.4} 40%{transform:scale(1);opacity:1} }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MiniInputBar — shared between Standard and Floating
// ─────────────────────────────────────────────────────────────────────────────
function MiniInputBar({ value, onChange, onSend, compact = false }: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  compact?: boolean;
}) {
  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); }
  }
  return (
    <div style={{
      border: `1.5px solid ${AI.color.border.default}`,
      borderRadius: AI.radius.lg,
      background: 'var(--ai-card-bg)',
      padding: compact ? '8px 12px' : '10px 14px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <textarea
        rows={1}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKey}
        placeholder="Ask anything…"
        style={{
          flex: 1, border: 'none', outline: 'none', resize: 'none',
          fontFamily: F, ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: AI.color.text.primary,
          background: 'transparent',
        }}
      />
      <button
        onClick={onSend}
        style={{
          width: 28, height: 28, borderRadius: '50%',
          border: 'none', cursor: 'pointer',
          background: value.trim() ? AI.gradientBtn : 'var(--ai-track-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s',
        }}
      >
        <RiSendPlaneLine size={12} color="white" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ChatThread — shared scroll container
// ─────────────────────────────────────────────────────────────────────────────
function ChatThread({ messages, loading }: { messages: Message[]; loading: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
      {messages.map(msg =>
        msg.role === 'user'
          ? <UserBubble key={msg.id} text={msg.text} />
          : <BotMessage key={msg.id} text={msg.text} />
      )}
      {loading && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PanelHeader
// ─────────────────────────────────────────────────────────────────────────────
function PanelHeader({ title, onClose }: { title?: string; onClose?: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '14px 16px 10px',
      borderBottom: `1px solid ${AI.color.border.default}`,
      flexShrink: 0,
    }}>
      <AIAvatar size={22} />
      <span style={{
        flex: 1, fontFamily: F, ...AI_TYPOGRAPHY['@ai-button-label'],
        color: AI.color.text.primary,
      }}>
        {title ?? 'AI Assistant'}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, borderRadius: 6 }}
        >
          <RiCloseLine size={14} color={AI.color.text.secondary} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StandardPanel — persistent right column
// ─────────────────────────────────────────────────────────────────────────────
export function StandardPanel({ width = 360 }: { width?: number }) {
  const { messages, input, setInput, send, loading } = useAIChat(SEED_MESSAGES);

  return (
    <div style={{
      width, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      borderLeft: `1px solid ${AI.color.border.default}`,
      background: 'var(--ai-card-bg)',
      height: '100%',
    }}>
      <PanelHeader />
      <ChatThread messages={messages} loading={loading} />
      <div style={{ padding: 12, flexShrink: 0, borderTop: `1px solid ${AI.color.border.default}` }}>
        <MiniInputBar value={input} onChange={setInput} onSend={send} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FloatingPanel — popover anchored to a trigger button
// ─────────────────────────────────────────────────────────────────────────────
export function FloatingPanel({ onExpand }: { onExpand?: () => void }) {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, send, loading } = useAIChat([SEED_MESSAGES[0]]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Popover */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 52, right: 0,
          width: 320,
          background: 'var(--ai-card-bg)',
          border: `1px solid ${AI.color.border.default}`,
          borderRadius: AI.radius.md,
          boxShadow: '0 8px 32px rgba(26,22,40,0.12)',
          display: 'flex', flexDirection: 'column',
          maxHeight: 380, overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 14px 10px',
            borderBottom: `1px solid ${AI.color.border.default}`,
            flexShrink: 0,
          }}>
            <AIAvatar size={18} />
            <span style={{ flex: 1, fontFamily: F, ...AI_TYPOGRAPHY['@ai-button-label'], color: AI.color.text.primary }}>
              AI Assistant
            </span>
            {onExpand && (
              <button
                onClick={onExpand}
                title="Expand to full panel"
                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, borderRadius: 6 }}
              >
                <RiFullscreenLine size={13} color={AI.color.text.secondary} />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, borderRadius: 6 }}
            >
              <RiCloseLine size={13} color={AI.color.text.secondary} />
            </button>
          </div>
          <ChatThread messages={messages} loading={loading} />
          <div style={{ padding: 10, flexShrink: 0, borderTop: `1px solid ${AI.color.border.default}` }}>
            <MiniInputBar value={input} onChange={setInput} onSend={send} compact />
          </div>
        </div>
      )}

      {/* Trigger pill */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px',
          background: open ? AI.gradientBtn : 'var(--ai-card-bg)',
          border: `1.5px solid ${open ? 'transparent' : AI.color.border.default}`,
          borderRadius: AI.radius.full,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(26,22,40,0.10)',
          transition: 'all 0.2s',
        }}
      >
        <RiSparklingLine size={14} color={open ? '#FFFFFF' : '#4D60E6'} />
        <span style={{
          fontFamily: F, fontSize: 14, fontWeight: 600,
          color: open ? '#FFFFFF' : AI.color.text.primary,
        }}>
          Ask AI
        </span>
        <RiArrowDownSLine
          size={12}
          color={open ? '#FFFFFF' : AI.color.text.secondary}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo: AIAssistedSidePanel
// Full-page demo with a tab to switch between Standard and Floating variants
// ─────────────────────────────────────────────────────────────────────────────
export default function AIAssistedSidePanel() {
  const [variant, setVariant] = useState<'standard' | 'floating'>('standard');
  const { messages, input, setInput, send, loading } = useAIChat(SEED_MESSAGES);

  const CONTENT_LINES = [
    { w: 200, o: 0.5 }, { w: 280, o: 0.2 }, { w: 240, o: 0.2 }, { w: 260, o: 0.2 },
    { w: 210, o: 0.2 }, { w: 270, o: 0.5 }, { w: 220, o: 0.2 }, { w: 250, o: 0.2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: F }}>
      {/* Variant switcher */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 20px',
        background: 'var(--ai-card-bg-raised)',
        borderBottom: '1px solid var(--ai-card-border)',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, color: AI.color.text.secondary, marginRight: 4 }}>Variant:</span>
        {(['standard', 'floating'] as const).map(v => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            style={{
              padding: '4px 14px',
              borderRadius: AI.radius.full,
              border: `1.5px solid ${variant === v ? AI.color.border.strong : AI.color.border.default}`,
              background: variant === v ? AI.color.surface.subtle : 'var(--ai-card-bg)',
              color: variant === v ? '#4D60E6' : AI.color.text.secondary,
              fontFamily: F, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {v === 'standard' ? 'Standard Panel' : 'Floating Panel'}
          </button>
        ))}
      </div>

      {/* Page shell */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Main content */}
        <main style={{
          flex: 1, padding: 32, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div>
            <div style={{ width: 160, height: 12, borderRadius: 6, background: 'var(--ai-track-bg)', marginBottom: 12 }} />
            <div style={{ width: 300, height: 8, borderRadius: 4, background: 'var(--ai-track-bg)', marginBottom: 6 }} />
            {CONTENT_LINES.map((l, i) => (
              <div key={i} style={{
                width: l.w, height: 8, borderRadius: 4,
                background: `rgba(26,22,40,${l.o * 0.4})`, marginBottom: 6,
              }} />
            ))}
          </div>
          <div style={{ background: 'var(--ai-card-bg-raised)', borderRadius: 10, padding: 20, border: '1px solid var(--ai-card-border)' }}>
            <div style={{ width: 120, height: 10, borderRadius: 4, background: 'var(--ai-track-bg)', marginBottom: 12 }} />
            {CONTENT_LINES.slice(0, 4).map((l, i) => (
              <div key={i} style={{ width: l.w * 1.1, height: 7, borderRadius: 3.5, background: `rgba(26,22,40,0.12)`, marginBottom: 6 }} />
            ))}
          </div>

          {/* Floating trigger anchored in content area */}
          {variant === 'floating' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: 24 }}>
              <FloatingPanel onExpand={() => setVariant('standard')} />
            </div>
          )}
        </main>

        {/* Standard Panel */}
        {variant === 'standard' && (
          <aside style={{ width: 360, flexShrink: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 16px 10px',
              borderBottom: `1px solid ${AI.color.border.default}`,
              borderLeft: `1px solid ${AI.color.border.default}`,
              flexShrink: 0, background: 'var(--ai-card-bg)',
            }}>
              <AIAvatar size={22} />
              <span style={{ flex: 1, fontFamily: F, ...AI_TYPOGRAPHY['@ai-button-label'], color: AI.color.text.primary }}>
                AI Assistant
              </span>
            </div>
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px 16px 0',
              borderLeft: `1px solid ${AI.color.border.default}`,
              background: 'var(--ai-card-bg)',
            }}>
              {messages.map(msg =>
                msg.role === 'user'
                  ? <UserBubble key={msg.id} text={msg.text} />
                  : <BotMessage key={msg.id} text={msg.text} />
              )}
              {loading && <ThinkingIndicator />}
            </div>
            <div style={{
              padding: 12, flexShrink: 0,
              borderTop: `1px solid ${AI.color.border.default}`,
              borderLeft: `1px solid ${AI.color.border.default}`,
              background: 'var(--ai-card-bg)',
            }}>
              <MiniInputBar value={input} onChange={setInput} onSend={send} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
