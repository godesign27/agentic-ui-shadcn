import React, { useEffect } from 'react';
import { ZSAI_TAN, ZS_ORANGE, AI } from '../../tokens/ai-tokens';

// ── Types ─────────────────────────────────────────────────────────────────────

export type GuidedLearningVariant =
  | 'announcement'
  | 'guided-step'
  | 'guided-step-media'
  | 'coach-mark'
  | 'completion';

export type GuidedLearningDensity = 'Basic' | 'Simple' | 'Rich' | 'Robust';
export type GuidedLearningCaretSide = 'top' | 'right' | 'bottom' | 'left';
export type GuidedLearningCaretAlign = 'start' | 'center' | 'end';

export interface AIGuidedLearningProps {
  variant?:              GuidedLearningVariant;
  density?:              GuidedLearningDensity;
  title?:                string;
  body?:                 string;
  step?:                 number;
  totalSteps?:           number;
  primaryActionLabel?:   string;
  secondaryActionLabel?: string;
  showClose?:            boolean;
  showSkip?:             boolean;
  showCaret?:            boolean;
  caretSide?:            GuidedLearningCaretSide;
  caretAlign?:           GuidedLearningCaretAlign;
  caretOffset?:          number;
  mediaType?:            'image' | 'video' | 'none';
  mediaSrc?:             string;
  mediaAlt?:             string;
  mediaCaption?:         string;
  showDoNotShow?:        boolean;
  status?:               'default' | 'completed' | 'loading-media' | 'media-unavailable';
  /** Max width in px — defaults to 360 */
  maxWidth?:             number;
  onClose?:              () => void;
  onSkip?:               () => void;
  onNext?:               () => void;
  onBack?:               () => void;
  onPrimaryAction?:      () => void;
  onSecondaryAction?:    () => void;
}

/** Demo guided-learning props for bare mounts / galleries. */
export const SAMPLE_GUIDED_LEARNING = {
  title:      'Meet your workstream coach',
  body:       'Follow a short tour to learn how agents surface next actions, checkpoints, and handoffs.',
  step:       1,
  totalSteps: 3,
};

// ── CSS injection ─────────────────────────────────────────────────────────────
// Light mode: deep navy-purple inverse surface — dark on light UI.
// Dark mode:  soft lavender-white inverse surface — light on dark UI.
// Both modes include a subtle radial accent for depth without distraction.

const DARK = ':is([data-dark="true"], [data-preview-dark="true"])';

