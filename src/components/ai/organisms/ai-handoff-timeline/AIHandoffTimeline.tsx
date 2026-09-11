import React, { useState } from 'react';
import { AI, ZDS, ZSAI_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip, type HandoffDirection } from '../../atomic/ai-chip/AIChip';

export interface HandoffStep {
  owner: string;
  ownerType: 'agent' | 'human' | 'system';
  timestamp: string;
  note?: string;
  status?: 'complete' | 'active' | 'pending' | 'failed';
}

export interface AIHandoffTimelineProps {
  steps?: HandoffStep[];
  direction?: HandoffDirection;
  title?: string;
  onRetry?: () => void;
  onReassign?: () => void;
  onViewAudit?: () => void;
}

/** Demo handoff steps for bare mounts / galleries. */
export const SAMPLE_HANDOFF_STEPS: HandoffStep[] = [
  { owner: 'Research Agent', ownerType: 'agent', timestamp: '9:12 AM', note: 'Compiled source pack', status: 'complete' },
  { owner: 'Sarah K.', ownerType: 'human', timestamp: '9:28 AM', note: 'Confirmed scope and constraints', status: 'complete' },
  { owner: 'Analysis Agent', ownerType: 'agent', timestamp: '9:41 AM', note: 'Scoring rebalance scenarios', status: 'active' },
  { owner: 'Ops Desk', ownerType: 'system', timestamp: 'Pending', note: 'Awaiting approval gate', status: 'pending' },
];

// Tab/header background (ZSAI_TAN[00])
const TAB_BG = ZSAI_TAN['00'] as string;

const TYPE_COLOR: Record<string, string> = {
  agent:  AI.color.brand,
  human:  AI.color.signal.default,
  system: '#9B59B6',
};
const STATUS_RING: Record<string, string> = {
  complete: '#27AE60',
  active:   AI.color.brand,
  pending:  '#9896A0',
  failed:   '#E74C3C',
};

// 32×32 owner / status icon — replaces the 20px emoji circle.
function StatusIcon({ ownerType, status }: { ownerType: 'agent' | 'human' | 'system'; status?: 'complete' | 'active' | 'pending' | 'failed' }) {
  const resolvedStatus = status ?? 'pending';
  const ring = STATUS_RING[resolvedStatus];
  const tint = `${ring}1F`;
  // Glyph: human → person · system → briefcase · agent → check (or hourglass when pending)
  const glyph = (() => {
    if (ownerType === 'human') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="3.4" stroke={ring} strokeWidth="1.8" />
          <path d="M5 20c1-4 4-6 7-6s6 2 7 6" stroke={ring} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    }
    if (ownerType === 'system') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="8" width="18" height="12" rx="2" stroke={ring} strokeWidth="1.8" fill="none" />
          <path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" stroke={ring} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    }
    if (resolvedStatus === 'failed') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke={ring} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    }
    if (resolvedStatus === 'pending') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke={ring} strokeWidth="1.8" fill="none" />
          <path d="M12 7v5l3 2" stroke={ring} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    }
    // agent default → check
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12l5 5L20 7" stroke={ring} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  })();

  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: tint,
      border: `2px solid ${ring}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {glyph}
    </div>
  );
}

// Map an ownerType pair into the AIChipHandoff direction enum.
function deriveDirection(from: 'agent' | 'human' | 'system', to: 'agent' | 'human' | 'system'): HandoffDirection {
  if (from === 'agent' && to === 'human')  return 'agent-to-human';
  if (from === 'human' && to === 'agent')  return 'human-to-agent';
  if (from === 'system' && to === 'agent') return 'system-to-agent';
  return 'agent-to-agent';
}

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 14px', borderRadius: AI.radius.sm,
  border: '1px solid var(--ai-btn-outline-border)', cursor: 'pointer',
  fontFamily: ZDS.font, ...AI_TYPOGRAPHY['@zsai-caption-1'],
  background: 'transparent', color: 'var(--ai-zds-helper)',
};

export function AIHandoffTimeline({
  steps       = SAMPLE_HANDOFF_STEPS,
  direction   = 'agent-to-human',
  title       = 'Handoff Timeline',
  onRetry     = () => undefined,
  onReassign  = () => undefined,
  onViewAudit = () => undefined,
}: AIHandoffTimelineProps) {
  const [expanded, setExpanded] = useState(true);
  const hasFailed = steps.some(s => s.status === 'failed');

  return (
    <div style={{
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: ZDS.font,
      width: '100%',
    }}>
      {/* Header — tan background */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--ai-card-border)',
        background: TAB_BG,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ ...AI_TYPOGRAPHY['@zsai-card-title'], color: 'var(--ai-zds-text)' }}>{title}</span>
        <button
          onClick={() => setExpanded(e => !e)}
          aria-label={expanded ? 'Collapse timeline' : 'Expand timeline'}
          aria-expanded={expanded}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ai-zds-helper)', padding: 4, display: 'flex', alignItems: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.18s ease', transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
            <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {expanded && (
        <>
          {/* Timeline */}
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              const prev = idx > 0 ? steps[idx - 1] : null;
              const direction = prev
                ? deriveDirection(prev.ownerType, step.ownerType)
                : null;
              return (
                <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {/* Left column: 32px status icon + connecting line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                    <StatusIcon ownerType={step.ownerType} status={step.status} />
                    {!isLast && (
                      <div style={{
                        width: 2, flex: 1, minHeight: 28,
                        background: step.status === 'failed'
                          ? '#E74C3C'
                          : step.status === 'complete'
                            ? AI.color.brand
                            : 'var(--ai-card-border)',
                        margin: '6px 0',
                        borderRadius: 1,
                      }} />
                    )}
                  </div>

                  {/* Right column: handoff chip + timestamp + optional note */}
                  <div style={{ paddingBottom: isLast ? 0 : 18, flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: step.note ? 6 : 0 }}>
                      {prev && direction ? (
                        <AIChip
                          kind="handoff"
                          direction={step.status === 'failed' ? 'failed' : direction}
                          fromLabel={prev.owner}
                          toLabel={step.owner}
                          size="sm"
                        />
                      ) : (
                        <span style={{ ...AI_TYPOGRAPHY['@zsai-section-subtitle'], color: 'var(--ai-zds-text)' }}>
                          {step.owner}
                          <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)', marginLeft: 8 }}>
                            initiated
                          </span>
                        </span>
                      )}
                      <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)' }}>
                        {step.timestamp}
                      </span>
                    </div>
                    {step.note && (
                      <div style={{
                        ...AI_TYPOGRAPHY['@zsai-caption-1'], color: 'var(--ai-zds-helper)',
                      }}>
                        {step.note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions — tan background */}
          <div style={{
            padding: '12px 18px',
            borderTop: '1px solid var(--ai-card-border)',
            display: 'flex', gap: 8,
            background: TAB_BG,
          }}>
            {hasFailed && (
              <button onClick={onRetry} style={{
                ...BTN_BASE,
                background: AI.color.brand, color: '#fff',
                border: `1px solid ${AI.color.brand}`,
              }}>
                Retry
              </button>
            )}
            <button onClick={onReassign} style={BTN_BASE}>Reassign</button>
            <button onClick={onViewAudit} style={{ ...BTN_BASE, color: AI.color.brand, border: 'none' }}>
              View Audit →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AIHandoffTimeline;
