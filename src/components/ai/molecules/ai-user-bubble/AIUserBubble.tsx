import React from 'react';
import { F, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type UserBubbleSize    = 'default' | 'medium';
export type UserBubbleVariant = 'light' | 'dark';

export interface AIUserBubbleProps {
  text:     string;
  /** 'default' = @ai-bubble-body (16px). 'medium' = one level down, @ai-body-small (14px). */
  size?:    UserBubbleSize;
  /** 'light' = gray surface for dark/dark-ish backgrounds (default). 'dark' = deep indigo fill for use on light backgrounds. */
  variant?: UserBubbleVariant;
}

// User message bubble — right-aligned, two surface variants.
export function AIUserBubble({ text, size = 'default', variant = 'light' }: AIUserBubbleProps) {
  const typography = size === 'medium'
    ? AI_TYPOGRAPHY['@ai-body-small']
    : AI_TYPOGRAPHY['@ai-bubble-body'];

  // Dark variant reads AI brand tokens (no hardcoded hex) so it re-themes with
  // the ai-tokens ramp — same brand-ink surface used by the dark Agent Drawer header.
  const bg    = variant === 'dark' ? AI.color.brandInk        : 'var(--ai-bubble-user-bg)';
  const color = variant === 'dark' ? AI.color.text.onAction   : 'var(--ai-bubble-user-text)';

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'ai-in 0.2s ease both' }}>
      <div style={{
        maxWidth: '82%',
        background: bg,
        color,
        padding: '10px 14px',
        borderRadius: '14px 14px 4px 14px',
        ...typography,
        fontFamily: F,
      }}>
        {text}
      </div>
    </div>
  );
}
