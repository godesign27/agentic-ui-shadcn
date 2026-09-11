import React, { useState } from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AICardMetric, type AICardMetricProps } from '../ai-card-metric/AICardMetric';
import { AIInsightList, type AIInsightItem } from '../../organisms/ai-insight-list/AIInsightList';
import { AIChip } from '../../atomic/ai-chip/AIChip';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ─────────────────────────────────────────────────────────────────────────────
// AICardAnalysis — structured AI analysis summary. Combines a metric grid
// (AICardMetric), an insight list (AIInsightList), trust metadata
// (confidence / risk / sources / freshness), rationale links, and actions
// into one reusable card for chat threads, side drawers, generated dashboards
// and review surfaces.
//
// Density gating mirrors AICardMetric / AINotification:
//   simple → fast-scan card for chat / narrow drawers
//   rich   → adds source/freshness, view-sources/rationale, single action
//   robust → adds AI-led trust row (confidence + risk + sources + assumptions)
//            and a primary + secondary action footer
// ─────────────────────────────────────────────────────────────────────────────

export type AICardAnalysisDensity = 'simple' | 'rich' | 'robust';

// Subset of AICardMetricProps the parent passes per metric. The analysis card
// handles layout (grid columns, density default, accent-bar default) so the
// caller only specifies content.
export type AIAnalysisMetric = Omit<AICardMetricProps, 'density' | 'valueSize'> & {
  density?: AICardMetricProps['density'];
};

export interface AICardAnalysisProps {
  density:            AICardAnalysisDensity;

  // Header
  intro?:             string;
  title?:             string;
  analysisType?:      string;
  timestamp?:         string;
  collapsible?:       boolean;
  defaultExpanded?:   boolean;

  // Metric grid
  metrics?:           AIAnalysisMetric[];
  metricsColumns?:    number;

  // Insight list
  insights?:          AIInsightItem[];
  insightsTitle?:     string;
  maxInsights?:       number;

  // Footer / trust
  source?:            { label: string; icon?: string };
  freshness?:         string;
  confidence?:        number;                 // 0–100
  risk?:              'low' | 'medium' | 'high';
  onViewRationale?:   () => void;
  onViewSources?:     () => void;
  onViewAssumptions?: () => void;

  // Actions
  primaryAction?:     { label: string; onClick?: () => void };
  secondaryAction?:   { label: string; onClick?: () => void };

  // Shared
  loading?:           boolean;
  loadingLabel?:      string;
  className?:         string;
}

function warnExtraneous(density: AICardAnalysisDensity, p: AICardAnalysisProps) {
  if (typeof window === 'undefined') return;
  const richOnly   = ['source', 'freshness', 'onViewSources', 'primaryAction'] as const;
  const robustOnly = ['onViewAssumptions', 'secondaryAction'] as const;
  const offenders: string[] = [];
  if (density === 'simple') {
    [...richOnly, ...robustOnly].forEach((k) => { if ((p as any)[k] != null) offenders.push(k); });
  } else if (density === 'rich') {
    robustOnly.forEach((k) => { if ((p as any)[k] != null) offenders.push(k); });
  }
  if (offenders.length > 0) {
    console.warn(`[AICardAnalysis] density="${density}" ignores props: ${offenders.join(', ')}`);
  }
}

function ConfidencePill({ pct }: { pct: number }) {
  const tone =
    pct >= 80 ? { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40', label: 'High confidence' }
  : pct >= 60 ? { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E', label: 'Medium confidence' }
  :             { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'Low confidence' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
      borderRadius: AI.radius.full,
      background: tone.bg, border: `1px solid ${tone.border}`, color: tone.text,
      fontFamily: F, fontSize: 12, fontWeight: 600, lineHeight: 1.3,
    }}>
      {pct}% · {tone.label}
    </span>
  );
}

function RiskPill({ level }: { level: 'low' | 'medium' | 'high' }) {
  const tone =
    level === 'low'    ? { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40', label: 'Low risk' }
  : level === 'medium' ? { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E', label: 'Medium risk' }
  :                      { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'High risk' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
      borderRadius: AI.radius.full,
      background: tone.bg, border: `1px solid ${tone.border}`, color: tone.text,
      fontFamily: F, fontSize: 12, fontWeight: 600, lineHeight: 1.3,
    }}>
      {tone.label}
    </span>
  );
}

function CollapseChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
      style={{ transition: 'transform 0.18s ease', transform: expanded ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M3.5 5 L7 8.5 L10.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SHIMMER = `
@keyframes ai-analysis-shimmer {
  0%, 100% { opacity: 1;   }
  50%      { opacity: 0.4; }
}
@media (prefers-reduced-motion: reduce) {
  .ai-analysis-skel { animation: none !important; }
}
`;

function Skeleton({ width, height = 14 }: { width: string | number; height?: number }) {
  return (
    <span
      className="ai-analysis-skel"
      aria-hidden="true"
      style={{
        display: 'inline-block', width, height,
        background: '#E5E7EB', borderRadius: 6,
        animation: 'ai-analysis-shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
}

export function AICardAnalysis(props: AICardAnalysisProps) {
  const {
    density,
    intro, title, analysisType, timestamp,
    collapsible, defaultExpanded = true,
    metrics, metricsColumns,
    insights, insightsTitle = 'Key insights', maxInsights,
    source, freshness, confidence, risk,
    onViewRationale, onViewSources, onViewAssumptions,
    primaryAction, secondaryAction,
    loading, loadingLabel = 'Analyzing…',
    className,
  } = props;

  warnExtraneous(density, props);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const hasHeader = !!(intro || title || analysisType || timestamp || collapsible);
  const defaultMetricDensity: AICardMetricProps['density'] =
    density === 'simple' ? 'simple' : 'rich';
  const metricCols = metricsColumns ?? 2;

  const showFooterBadges = density !== 'simple' && (confidence != null || risk);
  const showFooterLinks  = density !== 'simple' && (onViewRationale || onViewSources || onViewAssumptions);
  const showActions      = density === 'robust' && (primaryAction || secondaryAction);

  // Rich + Robust use the tinted header / white body / tinted footer layout
  // that AICardQueue, AICardWorkstream, and other governance cards share.
  // Simple keeps the flat single-surface look since it's meant for chat where
  // a heavier card chrome would compete with the message bubble.
  const sectioned   = density !== 'simple';
  const tintedBg    = 'var(--ai-card-bg-raised, #F5F4F7)';
  const bodyBg      = 'var(--ai-card-bg, #FFFFFF)';
  const dividerCol  = 'var(--ai-card-border, #E5E7EB)';

  const HeaderBlock = hasHeader ? (
    <header style={{
      display: 'flex', flexDirection: 'column', gap: 4,
      ...(sectioned
        ? { padding: '14px 20px 14px', background: tintedBg, borderBottom: `1px solid ${dividerCol}` }
        : {}),
    }}>
      {(analysisType || timestamp || collapsible) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            {analysisType && (
              <span style={{
                fontFamily: F, fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                color: AI.color.brand,
              }}>
                {analysisType}
              </span>
            )}
            {analysisType && timestamp && (
              <span style={{ color: 'var(--ai-zds-helper, #9CA3AF)', opacity: 0.5 }}>·</span>
            )}
            {timestamp && (
              <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                {timestamp}
              </span>
            )}
          </div>
          {collapsible && (
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse analysis' : 'Expand analysis'}
              style={{
                background: 'none', border: 'none', padding: 4, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--ai-zds-helper, #6B6876)',
              }}
            >
              <CollapseChevron expanded={expanded} />
            </button>
          )}
        </div>
      )}
      {title && (
        <h3 style={{
          margin: 0, fontFamily: F, fontSize: 15, fontWeight: 700,
          color: 'var(--ai-zds-text, #1A1628)', lineHeight: 1.3,
        }}>
          {title}
        </h3>
      )}
      {intro && (
        <p style={{
          margin: 0, fontFamily: F, fontSize: 14, lineHeight: 1.55,
          color: 'var(--ai-zds-text, #2F2C3C)',
        }}>
          {intro}
        </p>
      )}
    </header>
  ) : null;

  const BodyBlock = (!collapsible || expanded) ? (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      ...(sectioned
        ? { padding: '16px 20px 18px', background: bodyBg }
        : {}),
    }}>
      {loading && (
        <div role="status" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
            {loadingLabel}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${metricCols}, minmax(0, 1fr))`,
            gap: 12,
          }}>
            {Array.from({ length: metricCols * 2 }).map((_, i) => (
              <div key={i} style={{
                padding: '14px 16px 16px',
                background: tintedBg,
                border: `1px solid ${dividerCol}`,
                borderRadius: 12,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <Skeleton width={80} height={10} />
                <Skeleton width={100} height={22} />
                <Skeleton width={120} height={11} />
              </div>
            ))}
          </div>
          <Skeleton width="60%" />
          <Skeleton width="80%" />
          <Skeleton width="55%" />
        </div>
      )}

      {!loading && metrics && metrics.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${metricCols}, minmax(0, 1fr))`,
          gap: 12,
        }}>
          {metrics.map((m, i) => (
            <AICardMetric key={i} {...m} density={m.density ?? defaultMetricDensity} />
          ))}
        </div>
      )}

      {!loading && insights && insights.length > 0 && (
        <AIInsightList
          title={insightsTitle}
          items={insights}
          density={density === 'simple' ? 'compact' : 'comfortable'}
          maxVisible={maxInsights}
          showSources={density !== 'simple'}
          showActions={density === 'robust'}
        />
      )}

      {!loading && density !== 'simple' && (source || freshness) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {source && (
            <AIChip kind="brief"
              label={source.label} size="sm" noDot
              icon={source.icon ?? 'zs-icon-data-table'}
              accentColor="var(--ai-zds-helper, #6B6876)"
              accentBg="var(--ai-card-bg, #FFFFFF)"
            />
          )}
          {freshness && (
            <AIChip kind="brief"
              label={freshness} size="sm" noDot
              icon="zs-icon-clock-pending"
              accentColor="var(--ai-zds-helper, #6B6876)"
              accentBg="var(--ai-card-bg, #FFFFFF)"
            />
          )}
        </div>
      )}
    </div>
  ) : null;

  // Footer: trust badges + links combined into a single sectioned region.
  // Action row (Robust only) lives inside the same tinted footer so the
  // bottom of the card reads as one rest area instead of two stripes.
  const showFooter = !loading && (showFooterBadges || showFooterLinks || showActions);
  const FooterBlock = showFooter ? (
    <footer style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      ...(sectioned
        ? { padding: '12px 20px 14px', background: tintedBg, borderTop: `1px solid ${dividerCol}` }
        : { paddingTop: 12, borderTop: `1px solid ${dividerCol}` }),
    }}>
      {(showFooterBadges || showFooterLinks) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {confidence != null && <ConfidencePill pct={confidence} />}
          {risk && <RiskPill level={risk} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginLeft: 'auto' }}>
            {onViewRationale   && <AIWhyThisLink variant="view-rationale"   onClick={onViewRationale} />}
            {onViewSources     && <AIWhyThisLink variant="view-sources"     onClick={onViewSources} />}
            {onViewAssumptions && <AIWhyThisLink variant="view-assumptions" onClick={onViewAssumptions} />}
          </div>
        </div>
      )}
      {showActions && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          ...((showFooterBadges || showFooterLinks)
            ? { paddingTop: 8, borderTop: `1px solid ${dividerCol}` }
            : {}),
        }}>
          {primaryAction && (
            <AIButton variant="primary" size="sm" label={primaryAction.label} onClick={primaryAction.onClick} />
          )}
          {secondaryAction && (
            <AIButton variant="secondary" size="sm" label={secondaryAction.label} onClick={secondaryAction.onClick} />
          )}
        </div>
      )}
    </footer>
  ) : null;

  return (
    <>
      <style>{SHIMMER}</style>
      <article
        aria-label={title ?? analysisType ?? 'AI analysis'}
        className={className}
        style={{
          position: 'relative' as const,
          display: 'flex', flexDirection: 'column',
          // Sectioned cards: zero outer padding/gap — each region sets its own.
          // Simple: keep the flat single-surface chat-style padding + gap.
          gap: sectioned ? 0 : 14,
          padding: sectioned ? 0 : '14px 16px 16px',
          background: sectioned ? bodyBg : bodyBg,
          border: `1px solid ${dividerCol}`,
          borderRadius: 16,
          boxShadow: AI.shadow.card.default,
          fontFamily: F,
          width: '100%',
          overflow: 'hidden' as const,
        }}
      >
        {HeaderBlock}
        {BodyBlock}
        {FooterBlock}
      </article>
    </>
  );
}

export default AICardAnalysis;
