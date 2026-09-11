import React, { useState } from 'react';
import { F, AI, ZDS, ZS_ORANGE, ZSAI_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAccentLine, AccentLineStyle } from '../../atomic/ai-accent-line/AIAccentLine';
import { AIBadge } from '../../atomic/ai-badge/AIBadge';

// ── Types ─────────────────────────────────────────────────────────────────────

export type InsightType =
  | 'keyTrend'
  | 'observation'
  | 'riskSignal'
  | 'opportunity'
  | 'anomaly'
  | 'recommendation'
  | 'watchout'
  | 'evidence'
  | 'warning'
  | 'context'
  | 'benchmark'
  | 'prediction';

export type ConfidenceVariant =
  | 'high'
  | 'medium'
  | 'low'
  | 'reviewSuggested'
  | 'dataStale'
  | 'sourceLimited';

export type InsightStatus =
  | 'default'
  | 'reviewSuggested'
  | 'dataStale'
  | 'sourceLimited'
  | 'selected'
  | 'expanded';

// Content-density variant — same component, four density levels:
//   basic  → type label + body only (compact list item)
//   simple → + optional confidence + metric chip (chat / drawer)
//   rich   → + sources + rationale link + risk + review indicator
//   robust → + risk + multi-action row + view-sources/assumptions/audit
export type InsightDensity = 'basic' | 'simple' | 'rich' | 'robust';

export type RiskVariant   = 'low' | 'medium' | 'high';
export type ReviewIndicator = 'reviewSuggested' | 'humanReviewed' | 'escalated';

