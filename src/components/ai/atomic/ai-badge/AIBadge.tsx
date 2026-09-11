import React from 'react';
import { F, AI, ZS_DATAVIZ } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── AIBadge ─────────────────────────────────────────────────────────────────
//
// A compact, NON-interactive status/metric label. Modeled on the standard ZDS
// Badge (src/badge/) — same semantic variants and two sizes — extended for AI
// surfaces with:
//   • an `emphasis` control (bold = canonical ZDS fill; soft = tinted, for
//     in-card metric highlights like the Analysis Insight "+23% engagement"),
//   • a `dataviz` variant that colors the badge from the ZDS categorical
//     chart palette (@zs-data-color-1…12) for metric-delta indicators.
//
// Not a button, not a chip. No hover/press/focus states, no onClick. If it
// needs to be clickable, use AIChip instead.

// Semantic variants mirror the ZDS Badge set.
export type AIBadgeVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'dataviz';

export type AIBadgeSize = 'default' | 'small';

// Presentation shape — mirrors the ZDS Badge patterns (src/badge/):
//   text    → status/label pill (default; e.g. "Complete", "Failed")
//   counter → circular numeric count pill (e.g. notification counts 1 / 12 / 99+)
//   dot     → indicator dot, no number ("unread"/"new" marker)
//   inline  → colored count text in-flow, no pill (e.g. "20 Results")
export type AIBadgeAppearance = 'text' | 'counter' | 'dot' | 'inline';

// ── Queue variant ─────────────────────────────────────────────────────────────
// Formerly the standalone AIQueueBadge atom, now folded into AIBadge as its
// `queue` variant. Renders a status icon + label (+ optional count pill) on a
// tinted surface, for async agent/task queues (queued · running · blocked ·
// needs-approval · complete).
export type QueueStatus = 'queued' | 'running' | 'blocked' | 'needs-approval' | 'complete';

const QUEUE_CONFIG: Record<QueueStatus, { bg: string; border: string; text: string; icon: React.ReactNode; defaultLabel: string }> = {
  'queued':          { bg: 'var(--ai-confidence-track)', border: 'var(--ai-card-border)', text: 'var(--ai-zds-helper)', icon: <ClockIcon />,    defaultLabel: 'Queued'          },
  'running':         { bg: 'var(--ai-brand-surface)', border: 'var(--ai-brand-border)', text: 'var(--ai-brand-text)', icon: <SpinnerIcon />, defaultLabel: 'Running' },
  'blocked':         { bg: 'rgba(231,76,60,0.08)', border: 'rgba(231,76,60,0.25)', text: '#E74C3C', icon: <BlockIcon />,    defaultLabel: 'Blocked'         },
  'needs-approval':  { bg: 'var(--ai-signal-surface)', border: 'var(--ai-signal-border)', text: AI.color.signal.strong, icon: <ApprovalIcon />, defaultLabel: 'Needs Approval' },
  'complete':        { bg: 'var(--ai-status-success-bg)', border: 'var(--ai-status-success-border)', text: '#27AE60', icon: <CheckIcon />,    defaultLabel: 'Complete'        },
};

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={{ animation: 'ai-queue-spin 0.9s linear infinite' }}>
      <circle cx="6" cy="6" r="4.5" stroke={AI.color.brandBorder} strokeWidth="1.5" fill="none"/>
      <path d="M6 1.5 A4.5 4.5 0 0 1 10.5 6" stroke={AI.color.brand} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function BlockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="2.5" y1="9.5" x2="9.5" y2="2.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

function ApprovalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 3.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="6" cy="8.5" r="0.7" fill="currentColor"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3.5 6L5 7.5L8.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// bold → solid fill + inverse text (canonical ZDS badge).
// soft → translucent tint + colored text (AI in-card metric highlight).
export type AIBadgeEmphasis = 'bold' | 'soft';

