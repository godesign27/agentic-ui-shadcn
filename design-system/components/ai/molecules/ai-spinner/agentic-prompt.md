# Agentic Prompt — AI Spinner

# AI Spinner — Agentic Prompt

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

- **Display name:** AI Spinner
- **Component id:** `ai-spinner`
- **Category:** molecules
- **Status:** Beta
- **File path:** `ds/ai-spinner.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `ds/ai-spinner.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Spinner
_ai-spinner_

> The standard DS spinner, wearing the AI brand. Same engineering — indigo arc on a soft light-indigo ring.

## Metadata
- **Category:** molecules
- **Status:** Beta
- **Source path:** `ds/ai-spinner.tsx`
- **Tier 1 · Experience Mode:** AI Assisted · Adaptive · AI Led
- **Tier 2 · AI Behavior:** Working · Loading
- **Metrics:** 3 states · 0 shared · ~1KB context · 0 behaviors

## Overview

AISpinner does not fork the DS spinner — it wraps the canonical <DSSpinner /> and re-anchors the CSS variables it reads (`--primary` for the rotating arc, the track var for the ring) to AI token values. Geometry, the DS size contract (48/32/24/20/16/14/12/8px), a11y (role="status"), the spin keyframes and the reduced-motion guard are all inherited from the base, so the spinner stays in lockstep with DS while carrying the AI surface. It is a reusable spinner molecule meant to be composed inside other AI molecules and organisms, and it is separate from — it does NOT replace — the AI loading indicator.

## When to use
- Indeterminate loading inside an AI-generated region, card, or drawer
- Composed inside other AI molecules / organisms that need a brand-consistent spinner
- On dark or filled AI surfaces — use the dark / inverse variants

## When not to use
- To show multi-step agent progress — use the AI loading indicator or reasoning trace
- For determinate progress — use AI Progress
- It does not replace the AI loading indicator; both exist for different jobs

## Anatomy
1. **Track ring** _(Shared)_ — Static full ring. Light mode: soft light-indigo (AI.color.surface.emphasis). Dark mode: subtle light ring.
2. **Rotating arc** _(Unique)_ — The animated segment. Light mode: AI indigo (AI.color.action.primary). Dark/inverse: light-indigo / white.

## State variations
- **Light** _(default)_ — Indigo arc on a soft light-indigo ring — default AI surface.
- **Dark** _(dark)_ — Light ring + light-indigo arc for dark surfaces.
- **Inverse** _(inverse)_ — White-based ring + white arc for filled AI surfaces (e.g. a primary button).

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"48px" \| "32px" \| "24px" \| "20px" \| "16px" \| "14px" \| "12px" \| "8px"` | `"24px"` | DS size contract, inherited from DSSpinner. |
| `dark` | `boolean` | `false` | Render for dark surfaces (light ring + light-indigo arc). |
| `inverse` | `boolean` | `false` | Render on a filled AI surface (white-based ring + white arc). |
| `label` | `string` | `"Loading"` | Accessible name for the status role. |

## Tokens

### DS AI Spinner
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.action.primary` | `#4D60E6` | Rotating arc (light mode) |
| `AI.color.surface.emphasis` | `#BECAFE` | Track ring (light mode) / arc (dark mode) |

## Code example
```tsx
import { AISpinner } from '@/components/ds/ai-spinner';

<AISpinner size="24px" />
<AISpinner size="32px" dark />
<AISpinner size="24px" inverse />
```
