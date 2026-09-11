import React, { useState, useRef, useLayoutEffect } from 'react';
import { RiCalendarLine } from '@remixicon/react';
import { AI, F } from '../../tokens/ai-tokens';
import { AIInputField } from '../../atomic/ai-input-field/AIInputField';

/**
 * AI Date Picker
 * =====================
 * The AI-surface counterpart to the ZDS Date Picker (src/datePicker/). Same scope
 * — an Action-Field trigger + popover calendar (month/year nav, day grid, today
 * ring, today link) — restyled onto the ZAIDYN AI brand:
 *
 *   - Trigger uses the AI Action Field atom (AIInputField, asTrigger) so the field
 *     stays consistent with every other AI form control (rounded ai.radius.md
 *     outline, brand-blue border, AI input shadow + blue focus halo).
 *   - Calendar surface adopts the ZSAI indigo ramp (AI.color.*): selected day uses
 *     the action gradient, today carries a brand ring, range preview uses the
 *     brand-subtle tint, and the panel sits on a brand-tinted card.
 *
 * Structure/behavior mirrors the ZDS master so the two stay 1:1 across libraries;
 * only the palette + radii differ. Colors map the ZDS teal tokens to AI brand
 * equivalents (see tokenGroups in the registry entry).
 */

const FOCUS_RING = `0 0 0 2px #ffffff, 0 0 0 4px ${AI.color.border.focus}`;

// ─────────────────────────────────────────────────────────────────────────────
// Master-component state primitives — one visual per documented state.
// ─────────────────────────────────────────────────────────────────────────────

export type AICellState =
  | 'default' | 'hover' | 'pressed' | 'selected' | 'selected-hover'
  | 'disabled' | 'focused' | 'inactive' | 'highlight';

export function AIDateCell({ n = 31, state = 'default', today = false }: {
  n?: number; state?: AICellState; today?: boolean;
}) {
  let bg = 'transparent';
  let color = AI.color.text.primary;
  let borderColor = 'transparent';
  let weight = 400;
  let ring = false;
  switch (state) {
    case 'hover':          borderColor = AI.color.border.default; color = AI.color.brandStrong; weight = 600; break;
    case 'pressed':        bg = AI.color.action.primaryActive; color = AI.color.text.onAction; break;
    case 'selected':       bg = AI.color.action.primary;       color = AI.color.text.onAction; break;
    case 'selected-hover': bg = AI.color.action.primaryHover;  color = AI.color.text.onAction; weight = 600; break;
    case 'disabled':       color = AI.color.text.secondary; break;
    case 'focused':        ring = true; break;
    case 'inactive':       color = AI.color.text.secondary; break;
    case 'highlight':      bg = AI.color.brandSubtle; break;
    default: break;
  }
  const filled = state === 'pressed' || state === 'selected' || state === 'selected-hover';
  if (today && !filled) {
    borderColor = state === 'hover' ? AI.color.border.default
                : state === 'disabled' ? AI.color.text.secondary
                : AI.color.brand;
  }
  return (
    <div style={{
      width: 28, height: 28,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: F, fontSize: 14, fontWeight: weight,
      color,
      background: filled && state !== 'pressed' ? AI.gradient.action.full : bg,
      border: `1px solid ${borderColor}`,
      borderRadius: today && !filled ? '50%' : AI.radius.sm,
      boxShadow: ring ? FOCUS_RING : undefined,
      opacity: state === 'disabled' || state === 'inactive' ? 0.55 : 1,
    }}>{n}</div>
  );
}

export type AIArrowState = 'default' | 'hover' | 'pressed' | 'disabled' | 'focused';

export function AINavArrow({ dir = 'back', state = 'default' }: {
  dir?: 'back' | 'forward'; state?: AIArrowState;
}) {
  let fill: string = '#ffffff';
  let stroke = AI.color.brand;
  let icon = AI.color.brand;
  let ring = false;
  switch (state) {
    case 'hover':    fill = AI.gradient.action.full;    stroke = 'transparent';               icon = AI.color.text.onAction; break;
    case 'pressed':  fill = '#ffffff';                  stroke = AI.color.action.primaryActive; icon = AI.color.action.primaryActive; break;
    case 'disabled': fill = AI.color.surface.default;   stroke = AI.color.text.secondary;      icon = AI.color.text.secondary; break;
    case 'focused':  ring = true; break;
    default: break;
  }
  return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: fill, border: `1px solid ${stroke}`,
      boxShadow: ring ? FOCUS_RING : undefined,
      opacity: state === 'disabled' ? 0.7 : 1,
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d={dir === 'back' ? 'M7.5 2.5L4 6l3.5 3.5' : 'M4.5 2.5L8 6l-3.5 3.5'}
          stroke={icon} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function AIMonthYearSelector({ text = 'December', state = 'default', focusRing = false }: {
  text?: string; state?: 'default' | 'hover' | 'disabled'; focusRing?: boolean;
}) {
  const color = state === 'disabled' ? AI.color.text.secondary : AI.color.text.primary;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 10px', fontFamily: F, fontSize: 15, fontWeight: 600, color,
      background: state === 'hover' ? AI.color.brandSubtle : 'transparent',
      borderRadius: AI.radius.sm,
      boxShadow: focusRing ? FOCUS_RING : undefined,
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      opacity: state === 'disabled' ? 0.6 : 1,
    }}>
      {text}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 4.5L6 7.5l3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function AITodayLink({ state = 'default', focusRing = false }: {
  state?: 'default' | 'hover' | 'pressed' | 'disabled'; focusRing?: boolean;
}) {
  const color = state === 'hover' ? AI.color.brandStrong
              : state === 'pressed' ? AI.color.brandInk
              : state === 'disabled' ? AI.color.text.secondary
              : AI.color.brand;
  return (
    <span style={{
      fontFamily: F, fontSize: 14, fontWeight: 600, color,
      boxShadow: focusRing ? FOCUS_RING : undefined,
      borderRadius: 4,
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      opacity: state === 'disabled' ? 0.6 : 1,
    }}>Today</span>
  );
}

