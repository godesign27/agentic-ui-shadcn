import React from 'react';
import { RiCloseLine, RiExternalLinkLine } from '@remixicon/react';
import { AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIConfidenceRiskBadge } from '../../atomic/ai-confidence-risk-badge/AIConfidenceRiskBadge';
import {
  AIPickerTrigger,
  AIPickerDensity,
  AIPickerIcon,
} from '../../atomic/ai-picker-trigger/AIPickerTrigger';
import {
  DatePanel,
  MonthGridPanel,
  MonthRangePanel,
  TimePanel,
} from './AIPickerMenus';

/**
 * AIPicker — Group
 *
 * Composes the `ai-picker-trigger` atom with an AI suggestion layer (chip /
 * panel / robust governance panel) and a calendar/time popover. Supports four
 * picker types (date, month, month-range, time) × four density variants
 * (basic, simple, rich, robust).
 *
 * Core principle: AI suggests, human decides. A suggestion is never
 * auto-applied — the user must explicitly Apply / Accept, or pick from the
 * popover.
 *
 * Popovers: all menus (date / month / month-range / time) are neutral-chrome
 * panels from ./AIPickerMenus — no teal. Selected states fill with ZDS dark
 * gray (#1A1628); selected day cells are circles.
 */

const F = '"Open Sans", sans-serif';

// ── Types ────────────────────────────────────────────────────────────────────
export type AIPickerType = 'date' | 'month' | 'month-range' | 'time';
export type { AIPickerDensity };

export interface AISuggestion {
  value: string;
  rationale: string;
  source?: string;
  confidence: 'high' | 'medium' | 'low';
  auditTrailUrl?: string;
}

export interface AIPickerProps {
  type: AIPickerType;
  density: AIPickerDensity;
  label: string;
  value?: string;
  placeholder?: string;
  suggestion?: AISuggestion;
  onAccept?: (value: string) => void;
  onReject?: () => void;
  onCustomize?: () => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
  state?: 'default' | 'error';
  errorMessage?: string;
  /** Start the popover open (used for gallery/preview states). */
  defaultOpen?: boolean;
}

const ICON_BY_TYPE: Record<AIPickerType, AIPickerIcon> = {
  'date': 'calendar',
  'month': 'calendar',
  'month-range': 'calendar-range',
  'time': 'clock',
};

// ── Sparkle glyph ────────────────────────────────────────────────────────────
function Sparkle({ size = 14, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 0.5L7.2 4.05L10.8 5.25L7.2 6.45L6 10L4.8 6.45L1.2 5.25L4.8 4.05L6 0.5Z" fill={color ?? 'currentColor'} />
    </svg>
  );
}

// ── Shared button styles ─────────────────────────────────────────────────────
function AcceptButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: AI.radius.sm,
        background: AI.color.action.primary,
        border: 'none',
        color: AI.color.text.onAction,
        fontFamily: F,
        cursor: 'pointer',
        ...AI_TYPOGRAPHY['@zsai-button-label'],
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, tone = 'neutral' }: { children: React.ReactNode; onClick?: () => void; tone?: 'neutral' | 'danger' }) {
  const color = tone === 'danger' ? 'var(--ai-status-error-text, #C0392B)' : 'var(--ai-zds-helper, #5b5864)';
  const border = tone === 'danger' ? 'var(--ai-status-error-border, #E74C3C)' : 'var(--ai-divider, #D9D8DC)';
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: AI.radius.sm,
        background: 'transparent',
        border: `1px solid ${border}`,
        color,
        fontFamily: F,
        cursor: 'pointer',
        ...AI_TYPOGRAPHY['@zsai-button-label'],
      }}
    >
      {children}
    </button>
  );
}

function TextLink({ children, href, external }: { children: React.ReactNode; href?: string; external?: boolean }) {
  return (
    <a
      href={href ?? '#'}
      onClick={(e) => { if (!href) e.preventDefault(); }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        color: AI.color.text.secondary,
        textDecoration: 'underline',
        fontFamily: F,
        ...AI_TYPOGRAPHY['@zsai-body-small'],
        fontWeight: 600,
      }}
    >
      {children}
      {external && <RiExternalLinkLine size={13} />}
    </a>
  );
}

// ── Suggestion layers ────────────────────────────────────────────────────────
function AISuggestionChip({ suggestion, onApply, onDismiss }: { suggestion: AISuggestion; onApply: () => void; onDismiss: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 2 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ai-zds-helper, #5b5864)', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-body-small'] }}>
        <Sparkle size={13} color={AI.color.brand} />
        AI suggests: <strong style={{ color: 'var(--ai-zds-text, #2f2c3c)', fontWeight: 700 }}>{suggestion.value}</strong>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={onApply} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: AI.color.text.secondary, fontFamily: F, fontWeight: 700, ...AI_TYPOGRAPHY['@zsai-body-small'] }}>
          Apply
        </button>
        <button type="button" onClick={onDismiss} aria-label="Dismiss suggestion" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ai-zds-helper, #716e79)', display: 'inline-flex' }}>
          <RiCloseLine size={15} />
        </button>
      </span>
    </div>
  );
}

