import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AIAgentResponse } from '../../atomic/ai-agent-response/AIAgentResponse';
import { AIUserBubble } from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIMessageFooter } from '../../atomic/ai-message-footer/AIMessageFooter';
import { AIAgentWorkNote } from '../../atomic/ai-agent-work-note/AIAgentWorkNote';
import { AIFeedbackBar } from '../../atomic/ai-feedback-bar/AIFeedbackBar';
import { AIProgress } from '../../atomic/ai-progress/AIProgress';
import { AIControlBar } from '../../atomic/ai-control-bar/AIControlBar';
import { AIReasoningQuote } from '../../atomic/ai-reasoning-quote/AIReasoningQuote';
import { AIConfidenceRiskBadge } from '../../atomic/ai-confidence-risk-badge/AIConfidenceRiskBadge';
import { AIChip } from '../../atomic/ai-chip/AIChip';
import { AISoftSurface } from '../../atomic/ai-soft-surface/AISoftSurface';

/**
 * Documentation / reference surface composing Wave 1 conversational AI atoms.
 * Mirrors the Angular showcase notes — not a single product page pattern.
 */
export function ConversationalAIOutputShowcase() {
  return (
    <AISoftSurface tone="neutral" intensity="subtle" radius={0} style={{ fontFamily: F, padding: 32 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <header>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: AI.color.brand,
            }}
          >
            Reference
          </p>
          <h1 style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700, color: 'var(--ai-zds-text,#1A1628)' }}>
            Conversational AI Output Showcase
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--ai-zds-helper,#5B5864)', lineHeight: 1.5 }}>
            Curated previews of conversational atoms, transparency cues, execution controls, and feedback.
          </p>
        </header>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ai-zds-helper,#5B5864)' }}>
            Conversation
          </h2>
          <AIUserBubble text="Summarize Northeast territory engagement for Q2." />
          <AIAgentResponse agentLabel="AI Agent" timestamp="Just now">
            Based on your Q2 data, Northeast territories show 23% higher engagement. Coverage remains strong in metro
            clusters with a few at-risk accounts needing outreach.
          </AIAgentResponse>
          <AIMessageFooter
            actions={[
              { label: 'Confirm & Apply', variant: 'primary', onClick: () => undefined },
              { label: 'Edit', variant: 'secondary', onClick: () => undefined },
            ]}
          />
          <AIFeedbackBar responseText="Based on your Q2 data…" />
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ai-zds-helper,#5B5864)' }}>
            Transparency
          </h2>
          <AIAgentWorkNote
            status="planning"
            defaultExpanded
            items={[
              'Review territory engagement metrics',
              'Compare metro vs rural clusters',
              'Flag at-risk accounts for outreach',
            ]}
            showViewTrace
          />
          <AIReasoningQuote quote="I prioritized engagement lift because it correlates with coverage risk in the last two quarters." />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <AIConfidenceRiskBadge confidence="high" risk="medium" />
            <AIChip kind="status" label="On track" tone="success" />
            <AIChip kind="memory" variant="using-memory" label="Q2 strategy brief" />
            <AIChip kind="handoff" direction="agent-to-human" fromLabel="Research Agent" toLabel="Sarah K." />
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ai-zds-helper,#5B5864)' }}>
            Execution
          </h2>
          <AIProgress
            status="running"
            value={62}
            label="Analyzing territory coverage"
            percentLabel
            estimatedTimeRemaining="~1 min remaining"
          />
          <AIControlBar state="running" />
        </section>
      </div>
    </AISoftSurface>
  );
}

export default ConversationalAIOutputShowcase;
