# Agentic Prompt — AI Tooltip

# AI Tooltip — Agentic Prompt

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

- **Display name:** AI Tooltip
- **Component id:** `ai-tooltip`
- **Category:** molecules
- **Status:** Beta
- **File path:** `ai/atomic/tooltip/AITooltip.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `ai/atomic/tooltip/AITooltip.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Tooltip
_ai-tooltip_

> The DS Tooltip in AI clothing — same border-triangle arrows and popover geometry, AI brand indigo footer/confirmation buttons, and AI-softened corners (6px tooltips, 16px cards).

## Metadata
- **Category:** molecules
- **Status:** Beta
- **Source path:** `ai/atomic/tooltip/AITooltip.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Overlay · Helper · Popover
- **Tier 3 · Accountability:** Confirm · Rationale · Non-interactive
- **Metrics:** 11 states · 6 shared · ~11KB context · 6 behaviors

## Overview

AITooltip is the AI-styled counterpart of the DS Tooltip system for AI surfaces (cards, drawers, generated dashboards). It is a re-skin, not a re-implementation: the tooltip / popover geometry, CSS border-triangle arrow math, size scale (Normal 16px / Small 14px), arrow directions (top / bottom / left / right) and positions (start / center / end), and the popover section structure are all ported verbatim from the DS Tooltip building blocks.

Three things change on the AI brand ramp: (1) every text node uses the AI font token; (2) the hand-rolled teal footer / confirmation buttons are removed and replaced by the AI button atom (variant="primary" for Apply / Yes, variant="secondary" for Cancel / No, size="sm"), which carries AI brand indigo (#4D60E6); (3) corners are softened — hover tooltip bubbles use the small radius (6px) and the popover / confirmation cards use the medium radius (16px) with overflow clipping. Neutral surfaces (dark body #1A1628, white / subtle light surfaces) stay brand-neutral, matching the DS original.

## When to use
- Truncated label or icon-hint disclosure on an AI surface
- A contextual popover with title / body / actions on an AI card or drawer
- Destructive-action confirmation on an AI surface (No / Yes)
- You want the DS tooltip behavior but AI brand styling

## When not to use
- The neutral product surface — use the standard `ds-tooltip`
- Don't embed forms or primary navigation — use a dialog for complex content
- Don't use for validation errors — use the DS validation / field component
- Don't use the Default (dark) confirmation on a dark background — use Inverse there

## Anatomy
1. **Tooltip body** _(Shared)_ — Text container — dark (default) or white (inverse) surface, AI small radius (6px), padding 4×8 (Normal) / 3.5×7 (Small).
2. **Arrow** _(Shared)_ — CSS border-triangle; direction (top / bottom / left / right) × position (start / center / end). Geometry inherited from DS.
3. **Popover card** _(Unique)_ — 224px light card, AI medium radius (16px) + overflow clip; title bar (subtle bg) / content / footer sections.
4. **Footer buttons** _(Shared)_ — AIButton secondary (Cancel) + primary (Apply), size sm — AI brand indigo replaces the DS teal fills.
5. **Confirmation card** _(Unique)_ — 244px card, AI medium radius (16px); error-circle icon (20px) + message + No / Yes AIButtons.
6. **Confirmation icon** _(Shared)_ — zs-icon-error-circle 20px — white on the dark card, helper-text (#5b5864) on the light card.

## State variations
- **Default dark · atoms** _(mode=default)_ — Dark body (#1a1628) + inverse text, AI small radius (6px). Normal (16px) and Small (14px) sizes with all four arrow directions. Light container stays white.
- **Inverse light · atoms** _(mode=inverse)_ — White body + dark text, arrow fill uses surface/subtle (#f4f3f3), AI small radius (6px). Shown on a dark container.
- **Popover · master** _(.AIPopover (light surface))_ — AIPopover — 224px light card, AI medium radius (16px). Three sections: title bar (surface/subtle) / content (white) / footer (AIButton Cancel + Apply, right-aligned).
- **Popover · Inverse** _(position variants)_ — Assembled AIPopover with the four arrow directions at center. Elevation reuses the DS popover shadow stack.
- **Confirmation · master** _(Default + Inverse)_ — AIPopoverConfBody, both modes: error-circle icon (20px) + message + No (secondary) / Yes (primary) AIButtons. AI medium radius (16px). Dark card keeps its dark body.
- **Confirmation · Inverse** _(mode=inverse · position variants)_ — AI popover confirmation, white card, AI brand Yes button. Four arrow directions at center position.
- **Confirmation · Default** _(mode=default · position variants)_ — AI popover confirmation, dark card (#1a1628), AI brand Yes button + onDark No button. Four arrow directions at center position.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `'Tooltip text'` | AITooltip body text. |
| `mode` | `'default' \| 'inverse'` | `'default'` | Dark body (default) or white body (inverse). |
| `size` | `'normal' \| 'small'` | `'normal'` | Normal = 16px body / 4×8 padding; Small = 14px / 3.5×7. |
| `arrowDir` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Side the arrow extends from the body toward the anchor. |
| `arrowPos` | `'start' \| 'center' \| 'end'` | `'center'` | Where the arrow sits along its edge. |
| `mode (AIPopoverConfBody / Full)` | `'default' \| 'inverse'` | `'inverse'` | Confirmation card surface: dark (default) or light (inverse). |

## Tokens

### AI re-skin (brand accent + radii)
| Token | Value | Usage |
| --- | --- | --- |
| `--color-ai-brand` | `AI.color.brand → #4D60E6` | Footer / confirmation button accent (via the AIButton atom). |
| `--aiu-radius-xs` | `AI.radius.xs → 6px` | Hover tooltip bubble corner (was square in DS). |
| `--aiu-radius-md` | `AI.radius.md → 16px` | Popover + confirmation card corner (with overflow clip). |

