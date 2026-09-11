import React, { useState } from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIConfidenceRiskBadge, ConfidenceLevel, RiskLevel } from '../../atomic/ai-confidence-risk-badge/AIConfidenceRiskBadge';

export interface RecommendationOption {
  label: string;
  confidence: ConfidenceLevel;
  risk: RiskLevel;
  tradeoffs: string[];
  metrics?: Record<string, string>;
}

export interface AICardRecommendationCompareProps {
  title?: string;
  options: RecommendationOption[];
  onChoose?: (optionIndex: number) => void;
  onMerge?: () => void;
  onSendToAgent?: () => void;
}

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 14px', borderRadius: AI.radius.sm,
  border: '1px solid transparent', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-section-subtitle'],
};

const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = { high: 3, medium: 2, low: 1 };

export function AICardRecommendationCompare({
  title = 'Compare Options',
  options,
  onChoose,
  onMerge,
  onSendToAgent,
}: AICardRecommendationCompareProps) {
  const [expandedTradeoffs, setExpandedTradeoffs] = useState<Set<number>>(new Set());
  const [chosen, setChosen] = useState<number | null>(null);

  const bestIdx = options.reduce((best, opt, i) =>
    CONFIDENCE_RANK[opt.confidence] > CONFIDENCE_RANK[options[best].confidence] ? i : best, 0);

  const toggleTradeoffs = (i: number) => {
    setExpandedTradeoffs(s => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div style={{
      width: '100%',
      boxSizing: 'border-box',
      background: 'var(--ai-card-bg)',
      border: `1px solid ${AI.color.border.default}`,
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      minWidth: 360,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: `1px solid ${AI.color.border.default}`,
        background: AI.color.surface.default,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ ...AI_TYPOGRAPHY['@ai-card-title'], color: DS.textDefault }}>{title}</span>
        <span style={{
          fontSize: 12, color: DS.textHelper,
          background: AI.color.surface.emphasis, padding: '2px 8px', borderRadius: 4,
        }}>
          {options.length} options
        </span>
      </div>

      {/* Options grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(options.length, 3)}, 1fr)`,
        gap: 0,
      }}>
        {options.map((opt, i) => (
          <div key={i} style={{
            padding: '16px 16px 12px',
            borderRight: i < options.length - 1 ? `1px solid ${AI.color.border.default}` : 'none',
            background: chosen === i ? AI.color.brandSurface : 'transparent',
            transition: 'background 0.15s',
            position: 'relative',
          }}>
            {/* Recommended badge */}
            {i === bestIdx && chosen === null && (
              <div style={{
                position: 'absolute', top: 8, right: 8,
                fontSize: 9, color: 'var(--ai-status-success-text)', background: 'var(--ai-status-success-bg)',
                padding: '1px 5px', borderRadius: 3,
              }}>
                Recommended
              </div>
            )}

            {/* Option name */}
            <div style={{ fontSize: 13, color: DS.textDefault, marginBottom: 10, paddingRight: i === bestIdx ? 70 : 0 }}>
              {opt.label}
            </div>

            {/* Confidence / Risk */}
            <div style={{ marginBottom: 10 }}>
              <AIConfidenceRiskBadge confidence={opt.confidence} risk={opt.risk} compact />
            </div>

            {/* Metrics */}
            {opt.metrics && Object.keys(opt.metrics).length > 0 && (
              <div style={{ marginBottom: 10 }}>
                {Object.entries(opt.metrics).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: DS.textHelper }}>{k}</span>
                    <span style={{ fontSize: 12, color: DS.textDefault }}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tradeoffs toggle */}
            <button
              onClick={() => toggleTradeoffs(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: DS.font, fontSize: 12, color: AI.color.brand,
                padding: 0, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6,
              }}
            >
              Tradeoffs
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d={expandedTradeoffs.has(i) ? 'M1 3L5 7L9 3' : 'M3 1L7 5L3 9'}
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>

            {expandedTradeoffs.has(i) && (
              <ul style={{ margin: 0, padding: '0 0 0 14px', listStyle: 'disc' }}>
                {opt.tradeoffs.map((t, j) => (
                  <li key={j} style={{ fontSize: 12, color: DS.textHelper, lineHeight: 1.5, marginBottom: 2 }}>
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {/* Choose button */}
            <button
              onClick={() => { setChosen(i); onChoose?.(i); }}
              style={{
                marginTop: 10,
                width: '100%',
                ...BTN_BASE,
                justifyContent: 'center',
                padding: '5px 10px', fontSize: 12,
                background: chosen === i ? AI.color.brand : 'transparent',
                color: chosen === i ? '#fff' : DS.textHelper,
                border: `1px solid ${chosen === i ? AI.color.brand : DS.border}`,
              }}
            >
              {chosen === i ? '✓ Chosen' : 'Choose'}
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{
        padding: '12px 18px',
        borderTop: `1px solid ${AI.color.border.default}`,
        display: 'flex', gap: 8,
        background: AI.color.surface.default,
      }}>
        <button onClick={onMerge} style={{ ...BTN_BASE, background: 'transparent', color: DS.textHelper, border: `1px solid ${DS.border}` }}>
          Merge Options
        </button>
        <button onClick={onSendToAgent} style={{ ...BTN_BASE, background: 'transparent', color: AI.color.brand, border: 'none' }}>
          RiSendPlaneLine to Agent →
        </button>
      </div>
    </div>
  );
}

export default AICardRecommendationCompare;
