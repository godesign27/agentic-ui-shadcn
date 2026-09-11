# Agentic Prompt — AI Toolbar

# AI Toolbar — Agentic Prompt

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

- **Display name:** AI Toolbar
- **Component id:** `ai-toolbar`
- **Category:** molecules
- **Status:** Beta
- **File path:** `ai/molecules/toolbar/AIToolbar.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `ai/molecules/toolbar/AIToolbar.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Toolbar
_ai-toolbar_

> DS Toolbar on the AI surface — --aiu-brand fills, 16px radius, soft-blue elevation, and a draggable floating variant.

## Metadata
- **Category:** molecules
- **Status:** Beta
- **Source path:** `ai/molecules/toolbar/AIToolbar.tsx`
- **Tier 1 · Experience Mode:** AI Assisted · Adaptive
- **Tier 2 · AI Behavior:** Navigation · Action
- **Tier 3 · Accountability:** Toolbar · Floating
- **Metrics:** 14 states · 5 shared · ~9KB context · 4 behaviors

## Overview

AIToolbar is the AI skin of the standard DS Toolbar. It keeps the same anatomy and behavior — a role="toolbar" strip of icon-link actions with optional labels (icon-only items get a hover / focus tooltip), interactive hover / focus / press / select states — but wears the Guild AI surface. The AI brand color (--aiu-brand = AI_RAMP[80]) replaces the standard teal ramp (teal[80]) everywhere a hover / selected / pressed fill appears; the container uses AI corner radius (--aiu-radius-md) and AI elevation (--aiu-shadow-md), and items use the AI focus ring. A `floating` variant wraps the bar in a positioned stage and adds a six-dot grabber so the user can drag it anywhere within the stage (position clamps to bounds). Everything resolves to --aiu-* CSS custom properties in src/styles/ai-utilities.css, so editing that CSS restyles the toolbar; typography is the Open Sans face already loaded by the kit.

## When to use
- A toolbar of actions needs to appear on an AI surface
- The bar should read as a sibling of the other AI components
- You want a movable, floating tool strip with a drag grabber

## When not to use
- You need the neutral standard styling — use `ds-toolbar`
- It is a single command / input row — use `ai-control-bar`
- It is a dropdown action list — use `ai-menu`

## Anatomy
1. **Container** _(Unique)_ — role="toolbar" strip — --aiu-surface, --aiu-radius-md, --aiu-shadow-md.
2. **Icon link** _(Shared)_ — Button item — 24px glyph + optional 12px bold label; --aiu-radius-sm.
3. **Brand fill** _(Shared)_ — Hover / selected item background — --aiu-brand with --aiu-on-primary content.
4. **Tooltip** _(Shared)_ — Icon-only items show a native hover / focus tooltip with the action label.
5. **Grabber** _(Unique)_ — Floating only — six-dot drag grip at the leading edge.
6. **Focus ring** _(Shared)_ — Inset 2px --aiu-focus ring on keyboard focus.

