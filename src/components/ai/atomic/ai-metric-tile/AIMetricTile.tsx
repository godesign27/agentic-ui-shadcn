/**
 * AIMetricTile — Guild Agentic AI Atom
 *
 * Raised tile that pairs an uppercase eyebrow label with a metric value and an
 * optional qualifier chip. Used in two-up / three-up grids inside detail
 * drawers and trust panels — "CONFIDENCE 94% High", "TREND Stable",
 * "HALT THRESHOLD 0.75 risk", etc.
 *
 * Composes AIMetricValue for the numeric/text body so size + unit handling
 * stays consistent with other metric surfaces.
 *
 * Tone
 *   - `qualifierTone` colors only the small trailing qualifier (e.g. "High")
 *     so the primary value reads as brand-ink.
 *
 * Brand discipline
 *   - Surface uses var(--ai-card-bg-raised) and var(--ai-card-border).
 *   - Qualifier tones map to AI brand blue (high), Guild orange (medium / warning),
 *     Guild orange deep (low / critical), and helper grey (neutral).
 */

import React from 'react';
import { AI, AI_RAMP, SIGNAL_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type AIMetricTileQualifierTone =
  | 'positive'   // brand blue — High confidence, on-track
  | 'attention'  // Guild orange — Medium confidence
  | 'critical'   // Guild orange deep — Low confidence, halted
  | 'neutral';   // helper grey — Stable, no change

export type AIMetricTileSize = 'sm' | 'md';

export interface AIMetricTileProps {
  label:           string;
  value:           React.ReactNode;
  qualifier?:      string;
  qualifierTone?:  AIMetricTileQualifierTone;
  size?:           AIMetricTileSize;
  /** Override the right-edge accent border. */
  accent?:         boolean;
  ariaLabel?:      string;
}

const QUALIFIER_COLOR: Record<AIMetricTileQualifierTone, string> = {
  'positive':   AI.color.brand,
  'attention':  SIGNAL_ORANGE[60],
  'critical':   SIGNAL_ORANGE[80],
  'neutral':    'var(--ai-ds-helper)',
};

const SIZE_CFG: Record<AIMetricTileSize, { pad: string; valueSize: number; gap: number }> = {
  sm: { pad: '10px 12px', valueSize: 18, gap: 4 },
  md: { pad: '12px 14px', valueSize: 22, gap: 4 },
};

export function AIMetricTile({
  label,
  value,
  qualifier,
  qualifierTone = 'positive',
  size          = 'md',
  accent        = false,
  ariaLabel,
}: AIMetricTileProps) {
  const sz = SIZE_CFG[size];
  return (
    <div
      role="group"
      aria-label={ariaLabel ?? `${label}: ${typeof value === 'string' ? value : ''}${qualifier ? `, ${qualifier}` : ''}`}
      style={{
        padding: sz.pad,
        background: 'var(--ai-card-bg-raised)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: 10,
        boxShadow: '0 1px 2px rgba(15, 22, 60, 0.03)',
        borderRight: accent ? `3px solid ${QUALIFIER_COLOR[qualifierTone]}` : undefined,
        fontFamily: F,
        display: 'flex', flexDirection: 'column', gap: sz.gap,
        minWidth: 0,
      }}
    >
      <div style={{
        ...AI_TYPOGRAPHY['@ai-meta-label'],
        color: 'var(--ai-ds-helper)',
        letterSpacing: '0.10em',
        fontWeight: 700,
      }}>
        {label}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, minWidth: 0 }}>
        <span style={{
          fontFamily: F,
          fontSize: sz.valueSize,
          fontWeight: 600,
          color: 'var(--ai-ds-text)',
          lineHeight: 1.1,
          letterSpacing: '-0.005em',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {value}
        </span>
        {qualifier && (
          <span style={{
            fontFamily: F,
            fontSize: 12,
            fontWeight: 600,
            color: QUALIFIER_COLOR[qualifierTone],
            flexShrink: 0,
          }}>
            {qualifier}
          </span>
        )}
      </div>
    </div>
  );
}

export default AIMetricTile;
