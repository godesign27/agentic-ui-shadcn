import React from 'react';
import { AI, ZDS, F, ZS_AMBER, ZS_GREEN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIMetricValue } from '../../atomic/ai-metric-value/AIMetricValue';
import { AITrendIndicator, type AITrendIndicatorTone } from '../../atomic/ai-trend-indicator/AITrendIndicator';
import { AIChip, type AIStatusPillTone } from '../../atomic/ai-chip/AIChip';
import { AIInsightCallout } from '../../atomic/ai-insight-callout/AIInsightCallout';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ─────────────────────────────────────────────────────────────────────────────
// AICardMetric — KPI summary card with three content density levels.
//
//   Simple  — fast-scan tile for dashboards (label + value + trend).
//   Rich    — adds business context (target, source, freshness, status badge,
//             secondary metric, action link).
//   Robust  — AI-led intelligence card (AI insight callout, confidence pill,
//             view-sources / view-rationale, primary + secondary actions).
//
// One component, not three. The `density` prop gates which fields render so a
// Simple card cannot accidentally grow an AI insight callout.
// ─────────────────────────────────────────────────────────────────────────────

export type AICardMetricDensity = 'basic' | 'simple' | 'rich' | 'robust';

export type AIMetricAccent = 'teal' | 'indigo' | 'amber' | 'red' | 'green' | 'gray';

// Accent hexes match metric-card.accent.* from the component Tokens table.
// Amber/green use ramp step 60 (not status fill AA anchors at step 80).
const ACCENT: Record<AIMetricAccent, string> = {
  teal:   '#0A6E5E',                 // ZDS data-viz teal (no AI Tier-2 alias)
  indigo: AI.color.brand,            // #4D60E6
  amber:  ZS_AMBER[60],              // #E67E22 — caution / review
  red:    AI.color.status.error,     // #C0392B
  green:  ZS_GREEN[60],              // #27AE60 — positive
  gray:   ZDS.iconDefault,
};

/** Gallery / bare-mount defaults — Simple density (Total Sales). */
export const SAMPLE_CARD_METRIC_SIMPLE: AICardMetricProps = {
  density: 'simple',
  label: 'Total Sales',
  value: '42.8',
  unit: 'K',
  accent: 'teal',
  accentBar: true,
  trend: { delta: '+8.4%', label: 'vs prior', tone: 'positive' },
};

/** Rich density demo — Call Coverage. */
export const SAMPLE_CARD_METRIC_RICH: AICardMetricProps = {
  density: 'rich',
  label: 'Call Coverage',
  value: '78',
  unit: '%',
  accent: 'red',
  accentBar: true,
  trend: { delta: '-3.1%', label: 'vs target', tone: 'negative' },
  target: 'Target: 81%',
  status: { label: 'Below target', tone: 'warning' },
  source: { label: 'Field activity data' },
  freshness: 'Updated 1h ago',
  actionLink: { label: 'View coverage gaps' },
};

/** Robust density demo — Workload Index. */
export const SAMPLE_CARD_METRIC_ROBUST: AICardMetricProps = {
  density: 'robust',
  label: 'Workload Index',
  value: '1.15',
  accent: 'amber',
  accentBar: true,
  trend: { delta: '+0.08', label: 'vs prior', tone: 'positive' },
  target: 'Threshold: 1.25',
  status: { label: 'Needs review', tone: 'warning' },
  source: { label: 'Territory model' },
  freshness: '2h ago',
  insight:
    'Newark pressure increased after the recent zip moves. Review adjacent zip options to balance workload before Q3 planning locks.',
  confidence: 88,
  onViewSources: () => undefined,
  onViewRationale: () => undefined,
  primaryAction: { label: 'Review options' },
  secondaryAction: { label: 'Reassign zip' },
};

export interface AICardMetricProps {
  density?:          AICardMetricDensity;
  label?:            string;
  value?:            string | number;
  unit?:             string;
  valueSize?:        'sm' | 'md' | 'lg';
  accent?:           AIMetricAccent;
  trend?:            { delta: string; label?: string; tone?: AITrendIndicatorTone };

  // `basic` density — title + icon (top-right) + value only. Pass a ZAIDYN
  // icon name like 'zs-icon-wrench' (preferred) OR a React node such as a
  // Lucide component when the desired icon does not exist in the ZAIDYN
  // library. The ZAIDYN icon is wrapped in `.zs-master-style` automatically.
  icon?:             string | React.ReactNode;

