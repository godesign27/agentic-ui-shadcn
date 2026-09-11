# AI Tooltip

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Guild Design System — AI  
**Tier:** molecules  
**Repo module:** `aiTooltip`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

The DS Tooltip in AI clothing — same border-triangle arrows and popover geometry, AI brand indigo footer/confirmation buttons, and AI-softened corners (6px tooltips, 16px cards).

AITooltip is the AI-styled counterpart of the DS Tooltip system for AI surfaces (cards, drawers, generated dashboards). It is a re-skin, not a re-implementation: the tooltip / popover geometry, CSS border-triangle arrow math, size scale (Normal 16px / Small 14px), arrow directions (top / bottom / left / right) and positions (start / center / end), and the popover section structure are all ported verbatim from the DS Tooltip building blocks.

**Export:** `AITooltip`

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

## Agent rules

1. Read this mirror spec and `ai-tooltip.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/molecules/ai-tooltip/ai-tooltip.agent.json`.
