import React, { useRef, useEffect } from 'react';
import { F, ZDS, AI, AI_THEME } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar, AIAvatar3D } from '../../atomic/ai-avatar/AIAvatar';
import { AIUserBubble } from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIWorkingIndicator, AIThinkingIndicator, AIGettingInfoIndicator } from '../../atomic/ai-loading-indicators/AILoadingIndicators';
import { AIPatternMessage, type ChatMsg, type UserMsg, type LoadingMsg, type AIMsg } from '../../_support/AIResponsePatterns';
import { AIInputCard } from '../../organisms/ai-dialog/AIDialog';
import { AIButton, QUICK_ACTIONS } from '../../atomic/ai-button/AIButton';
import { useAIChat } from '../../_support/useAIChat';

// ── CSS animations ────────────────────────────────────────────────────────────
function AIChatAnimStyles() {
  return (
    <style>{`
      @keyframes ai-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes ai-in   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `}</style>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
export type AICommandCenterVariant = 'gray' | 'aqua';

// ── Main component ────────────────────────────────────────────────────────────
export function AICommandCenter({ variant = 'gray', showBackground = true }: { variant?: AICommandCenterVariant; showBackground?: boolean }) {
  const { inputValue, setInputValue, messages, handleSend } = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef  = useRef<HTMLDivElement>(null);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  // Resolve ai.gradient.surface.idle / active through the theme variant
  const theme    = AI_THEME[variant === 'aqua' ? 'aqua' : 'default'];
  const bgEmpty  = showBackground ? theme['gradient.surface.idle']  : 'var(--background)';
  const bgActive = 'var(--ai-card-bg, #FFFFFF)';
  const hasMessages = messages.length > 0;

  // Smart scroll: first exchange → top so user bubble is visible; subsequent → bottom
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', minHeight: 0, position: 'relative', overflow: 'hidden' }}>
      {/* Background crossfade — ai.gradient.surface.idle ↔ ai.gradient.surface.active */}
      <div style={{ position: 'absolute', inset: 0, background: bgEmpty,  opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: bgActive, opacity: hasMessages ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }} />

      <AIChatAnimStyles />

      {/* Ambient blobs — fade out in active state */}
      <div style={{ opacity: hasMessages ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
        {variant === 'aqua' ? (
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
        /* ── Empty / idle state ── */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', zIndex: 1 }}>
          {/* Glow halo behind input */}
          <div style={{
            position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '820px', height: '260px',
            background: `radial-gradient(ellipse at center, rgba(180,170,255,0.45) 0%, rgba(165,236,243,0.28) 32%, transparent 68%)`,
            pointerEvents: 'none', filter: 'blur(22px)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
            {variant === 'aqua' ? <AIAvatar3D /> : <AIAvatar />}
            <h1 style={{ ...AI_TYPOGRAPHY['@zsai-h1'], color: ZDS.textDefault, margin: 0, letterSpacing: '-0.5px', fontFamily: F }}>
              {greeting}, Theo!
            </h1>
          </div>
          <p style={{ ...AI_TYPOGRAPHY['@zsai-subtitle-2'], color: ZDS.textHelper, fontFamily: F, marginBottom: '28px', textAlign: 'center' }}>
            Ask me anything or choose a quick action below
          </p>

          <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={false} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '680px', width: '100%', justifyContent: 'center' }}>
            {QUICK_ACTIONS.map(action => {
              const Icon = action.icon;
              return (
                <AIButton
                  key={action.label}
                  variant="secondary"
                  size="sm"
                  icon={<Icon />}
                  label={action.label}
                  special={(action as any).isSpecial}
                />
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Active / conversation state ── */
        <>
          <div ref={scrollAreaRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', position: 'relative', zIndex: 1, padding: '36px 24px 16px' }}>
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

          <div style={{ position: 'relative', zIndex: 1, padding: '16px 24px 20px', background: 'transparent', flexShrink: 0 }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={true} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