  // Rich + Robust
  status?:           { label: string; tone: AIStatusPillTone };
  target?:           string;
  source?:           { label: string; icon?: string };
  freshness?:        string;
  secondaryMetric?:  { label: string; value: string };
  actionLink?:       { label: string; href?: string; onClick?: () => void };

  // Robust only
  insight?:          string;
  confidence?:       number;                       // 0–100
  onViewSources?:    () => void;
  onViewRationale?:  () => void;
  primaryAction?:    { label: string; onClick?: () => void };
  secondaryAction?:  { label: string; onClick?: () => void };

  // Shared
  loading?:          boolean;
  onClick?:          () => void;
  // Show the 2px bottom accent rail in the accent color. Off by default —
  // the top-left dot is enough identification for embedded contexts. Turn
  // on for hero cards or dashboard surfaces where the colored rail adds
  // useful at-a-glance status.
  accentBar?:        boolean;
}

function warnExtraneous(density: AICardMetricDensity, p: AICardMetricProps) {
  if (typeof window === 'undefined') return;
  // `basic` is the most restrictive density — only label/value/icon render.
  // Trend / accent / accentBar are tolerated but ignored at this density.
  const basicSilenced  = ['trend', 'target', 'accent', 'accentBar'] as const;
  const richOnly       = ['status', 'target', 'source', 'freshness', 'secondaryMetric', 'actionLink'] as const;
  const robustOnly     = ['insight', 'confidence', 'onViewSources', 'onViewRationale', 'primaryAction', 'secondaryAction'] as const;
  const offenders: string[] = [];
  if (density === 'basic') {
    [...basicSilenced, ...richOnly, ...robustOnly].forEach((k) => { if ((p as any)[k] != null) offenders.push(k); });
  } else if (density === 'simple') {
    [...richOnly, ...robustOnly].forEach((k) => { if ((p as any)[k] != null) offenders.push(k); });
  } else if (density === 'rich') {
    robustOnly.forEach((k) => { if ((p as any)[k] != null) offenders.push(k); });
  }
  if (offenders.length > 0) {
    console.warn(`[AICardMetric] density="${density}" ignores props: ${offenders.join(', ')}`);
  }
}

const SHIMMER = `
@keyframes ai-metric-shimmer {
  0%   { opacity: 1;   }
  50%  { opacity: 0.4; }
  100% { opacity: 1;   }
}
@media (prefers-reduced-motion: reduce) {
  .ai-metric-skeleton { animation: none !important; }
}
`;

function Skeleton({ width = 110, height = 22, mt = 0 }: { width?: number; height?: number; mt?: number }) {
  return (
    <span
      className="ai-metric-skeleton"
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width, height, marginTop: mt,
        borderRadius: 6,
        background: '#E5E7EB',
        animation: 'ai-metric-shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
}

// Subtle inline separator between trend delta and RiTargetLine / Threshold text.
function TrendSep() {
  return <span aria-hidden="true" style={{ color: 'var(--ai-zds-helper)', opacity: 0.5 }}>·</span>;
}

// Pulls the confidence number → conf-high / conf-med / conf-low tone.
function ConfidencePill({ pct }: { pct: number }) {
  const tone =
    pct >= 80 ? { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40' }
  : pct >= 60 ? { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E' }
  :             { bg: 'var(--ai-status-error-bg)', border: 'var(--ai-status-error-border)', text: 'var(--ai-status-error-text)' };
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '2px 8px',
        borderRadius: AI.radius.full,
        background: tone.bg,
        border: `1px solid ${tone.border}`,
        color: tone.text,
        fontFamily: F, fontSize: 12, fontWeight: 600, lineHeight: 1.4,
        whiteSpace: 'nowrap' as const,
      }}
    >
      {pct}% confidence
    </span>
  );
}

