/**
 * AIToggle — Guild Agentic AI Atom
 *
 * Binary on/off switch (role="switch") used to toggle surfaces, modes, and
 * inline preferences inside AI cards and drawers — explainability, audit
 * mode, autopilot, etc. Pairs a leading label with the track + thumb.
 *
 * Contrast notes (WCAG 1.4.11 — Non-text contrast ≥ 3:1)
 *   - ON track:      AI brand blue (#4D60E6) → white thumb        ≈ 3.5 : 1 ✓
 *   - OFF track:     slate #8D8A93 (darker than DS border)       → white thumb ≈ 3.2 : 1 ✓
 *   - ON border:     matches track tint (no additional border)
 *   - OFF border:    one step darker than track (#6F6C77)         ≥ 3 : 1 against page ✓
 *   - Label text:    var(--ai-ds-text)                            ≥ 4.5 : 1 (passes AA body text)
 *
 * Accessibility
 *   - role="switch" + aria-checked
 *   - Keyboard: Space and Enter toggle; focus ring on :focus-visible
 *   - The whole label is clickable; the inner button is focusable
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type AIToggleSize = 'sm' | 'md';
export type AIToggleLabelPlacement = 'start' | 'end' | 'none';

export interface AIToggleProps {
  checked:          boolean;
  onChange:         (next: boolean) => void;
  label?:           React.ReactNode;
  /** Where the label sits relative to the track. Defaults to 'start' so
      the natural reading order is "Explainability ▢→●". Use 'end' for
      settings rows. */
  labelPlacement?:  AIToggleLabelPlacement;
  size?:            AIToggleSize;
  disabled?:        boolean;
  /** Optional aria-label for icon-only / no-label usage. */
  'aria-label'?:    string;
  id?:              string;
}

interface SizeCfg {
  trackW: number;
  trackH: number;
  thumb:  number;
  pad:    number;
  fontSize: number;
}

const SIZE_CFG: Record<AIToggleSize, SizeCfg> = {
  sm: { trackW: 32, trackH: 16, thumb: 12, pad: 2, fontSize: 12 },
  md: { trackW: 40, trackH: 20, thumb: 16, pad: 2, fontSize: 14 },
};

const OFF_TRACK_BG     = '#8D8A93';
const OFF_TRACK_BORDER = '#6F6C77';
const OFF_TRACK_HOVER  = '#76737E';
const FOCUS_RING       = AI.color.brand;

export function AIToggle({
  checked,
  onChange,
  label,
  labelPlacement = 'start',
  size           = 'md',
  disabled       = false,
  id,
  'aria-label':  ariaLabel,
}: AIToggleProps) {
  const sz = SIZE_CFG[size];
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  const thumbTravel = sz.trackW - sz.thumb - sz.pad * 2;
  const trackBg = disabled
    ? '#D9D8DB'
    : checked
      ? (hover ? AI.color.action.primaryActive : AI.color.brand)
      : (hover ? OFF_TRACK_HOVER : OFF_TRACK_BG);
  const trackBorder = disabled
    ? '#C6C5C8'
    : checked
      ? AI.color.brand
      : OFF_TRACK_BORDER;

  const button = (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={() => { if (!disabled) onChange(!checked); }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: sz.trackW, height: sz.trackH,
        padding: sz.pad,
        borderRadius: 999,
        background: trackBg,
        border: `1px solid ${trackBorder}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        outline: 'none',
        boxShadow: focus ? `0 0 0 2px ${FOCUS_RING}40, 0 0 0 1px ${FOCUS_RING}` : 'none',
        transition: 'background 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
        flexShrink: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: checked ? sz.pad + thumbTravel : sz.pad,
          width: sz.thumb, height: sz.thumb,
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 1px 2px rgba(15, 17, 38, 0.28), 0 0 0 0.5px rgba(15, 17, 38, 0.08)',
          transform: 'translateY(-50%)',
          transition: 'left 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />
    </button>
  );

  if (labelPlacement === 'none' || !label) {
    return button;
  }

  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        ...AI_TYPOGRAPHY['@ai-body-small'],
        fontFamily: F,
        fontSize: sz.fontSize,
        color: 'var(--ai-ds-text)',
        fontWeight: 600,
      }}
    >
      {labelPlacement === 'start' && <span>{label}</span>}
      {button}
      {labelPlacement === 'end'   && <span>{label}</span>}
    </label>
  );
}

export default AIToggle;
