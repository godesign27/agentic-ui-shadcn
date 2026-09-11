import React, { useId } from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AIChip } from '../../atomic/ai-chip/AIChip';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ──────────────────────────────────────────────────────────────────────────
// AISuggestionCompare
// ──────────────────────────────────────────────────────────────────────────
// Canonical comparison pattern for AI-generated suggestions / scenarios /
// next-best actions. RiGroupLine compare benefit, tradeoff, confidence and risk
// before choosing, asking for another option, or sending for approval.
//
// This is the broader pattern that supersedes the v1 ai-recommendation-
// compare-card. The legacy card stays in the registry untouched; new
// surfaces should reach for AISuggestionCompare.
//
// Densities (one component, three content levels):
//   simple → chat / narrow drawer       — title, benefit, risk, Why this?
//   rich   → split view / product page  — adds tradeoff, confidence, source
//   robust → review / approval / AI Led — adds metrics row, view-rationale /
//                                          view-sources / view-assumptions,
//                                          approval state, secondary action
// ──────────────────────────────────────────────────────────────────────────

export type AISuggestionDensity   = 'simple' | 'rich' | 'robust';
export type AISuggestionLayout    = 'sideBySide' | 'stacked' | 'grid' | 'compact';
export type AISuggestionRisk      = 'low' | 'medium' | 'high' | 'critical' | 'unknown';
export type AISuggestionConfidence = 'low' | 'medium' | 'high' | 'unknown';
export type AISuggestionStatus    = 'default' | 'loading' | 'updating' | 'selected'
                                  | 'needsApproval' | 'sentForApproval' | 'noViableOption' | 'error';

export interface AISuggestionMetric {
  label: string;
  value: string;
}

export interface AISuggestionItem {
  id:               string;
  title:            string;
  benefit:          string;
  tradeoff?:        string;
  riskLevel?:       AISuggestionRisk;
  riskNote?:        string;                          // free-text colour ("Low rep capacity risk")
  confidenceLevel?: AISuggestionConfidence;
  metrics?:         AISuggestionMetric[];            // Robust only
  source?:          string;
  freshness?:       string;
  recommended?:     boolean;
  selected?:        boolean;
  disabled?:        boolean;
  onWhyThis?:       () => void;
}

export interface AISuggestionCompareProps {
  density?:           AISuggestionDensity;
  title?:             string;
  summary?:           string;
  generatedBy?:       string;                        // "ZAIDYN AI"
  timestamp?:         string;                        // "Generated 2h ago"
  suggestions?:       AISuggestionItem[];
  layout?:            AISuggestionLayout;            // default: density-driven
  status?:            AISuggestionStatus;
  onSelectSuggestion?: (id: string) => void;
  onAskForAnother?:    () => void;
  onSendForApproval?:  () => void;
  onViewRationale?:    () => void;
  onViewSources?:      () => void;
  onViewAssumptions?:  () => void;
  approvalRequired?:   boolean;
  reviewer?:           string;
  loadingLabel?:       string;
  className?:          string;
}