const GL_CSS = `
.ai-gl-surface {
  position: relative;
  background:
    radial-gradient(ellipse 70% 55% at 10% 0%, rgba(77, 96, 230,0.18) 0%, transparent 60%),
    linear-gradient(135deg, #1A1628 0%, #22203A 55%, #1E1B2F 100%);
  color: #F0EEF8;
  border: 1px solid rgba(255,255,255,0.10);
  font-family: "Open Sans", system-ui, sans-serif;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 24px ${AI.shadow.action.default}, 0 8px 40px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06);
}

/* Top accent line */
.ai-gl-surface::before {
  content: '';
  display: block;
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, ${AI.color.brand} 0%, ${AI.color.decorative.washStrong} 60%, transparent 100%);
  border-radius: 6px 6px 0 0;
  z-index: 1;
  pointer-events: none;
}

/* Dark mode (both global and scoped preview) — flip to warm ZS-tan inverse surface */
${DARK} .ai-gl-surface {
  background:
    radial-gradient(ellipse 60% 50% at 90% 0%, rgba(184,149,128,0.22) 0%, transparent 55%),
    linear-gradient(135deg, ${ZSAI_TAN['00']} 0%, ${ZSAI_TAN[10]} 55%, ${ZSAI_TAN[20]} 100%);
  color: ${ZSAI_TAN[100]};
  border: 1px solid ${ZSAI_TAN[30]};
  box-shadow: 0 4px 24px rgba(184,149,128,0.20), 0 8px 40px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.14);
}

/* Accent line in dark mode — ZSAI blue on tan reads clearly */
${DARK} .ai-gl-surface::before {
  background: linear-gradient(90deg, ${AI.color.brand} 0%, ${AI.color.decorative.washStrong} 60%, transparent 100%);
}

.ai-gl-text-muted   { color: rgba(240,238,248,0.65); }
.ai-gl-text-accent  { color: ${AI.color.brand}; }

${DARK} .ai-gl-text-muted  { color: ${ZSAI_TAN[80]}; }
${DARK} .ai-gl-text-accent { color: ${AI.color.brand}; }

/* Buttons */
.ai-gl-btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 18px;
  background: ${AI.color.action.primary};
  border: 1px solid ${AI.color.action.primary};
  border-radius: 100px;
  color: #FFFFFF;
  font-size: 13px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
  font-family: inherit;
}
.ai-gl-btn-primary:hover  { background: ${AI.color.action.primaryHover}; border-color: ${AI.color.action.primaryHover}; }
.ai-gl-btn-primary:focus-visible {
  outline: 2px solid ${AI.color.border.focus};
  outline-offset: 2px;
}
/* On tan surface — deeper blue for contrast against warm background */
${DARK} .ai-gl-btn-primary {
  background: ${AI.color.action.primary};
  border-color: ${AI.color.action.primary};
  color: #FFFFFF;
}
${DARK} .ai-gl-btn-primary:hover {
  background: ${AI.color.action.primaryHover};
  border-color: ${AI.color.action.primaryHover};
}

.ai-gl-btn-ghost {
  display: inline-flex; align-items: center;
  padding: 7px 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: rgba(240,238,248,0.70);
  font-size: 13px; font-weight: 500;
  cursor: pointer; white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
  font-family: inherit;
}
.ai-gl-btn-ghost:hover { color: #F0EEF8; border-color: rgba(255,255,255,0.18); }
.ai-gl-btn-ghost:focus-visible { outline: 2px solid ${AI.color.border.focus}; outline-offset: 2px; }
${DARK} .ai-gl-btn-ghost  { color: ${ZSAI_TAN[80]}; }
${DARK} .ai-gl-btn-ghost:hover { color: ${ZSAI_TAN[100]}; border-color: ${ZSAI_TAN[40]}; }

.ai-gl-btn-close {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: rgba(240,238,248,0.55);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
  font-family: inherit;
}
.ai-gl-btn-close:hover { background: rgba(255,255,255,0.10); color: #F0EEF8; }
.ai-gl-btn-close:focus-visible { outline: 2px solid ${AI.color.border.focus}; outline-offset: 2px; }
${DARK} .ai-gl-btn-close  { color: ${ZSAI_TAN[60]}; }
${DARK} .ai-gl-btn-close:hover { background: ${ZSAI_TAN[20]}; color: ${ZSAI_TAN[100]}; }

/* Step dots */
.ai-gl-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,0.28);
  flex-shrink: 0;
  transition: background 0.2s;
}
.ai-gl-dot-active { background: #F0EEF8; }
${DARK} .ai-gl-dot        { background: ${ZSAI_TAN[30]}; }
${DARK} .ai-gl-dot-active { background: ${ZSAI_TAN[100]}; }

/* Badge — ZS-orange signal color */
.ai-gl-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px;
  background: ${ZS_ORANGE[60]};
  border-radius: 100px;
  color: #FFFFFF;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
${DARK} .ai-gl-badge {
  background: ${ZS_ORANGE[50]};
}

/* Media region */
.ai-gl-media {
  width: 100%; border-radius: 4px;
  overflow: hidden;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  display: flex; align-items: center; justify-content: center;
}
${DARK} .ai-gl-media {
  background: ${ZSAI_TAN[20]};
  border-color: ${ZSAI_TAN[30]};
}

/* Completion checkmark */
.ai-gl-check {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
${DARK} .ai-gl-check {
  background: ${ZSAI_TAN[20]};
  border-color: ${ZSAI_TAN[40]};
}

/* SVG caret — positioned as a sibling of .ai-gl-surface in the outer wrapper */
.ai-gl-caret {
  position: absolute;
  pointer-events: none;
  overflow: visible;
}
.ai-gl-caret-fill { fill: #22203A; }
.ai-gl-caret-border { fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 1; }
${DARK} .ai-gl-caret-fill  { fill: ${ZSAI_TAN['00']}; }
${DARK} .ai-gl-caret-border { stroke: ${ZSAI_TAN[30]}; }

/* Divider */
.ai-gl-divider {
  width: 100%; height: 1px;
  background: rgba(255,255,255,0.10);
  border: none; margin: 0;
}
${DARK} .ai-gl-divider { background: ${ZSAI_TAN[30]}; }

/* Do not show again checkbox row */
.ai-gl-dns {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px;
  color: rgba(240,238,248,0.55);
  cursor: pointer;
}
${DARK} .ai-gl-dns { color: ${ZSAI_TAN[70]}; }

@media (prefers-reduced-motion: reduce) {
  .ai-gl-surface, .ai-gl-btn-primary, .ai-gl-btn-ghost, .ai-gl-btn-close {
    transition: none !important;
  }
}
`;

