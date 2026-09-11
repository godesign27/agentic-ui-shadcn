import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { F, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Icon paths ────────────────────────────────────────────────────────────────
const ZDS_LIKE    = "M14.3636 9.19247H20.1818C20.664 9.19247 21.1265 9.38403 21.4675 9.72501C21.8084 10.066 22 10.5284 22 11.0107V12.9234C22.0002 13.161 21.9539 13.3963 21.8636 13.6161L19.05 20.4479C18.9814 20.6145 18.8648 20.7569 18.7151 20.8571C18.5653 20.9573 18.3892 21.0107 18.2091 21.0107H2.90909C2.66798 21.0107 2.43675 20.9149 2.26627 20.7444C2.09578 20.5739 2 20.3427 2 20.1016V11.0107C2 10.7695 2.09578 10.5383 2.26627 10.3678C2.43675 10.1973 2.66798 10.1016 2.90909 10.1016H6.07454C6.22009 10.1016 6.36351 9.96673 6.49276 9.99978C6.622 9.93286 6.73329 9.83589 6.81727 9.71702L11.7745 2.69247C11.8372 2.60367 11.9296 2.54026 12.035 2.51374C12.1404 2.48722 12.2519 2.49935 12.3491 2.54793L13.9982 3.37247C14.4623 3.60444 14.833 3.98821 15.0488 4.46003C15.2647 4.93185 15.3125 5.46331 15.1845 5.96611L14.3636 9.19247ZM7.45455 11.5452V19.1925H17.6L20.1818 12.9234V11.0107H14.3636C14.0867 11.0106 13.8135 10.9473 13.5648 10.8256C13.316 10.7039 13.0984 10.527 12.9284 10.3084C12.7585 10.0897 12.6407 9.83519 12.5841 9.56413C12.5275 9.29307 12.5336 9.01266 12.6018 8.74429L13.4227 5.51884C13.4484 5.41823 13.4389 5.31185 13.3957 5.21741C13.3525 5.12297 13.2783 5.04615 13.1855 4.99975L12.5845 4.69975L8.30273 10.7652C8.07545 11.087 7.78454 11.3507 7.45455 11.5452ZM5.63636 11.9197H3.81818V19.1925H5.63636V11.9197Z";
const ZDS_DISLIKE = "M9.63636 14.3182H3.81818C3.33597 14.3182 2.87351 14.1266 2.53253 13.7856C2.19156 13.4447 2 12.9822 2 12.5V10.5873C1.99976 10.3497 2.04608 10.1143 2.13636 9.89455L4.95 3.06273C5.01864 2.89617 5.13521 2.75375 5.28493 2.65356C5.43465 2.55337 5.61076 2.49992 5.79091 2.5H21.0909C21.332 2.5 21.5632 2.59578 21.7337 2.76627C21.9042 2.93675 22 3.16798 22 3.40909V12.5C22 12.7411 21.9042 12.9723 21.7337 13.1428C21.5632 13.3133 21.332 13.4091 21.0909 13.4091H17.9255C17.7799 13.4091 17.6365 13.444 17.5072 13.5109C17.378 13.5778 17.2667 13.6748 17.1827 13.7936L12.2255 20.8182C12.1628 20.907 12.0704 20.9704 11.965 20.9969C11.8596 21.0234 11.7481 21.0113 11.6509 20.9627L10.0018 20.1382C9.53773 19.9062 9.16697 19.5224 8.95115 19.0506C8.73534 18.5788 8.68745 18.0473 8.81545 17.5445L9.63636 14.3182ZM16.5455 11.9655V4.31818H6.4L3.81818 10.5873V12.5H9.63636C9.91327 12.5 10.1865 12.5633 10.4352 12.685C10.684 12.8067 10.9016 12.9837 11.0716 13.2023C11.2415 13.4209 11.3593 13.6755 11.4159 13.9465C11.4725 14.2176 11.4664 14.498 11.3982 14.7664L10.5773 17.9918C10.5516 18.0924 10.5611 18.1988 10.6043 18.2932C10.6474 18.3877 10.7217 18.4645 10.8145 18.5109L11.4155 18.8109L15.6973 12.7455C15.9245 12.4236 16.2155 12.16 16.5455 11.9655ZM18.3636 11.5909H20.1818V4.31818H18.3636V11.5909Z";
const ZDS_SHARE   = "M13.12 17.023L8.92101 14.733C8.3728 15.3191 7.66099 15.7267 6.87808 15.9029C6.09517 16.0791 5.27736 16.0157 4.53093 15.721C3.7845 15.4263 3.14397 14.914 2.69258 14.2504C2.24118 13.5869 1.9998 12.803 1.9998 12.0005C1.9998 11.198 2.24118 10.4141 2.69258 9.75055C3.14397 9.08704 3.7845 8.57465 4.53093 8.27996C5.27736 7.98527 6.09517 7.92191 6.87808 8.09811C7.66099 8.27431 8.3728 8.68193 8.92101 9.268L13.121 6.978C12.8826 6.03407 12.9966 5.03559 13.4416 4.1697C13.8867 3.30381 14.6323 2.62998 15.5387 2.2745C16.445 1.91902 17.4499 1.9063 18.365 2.23873C19.2801 2.57116 20.0425 3.22591 20.5093 4.08026C20.9762 4.9346 21.1154 5.92989 20.9009 6.87954C20.6864 7.8292 20.133 8.66803 19.3442 9.23881C18.5555 9.80958 17.5857 10.0731 16.6166 9.97999C15.6475 9.88687 14.7456 9.44351 14.08 8.733L9.88001 11.023C10.0412 11.6644 10.0412 12.3356 9.88001 12.977L14.079 15.267C14.7446 14.5565 15.6465 14.1131 16.6156 14.02C17.5847 13.9269 18.5545 14.1904 19.3432 14.7612C20.132 15.332 20.6854 16.1708 20.8999 17.1205C21.1144 18.0701 20.9752 19.0654 20.5083 19.9197C20.0415 20.7741 19.2791 21.4288 18.364 21.7613C17.4489 22.0937 16.444 22.081 15.5377 21.7255C14.6313 21.37 13.8857 20.6962 13.4406 19.8303C12.9956 18.9644 12.8816 17.9659 13.12 17.022V17.023ZM6.00001 14C6.53044 14 7.03915 13.7893 7.41422 13.4142C7.78929 13.0391 8.00001 12.5304 8.00001 12C8.00001 11.4696 7.78929 10.9609 7.41422 10.5858C7.03915 10.2107 6.53044 10 6.00001 10C5.46957 10 4.96087 10.2107 4.58579 10.5858C4.21072 10.9609 4.00001 11.4696 4.00001 12C4.00001 12.5304 4.21072 13.0391 4.58579 13.4142C4.96087 13.7893 5.46957 14 6.00001 14V14ZM17 8C17.5304 8 18.0391 7.78928 18.4142 7.41421C18.7893 7.03914 19 6.53043 19 6C19 5.46956 18.7893 4.96086 18.4142 4.58578C18.0391 4.21071 17.5304 4 17 4C16.4696 4 15.9609 4.21071 15.5858 4.58578C15.2107 4.96086 15 5.46956 15 6C15 6.53043 15.2107 7.03914 15.5858 7.41421C15.9609 7.78928 16.4696 8 17 8V8ZM17 20C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18C19 17.4696 18.7893 16.9609 18.4142 16.5858C18.0391 16.2107 17.5304 16 17 16C16.4696 16 15.9609 16.2107 15.5858 16.5858C15.2107 16.9609 15 17.4696 15 18C15 18.5304 15.2107 19.0391 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20V20Z";
const ZDS_VOLUME  = "M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z";
const ZDS_COPY    = "M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z";
const ZDS_TAG     = "M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z";

// Tier 3 component tokens — ai-feedbackbar.*
// ai-feedbackbar.action.color.active    → AI.color.action.primary
// ai-feedbackbar.action.surface.active  → AI.color.surface.subtle (12% opacity overlay)
// ai-feedbackbar.action.color.error     → system error (outside AI brand)
const T = {
  actionColor:       AI.color.action.primary,
  actionSurface:     AI.color.surface.subtle + '1f', // ~12% — approximated via hex alpha
  actionSurfaceRgba: `rgba(77, 96, 230, 0.12)`,    // ai.shadow.action.default at 12%
} as const;

// ── Tooltip (portal-rendered to escape overflow:hidden) ───────────────────────
function AITooltip({ label, anchorRef, visible }: {
  label: string;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  visible: boolean;
}) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (visible && anchorRef.current) {
      const r = anchorRef.current.getBoundingClientRect();
      setPos({ x: r.left + r.width / 2, y: r.top });
    }
  }, [visible, label, anchorRef]);

  if (!visible || !pos) return null;

  return ReactDOM.createPortal(
    <div role="tooltip" style={{
      position: 'fixed', top: pos.y - 6, left: pos.x,
      transform: 'translate(-50%, -100%)',
      background: '#1A1628', color: '#FAFAFA',
      padding: '3px 6px', borderRadius: '4px',
      ...AI_TYPOGRAPHY['@zsai-section-subtitle'], fontFamily: F,
      letterSpacing: '-0.176px',
      whiteSpace: 'nowrap',
      boxShadow: '0px 2px 4px rgba(26,22,40,0.12), 0px 0px 2px rgba(26,22,40,0.12)',
      zIndex: 1000, pointerEvents: 'none', userSelect: 'none',
    }}>
      {label}
      <svg width="10" height="5" viewBox="0 0 10 5" fill="currentColor" aria-hidden="true"
        style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', display: 'block' }}>
        <path d="M0 0 L5 5 L10 0 Z" />
      </svg>
    </div>,
    document.body
  );
}

