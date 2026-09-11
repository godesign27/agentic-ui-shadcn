import React from 'react';
import { F, AI, DS } from '../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../tokens/ai-typography';
import { AIMessageHeader } from '../atomic/ai-message-header/AIMessageHeader';
import { AIMessageBody } from '../atomic/ai-message-body/AIMessageBody';
import { AIMessageFooter } from '../atomic/ai-message-footer/AIMessageFooter';
import { AIFeedbackBar } from '../atomic/ai-feedback-bar/AIFeedbackBar';
import { AIAnalysisMessage } from '../organisms/ai-analysis-message/AIAnalysisMessage';
import { AIResponseFooter } from '../molecules/ai-response-footer/AIResponseFooter';

export type PatternType =
  | 'analytical'
  | 'qa'
  | 'actionable'
  | 'contextual'
  | 'awaiting-approval';


// ── Pattern 1: Analytical ─────────────────────────────────────────────────────
export function AnalyticalResponse() {
  return (
    <AIAnalysisMessage
      intro="Based on your Q1 alignment data, here are the key insights:"
      insights={[
        {
          type: 'keyTrend',
          body: 'Q1 oncology territories show 23% higher engagement in Northeast regions. Current alignment creates coverage gaps in 3 critical accounts.',
          confidence: 'high',
          metric: '+23% engagement',
          showRationale: true,
          onViewRationale: () => {},
        },
        {
          type: 'observation',
          body: 'Southwest team capacity is underutilized at 67% relative to customer density.',
          confidence: 'medium',
          metric: '67% capacity',
          showRationale: true,
          onViewRationale: () => {},
        },
      ]}
      sources={[
        { label: 'Guild Analytics' },
        { label: 'Territory DB' },
        { label: '+ 2 more' },
      ]}
    />
  );
}

// ── Pattern 2: Q&A ────────────────────────────────────────────────────────────
export function QAResponse() {
  return (
    <div style={{ animation: 'ai-in 0.25s ease both', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <AIMessageHeader agentLabel="AI Response" />
      <div>
        <div style={{ padding: '4px 0 10px' }}>
          <AIMessageBody>
            Your Q1 Oncology alignment is active and performing well. Northeast and Midwest regions are meeting targets ahead of schedule, with 94% coverage across primary territories.
          </AIMessageBody>
        </div>
        <div role="status" style={{ margin: '0 0 12px', background: 'var(--ai-status-info-bg)', border: '1px solid var(--ai-status-info-border)', borderRadius: AI.radius.xs, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '9px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="8" fill="var(--ai-status-info-text)" />
            <path d="M4.5 8.5l2.5 2 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ ...AI_TYPOGRAPHY['@ai-h5'], fontFamily: F, fontWeight: 600, color: 'var(--ai-status-info-text)' }}>
            Currently Aligned — 94% coverage across primary territories
          </span>
        </div>
        <AIResponseFooter
          sources={[{ label: 'Guild Analytics', freshness: 'fresh' }]}
          attribution="Guild Analytics"
          updatedAt="just now"
          showFeedback
        />
      </div>
    </div>
  );
}

// ── Pattern 3: Actionable ─────────────────────────────────────────────────────
export function ActionableResponse() {
  const rows = [
    { territory: 'NE-01', rep: 'Sarah Chen',  current: '47 accts', proposed: '52 accts' },
    { territory: 'SW-03', rep: 'Marcus Lee',  current: '61 accts', proposed: '55 accts' },
    { territory: 'MW-02', rep: 'Priya Patel', current: '38 accts', proposed: '44 accts' },
  ];

  return (
    <div style={{ animation: 'ai-in 0.25s ease both', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <AIMessageHeader agentLabel="AI Response" />
      <div>
        <div style={{ padding: '4px 0 10px' }}>
          <AIMessageBody>
            I've identified 3 territory assignments to optimize based on current coverage gaps:
          </AIMessageBody>
        </div>

        {/* ai-table.* — data table component */}
        <div style={{ margin: '0 0 12px', borderRadius: AI.radius.xs, overflow: 'hidden', border: '1px solid var(--ai-card-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 66px 72px', background: 'var(--ai-track-bg)', borderBottom: '1px solid var(--ai-card-border)' }}>
            {['Territory', 'Rep', 'Current', 'Proposed'].map(h => (
              <div key={h} style={{ padding: '6px 10px', ...AI_TYPOGRAPHY['@ai-overline'], color: DS.textDisabled, fontFamily: F }}>{h}</div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 66px 72px', borderTop: i > 0 ? '1px solid var(--ai-card-border)' : 'none', background: i % 2 === 0 ? 'var(--ai-card-bg)' : 'var(--ai-row-alt)' }}>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-table-cell'], fontFamily: F, color: DS.textDefault }}>{row.territory}</div>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-meta-label'], fontFamily: F, color: DS.textHelper }}>{row.rep}</div>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-meta-label'], fontFamily: F, color: DS.textDisabled }}>{row.current}</div>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-table-cell'], fontFamily: F, color: AI.color.action.primary }}>{row.proposed}</div>
            </div>
          ))}
        </div>

        <AIMessageFooter actions={[
          { label: 'Confirm & Apply Assignment', variant: 'primary',    onClick: () => {} },
          { label: 'Edit',                       variant: 'secondary',  onClick: () => {} },
        ]} />
        <AIResponseFooter
          sources={[{ label: 'Guild Territory DB', freshness: 'fresh' }, { label: 'Coverage Model' }]}
          attribution="Guild Analytics"
          updatedAt="just now"
          showFeedback
          showRationale
          onViewRationale={() => {}}
        />
      </div>
    </div>
  );
}

