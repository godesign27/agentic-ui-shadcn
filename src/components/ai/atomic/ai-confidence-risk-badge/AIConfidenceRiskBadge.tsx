import React from 'react';
import { AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type RiskLevel = 'none' | 'low' | 'medium' | 'high';

export interface AIConfidenceRiskBadgeProps {
  confidence: ConfidenceLevel;
  risk?: RiskLevel;
  staleData?: boolean;
  missingSource?: boolean;
  compact?: boolean;
}

const CONFIDENCE_CONFIG: Record<ConfidenceLevel, { fill: string; label: string; pct: number }> = {
  high:   { fill: '#27AE60', label: 'High Confidence',   pct: 90 },
  medium: { fill: '#E67E22', label: 'Medium Confidence', pct: 55 },
  low:    { fill: '#E74C3C', label: 'Low Confidence',    pct: 20 },
};

const RISK_CONFIG: Record<RiskLevel, { bg: string; border: string; text: string; label: string } | null> = {
  none:   null,
  low:    { bg: AI.color.signal.surface,  border: AI.color.signal.subtle,   text: AI.color.signal.strong, label: 'Low Risk'    },
  medium: { bg: AI.color.signal.subtle,   border: AI.color.signal.default,  text: AI.color.signal.strong, label: 'Medium Risk' },
  high:   { bg: 'var(--ai-status-error-bg)', border: 'var(--ai-status-error-border)', text: 'var(--ai-status-error-text)', label: 'High Risk'   },
};

export function AIConfidenceRiskBadge({
  confidence,
  risk = 'none',
  staleData = false,
  missingSource = false,
  compact = false,
}: AIConfidenceRiskBadgeProps) {
  const conf = CONFIDENCE_CONFIG[confidence];
  const riskCfg = RISK_CONFIG[risk];
  const barWidth = compact ? 40 : 56;

  const ariaLabel = [
    conf.label,
    riskCfg ? riskCfg.label : '',
    staleData ? 'Stale data' : '',
    missingSource ? 'Missing source' : '',
  ].filter(Boolean).join(', ');

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 5 : 7,
        fontFamily: '"Open Sans", sans-serif',
        // Compact = 12px floor + Medium weight per typography.md. Default =
        // @zsai-caption-1 (12/400/1.5).
        ...(compact
          ? { fontSize: 12, fontWeight: 500, lineHeight: 1.5 }
          : AI_TYPOGRAPHY['@zsai-caption-1']),
      }}
    >
      {/* Confidence bar */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: compact ? '2px 7px 2px 5px' : '3px 9px 3px 6px',
          borderRadius: AI.radius.full,
          background: 'var(--ai-confidence-track)',
          border: '1px solid var(--ai-divider)',
        }}
      >
        <span
          style={{
            position: 'relative' as const,
            width: barWidth,
            height: 4,
            borderRadius: 2,
            background: 'var(--ai-confidence-track)',
            overflow: 'hidden' as const,
          }}
        >
          <span
            style={{
              position: 'absolute' as const,
              left: 0,
              top: 0,
              bottom: 0,
              width: `${conf.pct}%`,
              background: conf.fill,
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </span>
        <span style={{ color: 'var(--ai-zds-text)' }}>{conf.label}</span>
      </span>

      {/* Risk badge */}
      {riskCfg && (
        <span
          style={{
            padding: compact ? '2px 7px' : '3px 9px',
            borderRadius: AI.radius.full,
            background: riskCfg.bg,
            border: `1px solid ${riskCfg.border}`,
            color: riskCfg.text,
          }}
        >
          {riskCfg.label}
        </span>
      )}

      {/* Stale data indicator */}
      {staleData && (
        <span
          title="Data may be stale"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: compact ? '2px 6px' : '3px 8px',
            borderRadius: AI.radius.full,
            background: AI.color.signal.surface,
            border: `1px solid ${AI.color.signal.subtle}`,
            color: AI.color.signal.strong,
            gap: 3,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.1"/>
            <path d="M5 2.8V5l1.2 1.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          Stale
        </span>
      )}

      {/* Missing source indicator */}
      {missingSource && (
        <span
          title="Source unavailable"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: compact ? '2px 6px' : '3px 8px',
            borderRadius: AI.radius.full,
            background: 'var(--ai-status-error-bg)',
            border: '1px solid var(--ai-status-error-border)',
            color: 'var(--ai-status-error-text)',
            gap: 3,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.1"/>
            <path d="M5 2.8V5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            <circle cx="5" cy="7.2" r="0.6" fill="currentColor"/>
          </svg>
          No source
        </span>
      )}
    </span>
  );
}

export default AIConfidenceRiskBadge;