export interface AIBadgeProps {
  /** Badge label — a short status word or a metric like "+23%". Optional when `queue` is set (falls back to the queue status' default label). */
  children?:  React.ReactNode;
  /** Semantic color role. Defaults to 'neutral'. Use 'dataviz' with `series`. */
  variant?:   AIBadgeVariant;
  /**
   * Presentation shape (mirrors the ZDS Badge patterns). Defaults to 'text'.
   *   'counter' → circular numeric count pill (applies `maxCount`)
   *   'dot'     → indicator dot, no label
   *   'inline'  → colored count text in-flow, no pill background
   */
  appearance?: AIBadgeAppearance;
  /** Cap for numeric labels — values above display as "{maxCount}+". Used by 'counter' / 'inline'. Defaults to 99. */
  maxCount?:  number;
  /**
   * Queue variant — renders a status icon + label (+ optional `count` pill) for
   * async agent/task queues. When set, it takes precedence over `variant` /
   * `emphasis`. `children`, if provided, overrides the default status label.
   */
  queue?:     QueueStatus;
  /** Numeric count pill — only used with the `queue` variant. */
  count?:     number;
  /** Fill treatment. Defaults to 'bold' (canonical ZDS). */
  emphasis?:  AIBadgeEmphasis;
  /** Size. Defaults to 'default'. */
  size?:      AIBadgeSize;
  /** Data-viz series index (1–12) — only used when variant === 'dataviz'. */
  series?:    keyof typeof ZS_DATAVIZ;
  style?:     React.CSSProperties;
  className?: string;
}

// Semantic base colors — sourced from AI tokens (Tier 2) with ZDS-parity
// fallbacks for info/neutral, which the AI status set doesn't carry.
const VARIANT_COLOR: Record<Exclude<AIBadgeVariant, 'dataviz'>, string> = {
  neutral: '#1A1628',            // ZDS neutral (@zs-color-neutral)
  info:    '#1B24AA',            // ZDS info (@zs-color-info)
  success: AI.color.status.success,
  warning: AI.color.status.warning,
  error:   AI.color.status.error,
};

const INVERSE_TEXT = '#FAFAFA'; // ZDS .zs-text-inverse

// Size spec mirrors the ZDS Badge (pill radius, bold label).
const SIZE_SPEC: Record<AIBadgeSize, {
  height: string; padding: string; fontSize: string; radius: string;
}> = {
  default: { height: '20px', padding: '0 8px', fontSize: '12px', radius: '10px' },
  small:   { height: '16px', padding: '0 6px', fontSize: '10px', radius: '8px'  },
};

