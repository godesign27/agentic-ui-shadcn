import React from 'react';

// ── Accent line styles ────────────────────────────────────────────────────────
//
// AIAccentLine provides a pluggable visual accent for AI insight cards.
// The accent type is selected by the parent — typically driven by the
// style picker in AIAnalysisMessage.
//
// All styles are absolutely positioned and pointerEvents: none.

export type AccentLineStyle =
  | 'gradient'   // vertical gradient: color → transparent at 75% height (default)
  | 'top-bar'    // horizontal gradient bar at the top edge (4px)
  | 'none';      // no accent

export interface AIAccentLineProps {
  /** The accent color — typically the insight type's labelColor. */
  color: string;
  /** Which accent style to render. Defaults to 'gradient'. */
  style?: AccentLineStyle;
}

export function AIAccentLine({ color, style = 'gradient' }: AIAccentLineProps) {
  if (style === 'none') return null;

  const base: React.CSSProperties = {
    position:      'absolute',
    pointerEvents: 'none',
    zIndex:        0,
  };

  switch (style) {
    case 'gradient':
      // Vertical gradient: color at top → transparent at 75% of card height.
      return (
        <span
          aria-hidden="true"
          style={{
            ...base,
            top:        0,
            left:       0,
            width:      '4px',
            height:     '100%',
            background: `linear-gradient(to bottom, ${color} 0%, transparent 50%)`,
            borderRadius: '4px 0 0 4px',
          }}
        />
      );

    case 'top-bar':
      // 4px horizontal gradient bar at the top edge: color → transparent right.
      return (
        <span
          aria-hidden="true"
          style={{
            ...base,
            top:        0,
            left:       0,
            width:      '100%',
            height:     '4px',
            background: `linear-gradient(to right, ${color} 0%, transparent 50%)`,
            borderRadius: '4px 4px 0 0',
          }}
        />
      );

    default:
      return null;
  }
}

// ── Style metadata — used by pickers and documentation ────────────────────────

export const ACCENT_LINE_STYLES: {
  value: AccentLineStyle;
  label: string;
  description: string;
}[] = [
  { value: 'gradient', label: 'Side accent', description: 'Vertical gradient ribbon on the left edge — color fades to transparent at 50% height' },
  { value: 'top-bar',  label: 'Top bar',  description: 'Horizontal gradient bar at the top edge' },
  { value: 'none',     label: 'None',     description: 'No accent treatment' },
];

export default AIAccentLine;
