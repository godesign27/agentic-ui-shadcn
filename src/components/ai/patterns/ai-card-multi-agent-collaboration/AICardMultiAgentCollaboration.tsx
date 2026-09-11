import React, { useState } from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIBadge, QueueStatus } from '../../atomic/ai-badge/AIBadge';
import { AIAgentStack } from '../../atomic/ai-agent-stack/AIAgentStack';

export interface CollaboratingAgent {
  id: string;
  label: string;
  status: QueueStatus;
  contribution: string;
}

export interface AICardMultiAgentCollaborationProps {
  goal?: string;
  agents?: CollaboratingAgent[];
  sharedFindings?: string;
  onViewAudit?: () => void;
  onPauseAll?: () => void;
  onEscalate?: () => void;
}

/** Demo multi-agent collaboration props for bare mounts / galleries. */
export const SAMPLE_COLLAB_AGENTS: CollaboratingAgent[] = [
  { id: 'a1', label: 'Research Agent', status: 'complete', contribution: 'Pulled 14 sources on Mid-Atlantic coverage gaps.' },
  { id: 'a2', label: 'Analysis Agent', status: 'running', contribution: 'Scoring territory imbalance scenarios…' },
  { id: 'a3', label: 'Briefing Agent', status: 'queued', contribution: 'Waiting on analysis to draft the exec brief.' },
];

export const SAMPLE_COLLAB_GOAL = 'Produce a territory realignment recommendation for Q3 planning.';
export const SAMPLE_COLLAB_FINDINGS = 'Coverage density is lowest in PA-07 and NJ-03; reallocating two FTEs recovers ~9% reach.';

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 14px', borderRadius: AI.radius.sm,
  border: '1px solid transparent', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-section-subtitle'],
};

const STATUS_COLOR: Record<string, string> = {
  running: AI.color.brand,
  complete: '#27AE60',
  queued: '#9896A0',
  blocked: '#E74C3C',
  'needs-approval': AI.color.signal.default,
};

export function AICardMultiAgentCollaboration({
  goal           = SAMPLE_COLLAB_GOAL,
  agents         = SAMPLE_COLLAB_AGENTS,
  sharedFindings = SAMPLE_COLLAB_FINDINGS,
  onViewAudit    = () => undefined,
  onPauseAll     = () => undefined,
  onEscalate     = () => undefined,
}: AICardMultiAgentCollaborationProps) {
  const [findingsExpanded, setFindingsExpanded] = useState(false);

  const stackAgents = agents.map(a => ({
    id: a.id,
    label: a.label,
    status: (['active', 'waiting', 'complete', 'error'].includes(
      a.status === 'running' ? 'active'
      : a.status === 'complete' ? 'complete'
      : a.status === 'blocked' ? 'error'
      : 'waiting'
    ) ? (
      a.status === 'running' ? 'active'
      : a.status === 'complete' ? 'complete'
      : a.status === 'blocked' ? 'error'
      : 'waiting'
    ) : 'waiting') as 'active' | 'waiting' | 'complete' | 'error',
  }));

  const running = agents.filter(a => a.status === 'running').length;
  const complete = agents.filter(a => a.status === 'complete').length;

  return (
    <div style={{
      background: 'var(--ai-card-bg)',
      border: `1px solid ${AI.color.border.default}`,
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
      minWidth: 320,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: `1px solid ${AI.color.border.default}`,
        background: AI.color.surface.default,
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}>
        <AIAgentStack agents={stackAgents} maxVisible={4} size={26} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: DS.textHelper, marginBottom: 2 }}>Shared Goal</div>
          <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: DS.textDefault }}>{goal}</div>
        </div>
      </div>

      {/* Progress mini bar */}
      <div style={{ height: 3, background: AI.color.surface.emphasis }}>
        <div style={{
          height: '100%',
          width: `${Math.round((complete / Math.max(agents.length, 1)) * 100)}%`,
          background: AI.color.brand,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Agent rows */}
      <div style={{ padding: '8px 0' }}>
        {agents.map((agent, idx) => (
          <div key={agent.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 18px',
            borderBottom: idx < agents.length - 1 ? `1px solid ${AI.color.border.default}` : 'none',
          }}>
            {/* Avatar */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: AI.color.brandSurface,
              border: `2px solid ${STATUS_COLOR[agent.status] ?? AI.color.border.default}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: 12, color: AI.color.brand,
            }}>
              {agent.label[0].toUpperCase()}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13, color: DS.textDefault }}>{agent.label}</span>
                <AIBadge queue={agent.status} />
              </div>
              <div style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], color: DS.textHelper }}>
                {agent.contribution}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shared findings */}
      {sharedFindings && (
        <div style={{
          borderTop: `1px solid ${AI.color.border.default}`,
          background: AI.color.companion.paper,
        }}>
          <button
            onClick={() => setFindingsExpanded(e => !e)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: DS.font, fontSize: 12, color: DS.textDefault,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2v8" stroke={AI.color.brand} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Shared Findings
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d={findingsExpanded ? 'M2 4L6 8L10 4' : 'M4 2L8 6L4 10'}
                stroke={DS.textHelper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {findingsExpanded && (
            <div style={{
              padding: '0 18px 12px',
              ...AI_TYPOGRAPHY['@ai-body-extra-small'], color: DS.textDefault,
            }}>
              {sharedFindings}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{
        padding: '12px 18px',
        borderTop: `1px solid ${AI.color.border.default}`,
        display: 'flex', gap: 8,
        background: AI.color.surface.default,
      }}>
        <button onClick={onPauseAll} style={{ ...BTN_BASE, background: 'transparent', color: DS.textHelper, border: `1px solid ${DS.border}` }}>
          Pause All
        </button>
        <button onClick={onEscalate} style={{ ...BTN_BASE, background: AI.color.signal.subtle, color: AI.color.signal.strong, border: `1px solid ${AI.color.signal.default}` }}>
          Escalate
        </button>
        <button onClick={onViewAudit} style={{ ...BTN_BASE, background: 'transparent', color: AI.color.brand, border: 'none' }}>
          View Full Audit →
        </button>
      </div>
    </div>
  );
}

export default AICardMultiAgentCollaboration;
