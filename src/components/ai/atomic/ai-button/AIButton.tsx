import React, { useState } from 'react';
import { RiSparklingLine, RiBarChart2Line, RiGroupLine, RiPulseLine, RiCalendarLine, RiArrowRightUpLine, RiUserFollowLine, RiLightbulbLine } from '@remixicon/react';
import { F, AI, SIGNAL_ORANGE } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AISpinner } from '../../molecules/ai-spinner/AISpinner';

// ── Tier 3 component tokens — ai-button.* ────────────────────────────────────
//   ai-button.primary.bg            → AI.gradient.action.full
//   ai-button.primary.bg.active     → AI.color.action.primaryActive
//   ai-button.primary.color         → AI.color.text.onAction (#fff)
//   ai-button.secondary.border      → var(--ai-chip-border)
//   ai-button.tertiary.color        → DS.textHelper
//
// This atom is the single home for the AI button family. In addition to the
// primary/primary-solid/tertiary CTAs it absorbs the former AIChipQuick atom:
//   • variant="secondary" — rendered as the "quick chip" pill (was AIChipQuick).
//                         Pass `special` for the gradient "All Prompts" chip.
// `QUICK_ACTIONS` (the predefined quick-prompt list) is exported from here.

// ── Types ─────────────────────────────────────────────────────────────────────

export type AIButtonVariant = 'primary' | 'primary-solid' | 'secondary' | 'tertiary' | 'link';
export type AIButtonStatus  = 'default' | 'loading' | 'complete' | 'error';
export type AIButtonSize    = 'sm' | 'md' | 'lg' | 'xl';
export type AIButtonRadius  = 'xs' | 'sm' | 'md' | 'lg' | 'full';

// `icon` and `trailingIcon` accept either:
//   • a React node  (e.g. `<RiAddLine />` from @remixicon/react) — sized via `size` prop
//   • a string      (e.g. `"zs-icon-add"`)              — rendered as a Guild
//                                                          font glyph wrapped
//                                                          in `.zs-master-style`
export type AIButtonIcon = React.ReactNode | string;

export interface AIButtonProps {
  variant?:      AIButtonVariant;
  status?:       AIButtonStatus;
  size?:         AIButtonSize;
  radius?:       AIButtonRadius;
  /** Adjusts secondary/tertiary colors for placement on a dark surface. */
  onDark?:       boolean;
  icon?:         AIButtonIcon;
  label?:        string;
  trailingIcon?: AIButtonIcon;
  /** secondary only — renders the gradient "All Prompts" quick chip. */
  special?:      boolean;
  disabled?:     boolean;
  /**
   * Docs/preview only — forces a visual interaction state so the AI Library can
   * show hover / pressed / focused without real pointer or keyboard input.
   * Mirrors the standard DS Button's `state` prop, restyled on the AI brand
   * ramp: hover → action.primaryHover, pressed → action.primaryActive,
   * focused → resting fill + 2px white / 4px border.focus ring.
   */
  previewState?: 'hover' | 'pressed' | 'focused';
  onClick?:      () => void;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'dialog' | 'listbox' | 'menu';
  type?: 'button' | 'submit' | 'reset';
}

// ── Size scale (primary / secondary / tertiary) ──────────────────────────────
// Tier ladder aligned to shadcn/ui Button cadence (sm=h-8, md=h-9, lg=h-10)
// with 14-px label as the default. `xl` is the structural page-level CTA per
// typography.md Table A (16 / Regular / 1.5). `iconPx` is the rendered size
// for both Guild font glyphs and Lucide SVGs inside the button.
//
// `padTertiary` is intentionally tighter than `pad` so the tertiary variant
// reads as a link-like control (less horizontal weight than secondary).
const SIZE_MAP: Record<AIButtonSize, { height: string; pad: string; padIconOnly: string; padTertiary: string; font: string; weight: number; iconPx: number; gap: string }> = {
  sm: { height: '32px', pad: '6px 12px',  padIconOnly: '0 8px',  padTertiary: '0 6px',  font: '13px', weight: 500, iconPx: 14, gap: '6px' },
  md: { height: '36px', pad: '8px 16px',  padIconOnly: '0 10px', padTertiary: '0 8px',  font: '14px', weight: 500, iconPx: 16, gap: '8px' },
  lg: { height: '40px', pad: '10px 24px', padIconOnly: '0 12px', padTertiary: '0 10px', font: '14px', weight: 500, iconPx: 16, gap: '8px' },
  xl: { height: '48px', pad: '12px 28px', padIconOnly: '0 14px', padTertiary: '0 12px', font: '16px', weight: 400, iconPx: 18, gap: '10px' },
};

