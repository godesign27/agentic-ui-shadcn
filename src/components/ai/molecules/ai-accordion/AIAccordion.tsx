import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip, type BriefChipStatus } from '../../atomic/ai-chip/AIChip';

export interface AIAccordionItemProps {
  /** Header title — primary label. */
  title: string;
  /** Optional secondary line under the title (e.g. "Task Brief"). */
  subtitle?: string;
  /** Optional leading slot — icon, AIAvatar, etc. */
  icon?: React.ReactNode;
  /** Optional trailing brief-status chip. When set, renders an <AIChip kind="brief">. */
  status?: BriefChipStatus;
  /** Start expanded. */
  defaultExpanded?: boolean;
  /** Disclosure body. */
  children: React.ReactNode;
}

export interface AIAccordionProps {
  /** Stacked mode — render an independent disclosure per item. */
  items?: AIAccordionItemProps[];
  /** Single-item mode (ignored when `items` is provided). */
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: BriefChipStatus;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
  /** Chevron side. Defaults to `right` to match the AI Card Brief. */
  caret?: 'left' | 'right';
  /** Corner radius token. Defaults to `lg` (20px). */
  radius?: keyof typeof AI.radius;
  /**
   * Stacked-mode only. When `true`, only one item can be open at a time —
   * opening one collapses the others (radio-style). Defaults to `false`
   * (each item toggles independently).
   */
  singleOpen?: boolean;
}

// ── Single disclosure ────────────────────────────────────────────────────────

function AIAccordionItem({
  title, subtitle, icon, status, defaultExpanded = false, children,
  caret = 'right', radius = 'lg', open: openProp, onToggle,
}: AIAccordionItemProps & {
  caret?: 'left' | 'right';
  radius?: keyof typeof AI.radius;
  /** Controlled open state (single-open group mode). Omit for self-managed. */
  open?: boolean;
  onToggle?: () => void;
}) {
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultExpanded);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openUncontrolled;
  const toggle = () => {
    if (isControlled) onToggle?.();
    else setOpenUncontrolled((v) => !v);
  };
  const [focused, setFocused] = useState(false);
  const panelId = useId();

  const chevron = (
    <ChevronDown
      aria-hidden="true"
      size={18}
      strokeWidth={2}
      style={{
        flexShrink: 0,
        color: AI.color.brand,
        transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
        transition: 'transform .2s ease-out',
      }}
    />
  );

  return (
    <div
      role="region"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: AI.radius[radius],
        overflow: 'hidden',
        fontFamily: DS.font,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 18px',
          cursor: 'pointer',
          background: open ? 'var(--ai-card-bg-raised)' : 'transparent',
          borderBottom: open ? '1px solid var(--ai-card-border)' : '1px solid transparent',
          outline: 'none',
          boxShadow: focused ? `0 0 0 2px var(--ai-card-bg), 0 0 0 4px ${AI.color.border.focus}` : 'none',
          position: 'relative',
          zIndex: focused ? 1 : undefined,
          transition: 'background .2s ease-out',
        }}
      >
        {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
        {caret === 'left' && chevron}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: 'var(--ai-ds-text)' }}>{title}</div>
          {subtitle && (
            <div style={{ ...AI_TYPOGRAPHY['@ai-agent-name'], color: 'var(--ai-ds-helper)' }}>{subtitle}</div>
          )}
        </div>
        {status && <AIChip kind="brief" status={status} label={status.replace(/-/g, ' ')} size="sm" />}
        {caret === 'right' && chevron}
      </div>

      {open && (
        <div
          id={panelId}
          role="region"
          style={{ padding: '18px 20px', ...AI_TYPOGRAPHY['@ai-body'], color: 'var(--ai-ds-text)' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ── Public component ─────────────────────────────────────────────────────────

export function AIAccordion({
  items,
  title,
  subtitle,
  icon,
  status,
  defaultExpanded,
  children,
  caret = 'right',
  radius = 'lg',
  singleOpen = false,
}: AIAccordionProps) {
  // Single-open group state — the index of the currently open item, or -1.
  // Seeded from the first item that requests `defaultExpanded`.
  const [openIndex, setOpenIndex] = useState(() =>
    singleOpen && items ? items.findIndex((it) => it.defaultExpanded) : -1,
  );

  if (items && items.length > 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        {items.map((item, i) =>
          singleOpen ? (
            <AIAccordionItem
              key={`${item.title}-${i}`}
              {...item}
              caret={caret}
              radius={radius}
              open={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
            />
          ) : (
            <AIAccordionItem key={`${item.title}-${i}`} {...item} caret={caret} radius={radius} />
          ),
        )}
      </div>
    );
  }

  return (
    <AIAccordionItem
      title={title ?? ''}
      subtitle={subtitle}
      icon={icon}
      status={status}
      defaultExpanded={defaultExpanded}
      caret={caret}
      radius={radius}
    >
      {children}
    </AIAccordionItem>
  );
}

export default AIAccordion;