// ──────────────────────────────────────────────────────────────────────────
// Density gating — dev-only warning
// ──────────────────────────────────────────────────────────────────────────
function warnExtraneous(density: AISuggestionDensity, p: AISuggestionCompareProps) {
  if (typeof process === 'undefined' || process.env?.NODE_ENV === 'production') return;
  const simpleOnlyAllow = ['density', 'title', 'summary', 'suggestions', 'status', 'layout',
                            'onSelectSuggestion', 'onAskForAnother', 'loadingLabel', 'className'];
  const richAllow = [...simpleOnlyAllow, 'generatedBy', 'timestamp', 'onViewRationale', 'onSendForApproval'];
  const robustOnly = ['onViewSources', 'onViewAssumptions', 'approvalRequired', 'reviewer'];

  if (density === 'simple') {
    const offenders = robustOnly.concat('generatedBy', 'timestamp').filter((k) => (p as any)[k] != null);
    if (offenders.length) console.warn(`[AISuggestionCompare] density="simple" ignores props: ${offenders.join(', ')}`);
  } else if (density === 'rich') {
    const offenders = robustOnly.filter((k) => (p as any)[k] != null);
    if (offenders.length) console.warn(`[AISuggestionCompare] density="rich" ignores props: ${offenders.join(', ')}`);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Inline pills — local to this group so the file stays self-contained
// ──────────────────────────────────────────────────────────────────────────

const RISK_STYLE: Record<AISuggestionRisk, { bg: string; border: string; text: string; label: string }> = {
  low:      { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40', label: 'Low risk' },
  medium:   { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E', label: 'Medium risk' },
  high:     { bg: 'var(--ai-status-error-bg, #FBEFEF)',    border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'High risk' },
  critical: { bg: 'var(--ai-status-error-bg, #FBEFEF)',    border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'Critical risk' },
  unknown:  { bg: 'var(--ai-card-bg-raised, #F5F4F7)',     border: 'var(--ai-card-border, #E5E7EB)',         text: 'var(--ai-zds-helper, #6B6876)',          label: 'Risk unknown' },
};

const CONFIDENCE_STYLE: Record<AISuggestionConfidence, { bg: string; border: string; text: string; label: string }> = {
  high:    { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40', label: 'High confidence' },
  medium:  { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E', label: 'Medium confidence' },
  low:     { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'Low confidence' },
  unknown: { bg: 'var(--ai-card-bg-raised, #F5F4F7)',  border: 'var(--ai-card-border, #E5E7EB)',         text: 'var(--ai-zds-helper, #6B6876)',          label: 'Confidence unknown' },
};

function Pill({ tone, label }: { tone: { bg: string; border: string; text: string }; label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 999,
      background: tone.bg, border: `1px solid ${tone.border}`,
      color: tone.text, fontFamily: F, fontSize: 12, fontWeight: 600,
      letterSpacing: 0,
    }}>
      {label}
    </span>
  );
}

function RecommendedTag() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 4,
      background: 'var(--ai-brand-surface, #EEF0FB)',
      border: `1px solid ${AI.color.brand}`,
      color: AI.color.brand,
      fontFamily: F, fontSize: 12, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase' as const,
    }}>
      Recommended
    </span>
  );
}

function ApprovalTag({ label = 'Needs approval' }: { label?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 4,
      background: '#FBF1DA',
      border: '1px solid #EAD5A6',
      color: '#854D0E',
      fontFamily: F, fontSize: 12, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase' as const,
    }}>
      {label}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Per-suggestion card
// ──────────────────────────────────────────────────────────────────────────