export interface AIAnalysisInsightAction {
  label:    string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface AIAnalysisInsightProps {
  type:            InsightType;
  body:            string;
  title?:          string;
  density?:        InsightDensity;
  confidence?:     ConfidenceVariant;
  risk?:           RiskVariant;
  reviewIndicator?: ReviewIndicator;
  metric?:         string;
  sources?:        string[];
  freshness?:      string;
  action?:         { label: string; onClick?: () => void };
  /** Robust only — supports a row of multiple actions. */
  actions?:        AIAnalysisInsightAction[];
  owner?:          string;
  expanded?:       boolean;
  status?:         InsightStatus;
  showRationale?:  boolean;
  showSources?:    boolean;
  showAssumptions?: boolean;
  onViewRationale?: () => void;
  onViewSources?:   () => void;
  onViewAssumptions?: () => void;
  onAction?:        () => void;
  /** Pluggable accent line style. Defaults to 'gradient'. */
  accentStyle?:    AccentLineStyle;
}

// Re-export for consumers who import from this file
export type { AccentLineStyle };

// ── Visual tokens per insight type ───────────────────────────────────────────

const INSIGHT_META: Record<InsightType, {
  label: string;
  border: string;
  bg: string;
  labelColor: string;
}> = {
  keyTrend: {
    label: 'Key Trend',
    border: 'var(--ai-status-info-border)',
    bg: 'var(--ai-status-info-bg)',
    labelColor: 'var(--ai-status-info-text)',
  },
  observation: {
    label: 'Observation',
    border: AI.color.action.primary,
    bg: 'var(--ai-brand-surface, #F5F6FF)',
    labelColor: AI.color.action.primaryActive,
  },
  riskSignal: {
    label: 'Risk Signal',
    border: 'var(--ai-status-error-border)',
    bg: 'var(--ai-status-error-bg)',
    labelColor: 'var(--ai-status-error-text)',
  },
  opportunity: {
    label: 'Opportunity',
    border: 'var(--ai-status-success-border)',
    bg: 'var(--ai-status-success-bg)',
    labelColor: 'var(--ai-status-success-text)',
  },
  anomaly: {
    label: 'Anomaly',
    border: 'var(--ai-status-purple-border)',
    bg: 'var(--ai-status-purple-bg)',
    labelColor: 'var(--ai-status-purple-text)',
  },
  recommendation: {
    label: 'Recommendation',
    border: ZS_ORANGE[60],
    bg: AI.color.signal.surface,
    labelColor: ZS_ORANGE[70],
  },
  watchout: {
    label: 'Watchout',
    border: ZS_ORANGE[40],
    bg: ZS_ORANGE['00'],
    labelColor: ZS_ORANGE[70],
  },
  evidence: {
    label: 'Evidence',
    border: 'var(--ai-card-border)',
    bg: 'var(--ai-card-bg-raised)',
    labelColor: 'var(--ai-zds-helper)',
  },
  warning: {
    label: 'Warning',
    border: 'var(--ai-status-warning-border)',
    bg: 'var(--ai-status-warning-bg)',
    labelColor: 'var(--ai-status-warning-text)',
  },
  context: {
    label: 'Context',
    border: ZSAI_TAN[60],
    bg: ZSAI_TAN['00'],
    labelColor: ZSAI_TAN[80],
  },
  benchmark: {
    label: 'Benchmark',
    border: AI.color.border.strong,
    bg: AI.color.brandSubtle,
    labelColor: AI.color.text.primary,
  },
  prediction: {
    label: 'Prediction',
    border: 'var(--ai-status-purple-border)',
    bg: 'var(--ai-status-purple-bg)',
    labelColor: 'var(--ai-status-purple-text)',
  },
};

// ── Confidence badge tokens ───────────────────────────────────────────────────

const CONFIDENCE_META: Record<ConfidenceVariant, { label: string; color: string; border: string; bg: string }> = {
  high: {
    label: 'High Confidence',
    color: 'var(--ai-status-info-text)',
    border: 'var(--ai-status-info-border)',
    bg: 'var(--ai-status-info-bg)',
  },
  medium: {
    label: 'Medium Confidence',
    color: 'var(--ai-status-warning-text)',
    border: 'var(--ai-status-warning-border)',
    bg: 'var(--ai-status-warning-bg)',
  },
  low: {
    label: 'Low Confidence',
    color: 'var(--ai-status-error-text)',
    border: 'var(--ai-status-error-border)',
    bg: 'var(--ai-status-error-bg)',
  },
  reviewSuggested: {
    label: 'Review Suggested',
    color: ZS_ORANGE[70],
    border: ZS_ORANGE[40],
    bg: ZS_ORANGE['00'],
  },
  dataStale: {
    label: 'Data Stale',
    color: ZS_ORANGE[70],
    border: ZS_ORANGE[40],
    bg: ZS_ORANGE['00'],
  },
  sourceLimited: {
    label: 'Source Limited',
    color: 'var(--ai-status-purple-text)',
    border: 'var(--ai-status-purple-border)',
    bg: 'var(--ai-status-purple-bg)',
  },
};

// ── Ghost link button ─────────────────────────────────────────────────────────

function GhostLink({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none',
        border: 'none',
        padding: '0 2px',
        cursor: 'pointer',
        fontSize: '10px',
        fontFamily: F,
        fontWeight: 600,
        color: hov ? AI.color.action.primaryActive : AI.color.action.primary,
        textDecoration: hov ? 'underline' : 'none',
        transition: 'color 0.12s',
      }}
    >
      {label}
    </button>
  );
}

// ── Action button ─────────────────────────────────────────────────────────────

function ActionButton({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--ai-brand-surface)' : 'transparent',
        border: `1px solid ${AI.color.action.primary}`,
        borderRadius: AI.radius.xs,
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: '11px',
        fontFamily: F,
        fontWeight: 500,
        color: AI.color.action.primary,
        transition: 'background 0.12s, border-color 0.12s',
        marginTop: '8px',
      }}
    >
      {label} →
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const RISK_META: Record<RiskVariant, { label: string; color: string; border: string; bg: string }> = {
  low:    { label: 'Low risk',    color: '#1F6B40', border: '#CDE3D5', bg: '#EAF4EE' },
  medium: { label: 'Medium risk', color: '#854D0E', border: '#EAD5A6', bg: '#FBF1DA' },
  high:   { label: 'High risk',   color: 'var(--ai-status-error-text)', border: 'var(--ai-status-error-border)', bg: 'var(--ai-status-error-bg)' },
};

const REVIEW_META: Record<ReviewIndicator, { label: string; color: string; border: string; bg: string }> = {
  reviewSuggested: { label: 'Review suggested', color: ZS_ORANGE[70], border: ZS_ORANGE[40], bg: ZS_ORANGE['00'] },
  humanReviewed:   { label: 'Human reviewed',   color: '#1F6B40',     border: '#CDE3D5',     bg: '#EAF4EE'        },
  escalated:       { label: 'Escalated',         color: 'var(--ai-status-error-text)', border: 'var(--ai-status-error-border)', bg: 'var(--ai-status-error-bg)' },
};

