import React from 'react';
import { RiCalendarLine, RiCalendarScheduleLine, RiTimeLine } from '@remixicon/react';
import { AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

/**
 * AIPickerTrigger — Atom
 *
 * The AI-branded input shell that replaces the standard ZDS picker trigger when
 * AI is present. Visual only: label, value display, trailing icon, and (at
 * rich/robust density) an AI badge. It holds NO suggestion logic, calendar, or
 * popover — those belong to the `ai-picker` group that composes this atom.
 *
 * Tokens follow the library brand ramp (AI.color.*, ZSAI indigo). The spec's
 * "$color-blue-*" maps to brandBorder / border.focus / text.primary so the
 * trigger stays consistent with every other AI atom.
 */

export type AIPickerIcon = 'calendar' | 'calendar-range' | 'clock';
export type AIPickerDensity = 'basic' | 'simple' | 'rich' | 'robust';
export type AIPickerTriggerState = 'default' | 'focused' | 'selected' | 'disabled' | 'error';

export interface AIPickerTriggerProps {
  label: string;
  value: string;
  placeholder?: string;
  icon: AIPickerIcon;
  density: AIPickerDensity;
  state?: AIPickerTriggerState;
  /** Badge label — defaults to "AI". Hidden at basic/simple density and when disabled. */
  aiLabel?: string;
  /** Error message shown below the field when state === 'error'. */
  errorMessage?: string;
  /** Optional slot on the label row (robust density confidence badge, fed by the group). */
  labelRowAside?: React.ReactNode;
  /** Opens the popover — wired by the `ai-picker` group. */
  onClick?: () => void;
}

const ICON_MAP: Record<AIPickerIcon, React.ComponentType<{ size?: number; color?: string }>> = {
  'calendar': RiCalendarLine,
  'calendar-range': RiCalendarScheduleLine,
  'clock': RiTimeLine,
};

/** Small sparkle glyph used across AI surfaces. */
function Sparkle({ size = 12, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 0.5L7.2 4.05L10.8 5.25L7.2 6.45L6 10L4.8 6.45L1.2 5.25L4.8 4.05L6 0.5Z"
        fill={color ?? 'currentColor'}
      />
    </svg>
  );
}

/** AI badge pill — sparkle + label, shown at rich/robust density. */
function AIBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: AI.radius.full,
        // Brand-blue pill in light mode; inverted (solid blue fill, white text)
        // in dark mode via --ai-badge-* CSS vars.
        background: 'var(--ai-badge-bg, #F5F6FF)',
        border: '1px solid var(--ai-badge-border, #BECAFE)',
        color: 'var(--ai-badge-color, #4D60E6)',
        fontFamily: '"Open Sans", sans-serif',
        ...AI_TYPOGRAPHY['@zsai-caption-2'],
      }}
    >
      <Sparkle size={11} />
      {label}
    </span>
  );
}

export function AIPickerTrigger({
  label,
  value,
  placeholder = 'Select…',
  icon,
  density,
  state = 'default',
  aiLabel = 'AI',
  errorMessage,
  labelRowAside,
  onClick,
}: AIPickerTriggerProps) {
  const disabled = state === 'disabled';
  const focused = state === 'focused';
  const selected = state === 'selected';
  const error = state === 'error';
  const hasValue = state === 'selected' || (!!value && value !== '—');

  // AI badge only at rich/robust density and never when disabled.
  const showBadge = (density === 'rich' || density === 'robust') && !disabled;

  const Icon = ICON_MAP[icon];

  // ── Border color by state ──────────────────────────────────────────────────
  const borderColor = disabled
    ? 'var(--ai-input-disabled-border, #D1D0D6)'
    : error
      ? 'var(--ai-status-error-border, #E74C3C)'
      : focused
        ? AI.color.border.focus
        : AI.color.brandBorder;

  const valueColor = disabled
    ? 'var(--ai-input-disabled-text, #A8A6AE)'
    : selected
      // Selected fills with the tan companion surface (in dark mode) — pin ink dark.
      ? 'var(--ai-picker-menu-text, #2f2c3c)'
      : hasValue
        ? 'var(--ai-zds-text, #2f2c3c)'
        : 'var(--ai-zds-helper, #716e79)';

  // Theme-aware brand ink: #1F2A66 on light, #9AABFF on dark — meets WCAG AA
  // against both the white and #1A1628 page backgrounds (the fixed indigo
  // AI.color.text.primary was too dark to read in dark mode).
  const labelColor = disabled
    ? 'var(--ai-input-disabled-text, #A8A6AE)'
    : 'var(--ai-brand-text, #1F2A66)';

  // When the menu is open the trigger is 'focused' — the icon adopts the
  // focus accent to signal the active/selected state.
  const iconColor = disabled
    ? 'var(--ai-input-disabled-text, #A8A6AE)'
    : focused
      ? AI.color.border.focus
      : selected
        ? 'var(--ai-picker-menu-text, #2f2c3c)'
        : (density === 'rich' || density === 'robust')
          ? AI.color.brand
          : 'var(--ai-zds-helper, #5b5864)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', fontFamily: '"Open Sans", sans-serif' }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 20 }}>
        <span style={{
          color: disabled ? 'var(--ai-input-disabled-text, #A8A6AE)' : 'var(--ai-picker-label-color, #1F2A66)',
          ...AI_TYPOGRAPHY['@zsai-caption-2'],
        }}>{label}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {showBadge && <AIBadge label={aiLabel} />}
          {!disabled && labelRowAside}
        </span>
      </div>

      {/* Field */}
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-label={`${label}: ${hasValue ? value : placeholder}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          width: '100%',
          padding: '10px 12px',
          background: disabled
            ? 'var(--ai-input-disabled-bg, #F5F4F7)'
            : selected
              ? 'var(--ai-picker-menu-bg, #FFFFFF)'
              : 'var(--background, #FFFFFF)',
          border: `1px solid ${borderColor}`,
          borderRadius: AI.radius.sm,
          boxShadow: focused ? `0 0 0 3px ${AI.color.brandSurface}` : 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          transition: 'border-color 0.12s ease, box-shadow 0.12s ease',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ color: valueColor, ...AI_TYPOGRAPHY['@zsai-body-small'] }}>
          {hasValue ? value : placeholder}
        </span>
        <Icon size={18} color={iconColor} />
      </button>

      {/* Error message */}
      {error && errorMessage && (
        <span style={{ color: 'var(--ai-status-error-text, #C0392B)', ...AI_TYPOGRAPHY['@zsai-caption-1'] }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default AIPickerTrigger;