// ── Caret SVG — rounded-nose speech-bubble pointer ───────────────────────────

const CW = 20; // caret width  (for top/bottom; becomes height for left/right)
const CH = 11; // caret height (for top/bottom; becomes width  for left/right)

function CaretSVG({
  side, align, offset = 0,
}: {
  side:   GuidedLearningCaretSide;
  align:  GuidedLearningCaretAlign;
  offset?: number;
}) {
  let svgW: number, svgH: number, fillD: string, borderD: string;

  if (side === 'bottom') {
    svgW = CW; svgH = CH;
    fillD   = `M 0,0 L ${CW},0 L ${CW/2+2},${CH-2} Q ${CW/2},${CH} ${CW/2-2},${CH-2} Z`;
    borderD = `M 0,0 L ${CW/2+2},${CH-2} Q ${CW/2},${CH} ${CW/2-2},${CH-2} L ${CW},0`;
  } else if (side === 'top') {
    svgW = CW; svgH = CH;
    fillD   = `M 0,${CH} L ${CW},${CH} L ${CW/2+2},2 Q ${CW/2},0 ${CW/2-2},2 Z`;
    borderD = `M 0,${CH} L ${CW/2+2},2 Q ${CW/2},0 ${CW/2-2},2 L ${CW},${CH}`;
  } else if (side === 'left') {
    svgW = CH; svgH = CW;
    fillD   = `M ${CH},0 L ${CH},${CW} L 2,${CW/2+2} Q 0,${CW/2} 2,${CW/2-2} Z`;
    borderD = `M ${CH},0 L 2,${CW/2+2} Q 0,${CW/2} 2,${CW/2-2} L ${CH},${CW}`;
  } else {
    svgW = CH; svgH = CW;
    fillD   = `M 0,0 L 0,${CW} L ${CH-2},${CW/2+2} Q ${CH},${CW/2} ${CH-2},${CW/2-2} Z`;
    borderD = `M 0,0 L ${CH-2},${CW/2+2} Q ${CH},${CW/2} ${CH-2},${CW/2-2} L 0,${CW}`;
  }

  const hAlign = align === 'start' ? `${offset + 16}px` : align === 'end' ? `calc(100% - ${offset + 16 + CW}px)` : `calc(50% - ${CW / 2}px)`;
  const vAlign = align === 'start' ? `${offset + 16}px` : align === 'end' ? `calc(100% - ${offset + 16 + CW}px)` : `calc(50% - ${CW / 2}px)`;

  const pos: React.CSSProperties = { position: 'absolute', pointerEvents: 'none' };
  if (side === 'bottom') { pos.bottom = 0; pos.left = hAlign as string; }
  else if (side === 'top')   { pos.top  = 0; pos.left = hAlign as string; }
  else if (side === 'left')  { pos.left  = 0; pos.top = vAlign as string; }
  else                       { pos.right = 0; pos.top = vAlign as string; }

  return (
    <svg
      className="ai-gl-caret"
      style={pos}
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      aria-hidden="true"
    >
      <path className="ai-gl-caret-fill" d={fillD} />
      <path className="ai-gl-caret-border" d={borderD} />
    </svg>
  );
}

// ── Close icon (inline SVG, no lucide dep needed) ─────────────────────────────

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M4 11.5l5 5 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.22 3.22l2.12 2.12M10.66 10.66l2.12 2.12M3.22 12.78l2.12-2.12M10.66 5.34l2.12-2.12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ── Media region ──────────────────────────────────────────────────────────────

