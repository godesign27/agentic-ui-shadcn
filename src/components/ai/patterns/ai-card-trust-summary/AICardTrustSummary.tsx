import React from 'react';
import { AI, DS, COMPANION_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { RiskLevel } from '../../atomic/ai-confidence-risk-badge/AIConfidenceRiskBadge';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';

export type TrustHeaderTone = 'gray' | 'tan';

export interface AICardTrustSummaryProps {
  confidence:     number;
  risk:           RiskLevel;
  dataQuality:    number | string;  // accepts 0–100 score or a label like "Complete" / "Partial"
  lastUpdated:    string;
  sources?:       string[];         // chip labels — falls back to sourceCount string if absent
  sourceCount?:   number;
  requiresReview: boolean;
  /**
   * Header background tone.
   * - 'gray' = default raised card surface (var(--ai-card-bg-raised))
   * - 'tan'  = COMPANION_TAN['00'] (#F6F2EB) — companion / warm panel context
   */
  headerTone?:    TrustHeaderTone;
  onRequestReview?: () => void;
  onViewSources?:   () => void;
}

// ── Color resolution ────────────────────────────────────────────────────────
function confTone(pct: number): { color: string; track: string; bar: string; label: 'High' | 'Medium' | 'Low' } {
  if (pct >= 70) return { color: '#0A6E5E', track: '#E5F4EE', bar: '#0A6E5E', label: 'High' };
  if (pct >= 40) return { color: '#8A640C', track: '#FBF1DC', bar: '#8A640C', label: 'Medium' };
  return            { color: '#B21111', track: '#FBE5E5', bar: '#B21111', label: 'Low' };
}

function riskTone(risk: RiskLevel): { color: string; bg: string; label: string } {
  switch (risk) {
    case 'none':
    case 'low':    return { color: '#0A6E5E', bg: '#E5F4EE', label: 'Low Risk' };
    case 'medium': return { color: '#8A640C', bg: '#FBF1DC', label: 'Medium Risk' };
    case 'high':   return { color: '#B21111', bg: '#FBE5E5', label: 'High Risk' };
  }
}

function dataQualityLabel(value: number | string): { label: string; color: string } {
  if (typeof value === 'string') {
    const c = value.toLowerCase().startsWith('comp')    ? '#0A6E5E'
            : value.toLowerCase().startsWith('part')    ? '#8A640C'
            : value.toLowerCase().startsWith('insuff')  ? '#B21111'
            : 'var(--ai-ds-text)';
    return { label: value, color: c };
  }
  if (value >= 80) return { label: 'Complete',     color: '#0A6E5E' };
  if (value >= 50) return { label: 'Partial',      color: '#8A640C' };
  return            { label: 'Insufficient', color: '#B21111' };
}

// ── Row icons ───────────────────────────────────────────────────────────────
function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function DatabaseIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke={color} strokeWidth="1.8" fill="none" />
    </svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Confidence bar ──────────────────────────────────────────────────────────
function ConfidenceBar({ pct }: { pct: number }) {
  const tone = confTone(pct);
  return (
    <div style={{
      width: '100%', height: 8, borderRadius: 999,
      background: tone.track, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', width: `${Math.max(0, Math.min(100, pct))}%`,
        background: tone.bar, borderRadius: 999,
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}

// ── Source chip ─────────────────────────────────────────────────────────────
function SourceChip({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 999,
      background: 'transparent',
      border: '1px solid var(--ai-card-border)',
      ...AI_TYPOGRAPHY['@ai-meta-label'],
      color: 'var(--ai-ds-text)',
      whiteSpace: 'nowrap' as const,
    }}>{label}</span>
  );
}

// ── Main card ───────────────────────────────────────────────────────────────
export function AICardTrustSummary({
  confidence,
  risk,
  dataQuality,
  lastUpdated,
  sources,
  sourceCount,
  requiresReview,
  headerTone = 'gray',
  onRequestReview,
  onViewSources,
}: AICardTrustSummaryProps) {
  const conf  = confTone(confidence);
  const rk    = riskTone(risk);
  const dq    = dataQualityLabel(dataQuality);
  const srcs  = sources ?? (sourceCount !== undefined ? [`${sourceCount} sources`] : []);
  const headerBg = headerTone === 'tan' ? (COMPANION_TAN['00'] as string) : 'var(--ai-card-bg-raised)';

  return (
    <div style={{
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      width: '100%',
    }}>
      {/* Header — title + risk badge */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--ai-card-border)',
        background: headerBg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      }}>
        <span style={{ ...AI_TYPOGRAPHY['@ai-card-title'], color: 'var(--ai-ds-text)' }}>Trust Summary</span>
        <span style={{
          ...AI_TYPOGRAPHY['@ai-meta-label'], fontWeight: 600,
          // Inverted on the tan header — dark fill + white label reads stronger against the warm bg.
          color:      headerTone === 'tan' ? '#FFFFFF' : rk.color,
          background: headerTone === 'tan' ? rk.color : rk.bg,
          padding: '3px 10px', borderRadius: 999,
          whiteSpace: 'nowrap' as const,
        }}>
          {rk.label}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Confidence bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: 'var(--ai-ds-text)' }}>Confidence</span>
            <span style={{ ...AI_TYPOGRAPHY['@ai-h6'], color: conf.color }}>{Math.round(confidence)}%</span>
          </div>
          <ConfidenceBar pct={confidence} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--ai-card-border)' }} />

        {/* Risk Level row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-helper)' }}>
            <ShieldIcon color="var(--ai-ds-helper)" />
            Risk Level
          </span>
          <span style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], fontWeight: 600, color: rk.color }}>{rk.label.replace(' Risk', '')}</span>
        </div>

        {/* Data Quality row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-helper)' }}>
            <DatabaseIcon color="var(--ai-ds-helper)" />
            Data Quality
          </span>
          <span style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], fontWeight: 600, color: dq.color }}>{dq.label}</span>
        </div>

        {/* Bottom trust-footnote row — sources/view-sources on the left,
            "Updated …" pushed right via marginLeft:auto. Mirrors the
            ai-analysis-insight bottom row so trust metadata reads as a
            consistent footer narrative across the system. */}
        {(srcs.length > 0 || onViewSources || lastUpdated) && (
          <div style={{
            paddingTop: 10,
            borderTop: '1px dashed var(--ai-card-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexWrap: 'wrap',
          }}>
            {srcs.length > 0 && (
              <>
                <span style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-helper)' }}>Sources</span>
                {srcs.map((s, i) => <SourceChip key={`${s}-${i}`} label={s} />)}
              </>
            )}
            {onViewSources && (
              <AIWhyThisLink variant="view-sources" onClick={onViewSources} />
            )}
            {lastUpdated && (
              <span style={{
                ...AI_TYPOGRAPHY['@ai-caption-1'],
                color: 'var(--ai-ds-helper)',
                marginLeft: 'auto',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <CalendarIcon color="var(--ai-ds-helper)" />
                {lastUpdated}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions — only shown when human review is required */}
      {requiresReview && (
        <div style={{
          padding: '10px 18px',
          borderTop: '1px solid var(--ai-card-border)',
          background: headerBg,
        }}>
          <button
            onClick={onRequestReview}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 14px', borderRadius: AI.radius.sm,
              border: `1px solid ${AI.color.signal.default}`, cursor: 'pointer',
              fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              background: AI.color.signal.subtle, color: AI.color.signal.strong,
            }}
          >
            Request Review
          </button>
        </div>
      )}
    </div>
  );
}

export default AICardTrustSummary;
