# AI Table

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Guild Design System — AI  
**Tier:** organisms  
**Repo module:** `aiTable`  
**Component type:** React organism  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

DS Table, AI surface theme — brand-blue accent, brand-surface selection, rounded corners.

The AI-themed variant of the standard DS Table. The single DSTable component (ds/ds-table.tsx) accepts theme="standard" (DS primary teal, square corners) or theme="ai". In the AI theme the reused DS atoms (Checkbox, Button, focus ring) are re-anchored — scoped via CSS-variable overrides — to the AI brand blue (var(--color-ai-brand)), row selection paints the brand surface (var(--color-ai-brand-surface)), and the container radius moves to the AI radius scale (var(--radius-ai-md)). Everything else — 19 cell content types, Normal/Small sizes, Default/Generous padding, sortable + filterable headers, indeterminate select-all, zebra, sticky header, skeleton loading, disabled rows, expandable nested rows, total footer, and the four AI cell modes — is shared with the standard table. All colors, radii, and spacing read design-system CSS variables from globals.css; all text uses the "Open Sans" face.

**Export:** `AITable`

## When to use

- Data tables on AI surfaces that should read as part of the AI experience
- Surfacing AI-generated or AI-flagged rows via the AI cell modes
- Any tabular data where the AI brand accent is preferred over the DS teal

## When not to use

- Don't use on a standard (non-AI) surface — use the standard <DSTable> (default theme) instead
- Don't fork ds-table.tsx to restyle — switch the theme prop
- Don't convey a cell state with color alone — pair with icon or text (AI modes use an inset edge)

## Anatomy

1. **Host** _(Unique)_ — DSTable theme="ai" — scoped region that re-anchors the atoms’ accent vars to the AI brand.
2. **Header** _(Shared)_ — <thead> with <th scope="col"> + sort/filter/info affordances; sort indicator uses AI brand blue.
3. **Body** _(Shared)_ — <tbody> rows — zebra optional; each cell rendered by column type.
4. **Selection col** _(Shared)_ — DS Checkbox column; checked fill = var(--color-ai-brand). Selected row = brand-surface fill + brand inset edge.
5. **Action button** _(Shared)_ — Solid DS Button re-anchored to the AI brand blue (var(--color-ai-brand)).
6. **AI cell mode** _(Shared)_ — AI Assist / AI Prefilled / AI Anomaly cell treatments — brand or error inset edge, never color-only.
7. **Container** _(Unique)_ — Rounded AI corners (var(--radius-ai-md)) with a neutral separator border.

## State variations

- **Default** _(theme="ai")_ — Brand accent, zebra rows, rounded AI corners.
- **Multi-select** _(selection="multi")_ — Checkbox selection with brand-surface row highlight.
- **AI modes** _(mode="ai-*")_ — AI Assist + AI Anomaly cell edges (never color-only).
- **Generous** _(padding="generous")_ — Increased padding (72px rows) for readability.
- **Zebra · Small** _(size="small")_ — Small 14px cells, 49px rows for dense data.
- **Skeleton** _(loading)_ — Preloader keeps table chrome; aria-busy region.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'standard' \| 'ai'` | `'standard'` | AI Table sets theme="ai": brand-blue accent, brand-surface selection, rounded corners. |
| `columns` | `DSTableColumn[]` | `—` | Column defs (key, label, type, align, sortable, filterable, render…). |
| `rows` | `Row[]` | `—` | Row data objects. |
| `size` | `'normal' \| 'small'` | `'normal'` | Cell font size + row height (16px/56px vs 14px/49px). |
| `padding` | `'default' \| 'generous'` | `'default'` | Vertical cell padding / row height. |
| `selection` | `'none' \| 'single' \| 'multi'` | `'none'` | Row selection mode; multi adds an indeterminate select-all. |
| `sortable` | `boolean` | `false` | Enables per-column sort (columns opt in via sortable). |
| `zebra` | `boolean` | `false` | Alternating row fill (var(--surface-color-2)). |
| `loading` | `boolean` | `false` | Skeleton preloader; keeps table chrome + aria-busy. |
| `rowMode` | `(row, i) => DSTableCellMode` | `—` | Row-level AI mode: 'ai-assist' \| 'ai-prefilled' \| 'ai-anomaly'. |
| `renderExpanded` | `(row) => ReactNode` | `—` | Expandable nested content beneath a row. |
| `footer` | `ReactNode` | `—` | Total / summary footer row. |

## Tokens

### AI accent (globals.css vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--color-ai-brand` | `#4D60E6` | Selected checkbox fill, sort indicator, focus ring, solid action button — replaces the standard primary teal |
| `--color-ai-brand-surface` | `#F5F6FF` | Selected-row highlight + AI Assist cell fill |
| `--radius-ai-md` | `12px` | Container corner radius (rounded AI corners) |

### Shared neutrals
| Token | Value | Usage |
| --- | --- | --- |
| `--separators-default / --border` | `#B2B0B6` | Row / cell / container borders |
| `--text-color` | `#2F2C3C` | Cell body text |
| `--helper-text-color` | `#5B5864` | Header labels, helper glyphs |
| `--surface-color-2` | `#F4F3F3` | Zebra row fill |
| `--border-light-color` | `#DEDCDE` | Skeleton preloader fill |

### AI cell modes
| Token | Value | Usage |
| --- | --- | --- |
| `--color-ai-brand (edge)` | `#4D60E6` | AI Assist cell inset edge |
| `--color-ai-status-error (edge)` | `#C0392B` | AI Anomaly cell inset edge |
| `--error-color-secondary` | `#FFEDE9` | AI Anomaly cell fill |

## Flows

### Render an AI-themed data table
Standard DS Table structure with the AI surface theme.
- Import { DSTable } from components/ds/ds-table
- Define columns (key, label, type) and pass row data
- Set theme="ai" for the AI brand accent + rounded corners
- Opt into sort/selection/zebra; use rowMode for AI cell states

## Agent rules

1. Read this mirror spec and `ai-table.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/organisms/ai-table/ai-table.agent.json`.
