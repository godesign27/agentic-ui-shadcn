# Agentic Prompt — AI Breadcrumbs

# AI Breadcrumbs — Agentic Prompt

_Hand-off prompt for an agent that **can** fetch `github.com/upstream AI component source`. For an agent that can't, use the **Copy Component** action instead — it inlines every dependency file._

---

## Hard rules — read before generating any code

1. **Do NOT invent atoms.** Fetch every atom this component imports from the canonical mirror (read order below). Use each one verbatim. If a render comes back wrong, you almost certainly fabricated one instead of fetching it.
2. **AI Avatar = three AI_RAMP blue circles + white cross-star.** Fixed fills `#A6B4FC` / `#4D60E6` / `#1F2A66`, white star. **No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.**
3. **Tokens come from `ai-tokens.ts` and `ai-typography.ts`** — use `AI.color.brand`, `var(--ai-card-bg)`, `AI_TYPOGRAPHY['@ai-section-subtitle']`, etc. Never hardcode brand hex.
4. **Icons** come from `lucide-react` for non-Guild glyphs and from the Guild icon font (`<i class="zs-icon zs-icon-{name}" />` inside `.zs-master-style`) when a Guild equivalent exists. Do not invent icon names.
5. **Toolbar buttons inside `AIInputCard` are `AIDialogButton` instances** — 34px pill/circle, transparent fill, subtle border. Not raw `<button>` elements.
6. **Quick chips are `AIChipQuick`** — pill, periwinkle border, brand-blue label. Not generic neutral buttons.
7. **File layout matters.** Keep the relative imports the source files use.

---

## Component metadata

- **Display name:** AI Breadcrumbs
- **Component id:** `ai-breadcrumbs`
- **Category:** organisms
- **Status:** Stable
- **File path:** `src/app/components/ds/ds-breadcrumbs.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `src/app/components/ds/ds-breadcrumbs.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Breadcrumbs
_ai-breadcrumbs_

> DS Breadcrumbs, AI surface theme — brand-blue links, brand-ink current page.

