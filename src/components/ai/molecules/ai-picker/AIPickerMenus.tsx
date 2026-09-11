import React from 'react';
import { AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

/**
 * AIPickerMenus — shared expanded-menu panels for the AI Picker.
 *
 * Single source of truth for every open/expanded menu surface used by both the
 * `ai-picker` group (live popovers) and the `ai-picker-trigger` detail page
 * (composed "menu open" preview states).
 *
 * Chrome principles (senior-UX craft bar):
 *   • No teal anywhere — menus use neutral DS chrome + restrained AI accents.
 *   • Selected states fill with DS dark gray (#1A1628) + white text.
 *   • Selected DAY cells are circles (radius.full); month/time labels stay soft
 *     rounded rectangles (they are labels, not dates).
 *   • Today is marked with a brand ring, never a fill (fill is reserved for the
 *     user's own selection — AI suggests, human decides).
 */

const F = '"Open Sans", sans-serif';
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Selected-state fill (DS dark gray) — confirmed with design.
const SELECTED_BG = 'var(--zs-dark-background-color, #1A1628)';
const SELECTED_FG = '#FFFFFF';
// Menu ink is pinned to the picker-menu tokens (not the global --ai-ds-* tokens)
// so it stays dark on the always-light menu surface — white in light mode, warm
// tan in dark mode. Prevents light-on-tan invisibility when the theme flips.
const NEUTRAL_TEXT = 'var(--ai-picker-menu-text, #2f2c3c)';
const NEUTRAL_HELPER = 'var(--ai-picker-menu-helper, #5b5864)';
const NEUTRAL_BORDER = 'var(--ai-ds-border, #B2B0B6)';

// ── Inline popover chrome ────────────────────────────────────────────────────
export function PopoverShell({ children, width }: { children: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        width: width ?? 276,
        background: 'var(--ai-picker-menu-bg, #FFFFFF)',
        border: `1px solid ${AI.color.brandBorder}`,
        borderRadius: AI.radius.sm,
        boxShadow: '0 8px 32px rgba(31,42,102,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}

export function YearHeader({ year, onPrev, onNext }: { year: number; onPrev: () => void; onNext: () => void }) {
  const btn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: NEUTRAL_HELPER, display: 'inline-flex' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 6px' }}>
      <button type="button" onClick={onPrev} aria-label="Previous year" style={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <span style={{ fontFamily: F, ...AI_TYPOGRAPHY['@ai-body-small'], fontWeight: 700, color: NEUTRAL_TEXT }}>{year}</span>
      <button type="button" onClick={onNext} aria-label="Next year" style={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

export function MonthCell({ label, selected, inRange, onClick }: { label: string; selected: boolean; inRange?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: selected ? SELECTED_BG : inRange ? AI.color.surface.subtle : 'transparent',
        color: selected ? SELECTED_FG : NEUTRAL_TEXT,
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: F,
        ...AI_TYPOGRAPHY['@ai-body-small'],
      }}
    >
      {label}
    </button>
  );
}

// ── Calendar grid helper ─────────────────────────────────────────────────────
interface CalCell { day: number; month: number; year: number; outside: boolean; key: string; }

function buildCells(viewYear: number, viewMonth: number): CalCell[] {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const dInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const dInPrev = new Date(viewYear, viewMonth, 0).getDate();
  const prevM = viewMonth === 0 ? 11 : viewMonth - 1;
  const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
  const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;

  const arr: CalCell[] = [];
  for (let i = firstDay - 1; i >= 0; i--) arr.push({ day: dInPrev - i, month: prevM, year: prevY, outside: true, key: `p${i}` });
  for (let d = 1; d <= dInMonth; d++) arr.push({ day: d, month: viewMonth, year: viewYear, outside: false, key: `c${d}` });
  for (let d = 1, rem = 42 - arr.length; d <= rem; d++) arr.push({ day: d, month: nextM, year: nextY, outside: true, key: `n${d}` });
  return arr;
}

/**
 * DatePanel — neutral-chrome day calendar (replaces the teal DSDatePickerInline
 * for the AI Picker). Circular day cells; selected day is a dark-gray filled
 * circle; today is a brand ring.
 *
 * Props mirror DSDatePickerInline so the group's renderPopover swaps cleanly.
 */
export function DatePanel({ value, onSelect, onCancel }: { value: string; onSelect: (v: string) => void; onCancel: () => void }) {
  const today = React.useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const selectedDate = React.useMemo(() => {
    if (!value || value === '—') return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    d.setHours(0, 0, 0, 0);
    return d;
  }, [value]);

  const [viewYear, setViewYear] = React.useState(selectedDate?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(selectedDate?.getMonth() ?? today.getMonth());
  const [hoveredKey, setHoveredKey] = React.useState<string | null>(null);

  function prevMonth() { if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); } else setViewMonth((m) => m - 1); }
  function nextMonth() { if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); } else setViewMonth((m) => m + 1); }

  const cells = React.useMemo(() => buildCells(viewYear, viewMonth), [viewYear, viewMonth]);

  const isToday = (c: CalCell) => c.year === today.getFullYear() && c.month === today.getMonth() && c.day === today.getDate();
  const isSelected = (c: CalCell) => !!selectedDate && c.year === selectedDate.getFullYear() && c.month === selectedDate.getMonth() && c.day === selectedDate.getDate();

  function pick(c: CalCell) {
    if (c.outside) { setViewYear(c.year); setViewMonth(c.month); }
    const d = new Date(c.year, c.month, c.day);
    onSelect(d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }

  const navBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: NEUTRAL_HELPER, display: 'inline-flex', borderRadius: 6 };

  return (
    <PopoverShell width={276}>
      {/* Neutral header — month/year + nav (no teal) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 4px' }}>
        <button type="button" onClick={prevMonth} aria-label="Previous month" style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span style={{ fontFamily: F, ...AI_TYPOGRAPHY['@ai-body-small'], fontWeight: 700, color: NEUTRAL_TEXT }}>
          {MONTHS_LONG[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} aria-label="Next month" style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div style={{ padding: '4px 12px 8px' }}>
        {/* Day-of-week header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', paddingBottom: 4 }}>
          {DAYS_ABBR.map((d) => (
            <div key={d} aria-hidden="true" style={{ fontFamily: F, fontSize: '11px', lineHeight: '1.5', color: NEUTRAL_HELPER }}>{d}</div>
          ))}
        </div>
        <div style={{ height: 1, background: AI.color.brandBorder, marginBottom: 6 }} />

        {/* 7×6 grid — circular cells */}
        <div role="grid" aria-label={`${MONTHS_LONG[viewMonth]} ${viewYear}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {cells.map((c) => {
            const sel = isSelected(c);
            const tod = isToday(c);
            const hov = hoveredKey === c.key;
            return (
              <button
                key={c.key}
                type="button"
                role="gridcell"
                aria-selected={sel}
                aria-label={`${MONTHS_LONG[c.month]} ${c.day}, ${c.year}`}
                onClick={() => pick(c)}
                onMouseEnter={() => setHoveredKey(c.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: sel ? SELECTED_BG : hov && !sel ? AI.color.surface.subtle : 'transparent',
                  color: sel ? SELECTED_FG : c.outside ? NEUTRAL_HELPER : NEUTRAL_TEXT,
                  opacity: c.outside && !sel ? 0.55 : 1,
                  border: 'none',
                  borderRadius: AI.radius.full,
                  boxShadow: tod && !sel ? `inset 0 0 0 1.5px ${AI.color.brand}` : 'none',
                  cursor: 'pointer',
                  fontFamily: F,
                  fontSize: '13px',
                  fontWeight: sel ? 700 : 400,
                  letterSpacing: '-0.1px',
                  padding: 0,
                  boxSizing: 'border-box',
                  transition: 'background-color 0.1s ease',
                }}
              >
                {c.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer — Today link (brand, not teal) */}
      <div style={{ borderTop: `1px solid ${AI.color.brandBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
        <button
          type="button"
          onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); onSelect(today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', color: AI.color.text.secondary, fontFamily: F, ...AI_TYPOGRAPHY['@ai-body-small'], fontWeight: 700 }}
        >
          Today
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', color: NEUTRAL_HELPER, fontFamily: F, ...AI_TYPOGRAPHY['@ai-body-small'] }}
        >
          Cancel
        </button>
      </div>
    </PopoverShell>
  );
}

// ── Single-month grid panel ──────────────────────────────────────────────────
export function MonthGridPanel({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  const parsed = React.useMemo(() => {
    const [mName, yStr] = (value || '').split(' ');
    const mi = MONTHS_SHORT.findIndex((m) => mName?.startsWith(m));
    const y = Number(yStr);
    return { mi: mi >= 0 ? mi : new Date().getMonth(), y: y || new Date().getFullYear() };
  }, [value]);
  const [year, setYear] = React.useState(parsed.y);

  return (
    <PopoverShell width={300}>
      <YearHeader year={year} onPrev={() => setYear((y) => y - 1)} onNext={() => setYear((y) => y + 1)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '4px 12px 14px' }}>
        {MONTHS_SHORT.map((m, i) => (
          <MonthCell
            key={m}
            label={m}
            selected={i === parsed.mi && year === parsed.y}
            onClick={() => onSelect(`${MONTHS_LONG[i]} ${year}`)}
          />
        ))}
      </div>
    </PopoverShell>
  );
}

// ── Dual-panel month-range picker ────────────────────────────────────────────
export function MonthRangePanel({ onSelect }: { onSelect: (v: string) => void }) {
  const now = new Date();
  const [startYear, setStartYear] = React.useState(now.getFullYear() - 1);
  const [endYear, setEndYear] = React.useState(now.getFullYear());
  const [start, setStart] = React.useState<{ y: number; m: number } | null>(null);
  const [end, setEnd] = React.useState<{ y: number; m: number } | null>(null);

  function pick(y: number, m: number) {
    if (!start || (start && end)) {
      setStart({ y, m });
      setEnd(null);
      return;
    }
    const a = new Date(start.y, start.m).getTime();
    const b = new Date(y, m).getTime();
    const [s, e] = a <= b ? [start, { y, m }] : [{ y, m }, start];
    setStart(s); setEnd(e);
    onSelect(`${MONTHS_SHORT[s.m]} – ${MONTHS_SHORT[e.m]} ${e.y}`);
  }
  const sel = (y: number, m: number) => (start?.y === y && start?.m === m) || (end?.y === y && end?.m === m);
  const inRange = (y: number, m: number) => {
    if (!start || !end) return false;
    const c = new Date(y, m).getTime();
    return c > new Date(start.y, start.m).getTime() && c < new Date(end.y, end.m).getTime();
  };

  const panel = (year: number, setY: React.Dispatch<React.SetStateAction<number>>) => (
    <div style={{ flex: 1, minWidth: 220 }}>
      <YearHeader year={year} onPrev={() => setY((y) => y - 1)} onNext={() => setY((y) => y + 1)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: '4px 12px 14px' }}>
        {MONTHS_SHORT.map((m, i) => (
          <MonthCell key={m} label={m} selected={sel(year, i)} inRange={inRange(year, i)} onClick={() => pick(year, i)} />
        ))}
      </div>
    </div>
  );

  return (
    <PopoverShell width={480}>
      <div style={{ display: 'flex' }}>
        {panel(startYear, setStartYear)}
        <div style={{ width: 1, background: AI.color.brandBorder }} />
        {panel(endYear, setEndYear)}
      </div>
    </PopoverShell>
  );
}

// ── Time selector (hour / minute / AM-PM) ────────────────────────────────────
export function TimePanel({ value, onSelect, onCancel }: { value: string; onSelect: (v: string) => void; onCancel?: () => void }) {
  const parsed = React.useMemo(() => {
    const m = (value || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    return { h: m ? Number(m[1]) : 10, min: m ? Number(m[2]) : 30, mer: (m ? m[3].toUpperCase() : 'AM') as 'AM' | 'PM' };
  }, [value]);
  const [h, setH] = React.useState(parsed.h);
  const [min, setMin] = React.useState(parsed.min);
  const [mer, setMer] = React.useState<'AM' | 'PM'>(parsed.mer);

  // Selections stay local — the value only commits when the user hits Apply.
  const apply = () => onSelect(`${h}:${String(min).padStart(2, '0')} ${mer}`);

  const Stepper = ({ val, onUp, onDown }: { val: string; onUp: () => void; onDown: () => void }) => {
    const arrow: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: NEUTRAL_HELPER, display: 'inline-flex', justifyContent: 'center' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <button type="button" onClick={onUp} aria-label="Increment" style={arrow}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ width: 48, textAlign: 'center', padding: '6px 0', border: `1px solid ${AI.color.brandBorder}`, borderRadius: 8, fontFamily: F, ...AI_TYPOGRAPHY['@ai-body-small'], fontWeight: 700, color: NEUTRAL_TEXT }}>
          {val}
        </div>
        <button type="button" onClick={onDown} aria-label="Decrement" style={arrow}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    );
  };

  const merBtn = (m: 'AM' | 'PM') => (
    <button
      type="button"
      onClick={() => setMer(m)}
      style={{
        padding: '6px 14px',
        borderRadius: 8,
        border: `1px solid ${mer === m ? SELECTED_BG : AI.color.brandBorder}`,
        background: mer === m ? SELECTED_BG : 'transparent',
        color: mer === m ? SELECTED_FG : NEUTRAL_TEXT,
        fontFamily: F,
        cursor: 'pointer',
        ...AI_TYPOGRAPHY['@ai-button-label'],
      }}
    >
      {m}
    </button>
  );

  return (
    <PopoverShell width={300}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20 }}>
        <Stepper val={String(h)} onUp={() => setH((c) => (c === 12 ? 1 : c + 1))} onDown={() => setH((c) => (c === 1 ? 12 : c - 1))} />
        <span style={{ fontFamily: F, fontWeight: 700, color: NEUTRAL_TEXT }}>:</span>
        <Stepper val={String(min).padStart(2, '0')} onUp={() => setMin((c) => (c + 5) % 60)} onDown={() => setMin((c) => (c + 55) % 60)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginLeft: 4 }}>
          {merBtn('AM')}
          {merBtn('PM')}
        </div>
      </div>

      {/* Footer — user commits their selection explicitly via Apply */}
      <div style={{ borderTop: `1px solid ${AI.color.brandBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, padding: '8px 12px' }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: NEUTRAL_HELPER, fontFamily: F, ...AI_TYPOGRAPHY['@ai-body-small'] }}
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={apply}
          style={{ padding: '6px 16px', borderRadius: AI.radius.sm, background: AI.color.action.primary, border: 'none', color: AI.color.text.onAction, cursor: 'pointer', fontFamily: F, ...AI_TYPOGRAPHY['@ai-button-label'] }}
        >
          Apply
        </button>
      </div>
    </PopoverShell>
  );
}