function SuggestionCard({
  s, density, index, total, selected, onSelect,
}: {
  s: AISuggestionItem;
  density: AISuggestionDensity;
  index: number;
  total: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const interactive = !s.disabled;
  const isRecommended = !!s.recommended;
  const ariaName = `Choose option ${index + 1}: ${s.title}`;

  const risk = s.riskLevel ?? 'unknown';
  const confidence = s.confidenceLevel ?? 'unknown';
  const showRisk       = density !== 'simple' || risk !== 'unknown';
  const showConfidence = density !== 'simple' || confidence !== 'unknown';
  const showMetrics    = density === 'robust' && s.metrics && s.metrics.length > 0;
  const showTradeoff   = density !== 'simple' && !!s.tradeoff;
  const showSource     = density !== 'simple' && (!!s.source || !!s.freshness);

  return (
    <article
      aria-label={`Option ${index + 1} of ${total}: ${s.title}`}
      aria-disabled={s.disabled || undefined}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: 10,
        padding: density === 'simple' ? '14px 14px 12px' : '16px 16px 14px',
        background: selected ? 'var(--ai-brand-surface, #EEF0FB)' : 'var(--ai-card-bg, #FFFFFF)',
        border: `1px solid ${selected ? AI.color.brand : 'var(--ai-card-border, #E5E7EB)'}`,
        borderRadius: 12,
        opacity: s.disabled ? 0.55 : 1,
        outline: isRecommended && !selected ? `1px solid ${AI.color.brand}` : 'none',
        outlineOffset: isRecommended && !selected ? -1 : 0,
        fontFamily: F,
        minWidth: 0,
      }}
    >
      {/* Top markers */}
      {(isRecommended || s.disabled) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {isRecommended && <RecommendedTag />}
          {s.disabled && (
            <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
              Unavailable
            </span>
          )}
        </div>
      )}

      {/* Option title */}
      <h4 style={{
        margin: 0, fontFamily: F, fontSize: 14, fontWeight: 700,
        color: 'var(--ai-zds-text, #1A1628)', lineHeight: 1.35,
      }}>
        {s.title}
      </h4>

      {/* Benefit — eyebrow + value */}
      <div>
        <div style={{
          fontFamily: F, fontSize: 12, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          color: '#9896A0', marginBottom: 2,
        }}>
          Benefit
        </div>
        <div style={{
          fontFamily: F, fontSize: 13, fontWeight: 600,
          color: 'var(--ai-zds-text, #2F2C3C)', lineHeight: 1.4,
        }}>
          {s.benefit}
        </div>
      </div>

      {/* Tradeoff — Rich+ */}
      {showTradeoff && (
        <div>
          <div style={{
            fontFamily: F, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            color: '#9896A0', marginBottom: 2,
          }}>
            Tradeoff
          </div>
          <div style={{
            fontFamily: F, fontSize: 13, color: 'var(--ai-zds-text, #2F2C3C)', lineHeight: 1.4,
          }}>
            {s.tradeoff}
          </div>
        </div>
      )}

      {/* Risk note — short colour text on top of the risk pill */}
      {s.riskNote && density !== 'simple' && (
        <div style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
          {s.riskNote}
        </div>
      )}

      {/* Metrics row — Robust only */}
      {showMetrics && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8,
          padding: '8px 10px',
          background: 'var(--ai-card-bg-raised, #F5F4F7)',
          border: `1px solid var(--ai-card-border, #E5E7EB)`,
          borderRadius: 8,
        }}>
          {s.metrics!.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <span style={{
                fontFamily: F, fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                color: '#9896A0',
              }}>{m.label}</span>
              <span style={{
                fontFamily: F, fontSize: 14, fontWeight: 700,
                color: 'var(--ai-zds-text, #1A1628)',
              }}>{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Confidence + risk pills */}
      {(showRisk || showConfidence) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {showConfidence && <Pill tone={CONFIDENCE_STYLE[confidence]} label={CONFIDENCE_STYLE[confidence].label} />}
          {showRisk       && <Pill tone={RISK_STYLE[risk]}             label={RISK_STYLE[risk].label} />}
        </div>
      )}

      {/* Source + freshness — Rich+ */}
      {showSource && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {s.source && (
            <AIChip kind="brief"
              label={s.source} size="sm" noDot
              icon="zs-icon-data-table"
              accentColor="var(--ai-zds-helper, #6B6876)"
              accentBg="var(--ai-card-bg-raised, #F5F4F7)"
            />
          )}
          {s.freshness && (
            <AIChip kind="brief"
              label={s.freshness} size="sm" noDot
              icon="zs-icon-clock-pending"
              accentColor="var(--ai-zds-helper, #6B6876)"
              accentBg="var(--ai-card-bg-raised, #F5F4F7)"
            />
          )}
        </div>
      )}

      {/* Card footer: Why this? + Choose */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginTop: 'auto', paddingTop: 6, flexWrap: 'wrap',
      }}>
        {s.onWhyThis && (
          <button
            type="button"
            onClick={s.onWhyThis}
            disabled={s.disabled}
            aria-label={`Why this option: ${s.title}`}
            style={{
              background: 'none', border: 'none', padding: 0,
              cursor: s.disabled ? 'not-allowed' : 'pointer',
              fontFamily: F, fontSize: 12, fontWeight: 600,
              color: AI.color.brand,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}
          >
            Why this?
          </button>
        )}
        <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 6 }}>
          <AIButton
            variant={selected ? 'primary' : 'secondary'}
            size="sm"
            label={selected ? 'Selected ✓' : `Choose option ${index + 1}`}
            onClick={() => interactive && onSelect(s.id)}
            disabled={s.disabled}
            aria-label={ariaName}
          />
        </div>
      </div>
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Skeleton — calm loading state
// ──────────────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      padding: '16px 16px 14px',
      background: 'var(--ai-card-bg, #FFFFFF)',
      border: '1px solid var(--ai-card-border, #E5E7EB)',
      borderRadius: 12,
    }}>
      {[60, 90, 70, 40].map((w, i) => (
        <div key={i} style={{
          height: 10, width: `${w}%`, borderRadius: 4,
          background: 'linear-gradient(90deg, #EFEEF2 0%, #F5F4F7 50%, #EFEEF2 100%)',
          backgroundSize: '200% 100%',
          animation: 'ai-shimmer 1.4s ease infinite',
        }} />
      ))}
    </div>
  );
}

const SHIMMER = `@keyframes ai-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { [style*="ai-shimmer"] { animation: none !important; } }`;

// ──────────────────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────────────────