// ── Icon slot wrapper ────────────────────────────────────────────────────────
// Normalizes icon rendering across Guild font glyphs and Lucide SVG nodes.
//
//   • String input  → treat as a `zs-icon-*` class name. Render as a Guild
//                     font glyph wrapped in `.zs-master-style` (required by
//                     the icons.css cascade) at `fontSize: px`.
//   • Node input    → assume it's an SVG-based icon (Lucide etc.). Clone with
//                     `size={px}` injected so the caller doesn't have to size
//                     each icon by hand.
function ButtonIconSlot({ icon, px }: { icon: AIButtonIcon; px: number }) {
  if (typeof icon === 'string') {
    // Guild font glyph — must live inside `.zs-master-style` for the icon
    // font + ::before content rules in icons.css to take effect. Force the
    // wrapper to inherit the button's text color, since `.zs-master-style`
    // otherwise sets `color: var(--zs-text-color, #2F2C3C)` and would mask
    // the button's white-on-primary / colored label.
    const className = icon.startsWith('zs-icon-') ? `zs-icon ${icon}` : icon;
    return (
      <span
        className="zs-master-style"
        aria-hidden="true"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: px, height: px, flexShrink: 0, lineHeight: 0,
          color: 'inherit',
        }}
      >
        <i className={className} style={{ fontSize: px, lineHeight: 1, color: 'inherit' }} />
      </span>
    );
  }
  const sized = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, { size: (icon as React.ReactElement<any>).props?.size ?? px })
    : icon;
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: px, height: px, flexShrink: 0, lineHeight: 0,
      }}
    >
      {sized}
    </span>
  );
}

// ── Radius scale ──────────────────────────────────────────────────────────────
const RADIUS_MAP: Record<AIButtonRadius, string> = {
  xs:   AI.radius.xs,
  sm:   AI.radius.sm,
  md:   AI.radius.md,
  lg:   AI.radius.lg,
  full: AI.radius.full,
};

