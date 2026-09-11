/**
 * AI Slider — the standard ZDS Slider, re-surfaced in the AI theme.
 *
 * This is a mirror of `src/app/components/zds/zds-slider.tsx`, not a new
 * component. Geometry, state machine, keyboard model, ARIA and part structure
 * are identical; only the *surface* moves. The standard slider's accent ladder
 * is teal → dark-teal → navy (inactive → hover → active/pressed), and the AI
 * ladder is the same three rungs read off the ZSAI ramp:
 *
 *   #2F6F7B  teal        inactive track   → AI.color.brand        #4D60E6
 *   #2D535F  dark teal   hover handle     → AI.color.brandStrong  #3544A4
 *   #022D42  navy        active + pressed → AI.color.brandInk     #1F2A66
 *
 * That is the whole swap on the default mode. It preserves the *relationship*
 * the Figma ladder encodes — the inactive rule is the lightest, the handle
 * darkens on hover, the committed value is the darkest — rather than tinting
 * everything one shade of brand and losing the depth cue that tells you which
 * part of the control is live.
 *
 * Three deliberate divergences from the standard:
 *
 *   - **Error is the AI status red, not the standard's.** The standard uses
 *     #B21111 / #5C1A0B / #3F211B; AI surfaces already carry `ZS_RED` for
 *     destructive state, and mixing two reds on one screen is worse than the
 *     mirror being imperfect. The three-hue structure is kept: separate values
 *     for inactive, active and pressed, because error is a *mode* here too, not
 *     a tint on one element.
 *   - **Disabled and neutrals stay ZDS.** A disabled control has no brand — it
 *     has no state to express. Swapping its grey for a brand-tinted grey would
 *     make "off" look like a quiet "on".
 *   - **Typography reads `AI_TYPOGRAPHY`, not raw pixels.** The Figma rule label
 *     is Open Sans Bold 12 and the tooltip Bold 16, which map onto `@zsai-h6`
 *     and `@zsai-h4` exactly — so the AI mirror uses the tokens and inherits
 *     any future change to the AI type scale.
 *
 * Everything else the standard file argues for holds here verbatim and is not
 * re-argued: Standard is a read-only rule (`role="img"`, no handle, no value),
 * Dynamic is the control, the active fill is a second Track laid *over* the
 * inactive one rather than replacing it, and Disabled keeps its tooltip.
 */