function MediaRegion({
  type, src, alt, caption, status,
}: {
  type: 'image' | 'video' | 'none';
  src?: string;
  alt?: string;
  caption?: string;
  status?: AIGuidedLearningProps['status'];
}) {
  if (type === 'none') return null;

  const HEIGHT = 160;

  const inner =
    status === 'loading-media' ? (
      <div style={{ height: HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,238,248,0.40)', fontSize: 12 }}>
        Loading…
      </div>
    ) : status === 'media-unavailable' ? (
      <div style={{ height: HEIGHT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'rgba(240,238,248,0.40)', fontSize: 12 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        Media unavailable
      </div>
    ) : type === 'image' && src ? (
      <img src={src} alt={alt ?? ''} style={{ width: '100%', height: HEIGHT, objectFit: 'cover', display: 'block' }} />
    ) : type === 'video' && src ? (
      <video src={src} controls style={{ width: '100%', height: HEIGHT, display: 'block' }} aria-label={alt} />
    ) : (
      // placeholder when no src provided
      <div style={{ height: HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="28" height="28" rx="4" stroke="rgba(240,238,248,0.25)" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="3" stroke="rgba(240,238,248,0.35)" strokeWidth="1.5" />
          <path d="M2 22l8-7 6 6 4-4 10 8" stroke="rgba(240,238,248,0.30)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    );

  return (
    <div>
      <div className="ai-gl-media">{inner}</div>
      {caption && (
        <p style={{ margin: '6px 0 0', fontSize: 11, lineHeight: 1.5 }} className="ai-gl-text-muted">{caption}</p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AIGuidedLearning({
  variant               = 'guided-step',
  density               = 'Simple',
  title                 = SAMPLE_GUIDED_LEARNING.title,
  body                  = SAMPLE_GUIDED_LEARNING.body,
  step                  = SAMPLE_GUIDED_LEARNING.step,
  totalSteps            = SAMPLE_GUIDED_LEARNING.totalSteps,
  primaryActionLabel,
  secondaryActionLabel,
  showClose             = true,
  showSkip              = false,
  showCaret             = false,
  caretSide             = 'bottom',
  caretAlign            = 'center',
  caretOffset           = 0,
  mediaType             = 'none',
  mediaSrc,
  mediaAlt,
  mediaCaption,
  showDoNotShow         = false,
  status                = 'default',
  maxWidth              = 360,
  onClose               = () => undefined,
  onSkip                = () => undefined,
  onNext                = () => undefined,
  onBack                = () => undefined,
  onPrimaryAction       = () => undefined,
  onSecondaryAction     = () => undefined,
}: AIGuidedLearningProps) {
  // CSS is injected once per mount
  useEffect(() => {
    const id = 'ai-gl-styles-v7';
    ['ai-gl-styles', 'ai-gl-styles-v2', 'ai-gl-styles-v3', 'ai-gl-styles-v4', 'ai-gl-styles-v5', 'ai-gl-styles-v6'].forEach(old => document.getElementById(old)?.remove());
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = GL_CSS;
      document.head.appendChild(el);
    }
  }, []);

  const isCompletion   = variant === 'completion'         || status === 'completed';
  const hasMedia       = (variant === 'guided-step-media' && mediaType !== 'none') || (density === 'Rich' || density === 'Robust');
  const hasProgress    = (step !== undefined && totalSteps !== undefined) && density !== 'Basic';
  const showBack       = density === 'Robust' && step !== undefined && step > 1;
  const showPrimary    = primaryActionLabel !== undefined || density !== 'Basic';
  const resolvedPrimary   = primaryActionLabel   ?? (isCompletion ? 'Done' : hasProgress && step !== undefined && totalSteps !== undefined && step < totalSteps ? 'Next' : 'Got it');
  const resolvedSecondary = secondaryActionLabel ?? (showBack ? 'Back' : undefined);

  const PAD = density === 'Basic' ? 16 : 20;

  // Padding to make room for the caret outside the surface
  const outerPad: React.CSSProperties = showCaret
    ? { paddingBottom: caretSide === 'bottom' ? CH : 0, paddingTop: caretSide === 'top' ? CH : 0, paddingLeft: caretSide === 'left' ? CH : 0, paddingRight: caretSide === 'right' ? CH : 0 }
    : {};

  return (
    <div style={{ position: 'relative', maxWidth, width: '100%', ...outerPad }}>
      {/* SVG caret lives OUTSIDE .ai-gl-surface so overflow:hidden doesn't clip it */}
      {showCaret && <CaretSVG side={caretSide} align={caretAlign} offset={caretOffset} />}

      <div
        className="ai-gl-surface"
        role="dialog"
        aria-modal="false"
        aria-label={title}
        style={{ width: '100%' }}
      >

      {/* ── Header row ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: `${PAD}px ${PAD}px ${body || hasMedia ? 12 : PAD}px` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
          {/* Eyebrow: badge or step count */}
          {!isCompletion && (
            <div style={{ display: 'flex', align: 'center', gap: 8, flexWrap: 'wrap' as const }}>
              {variant === 'announcement' && density !== 'Basic' && (
                <span className="ai-gl-badge" aria-label="New feature">
                  <SparkIcon />
                  New
                </span>
              )}
              {hasProgress && step !== undefined && totalSteps !== undefined && (
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }} className="ai-gl-text-muted">
                  Step {step} of {totalSteps}
                </span>
              )}
            </div>
          )}

          {/* Completion icon */}
          {isCompletion && (
            <div className="ai-gl-check" style={{ marginBottom: 4 }}>
              <CheckIcon />
            </div>
          )}

          {/* Title */}
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: 'inherit' }}>
            {title}
          </h2>
        </div>

        {showClose && (
          <button
            className="ai-gl-btn-close"
            onClick={onClose}
            aria-label="Dismiss guided learning"
            type="button"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* ── Body ── */}
      {body && (
        <p style={{ margin: `0 ${PAD}px ${hasMedia || hasProgress || showPrimary || showSkip ? 14 : PAD}px`, fontSize: 13, lineHeight: 1.6, color: 'inherit' }} className="ai-gl-text-muted">
          {body}
        </p>
      )}

      {/* ── Media ── */}
      {hasMedia && mediaType !== 'none' && (
        <div style={{ padding: `0 ${PAD}px`, marginBottom: 14 }}>
          <MediaRegion type={mediaType} src={mediaSrc} alt={mediaAlt} caption={mediaCaption} status={status} />
        </div>
      )}

      {/* ── Progress dots (Rich/Robust with step) ── */}
      {hasProgress && totalSteps !== undefined && totalSteps > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: `0 ${PAD}px`, marginBottom: 14 }} aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`ai-gl-dot${i === (step ?? 1) - 1 ? ' ai-gl-dot-active' : ''}`}
            />
          ))}
        </div>
      )}

      {/* ── Divider before action row ── */}
      {(showPrimary || showSkip || showBack || showDoNotShow) && (
        <hr className="ai-gl-divider" />
      )}

      {/* ── Action row ── */}
      {(showPrimary || showSkip || showBack || showDoNotShow) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `12px ${PAD}px ${showDoNotShow ? 8 : PAD}px`, gap: 8, flexWrap: 'wrap' as const }}>
          {/* Left: skip or back */}
          <div style={{ display: 'flex', gap: 4 }}>
            {showBack && (
              <button className="ai-gl-btn-ghost" onClick={onBack} type="button" aria-label="Go to previous step">
                <ArrowLeftIcon />
                Back
              </button>
            )}
            {showSkip && !showBack && (
              <button className="ai-gl-btn-ghost" onClick={onSkip} type="button">
                Skip
              </button>
            )}
          </div>

          {/* Right: secondary + primary */}
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            {resolvedSecondary && !showBack && (
              <button className="ai-gl-btn-ghost" onClick={onSecondaryAction} type="button">
                {resolvedSecondary}
              </button>
            )}
            {showPrimary && (
              <button
                className="ai-gl-btn-primary"
                onClick={onPrimaryAction ?? onNext}
                type="button"
              >
                {resolvedPrimary}
                {!isCompletion && hasProgress && step !== undefined && totalSteps !== undefined && step < totalSteps && <ArrowRightIcon />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Do not show again ── */}
      {showDoNotShow && (
        <div style={{ padding: `0 ${PAD}px ${PAD}px` }}>
          <label className="ai-gl-dns">
            <input type="checkbox" style={{ accentColor: AI.color.action.primary, width: 14, height: 14, flexShrink: 0 }} />
            Don't show this again
          </label>
        </div>
      )}
      </div>
    </div>
  );
}

export default AIGuidedLearning;