## State variations
- **Horizontal** _(orientation=horizontal)_ — Default horizontal strip of icon-only actions on the AI surface.
- **Horizontal + labels** _(label=right)_ — Horizontal strip with labels to the right of each icon.
- **Vertical** _(orientation=vertical)_ — Column strip of icon-only links; each shows a tooltip on hover.
- **Vertical + label below** _(label=below)_ — Vertical column with labels below each icon.
- **Vertical + label right** _(label=right)_ — Vertical column with labels to the right of each icon.
- **Vertical (dark)** _(.dark)_ — Vertical, icon-only, on the dark AI surface (--aiu-* dark overrides).
- **Vertical + below (dark)** _(.dark label=below)_ — Vertical, labels below, dark AI surface.
- **Vertical + right (dark)** _(.dark label=right)_ — Vertical, labels to the right, dark AI surface.
- **Item states** _(default / hover / …)_ — Default, hover, pressed, selected, focused, disabled — with the AI brand fills.
- **White** _(surface=white)_ — White-surface variant — the standard DS light toolbar background, keeping the AI brand accents, radius and elevation.
- **Docked left** _(dock=left)_ — Vertical bar pinned to the left edge of the surface; flush to the edge with the outer corners squared.
- **Docked left (white)** _(dock=left stageSurface="white")_ — Left-docked vertical bar on a taller, plain white stage — the docked bar reads against a clean page background instead of the blue-tinted gradient.
- **Docked left (dark)** _(barTheme="dark" stageSurface="white")_ — Dark nav bar kept on the dark AI surface, docked on a taller light/white stage — the dark bar reads against a clean page background.
- **Docked right** _(dock=right)_ — Vertical bar pinned to the right edge of the surface. All rounded corners are kept.
- **Floating** _(floating)_ — Floating variant with a drag grabber — grab the grip and move it anywhere in the stage.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Row or column layout. |
| `label` | `'none' \| 'right' \| 'below' \| 'right-caret'` | `'none'` | Label placement per item (right-caret adds a caret to caret items). |
| `items` | `AIToolbarItem[]` | `DEFAULT_ITEMS` | Actions — { icon, label, caret? }. |
| `surface` | `'tinted' \| 'white'` | `'tinted'` | Surface treatment — the AI blue-tinted surface, or a plain white background (keeps brand accents / radius). |
| `dock` | `'left' \| 'right'` | `—` | Pin the vertical bar to the left or right edge of a stage; all rounded corners are kept. |
| `floating` | `boolean` | `false` | Wrap the bar in a positioned stage with a drag grabber. |
| `stageHeight` | `number` | `260` | Height of the floating stage (px). |
| `floatingOffset` | `{ x: number; y: number }` | `{ x: 40, y: 48 }` | Initial floating position within the stage. |
| `defaultSelectedIndex` | `number` | `0` | Initially-selected item (uncontrolled). |
| `onSelect` | `(index: number, item: AIToolbarItem) => void` | `—` | Fires when an item is activated. |

## Tokens

### Brand fill (replaces teal[80])
| Token | Value | Usage |
| --- | --- | --- |
| `--aiu-brand` | `#4D60E6` | Hover / selected item fill (AI_RAMP[80], the 1:1 swap for teal[80]) |
| `--aiu-bg-primary-active` | `#1F2A66` | Pressed item fill |
| `--aiu-on-primary` | `#FFFFFF` | Icon / label on brand fill |
| `--aiu-focus` | `#4D60E6` | Focus ring |

### Surface & text
| Token | Value | Usage |
| --- | --- | --- |
| `--aiu-surface` | `#F5F6FF` | Toolbar surface (AI_RAMP[00]) |
| `--aiu-surface-emphasis` | `#BECAFE` | Surface emphasis (grouping / hover affordances) |
| `--aiu-text` | `#1F2A66` | Rest-state label |
| `--aiu-text-secondary` | `#3544A4` | Rest-state icon / grabber |

### Radius & elevation
| Token | Value | Usage |
| --- | --- | --- |
| `--aiu-radius-md` | `16px` | Toolbar container radius |
| `--aiu-radius-sm` | `12px` | Item radius |
| `--aiu-shadow-md` | `0 4px 16px rgba(77,96,230,0.18)` | Toolbar elevation |

## Flows

### Build an AI toolbar
Compose an AI-styled action strip.
- Import AIToolbar from ai/molecules/toolbar/AIToolbar
- Pass items (or use the defaults) and handle onSelect
- Choose orientation + label placement to fit the surface

### Add a floating toolbar
A movable tool strip the user can reposition.
- Set floating to render the positioned stage + grabber
- The user grabs the six-dot grip and drags the bar
- Position clamps to the stage bounds on move

## Code example
```tsx
import { AIToolbar } from 'ai/molecules/toolbar/AIToolbar';

// Horizontal, icon-only
<AIToolbar onSelect={(i, item) => run(item.label)} />

// Vertical with labels below
<AIToolbar orientation="vertical" label="below" />

// White-surface variant (standard DS light background, AI accents)
<AIToolbar surface="white" />

// Docked to the left or right edge — vertical, all corners rounded
<AIToolbar dock="left" />
<AIToolbar dock="right" />

// Floating, draggable — renders its own positioned stage + grabber
<AIToolbar floating />

// Custom items
<AIToolbar
  items={[
    { icon: 'home', label: 'Home' },
    { icon: 'search', label: 'Search' },
    { icon: 'palette', label: 'Palette' },
  ]}
/>
```