### Tooltip surface & text (neutral, inherited from DS)
| Token | Value | Usage |
| --- | --- | --- |
| `--headline-text-color` | `#1a1628` | surface/dark — Default mode tooltip & confirmation body bg |
| `--background` | `#ffffff` | surface/white — Inverse tooltip, popover & confirmation bg |
| `--surface-color-2` | `#f4f3f3` | surface/subtle — Inverse arrow fill, Popover title bar bg |
| `--inverse-text-color` | `#fafafa` | text/primary-light — Default mode body text |
| `--text-color` | `#2f2c3c` | text/primary-dark — Inverse body text, popover title/content |
| `--helper-text-color` | `#5b5864` | text/secondary — confirmation icon fill on light surface |

### Shadow elevation (inherited from DS)
| Token | Value | Usage |
| --- | --- | --- |
| `shadowTip` | `0 0 1px rgba(0,0,0,0.04), 0 0 2px rgba(26,22,40,0.12), 0 2px 4px rgba(26,22,40,0.12)` | Tooltip bubble elevation. |
| `shadowPop` | `0 0 1px rgba(0,0,0,0.04), 0 0 2px rgba(26,22,40,0.12), 0 4px 8px rgba(26,22,40,0.18)` | Popover / confirmation card elevation (stronger). |

### Typography
| Token | Value | Usage |
| --- | --- | --- |
| `font-family` | `F → "Open Sans", sans-serif` | AI font token — every text node (same as AIButton). |
| `tooltip/body` | `Regular 400 / 16px (Normal) · 14px (Small)` | Tooltip body text. |
| `popover/title` | `Bold 700 / 14px / −0.176px / lh 1.5` | Popover title bar. |
| `popover/conf-body` | `Regular 400 / 14px / −0.176px / lh 1.4` | Confirmation message. |

## Flows

### Show an AI hover tooltip
Non-interactive helper copy on an AI surface, AI-softened corners.
- Render `<AITooltip text="…" mode="default" arrowDir="top" />`
- Pick `mode="inverse"` for a white bubble on a dark card
- Set `size="small"` for dense contexts
- Position the arrow with `arrowDir` + `arrowPos`

### Render an AI popover with actions
Rich overlay with title / content / footer buttons.
- Render `<AIPopoverFull arrowDir="right" />`
- The footer renders AIButton secondary (Cancel) + primary (Apply), size sm
- The card uses the AI medium radius (16px) with overflow clipping

### Render an AI confirmation
Destructive-action confirmation with No / Yes.
- Render `<AIPopoverConfFull mode="inverse" arrowDir="top" />`
- The content row shows the error-circle icon + message
- No (secondary) + Yes (primary) render as AIButtons; the dark card passes `onDark` to No
- Use `mode="default"` for the dark card on a light background

## Code example
```tsx
import {
  AITooltip,
  AIPopoverFull,
  AIPopoverConfFull,
} from 'ai/atomic/tooltip/AITooltip';

// Hover tooltip — AI small radius (6px)
<AITooltip text="Explainability score" mode="default" arrowDir="top" />

// Inverse (light) tooltip on a dark card
<AITooltip text="On a dark surface" mode="inverse" size="small" arrowDir="bottom" />

// Popover with Cancel / Apply (AIButton primary + secondary)
<AIPopoverFull arrowDir="right" arrowPos="center" />

// Confirmation with No / Yes
<AIPopoverConfFull mode="inverse" arrowDir="top" arrowPos="center" />
```
