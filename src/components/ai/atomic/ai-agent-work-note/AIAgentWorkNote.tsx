import React, { useState, useRef, useEffect } from 'react';
import { F, ZDS, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── CSS injected once ─────────────────────────────────────────────────────────
function WorkNoteStyles() {
  return (
    <style>{`
      @keyframes awn-pulse { 0%,100%{opacity:0.35} 50%{opacity:0.85} }
      @keyframes awn-dot   { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
      @keyframes awn-open  { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      /* Keyboard-only focus ring on the trigger — click focus does not paint the outline. */
      .awn-trigger:focus { outline: none; }
      .awn-trigger:focus-visible { outline: 2px solid ${AI.color.brand}; outline-offset: 2px; }
      @media (prefers-reduced-motion: reduce) {
        [data-awn] { animation: none !important; transition: none !important; }
        [data-awn-open] { animation: none !important; }
      }
    `}</style>
  );
}

// ── Status config ─────────────────────────────────────────────────────────────
export type WorkNoteStatus =
  | 'idle'
  | 'active'
  | 'planning'
  | 'checkingContext'
  | 'searching'
  | 'routing'
  | 'validating'
  | 'complete'
  | 'hidden';

const STATUS_LABEL: Record<WorkNoteStatus, string> = {
  idle:           'Working',
  active:         'Working',
  planning:       'Plan',
  checkingContext:'Context check',
  searching:      'Checking context',
  routing:        'Routing',
  validating:     'Validating',
  complete:       'Working note',
  hidden:         'Working',
};

// ── Props ─────────────────────────────────────────────────────────────────────
export interface AIAgentWorkNoteProps {
  label?:           string;
  status?:          WorkNoteStatus;
  content?:         string;
  items?:           string[];
  icon?:            React.ReactNode;
  showChevron?:     boolean;
  hideable?:        boolean;
  hidden?:          boolean;
  showViewTrace?:   boolean;
  loading?:         boolean;
  defaultExpanded?: boolean;
  expanded?:        boolean;
  onToggle?:        (open: boolean) => void;
  onHide?:          () => void;
  onViewTrace?:     () => void;
}

// ── Loading dots ──────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginLeft: '4px', verticalAlign: 'middle' }} aria-hidden="true">
      {[0, 160, 320].map(delay => (
        <span key={delay} data-awn style={{
          display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%',
          background: AI.color.brand,
          animation: `awn-dot 1.2s ${delay}ms ease-in-out infinite`,
        }} />
      ))}
    </span>
  );
}

