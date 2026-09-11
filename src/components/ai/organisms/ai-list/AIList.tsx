import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import { F, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIListItem, AIListItemProps } from '../../molecules/ai-list-item/AIListItem';

export type AIListLayout = 'stack' | 'grid' | 'compact';
export type AIListStatus = 'default' | 'loading' | 'empty' | 'updating' | 'dataStale' | 'error' | 'noChanges';

export interface AIListProps {
  title:        string;
  icon?:        React.ReactNode;
  intro?:       string;
  items:        AIListItemProps[];
  layout?:      AIListLayout;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  status?:      AIListStatus;
  count?:       number;
  emptyMessage?: string;
  footerAction?: { label: string; onClick?: () => void };
  onToggle?:    (collapsed: boolean) => void;
  onItemOpen?:  (item: AIListItemProps, index: number) => void;
  tone?:        'ai' | 'tan' | 'neutral';
}

export function AIList({
  title,
  icon,
  intro,
  items,
  layout = 'stack',
  collapsible = false,
  defaultCollapsed = false,
  status = 'default',
  count,
  emptyMessage = 'No items to show.',
  footerAction,
  onToggle,
  onItemOpen,
  tone = 'ai',
}: AIListProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsible && collapsed;

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onToggle?.(next);
  };

  const resolvedCount = count ?? items.length;

  const HeaderTag = (collapsible ? 'button' : 'div') as 'button';

  return (
    <section style={{ fontFamily: F }}>
      {/* Header */}
      <HeaderTag
        type={collapsible ? 'button' : undefined}
        onClick={collapsible ? toggle : undefined}
        aria-expanded={collapsible ? !isCollapsed : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          marginBottom: intro ? 6 : 12,
          cursor: collapsible ? 'pointer' : 'default',
          textAlign: 'left',
          color: 'inherit',
          fontFamily: 'inherit',
        }}
      >
        {icon && (
          <span aria-hidden="true" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 24, height: 24,
            color: AI.color.action.primary,
          }}>
            {icon}
          </span>
        )}
        <h2 style={{
          margin: 0,
          ...AI_TYPOGRAPHY['@ai-h4'],
          color: 'var(--ai-ds-text)',
        }}>
          {title}
        </h2>
        {typeof resolvedCount === 'number' && (
          <span style={{
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            color: 'var(--ai-ds-helper)',
            padding: '2px 8px',
            background: 'var(--ai-card-bg-raised)',
            border: '1px solid var(--ai-card-border)',
            borderRadius: AI.radius.full,
          }}>{resolvedCount}</span>
        )}
        <span style={{ flex: 1 }} />
        {collapsible && (
          <span aria-hidden="true" style={{ color: 'var(--ai-ds-helper)' }}>
            {isCollapsed ? <RiArrowDownSLine size={18} /> : <RiArrowUpSLine size={18} />}
          </span>
        )}
      </HeaderTag>

      {/* Intro narrative */}
      {intro && !isCollapsed && (
        <p style={{
          margin: '0 0 14px',
          ...AI_TYPOGRAPHY['@ai-section-subtitle'],
          color: 'var(--ai-ds-helper)',
          maxWidth: 720,
        }}>
          {intro}
        </p>
      )}

      {/* Body */}
      {!isCollapsed && (
        <>
          {status === 'loading' && (
            <div style={{
              padding: 24, textAlign: 'center',
              ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              color: 'var(--ai-ds-helper)',
              background: 'var(--ai-card-bg-raised)',
              border: '1px dashed var(--ai-card-border)',
              borderRadius: AI.radius.sm,
            }}>Generating briefing…</div>
          )}

          {status === 'empty' && (
            <div style={{
              padding: 24,
              ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              color: 'var(--ai-ds-helper)',
              background: 'var(--ai-card-bg-raised)',
              border: '1px dashed var(--ai-card-border)',
              borderRadius: AI.radius.sm,
              textAlign: 'center',
            }}>{emptyMessage}</div>
          )}

          {status === 'error' && (
            <div style={{
              padding: 16,
              ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              color: 'var(--ai-status-error-text)',
              background: 'var(--ai-status-error-bg)',
              border: '1px solid var(--ai-status-error-border)',
              borderRadius: AI.radius.sm,
            }}>This section couldn't be generated. Try again.</div>
          )}

          {(status === 'default' || status === 'updating' || status === 'dataStale' || status === 'noChanges') && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
              gap: layout === 'compact' ? 8 : 12,
              opacity: status === 'updating' ? 0.7 : 1,
              transition: 'opacity 0.15s ease',
            }}>
              {items.length === 0 && (
                <div style={{
                  padding: 16,
                  ...AI_TYPOGRAPHY['@ai-section-subtitle'],
                  color: 'var(--ai-ds-helper)',
                  background: 'var(--ai-card-bg-raised)',
                  border: '1px dashed var(--ai-card-border)',
                  borderRadius: AI.radius.sm,
                  textAlign: 'center',
                }}>{status === 'noChanges' ? 'No major changes since you last looked.' : emptyMessage}</div>
              )}
              {items.map((item, i) => (
                <AIListItem
                  key={i}
                  {...item}
                  tone={item.tone ?? tone}
                  onClick={item.onClick ?? (onItemOpen ? () => onItemOpen(item, i) : undefined)}
                />
              ))}
            </div>
          )}

          {status === 'dataStale' && (
            <div style={{
              marginTop: 10,
              ...AI_TYPOGRAPHY['@ai-meta-label'],
              color: 'var(--ai-status-warning-text)',
            }}>Data may be stale. Refresh to get the latest signals.</div>
          )}

          {footerAction && (
            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                onClick={footerAction.onClick}
                style={{
                  ...AI_TYPOGRAPHY['@ai-button-label'],
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: AI.color.action.primary,
                }}
              >
                {footerAction.label} →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default AIList;
