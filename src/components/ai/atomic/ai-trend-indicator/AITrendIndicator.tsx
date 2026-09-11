import React from 'react';
import { F } from '../../tokens/ai-tokens';

// AITrendIndicator — small arrow glyph + signed delta + "vs Close" sub-label.
// Used inside ai-card-metric and any KPI row where the user needs to read
// direction (positive / negative / neutral) at a glance.
//
// Tones:
//   • positive — green up-arrow
//   • negative — red down-arrow
//   • neutral  — gray flat dash (no trend information yet)
//
// Caller passes a pre-formatted delta string (`'+8.4%'`, `'-3.1%'`, `'0.0%'`,
// `'+4'`) so the atom doesn't bake in unit / precision assumptions.

export type AITrendIndicatorTone = 'positive' | 'negative' | 'neutral';

export interface AITrendIndicatorProps {
  delta:  string;
  label?: string;                // 'vs prior' | 'vs target' | 'new gaps' etc.
  tone?:  AITrendIndicatorTone;  // defaults to neutral
  size?:  'sm' | 'md';
}

const TONE_COLOR: Record<AITrendIndicatorTone, string> = {
  positive: '#1F6B40',   // DS success
  negative: '#C0392B',   // DS error
  neutral:  'var(--ai-ds-helper)',
};

function TrendGlyph({ tone, size }: { tone: AITrendIndicatorTone; size: number }) {
  // Guild-style stroked arrow built inline so the indicator has zero font
  // dependency — runs on any surface that has not loaded the zs-icons font.
  if (tone === 'positive') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M2.5 10.5 L6 7 L8.5 9 L12 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 4.5 H12 V7.5"               stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (tone === 'negative') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M2.5 4.5 L6 8 L8.5 6 L12 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9.5 H12 V6.5"              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // neutral
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 7 H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function AITrendIndicator({ delta, label, tone = 'neutral', size = 'md' }: AITrendIndicatorProps) {
  const sm   = size === 'sm';
  const px   = sm ? 13 : 15;
  const fz   = sm ? 13 : 14;
  const color = TONE_COLOR[tone];
  return (
    <span
      role="status"
      aria-label={`${delta}${label ? ` ${label}` : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: F,
        fontSize: fz,
        fontWeight: 600,
        lineHeight: 1.3,
        color,
        whiteSpace: 'nowrap' as const,
      }}
    >
      <TrendGlyph tone={tone} size={px} />
      <span>{delta}</span>
      {label && (
        <span style={{ color: 'var(--ai-ds-text)', fontWeight: 400, marginLeft: 2 }}>{label}</span>
      )}
    </span>
  );
}

export default AITrendIndicator;