// Lays out a labeled row of state chips (docs State Variations).
export function AIStateRow({ items }: { items: { caption: string; node: React.ReactNode }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end', padding: 8 }}>
      {items.map((it) => (
        <div key={it.caption} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 36 }}>{it.node}</div>
          <span style={{ fontFamily: F, fontSize: 10, color: AI.color.text.secondary, textTransform: 'uppercase', letterSpacing: 0.4 }}>{it.caption}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Assembled calendar panel (brand-styled)
// ─────────────────────────────────────────────────────────────────────────────

export function AICalendarPanel({
  selected = 14, today = 18, monthLabel = 'March 2026', onPick,
}: {
  selected?: number; today?: number; monthLabel?: string; onPick?: (n: number) => void;
}) {
  // Sunday-first headers — firstDayOfWeek = 0 (S M T W T F S)
  const headers = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // March 2026 starts on a Sunday → 0 leading days; fill trailing to 42 cells.
  const cells: { n: number; inactive: boolean }[] = [];
  for (let d = 1; d <= 31; d++) cells.push({ n: d, inactive: false });
  let trail = 1;
  while (cells.length < 42) cells.push({ n: trail++, inactive: true });

  return (
    <div style={{
      width: 288,
      background: '#ffffff',
      border: `1px solid ${AI.color.brandBorder}`,
      borderRadius: AI.radius.lg,
      boxShadow: AI.shadow.input.default,
      padding: 16,
      fontFamily: F,
    }}>
      {/* Header — nav arrows + month/year selectors */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <AINavArrow dir="back" state="default" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <AIMonthYearSelector text={monthLabel.split(' ')[0]} />
          <AIMonthYearSelector text={monthLabel.split(' ')[1]} />
        </div>
        <AINavArrow dir="forward" state="default" />
      </div>
      {/* Day-of-week row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
        {headers.map((h, i) => (
          <div key={i} style={{ fontSize: 10, fontWeight: 600, color: AI.color.text.secondary, textAlign: 'center', padding: 2 }}>{h}</div>
        ))}
      </div>
      {/* Date grid */}
      <div role="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, justifyItems: 'center' }}>
        {cells.map((c, i) => {
          const st: AICellState = c.inactive ? 'inactive' : c.n === selected ? 'selected' : 'default';
          return (
            <div key={i} role="gridcell" aria-selected={!c.inactive && c.n === selected}
              onClick={c.inactive ? undefined : () => onPick?.(c.n)}
              style={{ cursor: c.inactive ? 'default' : 'pointer' }}>
              <AIDateCell n={c.n} state={st} today={!c.inactive && c.n === today} />
            </div>
          );
        })}
      </div>
      {/* Footer — Today link */}
      <div style={{
        marginTop: 12, textAlign: 'center',
      }}>
        <AITodayLink state="default" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Date Picker — Action Field trigger + popover calendar
// ─────────────────────────────────────────────────────────────────────────────

export interface AIDatePickerProps {
  label?: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  size?: 'normal' | 'small';
  mode?: 'default' | 'warning' | 'error';
  disabled?: boolean;
  /** Force the calendar open (docs/preview). When omitted, open is live. */
  open?: boolean;
  width?: number | string;
}

export function AIDatePicker({
  label = 'Due date',
  value,
  placeholder = 'MM/DD/YYYY',
  helper,
  size = 'normal',
  mode = 'default',
  disabled = false,
  open,
  width = 288,
}: AIDatePickerProps) {
  const [liveOpen, setLiveOpen] = useState(false);
  const [picked, setPicked] = useState<string | undefined>(value);
  const isOpen = (open ?? liveOpen) && !disabled;

  // Anchor the popover to the trigger FIELD's bottom (not the wrapper's), so it
  // stays flush even when a helper line renders below the field.
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuTop, setMenuTop] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (!isOpen || !rootRef.current) return;
    const trigger = rootRef.current.querySelector('[role="button"]') as HTMLElement | null;
    if (!trigger) return;
    const rootTop = rootRef.current.getBoundingClientRect().top;
    setMenuTop(trigger.getBoundingClientRect().bottom - rootTop);
  }, [isOpen, label, helper, size]);

  return (
    <div ref={rootRef} style={{ width, position: 'relative', fontFamily: F }}>
      <AIInputField
        label={label}
        value={picked ?? value}
        placeholder={placeholder}
        helper={helper ?? ''}
        size={size}
        mode={mode}
        disabled={disabled}
        asTrigger
        expanded={isOpen}
        onClick={() => setLiveOpen((o) => !o)}
        trailingIcon={<RiCalendarLine size={18} />}
        width="100%"
      />
      {isOpen && (
        <div style={{ position: 'absolute', top: menuTop ?? '100%', left: 0, marginTop: 0, zIndex: 20 }}>
          <AICalendarPanel
            selected={picked ? 14 : 14}
            onPick={(n) => {
              setPicked(`${String(n).padStart(2, '0')}/03/2026`);
              if (open === undefined) setLiveOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AIDatePicker;