import React from 'react';
import { AI, ZS_RED, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Tier 3 component tokens — ai-slider.* ────────────────────────────────────
//   ai-slider.track.inactive     → AI.color.brand        (#4D60E6) @70%   ← the teal swap
//   ai-slider.track.active       → AI.color.brandInk     (#1F2A66)
//   ai-slider.handle.hover       → AI.color.brandStrong  (#3544A4)
//   ai-slider.handle.pressed     → AI.color.brandInk     (#1F2A66)
//   ai-slider.tick.enabled       → AI.color.brandInk     (#1F2A66)
//   ai-slider.handle.border      → var(--zs-border-strong, #5b5864)
//   ai-slider.focus.ring         → AI.color.border.focus
//   ai-slider.tooltip.surface    → AI.color.brandInk     (#1F2A66)
//   ai-slider.track.error        → ZS_RED[60] / [80] / [100]
//   ai-slider.*.disabled         → the ZDS neutrals, unswapped

const TOKEN = {
  /** The inactive rule. Standard's teal; here the brand accent itself. */
  accent:      `var(--zs-ai-slider-track-inactive, ${AI.color.brand})`,
  /** Hover handle — one rung deeper than the rule, as dark teal is in the standard. */
  accentDeep:  `var(--zs-ai-slider-handle-hover, ${AI.color.brandStrong})`,
  /** Active fill, pressed handle, enabled ticks. The darkest rung. */
  accentInk:   `var(--zs-ai-slider-track-active, ${AI.color.brandInk})`,

  /** Neutrals — carried across from the standard unchanged. */
  disabled:    'var(--zs-background-strong, #716e79)',
  tickOff:     'var(--zs-background-extra-strong, #454250)',
  handleEdge:  'var(--zs-border-strong, #5b5864)',
  text:        'var(--zs-text-default, #2f2c3c)',
  textOff:     'var(--zs-text-disabled, #716e79)',
  inverse:     'var(--zs-text-inverse, #fafafa)',
  surface:     'var(--zs-background-default, #ffffff)',

  /** Error mode — the AI status red, three rungs deep like the standard's. */
  error:       `var(--zs-ai-slider-track-error, ${ZS_RED[60]})`,
  errorDeep:   `var(--zs-ai-slider-track-error-active, ${ZS_RED[80]})`,
  errorInk:    `var(--zs-ai-slider-handle-error-pressed, ${ZS_RED[100]})`,

  /**
   * The focus ring stays the ZDS focus blue rather than moving to
   * `AI.color.border.focus` — which is `AI.color.brand` itself, and would put a
   * brand-blue ring around a handle sitting on a brand-blue track. A focus ring
   * has to be legible against whatever it lands on, so it stays outside both
   * accent ladders.
   */
  focus:       'var(--zs-border-focus, #2f9bff)',
  tooltip:     `var(--zs-ai-slider-tooltip-surface, ${AI.color.brandInk})`,

  /** Validation gradient — the AI semantic triad rather than the raw ZDS hexes. */
  validation0: `var(--zs-ai-slider-validation-low, ${AI.color.status.error})`,
  validation1: `var(--zs-ai-slider-validation-mid, ${AI.color.status.warning})`,
  validation2: `var(--zs-ai-slider-validation-high, ${AI.color.status.success})`,
} as const;

export type AISliderMode = 'default' | 'error';
export type AISliderState = 'default' | 'error' | 'disabled';
export type AISliderType = 'standard' | 'dynamic';

export const AI_SLIDER_STATES: AISliderState[] = ['default', 'error', 'disabled'];
export const AI_SLIDER_TYPES: AISliderType[] = ['standard', 'dynamic'];

/** Geometry — identical to the standard. The mirror is a repaint, not a redraw. */
const TICK_SIZE   = 4;
const TICK_RADIUS = 2;
const TRACK_H     = 4;
const HANDLE      = 16;
const FOCUS_RING  = 24;

// ── Part · Tick ──────────────────────────────────────────────────────────────

export interface AISliderTickProps {
  mode?: AISliderMode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function AISliderTick({ mode = 'default', disabled = false, style }: AISliderTickProps) {
  const fill = disabled ? TOKEN.tickOff : mode === 'error' ? TOKEN.errorInk : TOKEN.accentInk;

  return (
    <span
      aria-hidden="true"
      data-name="ai-slider-tick"
      style={{
        display: 'block',
        width: TICK_SIZE,
        height: TICK_SIZE,
        borderRadius: TICK_RADIUS,
        background: fill,
        flex: '0 0 auto',
        ...style,
      }}
    />
  );
}

// ── Part · Track ─────────────────────────────────────────────────────────────

export type AISliderTrackState =
  | 'inactive-enabled'
  | 'active-enabled'
  | 'inactive-disabled'
  | 'active-disabled'
  | 'validation';

export interface AISliderTrackProps {
  mode?: AISliderMode;
  state?: AISliderTrackState;
  width?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Opacity is part of the variant, not styling: the inactive rule is translucent
 * so an active track laid over it still reads as one rule rather than two bars.
 */
export function AISliderTrack({
  mode = 'default',
  state = 'inactive-enabled',
  width = '100%',
  children,
  style,
}: AISliderTrackProps) {
  let fill: string;
  let opacity = 1;

  if (state === 'validation') {
    fill = `linear-gradient(90deg, ${TOKEN.validation0} 0%, ${TOKEN.validation1} 48%, ${TOKEN.validation2} 100%)`;
  } else if (state === 'inactive-enabled') {
    fill = mode === 'error' ? TOKEN.error : TOKEN.accent;
    opacity = 0.7;
  } else if (state === 'active-enabled') {
    fill = mode === 'error' ? TOKEN.errorDeep : TOKEN.accentInk;
  } else if (state === 'inactive-disabled') {
    fill = TOKEN.disabled;
    opacity = 0.5;
  } else {
    fill = TOKEN.disabled;
  }

  return (
    <div
      aria-hidden="true"
      data-name={`ai-slider-track/${state}`}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width,
        height: TRACK_H,
        borderRadius: TRACK_H,
        background: TOKEN.surface,
        opacity,
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, borderRadius: TRACK_H, background: fill }} />
      {children}
    </div>
  );
}

// ── Part · Handle ────────────────────────────────────────────────────────────

export type AISliderHandleState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';

export interface AISliderHandleProps {
  mode?: AISliderMode;
  state?: AISliderHandleState;
  style?: React.CSSProperties;
}

/**
 * The three stacked shadows are the resting elevation, dropped on `pressed` and
 * `disabled` — a handle being dragged is held against the track, not floating
 * above it.
 */
const HANDLE_SHADOW = [
  '0 0 1px 0 rgba(0, 0, 0, 0.04)',
  '0 0 2px 0 rgba(31, 42, 102, 0.14)',
  '0 2px 4px 0 rgba(31, 42, 102, 0.14)',
].join(', ');

export function AISliderHandle({ mode = 'default', state = 'default', style }: AISliderHandleProps) {
  const error = mode === 'error';

  let fill = TOKEN.surface;
  let border: string | undefined = `1px solid ${TOKEN.handleEdge}`;

  if (state === 'hover') {
    fill = error ? TOKEN.errorDeep : TOKEN.accentDeep;
    border = error ? `1px solid ${TOKEN.errorDeep}` : undefined;
  } else if (state === 'pressed') {
    fill = error ? TOKEN.errorInk : TOKEN.accentInk;
    border = undefined;
  } else if (state === 'disabled') {
    fill = TOKEN.disabled;
    border = undefined;
  }

  const elevated = state === 'default' || state === 'hover' || state === 'focus';

  return (
    <span
      aria-hidden="true"
      data-name={`ai-slider-handle/${state}`}
      style={{ position: 'relative', display: 'block', width: HANDLE, height: HANDLE, ...style }}
    >
      <span
        style={{
          boxSizing: 'border-box',
          display: 'block',
          width: HANDLE,
          height: HANDLE,
          borderRadius: '50%',
          background: fill,
          border,
          boxShadow: elevated ? HANDLE_SHADOW : undefined,
        }}
      />
      {state === 'focus' && (
        <span
          style={{
            position: 'absolute',
            left: -4,
            top: -4,
            width: FOCUS_RING,
            height: FOCUS_RING,
            borderRadius: '50%',
            border: `2px solid ${TOKEN.focus}`,
            pointerEvents: 'none',
          }}
        />
      )}
    </span>
  );
}

// ── Part · Rule label ────────────────────────────────────────────────────────

export interface AISliderRuleLabelProps {
  children?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** `@zsai-h6` — 12/700/1.4, the AI token that matches the Figma rule label. */
export function AISliderRuleLabel({ children = '10', disabled = false, style }: AISliderRuleLabelProps) {
  return (
    <span
      data-name="ai-slider-rule-label"
      style={{
        fontFamily: F,
        ...AI_TYPOGRAPHY['@zsai-h6'],
        letterSpacing: '-0.15px',
        color: disabled ? TOKEN.textOff : TOKEN.text,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── Part · Tooltip ───────────────────────────────────────────────────────────

export interface AISliderTooltipProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** `@zsai-h4` on brand ink, with the 12×6 arrow beneath. */
export function AISliderTooltip({ children = '50', style }: AISliderTooltipProps) {
  return (
    <span
      aria-hidden="true"
      data-name="ai-slider-tooltip"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 35,
          padding: '4px 8px',
          borderRadius: AI.radius.xs,
          background: TOKEN.tooltip,
          fontFamily: F,
          ...AI_TYPOGRAPHY['@zsai-h4'],
          color: TOKEN.inverse,
        }}
      >
        {children}
      </span>
      <svg width="12" height="6" viewBox="0 0 12 6" style={{ display: 'block' }} aria-hidden="true">
        <path d="M0 0 L6 6 L12 0 Z" fill={TOKEN.tooltip} />
      </svg>
    </span>
  );
}

// ── Composed · Slider ────────────────────────────────────────────────────────

export interface AISliderProps {
  type?: AISliderType;
  state?: AISliderState;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  ticks?: number;
  labels?: (string | number)[];
  showLabels?: boolean;
  showTooltip?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  formatValue?: (value: number) => string;
  width?: number | string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  style?: React.CSSProperties;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function quantize(raw: number, min: number, max: number, step: number): number {
  const snapped = Math.round((raw - min) / step) * step + min;
  // Re-round to the step's own precision, or 0.1 + 0.2 arithmetic leaks into the
  // value and the tooltip prints 0.30000000000000004.
  const decimals = (String(step).split('.')[1] ?? '').length;
  return Number(clamp(snapped, min, max).toFixed(decimals));
}

export function AISlider({
  type = 'standard',
  state = 'default',
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  ticks = 11,
  labels = ['10', '10', '10', '10', '10'],
  showLabels = true,
  showTooltip = true,
  formatValue,
  width = 329,
  onChange,
  onChangeEnd,
  style,
  ...aria
}: AISliderProps) {
  const disabled = state === 'disabled';
  const mode: AISliderMode = state === 'error' ? 'error' : 'default';

  const [uncontrolled, setUncontrolled] = React.useState(clamp(defaultValue, min, max));
  const current = value !== undefined ? clamp(value, min, max) : uncontrolled;

  const [dragging, setDragging] = React.useState(false);
  const [hovered, setHovered]   = React.useState(false);
  const [focused, setFocused]   = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(current) : String(current);

  const commit = React.useCallback(
    (next: number) => {
      if (value === undefined) setUncontrolled(next);
      if (next !== current) onChange?.(next);
    },
    [value, current, onChange],
  );

  const valueFromClientX = React.useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return current;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return current;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      return quantize(min + ratio * (max - min), min, max, step);
    },
    [current, min, max, step],
  );

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    commit(valueFromClientX(e.clientX));
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || disabled) return;
    commit(valueFromClientX(e.clientX));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
    onChangeEnd?.(valueFromClientX(e.clientX));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    const big = (max - min) / 10;
    let next: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp')        next = current + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown')  next = current - step;
    else if (e.key === 'PageUp')                              next = current + big;
    else if (e.key === 'PageDown')                            next = current - big;
    else if (e.key === 'Home')                                next = min;
    else if (e.key === 'End')                                 next = max;

    if (next === null) return;
    e.preventDefault();
    const q = quantize(next, min, max, step);
    commit(q);
    onChangeEnd?.(q);
  }

  const tickNodes = ticks > 0 && (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: ticks }).map((_, i) => (
        <AISliderTick
          key={i}
          mode={mode}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: 0,
            left: `${(i / Math.max(1, ticks - 1)) * 100}%`,
            transform: `translateX(${-(i / Math.max(1, ticks - 1)) * 100}%)`,
          }}
        />
      ))}
    </div>
  );

  const ruleLabels = showLabels && labels.length > 0 && (
    <div
      aria-hidden="true"
      style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', marginBottom: 4 }}
    >
      {labels.map((l, i) => (
        <AISliderRuleLabel key={i} disabled={disabled}>{l}</AISliderRuleLabel>
      ))}
    </div>
  );

  const rule = (
    <div style={{ position: 'relative', height: TRACK_H }}>
      <AISliderTrack mode={mode} state={disabled ? 'inactive-disabled' : 'inactive-enabled'} width="100%" />
      {tickNodes}
    </div>
  );

  if (type === 'standard') {
    return (
      <div
        role="img"
        aria-label={aria['aria-label'] ?? 'Scale'}
        aria-labelledby={aria['aria-labelledby']}
        data-name="ai-slider/standard"
        style={{ width, fontFamily: F, ...style }}
      >
        {ruleLabels}
        {rule}
      </div>
    );
  }

  const handleState: AISliderHandleState =
    disabled ? 'disabled' : dragging ? 'pressed' : focused ? 'focus' : hovered ? 'hover' : 'default';

  return (
    <div data-name="ai-slider/dynamic" style={{ width, fontFamily: F, ...style }}>
      {ruleLabels}

      <div
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={display}
        aria-orientation="horizontal"
        aria-disabled={disabled || undefined}
        aria-label={aria['aria-label']}
        aria-labelledby={aria['aria-labelledby']}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          height: TRACK_H,
          margin: `${showTooltip ? 46 : 8}px 0 8px`,
          cursor: disabled ? 'not-allowed' : 'pointer',
          touchAction: 'none',
          outline: 'none',
        }}
      >
        <AISliderTrack
          mode={mode}
          state={disabled ? 'inactive-disabled' : 'inactive-enabled'}
          width="100%"
          style={{ position: 'absolute', inset: 0 }}
        />
        {tickNodes}

        <AISliderTrack
          mode={mode}
          state={disabled ? 'active-disabled' : 'active-enabled'}
          width={`${pct}%`}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />

        <div
          style={{
            position: 'absolute',
            left: `${pct}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {showTooltip && (
            <AISliderTooltip style={{ position: 'absolute', bottom: `${HANDLE / 2 + 8}px` }}>
              {display}
            </AISliderTooltip>
          )}
          <AISliderHandle mode={mode} state={handleState} />
        </div>
      </div>
    </div>
  );
}

export default AISlider;
