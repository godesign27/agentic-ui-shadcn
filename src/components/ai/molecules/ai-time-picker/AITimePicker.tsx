import React, { useState, useRef, useLayoutEffect } from 'react';
import { RiTimeLine } from '@remixicon/react';
import { AI, F } from '../../tokens/ai-tokens';

/**
 * AI Time Picker
 * =====================
 * The AI-surface counterpart to the DS Time Picker (src/timePicker/). Same scope
 * — an Action-Field trigger (clock icon + value) opening a scrollable listbox of
 * time slots (default 30-minute intervals) — restyled onto the Guild AI brand.
 *
 *   - Trigger uses the AI Action Field treatment (rounded ai.radius.md outline,
 *     brand-blue border, AI input shadow + blue focus halo) to stay consistent
 *     with every other AI form control.
 *   - Menu sits FLUSH against the field (the DS Time Picker signature): the field
 *     keeps its top corners rounded when open, the menu carries the bottom radius,
 *     so the two read as one continuous brand surface.
 *   - Items adopt the AI_RAMP indigo ramp — hover uses the brand-subtle tint, the
 *     selected slot fills with the action gradient, and the custom scrollbar is
 *     brand-tinted.
 *
 * AI surface theme: the component reads its palette from the AI.* tokens (mirrored
 * to the --color-ai-* / --gradient-ai-* CSS custom properties). Rendering it on a
 * surface that carries the AI data-theme keeps it visually aligned with the rest
 * of the AI system — applying the AI theme to a DS time picker yields this look.
 *
 * Structure/behavior mirrors the DS master so the two stay 1:1 across libraries;
 * only the palette + radii differ.
 */

const FOCUS_RING = `0 0 0 2px #ffffff, 0 0 0 4px ${AI.color.border.focus}`;

// Sizing contract mirrors the DS Time Picker: the "Pick a time" label sits ABOVE
// the field; the field + menu share one width and sit flush (no gap).
export const AI_TIME_PICKER_SIZES = {
  Normal:    { field: 48, icon: 22, itemH: 34, menuH: 236, label: 13, input: 15, item: 15 },
  Small:     { field: 42, icon: 20, itemH: 30, menuH: 208, label: 12, input: 14, item: 14 },
  'X-Small': { field: 38, icon: 18, itemH: 28, menuH: 192, label: 11, input: 12, item: 12 },
} as const;

export const AI_TIME_PICKER_SLOTS = ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm'];

export type AITimeItemState = 'default' | 'hover' | 'selected' | 'focused';

/**
 * Menu-surface treatments.
 *   soft         — brand-tinted surface + gradient-filled selected slot (default).
 *   flat-blue    — same brand surface, but the selected slot fills with a FLAT AI
 *                  blue (no gradient).
 *   flat-neutral — warm neutral gray surface, matching the AI cards / accordions.
 */
export type AITimeSurface = 'soft' | 'flat-blue' | 'flat-neutral' | 'flat-tan';

