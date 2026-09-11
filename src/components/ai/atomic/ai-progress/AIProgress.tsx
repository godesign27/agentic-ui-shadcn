import React, { useEffect, useRef } from 'react';
import { AI, ZDS, ZS_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Tier 3 component tokens — ai-progress.* ──────────────────────────────────
//   ai-progress.fill.running       → AI.color.brand (#4D60E6)
//   ai-progress.fill.complete      → var(--success-color)
//   ai-progress.fill.blocked       → ZS_ORANGE[60] (#EC7200)
//   ai-progress.fill.escalated     → ZS_ORANGE[70] (#CB6100)
//   ai-progress.fill.error         → var(--error-color)
//   ai-progress.fill.paused        → ZDS.border
//   ai-progress.track.default      → AI.color.brandSurface (#F5F6FF)
//   ai-progress.shimmer.color      → ZSAI[60] (#7F95F2)
//   ai-progress.height.thin        → 2px
//   ai-progress.height.sm          → 4px
//   ai-progress.height.md          → 6px
//   ai-progress.height.lg          → 10px
//
// ── Mirrored from the standard bar (see § "Standard mirror" below) ────────────
//   ai-progress.fill.progress      → AI.color.brand (#4D60E6)  ← the teal swap
//   ai-progress.fill.info          → var(--zs-background-info-bold, #1b24aa)
//   ai-progress.fill.master        → ZDS.inkBold
//   ai-progress.track.mirror       → AI.color.brandSurface + brandBorder stroke
//   ai-progress.label.onFill       → var(--zs-text-inverse, #fafafa)
//   ai-progress.label.onTrack      → var(--zs-text-default, #2f2c3c)
//   ai-progress.radius.bar         → AI.radius.full (100px)
//   ai-progress.radius.labelled    → AI.radius.sm (12px)
//   ai-progress.height.hairline    → 2px   (AI-only, below the standard scale)
//   ai-progress.height.micro       → 4px   (AI-only)
//   ai-progress.height.fine        → 6px   (AI-only)
//   ai-progress.sweep.duration     → 1400ms linear infinite

// ── Types ─────────────────────────────────────────────────────────────────────

export type AIProgressStatus =
  | 'idle'
  | 'running'
  | 'indeterminate'
  | 'paused'
  | 'resuming'
  | 'complete'
  | 'blocked'
  | 'error'
  | 'escalated'
  | 'disabled';

export type AIProgressVariant = 'linear' | 'thin' | 'header' | 'segmented';

export type AIProgressSize = 'thin' | 'sm' | 'md' | 'lg';

export interface AIProgressSegment {
  id: string;
  label?: string;
  status?: AIProgressStatus;
  value: number; // 0–100, relative weight within the total
}

export interface AIProgressProps {
  // Core value
  value?: number;           // 0–100, required for determinate progress
  min?: number;             // default 0
  max?: number;             // default 100
  status?: AIProgressStatus; // default 'running'
  variant?: AIProgressVariant; // default 'linear'
  size?: AIProgressSize;    // default 'md'

  // Labels
  label?: string;           // primary label above or beside bar
  currentStep?: string;     // e.g. "Step 2 of 5: Analyzing"
  percentLabel?: boolean;   // show numeric percent, default false
  estimatedTimeRemaining?: string; // e.g. "~2 min remaining"
  showLabel?: boolean;      // default true

  // Segmented variant
  segments?: AIProgressSegment[];

  // Behaviour flags
  indeterminate?: boolean;  // force indeterminate shimmer regardless of value

  // A11y
  ariaLabel?: string;

  // Callbacks
  className?: string;
}

// ── Size scale ────────────────────────────────────────────────────────────────
const HEIGHT_MAP: Record<AIProgressSize, string> = {
  thin: '2px',
  sm:   '4px',
  md:   '6px',
  lg:   '10px',
};

// ── Status → fill color ───────────────────────────────────────────────────────
const FILL_COLOR: Record<AIProgressStatus, string> = {
  idle:          AI.color.brandSubtle,
  running:       AI.color.brand,
  indeterminate: AI.color.brand,
  paused:        ZDS.border,
  resuming:      AI.color.action.primary,
  complete:      'var(--success-color)',
  blocked:       ZS_ORANGE[60],
  error:         'var(--error-color)',
  escalated:     ZS_ORANGE[70],
  disabled:      ZDS.border,
};

// Running state gets a gradient for more visual depth
const FILL_GRADIENT: Partial<Record<AIProgressStatus, string>> = {
  running:   `linear-gradient(90deg, ${AI.color.brand} 0%, ${AI.color.action.primaryHover} 100%)`,
  resuming:  `linear-gradient(90deg, ${AI.color.action.primary} 0%, ${AI.color.brand} 100%)`,
  escalated: `linear-gradient(90deg, ${ZS_ORANGE[60]} 0%, ${ZS_ORANGE[70]} 100%)`,
};

// Status label text
const STATUS_LABEL: Partial<Record<AIProgressStatus, string>> = {
  idle:    '',
  paused:  'Paused',
  blocked: 'Blocked',
  error:   'Failed',
  escalated: 'Escalated',
  complete:  'Complete',
  disabled:  '',
};

// Status icon colors (for the dot indicator)
const STATUS_DOT_COLOR: Partial<Record<AIProgressStatus, string>> = {
  complete:  'var(--success-color)',
  blocked:   ZS_ORANGE[60],
  error:     'var(--error-color)',
  escalated: ZS_ORANGE[70],
  paused:    ZDS.border,
};

// ── Keyframe injection helper ─────────────────────────────────────────────────
const SHIMMER_KEY    = 'ai-progress-shimmer';
const INDETERMINATE_KEY = 'ai-progress-indeterminate';

function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SHIMMER_KEY)) return;

  const style = document.createElement('style');
  style.id = SHIMMER_KEY;
  style.textContent = `
    @keyframes ai-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes ai-indeterminate {
      0%   { left: -40%; width: 40%; }
      50%  { left: 30%;  width: 50%; }
      100% { left: 110%; width: 40%; }
    }
    @keyframes ai-progress-settle {
      0%   { opacity: 0.7; transform: scaleX(1.01); }
      100% { opacity: 1;   transform: scaleX(1);    }
    }
    @media (prefers-reduced-motion: reduce) {
      .ai-progress-shimmer  { animation: none !important; }
      .ai-progress-indeterminate { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

// ── Segment component ─────────────────────────────────────────────────────────
function SegmentBar({
  segments,
  height,
  reducedMotion,
}: {
  segments: AIProgressSegment[];
  height: string;
  reducedMotion: boolean;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 100;

  return (
    <div style={{ display: 'flex', gap: '2px', width: '100%', height }}>
      {segments.map((seg, i) => {
        const segStatus: AIProgressStatus = seg.status ?? 'running';
        const pct = (seg.value / total) * 100;
        const fill = FILL_GRADIENT[segStatus] ?? FILL_COLOR[segStatus];
        const isIndeterminate = segStatus === 'indeterminate' || segStatus === 'running';

        return (
          <div
            key={seg.id ?? i}
            role="presentation"
            title={seg.label}
            style={{
              flex: `0 0 ${pct}%`,
              height: '100%',
              borderRadius: '100px',
              background: AI.color.brandSurface,
              border: `1px solid ${AI.color.brandBorder}`,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              className={(!reducedMotion && isIndeterminate) ? 'ai-progress-shimmer' : undefined}
              style={{
                position: 'absolute', inset: 0,
                background: fill,
                backgroundSize: !reducedMotion && isIndeterminate ? '200% 100%' : undefined,
                animation: (!reducedMotion && isIndeterminate) ? `ai-shimmer 1400ms ease-in-out infinite` : undefined,
                borderRadius: '100px',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AIProgress({
  value,
  min = 0,
  max = 100,
  status = 'running',
  variant = 'linear',
  size = 'md',
  label,
  currentStep,
  percentLabel = false,
  estimatedTimeRemaining,
  showLabel = true,
  segments,
  indeterminate = false,
  ariaLabel,
}: AIProgressProps) {
  useEffect(() => { injectKeyframes(); }, []);

  // Detect reduced-motion preference
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const height = HEIGHT_MAP[variant === 'thin' ? 'thin' : size];

  // Effective percent clamped 0–100
  const pct = value !== undefined
    ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    : 0;

  const isIndeterminate = indeterminate
    || status === 'indeterminate'
    || (status === 'running' && value === undefined);

  const fillColor  = FILL_GRADIENT[status] ?? FILL_COLOR[status];
  const trackColor = status === 'disabled'
    ? 'var(--ai-track-bg)'
    : AI.color.brandSurface;

  // Resolve status label
  const resolvedStatusLabel = STATUS_LABEL[status] ?? '';
  const dotColor = STATUS_DOT_COLOR[status];

  // ── thin / header variants — bar only, no surrounding chrome ──────────────
  if (variant === 'thin' || variant === 'header') {
    const isThin = variant === 'thin';
    const h = isThin ? HEIGHT_MAP.thin : HEIGHT_MAP.sm;

    return (
      <div
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : pct}
        aria-label={ariaLabel ?? label ?? 'AI progress'}
        style={{
          width: '100%',
          background: trackColor,
          borderRadius: '100px',
          height: h,
          overflow: 'hidden',
          position: 'relative',
          opacity: status === 'disabled' ? 0.45 : 1,
        }}
      >
        {isIndeterminate ? (
          <div
            className={reducedMotion ? undefined : 'ai-progress-indeterminate'}
            style={{
              position: 'absolute', height: '100%',
              background: fillColor,
              borderRadius: '100px',
              ...(reducedMotion
                ? { width: '40%', left: '30%' }
                : { animation: `ai-indeterminate 1400ms ease-in-out infinite` }
              ),
            }}
          />
        ) : (
          <div
            style={{
              width: `${pct}%`, height: '100%',
              background: fillColor,
              borderRadius: '100px',
              transition: 'width 300ms ease-out',
              ...(status === 'complete' ? { animation: 'ai-progress-settle 280ms ease-out' } : {}),
            }}
          />
        )}
      </div>
    );
  }

  // ── segmented variant ──────────────────────────────────────────────────────
  if (variant === 'segmented' && segments?.length) {
    return (
      <div style={{ width: '100%', fontFamily: F }}>
        {showLabel && (label || currentStep) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            {(label || currentStep) && (
              <span style={{ ...AI_TYPOGRAPHY['@zsai-micro-eyebrow'], color: ZDS.textHelper }}>
                {label ?? currentStep}
              </span>
            )}
            {resolvedStatusLabel && dotColor && (
              <StatusPill status={status} label={resolvedStatusLabel} color={dotColor} />
            )}
          </div>
        )}
        <SegmentBar segments={segments} height={HEIGHT_MAP[size]} reducedMotion={reducedMotion} />
        {estimatedTimeRemaining && (
          <div style={{ marginTop: '4px', fontSize: '12px', color: ZDS.textHelper }}>
            {estimatedTimeRemaining}
          </div>
        )}
      </div>
    );
  }

  // ── linear variant (default) ───────────────────────────────────────────────
  return (
    <div
      style={{ width: '100%', fontFamily: F }}
      aria-live={status === 'complete' || status === 'error' || status === 'blocked' ? 'polite' : undefined}
    >
      {/* Label row */}
      {showLabel && (label || currentStep || resolvedStatusLabel || (percentLabel && !isIndeterminate)) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            {dotColor && <StatusDot color={dotColor} animated={status === 'running' || status === 'resuming'} reducedMotion={reducedMotion} />}
            <span style={{ fontSize: '12px', fontWeight: 600, color: ZDS.textHelper, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {resolvedStatusLabel
                ? resolvedStatusLabel + (label ? ` · ${label}` : '')
                : (currentStep ?? label ?? '')}
            </span>
          </div>
          {percentLabel && !isIndeterminate && (
            <span style={{ fontSize: '12px', fontWeight: 500, color: ZDS.textHelper, flexShrink: 0 }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : pct}
        aria-label={ariaLabel ?? label ?? currentStep ?? resolvedStatusLabel ?? 'AI progress'}
        style={{
          width: '100%',
          background: trackColor,
          border: `1px solid ${AI.color.brandBorder}`,
          borderRadius: '100px',
          height,
          overflow: 'hidden',
          position: 'relative',
          opacity: status === 'disabled' ? 0.45 : 1,
        }}
      >
        {isIndeterminate ? (
          <div
            className={reducedMotion ? undefined : 'ai-progress-indeterminate'}
            style={{
              position: 'absolute',
              height: '100%',
              background: fillColor,
              borderRadius: '100px',
              ...(reducedMotion
                ? { width: '45%', left: '25%' }
                : { animation: `ai-indeterminate 1500ms ease-in-out infinite` }
              ),
            }}
          />
        ) : (
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: fillColor,
              borderRadius: '100px',
              transition: reducedMotion ? 'none' : 'width 350ms ease-out',
              ...(status === 'complete' && !reducedMotion
                ? { animation: 'ai-progress-settle 280ms ease-out' }
                : {}),
            }}
          />
        )}
      </div>

      {/* Sub-label row */}
      {(estimatedTimeRemaining || (currentStep && resolvedStatusLabel)) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          {currentStep && resolvedStatusLabel && (
            <span style={{ fontSize: '12px', color: ZDS.textHelper }}>{currentStep}</span>
          )}
          {estimatedTimeRemaining && (
            <span style={{ fontSize: '12px', color: ZDS.textHelper, marginLeft: 'auto' }}>
              {estimatedTimeRemaining}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sub-atoms (private) ───────────────────────────────────────────────────────

function StatusDot({
  color,
  animated,
  reducedMotion,
}: {
  color: string;
  animated: boolean;
  reducedMotion: boolean;
}) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '6px', height: '6px',
        borderRadius: '100px',
        background: color,
        flexShrink: 0,
        ...(animated && !reducedMotion
          ? { animation: `ai-shimmer 1200ms ease-in-out infinite`, opacity: 0.9 }
          : {}),
      }}
      aria-hidden="true"
    />
  );
}

function StatusPill({ status, label, color }: { status: AIProgressStatus; label: string; color: string }) {
  const bgMap: Partial<Record<AIProgressStatus, string>> = {
    complete:  'var(--success-background-color, #F0FFF4)',
    error:     'var(--error-background-color, #FFEDE9)',
    blocked:   ZS_ORANGE['00'],
    escalated: ZS_ORANGE['00'],
    paused:    'var(--ai-track-bg)',
  };
  const bg = bgMap[status] ?? AI.color.brandSurface;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '1px 7px', borderRadius: '100px',
      background: bg,
      border: `1px solid ${color}22`,
      fontSize: '12px', fontWeight: 600, color, fontFamily: F,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Standard mirror
// ═════════════════════════════════════════════════════════════════════════════
/**
 * Everything below mirrors `zds-progress-bar.tsx` variant for variant, with the
 * AI theme applied. The rule is the one the node connector established: the
 * *accent* swaps and nothing else does.
 *
 *   teal (--zs-background-primary-bold) → AI.color.brand
 *   grey track (--zs-background-medium) → AI.color.brandSurface + brandBorder
 *
 * Semantic fills — error, success, warning, info, paused — are the same values
 * in both libraries and stay as `var(--zs-…)` reads, so a theme change moves the
 * standard bar and the AI bar together. `AI.color.status.success` and `.warning`
 * already resolve to those exact anchors; reading the var keeps one source.
 *
 * The one intentional divergence is geometry. The standard bar's 0px radius is a
 * standard-only rule, called out twice in its own source spec; an AI surface has
 * no square corners anywhere. So plain bars are `AI.radius.full` and the taller
 * labelled boxes step down to `AI.radius.sm`, which reads as a rounded rectangle
 * rather than a stadium.
 *
 * Two rules carry over verbatim and are not configurable:
 *
 *   - **Text color follows the bar it sits on, not the state.** Colored fill →
 *     Text/Inverse, track → Text/Default. Each bar hardcodes its own ink, so
 *     neither illegal pairing is reachable through the API.
 *   - **The label belongs to exactly one bar.** `textOn` picks an owner and the
 *     other layer stays bare — the label never spans the boundary, never changes
 *     color partway across, and is never drawn twice.
 *
 * `AIProgress` above is untouched and still the right entry point for status-led
 * agentic work; these are the shape-led mirrors of the standard set.
 */

// ── Mirror tokens ────────────────────────────────────────────────────────────
const BAR = {
  /** The swap. Everything else on this list is shared with the standard bar. */
  progress: AI.color.brand,
  error:    'var(--zs-background-error-bold, #b21111)',
  success:  'var(--zs-background-success-bold, #0a6e5e)',
  warning:  'var(--zs-background-warning-bold, #8a640c)',
  info:     'var(--zs-background-info-bold, #1b24aa)',
  /** Paused reads as a warning rather than as neutral grey: a suspended task is
   *  something the user is expected to come back to, and grey reads as inert.
   *  Note this makes paused and warning the same fill, so the two are told apart
   *  by their label, not their color — `AIProgressTask` always prefixes
   *  "Paused ·" for that reason. */
  paused:   'var(--zs-background-warning-bold, #8a640c)',
  track:    AI.color.brandSurface,
  trackBorder: AI.color.brandBorder,
  master:   ZDS.inkBold,
  onFill:   'var(--zs-text-inverse, #fafafa)',
  onTrack:  'var(--zs-text-default, #2f2c3c)',
  helper:   ZDS.textHelper,
  blocked:   ZS_ORANGE[60],
  escalated: ZS_ORANGE[70],
} as const;

export type AIProgressBarState =
  | 'progress' | 'error' | 'success' | 'warning' | 'info' | 'paused';

const BAR_FILL: Record<AIProgressBarState, string> = {
  progress: BAR.progress,
  error:    BAR.error,
  success:  BAR.success,
  warning:  BAR.warning,
  info:     BAR.info,
  paused:   BAR.paused,
};

/** The five that mirror the standard's Figma State axis, in page order. */
export const AI_PROGRESS_FIGMA_STATES: AIProgressBarState[] =
  ['progress', 'error', 'success', 'warning', 'info'];

// ── Size scale ───────────────────────────────────────────────────────────────
// The standard's nine sizes, plus three AI-only steps below them. The AI bar has
// always been thinner than the standard scale reaches — 2/4/6px are real usages
// inside card headers and multi-agent modules — so they are added to the bottom
// of the scale rather than rounded up into Tiny(8).

export type AIProgressBarSize =
  | 'hairline' | 'micro' | 'fine'
  | 'tiny' | 'xxsmall' | 'xsmall' | 'small' | 'normal'
  | 'large' | 'xlarge' | 'xxlarge' | 'hero';

interface BarSizeSpec {
  /** Bar thickness in px, and the label font size. */
  bar: number;
  /** Box height when the percentage label is shown. Absent = no text variant. */
  withText?: number;
  /** Starting width. Overridden by `width` or by a flex parent. */
  width: number;
  /** Display name for the docs table. */
  label: string;
}

export const AI_PROGRESS_SIZES: Record<AIProgressBarSize, BarSizeSpec> = {
  // AI-only — too thin to carry text, by construction.
  hairline: { bar: 2,  width: 20,  label: 'Hairline(2px)' },
  micro:    { bar: 4,  width: 20,  label: 'Micro(4px)' },
  fine:     { bar: 6,  width: 25,  label: 'Fine(6px)' },
  // Mirrored from the standard scale, heights and labelled boxes unchanged.
  tiny:     { bar: 8,  withText: 18, width: 20,  label: 'Tiny(8px)' },
  xxsmall:  { bar: 10, withText: 25, width: 25,  label: 'XX-Small(10px)' },
  xsmall:   { bar: 12, withText: 32, width: 30,  label: 'X-Small(12px)' },
  small:    { bar: 14, withText: 34, width: 35,  label: 'Small(14px)' },
  normal:   { bar: 16, withText: 40, width: 40,  label: 'Normal(16px)' },
  large:    { bar: 20, withText: 50, width: 50,  label: 'Large(20px)' },
  xlarge:   { bar: 24, width: 60,  label: 'X-Large(24px)' },
  xxlarge:  { bar: 32, width: 80,  label: 'XX-Large(32px)' },
  hero:     { bar: 48, width: 120, label: 'Hero(48px)' },
};

/**
 * The four legacy `AIProgressSize` names, mapped onto the new scale.
 *
 * `thin`/`sm`/`md` land exactly on the three AI-only steps. `lg` is the one that
 * moves — 10px → Tiny(8px), the nearest step — because the standard scale has no
 * 10px entry and inventing one to preserve a single alias would bend the mirror
 * for no design reason.
 */
export const AI_PROGRESS_SIZE_ALIAS: Record<AIProgressSize, AIProgressBarSize> = {
  thin: 'hairline',
  sm:   'micro',
  md:   'fine',
  lg:   'tiny',
};

/** Sizes that ship a labelled variant. Tiny through Large only. */
export const AI_PROGRESS_TEXT_SIZES: AIProgressBarSize[] =
  (Object.keys(AI_PROGRESS_SIZES) as AIProgressBarSize[])
    .filter((s) => AI_PROGRESS_SIZES[s].withText !== undefined);

/** Carried over from the source spec: Normal(16) is annotated not recommended. */
export const AI_PROGRESS_NOT_RECOMMENDED: AIProgressBarSize[] = ['normal'];

/** Default width of a labelled bar — narrower than this and the label clips. */
const BAR_TEXT_WIDTH = 124;

const clampBar = (v: number) => Math.max(0, Math.min(100, v));

/** Plain bars are pills; a labelled box is tall enough that `full` would read as
 *  a stadium, so it steps down one token. */
const barRadius = (labelled: boolean) => (labelled ? AI.radius.sm : AI.radius.full);

/**
 * The track's 1px stroke, or none.
 *
 * The stroke is inside the box, so it costs 2px of interior height. On Fine(6)
 * and up that is a hairline around a visible channel. On Micro(4) it takes half
 * the bar, and on Hairline(2) it takes all of it — the fill has nowhere to
 * render and the bar reads as a flat rule at every value.
 *
 * So the two thinnest steps drop the stroke and carry themselves on the
 * brandSurface fill alone. This is a legibility floor, not a style choice.
 */
const trackStroke = (size: AIProgressBarSize) =>
  AI_PROGRESS_SIZES[size].bar >= 6 ? `1px solid ${BAR.trackBorder}` : 'none';

// ── Shared label ─────────────────────────────────────────────────────────────
// The clipping frame, mirrored: `overflow: hidden` + `whiteSpace: nowrap` is the
// whole behavior. The label shrinks out of view from the edges rather than
// reflowing or pushing the bar wider.

function BarLabel({
  text, size, color,
}: { text: string; size: AIProgressBarSize; color: string }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minWidth: 0,
        padding: '0 16px',
        fontFamily: F,
        fontWeight: 400,
        fontSize: AI_PROGRESS_SIZES[size].bar,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        color,
      }}
    >
      {text}
    </span>
  );
}

// ── Motion ───────────────────────────────────────────────────────────────────
// A second stylesheet, keyed separately from SHIMMER_KEY so the two cannot
// collide. The reduced-motion override lives inside the sheet rather than in a
// render-time matchMedia read, so the preference is honored the moment it
// changes and there is nothing to get wrong on a re-render.

const BAR_SWEEP_KEY = 'ai-progress-bar-sweep';

function injectBarSweep() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(BAR_SWEEP_KEY)) return;

  const style = document.createElement('style');
  style.id = BAR_SWEEP_KEY;
  // The band is a constant width. A band that grew or shrank would read as a
  // quantity, which is the one thing an indeterminate bar must not do.
  style.textContent = `
    @keyframes ai-progress-bar-sweep {
      0%   { left: -40%; }
      100% { left: 100%; }
    }
    .ai-progress-bar-sweep {
      animation: ai-progress-bar-sweep 1400ms linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .ai-progress-bar-sweep { animation: none; left: 30%; }
    }
  `;
  document.head.appendChild(style);
}

// ── 1. Master ────────────────────────────────────────────────────────────────

export interface AIProgressBarMasterProps {
  size?: AIProgressBarSize;
  width?: number | string;
  /** Overridden to a state color by Duration; near-black otherwise. */
  fill?: string;
  style?: React.CSSProperties;
}

/**
 * The raw rectangle both other layers are built from. Exported because the
 * standard set exports it and the docs page renders it; consumers should reach
 * for `AIProgressBar` or `AIProgressBarDuration` instead.
 */
export function AIProgressBarMaster({
  size = 'fine', width, fill = BAR.master, style,
}: AIProgressBarMasterProps) {
  const spec = AI_PROGRESS_SIZES[size];
  return (
    <div
      aria-hidden="true"
      style={{
        width: width ?? spec.width,
        height: spec.bar,
        background: fill,
        borderRadius: barRadius(false),
        ...style,
      }}
    />
  );
}

// ── 2. Track ─────────────────────────────────────────────────────────────────

export interface AIProgressBarTrackProps {
  size?: AIProgressBarSize;
  /** Show a percentage label centered in the track. Ignored above Large(20). */
  withText?: boolean;
  text?: string;
  width?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * The empty-capacity bar — brandSurface with a brandBorder hairline, which is
 * how every AI track is drawn. Also the positioning context for the composed
 * bar, which is why it takes children.
 */
export function AIProgressBarTrack({
  size = 'fine', withText = false, text = '100%', width, children, style,
}: AIProgressBarTrackProps) {
  const spec = AI_PROGRESS_SIZES[size];
  const showText = withText && spec.withText !== undefined;
  const height = showText ? spec.withText! : spec.bar;

  return (
    <div
      style={{
        position: 'relative',
        width: width ?? (showText ? BAR_TEXT_WIDTH : spec.width),
        height,
        background: BAR.track,
        border: trackStroke(size),
        boxSizing: 'border-box',
        borderRadius: barRadius(showText),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      {showText && <BarLabel text={text} size={size} color={BAR.onTrack} />}
      {children}
    </div>
  );
}

// ── 3. Duration ──────────────────────────────────────────────────────────────

export interface AIProgressBarDurationProps {
  state?: AIProgressBarState;
  size?: AIProgressBarSize;
  withText?: boolean;
  text?: string;
  width?: number | string;
  style?: React.CSSProperties;
}

/**
 * The filled bar, in one of the semantic states. This is the layer a consumer
 * resizes to represent percentage.
 */
export function AIProgressBarDuration({
  state = 'progress', size = 'fine', withText = false, text = '100%', width, style,
}: AIProgressBarDurationProps) {
  const spec = AI_PROGRESS_SIZES[size];
  const showText = withText && spec.withText !== undefined;
  const height = showText ? spec.withText! : spec.bar;

  return (
    <div
      style={{
        width: width ?? (showText ? BAR_TEXT_WIDTH : spec.width),
        height,
        background: BAR_FILL[state],
        borderRadius: barRadius(showText),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}

// ── 4. Composed ──────────────────────────────────────────────────────────────

export interface AIProgressBarProps {
  /** 0–100. Clamped. The only thing that drives the fill width. */
  value: number;
  state?: AIProgressBarState;
  size?: AIProgressBarSize;
  /** Show the percentage inside the bar. Ignored above Large(20). */
  withText?: boolean;
  /** Override the label. Defaults to `${Math.round(value)}%`. */
  text?: string;
  width?: number | string;
  /**
   * Which bar owns the label. One or the other — never both, never mixed.
   *
   *   'duration' → label rides the colored fill, centered in it, Text/Inverse.
   *   'track'    → label sits centered in the track, Text/Default.
   */
  textOn?: 'duration' | 'track';
  /** Accessible name — required unless nearby text already names the bar. */
  label?: string;
  /** Width transition between two known values. Off by default. */
  animate?: boolean;
  /**
   * Sweep a fixed-width band instead of filling to `value`.
   *
   * Only for genuinely unknowable totals. `value` is ignored, `withText` is
   * suppressed — there is no number to show — and `aria-valuenow` is dropped so
   * assistive tech announces a busy bar rather than a false reading.
   */
  indeterminate?: boolean;
  /**
   * Replace the fill color outright, for the two AI activities — blocked and
   * escalated — that have no seat on the semantic state axis. Escape hatch, not
   * a styling hook: anything on the state axis must go through `state`.
   */
  fillOverride?: string;
  style?: React.CSSProperties;
}

/**
 * The two-layer composition: full-width track, duration overlaid at `value`
 * percent. The shape almost every consumer actually wants.
 *
 * `textOn="duration"` is the default: the label is centered inside the colored
 * fill and clipped by it, so it slides with the fill and disappears below
 * roughly 30% width. That is intended — a readout that has to stay visible at 4%
 * belongs beside the bar, or on the track via `textOn="track"`.
 */
export function AIProgressBar({
  value, state = 'progress', size = 'fine', withText = false, text,
  textOn = 'duration', width, label, animate = false, indeterminate = false,
  fillOverride, style,
}: AIProgressBarProps) {
  useEffect(() => { if (indeterminate) injectBarSweep(); }, [indeterminate]);

  const fill = fillOverride ?? BAR_FILL[state];
  const spec = AI_PROGRESS_SIZES[size];
  const pct = clampBar(value);
  // An indeterminate bar has no number, so it has no label either.
  const showText = withText && !indeterminate && spec.withText !== undefined;
  const height = showText ? spec.withText! : spec.bar;
  const copy = text ?? `${Math.round(pct)}%`;
  const radius = barRadius(showText);

  const shell: React.CSSProperties = {
    position: 'relative',
    width: width ?? '100%',
    height,
    background: BAR.track,
    border: trackStroke(size),
    boxSizing: 'border-box',
    borderRadius: radius,
    overflow: 'hidden',
  };

  if (indeterminate) {
    return (
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        aria-busy="true"
        style={{ ...shell, height: spec.bar, ...style }}
      >
        <div
          className="ai-progress-bar-sweep"
          style={{
            position: 'absolute',
            top: 0,
            left: '-40%',
            width: '40%',
            height: '100%',
            background: fill,
            borderRadius: radius,
          }}
        />
      </div>
    );
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      style={{ ...shell, ...style }}
    >
      {/* Track owns the label: dark ink on the tint, centered full width. */}
      {showText && textOn === 'track' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BarLabel text={copy} size={size} color={BAR.onTrack} />
        </div>
      )}

      {/* The fill. When it owns the label, the label is centered *in the fill*
          and clipped by it — the fill is the text's container. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          right: 'auto',
          width: `${pct}%`,
          height: '100%',
          background: fill,
          borderRadius: radius,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: animate ? 'width .3s ease' : undefined,
        }}
      >
        {showText && textOn === 'duration' && (
          <BarLabel text={copy} size={size} color={BAR.onFill} />
        )}
      </div>
    </div>
  );
}

// ── 5. Segmented ─────────────────────────────────────────────────────────────

export interface AIProgressBarSegment {
  id: string;
  /** Tooltip / accessible description for this stretch of the bar. */
  label?: string;
  /** Relative weight. Normalised against the sum, not against 100. */
  value: number;
  state?: AIProgressBarState;
  /** Sweep this segment instead of filling it — the stage in flight. */
  indeterminate?: boolean;
}

export interface AIProgressBarSegmentedProps {
  segments: AIProgressBarSegment[];
  size?: AIProgressBarSize;
  width?: number | string;
  label?: string;
  style?: React.CSSProperties;
}

/**
 * One bar divided into weighted stages, each carrying its own state — the shape
 * for a pipeline whose steps land at different times and can fail
 * independently. Three ingests where the second errored read as one bar with a
 * red middle, not as three bars.
 *
 * 2px of page background between segments, as in the standard, and each cell
 * fully rounded to match the existing AI segment bar.
 */
export function AIProgressBarSegmented({
  segments, size = 'fine', width, label, style,
}: AIProgressBarSegmentedProps) {
  useEffect(() => {
    if (segments.some((s) => s.indeterminate)) injectBarSweep();
  }, [segments]);

  const spec = AI_PROGRESS_SIZES[size];
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0) || 1;

  return (
    <div
      role="group"
      aria-label={label}
      style={{ display: 'flex', gap: 2, width: width ?? '100%', height: spec.bar, ...style }}
    >
      {segments.map((seg) => {
        const share = (Math.max(0, seg.value) / total) * 100;
        const fill = BAR_FILL[seg.state ?? 'progress'];
        return (
          <div
            key={seg.id}
            title={seg.label}
            aria-label={seg.label}
            style={{
              flex: `0 0 ${share}%`,
              position: 'relative',
              height: '100%',
              background: BAR.track,
              border: trackStroke(size),
              boxSizing: 'border-box',
              borderRadius: AI.radius.full,
              overflow: 'hidden',
            }}
          >
            <div
              className={seg.indeterminate ? 'ai-progress-bar-sweep' : undefined}
              style={
                seg.indeterminate
                  ? { position: 'absolute', top: 0, left: '-40%', width: '40%', height: '100%', background: fill, borderRadius: AI.radius.full }
                  : { width: '100%', height: '100%', background: fill, borderRadius: AI.radius.full }
              }
            />
          </div>
        );
      })}
    </div>
  );
}

// ── 6. Activity wrapper ──────────────────────────────────────────────────────

/**
 * The standard's five activities, plus the two the AI library has always had.
 * Blocked and escalated are the reason `AIProgress` exists as its own component
 * — agentic work can stop for a reason that is neither success nor failure.
 */
export type AIProgressActivity =
  | 'running' | 'indeterminate' | 'paused' | 'complete' | 'error'
  | 'blocked' | 'escalated';

/** Activity → the fill it borrows. Blocked and escalated reach past the state
 *  axis into the ZS Orange signal ramp, exactly as FILL_COLOR does above. */
const ACTIVITY_FILL: Record<AIProgressActivity, string> = {
  running:       BAR.progress,
  indeterminate: BAR.progress,
  paused:        BAR.paused,
  complete:      BAR.success,
  error:         BAR.error,
  blocked:       BAR.blocked,
  escalated:     BAR.escalated,
};

/** The word prefixed to the label. Running says nothing — the motion says it. */
const ACTIVITY_TEXT: Partial<Record<AIProgressActivity, string>> = {
  paused:    'Paused',
  complete:  'Complete',
  error:     'Failed',
  blocked:   'Blocked',
  escalated: 'Escalated',
};

export interface AIProgressTaskProps {
  /** 0–100. Ignored when the activity is `indeterminate`. */
  value?: number;
  activity?: AIProgressActivity;
  size?: AIProgressBarSize;
  /** The thing being worked on — "Analyzing territory coverage". */
  label?: string;
  /** Rounded percentage at the right of the label row. */
  percentLabel?: boolean;
  /** Second line under the bar, right-aligned — "~1 min remaining". */
  helperText?: string;
  width?: number | string;
  style?: React.CSSProperties;
}

/**
 * Bar plus its chrome: label row above, optional percentage at the right, bar,
 * optional helper line below. The bar itself is unchanged.
 *
 * Blocked and escalated must name their reason in `label` — a bar that stops
 * without saying why is an accountability gap, not a state.
 */
export function AIProgressTask({
  value = 0, activity = 'running', size = 'fine', label,
  percentLabel = false, helperText, width, style,
}: AIProgressTaskProps) {
  const indeterminate = activity === 'indeterminate';
  const word = ACTIVITY_TEXT[activity];
  const pct = clampBar(value);
  const copy = word ? (label ? `${word} · ${label}` : word) : label;
  const showPercent = percentLabel && !indeterminate;

  // Blocked and escalated have no entry on the state axis, so their fill goes in
  // through `fillOverride` rather than through `state`.
  const offAxis = activity === 'blocked' || activity === 'escalated';
  const state: AIProgressBarState =
    activity === 'paused' ? 'paused'
    : activity === 'complete' ? 'success'
    : activity === 'error' ? 'error'
    : 'progress';

  return (
    <div style={{ width: width ?? '100%', fontFamily: F, ...style }}>
      {(copy || showPercent) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
          <span
            style={{
              ...AI_TYPOGRAPHY['@zsai-micro-eyebrow'],
              minWidth: 0,
              color: BAR.helper,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {copy}
          </span>
          {showPercent && (
            <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], flexShrink: 0, color: BAR.helper }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <AIProgressBar
        value={pct}
        state={state}
        size={size}
        indeterminate={indeterminate}
        animate={activity === 'running'}
        label={copy}
        fillOverride={offAxis ? ACTIVITY_FILL[activity] : undefined}
      />

      {helperText && (
        <div style={{ ...AI_TYPOGRAPHY['@zsai-caption-1'], marginTop: 4, color: BAR.helper, textAlign: 'right' }}>
          {helperText}
        </div>
      )}
    </div>
  );
}

export default AIProgress;
