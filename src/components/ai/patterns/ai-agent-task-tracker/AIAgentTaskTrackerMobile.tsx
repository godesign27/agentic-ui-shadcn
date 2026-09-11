/**
 * AIAgentTaskTrackerMobile — compact mobile companion view.
 *
 * Renders two stacked AINotification cards mirroring the prototype's mobile
 * push pattern: a Needs-Input alert with two inline action buttons, and a
 * Proactive Insight alert with Approve / Dismiss. Inline actions mutate the
 * same task record (handled by parent in production).
 *
 * Brand: no teal. Needs Input + warning use Guild orange family; AI emphasis
 * stays in the supervisor agent header tan tint.
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AINotification } from '../../molecules/ai-notification/AINotification';
import { AISupervisorBar } from '../../atomic/ai-supervisor-bar/AISupervisorBar';

export interface AIAgentTaskTrackerMobileProps {
  supervisorAgent?:  { name: string; tasksTracked: number };
  onUseSuggestion?:  () => void;
  onReply?:          () => void;
  onApproveVisit?:   () => void;
  onDismiss?:        () => void;
}

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

export function AIAgentTaskTrackerMobile({
  supervisorAgent = { name: 'Smart Assist', tasksTracked: 7 },
  onUseSuggestion,
  onReply,
  onApproveVisit,
  onDismiss,
}: AIAgentTaskTrackerMobileProps) {
  return (
    <div style={{
      width: 320, padding: 16, fontFamily: F,
      background: '#0E1228', minHeight: 480, display: 'flex', flexDirection: 'column', gap: 14,
      borderRadius: 28,
    }}>
      {/* Faux phone status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: '#FFFFFF', fontSize: 12, opacity: 0.85, padding: '0 6px',
      }}>
        <span>9:41</span>
        <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
          <Glyph name="zs-icon-loader" size={11} color="#FFFFFF" />
          <Glyph name="zs-icon-info"   size={11} color="#FFFFFF" />
        </span>
      </div>

      {/* Supervisor agent companion header — shared AISupervisorBar atom.
          Light tone gives the mobile companion a white surface header
          that reads cleanly against the dark phone shell. */}
      <div style={{ borderRadius: AI.radius.md, overflow: 'hidden' }}>
        <AISupervisorBar
          name={supervisorAgent.name}
          role="Supervisor"
          stat={`${supervisorAgent.tasksTracked} tasks tracked`}
          tone="light"
          avatarSize={28}
        />
      </div>

      {/* Needs Input notification */}
      <AINotification
        severity="warning"
        title="Needs Input · Task #T-3091"
        message="The Dr. Lee email needs a date confirmed before it can send. RxVantage shows June 10th open."
        variant="basic"
        layout="compact"
        attribution="Smart Assist"
        timestamp="now"
        primaryAction={{ label: 'Use June 10th', onClick: onUseSuggestion }}
        secondaryAction={{ label: 'Reply…', onClick: onReply }}
      />

      {/* Proactive insight notification */}
      <AINotification
        severity="opportunity"
        title="Insight · Outreach at risk"
        message="Dr. Smith hasn't opened 3 emails about Lectrazine. Schedule a visit?"
        variant="basic"
        layout="compact"
        attribution="Smart Assist"
        timestamp="2m ago"
        primaryAction={{ label: 'Approve visit', onClick: onApproveVisit }}
        secondaryAction={{ label: 'Dismiss',     onClick: onDismiss }}
      />

      <div style={{ flex: 1 }} />

      {/* Footer — inline-resolution affordance hint */}
      <div style={{
        textAlign: 'center', color: 'rgba(255,255,255,0.55)',
        ...AI_TYPOGRAPHY['@ai-meta-label'],
      }}>
        Resolutions sync back to your desktop task registry.
      </div>
    </div>
  );
}

export default AIAgentTaskTrackerMobile;
