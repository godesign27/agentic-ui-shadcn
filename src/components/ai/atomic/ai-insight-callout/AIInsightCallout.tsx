import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export interface AIInsightCalloutProps {
  body:      string;
  eyebrow?:  string;
  tone?:     'brand' | 'warning' | 'critical' | 'success';
}

// All tone surfaces use CSS vars so dark mode can swap them without
// re-rendering. Light values are medium-saturation; dark values are
// translucent tinted surfaces so white body text (--ai-zds-text) reads.
const TONE: Record<NonNullable<AIInsightCalloutProps['tone']>, { bg: string; border: string; eyebrow: string; body: string }> = {
  brand:    { bg: 'var(--ai-insight-brand-bg)',    border: 'var(--ai-insight-brand-border)',    eyebrow: 'var(--ai-insight-brand-eyebrow)',    body: 'var(--ai-insight-brand-body, var(--ai-zds-text, #2F2C3C))'    },
  warning:  { bg: 'var(--ai-insight-warning-bg)',  border: 'var(--ai-insight-warning-border)',  eyebrow: 'var(--ai-insight-warning-eyebrow)',  body: 'var(--ai-insight-warning-body, var(--ai-zds-text, #2F2C3C))'  },
  critical: { bg: 'var(--ai-insight-critical-bg)', border: 'var(--ai-insight-critical-border)', eyebrow: 'var(--ai-insight-critical-eyebrow)', body: 'var(--ai-insight-critical-body, var(--ai-zds-text, #2F2C3C))' },
  success:  { bg: 'var(--ai-insight-success-bg)',  border: 'var(--ai-insight-success-border)',  eyebrow: 'var(--ai-insight-success-eyebrow)',  body: 'var(--ai-insight-success-body, var(--ai-zds-text, #2F2C3C))'  },
};

function SparkleGlyph({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7 1 L8.2 5.2 L12.5 6.5 L8.2 7.8 L7 12 L5.8 7.8 L1.5 6.5 L5.8 5.2 Z" fill={color} />
      <path d="M11 1 L11.5 2.5 L13 3 L11.5 3.5 L11 5 L10.5 3.5 L9 3 L10.5 2.5 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

export function AIInsightCallout({ body, eyebrow = 'AI INSIGHT', tone = 'brand' }: AIInsightCalloutProps) {
  const cfg = TONE[tone];
  return (
    <div
      role="note"
      aria-label={eyebrow}
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: AI.radius.md,
        padding: '10px 12px 12px',
        fontFamily: F,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <SparkleGlyph color={cfg.eyebrow} />
        <span
          style={{
            ...AI_TYPOGRAPHY['@zsai-micro-eyebrow'],
            fontWeight: 700,
            fontFamily: F,
            color: cfg.eyebrow,
          }}
        >
          {eyebrow}
        </span>
      </div>
      <p
        role="note"
        style={{
          margin: 0,
          fontFamily: F,
          fontSize: 12,
          fontWeight: 500,
          fontStyle: 'italic' as const,
          color: cfg.body,
          lineHeight: 1.55,
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default AIInsightCallout;