// ── RiCheckLine icon ────────────────────────────────────────────────────────────────
function CheckIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4 10l4.5 4.5L16 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function AIButton({
  variant       = 'primary',
  status        = 'default',
  size          = 'md',
  radius        = 'md',
  onDark        = false,
  icon,
  label,
  trailingIcon,
  special       = false,
  disabled      = false,
  previewState,
  onClick,
  type          = 'button',
  ...aria
}: AIButtonProps) {
  const [hov, setHov] = useState(false);

  // Forced (docs-only) interaction states — parallel to the DS Button `state`
  // prop. `hovEff` collapses hover + forced-hover so both drive the same visual.
  const forcedHover   = previewState === 'hover';
  const forcedPressed = previewState === 'pressed';
  const forcedFocus   = previewState === 'focused';
  const hovEff        = hov || forcedHover;
  const focusRing     = `0 0 0 2px #fff, 0 0 0 4px ${AI.color.border.focus}`;

  // ── Primary / secondary / tertiary variants ──────────────────────────────
  const sz = SIZE_MAP[size];
  const r  = RADIUS_MAP[radius];

  const isLoading  = status === 'loading';
  const isComplete = status === 'complete';
  const isError    = status === 'error';
  const isDisabled = disabled;
  const spinSize   = size === 'lg' ? 14 : 12;
  // AISpinner size token matching `spinSize` (used for the loading state on
  // filled variants). `inverse` renders the white-on-brand arc for filled surfaces.
  const spinToken  = (size === 'lg' ? '14px' : '12px') as '14px' | '12px';

  const iconOnly = !!icon && !label;
  const padForVariant = iconOnly ? sz.padIconOnly : sz.pad;
  // RiSquareLine icon-only chips; text-only buttons let label length drive the box
  // (shadcn behavior — no enforced min-width on text variants).
  const minWForVariant = iconOnly ? sz.height : undefined;

  if (variant === 'primary' || variant === 'primary-solid') {
    // `primary`        — gradient brand surface (default AI-led CTA)
    // `primary-solid`  — flat AI brand color (#4D60E6) for surfaces where the
    //                    gradient reads as visual noise (dense toolbars,
    //                    repeated CTAs, embedded composers).
    const isSolid = variant === 'primary-solid';
    const restingBg = isSolid ? AI.color.action.primary : AI.gradient.action.full;
    const bg = isLoading || isComplete
      ? AI.color.action.primaryActive
      : isError       ? AI.color.status.error
      : forcedPressed ? AI.color.action.primaryActive
      : hovEff        ? AI.color.action.primaryHover
      : restingBg;

    return (
      <button
        type={type} {...aria}
        onClick={isDisabled || isLoading || isComplete ? undefined : onClick}
        onMouseEnter={() => { if (!isDisabled) setHov(true); }}
        onMouseLeave={() => setHov(false)}
        disabled={isDisabled}
        aria-label={isLoading ? `${label ?? ''} — loading`.trim() : isComplete ? `${label ?? ''} — complete`.trim() : aria['aria-label'] ?? label}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sz.gap,
          height: sz.height, padding: padForVariant,
          background: bg,
          color: AI.color.text.onAction,
          border: 'none', borderRadius: r,
          cursor: isDisabled || isLoading || isComplete ? 'default' : 'pointer',
          fontSize: sz.font, fontFamily: F, fontWeight: sz.weight,
          transition: 'background 0.15s',
          boxShadow: forcedFocus
            ? focusRing
            : (hovEff || forcedPressed || isLoading || isComplete || isError) ? 'none' : `0 2px 8px ${AI.shadow.action.default}`,
          opacity: isDisabled ? 0.45 : 1,
          minWidth: minWForVariant, whiteSpace: 'nowrap',
        }}
      >
        {isLoading  && <AISpinner size={spinToken} inverse />}
        {isComplete && <CheckIcon size={spinSize} />}
        {!isLoading && !isComplete && icon && <ButtonIconSlot icon={icon} px={sz.iconPx} />}
        {label}
        {trailingIcon && !iconOnly && <ButtonIconSlot icon={trailingIcon} px={sz.iconPx} />}
      </button>
    );
  }

  if (variant === 'secondary') {
    // Secondary is rendered as the "quick chip" pill (formerly AIChipQuick):
    // full radius, 1.5px border, chip surface, brand accent on hover. `special`
    // upgrades it to the gradient "All Prompts" treatment.
    const darkHoverBg = 'rgba(255,255,255,0.10)';
    const darkText    = '#FFFFFF';
    const darkBorder  = 'rgba(255,255,255,0.35)';

    // Chip hover + pressed share the accent treatment; pressed deepens the border.
    const sHov = hovEff || forcedPressed;
    let bg: string, borderColor: string, textColor: string, boxShadow: string | undefined;
    if (isDisabled) {
      bg = 'transparent'; borderColor = 'var(--ai-btn-disabled-border)';
      textColor = 'var(--ai-btn-disabled-text)'; boxShadow = undefined;
    } else if (onDark) {
      bg = sHov ? darkHoverBg : 'transparent'; borderColor = darkBorder;
      textColor = darkText; boxShadow = undefined;
    } else if (special) {
      bg = sHov ? AI.gradient.action.full : 'var(--ai-chip-bg)';
      borderColor = sHov ? 'transparent' : AI.color.border.default;
      textColor = sHov ? AI.color.text.onAction : AI.color.action.primary;
      boxShadow = sHov ? `0 4px 16px ${AI.shadow.action.default}` : undefined;
    } else {
      bg = sHov ? 'var(--ai-chip-bg-hover)' : 'var(--ai-chip-bg)';
      borderColor = forcedPressed ? AI.color.action.primaryActive : sHov ? AI.color.border.strong : 'var(--ai-chip-border)';
      textColor = sHov ? AI.color.action.primary : 'var(--ai-ds-text)';
      boxShadow = undefined;
    }
    if (forcedFocus && !isDisabled) boxShadow = focusRing;

    return (
      <button
        type={type} {...aria}
        onClick={isDisabled ? undefined : onClick}
        onMouseEnter={() => { if (!isDisabled) setHov(true); }}
        onMouseLeave={() => setHov(false)}
        disabled={isDisabled}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sz.gap,
          height: sz.height, padding: padForVariant,
          background: bg,
          color: textColor,
          border: `1.5px solid ${borderColor}`,
          borderRadius: AI.radius.full,   // forced pill — chip alignment
          boxShadow,
          cursor: isDisabled ? 'default' : 'pointer',
          fontSize: sz.font, fontFamily: F, fontWeight: 500,
          opacity: isDisabled ? 0.5 : 1,
          transition: 'all 0.18s ease',
          minWidth: iconOnly ? sz.height : undefined,
          whiteSpace: 'nowrap',
        }}
      >
        {icon && <ButtonIconSlot icon={icon} px={sz.iconPx} />}
        {label}
        {trailingIcon && !iconOnly && <ButtonIconSlot icon={trailingIcon} px={sz.iconPx} />}
      </button>
    );
  }

  if (variant === 'link') {
    // Link — text-link treatment matching the standard DS Button `type="link"`,
    // restyled on the AI brand ramp and mirroring the AITextLink atom:
    // transparent bg/border, brand-blue label, underline on hover, deepened
    // brand color on press. Supports a leading `icon` and/or `trailingIcon`.
    const linkColor = isDisabled
      ? 'var(--ai-btn-disabled-text)'
      : onDark
        ? (hovEff || forcedPressed ? '#FFFFFF' : 'rgba(255,255,255,0.85)')
        : forcedPressed ? AI.color.brandStrong
        : hovEff        ? AI.color.action.primaryHover
        : AI.color.brand;

    return (
      <button
        type={type} {...aria}
        onClick={isDisabled ? undefined : onClick}
        onMouseEnter={() => { if (!isDisabled) setHov(true); }}
        onMouseLeave={() => setHov(false)}
        disabled={isDisabled}
        aria-label={iconOnly ? (aria['aria-label'] ?? label) : aria['aria-label']}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sz.gap,
          height: sz.height, padding: iconOnly ? sz.padIconOnly : sz.padTertiary,
          background: 'none',
          color: linkColor,
          border: 'none',
          borderRadius: AI.radius.sm,
          boxShadow: forcedFocus && !isDisabled ? focusRing : undefined,
          cursor: isDisabled ? 'default' : 'pointer',
          fontSize: sz.font, fontFamily: F, fontWeight: sz.weight,
          textDecoration: (hovEff || forcedFocus) && !isDisabled ? 'underline' : 'none',
          textUnderlineOffset: 2,
          opacity: isDisabled ? 0.5 : 1,
          whiteSpace: 'nowrap',
          minWidth: iconOnly ? sz.height : undefined,
          transition: 'color 0.15s, text-decoration 0.15s',
        }}
      >
        {icon && <ButtonIconSlot icon={icon} px={sz.iconPx} />}
        {label}
        {trailingIcon && !iconOnly && <ButtonIconSlot icon={trailingIcon} px={sz.iconPx} />}
      </button>
    );
  }

  // tertiary
  return (
    <button
      type={type} {...aria}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={() => { if (!isDisabled) setHov(true); }}
      onMouseLeave={() => setHov(false)}
      disabled={isDisabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sz.gap,
        height: sz.height, padding: iconOnly ? sz.padIconOnly : sz.padTertiary,
        background: forcedPressed ? (onDark ? 'rgba(255,255,255,0.10)' : 'var(--ai-chip-bg-hover)') : 'none',
        color: isDisabled ? 'var(--ai-btn-disabled-text)'
          : onDark ? ((hovEff || forcedPressed) ? '#FFFFFF' : 'rgba(255,255,255,0.85)')
          : (hovEff || forcedPressed) ? 'var(--ai-ds-text)' : 'var(--ai-ds-helper)',
        border: 'none',
        borderRadius: AI.radius.sm,
        boxShadow: forcedFocus && !isDisabled ? focusRing : undefined,
        cursor: isDisabled ? 'default' : 'pointer',
        fontSize: sz.font, fontFamily: F, fontWeight: sz.weight,
        opacity: isDisabled ? 0.4 : 1,
        whiteSpace: 'nowrap',
        minWidth: iconOnly ? sz.height : undefined,
      }}
    >
      {icon && <ButtonIconSlot icon={icon} px={sz.iconPx} />}
      {label}
      {trailingIcon && !iconOnly && <ButtonIconSlot icon={trailingIcon} px={sz.iconPx} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AIAction — composed multi-button row used at the end of AI recommendations
// (apply / review / dismiss + optional "Requires review" pill). Originally
// shipped as its own atom (ai-action) but merged into AIButton so the visual
// language and the compositional pattern live together.
// ─────────────────────────────────────────────────────────────────────────────

export type AIActionStatus = 'default' | 'loading' | 'complete' | 'disabled' | 'error' | 'requires-review';
export type AIActionSize   = AIButtonSize;
export type AIActionLayout = 'inline' | 'stacked';
export type AIActionRadius = AIButtonRadius;

export interface AIActionProps {
  primaryLabel:          string;
  secondaryLabel?:       string;
  tertiaryLabel?:        string;
  size?:                 AIActionSize;
  layout?:               AIActionLayout;
  radius?:               AIActionRadius;
  status?:               AIActionStatus;
  requiresConfirmation?: boolean;
  requiresReview?:       boolean;
  onPrimary?:            () => void;
  onSecondary?:          () => void;
  onTertiary?:           () => void;
}

const ACTION_GAP: Record<AIActionSize, string> = { sm: '6px', md: '8px', lg: '10px', xl: '12px' };

function ReviewIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="9" stroke={SIGNAL_ORANGE[60]} strokeWidth="1.5" />
      <path d="M10 6v5" stroke={SIGNAL_ORANGE[60]} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill={SIGNAL_ORANGE[60]} />
    </svg>
  );
}