function AISuggestionPanel({ suggestion, onAccept, onDismiss }: { suggestion: AISuggestion; onAccept: () => void; onDismiss: () => void }) {
  return (
    <div style={{ background: 'var(--ai-suggestion-bg, #F5F6FF)', border: '1px solid var(--ai-suggestion-border, #BECAFE)', borderRadius: AI.radius.sm, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Sparkle size={14} color={AI.color.brand} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ color: 'var(--ai-zds-text, #2f2c3c)', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-body-small'], fontWeight: 700 }}>
            AI suggests: {suggestion.value}
          </span>
          <span style={{ color: 'var(--ai-zds-helper, #5b5864)', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-body-small'] }}>
            {suggestion.rationale}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <AIConfidenceRiskBadge confidence={suggestion.confidence} compact />
        <span style={{ display: 'inline-flex', gap: 8 }}>
          <AcceptButton onClick={onAccept}>Accept</AcceptButton>
          <GhostButton onClick={onDismiss}>Dismiss</GhostButton>
        </span>
      </div>
    </div>
  );
}

function AISuggestionPanelRobust({ suggestion, onAccept, onReject, onCustomize }: { suggestion: AISuggestion; onAccept: () => void; onReject: () => void; onCustomize: () => void }) {
  return (
    <div style={{ background: 'var(--ai-suggestion-bg, #F5F6FF)', border: '1px solid var(--ai-suggestion-border, #BECAFE)', borderRadius: AI.radius.sm, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Sparkle size={14} color={AI.color.brand} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ color: 'var(--ai-zds-text, #2f2c3c)', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-body-small'], fontWeight: 700 }}>
            AI suggests: {suggestion.value}
          </span>
          <span style={{ color: 'var(--ai-zds-helper, #5b5864)', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-body-small'] }}>
            {suggestion.rationale}
          </span>
          {suggestion.source && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 2, color: 'var(--ai-zds-helper, #716e79)', fontFamily: F, ...AI_TYPOGRAPHY['@zsai-caption-1'] }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                <path d="M6 3.4V6l1.6 1.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Source: {suggestion.source}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'inline-flex', gap: 16 }}>
        <TextLink>Why this?</TextLink>
        <TextLink href={suggestion.auditTrailUrl} external>View audit trail</TextLink>
      </div>

      <div style={{ height: 1, background: 'var(--ai-suggestion-border, #BECAFE)' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <AIConfidenceRiskBadge confidence={suggestion.confidence} compact />
        <span style={{ display: 'inline-flex', gap: 8 }}>
          <AcceptButton onClick={onAccept}>Accept</AcceptButton>
          <GhostButton onClick={onReject} tone="danger">Reject</GhostButton>
          <GhostButton onClick={onCustomize}>Customize</GhostButton>
        </span>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function AIPicker({
  type,
  density,
  label,
  value = '',
  placeholder,
  suggestion,
  onAccept,
  onReject,
  onCustomize,
  onChange,
  disabled = false,
  state = 'default',
  errorMessage,
  defaultOpen = false,
}: AIPickerProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [current, setCurrent] = React.useState(value);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => { setCurrent(value); }, [value]);

  // Compliance rule 4: robust density requires an audit trail URL.
  React.useEffect(() => {
    if (density === 'robust' && suggestion && !suggestion.auditTrailUrl) {
      console.warn('[AIPicker] robust density requires suggestion.auditTrailUrl for the audit link.');
    }
  }, [density, suggestion]);

  function selectValue(v: string) {
    setCurrent(v);
    onChange?.(v);
    setOpen(false);
  }

  function accept() {
    if (!suggestion) return;
    setCurrent(suggestion.value);
    onAccept?.(suggestion.value);
    onChange?.(suggestion.value);
  }

  // Density gating: basic never shows a suggestion layer; disabled suppresses all AI signals.
  const showSuggestion = !!suggestion && !dismissed && !disabled && density !== 'basic';
  const triggerState: 'default' | 'error' | 'disabled' = disabled ? 'disabled' : state === 'error' ? 'error' : 'default';

  const labelRowAside =
    density === 'robust' && suggestion && !disabled
      ? <AIConfidenceRiskBadge confidence={suggestion.confidence} compact />
      : undefined;

  function renderPopover() {
    if (disabled) return null;
    switch (type) {
      case 'date':
        return <DatePanel value={current} onSelect={selectValue} onCancel={() => setOpen(false)} />;
      case 'month':
        return <MonthGridPanel value={current} onSelect={selectValue} />;
      case 'month-range':
        return <MonthRangePanel onSelect={selectValue} />;
      case 'time':
        return <TimePanel value={current} onSelect={selectValue} onCancel={() => setOpen(false)} />;
      default:
        return null;
    }
  }

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, width: '100%', fontFamily: F }}>
      <AIPickerTrigger
        label={label}
        value={current}
        placeholder={placeholder}
        icon={ICON_BY_TYPE[type]}
        density={density}
        state={open && !disabled ? 'focused' : triggerState === 'default' && current ? 'selected' : triggerState}
        errorMessage={errorMessage}
        labelRowAside={labelRowAside}
        onClick={() => setOpen((o) => !o)}
      />

      {/* Expanded menu — sits directly under the field, right-aligned to the
          field's edge (below the trailing icon), and pushes the AI suggestion
          layer down (consistent across all picker types). */}
      {open && !disabled && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {renderPopover()}
        </div>
      )}

      {/* Suggestion layer */}
      {showSuggestion && suggestion && density === 'simple' && (
        <AISuggestionChip suggestion={suggestion} onApply={accept} onDismiss={() => setDismissed(true)} />
      )}
      {showSuggestion && suggestion && density === 'rich' && (
        <AISuggestionPanel suggestion={suggestion} onAccept={accept} onDismiss={() => setDismissed(true)} />
      )}
      {showSuggestion && suggestion && density === 'robust' && (
        <AISuggestionPanelRobust
          suggestion={suggestion}
          onAccept={accept}
          onReject={() => { setDismissed(true); onReject?.(); }}
          onCustomize={() => { setOpen(true); onCustomize?.(); }}
        />
      )}
    </div>
  );
}

export default AIPicker;
