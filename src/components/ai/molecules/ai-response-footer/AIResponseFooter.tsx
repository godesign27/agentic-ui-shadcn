import React, { useState } from 'react';
import { AI, ZDS, ZS_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIFeedbackBar } from '../../atomic/ai-feedback-bar/AIFeedbackBar';

// ── Types ─────────────────────────────────────────────────────────────────────

export type FooterStatus = 'default' | 'stale' | 'missing-source' | 'readonly' | 'audit-ready';
export type FooterLayout = 'default' | 'compact' | 'panel' | 'command-center';

export interface AISource {
  label:      string;
  type?:      string;
  freshness?: 'fresh' | 'stale' | 'unavailable';
  status?:    string;
  href?:      string;
}

export interface AIResponseFooterProps {
  sources?:           AISource[];
  maxVisibleSources?: number;
  attribution?:       string;
  updatedAt?:         string;
  freshnessLabel?:    string;
  showDivider?:       boolean;
  showFeedback?:      boolean;
  showRationale?:     boolean;
  showAuditTrail?:    boolean;
  status?:            FooterStatus;
  compact?:           boolean;
  layout?:            FooterLayout;
  disabled?:          boolean;
  onFeedback?:        (v: 'up' | 'down') => void;
  onShare?:           () => void;
  onCopy?:            () => void;
  onSave?:            () => void;
  onViewRationale?:   () => void;
  onViewAuditTrail?:  () => void;
  onReportIssue?:     () => void;
}

// ── Warning icon (orange, stale/missing states only) ─────────────────────────
function WarnIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="8.5" stroke={ZS_ORANGE[60]} strokeWidth="1.5" />
      <path d="M10 6v5" stroke={ZS_ORANGE[60]} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill={ZS_ORANGE[60]} />
    </svg>
  );
}

// ── Source chip ───────────────────────────────────────────────────────────────
function SourceChip({ source, compact }: { source: AISource; compact?: boolean }) {
  const isStale  = source.freshness === 'stale';
  const isMissing = source.freshness === 'unavailable';

  const bg     = isMissing ? 'var(--ai-missing-bg)'     : isStale ? 'var(--ai-signal-surface)' : 'var(--ai-source-bg)';
  const border = isMissing ? 'var(--ai-missing-border)' : isStale ? 'var(--ai-signal-border)'  : 'var(--ai-source-border)';
  const color  = isMissing ? 'var(--ai-missing-text)'   : isStale ? ZS_ORANGE[70]               : 'var(--ai-source-text)';

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: compact ? '2px 7px' : '3px 9px',
      background: bg,
      border: `1px solid ${border}`,  /* already CSS-var-resolved above */
      borderRadius: '20px',
      // Default = @zsai-caption-2 (10/400/1.5). Compact = 9px micro-text (below scale floor).
      ...(compact ? { fontSize: 9, fontWeight: 400 as const, lineHeight: 1.5 } : AI_TYPOGRAPHY['@zsai-caption-2']),
      fontFamily: F,
      color,
      whiteSpace: 'nowrap',
      textDecoration: isMissing ? 'line-through' : 'none',
      opacity: isMissing ? 0.6 : 1,
    }}>
      {isStale && <WarnIcon />}
      {source.label}
    </span>
  );
}

// ── Overflow chip ─────────────────────────────────────────────────────────────
function OverflowChip({ count, compact }: { count: number; compact?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: compact ? '2px 7px' : '3px 9px',
      background: 'transparent',
      border: '1px solid var(--ai-card-border)',
      borderRadius: '20px',
      ...(compact ? { fontSize: 9, fontWeight: 400 as const, lineHeight: 1.5 } : AI_TYPOGRAPHY['@zsai-caption-2']),
      fontFamily: F,
      color: 'var(--ai-zds-helper)',
      whiteSpace: 'nowrap',
      cursor: 'default',
    }}>
      +{count} more
    </span>
  );
}

