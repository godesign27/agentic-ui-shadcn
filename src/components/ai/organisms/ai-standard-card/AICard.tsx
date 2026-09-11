import React from 'react';
import { DSCard, DSCardProps } from './ds-card';
import { AI } from '../../tokens/ai-tokens';

/**
 * DS AI Card
 * ===========
 * The **real** standard `DSCard` with the **AI surface theme** applied.
 *
 * `DSCard` is driven entirely by CSS custom properties (--radius, --border,
 * --primary, --background, --surface-color-*, --shadow-flat-right-angle-*,
 * --focus-outline-color). Rather than fork the component, this wrapper scopes it
 * inside a container that overrides those variables. Same structure, same props —
 * AI look. Two theme options are exposed:
 *
 *   • `borderTone`  'neutral' (default, #E5E7EB gray) | 'brand' (AI brand blue @ 30, #A6B4FC)
 *   • `headerTone`  'body' (default, white) | 'neutral' (gray #FAFAFA)
 *
 * Theme mapping (light):
 *   --radius                        → AI.radius.md            (16px, matches other AI components)
 *   --border                        → #E5E7EB / #A6B4FC       (borderTone)
 *   --surface-color-1 (footer/hover)→ #FAFAFA                 (same gray as the standard card footer)
 *   header background               → #FFFFFF / #FAFAFA       (headerTone — scoped !important, header bg is inline in DSCard)
 *   --background (body)             → #FFFFFF
 *   --primary  (active border)      → AI.color.action.primary (#4D60E6, AI accent kept for selection)
 *   --teal-00  (active bg)          → AI.color.surface.default (#F5F6FF)
 *   --shadow-flat-right-angle-2/4   → neutral drop shadows
 *   --focus-outline-color           → AI.color.border.focus   (#4D60E6)
 */

// Foundational neutral gray tokens.
const NEUTRAL_BORDER = '#E5E7EB';                 // gray stroke
// Was AI_RAMP[40] (#A6B4FC). Moved onto the semantic token; brandBorder is one
// step lighter (#BECAFE), a deliberate small softening of the brand card stroke.
const BRAND_BORDER = AI.color.brandBorder;        // #BECAFE
const NEUTRAL_RAISED = '#FAFAFA';                 // footer + neutral header — matches standard card footer (--surface-color-1)
const NEUTRAL_BODY = '#FFFFFF';

// Neutral drop shadows (no brand-blue glow).
const AI_CARD_SHADOW =
  '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)';
const AI_CARD_SHADOW_HOVER =
  '0 4px 8px rgba(16,24,40,0.08), 0 2px 6px rgba(16,24,40,0.12)';

// ─── Metadata export (mirrors DS_CARD_SOURCE) ───────────────────────────────
export const DS_AI_CARD_SOURCE = {
  base: 'ds/ds-card.tsx (DSCard)',
  theme: 'foundational neutral gray applied via CSS-variable scope + scoped header style',
  mappings: {
    '--radius':                      'AI.radius.md (16px)',
    '--border (neutral)':            '#E5E7EB (neutral gray)',
    '--border (brand)':              '#A6B4FC (AI brand blue @ 30)',
    '--surface-color-1':             '#FAFAFA (footer — standard card footer gray)',
    'header background (body)':      '#FFFFFF',
    'header background (neutral)':   '#FAFAFA (scoped !important)',
    '--background':                  '#FFFFFF (body)',
    '--primary':                     'AI.color.action.primary (#4D60E6)',
    '--teal-00':                     'AI.color.surface.default (#F5F6FF)',
    '--shadow-flat-right-angle-2':   `${AI_CARD_SHADOW}`,
    '--shadow-flat-right-angle-4':   `${AI_CARD_SHADOW_HOVER}`,
    '--focus-outline-color':         'AI.color.border.focus (#4D60E6)',
  },
};

// Base AI-theme CSS-variable overrides (border is applied per-instance below).
const AI_THEME_VARS: React.CSSProperties = {
  // structure
  ['--radius' as string]:                     AI.radius.md,
  // active accent
  ['--primary' as string]:                    AI.color.action.primary,
  ['--teal-00' as string]:                    AI.color.surface.default,
  // surfaces
  ['--background' as string]:                  NEUTRAL_BODY,
  ['--surface-color-1' as string]:            NEUTRAL_RAISED,
  ['--surface-color-4' as string]:            '#2D2A45',
  ['--surface-color-5' as string]:            '#1A1628',
  // text
  ['--text-color' as string]:                 '#2f2c3c',
  ['--inverse-text-color' as string]:         '#FAFAFA',
  // elevation
  ['--shadow-flat-right-angle-2' as string]:  AI_CARD_SHADOW,
  ['--shadow-flat-right-angle-4' as string]:  AI_CARD_SHADOW_HOVER,
  // focus
  ['--focus-outline-color' as string]:        AI.color.border.focus,
};

// Scoped class so the header gray + rounded clip apply only inside AICard.
const SCOPE_CLASS = 'ai-standard-card-scope';
// DSCard sets the header background inline (var(--background)), so a gray header
// requires !important to win. overflow:hidden clips the full-bleed header/footer
// to the 16px radius so the corners read as rounded.
const SCOPED_CSS = `
.${SCOPE_CLASS} > *:not(style) { overflow: hidden; }
.${SCOPE_CLASS}[data-header="neutral"] header { background: ${NEUTRAL_RAISED} !important; }
`;

export type AICardBorderTone = 'neutral' | 'brand';
export type AICardHeaderTone = 'body' | 'neutral';

export interface AICardProps extends Omit<DSCardProps, 'body' | 'header' | 'footer' | 'hasHeader' | 'hasFooter'> {
  /** Resting border color: 'neutral' gray (default) or 'brand' AI blue. */
  borderTone?: AICardBorderTone;
  /** Header fill: 'body' white (default) or 'neutral' gray. */
  headerTone?: AICardHeaderTone;
  hasHeader?: boolean;
  hasFooter?: boolean;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

/** Demo card content for bare mounts / galleries. */
export const SAMPLE_CARD_HEADER = 'AI insight';
export const SAMPLE_CARD_BODY = 'Territory coverage is trending down in PA-07. Open the workstream to review recommended rebalance actions.';
export const SAMPLE_CARD_FOOTER = 'Updated 12m ago';

export function AICard({
  borderTone = 'neutral',
  headerTone = 'body',
  hasHeader = true,
  hasFooter = true,
  header = SAMPLE_CARD_HEADER,
  body = SAMPLE_CARD_BODY,
  footer = SAMPLE_CARD_FOOTER,
  ...props
}: AICardProps) {
  const themeVars: React.CSSProperties = {
    ...AI_THEME_VARS,
    ['--border' as string]: borderTone === 'brand' ? BRAND_BORDER : NEUTRAL_BORDER,
    display: 'inline-flex',
  };
  return (
    <div className={SCOPE_CLASS} data-header={headerTone} style={themeVars}>
      <style>{SCOPED_CSS}</style>
      <DSCard {...props} hasHeader={hasHeader} hasFooter={hasFooter} header={header} body={body} footer={footer} />
    </div>
  );
}

export default AICard;