const translucent = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

// Left padding: gradient style sits on the left edge and needs breathing room.
// top-bar and none don't intrude on the left margin.
const LEFT_PAD: Record<AccentLineStyle, string> = {
  gradient:  '18px',
  'top-bar': '16px',
  none:      '16px',
};

export function AIAnalysisInsight({
  type,
  body,
  title,
  density = 'rich',
  confidence,
  risk,
  reviewIndicator,
  metric,
  sources,
  freshness,
  action,
  actions,
  owner,
  expanded: expandedProp,
  status = 'default',
  showRationale = false,
  showSources = false,
  showAssumptions = false,
  onViewRationale,
  onViewSources,
  onViewAssumptions,
  onAction,
  accentStyle = 'gradient',
}: AIAnalysisInsightProps) {
  const [hovCard, setHovCard] = useState(false);
  const meta = INSIGHT_META[type];
  const conf = confidence ? CONFIDENCE_META[confidence] : null;
  const riskMeta = risk ? RISK_META[risk] : null;
  const reviewMeta = reviewIndicator ? REVIEW_META[reviewIndicator] : null;

  const isSelected = status === 'selected' || expandedProp;
  const isDataStale = status === 'dataStale' || confidence === 'dataStale';

  const allowConfidence = density !== 'basic';
  const allowMetric     = density !== 'basic';
  const allowRisk       = density === 'rich' || density === 'robust';
  const allowReview     = density === 'rich' || density === 'robust';
  const allowFreshness  = density === 'rich' || density === 'robust';
  const allowSources    = density === 'rich' || density === 'robust';
  const allowRationale  = density === 'rich' || density === 'robust';
  const allowAction     = density !== 'basic' && density !== 'simple';
  const allowActions    = density === 'robust';
  const allowAssumptions = density === 'robust';
  const allowOwner      = density === 'robust';

  const cardBg  = meta.bg;
  const leftPad = LEFT_PAD[accentStyle];
  const cardPad = density === 'basic'
    ? `12px 16px 12px ${leftPad}`
    : `14px 16px 14px ${leftPad}`;

  return (
    <div
      role="article"
      aria-label={`${meta.label} insight`}
      onMouseEnter={() => setHovCard(true)}
      onMouseLeave={() => setHovCard(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: cardBg,
        border: `1px solid ${translucent(meta.labelColor, hovCard ? 55 : 22)}`,
        borderRadius: AI.radius.sm,
        padding: cardPad,
        transition: 'border-color 0.15s ease, box-shadow 0.2s ease',
        boxShadow: hovCard
          ? `0 4px 16px -8px ${translucent(meta.labelColor, 40)}`
          : 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Pluggable accent line — rendered via AIAccentLine atom */}
      <AIAccentLine color={meta.labelColor} style={accentStyle} />

      {/* Content layer sits above the accent. */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ── Header row: eyebrow + serial + confidence badge ──────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            ...AI_TYPOGRAPHY['@zsai-micro-eyebrow'],
            textTransform: 'uppercase' as const,
            color: meta.labelColor,
            fontFamily: F,
          }}>
            {meta.label}
          </span>
        </span>
        {(() => {
          const badge =
            reviewMeta && allowReview ? { ...reviewMeta, stale: false }
          : riskMeta   && allowRisk   ? { ...riskMeta,   stale: false }
          : conf       && allowConfidence ? { color: conf.color, bg: conf.bg, border: conf.border, label: conf.label, stale: isDataStale }
          : null;
          if (!badge) return null;
          return (
            <span
              aria-label={badge.label}
              style={{
                ...AI_TYPOGRAPHY['@zsai-action-link'],
                fontFamily: F, whiteSpace: 'nowrap',
                color: badge.color, background: badge.bg,
                border: `1px solid ${badge.border}`,
                borderRadius: AI.radius.full, padding: '4px 10px',
              }}
            >
              {badge.stale && <span aria-hidden="true" style={{ marginRight: '4px' }}>⚠</span>}
              {badge.label}
            </span>
          );
        })()}
      </div>

      {/* ── Optional title ────────────────────────────────────────────────── */}
      {title && (
        <p style={{
          margin: '0 0 6px',
          ...AI_TYPOGRAPHY['@zsai-insight-title'],
          fontFamily: F,
          color: 'var(--ai-zds-text)',
        }}>
          {title}
        </p>
      )}

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <p style={{
        margin: 0,
        ...AI_TYPOGRAPHY['@zsai-section-subtitle'],
        fontFamily: F,
        color: 'var(--ai-zds-text)',
      }}>
        {body}
      </p>

      {/* ── Metric highlight ─────────────────────────────────────────────── */}
      {metric && allowMetric && (
        <div style={{ marginTop: '8px' }}>
          {/* Non-interactive metric-delta indicator, tinted to the insight's
              type color. Uses the shared AIBadge atom (soft emphasis). */}
          <AIBadge
            emphasis="soft"
            style={{
              background: translucent(meta.labelColor, 14),
              border: `1px solid ${translucent(meta.labelColor, 35)}`,
              color: meta.labelColor,
            }}
          >
            {metric}
          </AIBadge>
        </div>
      )}

      {/* ── Owner / reviewer (Robust) ────────────────────────────────────── */}
      {owner && allowOwner && (
        <div style={{
          marginTop: '6px',
          fontSize: '10px', fontFamily: F,
          color: 'var(--ai-zds-helper)',
        }}>
          Owner: <span style={{ color: 'var(--ai-zds-text)', fontWeight: 600 }}>{owner}</span>
        </div>
      )}

      {/* ── Footer links ─────────────────────────────────────────────────── */}
      {allowRationale && (showRationale || (showSources && onViewSources) || (showAssumptions && onViewAssumptions && allowAssumptions)) && (
        <div style={{
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexWrap: 'wrap',
        }}>
          {showRationale && onViewRationale && (
            <GhostLink label="Why this?" onClick={onViewRationale} />
          )}
          {showRationale && onViewRationale && showSources && onViewSources && (
            <span style={{ fontSize: '10px', color: 'var(--ai-zds-helper)', fontFamily: F }}>·</span>
          )}
          {showSources && onViewSources && allowSources && (
            <GhostLink label="View sources" onClick={onViewSources} />
          )}
          {((showRationale && onViewRationale) || (showSources && onViewSources)) && showAssumptions && onViewAssumptions && allowAssumptions && (
            <span style={{ fontSize: '10px', color: 'var(--ai-zds-helper)', fontFamily: F }}>·</span>
          )}
          {showAssumptions && onViewAssumptions && allowAssumptions && (
            <GhostLink label="View assumptions" onClick={onViewAssumptions} />
          )}
        </div>
      )}

      {/* ── Action(s) ────────────────────────────────────────────────────── */}
      {allowActions && actions && actions.length > 0 ? (
        <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {actions.map((a, i) => (
            <ActionButton key={i} label={a.label} onClick={a.onClick} />
          ))}
        </div>
      ) : action && allowAction ? (
        <ActionButton
          label={action.label}
          onClick={onAction ?? action.onClick}
        />
      ) : null}

      {/* Bottom trust-footnote row */}
      {((showSources && allowSources && sources && sources.length > 0) || (freshness && allowFreshness)) && (
        <div style={{
          marginTop: '10px',
          paddingTop: '8px',
          borderTop: '1px dashed var(--ai-card-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          {showSources && allowSources && sources && sources.length > 0 && (
            <>
              <span style={{
                ...AI_TYPOGRAPHY['@zsai-overline'],
                fontFamily: F,
                color: 'var(--ai-zds-helper)',
              }}>
                Sources
              </span>
              {sources.map((s) => (
                <span key={s} style={{
                  fontSize: '10px',
                  fontFamily: F,
                  color: 'var(--ai-zds-helper)',
                  background: 'var(--ai-track-bg)',
                  border: '1px solid var(--ai-card-border)',
                  borderRadius: AI.radius.full,
                  padding: '2px 8px',
                }}>
                  {s}
                </span>
              ))}
            </>
          )}
          {freshness && allowFreshness && (
            <span style={{
              fontSize: '10px', fontFamily: F,
              color: 'var(--ai-zds-helper)',
              marginLeft: 'auto',
            }}>
              {freshness}
            </span>
          )}
        </div>
      )}
      </div>{/* /content-layer */}
    </div>
  );
}

export default AIAnalysisInsight;
