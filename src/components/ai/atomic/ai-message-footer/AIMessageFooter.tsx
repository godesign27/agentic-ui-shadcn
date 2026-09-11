import React, { useState } from 'react';
import { F, AI, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type FooterActionVariant = 'primary' | 'secondary' | 'ghost';

export interface FooterAction {
  label:    string;
  variant:  FooterActionVariant;
  onClick:  () => void;
  disabled?: boolean;
}

export interface AIMessageFooterProps {
  actions:  FooterAction[];
  visible?: boolean;
}

// Tier 3 tokens — ai-message-footer.*
// ai-message-footer.primary.background  → AI.gradient.action.full / AI.color.action.primaryActive (hover)
// ai-message-footer.primary.color       → AI.color.text.onAction
// ai-message-footer.primary.shadow      → AI.shadow.action.default
// ai-message-footer.secondary.border    → ZDS.border
// ai-message-footer.secondary.color     → ZDS.textDefault
// ai-message-footer.ghost.color         → ZDS.textDisabled

function PrimaryButton({ action }: { action: FooterAction }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={action.onClick}
      disabled={action.disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, minWidth: '140px',
        padding: '8px 12px',
        background: hov ? AI.color.action.primaryActive : AI.gradient.action.full,
        color: AI.color.text.onAction,
        border: 'none',
        borderRadius: AI.radius.md,
        cursor: action.disabled ? 'not-allowed' : 'pointer',
        ...AI_TYPOGRAPHY['@zsai-agent-name'],  // 11/600/1.0 — primary keeps weight 600 (exact match)
        fontFamily: F,
        transition: 'background 0.15s',
        boxShadow: hov ? 'none' : `0 2px 8px ${AI.shadow.action.default}`,
        opacity: action.disabled ? 0.5 : 1,
      }}
    >
      {action.label}
    </button>
  );
}

function SecondaryButton({ action }: { action: FooterAction }) {
  return (
    <button
      onClick={action.onClick}
      disabled={action.disabled}
      style={{
        padding: '8px 14px',
        background: 'transparent',
        color: 'var(--ai-zds-text)',
        border: '1px solid var(--ai-btn-outline-border)',
        borderRadius: AI.radius.md,
        cursor: action.disabled ? 'not-allowed' : 'pointer',
        ...AI_TYPOGRAPHY['@zsai-agent-name'], fontWeight: 500,  // 11/500/1.0 — secondary overrides weight only
        fontFamily: F,
        opacity: action.disabled ? 0.5 : 1,
      }}
    >
      {action.label}
    </button>
  );
}

function GhostButton({ action }: { action: FooterAction }) {
  return (
    <button
      onClick={action.onClick}
      disabled={action.disabled}
      style={{
        padding: '8px 6px',
        background: 'none',
        color: ZDS.textDisabled,
        border: 'none',
        cursor: action.disabled ? 'not-allowed' : 'pointer',
        ...AI_TYPOGRAPHY['@zsai-agent-name'], fontWeight: 400,  // 11/400/1.0 — ghost overrides weight only
        fontFamily: F,
        opacity: action.disabled ? 0.4 : 1,
      }}
    >
      {action.label}
    </button>
  );
}

export function AIMessageFooter({ actions, visible = true }: AIMessageFooterProps) {
  if (!visible || actions.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '0 0 10px',
    }}>
      {actions.map((action, i) => {
        if (action.variant === 'primary')   return <PrimaryButton   key={i} action={action} />;
        if (action.variant === 'secondary') return <SecondaryButton key={i} action={action} />;
        return <GhostButton key={i} action={action} />;
      })}
    </div>
  );
}

export default AIMessageFooter;
