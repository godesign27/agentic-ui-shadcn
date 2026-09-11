/**
 * AI_TYPOGRAPHY — Single source of truth for `@ai-*` typography tokens.
 *
 * Mirrors the rows documented on the AI Library `/components/atomic/ai-typography`
 * detail page. Components import the named token instead of hardcoding inline
 * fontSize / fontWeight / lineHeight / letterSpacing literals.
 *
 * Usage:
 *   import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
 *   <span style={{ ...AI_TYPOGRAPHY['@ai-body-small'], color: '#xxx' }}>…</span>
 *
 * Notes:
 * - Class names like `.zs-body`, `.zs-h1` remain DS CSS classes — they are
 *   not affected by this module. This is for TS components using inline styles.
 * - `lineHeight` is `number` (unitless) or `string` (pixel-locked like '16px').
 */

import type { CSSProperties } from 'react';

type TypeSpec = Pick<CSSProperties,
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'letterSpacing'
  | 'textTransform'
>;

export const AI_TYPOGRAPHY = {
  // ── Standard scale (mirrors DS rows 1:1) ──────────────────────────────────
  '@ai-super-hero':        { fontSize: 64, fontWeight: 400, lineHeight: 1.5  },
  '@ai-hero':              { fontSize: 48, fontWeight: 700, lineHeight: 1.5  },
  '@ai-h1':                { fontSize: 32, fontWeight: 700, lineHeight: 1.5  },
  '@ai-h2':                { fontSize: 24, fontWeight: 700, lineHeight: 1.5  },  // 1.33 → 1.5 per reference scale
  '@ai-h3':                { fontSize: 20, fontWeight: 700, lineHeight: 1.4  },
  '@ai-h4':                { fontSize: 16, fontWeight: 700, lineHeight: 1.5  },
  '@ai-h5':                { fontSize: 14, fontWeight: 700, lineHeight: 1.5  },  // 1.4 → 1.5 per reference scale
  '@ai-h6':                { fontSize: 12, fontWeight: 700, lineHeight: 1.4  },
  '@ai-subtitle-1':        { fontSize: 16, fontWeight: 400, lineHeight: 1.5  },
  '@ai-subtitle-2':        { fontSize: 14, fontWeight: 400, lineHeight: 1.44 },
  '@ai-body':              { fontSize: 16, fontWeight: 400, lineHeight: 1.5  },
  '@ai-body-small':        { fontSize: 14, fontWeight: 400, lineHeight: 1.4  },
  '@ai-body-extra-small':  { fontSize: 12, fontWeight: 400, lineHeight: 1.63 },
  '@ai-caption-1':         { fontSize: 12, fontWeight: 400, lineHeight: 1.5  },
  // Floor lift (see /typography.md at repo root, §2): 10/11/11.5 → 12; sub-14
  // Regular (400) → Medium (500) per §3. Line-heights on single-line control
  // tokens keep 1.0 by design.
  '@ai-caption-2':         { fontSize: 12, fontWeight: 500, lineHeight: 1.5  },
  '@ai-overline':          { fontSize: 12, fontWeight: 600, lineHeight: 1.5,  letterSpacing: '0.2em', textTransform: 'uppercase' as const },
  '@ai-label':             { fontSize: 16, fontWeight: 700, lineHeight: 1.5,  letterSpacing: '2.5px' },
  '@ai-input-label':       { fontSize: 16, fontWeight: 700, lineHeight: 1.5,  letterSpacing: '0.15px' },
  '@ai-button-label':      { fontSize: 14, fontWeight: 600, lineHeight: 1.0  },
  '@ai-button-compact':    { fontSize: 12, fontWeight: 600, lineHeight: 1.0  },
  '@ai-agent-name':        { fontSize: 12, fontWeight: 600, lineHeight: 1.0  },

  // ── Atomic-tier AI extensions (no DS equivalent) ──────────────────────────
  '@ai-status-label':      { fontSize: 12,   fontWeight: 500, lineHeight: 1.0  },
  '@ai-micro-eyebrow':     { fontSize: 12,   fontWeight: 600, lineHeight: 1.0, letterSpacing: '0.02em' },
  '@ai-numeric-badge':     { fontSize: 12,   fontWeight: 500, lineHeight: '16px' },
  '@ai-help-micro':        { fontSize: 12,   fontWeight: 500, lineHeight: 1.55 },

  // ── Group-tier AI extensions ───────────────────────────────────────────────
  '@ai-bubble-body':       { fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: '-0.1px' },
  '@ai-input-text':        { fontSize: 16, fontWeight: 400, lineHeight: 1.5  },  // 15/400/1.6 → 16/400/1.5 (Standard structural input)
  '@ai-trace-detail':      { fontSize: 12, fontWeight: 500, lineHeight: 1.55 },
  '@ai-notif-title-compact': { fontSize: 12, fontWeight: 700, lineHeight: 1.3  },
  '@ai-menu-item':         { fontSize: 14, fontWeight: 400, lineHeight: 1.4,  letterSpacing: '-0.1px' },  // 13/400 → 14/400 (§3 fix — sub-14 Regular was illegal)
  '@ai-action-link':       { fontSize: 12, fontWeight: 600, lineHeight: 1.0  },

  // ── Pattern-tier AI extensions ─────────────────────────────────────────────
  '@ai-metric-value':      { fontSize: 22, fontWeight: 600, lineHeight: 1.1  },
  // Large numeric display scale (KPI hero numbers). Distinct from the text
  // scale — sizes normalized from stray 26/28/34 literals in the Angular pack.
  '@ai-metric-value-md':   { fontSize: 26, fontWeight: 700, lineHeight: 1.1  },
  '@ai-metric-value-lg':   { fontSize: 34, fontWeight: 700, lineHeight: 1.1  },
  '@ai-impact-headline':   { fontSize: 15, fontWeight: 700, lineHeight: 1.1  },  // deliberate 15px exception — compact KPI display
  '@ai-section-subtitle':  { fontSize: 14, fontWeight: 400, lineHeight: 1.55 },  // 13 → 14 (Standard field-label parity)
  '@ai-table-cell':        { fontSize: 14, fontWeight: 400, lineHeight: 1.4  },  // 12/600 → 14/400 (Standard option-item parity)

  // ── Added from groups-audit normalization wave ─────────────────────────────
  '@ai-panel-section-head': { fontSize: 12, fontWeight: 600, lineHeight: 1.5 },
  '@ai-card-title':         { fontSize: 16, fontWeight: 700, lineHeight: 1.4 },  // 14/400 → 16/700 (Standard h4 parity)
  '@ai-meta-label':         { fontSize: 12, fontWeight: 500, lineHeight: 1.5 },
  '@ai-insight-title':      { fontSize: 14, fontWeight: 600, lineHeight: 1.4 },  // 13 → 14 (component label tier; 13 sat between tiers)
} as const satisfies Record<string, TypeSpec>;

export type AITypographyToken = keyof typeof AI_TYPOGRAPHY;