## Metadata
- **Category:** organisms
- **Status:** Stable
- **Source path:** `src/app/components/ds/ds-breadcrumbs.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Navigation
- **Tier 3 · Accountability:** Custom element
- **Metrics:** 8 states · 4 shared · ~5KB context · 4 behaviors

## Overview

The AI-themed variant of the standard DS Breadcrumbs. The single DSBreadcrumbs component (ds/ds-breadcrumbs.tsx) accepts theme="standard" (DS primary teal links) or theme="ai". In the AI theme the link CSS variables are re-anchored — scoped via CSS-variable overrides — to the AI brand blue: links use var(--color-ai-brand), hover uses var(--color-ai-brand-strong), and the current page uses var(--color-ai-brand-ink). Everything else — sizes (Normal 16px / Small 14px / X-Small 12px), Default/Inverse styles, Default/Back types, the swappable zs-icon-home page icon with independent icon/text toggles, zs-icon-arrow-right separators, disabled/focus states, the 2px focus ring, and the "…" overflow collapse menu — is shared with the standard breadcrumbs. All colors, radii, and spacing read design-system CSS variables from globals.css; all text uses the "Open Sans" face.

## When to use
- Navigation trails on AI surfaces that should read as part of the AI experience
- Any breadcrumb where the AI brand accent is preferred over the DS teal
- Deep hierarchies (3+ levels) that benefit from a collapse menu

## When not to use
- Don't use on a standard (non-AI) surface — use the standard <DSBreadcrumbs> (default theme) instead
- Don't fork ds-breadcrumbs.tsx to restyle — switch the theme prop
- Flat structures (< 3 levels) — breadcrumbs add little value

## Anatomy
1. **Nav** _(Unique)_ — <nav aria-label="Breadcrumb"> — scoped region that re-anchors the link vars to the AI brand.
2. **List** _(Unique)_ — <ol> — ordered trail, 4px gap between parts.
3. **Link item** _(Shared)_ — Italic ancestor link; color = var(--color-ai-brand), hover = var(--color-ai-brand-strong).
4. **Page icon** _(Shared)_ — Swappable zs-icon-home; toggleable via showIcon.
5. **Separator** _(Shared)_ — zs-icon-arrow-right chevron; neutral var(--helper-text-color), aria-hidden.
6. **Current** _(Unique)_ — Bold current page; color = var(--color-ai-brand-ink); aria-current="page"; never a link.
7. **Overflow** _(Shared)_ — "…" trigger + dropdown menu holding the collapsed middle items.

## State variations
- **With icons** _(theme="ai")_ — Brand-blue trail led by the swappable zs-icon-home page icon.
- **Three level** _(items.length=3)_ — Common page hierarchy, brand-blue links.
- **Collapsed** _(maxVisible<len)_ — Middle items collapse into a "…" overflow dropdown menu.
- **Small size** _(size=small)_ — Font 14px, icon box 20px, line-height 140%.
- **X-Small size** _(size=x-small)_ — Font 12px, icon box 16px, line-height 140%.
- **Back** _(type=back)_ — Single back link: zs-icon-arrow-left + italic brand-blue label.
- **Disabled** _(disabled)_ — Greys icon + text to the disabled token; non-interactive.
- **Inverse** _(variant=inverse)_ — White/light colors for dark backgrounds; separator turns white.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'standard' \| 'ai'` | `'standard'` | AI Breadcrumbs sets theme="ai": brand-blue links + brand-ink current page. |
| `items` | `BreadcrumbItem[]` | `—` | Trail data; last item is the current page (never a link). |
| `maxVisible` | `number (0 = show all)` | `0` | Collapse middle items into a "…" overflow menu past this depth. |
| `size` | `'normal' \| 'small' \| 'x-small'` | `'normal'` | Typography + icon scale (16 / 14 / 12px). |
| `variant` | `'default' \| 'inverse'` | `'default'` | Light-bg vs dark-bg (white/light) colors. |
| `type` | `'default' \| 'back'` | `'default'` | Hierarchy trail or a single back link. |
| `backLabel` | `string` | `'Back to page'` | Label for the type=back link. |
| `onBack` | `() => void` | `—` | Click handler for the back link. |

## Tokens

### AI accent (globals.css vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--color-ai-brand` | `#4D60E6` | Linked ancestor segments — replaces the standard primary teal |
| `--color-ai-brand-strong` | `#3544A4` | Link hover |
| `--color-ai-brand-ink` | `#1F2A66` | Current / active page text |
| `--color-ai-brand-surface` | `#F5F6FF` | Preview surface fill |

### Shared neutrals
| Token | Value | Usage |
| --- | --- | --- |
| `--helper-text-color` | `#5B5864` | Chevron separator (Icon/Neutral) |
| `--disabled-text-color` | `#716E79` | Disabled icon + text |
| `--inverse-text-color` | `#FAFAFA` | Inverse-style text on dark surfaces |
| `--focus-outline-color` | `#027AFF` | 2px focus ring |

## Flows

### Render an AI-themed breadcrumb trail
Standard DS Breadcrumbs structure with the AI surface theme.
- Import { DSBreadcrumbs } from components/ds/ds-breadcrumbs
- Build items (last item is the current page, never a link)
- Set theme="ai" for the AI brand-blue links
- Optionally set maxVisible to collapse deep trails into a "…" menu

## Code example
```tsx
import { DSBreadcrumbs, type BreadcrumbItem } from './components/ds/ds-breadcrumbs';

const items: BreadcrumbItem[] = [
  { label: 'Home', onClick: goHome, showIcon: true, showText: false },
  { label: 'Page level 2', onClick: go2 },
  { label: 'Page level 3', onClick: go3 },
  { label: 'Active page' }, // last item = current page, never a link
];

// theme="ai" swaps the standard primary teal links for the AI brand blue.
// Every value still reads a globals.css design-system variable.
<DSBreadcrumbs theme="ai" items={items} maxVisible={4} />

// Back variant:
<DSBreadcrumbs theme="ai" type="back" backLabel="Back to page" onBack={goBack} />

// For the un-themed DS teal breadcrumbs, omit theme (defaults to "standard").
```
