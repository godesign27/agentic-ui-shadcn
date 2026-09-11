import React from 'react';
import { AI } from '../../tokens/ai-tokens';

export type AgentStatus = 'active' | 'waiting' | 'complete' | 'error';

export interface Agent {
  id: string;
  label: string;
  status: AgentStatus;
}

export interface AIAgentStackProps {
  agents: Agent[];
  maxVisible?: number;
  size?: number;
}

const STATUS_RING: Record<AgentStatus, string> = {
  active:   AI.color.brand,
  waiting:  'var(--ai-card-border)',
  complete: '#27AE60',
  error:    '#E74C3C',
};

const STATUS_BG: Record<AgentStatus, string> = {
  active:   'var(--ai-brand-surface)',
  waiting:  'var(--ai-confidence-track)',
  complete: 'rgba(39,174,96,0.08)',
  error:    'rgba(231,76,60,0.08)',
};

function getInitials(label: string): string {
  return label
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AIAgentStack({ agents, maxVisible = 3, size = 28 }: AIAgentStackProps) {
  const visible = agents.slice(0, maxVisible);
  const overflow = agents.length - maxVisible;
  const offset = Math.round(size * 0.45);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          position: 'relative' as const,
          height: size,
          width: visible.length * (size - offset) + offset + (overflow > 0 ? size - offset : 0),
        }}
      >
        {visible.map((agent, i) => (
          <span
            key={agent.id}
            title={`${agent.label} — ${agent.status}`}
            style={{
              position: 'absolute' as const,
              left: i * (size - offset),
              width: size,
              height: size,
              borderRadius: '50%',
              background: STATUS_BG[agent.status],
              border: `2px solid ${STATUS_RING[agent.status]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: Math.round(size * 0.32),
              color: 'var(--ai-brand-text)',
              zIndex: visible.length - i,
              boxSizing: 'border-box' as const,
              userSelect: 'none' as const,
            }}
          >
            {getInitials(agent.label)}
          </span>
        ))}
        {overflow > 0 && (
          <span
            style={{
              position: 'absolute' as const,
              left: visible.length * (size - offset),
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'var(--ai-confidence-track)',
              border: '2px solid var(--ai-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: Math.round(size * 0.30),
              color: 'var(--ai-brand-text)',
              zIndex: 0,
              boxSizing: 'border-box' as const,
            }}
          >
            +{overflow}
          </span>
        )}
      </span>
    </span>
  );
}

export default AIAgentStack;