export const AI_TIME_SURFACES: Record<AITimeSurface, {
  menuBg: string; menuBorder: string;
  selectedBg: string; selectedText: string;
  hoverBg: string; hoverText: string;
  itemText: string;
  scrollTrack: string; scrollThumb: string; scrollThumbHover: string;
}> = {
  soft: {
    menuBg: AI.color.brandSurface, menuBorder: AI.color.brandBorder,
    selectedBg: AI.gradient.action.full, selectedText: AI.color.text.onAction,
    hoverBg: AI.color.brandSubtle, hoverText: AI.color.brandStrong,
    itemText: AI.color.text.primary,
    scrollTrack: AI.color.brandSurface, scrollThumb: AI.color.brandBorder, scrollThumbHover: AI.color.brand,
  },
  'flat-blue': {
    menuBg: AI.color.brandSurface, menuBorder: AI.color.brandBorder,
    selectedBg: AI.color.action.primary, selectedText: AI.color.text.onAction,
    hoverBg: AI.color.brandSubtle, hoverText: AI.color.brandStrong,
    itemText: AI.color.text.primary,
    scrollTrack: AI.color.brandSurface, scrollThumb: AI.color.brandBorder, scrollThumbHover: AI.color.brand,
  },
  'flat-neutral': {
    // Warm neutral gray — same tone family as the AI cards / accordions (#F4F3F3 → #E8E7EA).
    menuBg: '#F4F3F3', menuBorder: '#DEDCDE',
    selectedBg: '#DEDCDE', selectedText: '#2F2C3C',
    hoverBg: '#E8E7EA', hoverText: '#2F2C3C',
    itemText: '#2F2C3C',
    scrollTrack: '#F4F3F3', scrollThumb: '#C9C7CC', scrollThumbHover: '#B2B0B6',
  },
  'flat-tan': {
    // Warm companion tan — AI.color.companion.* (AI_RAMP Tan ramp).
    menuBg: AI.color.companion.paper, menuBorder: AI.color.companion.border,
    selectedBg: AI.color.companion.highlight, selectedText: AI.color.companion.ink,
    hoverBg: AI.color.companion.surface, hoverText: AI.color.companion.ink,
    itemText: AI.color.companion.ink,
    scrollTrack: AI.color.companion.paper, scrollThumb: AI.color.companion.border, scrollThumbHover: '#CDB39C',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// State primitives — one visual per documented state (docs State Variations)
// ─────────────────────────────────────────────────────────────────────────────

export function AITimeMenuItem({
  label = '10:30 am', state = 'default', height = 34, fontSize = 15, surface = 'soft',
}: {
  label?: string; state?: AITimeItemState; height?: number; fontSize?: number; surface?: AITimeSurface;
}) {
  const cfg = AI_TIME_SURFACES[surface];
  const filled = state === 'selected';
  const bg = state === 'hover' ? cfg.hoverBg
           : filled ? cfg.selectedBg
           : 'transparent';
  const fg = filled ? cfg.selectedText
           : state === 'hover' ? cfg.hoverText
           : cfg.itemText;
  return (
    <div role="option" aria-selected={filled} style={{
      height, display: 'flex', alignItems: 'center', padding: '0 16px',
      fontFamily: F, fontSize, fontWeight: state === 'hover' || filled ? 600 : 400,
      background: bg, color: fg, borderRadius: AI.radius.sm,
      boxShadow: state === 'focused' ? FOCUS_RING : undefined,
    }}>{label}</div>
  );
}

// Brand-tinted custom scrollbar — 12px rail on the AI brand surface.
export function AITimeScrollbar({ menuH = 236, hover = false, surface = 'soft' }: { menuH?: number; hover?: boolean; surface?: AITimeSurface }) {
  const cfg = AI_TIME_SURFACES[surface];
  return (
    <div aria-hidden="true" style={{ width: 12, flex: '0 0 12px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: cfg.scrollTrack }} />
      <div style={{
        position: 'absolute', left: 2, top: 8, width: 8, height: Math.round(menuH * 0.42),
        borderRadius: 8, background: hover ? cfg.scrollThumbHover : cfg.scrollThumb,
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Time Picker — Action Field trigger + flush listbox menu
// ─────────────────────────────────────────────────────────────────────────────

export interface AITimePickerProps {
  label?: string;
  /** Selected time slot (e.g. "10:30 am"). */
  selected?: string;
  placeholder?: string;
  slots?: string[];
  size?: keyof typeof AI_TIME_PICKER_SIZES;
  /** Menu-surface treatment: soft gradient (default), flat AI blue, or flat neutral gray. */
  surface?: AITimeSurface;
  disabled?: boolean;
  /** Force the menu open (docs/preview). Omit for live toggle. */
  open?: boolean;
  /** Force the field focus ring (docs/preview). */
  focused?: boolean;
  /** Docs-only: highlight one item as hovered. */
  hoverIndex?: number;
  /** Docs-only: put the focus ring on one item. */
  focusIndex?: number;
  /** Docs-only: show the scrollbar thumb in its hover tone. */
  scrollHover?: boolean;
  width?: number | string;
}

export function AITimePicker({
  label = 'Pick a time',
  selected,
  placeholder = 'Select time',
  slots = AI_TIME_PICKER_SLOTS,
  size = 'Normal',
  surface = 'soft',
  disabled = false,
  open,
  focused = false,
  hoverIndex,
  focusIndex,
  scrollHover = false,
  width = 332,
}: AITimePickerProps) {
  const s = AI_TIME_PICKER_SIZES[size];
  const cfg = AI_TIME_SURFACES[surface];
  const [liveOpen, setLiveOpen] = useState(false);
  const [picked, setPicked] = useState<string | undefined>(selected);
  const [liveHover, setLiveHover] = useState<number | null>(null);
  const isOpen = (open ?? liveOpen) && !disabled;
  const value = picked ?? selected;

  const rootRef = useRef<HTMLDivElement>(null);
  const [menuTop, setMenuTop] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (!isOpen || !rootRef.current) return;
    const trigger = rootRef.current.querySelector('[role="combobox"]') as HTMLElement | null;
    if (!trigger) return;
    const rootTop = rootRef.current.getBoundingClientRect().top;
    setMenuTop(trigger.getBoundingClientRect().bottom - rootTop);
  }, [isOpen, label, size]);

  // Close on outside click (live mode only)
  useLayoutEffect(() => {
    if (!isOpen || open !== undefined) return;
    function onDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setLiveOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen, open]);

  return (
    <div ref={rootRef} style={{ width, position: 'relative', fontFamily: F, opacity: disabled ? 0.6 : 1 }}>
      {/* Label — above the field */}
      {label && (
        <label style={{ display: 'block', fontSize: s.label, fontWeight: 700, color: AI.color.text.primary, marginBottom: 6 }}>
          {label}
        </label>
      )}

      {/* Action Field trigger */}
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => { if (!disabled && open === undefined) setLiveOpen((o) => !o); }}
        style={{
          height: s.field, padding: '0 14px', background: '#ffffff',
          border: `1px solid ${AI.color.border.default}`,
          // Keep top corners rounded when open; square the bottom so the menu reads flush.
          borderRadius: isOpen ? `${AI.radius.md} ${AI.radius.md} 0 0` : AI.radius.md,
          borderBottom: isOpen ? '1px solid transparent' : `1px solid ${AI.color.border.default}`,
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: focused ? FOCUS_RING : AI.shadow.input.default,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <RiTimeLine size={s.icon} color={AI.color.brand} style={{ flex: '0 0 auto' }} aria-hidden="true" />
        {value
          ? <span style={{ fontSize: s.input, color: AI.color.text.primary, flex: 1 }}>{value}</span>
          : <span style={{ fontSize: s.input, fontStyle: 'italic', color: AI.color.text.secondary, flex: 1 }}>{placeholder}</span>}
      </div>

      {/* Menu — flush against the field (no gap) */}
      {isOpen && (
        <div style={{ position: 'absolute', top: menuTop ?? '100%', left: 0, width, zIndex: 20 }}>
          <style>{`.ai-tp-scroll::-webkit-scrollbar{display:none}.ai-tp-scroll{scrollbar-width:none}`}</style>
          <div role="listbox" aria-label="Time options" style={{
            display: 'flex', background: cfg.menuBg,
            border: `1px solid ${cfg.menuBorder}`, borderTop: 'none',
            borderRadius: `0 0 ${AI.radius.md} ${AI.radius.md}`,
            maxHeight: s.menuH, overflow: 'hidden',
            boxShadow: AI.shadow.input.default,
          }}>
            <div className="ai-tp-scroll" style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}>
              {slots.map((t, i) => {
                // Live hover (real pointer) takes precedence over the docs-only
                // hoverIndex prop so the full interactive preview highlights on hover.
                const activeHover = liveHover ?? hoverIndex;
                let state: AITimeItemState = 'default';
                if (i === focusIndex) state = 'focused';
                else if (i === activeHover) state = 'hover';
                else if (t === value) state = 'selected';
                return (
                  <div key={t}
                    onMouseEnter={() => setLiveHover(i)}
                    onMouseLeave={() => setLiveHover((h) => (h === i ? null : h))}
                    onClick={() => {
                      setPicked(t);
                      if (open === undefined) setLiveOpen(false);
                    }}>
                    <AITimeMenuItem label={t} state={state} height={s.itemH} fontSize={s.item} surface={surface} />
                  </div>
                );
              })}
            </div>
            <AITimeScrollbar menuH={s.menuH} hover={scrollHover} surface={surface} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AITimePicker;
