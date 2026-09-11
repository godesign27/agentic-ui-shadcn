/**
 * AISourceAccordion — ZAIDYN Agentic AI Group
 *
 * Question-scoped, collapsible multi-select surface. Wraps a stack of
 * selectable AISourceTile rows under a header that pairs the question with
 * a live "N selected" pill, and optionally exposes a free-text input row +
 * a Continue CTA below the list.
 *
 * Used for agent decision prompts:
 *   "Which brand(s) is this campaign for?"
 *   "Which sources should the agent draw from?"
 *   "Which capabilities should this run enable?"
 *
 * Composition:
 *   - Collapsible header (chevron + question + selected count pill)
 *   - AISourceTileList variant="grouped" — one row per option
 *   - Optional free-text add-your-own row (selectable seam)
 *   - Optional AIButton size="lg" full-width CTA
 *
 * Controlled or uncontrolled — pass `selectedIds` + `onChange` to control,
 * or omit both and let the accordion manage its own state.
 */

import React from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AISourceTile, AISourceTileList, type AISourceTileTone } from '../../atomic/ai-source-tile/AISourceTile';
import { AIButton } from '../../atomic/ai-button/AIButton';

export interface AISourceAccordionOption {
  id:        string;
  title:     React.ReactNode;
  subtitle?: React.ReactNode;
  rank?:     number | string;
  /** When set, the row uses this tone instead of the accordion default. */
  tone?:     AISourceTileTone;
  disabled?: boolean;
}

/** Demo source-accordion props for bare mounts / galleries. */
export const SAMPLE_SOURCE_QUESTION = 'Which brand(s) is this campaign for?';
export const SAMPLE_SOURCE_OPTIONS: AISourceAccordionOption[] = [
  { id: 'brand-a', title: 'Brand Alpha', subtitle: 'Oncology · Primary', rank: 1 },
  { id: 'brand-b', title: 'Brand Beta', subtitle: 'Cardiology · Secondary', rank: 2 },
  { id: 'brand-c', title: 'Brand Gamma', subtitle: 'Rare disease · Explore', rank: 3 },
];
export const SAMPLE_SOURCE_SELECTED_IDS = ['brand-a'];

export interface AISourceAccordionProps {
  question?:           React.ReactNode;
  options?:            AISourceAccordionOption[];
  /** Controlled selection — pass `onChange` too when using controlled mode. */
  selectedIds?:        string[];
  onChange?:           (ids: string[]) => void;
  defaultSelectedIds?: string[];
  /** Renders a free-text row at the bottom of the list (below the options).
      When the user submits, `onCustomSubmit` fires. */
  allowCustom?:        boolean;
  customPlaceholder?:  string;
  onCustomSubmit?:     (value: string) => void;
  /** CTA footer — omit to hide. */
  ctaLabel?:           string;
  onSubmit?:           (selectedIds: string[]) => void;
  defaultOpen?:        boolean;
  disabled?:           boolean;
  tone?:               AISourceTileTone;
  ariaLabel?:          string;
}

let __ID = 0;
function useUid(prefix: string) {
  const [id] = React.useState(() => `${prefix}-${++__ID}`);
  return id;
}

function Glyph({ name, size, color }: { name: string; size: number; color?: string }) {
  return (
    <span
      className="zs-master-style"
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size,
        color: color ?? 'inherit',
        flexShrink: 0, lineHeight: 0,
      }}
    >
      <i className={`zs-icon ${name}`} style={{ fontSize: size, lineHeight: 1, color: 'inherit' }} />
    </span>
  );
}

