import React from 'react';
import { F, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { BotAvatar } from '../ai-avatar/AIAvatar';

export interface AIMessageHeaderProps {
  agentLabel: string;
  timestamp?: string;
  size?: 'sm' | 'md';
}

export function AIMessageHeader({ agentLabel, timestamp = 'Just now', size = 'md' }: AIMessageHeaderProps) {
  const avatarSize  = size === 'sm' ? 14 : 16;
  // md = @zsai-agent-name (12/600/1.0). Per typography.md 12px floor, sm also
  // uses 12/600 (no smaller variant permitted below the floor).
  const labelStyle  = size === 'sm'
    ? { fontSize: 12, fontWeight: 600 as const }
    : AI_TYPOGRAPHY['@zsai-agent-name'];
  const timestampSz = size === 'sm' ? '12px' : '12px';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      <BotAvatar size={avatarSize} />
      <span style={{
        ...labelStyle,
        color: 'var(--ai-zds-helper)', fontFamily: F,
      }}>
        {agentLabel}
      </span>
      {timestamp && (
        <span style={{
          fontSize: timestampSz, color: 'var(--ai-zds-helper)',
          fontFamily: F, marginLeft: 'auto',
        }}>
          {timestamp}
        </span>
      )}
    </div>
  );
}

export default AIMessageHeader;