// ── Pattern 4: Contextual ─────────────────────────────────────────────────────
export function ContextualResponse() {
  return (
    <div style={{ animation: 'ai-in 0.25s ease both', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <AIMessageHeader agentLabel="AI Assistant" />
      <div>
        <div style={{ padding: '4px 0 10px' }}>
          <AIMessageBody>
            I can add a performance comparison section to your report. This would highlight the 3 key alignment changes and their territory impact.
          </AIMessageBody>
        </div>

        {/* ai-suggestion.* — suggestion / call-to-action card */}
        <div style={{ margin: '0 0 12px', background: AI.color.surface.default, border: `1px solid ${AI.color.border.default}`, borderRadius: AI.radius.md, padding: '10px 12px' }}>
          <span style={{ ...AI_TYPOGRAPHY['@ai-overline'], color: AI.color.text.secondary, fontFamily: F }}>SUGGESTED SECTION</span>
          <p style={{ margin: '6px 0 0', ...AI_TYPOGRAPHY['@ai-card-title'], fontFamily: F, color: DS.textDefault }}>
            <strong>Q1 Performance Comparison</strong> — Territory coverage before/after with KPI delta table
          </p>
        </div>

        <AIMessageFooter actions={[
          { label: 'Add Section', variant: 'primary',   onClick: () => {} },
          { label: 'Edit First',  variant: 'secondary', onClick: () => {} },
        ]} />
        <AIResponseFooter
          attribution="Based on your Q1 Oncology alignment report"
          updatedAt="just now"
          showFeedback
        />
      </div>
    </div>
  );
}

// ── Pattern 5: Awaiting Approval ──────────────────────────────────────────────
export function AwaitingApprovalResponse() {
  const rows = [
    { territory: 'NE-01', rep: 'Sarah Chen', action: 'Reassign' },
    { territory: 'SW-03', rep: 'Marcus Lee', action: 'Reassign' },
  ];

  return (
    <div style={{ animation: 'ai-in 0.25s ease both', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <AIMessageHeader agentLabel="AI Response" />
      <div style={{
        background: 'white', borderRadius: `${AI.radius.md} ${AI.radius.md} ${AI.radius.md} 4px`,
        border: '1.5px solid var(--ai-status-warning-border)',
        boxShadow: '0 1px 10px rgba(245,158,11,0.14)',
        overflow: 'hidden',
      }}>
        <div style={{ background: 'var(--ai-status-warning-bg)', padding: '10px 16px', borderBottom: '1px solid var(--ai-status-warning-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ ...AI_TYPOGRAPHY['@ai-h6'], color: 'var(--ai-status-warning-text)', fontFamily: F }}>Awaiting your approval</span>
        </div>

        <div style={{ padding: '12px 16px 10px' }}>
          <AIMessageBody>
            Review the proposed territory reassignments before I apply them to Guild:
          </AIMessageBody>
        </div>

        <div style={{ margin: '0 12px 12px', borderRadius: AI.radius.xs, overflow: 'hidden', border: '1px solid var(--ai-card-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', background: 'var(--ai-track-bg)', borderBottom: '1px solid var(--ai-card-border)' }}>
            {['Territory', 'Rep', 'Action'].map(h => (
              <div key={h} style={{ padding: '6px 10px', ...AI_TYPOGRAPHY['@ai-overline'], color: DS.textDisabled, fontFamily: F }}>{h}</div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', borderTop: i > 0 ? '1px solid var(--ai-card-border)' : 'none' }}>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-table-cell'], fontFamily: F, color: DS.textDefault }}>{row.territory}</div>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-meta-label'], fontFamily: F, color: DS.textHelper }}>{row.rep}</div>
              <div style={{ padding: '7px 10px', ...AI_TYPOGRAPHY['@ai-table-cell'], fontFamily: F, color: 'var(--ai-status-warning-text)' }}>{row.action}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 12px 10px' }}>
          <AIMessageFooter actions={[
            { label: 'Approve & Execute', variant: 'primary',   onClick: () => {} },
            { label: 'Edit First',        variant: 'secondary', onClick: () => {} },
            { label: 'Cancel',            variant: 'ghost',     onClick: () => {} },
          ]} />
        </div>
        <div style={{ padding: '0 4px' }}>
          <AIResponseFooter
            attribution="This action will modify 2 territory assignments in Guild. This cannot be undone."
            showFeedback
          />
        </div>
      </div>
    </div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────────────────────
export function AIPatternMessage({ pattern, userText }: { pattern: PatternType; userText: string }) {
  switch (pattern) {
    case 'analytical':        return <AnalyticalResponse />;
    case 'qa':                return <QAResponse />;
    case 'actionable':        return <ActionableResponse />;
    case 'contextual':        return <ContextualResponse />;
    case 'awaiting-approval': return <AwaitingApprovalResponse />;
    default:                  return null;
  }
}

// Pattern + loader sequences
export const PATTERNS: PatternType[] = ['analytical', 'qa', 'actionable', 'contextual', 'awaiting-approval'];
export const LOADERS = ['working', 'working', 'thinking', 'thinking', 'getting-info'] as const;

// Chat message types
export interface UserMsg    { id: string; kind: 'user'; text: string; }
export interface LoadingMsg { id: string; kind: 'loading'; variant: 'working' | 'thinking' | 'getting-info'; }
export interface AIMsg      { id: string; kind: 'ai'; pattern: PatternType; userText: string; }
export type ChatMsg = UserMsg | LoadingMsg | AIMsg;