export function AIAction({
  primaryLabel,
  secondaryLabel,
  tertiaryLabel,
  size         = 'md',
  layout       = 'inline',
  radius       = 'md',
  status       = 'default',
  requiresReview,
  onPrimary,
  onSecondary,
  onTertiary,
}: AIActionProps) {
  const isDisabled = status === 'disabled';
  const showReview = requiresReview || status === 'requires-review';

  const primaryStatus: AIButtonStatus =
    isDisabled              ? 'default'
    : status === 'loading'  ? 'loading'
    : status === 'complete' ? 'complete'
    : status === 'error'    ? 'error'
    : 'default';

  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'stacked' ? 'column' : 'row',
      alignItems: layout === 'stacked' ? 'stretch' : 'center',
      gap: ACTION_GAP[size],
      flexWrap: 'wrap',
    }}>
      {showReview && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 10px',
          background: 'var(--ai-signal-surface)',
          border: '1px solid var(--ai-signal-border)',
          borderRadius: AI.radius.xs,
          marginBottom: layout === 'stacked' ? '2px' : 0,
          alignSelf: layout === 'stacked' ? 'flex-start' : 'center',
        }}>
          <ReviewIcon />
          <span style={{ ...AI_TYPOGRAPHY['@ai-action-link'], fontFamily: F, color: SIGNAL_ORANGE[70] }}>
            Requires review
          </span>
        </div>
      )}

      <AIButton
        variant="primary"
        label={primaryLabel}
        size={size}
        radius={radius}
        status={primaryStatus}
        disabled={isDisabled}
        onClick={onPrimary}
      />

      {secondaryLabel && (
        <AIButton
          variant="secondary"
          label={secondaryLabel}
          size={size}
          radius={radius}
          disabled={isDisabled}
          onClick={onSecondary}
        />
      )}

      {tertiaryLabel && (
        <AIButton
          variant="tertiary"
          label={tertiaryLabel}
          size={size}
          radius={radius}
          disabled={isDisabled}
          onClick={onTertiary}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK_ACTIONS — predefined quick-prompt list rendered as secondary chip
// buttons (variant="secondary", with `special` on the final "All Prompts" item).
// Co-located here since the chip is now an AIButton variant.
// ─────────────────────────────────────────────────────────────────────────────
export const QUICK_ACTIONS = [
  { icon: RiSparklingLine,    label: 'Create a scenario' },
  { icon: RiBarChart2Line,    label: 'Territory balance' },
  { icon: RiCalendarLine,     label: 'Generate call plan' },
  { icon: RiGroupLine,        label: 'Vacancy management' },
  { icon: RiPulseLine,        label: 'Analyze team health' },
  { icon: RiUserFollowLine,   label: 'Roster management' },
  { icon: RiArrowRightUpLine, label: 'KPI trend' },
  { icon: RiLightbulbLine,    label: 'All Prompts', isSpecial: true },
] as const;

export default AIButton;
