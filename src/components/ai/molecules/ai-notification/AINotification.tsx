import React, { useState } from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ── Types ─────────────────────────────────────────────────────────────────────

export type NotificationSeverity =
  | 'info' | 'opportunity' | 'warning' | 'urgent'
  | 'success' | 'blocked' | 'approval' | 'escalated';

export type NotificationLayout =
  | 'default' | 'compact' | 'detailed' | 'actionable' | 'readonly'
  | 'command-center' | 'side-panel' | 'accordion';

export type NotificationStatus =
  | 'default' | 'expanded' | 'dismissed' | 'snoozed'
  | 'reviewed' | 'loading' | 'error';

export interface NotificationAction {
  label: string;
  onClick?: () => void;
}

export type NotificationVariant = 'basic' | 'enhanced' | 'link';

export interface AINotificationProps {
  severity:         NotificationSeverity;
  title:            string;
  message:          string;
  /**
   * Top-level form.
   * - 'basic'    → minimal card: severity icon + title + message + optional single-button action.
   * - 'enhanced' → full card with attribution, timestamp, chips, primary + secondary actions, rationale link, dismiss/snooze (default).
   * - 'link'     → minimal card like 'basic', but the primary action renders as a brand-colored text link with a trailing arrow instead of an AIButton.
   */
  variant?:         NotificationVariant;
  layout?:          NotificationLayout;
  /** For accordion layout: start expanded. Defaults to false. */
  defaultExpanded?: boolean;
  status?:          NotificationStatus;
  attribution?:     string;
  timestamp?:       string;
  chips?:           string[];
  primaryAction?:   NotificationAction;
  secondaryAction?: NotificationAction;
  isDismissible?:   boolean;
  isSnoozable?:     boolean;
  onDismiss?:       () => void;
  onSnooze?:        () => void;
  onViewRationale?: () => void;
  onEscalate?:      () => void;
  onMarkReviewed?:  () => void;
}

export interface AINotificationStackProps {
  intro?:         string;
  notifications:  AINotificationProps[];
  maxVisible?:    number;
  onViewAll?:     () => void;
}

// ── Severity config ───────────────────────────────────────────────────────────

interface SeverityConfig {
  borderColor: string;
  bgColor:     string;
  labelColor:  string;
  label:       string;
  /** ZAIDYN icon class — resolves through `.zs-master-style` parent + `icons.css`. */
  zsIcon:      string;
}

const SEV: Record<NotificationSeverity, SeverityConfig> = {
  info:        { borderColor: 'var(--ai-brand-border)',         bgColor: 'var(--ai-brand-surface)',     labelColor: 'var(--ai-brand-text)',          label: 'RiInformationLine',            zsIcon: 'zs-icon-info'              },
  opportunity: { borderColor: 'var(--ai-status-purple-border)', bgColor: 'var(--ai-status-purple-bg)',  labelColor: 'var(--ai-status-purple-text)',  label: 'Opportunity',     zsIcon: 'zs-icon-arrow-up-circle'   },
  warning:     { borderColor: 'var(--ai-status-warning-border)',bgColor: 'var(--ai-status-warning-bg)', labelColor: 'var(--ai-status-warning-text)', label: 'Warning',         zsIcon: 'zs-icon-error-triangle'    },
  urgent:      { borderColor: 'var(--ai-status-error-border)',  bgColor: 'var(--ai-status-error-bg)',   labelColor: 'var(--ai-status-error-text)',   label: 'Action required', zsIcon: 'zs-icon-error-circle-fill' },
  success:     { borderColor: 'var(--ai-status-success-border)',bgColor: 'var(--ai-status-success-bg)', labelColor: 'var(--ai-status-success-text)', label: 'Complete',        zsIcon: 'zs-icon-check-circle'      },
  blocked:     { borderColor: 'var(--ai-status-error-border)',  bgColor: 'var(--ai-status-error-bg)',   labelColor: 'var(--ai-status-error-text)',   label: 'Blocked',         zsIcon: 'zs-icon-close-circle'      },
  approval:    { borderColor: 'var(--ai-status-success-border)',bgColor: 'var(--ai-status-success-bg)', labelColor: 'var(--ai-status-success-text)', label: 'Approval needed', zsIcon: 'zs-icon-clock-pending'     },
  escalated:   { borderColor: 'var(--ai-status-warning-border)',bgColor: 'var(--ai-status-warning-bg)', labelColor: 'var(--ai-status-warning-text)', label: 'Escalated',       zsIcon: 'zs-icon-data-arrow-up'     },
};

