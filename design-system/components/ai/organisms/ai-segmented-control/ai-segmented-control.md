# AI Segmented Control

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Guild Design System — AI  
**Tier:** organisms  
**Repo module:** `aiSegmentedControl`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

DS Segmented Control, AI surface theme — fully-rounded pill chips, brand-gradient active segment.

AISegmentedControl is the AI-surface sibling of the standard DS Segmented Control. It keeps the same contract — a radiogroup of mutually exclusive segments, one active at a time — and the same variant matrix: two Types (Solid fills the active chip with the AI brand gradient under a white label; Outline keeps the chip transparent with a brand #4D60E6 border + brand label), three Sizes (Normal 40px / Small 35px / X-Small 30px), the interaction states Default / Hover / Pressed / Disabled, keyboard focus and a Full-width stretch mode. The visual language is the AI Pill: chips are fully-rounded (AI.radius.full) inside a raised, rounded track (--ai-card-bg-raised on --ai-card-border) rather than the flat, square, edge-shared segments of the standard control. Solid active adds a soft brand glow; hover/press tint the chip with --ai-card-bg / AI.color.brandSubtle. Optional leading zs-icons render through the icon-font catalog, tinted to the AI brand. Controlled via value / onChange.

**Export:** `AISegmentedControl`

## When to use

- Toggling between mutually exclusive views or filters on an AI surface
- A compact segmented control for an AI toolbar, filter row, or panel header
- An AI-branded alternative to the flat standard DS Segmented Control
- A control that must sit visually beside the AI Card, AI Tab, and AI Dialog

## When not to use

- You need the neutral product control — use the standard `ds-segmented-control`
- Options carry rich content panels — use `ai-tab`
- More than ~5 options, or options of varying length — use a dropdown or tabs

## Anatomy

1. **Track** _(Unique)_ — role="radiogroup" — raised, fully-rounded --ai-card-bg-raised container on --ai-card-border, 4px padding, 4px gap.
2. **Segment** _(Shared)_ — role="radio", aria-checked; fully-rounded chip (AI.radius.full). Roving tabindex — only the active chip is tabbable.
3. **Icon slot** _(Shared)_ — Optional leading zs-icon glyph, tinted to the AI brand (or white on a Solid active chip).
4. **Label** _(Shared)_ — @ai-body-small — Medium default, SemiBold active.
5. **Active chip** _(Unique)_ — Solid: AI.gradient.action.full fill + white label + soft brand glow. Outline: transparent fill + 1px #4D60E6 border + brand label.

## State variations

- **Solid · Normal** _(type=solid)_ — Default treatment at Normal size (40px). The active chip fills with the AI brand gradient and uses a white label with a soft brand glow; inactive chips are transparent on the raised track.
- **Outline · Normal** _(type=outline)_ — Outline treatment — the active chip stays transparent but is marked with a 1px brand #4D60E6 border and a brand label. Use where a full gradient fill would be too heavy.
- **Small size** _(size=small)_ — Compact 35px height, 14px label — for AI toolbars.
- **X-Small size** _(size=x-small)_ — Densest 30px height, 12px label — for inline AI filters.
- **Hover** _(state=hover)_ — Hover on an inactive chip lifts a soft --ai-card-bg tint; an active Solid chip deepens one gradient step. Borders and text are unchanged.
- **Pressed** _(state=pressed)_ — Pressed: an active Solid chip darkens to AI.color.action.primaryActive (#1F2A66); an inactive chip picks up a brand-subtle (#D2DBFF) tint.
- **Focused** _(state=focus)_ — Keyboard focus draws the AI focus ring — a 2px #4D60E6 ring offset from the raised track — around the focused chip.
- **Disabled** _(state=disabled)_ — Disabled chips drop to 55% opacity with a not-allowed cursor and are skipped by pointer and keyboard.
- **Full width** _(stretch)_ — Segments stretch to distribute evenly across the available width — for edge-to-edge AI view switchers.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `segments` | `AISegment[]` | `required` | Options — { label, value, leftIcon?, disabled? }. |
| `value` | `string` | `required` | The active segment value. |
| `onChange` | `(value: string) => void` | `required` | Fires when a segment is selected. |
| `type` | `'solid' \| 'outline'` | `'solid'` | Active-chip treatment. |
| `size` | `'normal' \| 'small' \| 'x-small'` | `'normal'` | normal=40px · small=35px · x-small=30px. |
| `fullWidth` | `boolean` | `false` | Stretch segments to fill the available width. |

## Tokens

### Background & fill
| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `linear-gradient(135deg,#657CEC,#4D60E6)` | Solid active chip fill |
| `AI.color.action.primaryHover` | `#3544A4` | Solid active chip fill on hover |
| `AI.color.action.primaryActive` | `#1F2A66` | Solid active chip fill while pressed |
| `--ai-card-bg-raised` | `Raised surface` | The segmented track background |
| `--ai-card-bg` | `AI card surface` | Inactive chip hover tint · Outline active hover fill |
| `AI.color.brandSubtle` | `#D2DBFF` | Inactive chip pressed tint |

### Text
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.text.onAction` | `#FFFFFF` | Label on a Solid active chip |
| `--ai-ds-text` | `Primary text` | Label on inactive chips |
| `AI.color.brand` | `#4D60E6` | Label + icon tint on an Outline active chip |

### Border, focus & elevation
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-border` | `AI card border` | The segmented track border |
| `AI.color.brand` | `#4D60E6` | Outline active chip stroke (1px) |
| `AI.color.border.focus` | `#4D60E6` | Focus ring (2px, offset from the track) |
| `AI.shadow.action.default` | `rgba(77,96,230,0.18)` | Soft glow under a Solid active chip |

### Typography & geometry
| Token | Value | Usage |
| --- | --- | --- |
| `Font` | `Open Sans — Medium 500 / SemiBold 600` | Inactive / active chip labels |
| `Font size` | `16 / 14 / 12px` | Normal / Small / X-Small label size |
| `Height` | `40 / 35 / 30px` | Normal / Small / X-Small chip height |
| `Padding (H)` | `18 / 16 / 14px` | Normal / Small / X-Small horizontal padding |
| `AI.radius.full` | `100px` | Fully-rounded track + chips |

## Flows

### Render an AI view switcher
Toggle between mutually exclusive views on an AI surface.
- Import { AISegmentedControl } from ai/atomic/segmented-control/AISegmentedControl
- Hold the active value in state and pass value / onChange
- Pass segments with a label + value (and optional leftIcon / disabled)
- Pick a type (solid / outline) and size; add fullWidth for an edge-to-edge switcher

## Agent rules

1. Read this mirror spec and `ai-segmented-control.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/organisms/ai-segmented-control/ai-segmented-control.agent.json`.
