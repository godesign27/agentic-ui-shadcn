import React from 'react';
import { F, AI } from '../../tokens/ai-tokens';
import { AIMessageHeader } from '../ai-message-header/AIMessageHeader';
import { AIMessageBody } from '../ai-message-body/AIMessageBody';

export interface AIAgentResponseProps {
  agentLabel?: string;
  timestamp?:  string;
  size?:       'sm' | 'md';
  children:    React.ReactNode;
  dark?:       boolean;
}

export function AIAgentResponse({
  agentLabel = 'AI Agent',
  timestamp  = 'Just now',
  size       = 'md',
  children,
  dark       = false,
}: AIAgentResponseProps) {
  // Dark surface variant — token-based. Light variant keeps the raised card bg
  // and the ZSAI-30 brand border; dark variant uses the deep brand ink surface.
  const surface = dark
    ? {
        background: AI.color.brandInk,                          // #1F2A66
        border: `1px solid var(--ai-agent-response-border-dark, ${AI.color.brand})`, // #4D60E6
        color: AI.color.text.onAction,                         // #FFFFFF
      }
    : {
        background: 'var(--ai-card-bg-raised)',
        border: '1px solid var(--ai-agent-response-border, #A6B4FC)', // ZSAI-30; hex preserved as fallback (visual unchanged)
      };

  return (
    <div
      role="region"
      aria-label={`${agentLabel} message`}
      style={{ width: '100%', boxSizing: 'border-box', fontFamily: F, display: 'flex', flexDirection: 'column', gap: '6px' }}
    >
      {/* Header sits outside and above the card */}
      <AIMessageHeader agentLabel={agentLabel} timestamp={timestamp} size={size} />

      <div style={{
        ...surface,
        borderRadius: `0 ${AI.radius.md} ${AI.radius.md} ${AI.radius.md}`,
        padding: '14px 16px',
      }}>
        <AIMessageBody size={size === 'sm' ? 'sm' : 'md'}>
          {children}
        </AIMessageBody>
      </div>
    </div>
  );
}

export default AIAgentResponse;