export function AISourceAccordion({
  question           = SAMPLE_SOURCE_QUESTION,
  options            = SAMPLE_SOURCE_OPTIONS,
  selectedIds:       controlledIds,
  onChange           = () => undefined,
  defaultSelectedIds = SAMPLE_SOURCE_SELECTED_IDS,
  allowCustom       = false,
  customPlaceholder = 'Or type…',
  onCustomSubmit    = () => undefined,
  ctaLabel,
  onSubmit          = () => undefined,
  defaultOpen       = true,
  disabled          = false,
  tone              = 'ai',
  ariaLabel,
}: AISourceAccordionProps) {
  const bodyId = useUid('ai-source-accordion');

  const [open, setOpen] = React.useState(defaultOpen);
  const [internalIds, setInternalIds] = React.useState<string[]>(defaultSelectedIds);
  const [customValue, setCustomValue] = React.useState('');

  const isControlled = controlledIds !== undefined;
  const selectedIds  = isControlled ? controlledIds! : internalIds;

  const setSelectedIds = (next: string[]) => {
    if (!isControlled) setInternalIds(next);
    onChange?.(next);
  };

  const toggle = (id: string) => {
    if (disabled) return;
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
  };

  const submitCustom = () => {
    const v = customValue.trim();
    if (!v || disabled) return;
    onCustomSubmit?.(v);
    setCustomValue('');
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel ?? (typeof question === 'string' ? question : undefined)}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: AI.radius.md,
        overflow: 'hidden',
        fontFamily: F,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* Header — question + selected count + chevron. Trigger toggles the body. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        disabled={disabled}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px',
          background: 'transparent', border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left' as const,
          fontFamily: F,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20,
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 180ms ease',
            color: 'var(--ai-zds-helper)',
            flexShrink: 0,
          }}
        >
          <Glyph name="zs-icon-arrow-right" size={14} color="currentColor" />
        </span>
        <span style={{
          flex: 1, minWidth: 0,
          ...AI_TYPOGRAPHY['@zsai-card-title'],
          color: 'var(--ai-zds-text)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {question}
        </span>
        {selectedIds.length > 0 && (
          <span style={{
            flexShrink: 0,
            padding: '3px 10px',
            borderRadius: 999,
            background: AI.color.brandSubtle,
            border: `1px solid ${AI.color.brandBorder}`,
            color: AI.color.text.secondary,
            ...AI_TYPOGRAPHY['@zsai-meta-label'],
            fontWeight: 700,
          }}>
            {selectedIds.length} selected
          </span>
        )}
      </button>

      {/* Body — accordion reveal. Selectable rows + optional free-text row. */}
      {open && (
        <div
          id={bodyId}
          role="region"
          style={{
            padding: '0 16px 16px',
            animation: 'ai-source-accordion-open 180ms ease',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}
        >
          <AISourceTileList variant="grouped">
            {options.map((opt) => (
              <AISourceTile
                key={opt.id}
                title={opt.title}
                subtitle={opt.subtitle}
                rank={opt.rank}
                tone={opt.tone ?? tone}
                selectable
                selected={selectedIds.includes(opt.id)}
                onSelect={disabled || opt.disabled ? undefined : () => toggle(opt.id)}
              />
            ))}
            {allowCustom && (
              <CustomInputRow
                placeholder={customPlaceholder}
                value={customValue}
                onValueChange={setCustomValue}
                onSubmit={submitCustom}
                disabled={disabled}
              />
            )}
          </AISourceTileList>

          {ctaLabel && onSubmit && (
            <div style={{ display: 'grid' }}>
              <AIButton
                variant="primary-solid"
                size="lg"
                radius="md"
                label={ctaLabel}
                trailingIcon="zs-icon-arrow-right"
                disabled={disabled}
                onClick={() => onSubmit(selectedIds)}
              />
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes ai-source-accordion-open {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-ai-source-accordion-body] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/**
 * CustomInputRow — free-text row rendered inline inside the grouped tile
 * list. Adopts the same seam / height / padding as a real selectable row
 * so the input aligns with the tile edges above it.
 */
function CustomInputRow({
  placeholder,
  value,
  onValueChange,
  onSubmit,
  disabled,
}: {
  placeholder: string;
  value:       string;
  onValueChange: (v: string) => void;
  onSubmit:    () => void;
  disabled?:   boolean;
}) {
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const canSubmit = value.trim().length > 0 && !disabled;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px',
        background: (hover || focus) ? 'var(--ai-card-bg)' : 'transparent',
        transition: 'background 0.15s ease',
        minWidth: 0,
      }}
    >
      {/* Empty checkbox tile — visual seam with rows above; not interactive
          on its own (submitting the input is what commits). */}
      <span
        aria-hidden="true"
        style={{
          width: 24, height: 24, borderRadius: 6,
          background: '#FFFFFF',
          border: `1.5px dashed ${AI.color.brandBorder}`,
          flexShrink: 0,
        }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(); } }}
        disabled={disabled}
        style={{
          flex: 1, minWidth: 0,
          background: 'transparent', border: 'none', outline: 'none',
          fontFamily: F,
          ...AI_TYPOGRAPHY['@zsai-body-small'],
          color: 'var(--ai-zds-text)',
        }}
      />
      <button
        type="button"
        aria-label="Add this option"
        onClick={onSubmit}
        disabled={!canSubmit}
        style={{
          flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 24, height: 24, borderRadius: 6,
          background: canSubmit ? AI.color.brand : 'transparent',
          border: `1px solid ${canSubmit ? AI.color.brand : 'var(--ai-card-border)'}`,
          color: canSubmit ? '#FFFFFF' : 'var(--ai-zds-helper)',
          cursor: canSubmit ? 'pointer' : 'default',
          transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
        }}
      >
        <Glyph name="zs-icon-arrow-right" size={12} color="currentColor" />
      </button>
    </div>
  );
}

export default AISourceAccordion;