export function AICardMetric(props: AICardMetricProps = {}) {
  // Bare gallery mount (`<AICardMetric />`) gets the Simple demo. Any explicit
  // density/label/value means the caller owns the props — do not inherit SAMPLE extras.
  const isBare =
    props.density == null && props.label == null && props.value == null;
  const merged: AICardMetricProps = isBare
    ? { ...SAMPLE_CARD_METRIC_SIMPLE, ...props }
    : props;
  const {
    density = 'simple',
    label = 'Total Sales',
    value = '42.8',
    unit,
    valueSize,
    accent = 'teal',
    icon,
    trend,
    status,
    target,
    source,
    freshness,
    secondaryMetric,
    actionLink,
    insight,
    confidence,
    onViewSources,
    onViewRationale,
    primaryAction,
    secondaryAction,
    loading,
    onClick,
    accentBar,
  } = merged;

  warnExtraneous(density, merged);

  const accentColor = ACCENT[accent];
  const isClickable = !!onClick;
  const Root: any = isClickable ? 'button' : 'article';

  // Per-density padding mirrors the reference: tightest on Basic + Simple,
  // breathing room on Rich + Robust as more content stacks below the value.
  const padding =
    density === 'basic'  ? '16px 18px 18px'
    : density === 'simple' ? '16px 16px 18px'
    : density === 'rich' ? '16px 20px 18px'
    :                       '16px 20px 20px';

  // Default value size scales with density unless caller overrides.
  const resolvedValueSize: 'sm' | 'md' | 'lg' = valueSize ?? (density === 'simple' ? 'md' : 'md');

  const isBasic = density === 'basic';

  return (
    <>
      <style>{SHIMMER}</style>
      <Root
        type={isClickable ? 'button' : undefined}
        onClick={isClickable ? onClick : undefined}
        aria-label={isClickable ? `${label}: ${value}` : undefined}
        style={{
          position: 'relative' as const,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding,
          width: '100%',
          background: 'var(--ai-card-bg)',
          border: '1px solid var(--ai-card-border)',
          borderRadius: 16,
          fontFamily: F,
          textAlign: 'left' as const,
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          boxShadow: AI.shadow.card.default,
          overflow: 'hidden' as const,
        }}
        onMouseEnter={isClickable ? (e: any) => {
          e.currentTarget.style.boxShadow = AI.shadow.card.raised;
          e.currentTarget.style.borderColor = '#D1D5DB';
        } : undefined}
        onMouseLeave={isClickable ? (e: any) => {
          e.currentTarget.style.boxShadow = AI.shadow.card.default;
          e.currentTarget.style.borderColor = 'var(--ai-card-border)';
        } : undefined}
      >
        {/* Header */}
        {isBasic ? (
          // Basic density: sentence-case title on the left, icon top-right.
          // No accent dot, no status badge — title + icon + value only.
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <span
              style={{
                fontFamily: F,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ai-zds-text)',
                lineHeight: 1.3,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
            {icon != null && (
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--ai-zds-helper)',
                  width: 20, height: 20, lineHeight: 0,
                }}
              >
                {typeof icon === 'string' ? (
                  <span className="zs-master-style" style={{ display: 'inline-flex', color: 'inherit' }}>
                    <i
                      className={icon.startsWith('zs-icon-') ? `zs-icon ${icon}` : icon}
                      style={{ fontSize: 18, lineHeight: 1, color: 'currentColor' }}
                    />
                  </span>
                ) : (
                  icon
                )}
              </span>
            )}
          </div>
        ) : (
          // Default header — accent dot + uppercase label group on left,
          // optional status badge on right.
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <span
                aria-hidden="true"
                style={{ width: 8, height: 8, borderRadius: 2, background: accentColor, flexShrink: 0 }}
              />
              <span
                style={{
                  ...AI_TYPOGRAPHY['@zsai-micro-eyebrow'],
                  fontFamily: F,
                  // One step lighter than helper so the eyebrow reads as
                  // metadata above the value, not as competing label text.
                  color: '#9896A0',
                  // Explicit uppercase in addition to the foundation token —
                  // belt-and-braces so the card always renders as ALL CAPS even
                  // if a future spread accidentally overrides the token.
                  textTransform: 'uppercase' as const,
                  whiteSpace: 'nowrap' as const,
                  overflow: 'hidden' as const,
                  textOverflow: 'ellipsis',
                }}
              >
                {label}
              </span>
            </div>
            {density !== 'simple' && status && (
              <AIChip kind="status" label={status.label} tone={status.tone} size="sm" />
            )}
          </div>
        )}

        {/* Primary value */}
        {loading
          ? <Skeleton width={120} height={28} />
          : <AIMetricValue value={value} unit={unit} size={resolvedValueSize} />}

        {/* Trend + RiTargetLine inline */}
        {!loading && (trend || target) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {trend && (
              <AITrendIndicator delta={trend.delta} label={trend.label ?? 'vs prior'} tone={trend.tone ?? 'neutral'} size="md" />
            )}
            {trend && target && <TrendSep />}
            {target && (
              <span style={{ fontFamily: F, fontSize: 14, color: 'var(--ai-zds-text)' }}>
                {target}
              </span>
            )}
          </div>
        )}
        {loading && <Skeleton width={140} height={13} />}

        {/* Rich/Robust: secondary metric (Rich only — Robust uses insight block instead) */}
        {density === 'rich' && secondaryMetric && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 10, borderTop: '1px solid #F3F4F6',
            fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper)',
          }}>
            <span>{secondaryMetric.label}</span>
            <span style={{ color: 'var(--ai-zds-text)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {secondaryMetric.value}
            </span>
          </div>
        )}

        {/* Rich: source + freshness chips */}
        {density === 'rich' && (source || freshness) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {source && (
              <AIChip
                kind="brief"
                label={source.label}
                size="sm"
                noDot
                icon={source.icon ?? 'zs-icon-data-table'}
                accentColor="var(--ai-zds-helper)"
                accentBg="var(--ai-card-bg-raised)"
              />
            )}
            {freshness && (
              <AIChip
                kind="brief"
                label={freshness}
                size="sm"
                noDot
                icon="zs-icon-clock-pending"
                accentColor="var(--ai-zds-helper)"
                accentBg="var(--ai-card-bg-raised)"
              />
            )}
          </div>
        )}

        {/* Rich: action link */}
        {density === 'rich' && actionLink && (
          <div>
            {actionLink.href ? (
              <a
                href={actionLink.href}
                onClick={actionLink.onClick}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  fontFamily: F, fontSize: 14, fontWeight: 600,
                  color: AI.color.brand,
                  textDecoration: 'none',
                }}
              >
                {actionLink.label}
                <RightChevron />
              </a>
            ) : (
              <button
                onClick={actionLink.onClick}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  fontFamily: F, fontSize: 14, fontWeight: 600,
                  color: AI.color.brand,
                }}
              >
                {actionLink.label}
                <RightChevron />
              </button>
            )}
          </div>
        )}

        {/* Robust: AI insight callout */}
        {density === 'robust' && insight && (
          <AIInsightCallout body={insight} />
        )}

        {/* Robust: trust row — confidence + view sources + freshness pushed right */}
        {density === 'robust' && (confidence != null || onViewSources || freshness) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {confidence != null && <ConfidencePill pct={confidence} />}
            {onViewSources && (
              <button
                onClick={onViewSources}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  fontFamily: F, fontSize: 14, fontWeight: 500,
                  color: 'var(--ai-zds-helper)',
                }}
              >
                <ExternalGlyph size={9} />
                View sources
              </button>
            )}
            {freshness && (
              <div style={{ marginLeft: 'auto' }}>
                <AIChip
                  kind="brief"
                  label={freshness}
                  size="sm"
                  noDot
                  icon="zs-icon-clock-pending"
                  accentColor="var(--ai-zds-helper)"
                  accentBg="var(--ai-card-bg-raised)"
                />
              </div>
            )}
          </div>
        )}

        {/* Robust: source chip row (when no trust row OR source present alongside) */}
        {density === 'robust' && source && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <AIChip
              kind="brief"
              label={source.label}
              size="sm"
              noDot
              icon={source.icon ?? 'zs-icon-data-table'}
              accentColor="var(--ai-zds-helper)"
              accentBg="var(--ai-card-bg-raised)"
            />
          </div>
        )}

        {/* Robust: action row — primary + secondary + rationale link on the right */}
        {density === 'robust' && (primaryAction || secondaryAction || onViewRationale) && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
            paddingTop: 10, borderTop: '1px solid #F3F4F6',
          }}>
            {primaryAction && (
              <AIButton variant="primary" size="sm" label={primaryAction.label} onClick={primaryAction.onClick} />
            )}
            {secondaryAction && (
              <AIButton variant="secondary" size="sm" label={secondaryAction.label} onClick={secondaryAction.onClick} />
            )}
            {onViewRationale && (
              <div style={{ marginLeft: 'auto' }}>
                <AIWhyThisLink variant="view-rationale" onClick={onViewRationale} />
              </div>
            )}
          </div>
        )}

        {/* Bottom accent bar — opt-in via `accentBar`. The top-left dot is
            the default accent affordance; the rail is reserved for hero or
            dashboard cards where the extra color reads as useful status. */}
        {accentBar && !isBasic && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute' as const,
              left: 0, right: 0, bottom: 0,
              height: 2,
              background: accentColor,
            }}
          />
        )}
      </Root>
    </>
  );
}

function RightChevron() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4.5 3 L7.5 6 L4.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalGlyph({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 3h3.5"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M3 3v3.5"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M3 9h6V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 6.5l5-5"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M7.5 1.5h3v3"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default AICardMetric;
