/**
 * AIReasoningQuote — Guild Agentic AI Atom
 *
 * Surfaces the agent's first-person reasoning as a short italicized blockquote
 * with a tinted left rule and an uppercase eyebrow label. Used in drawers,
 * detail panels, and reasoning cards anywhere an agent needs to "speak" its
 * rationale without breaking the surrounding chrome.
 *
 * Variants:
 *   tone="ai"      — default. Brand-blue left rule, AI_RAMP eyebrow tint.
 *   tone="warning" — Guild orange left rule for risk/guardrail rationales.
 *   tone="neutral" — neutral helper-grey left rule for muted contexts.
 *
 * Composition:
 *   - eyebrow (optional, defaults to "REASONING SUMMARY") with a leading glyph.
 *   - quote body — italic, slightly larger than body-small.
 *   - attribution (optional) — caption under the quote, e.g. "— Smart Assist".
 *
 * Accessibility:
 *   - Renders as a real <blockquote>; the eyebrow is wrapped as a semantic
 *     header tied to the quote via aria-labelledby when an id is provided.
 *   - Decorative icon is aria-hidden; meaning is carried by the eyebrow text.
 */

import React from 'react';
import { AI, SIGNAL_ORANGE, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type AIReasoningQuoteTone = 'ai' | 'warning' | 'neutral';
export type AIReasoningQuoteSize = 'sm' | 'md';

export interface AIReasoningQuoteProps {
  quote:        React.ReactNode;
  /** Defaults to "REASONING SUMMARY". Pass null/"" to hide. */
  eyebrow?:     string | null;
  /** Guild icon class for the eyebrow. Defaults to brand AI glyph. */
  eyebrowIcon?: string;
  tone?:        AIReasoningQuoteTone;
  size?:        AIReasoningQuoteSize;
  /** Optional caption shown below the quote (e.g. "— Smart Assist · 2m ago"). */
  attribution?: React.ReactNode;
  /** When true, wraps the quote in quotation marks ("…"). Defaults to false
      since most consumers already include the quotes in the string. */
  addQuotes?:   boolean;
  id?:          string;
}

interface ToneCfg {
  rule:    string;
  eyebrow: string;
}

const TONE_CFG: Record<AIReasoningQuoteTone, ToneCfg> = {
  'ai':      { rule: AI.color.border.subtle,  eyebrow: AI.color.text.secondary },
  'warning': { rule: SIGNAL_ORANGE[40] ?? '#F4B583', eyebrow: SIGNAL_ORANGE[80] ?? '#A14A00' },
  'neutral': { rule: 'var(--ai-card-border)', eyebrow: 'var(--ai-ds-helper)' },
};

function Glyph({ name, size = 14, color }: { name: string; size?: number; color?: string }) {
  return (
    <span
      className="zs-master-style"
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size,
        color: color ?? 'inherit',
        flexShrink: 0,
      }}
    >
      <span className={`zs-icon ${name}`} style={{ fontSize: size, lineHeight: 1 }} />
    </span>
  );
}

export function AIReasoningQuote({
  quote,
  eyebrow      = 'REASONING SUMMARY',
  eyebrowIcon  = 'zs-icon-ai-assist',
  tone         = 'ai',
  size         = 'md',
  attribution,
  addQuotes    = false,
  id,
}: AIReasoningQuoteProps) {
  const cfg = TONE_CFG[tone];
  const quoteSize = size === 'sm' ? 13 : 14;
  const eyebrowId = id ? `${id}-eyebrow` : undefined;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: F }}
      aria-labelledby={eyebrowId}
    >
      {eyebrow && (
        <div
          id={eyebrowId}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <Glyph name={eyebrowIcon} size={14} color={cfg.eyebrow} />
          <span style={{
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            color: cfg.eyebrow,
            fontWeight: 700,
            letterSpacing: '0.10em',
          }}>
            {eyebrow}
          </span>
        </div>
      )}

      <blockquote
        id={id}
        style={{
          margin: 0,
          paddingLeft: 14,
          borderLeft: `3px solid ${cfg.rule}`,
          fontFamily: F,
          fontStyle: 'italic',
          fontSize: quoteSize,
          lineHeight: 1.55,
          color: 'var(--ai-ds-text)',
          textAlign: 'left' as const,
        }}
      >
        {addQuotes ? <>&ldquo;{quote}&rdquo;</> : quote}
        {attribution && (
          <footer style={{
            marginTop: 6,
            fontStyle: 'normal',
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            color: 'var(--ai-ds-helper)',
            letterSpacing: '0.06em',
          }}>
            {attribution}
          </footer>
        )}
      </blockquote>
    </div>
  );
}

export default AIReasoningQuote;
