/**
 * AITextLink — Guild AI Atomic Component
 *
 * Lightweight explainability link for AI-generated outputs.
 * Used for rationale, sources, assumptions, audit trail, and
 * disclosure actions inside AI surfaces.
 *
 * This is not a generic product link. It is the AI-specific text link
 * treatment tied to trust, accountability, and source visibility.
 */

import React, { useState } from 'react';
import { AI, DS, SIGNAL_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AITextLinkVariant =
  | 'text'          // label only
  | 'icon-leading'  // icon + label
  | 'chevron'       // label + accordion chevron
  | 'icon-chevron'  // icon + label + accordion chevron
  | 'external'      // label + external-link icon
  | 'attention';    // orange-toned attention link

export type AITextLinkTone =
  | 'ai'         // AI_RAMP brand blue — default for AI explainability
  | 'neutral'    // textHelper — low-emphasis secondary
  | 'attention'  // Signal Orange — escalation, warning, approval, stale data
  | 'warning'    // Signal Orange dark — stale/warning context
  | 'error';     // semantic red — unavailable, error state

export type AITextLinkSize = 'sm' | 'md';

export interface AITextLinkProps {
  label:             string;
  href?:             string;
  icon?:             string;           // leading icon name from AI_ICON_PATHS
  leadingIcon?:      React.ReactNode;  // custom leading icon node (overrides `icon` name lookup)
  trailingIcon?:     string;           // trailing icon name (non-chevron)
  showChevron?:      boolean;
  expanded?:         boolean;          // controlled
  defaultExpanded?:  boolean;          // uncontrolled
  disabled?:         boolean;
  disabledReason?:   string;
  variant?:          AITextLinkVariant;
  tone?:             AITextLinkTone;
  size?:             AITextLinkSize;
  loading?:          boolean;
  ariaLabel?:        string;
  external?:         boolean;
  onClick?:          () => void;
  onToggle?:         (expanded: boolean) => void;
  style?:            React.CSSProperties;
}

export interface AITextLinkGroupProps {
  children:  React.ReactNode;
  gap?:      number;
  wrap?:     boolean;
  style?:    React.CSSProperties;
}

// ── Tone → color map ─────────────────────────────────────────────────────────

interface ToneColors { default: string; hover: string; active: string }

const TONE_COLORS: Record<AITextLinkTone, ToneColors> = {
  ai:        { default: AI.color.brand,              hover: AI.color.action.primaryHover, active: AI.color.brandStrong },
  neutral:   { default: DS.textHelper,              hover: DS.textDefault,              active: 'var(--ai-ds-text)' },
  attention: { default: SIGNAL_ORANGE[60],               hover: SIGNAL_ORANGE[70],                active: SIGNAL_ORANGE[80] },
  warning:   { default: SIGNAL_ORANGE[70],               hover: SIGNAL_ORANGE[80],                active: SIGNAL_ORANGE[100] },
  error:     { default: '#B21111',                   hover: '#8A0A0A',                    active: 'var(--ai-status-error-text)' },
};

// ── Font size map ─────────────────────────────────────────────────────────────

const SIZE_FONT: Record<AITextLinkSize, number> = { sm: 11, md: 13 };
const SIZE_ICON: Record<AITextLinkSize, number> = { sm: 12, md: 14 };
const SIZE_GAP:  Record<AITextLinkSize, number> = { sm: 3,  md: 4  };

// ── Inline SVG atoms ──────────────────────────────────────────────────────────

function ChevronIcon({ open, size }: { open: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        transition: 'transform 200ms ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        display: 'block',
      }}
    >
      <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M10 2H14V6M14 2L8.5 7.5M6.5 3H3C2.448 3 2 3.448 2 4V13C2 13.552 2.448 14 3 14H12C12.552 14 13 13.552 13 13V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoadingSpinner({ size, color }: { size: number; color: string }) {
  return (
    <>
      <style>{`@keyframes ail-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @media(prefers-reduced-motion:reduce){.ail-spin{animation:none!important}}`}</style>
      <svg
        width={size} height={size} viewBox="0 0 16 16" fill="none"
        aria-hidden="true"
        className="ail-spin"
        style={{ flexShrink: 0, display: 'block', animation: 'ail-spin 700ms linear infinite' }}
      >
        <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
        <path d="M8 2A6 6 0 0 1 14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </>
  );
}

// Minimal inline icon renderer for leading/trailing icons using AI_ICON_PATHS
// We lazy-import path data here to avoid a large static dependency on the full registry.
const INLINE_ICON_PATHS: Record<string, string> = {
  'info':         'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z',
  'database':     'M11 4C8.79086 4 7 5.34315 7 7C7 8.65685 8.79086 10 11 10C13.2091 10 15 8.65685 15 7C15 5.34315 13.2091 4 11 4ZM5 7C5 4.23858 7.68629 2 11 2C14.3137 2 17 4.23858 17 7V17C17 19.7614 14.3137 22 11 22C7.68629 22 5 19.7614 5 17V7ZM7 9.82929C7.62745 10.5507 8.73096 11 11 11C13.269 11 14.3725 10.5507 15 9.82929V12.8293C14.3725 13.5507 13.269 14 11 14C8.73096 14 7.62745 13.5507 7 12.8293V9.82929ZM7 14.8293C7.62745 15.5507 8.73096 16 11 16C13.269 16 14.3725 15.5507 15 14.8293V17C15 18.6569 13.2091 20 11 20C8.79086 20 7 18.6569 7 17V14.8293Z',
  'history':      'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C9.29614 22 6.85234 20.9371 5.06887 19.2001L6.4904 17.7785C7.90878 19.1498 9.85573 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C8.31087 4 5.22456 6.52046 4.27981 9.92718L6.99988 9.92718L3.49988 14.9272L-0.000122070 9.92718H2.24338C3.2711 5.42174 7.26332 2 12 2ZM13 12V7H11V13L16.2427 15.6213L17.1213 14.0071L13 12Z',
  'shield-check': 'M12 1L21.5 5.5V11C21.5 16.1086 17.2823 20.7811 12 22C6.71772 20.7811 2.5 16.1086 2.5 11V5.5L12 1ZM12 3.311L4.5 7.0619V11C4.5 15.0606 7.82211 18.9268 12 20.0005C16.1779 18.9268 19.5 15.0606 19.5 11V7.0619L12 3.311ZM16.4874 9L17.9 10.4126L11.2 17.1126L7.1 13.0126L8.5126 11.6L11.2 14.2873L16.4874 9Z',
  'flag':         'M12.9999 5H20.9999C21.5522 5 21.9999 5.44772 21.9999 6V16C21.9999 16.5523 21.5522 17 20.9999 17H12.9999V21H10.9999V3H12.9999V5ZM12.9999 7V15H19.9999V7H12.9999ZM1.99988 6L6.99988 6V18L1.99988 18V6Z',
  'error-circle': 'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z',
  'link':         'M18.364 15.536L16.95 14.12L18.364 12.706C19.5 11.5693 19.5 9.71 18.364 8.574C17.228 7.438 15.369 7.438 14.233 8.574L12.819 9.988L11.405 8.574L12.819 7.16C14.7427 5.23574 17.854 5.23574 19.778 7.16C21.702 9.08426 21.702 12.196 19.778 14.12L18.364 15.536ZM15.536 18.364L14.12 19.778C12.196 21.702 9.08426 21.702 7.16 19.778C5.23574 17.854 5.23574 14.7427 7.16 12.819L8.574 11.405L9.988 12.819L8.574 14.233C7.438 15.369 7.438 17.228 8.574 18.364C9.71 19.5 11.569 19.5 12.705 18.364L14.119 16.95L15.536 18.364ZM14.829 7.757L16.243 9.171L9.171 16.243L7.757 14.829L14.829 7.757Z',
};

function InlineIcon({ name, size }: { name: string; size: number }) {
  const d = INLINE_ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} />
    </svg>
  );
}