// Append an alpha channel to a #rrggbb hex (0–100 → 00–FF).
function withAlpha(hex: string, pct: number): string {
  const a = Math.round((Math.max(0, Math.min(100, pct)) / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

// Cap a numeric label at maxCount → "{maxCount}+". Non-numeric labels pass through.
function formatCount(label: React.ReactNode, maxCount: number): React.ReactNode {
  const n = typeof label === 'number' ? label : Number(label);
  if (Number.isFinite(n) && n > maxCount) return `${maxCount}+`;
  return label;
}

export function AIBadge({
  children,
  variant = 'neutral',
  appearance = 'text',
  maxCount = 99,
  queue,
  count,
  emphasis = 'bold',
  size = 'default',
  series = 1,
  style,
  className,
}: AIBadgeProps) {
  // ── Queue variant ──────────────────────────────────────────────────────────
  // Takes precedence over the semantic `variant` / `emphasis` treatment.
  if (queue) {
    const cfg = QUEUE_CONFIG[queue];
    const displayLabel = children ?? cfg.defaultLabel;
    return (
      <>
        <style>{`
          @keyframes ai-queue-spin { to { transform: rotate(360deg); } }
          @media (prefers-reduced-motion: reduce) {
            [style*="ai-queue-spin"] { animation: none !important; }
          }
        `}</style>
        <span
          className={className}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 9px',
            borderRadius: AI.radius.sm,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            color: cfg.text,
            fontFamily: F,
            fontSize: 12,
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
            ...style,
          }}
        >
          {cfg.icon}
          {displayLabel}
          {count !== undefined && (
            <span
              style={{
                marginLeft: 2,
                background: cfg.text,
                color: cfg.bg,
                borderRadius: '10px',
                padding: '0 5px',
                ...AI_TYPOGRAPHY['@zsai-numeric-badge'],
              }}
            >
              {count}
            </span>
          )}
        </span>
      </>
    );
  }

  const base = variant === 'dataviz'
    ? ZS_DATAVIZ[series] ?? ZS_DATAVIZ[1]
    : VARIANT_COLOR[variant];

  const spec = SIZE_SPEC[size];

  // ── Indicator dot ────────────────────────────────────────────────────────────
  // Small circular marker with no label ("unread" / "new"). Semantic colored.
  if (appearance === 'dot') {
    const d = size === 'small' ? 8 : 10;
    return (
      <span
        className={className}
        aria-hidden={true}
        style={{
          display: 'inline-block',
          width: d,
          height: d,
          borderRadius: '50%',
          background: base,
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }

  // ── Inline counter ───────────────────────────────────────────────────────────
  // Colored count text in-flow — no pill background (e.g. "20 Results").
  if (appearance === 'inline') {
    return (
      <span
        className={className}
        style={{
          fontFamily:  F,
          fontSize:    spec.fontSize,
          fontWeight:  700,
          color:       base,
          whiteSpace:  'nowrap',
          ...style,
        }}
      >
        {formatCount(children, maxCount)}
      </span>
    );
  }

  const fill: React.CSSProperties =
    emphasis === 'soft'
      ? {
          background: withAlpha(base, 14),
          border:     `1px solid ${withAlpha(base, 35)}`,
          color:      base,
        }
      : {
          background: base,
          border:     '1px solid transparent',
          color:      INVERSE_TEXT,
        };

  // ── Counter — circular numeric count pill ────────────────────────────────────
  // Grows to a pill for multi-character values (e.g. "99+"); a perfect circle
  // for single digits (min-width = height). Applies maxCount.
  const isCounter = appearance === 'counter';

  return (
    <span
      className={className}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: isCounter ? 'center' : undefined,
        height:         spec.height,
        minWidth:       isCounter ? spec.height : undefined,
        padding:        isCounter ? '0 6px' : spec.padding,
        borderRadius:   isCounter ? '999px' : spec.radius,
        fontFamily:     F,
        fontSize:       spec.fontSize,
        fontWeight:     isCounter ? 700 : 500,
        lineHeight:     1,
        whiteSpace:     'nowrap',
        letterSpacing:  '0.01em',
        ...fill,
        ...style,
      }}
    >
      {isCounter ? formatCount(children, maxCount) : children}
    </span>
  );
}

// ── Variant metadata — for pickers and documentation ──────────────────────────

export const AI_BADGE_VARIANTS: {
  value: AIBadgeVariant;
  label: string;
  description: string;
}[] = [
  { value: 'neutral', label: 'Neutral', description: 'Default, non-semantic status' },
  { value: 'info',    label: 'Info',    description: 'Informational status' },
  { value: 'success', label: 'Success', description: 'Positive / complete status' },
  { value: 'warning', label: 'Warning', description: 'Caution status' },
  { value: 'error',   label: 'Error',   description: 'Failure / blocking status' },
  { value: 'dataviz', label: 'Data-viz', description: 'Metric-delta indicator colored from the ZDS chart palette (1–12)' },
];

// Queue-variant statuses — for pickers and documentation.
export const AI_BADGE_QUEUE_STATUSES: {
  value: QueueStatus;
  label: string;
  description: string;
}[] = [
  { value: 'queued',         label: 'Queued',         description: 'Task waiting in the queue' },
  { value: 'running',        label: 'Running',        description: 'Task actively executing (animated spinner)' },
  { value: 'blocked',        label: 'Blocked',        description: 'Task blocked / errored' },
  { value: 'needs-approval', label: 'Needs Approval', description: 'Task paused pending human approval' },
  { value: 'complete',       label: 'Complete',       description: 'Task finished successfully' },
];

export default AIBadge;
