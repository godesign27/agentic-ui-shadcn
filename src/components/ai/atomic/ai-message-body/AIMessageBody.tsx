import React from 'react';
import { F, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export interface AIMessageBodyProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

// md resolves through @zsai-bubble-body (16/400/1.55) — the conversational message token.
// sm/lg keep their 14/18 footprints (no canonical token) but inherit weight/line-height from bubble-body for consistency.
const SIZE_STYLE = {
  sm: { ...AI_TYPOGRAPHY['@zsai-bubble-body'], fontSize: 14 },
  md: AI_TYPOGRAPHY['@zsai-bubble-body'],
  lg: { ...AI_TYPOGRAPHY['@zsai-bubble-body'], fontSize: 18 },
} as const;

export function AIMessageBody({ children, size = 'md' }: AIMessageBodyProps) {
  return (
    <p style={{
      margin: 0,
      ...SIZE_STYLE[size],
      fontFamily: F,
      color: 'var(--ai-zds-text)',
    }}>
      {children}
    </p>
  );
}

export default AIMessageBody;
