import React from 'react';
import { F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// AIMetricValue — the big bold KPI number rendered inside ai-card-metric.
// Tabular-numerals so different cards in a grid line up cleanly. Optional
// `unit` suffix sits inline at a slightly smaller weight (e.g. `42.8K` where
// the `K` is the unit, or `78` + `%`).

export type AIMetricValueSize = 'sm' | 'md' | 'lg';

export interface AIMetricValueProps {
  value:  string | number;
  unit?:  string;
  size?:  AIMetricValueSize;
  color?: string;          // optional override; defaults to ZDS text default
  ariaLabel?: string;
}

// Tight, heavy type. Tuned to read as a "headline number" at small sizes
// (dashboard tile) without competing with section headings on Rich + Robust
// cards. Weight 800 + letter-spacing -0.02em mirrors the AI Card Metric
// reference.
// md / lg consume the shared metric-value type tokens (mirrors source
// token-compliance). sm keeps its local step (no dedicated token). Note: the
// tokens normalize weight to 700 and set md=26 / lg=34 — an intentional
// alignment to source (previously 28/32 @ 800).
const MD = AI_TYPOGRAPHY['@zsai-metric-value-md'];
const LG = AI_TYPOGRAPHY['@zsai-metric-value-lg'];
const SIZE: Record<AIMetricValueSize, { fontSize: number; weight: number; lineHeight: number }> = {
  sm: { fontSize: 22,                    weight: 800,                       lineHeight: 1.1 },
  md: { fontSize: MD.fontSize as number, weight: MD.fontWeight as number,   lineHeight: MD.lineHeight as number },
  lg: { fontSize: LG.fontSize as number, weight: LG.fontWeight as number,   lineHeight: LG.lineHeight as number },
};

export function AIMetricValue({ value, unit, size = 'md', color, ariaLabel }: AIMetricValueProps) {
  const sz = SIZE[size];
  return (
    <span
      aria-label={ariaLabel ?? `${value}${unit ? ` ${unit}` : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '2px',
        fontFamily: F,
        fontSize:   sz.fontSize,
        fontWeight: sz.weight,
        lineHeight: sz.lineHeight,
        color:      color ?? 'var(--ai-zds-text)',
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {value}
      {unit && (
        <span
          aria-hidden="true"
          style={{ fontSize: Math.round(sz.fontSize * 0.6), fontWeight: 600, opacity: 0.7, marginLeft: 1 }}
        >
          {unit}
        </span>
      )}
    </span>
  );
}

export default AIMetricValue;