// ── Individual feedback button ────────────────────────────────────────────────
function FeedBtn({ path, label, active, bgActive, colorActive, hovColor, bgHov, onClick }: {
  path: string; label: string; active: boolean;
  bgActive: string; colorActive: string;
  hovColor?: string; bgHov?: string;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const btnRef        = React.useRef<HTMLButtonElement>(null);
  const ttId          = React.useId();

  const resolvedHovColor = hovColor ?? 'var(--ai-zds-text)';
  const resolvedBgHov    = bgHov    ?? 'var(--ai-divider)';

  return (
    <>
      <AITooltip label={label} anchorRef={btnRef} visible={hov} />
      <button
        ref={btnRef}
        onClick={onClick}
        aria-label={label}
        aria-pressed={active}
        aria-describedby={ttId}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onFocus={() => setHov(true)}
        onBlur={() => setHov(false)}
        style={{
          width: 26, height: 26, borderRadius: '6px', border: 'none',
          background: active ? bgActive : hov ? resolvedBgHov : 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: active ? colorActive : hov ? resolvedHovColor : 'var(--ai-zds-helper)',
          transition: 'all 0.14s ease', flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={path} />
        </svg>
      </button>
    </>
  );
}

// ── RiCheckLine circle icon for received state ─────────────────────────────────────
function IconCheckCircle() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M7.5 12l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Feedback bar ──────────────────────────────────────────────────────────────
export function AIFeedbackBar({ showDivider = true }: { showDivider?: boolean }) {
  const [vote,     setVote]     = useState<'up' | 'down' | null>(null);
  const [received, setReceived] = useState(false);
  const [playing,  setPlaying]  = useState(false);
  const [copied,   setCopied]   = useState(false);
  const [tagged,   setTagged]   = useState(false);

  function handleVote(dir: 'up' | 'down') {
    setVote(dir);
    setReceived(true);
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1px',
      padding: '6px 10px 8px', minHeight: 42,
      borderTop: showDivider ? '1px solid var(--ai-divider)' : 'none',
    }}>
      {received ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          color: '#15803d', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-caption-1'],
          animation: 'fbReceived 0.2s ease both',
        }}>
          <style>{`@keyframes fbReceived { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }`}</style>
          <IconCheckCircle />
          Feedback received — thank you
        </div>
      ) : (
        <>
          <FeedBtn path={ZDS_VOLUME}  label={playing ? 'Stop reading' : 'Read aloud'}
            active={playing}  bgActive={T.actionSurfaceRgba} colorActive={T.actionColor}
            onClick={() => setPlaying(v => !v)} />

          <FeedBtn path={ZDS_LIKE}    label="Mark as helpful"
            active={vote === 'up'}
            bgActive="var(--ai-feedback-active-helpful)" colorActive="#15803d"
            hovColor="#15803d" bgHov="var(--ai-feedback-active-helpful)"
            onClick={() => handleVote('up')} />

          <FeedBtn path={ZDS_DISLIKE} label="Mark as not helpful"
            active={vote === 'down'}
            bgActive="var(--ai-feedback-active-not)" colorActive="#B91C1C"
            hovColor="#dc2626" bgHov="var(--ai-feedback-active-not)"
            onClick={() => handleVote('down')} />

          <FeedBtn path={ZDS_SHARE}   label="Share response"
            active={false} bgActive={T.actionSurfaceRgba} colorActive={T.actionColor}
            onClick={() => {}} />

          <FeedBtn path={ZDS_COPY}    label={copied ? 'Copied!' : 'Copy response'}
            active={copied} bgActive={T.actionSurfaceRgba} colorActive={T.actionColor}
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} />

          <FeedBtn path={ZDS_TAG}     label={tagged ? 'Saved' : 'Save response'}
            active={tagged} bgActive={T.actionSurfaceRgba} colorActive={T.actionColor}
            onClick={() => setTagged(v => !v)} />

          <div style={{ flex: 1 }} />
        </>
      )}
    </div>
  );
}
