import React from 'react';
import { F, AI, ZS_ORANGE } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIMessageHeader } from '../../atomic/ai-message-header/AIMessageHeader';
import { AIMessageBody } from '../../atomic/ai-message-body/AIMessageBody';
import { AIMessageFooter, FooterAction } from '../../atomic/ai-message-footer/AIMessageFooter';
import { AIResponseFooter, AISource } from '../../molecules/ai-response-footer/AIResponseFooter';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AgentResponseVariant = 'default' | 'with-actions' | 'with-alert' | 'with-footer' | 'notification';

export interface AIAgentResponseGroupProps {
  agentLabel?:     string;
  timestamp?:      string;
  children?:       React.ReactNode;
  variant?:        AgentResponseVariant;
  // 'with-alert' sub-header
  alertLabel?:     string;
  // 'with-actions' + 'with-alert'
  primaryAction?:  { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  // 'with-footer'
  sources?:        AISource[];
  showFeedback?:   boolean;
  onFeedback?:     (v: 'up' | 'down') => void;
}

/** Demo body copy for bare mounts / galleries. */
export const SAMPLE_AGENT_RESPONSE_CHILDREN =
  'I reviewed Mid-Atlantic coverage and found three territories with declining call frequency. Rebalancing two FTEs recovers roughly 9% reach.';

export const SAMPLE_PRIMARY_ACTION = { label: 'Approve plan', onClick: () => undefined };
export const SAMPLE_SECONDARY_ACTION = { label: 'Revise', onClick: () => undefined };

// ── Alert sub-row ─────────────────────────────────────────────────────────────

function AlertRow({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'var(--ai-signal-surface)',
      border: `1px solid var(--ai-signal-border)`,
      borderRadius: AI.radius.xs,
      padding: '6px 10px',
      marginBottom: '2px',
    }}>
      {/* Orange alert circle icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke={ZS_ORANGE[60]} strokeWidth="1.5" />
        <line x1="8" y1="5" x2="8" y2="8.5" stroke={ZS_ORANGE[60]} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.75" fill={ZS_ORANGE[60]} />
      </svg>
      <span style={{
        ...AI_TYPOGRAPHY['@zsai-agent-name'],
        fontFamily: F,
        fontWeight: 600,
        color: ZS_ORANGE[70],
      }}>
        {label}
      </span>
    </div>
  );
}

// ── Action footer row ─────────────────────────────────────────────────────────

function ActionRow({
  primary,
  secondary,
}: {
  primary?:   { label: string; onClick?: () => void };
  secondary?: { label: string; onClick?: () => void };
}) {
  const actions: FooterAction[] = [];
  if (primary)   actions.push({ label: primary.label,   variant: 'primary',   onClick: primary.onClick   ?? (() => {}) });
  if (secondary) actions.push({ label: secondary.label, variant: 'secondary', onClick: secondary.onClick ?? (() => {}) });
  if (actions.length === 0) return null;
  return (
    <div style={{ paddingTop: '4px' }}>
      <AIMessageFooter actions={actions} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AIAgentResponseGroup({
  agentLabel      = 'AI Agent',
  timestamp       = 'Just now',
  children        = SAMPLE_AGENT_RESPONSE_CHILDREN,
  variant         = 'with-actions',
  alertLabel      = 'Heads up',
  primaryAction   = SAMPLE_PRIMARY_ACTION,
  secondaryAction = SAMPLE_SECONDARY_ACTION,
  sources         = [],
  showFeedback    = false,
  onFeedback      = () => undefined,
}: AIAgentResponseGroupProps) {

  const isNotification = variant === 'notification';
  const showAlert      = variant === 'with-alert';
  const showActions    = variant === 'with-actions' || variant === 'with-alert' || isNotification;
  const showFooter     = variant === 'with-footer';

  // Notification variant uses orange-tinted card surface
  const cardBg     = isNotification ? ZS_ORANGE['00'] : 'var(--ai-card-bg-raised)';
  const cardBorder = isNotification ? ZS_ORANGE[20]   : '#A6B4FC';

  return (
    <div
      role="region"
      aria-label={`${agentLabel} message`}
      style={{ width: '100%', boxSizing: 'border-box', fontFamily: F, display: 'flex', flexDirection: 'column', gap: '6px' }}
    >
      {/* Header sits outside and above the card */}
      <AIMessageHeader agentLabel={agentLabel} timestamp={timestamp} />

      {/* Card body */}
      <div style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: `0 ${AI.radius.md} ${AI.radius.md} ${AI.radius.md}`,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {/* Notification label — inline, no pill background */}
        {isNotification && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke={ZS_ORANGE[60]} strokeWidth="1.5" />
              <line x1="8" y1="5" x2="8" y2="8.5" stroke={ZS_ORANGE[60]} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill={ZS_ORANGE[60]} />
            </svg>
            <span style={{
              ...AI_TYPOGRAPHY['@zsai-agent-name'],
              fontFamily: F,
              fontWeight: 600,
              color: ZS_ORANGE[70],
            }}>
              {alertLabel}
            </span>
          </div>
        )}

        {/* Alert sub-row pill — 'with-alert' only */}
        {showAlert && <AlertRow label={alertLabel} />}

        {/* Body */}
        <AIMessageBody>{children}</AIMessageBody>
      </div>

      {/* Action buttons sit outside below the card */}
      {showActions && (
        <ActionRow primary={primaryAction} secondary={secondaryAction} />
      )}

      {/* Response footer sits outside below the card */}
      {showFooter && (
        <AIResponseFooter
          sources={sources}
          showFeedback={showFeedback}
          showDivider={false}
          onFeedback={onFeedback}
        />
      )}
    </div>
  );
}

export default AIAgentResponseGroup;