// ── Keyframes (injected once) ─────────────────────────────────────────────────

const LINK_STYLES = `
  @keyframes ail-attention-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.6; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ail-attention { animation: none !important; }
  }
`;

// ── AITextLink ────────────────────────────────────────────────────────────────

export function AITextLink({
  label,
  href,
  icon,
  leadingIcon,
  trailingIcon,
  showChevron   = false,
  expanded,
  defaultExpanded = false,
  disabled      = false,
  disabledReason,
  variant       = 'text',
  tone          = 'ai',
  size          = 'md',
  loading       = false,
  ariaLabel,
  external,
  onClick,
  onToggle,
  style,
}: AITextLinkProps) {
  // Uncontrolled chevron state
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded);
  const isExpanded = expanded !== undefined ? expanded : localExpanded;

  const hasChevron  = showChevron || variant === 'chevron' || variant === 'icon-chevron';
  const isExternal  = external   || variant === 'external';
  const isAttention = variant    === 'attention' || tone === 'attention' || tone === 'warning';

  const resolvedTone: AITextLinkTone =
    variant === 'attention' ? 'attention'
    : tone;

  const colors = TONE_COLORS[resolvedTone];
  const fontSize = SIZE_FONT[size];
  const iconSize = SIZE_ICON[size];
  const gap      = SIZE_GAP[size];

  // sm normalizes to @ai-caption-1 (12/400/1.5). md keeps its 13/500/1.0 inline.
  const typeStyle = size === 'sm'
    ? AI_TYPOGRAPHY['@ai-caption-1']
    : { fontSize: fontSize as number, fontWeight: 500, lineHeight: 1 as number };

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const color = disabled ? 'var(--ai-btn-disabled-text)'
    : hovered || focused ? colors.hover
    : colors.default;

  function handleClick() {
    if (disabled || loading) return;
    if (hasChevron && !isExternal) {
      const next = !isExpanded;
      setLocalExpanded(next);
      onToggle?.(next);
    }
    onClick?.();
  }

  const leadingIconName = icon ?? (
    variant === 'attention' ? 'error-circle'
    : variant === 'external' || isExternal ? undefined
    : undefined
  );

  const RiPriceTag3Line = href && !disabled ? 'a' : 'button';

  const baseStyle: React.CSSProperties = {
    display:         'inline-flex',
    alignItems:      'center',
    gap:             gap,
    fontFamily:      F,
    ...typeStyle,
    color,
    background:      'none',
    border:          'none',
    padding:         0,
    cursor:          disabled ? 'not-allowed' : 'pointer',
    opacity:         disabled ? 0.5 : 1,
    textDecoration:  hovered && !disabled ? 'underline' : 'none',
    textUnderlineOffset: 2,
    outline:         'none',
    borderRadius:    3,
    boxShadow:       focused ? `0 0 0 2px rgba(77, 96, 230,0.35)` : 'none',
    transition:      'color 120ms ease, text-decoration 120ms ease, box-shadow 120ms ease',
    userSelect:      'none',
    whiteSpace:      'nowrap' as const,
    ...style,
  };

  // Attention pulse on first render only (not a loop)
  const attentionClass = isAttention && !disabled ? 'ail-attention' : undefined;
  const attentionAnim  = isAttention && !disabled
    ? 'ail-attention-pulse 900ms ease-in-out 1'
    : undefined;

  const titleAttr = disabled && disabledReason ? disabledReason : undefined;
  const ariaExpanded = hasChevron && !isExternal ? isExpanded : undefined;

  return (
    <>
      <style>{LINK_STYLES}</style>
      <RiPriceTag3Line
        href={href as string}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={RiPriceTag3Line === 'button' ? disabled : undefined}
        aria-disabled={RiPriceTag3Line === 'a' && disabled ? true : undefined}
        aria-label={ariaLabel ?? (disabledReason && disabled ? `${label}, ${disabledReason}` : undefined)}
        aria-expanded={ariaExpanded}
        title={titleAttr}
        rel={isExternal && href ? 'noopener noreferrer' : undefined}
        target={isExternal && href ? '_blank' : undefined}
        className={attentionClass}
        style={{ ...baseStyle, animation: attentionAnim }}
      >
        {/* Loading spinner replaces leading icon */}
        {loading && <LoadingSpinner size={iconSize} color={color} />}

        {/* Leading icon — custom node takes precedence over name-based lookup */}
        {!loading && leadingIcon && (
          <span style={{ display: 'inline-flex', flexShrink: 0 }} aria-hidden="true">{leadingIcon}</span>
        )}
        {!loading && !leadingIcon && leadingIconName && (
          <InlineIcon name={leadingIconName} size={iconSize} />
        )}

        {/* Label */}
        <span>{label}</span>

        {/* Trailing icon (non-chevron) */}
        {!loading && trailingIcon && !hasChevron && !isExternal && (
          <InlineIcon name={trailingIcon} size={iconSize} />
        )}

        {/* External icon */}
        {!loading && isExternal && <ExternalIcon size={iconSize} />}

        {/* Chevron */}
        {!loading && hasChevron && !isExternal && (
          <ChevronIcon open={isExpanded} size={iconSize} />
        )}
      </RiPriceTag3Line>

      {/* Disabled reason tooltip text (screen-reader only if title handles it visually) */}
      {disabled && disabledReason && !ariaLabel && (
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
          {disabledReason}
        </span>
      )}
    </>
  );
}

// ── AITextLinkGroup ───────────────────────────────────────────────────────────

export function AITextLinkGroup({
  children,
  gap   = 16,
  wrap  = true,
  style,
}: AITextLinkGroupProps) {
  return (
    <div
      role="group"
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap,
        flexWrap:   wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default AITextLink;