// ── Severity icon — ZAIDYN glyph (font-icon) ──────────────────────────────────
// Per components/atoms/iconography.md the cascade is ZAIDYN-first; the glyph
// only inherits its color when wrapped in `.zs-master-style`. We scope the
// span locally so the surrounding chrome doesn't need to.

function SeverityIcon({ severity, color }: { severity: NotificationSeverity; color: string }) {
  const cfg = SEV[severity];
  return (
    <span className="zs-master-style" style={{ display: 'inline-flex', flexShrink: 0, lineHeight: 0 }}>
      <i
        className={`zs-icon ${cfg.zsIcon}`}
        aria-hidden="true"
        style={{ fontSize: 15, color, lineHeight: 1 }}
      />
    </span>
  );
}

// ── Dismiss icon (ZAIDYN close glyph) ────────────────────────────────────────

function DismissIcon() {
  return (
    <span className="zs-master-style" style={{ display: 'inline-flex', lineHeight: 0 }}>
      <i className="zs-icon zs-icon-close" aria-hidden="true" style={{ fontSize: 12, color: 'currentColor', lineHeight: 1 }} />
    </span>
  );
}

// ── Trailing arrow used by the 'link' variant's primary action ───────────────
function LinkArrow() {
  return (
    <span className="zs-master-style" style={{ display: 'inline-flex', lineHeight: 0 }}>
      <i className="zs-icon zs-icon-arrow-next" aria-hidden="true" style={{ fontSize: 12, color: 'currentColor', lineHeight: 1 }} />
    </span>
  );
}

// ── Keyframes ─────────────────────────────────────────────────────────────────

const PULSE_STYLE = `
  @keyframes ai-notif-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ai-notif-pulse { animation: none !important; }
  }
`;