// ── Ghost link button ─────────────────────────────────────────────────────────
function LinkBtn({ label, onClick, disabled }: { label: string; onClick?: () => void; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', padding: '0 2px',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '10px', fontFamily: F, fontWeight: 600,
        color: disabled ? 'var(--ai-btn-disabled-text)' : hov ? AI.color.action.primaryActive : AI.color.action.primary,
        textDecoration: hov && !disabled ? 'underline' : 'none',
        opacity: disabled ? 0.4 : 1,
        transition: 'color 0.12s',
      }}
    >
      {label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AIResponseFooter({
  sources            = [],
  maxVisibleSources  = 3,
  attribution,
  updatedAt,
  freshnessLabel,
  showDivider        = true,
  showFeedback       = true,
  showRationale      = false,
  showAuditTrail     = false,
  status             = 'default',
  compact,
  layout             = 'default',
  disabled           = false,
  onViewRationale,
  onViewAuditTrail,
  onReportIssue,
}: AIResponseFooterProps) {
  const isCompact    = compact || layout === 'panel';
  const isStale      = status === 'stale';
  const isMissing    = status === 'missing-source';
  const isReadonly   = status === 'readonly';
  const isAudit      = status === 'audit-ready';

  const visibleSources  = sources.slice(0, maxVisibleSources);
  const overflowCount   = sources.length - visibleSources.length;

  const hasSources      = sources.length > 0;
  const hasAttribution  = !!(attribution || updatedAt || freshnessLabel);
  const hasLinks        = showRationale || showAuditTrail || isAudit || onReportIssue;

  // freshness text
  const freshnessText = freshnessLabel
    ? freshnessLabel
    : updatedAt
    ? `Updated ${updatedAt}`
    : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Top divider ──────────────────────────────────────────────────────── */}
      {showDivider && (
        <div style={{ height: 1, background: 'var(--ai-divider)', margin: isCompact ? '0 0 8px' : '0 0 10px' }} />
      )}

      {/* ── Stale / missing source warning ───────────────────────────────────── */}
      {(isStale || isMissing) && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: isCompact ? '4px 10px 6px' : '5px 10px 8px',
        }}>
          <WarnIcon />
          <span style={{
            fontSize: '10px', fontFamily: F, fontWeight: 500,
            color: ZS_ORANGE[70],
          }}>
            {isStale
              ? `Data may be stale · Last refreshed ${updatedAt ?? '2 hours ago'}`
              : 'Some sources unavailable · Confidence reduced'}
          </span>
        </div>
      )}

      {/* ── Data sources row ─────────────────────────────────────────────────── */}
      {hasSources && (
        <div style={{
          display: 'flex', alignItems: 'center', flexWrap: isCompact ? 'nowrap' : 'wrap',
          gap: '6px',
          padding: isCompact ? '0 10px 6px' : '0 10px 8px',
          overflow: isCompact ? 'hidden' : 'visible',
        }}>
          <span style={{
            fontSize: '9px', fontFamily: F, fontWeight: 700,
            color: 'var(--ai-zds-helper)', letterSpacing: '0.6px',
            textTransform: 'uppercase', whiteSpace: 'nowrap', marginRight: '2px',
          }}>
            Data Sources
          </span>
          {visibleSources.map((s, i) => (
            <SourceChip key={i} source={s} compact={isCompact} />
          ))}
          {overflowCount > 0 && <OverflowChip count={overflowCount} compact={isCompact} />}
        </div>
      )}

      {/* ── Attribution / freshness ───────────────────────────────────────────── */}
      {hasAttribution && !(isStale || isMissing) && (
        <div style={{
          padding: isCompact ? '0 10px 6px' : '0 10px 8px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          {attribution && (
            <span style={{ fontSize: '10px', fontFamily: F, color: 'var(--ai-zds-helper)' }}>
              {attribution}
            </span>
          )}
          {attribution && freshnessText && (
            <span style={{ fontSize: '10px', color: 'var(--ai-divider)', fontFamily: F }}>·</span>
          )}
          {freshnessText && (
            <span style={{ fontSize: '10px', fontFamily: F, color: 'var(--ai-zds-helper)' }}>
              {freshnessText}
            </span>
          )}
        </div>
      )}

      {/* ── AIFeedbackBar ─────────────────────────────────────────────────────── */}
      {showFeedback && !isReadonly && (
        <AIFeedbackBar showDivider={false} />
      )}

      {/* ── Rationale / audit links ───────────────────────────────────────────── */}
      {hasLinks && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '2px',
          padding: isCompact ? '2px 8px 6px' : '2px 8px 8px',
          borderTop: showFeedback && !isReadonly ? '1px solid var(--ai-divider)' : 'none',
          flexWrap: 'wrap',
        }}>
          {showRationale && (
            <LinkBtn label="View rationale" onClick={onViewRationale} disabled={disabled} />
          )}
          {showRationale && (showAuditTrail || isAudit) && (
            <span style={{ fontSize: '10px', color: 'var(--ai-divider)', fontFamily: F, padding: '0 2px' }}>·</span>
          )}
          {(showAuditTrail || isAudit) && (
            <LinkBtn label="View audit trail" onClick={onViewAuditTrail} disabled={disabled} />
          )}
          {((showRationale || showAuditTrail || isAudit) && onReportIssue) && (
            <span style={{ fontSize: '10px', color: 'var(--ai-divider)', fontFamily: F, padding: '0 2px' }}>·</span>
          )}
          {onReportIssue && (
            <LinkBtn label="Report issue" onClick={onReportIssue} disabled={disabled} />
          )}
        </div>
      )}
    </div>
  );
}

export default AIResponseFooter;
