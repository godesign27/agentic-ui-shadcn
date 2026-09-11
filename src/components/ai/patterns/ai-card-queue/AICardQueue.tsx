import React, { useState } from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIBadge, QueueStatus } from '../../atomic/ai-badge/AIBadge';

export interface QueueItem {
  id: string;
  label: string;
  status: QueueStatus;
  eta?: string;
}

export interface AICardQueueProps {
  title?: string;
  summary?: string;
  items?: QueueItem[];
  onApproveAll?: () => void;
  onPause?: () => void;
  onViewDetails?: () => void;
}

/** Demo queue items for bare mounts / galleries. */
export const SAMPLE_QUEUE_ITEMS: QueueItem[] = [
  { id: 'q1', label: 'Pull Q2 HCP engagement metrics', status: 'running', eta: '2 min' },
  { id: 'q2', label: 'Draft territory realignment brief', status: 'needs-approval' },
  { id: 'q3', label: 'Sync CRM call notes', status: 'complete' },
  { id: 'q4', label: 'Flag accounts needing follow-up', status: 'queued' },
];

export const SAMPLE_QUEUE_SUMMARY = '3 of 4 steps in progress · 1 needs approval';

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 14px', borderRadius: AI.radius.sm,
  border: '1px solid transparent', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-section-subtitle'],
};

export function AICardQueue({
  title = 'Execution Queue',
  summary = SAMPLE_QUEUE_SUMMARY,
  items = SAMPLE_QUEUE_ITEMS,
  onApproveAll = () => undefined,
  onPause = () => undefined,
  onViewDetails = () => undefined,
}: AICardQueueProps) {
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());

  const needsApproval = items.filter(i => i.status === 'needs-approval');
  const running       = items.filter(i => i.status === 'running').length;
  const complete      = items.filter(i => i.status === 'complete').length;

  return (
    <div style={{
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      minWidth: 320,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--ai-card-border)',
        background: 'var(--ai-card-bg-raised)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ ...AI_TYPOGRAPHY['@ai-card-title'], color: 'var(--ai-ds-text)' }}>{title}</div>
          {summary && <div style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-helper)', marginTop: 2 }}>{summary}</div>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <AIBadge queue="running" count={running || undefined} />
          {needsApproval.length > 0 && <AIBadge queue="needs-approval" count={needsApproval.length} />}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: AI.color.surface.emphasis }}>
        <div style={{
          height: '100%',
          width: `${Math.round((complete / Math.max(items.length, 1)) * 100)}%`,
          background: AI.color.brand,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Queue items */}
      <div style={{ maxHeight: 260, overflowY: 'auto', padding: '8px 0' }}>
        {items.map((item, idx) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 18px',
            background: approvedIds.has(item.id) ? 'var(--ai-status-success-bg)' : 'transparent',
            borderBottom: idx < items.length - 1 ? '1px solid var(--ai-card-border)' : 'none',
          }}>
            <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-btn-disabled-text)', width: 18, textAlign: 'right', flexShrink: 0 }}>
              {idx + 1}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: 'var(--ai-ds-text)' }}>{item.label}</div>
              {item.eta && <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>ETA {item.eta}</div>}
            </div>
            <AIBadge queue={approvedIds.has(item.id) ? 'complete' : item.status} />
            {item.status === 'needs-approval' && !approvedIds.has(item.id) && (
              <button
                onClick={() => setApprovedIds(s => new Set([...s, item.id]))}
                style={{ ...BTN_BASE, padding: '3px 9px', fontSize: 12, background: AI.color.signal.subtle, color: AI.color.signal.strong, border: `1px solid ${AI.color.signal.default}` }}
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{
        padding: '12px 18px',
        borderTop: '1px solid var(--ai-card-border)',
        display: 'flex', gap: 8,
        background: 'var(--ai-card-bg-raised)',
      }}>
        {needsApproval.length > 0 && (
          <button onClick={onApproveAll} style={{ ...BTN_BASE, background: AI.color.brand, color: '#fff', border: `1px solid ${AI.color.brand}` }}>
            Approve All ({needsApproval.length})
          </button>
        )}
        <button onClick={onPause} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: '1px solid var(--ai-btn-outline-border)' }}>
          Pause
        </button>
        <button onClick={onViewDetails} style={{ ...BTN_BASE, background: 'transparent', color: AI.color.brand, border: 'none' }}>
          View Details →
        </button>
      </div>
    </div>
  );
}

export default AICardQueue;
