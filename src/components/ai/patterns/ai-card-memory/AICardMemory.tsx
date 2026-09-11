import React from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip, type MemoryVariant } from '../../atomic/ai-chip/AIChip';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';

export interface AICardMemoryProps {
  variant?: MemoryVariant;
  source?: string;
  date?: string;
  content?: string;
  onReuse?: () => void;
  onReview?: () => void;
  onIgnore?: () => void;
  onRemove?: () => void;
}

/** Demo memory card props for bare mounts / galleries. */
export const SAMPLE_MEMORY = {
  variant: 'using-memory' as MemoryVariant,
  source:  'Q2 Strategy Brief',
  date:    'Updated 3 days ago',
  content: 'Prioritize Tier-1 HCPs in oncology with rising call frequency and declining sample utilization.',
};

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '5px 12px', borderRadius: AI.radius.sm,
  border: '1px solid transparent', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-caption-1'],
};

const VARIANT_BG: Record<MemoryVariant, string> = {
  'using-memory':       'var(--ai-card-bg-raised)',
  'previous-context':   'var(--ai-card-bg-raised)',
  'memory-available':   'var(--ai-brand-surface)',
  'memory-ignored':     'var(--ai-confidence-track)',
  'memory-removed':     'var(--ai-status-error-bg)',
};

const VARIANT_BORDER: Record<MemoryVariant, string> = {
  'using-memory':       'var(--ai-card-border)',
  'previous-context':   'var(--ai-card-border)',
  'memory-available':   'var(--ai-brand-border)',
  'memory-ignored':     'var(--ai-card-border)',
  'memory-removed':     'var(--ai-status-error-border)',
};

export function AICardMemory({
  variant  = SAMPLE_MEMORY.variant,
  source   = SAMPLE_MEMORY.source,
  date     = SAMPLE_MEMORY.date,
  content  = SAMPLE_MEMORY.content,
  onReuse  = () => undefined,
  onReview = () => undefined,
  onIgnore = () => undefined,
  onRemove = () => undefined,
}: AICardMemoryProps) {
  const isRemoved = variant === 'memory-removed';
  const isIgnored = variant === 'memory-ignored';

  return (
    <div style={{
      background: VARIANT_BG[variant],
      border: `1px solid ${VARIANT_BORDER[variant]}`,
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      minWidth: 300,
      opacity: isRemoved ? 0.7 : 1,
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${VARIANT_BORDER[variant]}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      }}>
        <AIChip kind="memory" variant={variant} label={variant.replace(/-/g, ' ')} />
        <span style={{ fontSize: 12, color: 'var(--ai-ds-helper)' }}>{source}</span>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 16px' }}>
        <p style={{
          margin: 0, ...AI_TYPOGRAPHY['@ai-body-extra-small'],
          color: isIgnored || isRemoved ? 'var(--ai-btn-disabled-text)' : 'var(--ai-ds-text)',
          textDecoration: isRemoved ? 'line-through' : 'none',
        }}>
          {content}
        </p>

        {/* View sources + freshness on one row — date was previously stuck
            in the header as a small pill, but it reads better next to the
            "View sources" link as part of the same trust-footnote line. */}
        {!isRemoved && !isIgnored ? (
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AIWhyThisLink variant="view-sources" />
            <span style={{ fontSize: 12, color: 'var(--ai-ds-helper)', marginLeft: 'auto' }}>
              {date}
            </span>
          </div>
        ) : (
          <div style={{ marginTop: 8, display: 'flex' }}>
            <span style={{ fontSize: 12, color: 'var(--ai-ds-helper)', marginLeft: 'auto' }}>
              {date}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{
        padding: '10px 16px',
        borderTop: `1px solid ${VARIANT_BORDER[variant]}`,
        display: 'flex', gap: 6, flexWrap: 'wrap',
      }}>
        {!isRemoved && !isIgnored && (
          <button onClick={onReuse} style={{ ...BTN_BASE, background: AI.color.brand, color: '#fff', border: `1px solid ${AI.color.brand}` }}>
            Reuse
          </button>
        )}
        {!isRemoved && (
          <button onClick={onReview} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: '1px solid var(--ai-btn-outline-border)' }}>
            Review
          </button>
        )}
        {!isIgnored && !isRemoved && (
          <button onClick={onIgnore} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: '1px solid var(--ai-btn-outline-border)' }}>
            Ignore
          </button>
        )}
        {!isRemoved && (
          <button onClick={onRemove} style={{ ...BTN_BASE, background: 'transparent', color: '#E74C3C', border: 'none' }}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default AICardMemory;