const ENTER_STYLE = `
  @keyframes ai-notif-enter {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .ai-notif-enter { animation: none !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// AINotification — single card
// ─────────────────────────────────────────────────────────────────────────────

export function AINotification({
  severity,
  title,
  message,
  variant      = 'enhanced',
  layout       = 'default',
  defaultExpanded = false,
  status       = 'default',
  attribution,
  timestamp,
  chips,
  primaryAction,
  secondaryAction,
  isDismissible = false,
  isSnoozable   = false,
  onDismiss,
  onSnooze,
  onViewRationale,
  onMarkReviewed,
}: AINotificationProps) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded,  setExpanded]  = useState(defaultExpanded);

  if (dismissed || status === 'dismissed') return null;

  const cfg      = SEV[severity];
  const compact  = layout === 'compact' || layout === 'side-panel';
  const isUrgent = severity === 'urgent';
  const isAccordion = layout === 'accordion';

  // ── Basic + RiLinksLine variants — minimal severity card. Optional single action. ──
  if (variant === 'basic' || variant === 'link') {
    return (
      <>
        <style>{ENTER_STYLE}</style>
        <div
          role="status"
          aria-label={`${cfg.label}: ${title}`}
          aria-live={isUrgent ? 'assertive' : 'polite'}
          className="ai-notif-enter"
          style={{
            display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10,
            padding: '12px 14px',
            borderRadius: AI.radius.lg,
            border: `1px solid ${cfg.borderColor}30`,
            background: cfg.bgColor,
            animation: 'ai-notif-enter 0.2s ease both',
            fontFamily: F,
            width: '100%',
          }}
        >
          <div style={{ marginTop: 1, flexShrink: 0 }}>
            <SeverityIcon severity={severity} color={cfg.labelColor} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <div style={{
              fontFamily: F, ...AI_TYPOGRAPHY['@zsai-notif-title-compact'],
              color: cfg.labelColor,
            }}>
              {title}
            </div>
            <p style={{
              margin: 0, fontFamily: F, ...AI_TYPOGRAPHY['@zsai-section-subtitle'],
              color: 'var(--ai-zds-text)',
            }}>
              {message}
            </p>
            {primaryAction && variant === 'basic' && (
              <div style={{ marginTop: 6 }}>
                <AIButton size="sm" variant="primary" label={primaryAction.label} onClick={primaryAction.onClick} />
              </div>
            )}
            {primaryAction && variant === 'link' && (
              <div style={{ marginTop: 4 }}>
                <button
                  onClick={primaryAction.onClick}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: F, fontSize: 14, fontWeight: 600,
                    color: AI.color.brand,
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    textDecoration: 'underline', textUnderlineOffset: 3,
                  }}
                >
                  {primaryAction.label}
                  <LinkArrow />
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  const pad = compact ? '10px 14px' : '14px 16px';
  const gap = compact ? 8 : 10;

  return (
    <>
      <style>{PULSE_STYLE}{ENTER_STYLE}</style>
      <div
        role="status"
        aria-label={`${cfg.label}: ${title}`}
        aria-live={isUrgent ? 'assertive' : 'polite'}
        className="ai-notif-enter"
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: AI.radius.lg,
          border: `1px solid ${cfg.borderColor}30`,
          background: cfg.bgColor,
          overflow: 'hidden',
          animation: 'ai-notif-enter 0.2s ease both',
          fontFamily: F,
          width: '100%',
        }}
      >
        {/* Card body */}
        <div style={{ flex: 1, padding: pad, display: 'flex', flexDirection: 'column', gap }}>

          {/* Header row */}
          <div
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 6,
              cursor: isAccordion ? 'pointer' : 'default',
              userSelect: isAccordion ? 'none' : 'auto',
            }}
            onClick={isAccordion ? () => setExpanded(e => !e) : undefined}
            role={isAccordion ? 'button' : undefined}
            aria-expanded={isAccordion ? expanded : undefined}
            tabIndex={isAccordion ? 0 : undefined}
            onKeyDown={isAccordion ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(v => !v); }
            } : undefined}
          >
            <div style={{ marginTop: 1 }}>
              <SeverityIcon severity={severity} color={cfg.labelColor} />
            </div>
            <span style={{
              flex: 1,
              fontSize: 14,
              fontWeight: 700,
              color: cfg.labelColor,
              fontFamily: F,
              lineHeight: 1.3,
            }}>
              {title}
            </span>
            {/* Accordion chevron — ZAIDYN glyph */}
            {isAccordion && (
              <span
                className="zs-master-style"
                aria-hidden="true"
                style={{
                  display: 'inline-flex',
                  flexShrink: 0,
                  marginTop: 2,
                  color: cfg.labelColor,
                  transition: 'transform 0.18s ease',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  lineHeight: 0,
                }}
              >
                <i className="zs-icon zs-icon-carat-down" style={{ fontSize: 12, color: 'currentColor', lineHeight: 1 }} />
              </span>
            )}
            {/* Dismiss */}
            {isDismissible && (
              <button
                aria-label="Dismiss notification"
                onClick={(e) => { e.stopPropagation(); setDismissed(true); onDismiss?.(); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 2, color: 'var(--ai-zds-helper)', display: 'flex', alignItems: 'center',
                  borderRadius: AI.radius.xs, flexShrink: 0,
                }}
              >
                <DismissIcon />
              </button>
            )}
          </div>

          {/* Accordion-gated body (always rendered for non-accordion) */}
          {(!isAccordion || expanded) && (
          <>
          {/* Message body */}
          <p style={{
            margin: 0,
            fontSize: 14,
            color: 'var(--ai-zds-text)',
            lineHeight: 1.55,
            fontFamily: F,
          }}>
            {message}
          </p>

          {/* Chips row */}
          {chips && chips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {chips.map((chip, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '2px 8px',
                  borderRadius: AI.radius.full,
                  border: `1px solid ${cfg.borderColor}40`,
                  background: 'var(--ai-card-bg)',
                  fontSize: 12, fontWeight: 500,
                  color: cfg.labelColor,
                  fontFamily: F,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}>
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Action row */}
          {!compact && (primaryAction || secondaryAction || isSnoozable || onViewRationale || onMarkReviewed) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 2 }}>
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: F, fontSize: 14, fontWeight: 600,
                    color: cfg.labelColor,
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                  }}
                >
                  {primaryAction.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: F, fontSize: 14, fontWeight: 500,
                    color: 'var(--ai-zds-helper)',
                  }}
                >
                  {secondaryAction.label}
                </button>
              )}
              {isSnoozable && (
                <button
                  aria-label="Snooze notification"
                  onClick={onSnooze}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: F, fontSize: 14, fontWeight: 500, color: 'var(--ai-zds-helper)',
                  }}
                >
                  Snooze
                </button>
              )}
              {onViewRationale && (
                <button
                  onClick={onViewRationale}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: F, fontSize: 14, fontWeight: 500, color: AI.color.brand,
                  }}
                >
                  Why this?
                </button>
              )}
              {onMarkReviewed && (
                <button
                  onClick={onMarkReviewed}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: F, fontSize: 14, fontWeight: 500, color: 'var(--ai-zds-helper)',
                  }}
                >
                  Mark reviewed
                </button>
              )}
            </div>
          )}

          {/* Attribution / timestamp footer */}
          {(attribution || timestamp) && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginTop: compact ? 2 : 4,
            }}>
              {attribution && (
                <span style={{ fontSize: 12, fontFamily: F, color: 'var(--ai-zds-helper)' }}>
                  {attribution}
                </span>
              )}
              {attribution && timestamp && (
                <span style={{ fontSize: 12, color: 'var(--ai-zds-helper)', opacity: 0.5 }}>·</span>
              )}
              {timestamp && (
                <span style={{ fontSize: 12, fontFamily: F, color: 'var(--ai-zds-helper)' }}>
                  {timestamp}
                </span>
              )}
            </div>
          )}
          </>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AINotificationStack — grouped cards with intro + overflow
// ─────────────────────────────────────────────────────────────────────────────

export function AINotificationStack({
  intro,
  notifications,
  maxVisible = 3,
  onViewAll,
}: AINotificationStackProps) {
  const visible  = notifications.slice(0, maxVisible);
  const overflow = notifications.length - maxVisible;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', fontFamily: F }}>
      {intro && (
        <p style={{
          margin: 0,
          fontSize: 14,
          fontStyle: 'italic',
          color: 'var(--ai-zds-helper)',
          fontFamily: F,
          lineHeight: 1.45,
          paddingLeft: 2,
        }}>
          {intro}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {visible.map((n, i) => (
          <AINotification key={i} {...n} />
        ))}
      </div>

      {overflow > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 2 }}>
          <span style={{ fontSize: 12, color: 'var(--ai-zds-helper)', fontFamily: F }}>
            +{overflow} more alert{overflow > 1 ? 's' : ''}
          </span>
          {onViewAll && (
            <button
              onClick={onViewAll}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: F, fontSize: 14, fontWeight: 600, color: AI.color.brand,
                display: 'inline-flex', alignItems: 'center', gap: 3,
              }}
            >
              View all
              <LinkArrow />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AINotification;
