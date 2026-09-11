import React from 'react';
import { AIBadge, type AIBadgeQueueStatus, type AIBadgeSize } from './AIBadge';

export type AIQueueStatus = AIBadgeQueueStatus;

export interface AIQueueBadgeProps {
  status?: AIQueueStatus;
  count?: number;
  label?: string;
  size?: AIBadgeSize;
}

/**
 * Dedicated queue badge — wraps `AIBadge` queue mode.
 * Optional `label` overrides the default status label via children when provided
 * (AIBadge queue mode uses fixed labels; when a custom label is needed we render
 * a lightweight twin matching the Angular API).
 */
export function AIQueueBadge({
  status = 'queued',
  count,
  label,
  size = 'default',
}: AIQueueBadgeProps) {
  if (!label) {
    return <AIBadge queue={status} count={count} size={size} />;
  }

  // Custom label path — match Angular visual (dot + label + optional count)
  const cfg: Record<AIQueueStatus, { bg: string; color: string }> = {
    queued:         { bg: 'var(--zsai-10,#E6E9FF)', color: 'var(--zsai-80,#3F50C7)' },
    running:        { bg: 'var(--zsai-20,#D2D6FF)', color: 'var(--zsai-90,#2D3DA3)' },
    blocked:        { bg: 'var(--zs-surface-error,#FFEDE9)', color: 'var(--zs-text-error,#C0392B)' },
    'needs-approval': { bg: 'var(--zs-surface-warning,#FFF9F1)', color: 'var(--zs-text-warning,#854D0E)' },
    complete:       { bg: 'var(--zs-surface-success,#EAF4EE)', color: 'var(--zs-text-success,#1F6B40)' },
  };
  const c = cfg[status];
  const h = size === 'small' ? 16 : 20;
  return (
    <span
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: h,
        padding: '0 10px',
        borderRadius: 100,
        background: c.bg,
        color: c.color,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: size === 'small' ? 10 : 12,
        fontWeight: 600,
        boxSizing: 'border-box',
      }}
    >
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
      {label}
      {typeof count === 'number' && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 18,
            height: 18,
            borderRadius: 100,
            padding: '0 5px',
            fontSize: 12,
            color: '#fff',
            background: c.color,
          }}
        >
          {count}
        </span>
      )}
    </span>
  );
}

export default AIQueueBadge;