/** Demo props for bare mounts / galleries. */
export const SAMPLE_SUGGESTIONS: AISuggestionItem[] = [
  {
    id: 'opt-a',
    title: 'Reallocate 2 FTEs to PA-07',
    benefit: 'Recover ~9% reach in under-covered metro clusters.',
    tradeoff: 'Temporarily reduces rural call frequency by 4%.',
    riskLevel: 'low',
    confidenceLevel: 'high',
    source: 'Coverage model',
    freshness: 'Updated 1h ago',
    recommended: true,
  },
  {
    id: 'opt-b',
    title: 'Hold footprint; boost virtual calls',
    benefit: 'No headcount moves; faster to execute.',
    tradeoff: 'Lower expected reach lift (~3%).',
    riskLevel: 'medium',
    confidenceLevel: 'medium',
    source: 'Engagement forecast',
    freshness: 'Updated 1h ago',
  },
];

export const SAMPLE_SUGGESTION_COMPARE = {
  density: 'rich' as AISuggestionDensity,
  title: 'Compare next-best coverage options',
  summary: 'Two viable paths to recover Mid-Atlantic reach before Q3 freeze.',
  generatedBy: 'ZAIDYN AI',
  timestamp: 'Generated 1h ago',
  suggestions: SAMPLE_SUGGESTIONS,
};