// ── Chevron SVG ───────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
      style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
      <path d="M4 2.5l4 3.5-4 3.5" stroke={AI.color.brand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AIAgentWorkNote({
  label,
  status        = 'idle',
  content,
  items,
  icon,
  showChevron   = true,
  hideable      = false,
  hidden: hiddenProp,
  showViewTrace = false,
  loading       = false,
  defaultExpanded = false,
  expanded: expandedProp,
  onToggle,
  onHide,
  onViewTrace,
}: AIAgentWorkNoteProps) {

  const [openInternal,   setOpenInternal]   = useState(defaultExpanded);
  const [hiddenInternal, setHiddenInternal] = useState(false);
  const [hoverTrigger,   setHoverTrigger]   = useState(false);
  const [hoverHide,      setHoverHide]      = useState(false);
  const [hoverTrace,     setHoverTrace]     = useState(false);
  const [hoverRestore,   setHoverRestore]   = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled  = expandedProp !== undefined;
  const isOpen        = isControlled ? expandedProp : openInternal;
  const isHiddenCtrl  = hiddenProp !== undefined;
  const isHidden      = isHiddenCtrl ? hiddenProp : hiddenInternal;

  const resolvedLabel = label ?? STATUS_LABEL[status];
  const isActive      = status === 'active';
  const isComplete    = status === 'complete';

  const toggle = () => {
    if (!isControlled) setOpenInternal(v => !v);
    onToggle?.(!isOpen);
  };

  const hide = () => {
    if (!isHiddenCtrl) setHiddenInternal(true);
    onHide?.();
  };

  const restore = () => {
    if (!isHiddenCtrl) setHiddenInternal(false);
  };

  const hasContent = !!(content || (items && items.length > 0));

  // ── Hidden / minimized state ──────────────────────────────────────────────
  if (isHidden) {
    return (
      <>
        <WorkNoteStyles />
        <button
          onClick={restore}
          onMouseEnter={() => setHoverRestore(true)}
          onMouseLeave={() => setHoverRestore(false)}
          style={{
            fontFamily: F, fontSize: '12px', fontWeight: 500,
            color: hoverRestore ? AI.color.brandStrong : AI.color.brand,
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '0',
            textDecoration: hoverRestore ? 'underline' : 'none',
            transition: 'color 0.15s ease',
          }}
          aria-label="Show working note"
        >
          Show working note
        </button>
      </>
    );
  }

  return (
    <>
      <WorkNoteStyles />
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0' }}>

        {/* ── Trigger row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {icon && (
            <span style={{ display: 'flex', alignItems: 'center', color: AI.color.brand, flexShrink: 0 }}>
              {icon}
            </span>
          )}

          <button
            ref={triggerRef}
            className="awn-trigger"
            onClick={hasContent || isActive ? toggle : undefined}
            onMouseEnter={() => setHoverTrigger(true)}
            onMouseLeave={() => setHoverTrigger(false)}
            aria-expanded={hasContent ? isOpen : undefined}
            aria-controls={hasContent ? 'awn-body' : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: F, ...AI_TYPOGRAPHY['@zsai-body-small'],
              color: hoverTrigger && hasContent ? AI.color.brandStrong : AI.color.brand,
              background: hoverTrigger && hasContent
                ? 'var(--ai-brand-surface)'
                : 'transparent',
              border: 'none',
              cursor: hasContent || isActive ? 'pointer' : 'default',
              padding: '2px 6px 2px 4px',
              borderRadius: '6px',
              transition: 'background 0.15s ease, color 0.15s ease',
              boxShadow: 'none',
            }}
          >
            {isActive && loading ? (
              <span style={{ fontFamily: F, fontSize: '13px', fontWeight: 500, color: AI.color.brand }}>
                {resolvedLabel}
                <LoadingDots />
              </span>
            ) : (
              <span style={{ fontFamily: F, fontSize: '13px', fontWeight: 500, color: 'inherit' }}>
                {isComplete ? `${resolvedLabel} complete` : resolvedLabel}
              </span>
            )}
            {showChevron && !isComplete && !(isActive && loading) && (
              <Chevron open={isOpen} />
            )}
          </button>

          {/* hide control */}
          {hideable && !isHidden && (
            <button
              onClick={hide}
              onMouseEnter={() => setHoverHide(true)}
              onMouseLeave={() => setHoverHide(false)}
              aria-label="Hide working note"
              style={{
                fontFamily: F, fontSize: '12px',
                color: hoverHide ? 'var(--ai-zds-text)' : 'var(--ai-zds-helper)',
                background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px',
                transition: 'color 0.15s ease',
              }}
            >
              Hide
            </button>
          )}
        </div>

        {/* ── Expanded body ── */}
        {isOpen && hasContent && (
          <div id="awn-body" role="region" aria-label="Working note details"
            data-awn-open
            style={{
              marginTop: '6px',
              paddingLeft: '4px',
              animation: 'awn-open 0.18s ease forwards',
            }}>

            {content && (
              <p style={{
                fontFamily: F, fontSize: '13px', lineHeight: 1.55,
                color: 'var(--ai-zds-text)', margin: '0 0 6px',
              }}>
                {content}
              </p>
            )}

            {items && items.length > 0 && (
              <ol style={{ margin: '0', padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {items.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: F, fontSize: '13px', lineHeight: 1.55,
                    color: 'var(--ai-zds-text)',
                  }}>
                    {item}
                  </li>
                ))}
              </ol>
            )}

            {/* View trace link */}
            {showViewTrace && (
              <button
                onClick={onViewTrace}
                onMouseEnter={() => setHoverTrace(true)}
                onMouseLeave={() => setHoverTrace(false)}
                style={{
                  display: 'inline-block', marginTop: '8px',
                  fontFamily: F, fontSize: '12px', fontWeight: 500,
                  color: hoverTrace ? AI.color.brandStrong : AI.color.brand,
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: '0',
                  textDecoration: hoverTrace ? 'underline' : 'none',
                  transition: 'color 0.15s ease',
                }}
                aria-label="View full reasoning trace"
              >
                View trace →
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AIAgentWorkNote;