export function AISuggestionCompare(props: AISuggestionCompareProps) {
  const {
    density = SAMPLE_SUGGESTION_COMPARE.density,
    title = SAMPLE_SUGGESTION_COMPARE.title,
    summary = SAMPLE_SUGGESTION_COMPARE.summary,
    generatedBy = SAMPLE_SUGGESTION_COMPARE.generatedBy,
    timestamp = SAMPLE_SUGGESTION_COMPARE.timestamp,
    suggestions = SAMPLE_SUGGESTIONS,
    layout,
    status = 'default',
    onSelectSuggestion,
    onAskForAnother,
    onSendForApproval,
    onViewRationale,
    onViewSources,
    onViewAssumptions,
    approvalRequired,
    reviewer,
    loadingLabel = 'Generating options…',
    className,
  } = props;

  warnExtraneous(density, props);

  const sectioned = density !== 'simple';
  const tintedBg  = 'var(--ai-card-bg-raised, #F5F4F7)';
  const bodyBg    = 'var(--ai-card-bg, #FFFFFF)';
  const divider   = 'var(--ai-card-border, #E5E7EB)';
  const titleId   = useId();

  const selectedId = suggestions.find((s) => s.selected)?.id;

  // Layout resolution
  const resolvedLayout: AISuggestionLayout =
      layout
    ?? (density === 'simple'
          ? (suggestions.length <= 2 ? 'sideBySide' : 'stacked')
          : (suggestions.length <= 3 ? 'sideBySide' : 'grid'));

  const cols =
      resolvedLayout === 'stacked'   ? 1
    : resolvedLayout === 'compact'   ? 1
    : resolvedLayout === 'grid'      ? Math.min(suggestions.length, 4)
    : Math.min(suggestions.length, 3);  // sideBySide

  const isLoading  = status === 'loading';
  const isUpdating = status === 'updating';
  const isError    = status === 'error';
  const isEmpty    = status === 'noViableOption';

  const showFooterApproval = density !== 'simple' && (approvalRequired || status === 'sentForApproval' || status === 'needsApproval');
  const showFooterLinks    = density !== 'simple' && (onViewRationale || onViewSources || onViewAssumptions);
  const showFooterActions  = !!(onSelectSuggestion || onAskForAnother || onSendForApproval);
  const showFooter         = !isLoading && (showFooterApproval || showFooterLinks || showFooterActions || reviewer);

  return (
    <>
      <style>{SHIMMER}</style>
      <section
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? 'AI suggestion comparison' : undefined}
        aria-busy={isLoading || isUpdating || undefined}
        className={className}
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          gap: sectioned ? 0 : 14,
          padding: sectioned ? 0 : '14px 16px 16px',
          background: bodyBg,
          border: `1px solid ${divider}`,
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          fontFamily: F,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        {(title || summary || generatedBy || timestamp || status === 'needsApproval' || status === 'sentForApproval') && (
          <header style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            ...(sectioned
              ? { padding: '14px 20px', background: tintedBg, borderBottom: `1px solid ${divider}` }
              : {}),
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexWrap: 'wrap' }}>
                {generatedBy && (
                  <span style={{
                    fontFamily: F, fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                    color: AI.color.brand,
                  }}>
                    {generatedBy}
                  </span>
                )}
                {generatedBy && timestamp && (
                  <span style={{ color: 'var(--ai-zds-helper, #9CA3AF)', opacity: 0.6 }}>·</span>
                )}
                {timestamp && (
                  <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                    {timestamp}
                  </span>
                )}
              </div>
              {status === 'needsApproval'    && <ApprovalTag label="Needs approval" />}
              {status === 'sentForApproval'  && <ApprovalTag label="Sent for approval" />}
            </div>
            {title && (
              <h3 id={titleId} style={{
                margin: 0, fontFamily: F, fontSize: 15, fontWeight: 700,
                color: 'var(--ai-zds-text, #1A1628)', lineHeight: 1.3,
              }}>
                {title}
              </h3>
            )}
            {summary && (
              <p style={{
                margin: 0, fontFamily: F, fontSize: 13, lineHeight: 1.55,
                color: 'var(--ai-zds-text, #2F2C3C)',
              }}>
                {summary}
              </p>
            )}
          </header>
        )}

        {/* Body */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          ...(sectioned
            ? { padding: '16px 20px 18px', background: bodyBg }
            : {}),
        }}>
          {isError && (
            <div role="alert" style={{
              fontFamily: F, fontSize: 13,
              color: 'var(--ai-status-error-text, #C0392B)',
              background: 'var(--ai-status-error-bg, #FBEFEF)',
              border: '1px solid var(--ai-status-error-border, #F1C7C7)',
              borderRadius: 8, padding: '10px 12px',
            }}>
              Something went wrong generating options. Try again or ask for another option.
            </div>
          )}

          {isEmpty && !isError && (
            <div role="status" style={{
              fontFamily: F, fontSize: 13,
              color: 'var(--ai-zds-helper, #6B6876)',
              background: tintedBg,
              border: `1px solid ${divider}`,
              borderRadius: 8, padding: '12px 14px',
            }}>
              No viable option meets the current constraints. Adjust assumptions or ask for another option.
            </div>
          )}

          {isLoading && (
            <>
              <div role="status" aria-live="polite" style={{
                fontFamily: F, fontSize: 12,
                color: 'var(--ai-zds-helper, #6B6876)',
              }}>
                {loadingLabel}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.max(cols, 2)}, minmax(0, 1fr))`,
                gap: 12,
              }}>
                {Array.from({ length: Math.max(cols, 2) }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </>
          )}

          {!isLoading && !isError && !isEmpty && (
            <>
              {isUpdating && (
                <div role="status" aria-live="polite" style={{
                  fontFamily: F, fontSize: 12,
                  color: 'var(--ai-zds-helper, #6B6876)',
                }}>
                  Updating options…
                </div>
              )}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: 12,
                alignItems: 'stretch',
              }}>
                {suggestions.map((s, i) => (
                  <SuggestionCard
                    key={s.id}
                    s={s}
                    density={density}
                    index={i}
                    total={suggestions.length}
                    selected={selectedId ? s.id === selectedId : false}
                    onSelect={(id) => onSelectSuggestion?.(id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {showFooter && (
          <footer style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            ...(sectioned
              ? { padding: '12px 20px 14px', background: tintedBg, borderTop: `1px solid ${divider}` }
              : { paddingTop: 12, borderTop: `1px solid ${divider}` }),
          }}>
            {(showFooterLinks || showFooterApproval || reviewer) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {reviewer && (
                  <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                    Reviewer: <span style={{ color: 'var(--ai-zds-text, #2F2C3C)', fontWeight: 600 }}>{reviewer}</span>
                  </span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginLeft: 'auto' }}>
                  {onViewRationale   && <AIWhyThisLink variant="view-rationale"   onClick={onViewRationale} />}
                  {onViewSources     && <AIWhyThisLink variant="view-sources"     onClick={onViewSources} />}
                  {onViewAssumptions && <AIWhyThisLink variant="view-assumptions" onClick={onViewAssumptions} />}
                </div>
              </div>
            )}

            {showFooterActions && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                ...(((showFooterLinks || showFooterApproval || reviewer))
                  ? { paddingTop: 8, borderTop: `1px solid ${divider}` }
                  : {}),
              }}>
                {onAskForAnother && (
                  <AIButton variant="secondary" size="sm" label="Ask for another option" onClick={onAskForAnother} />
                )}
                <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 8 }}>
                  {onSendForApproval && (
                    <AIButton variant="primary" size="sm" label="Send for approval" onClick={onSendForApproval} />
                  )}
                </div>
              </div>
            )}
          </footer>
        )}
      </section>
    </>
  );
}

export default AISuggestionCompare;
