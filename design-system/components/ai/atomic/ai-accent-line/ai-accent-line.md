# AI Accent Line

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiAccentLine`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Seven pluggable accent treatments for insight cards — from gradient ribbons to glowing rules — switchable at the AIAnalysisMessage level via a built-in style picker.

AIAccentLine is a presentational atom that renders an edge accent on AI insight cards. It supports 7 styles — gradient, solid, top-bar, glow, dash, double, and none — all driven by a single `style` prop and a `color` prop sourced from the card's insight type.

**Export:** `AIAccentLine`

The accent line replaces the previous corner-notch (triangle clipPath) visual treatment. It is applied by `AIAnalysisInsight` and controlled at the group level by the style picker built into `AIAnalysisMessage`.

All styles are absolutely positioned with `pointerEvents: none` so they never interfere with card content or interactions.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/accent-line/AIAccentLine.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-accent-line/ai-accent-line.md` | This mirror spec |
| `components/ai/atomic/ai-accent-line/ai-accent-line.agent.json` | Agent manifest |
| `components/ai/atomic/ai-accent-line/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Identify · Attribute |
| Accountability | Brand identity · Insight hierarchy |

## When to use

- On AIAnalysisInsight cards — set via accentStyle prop or AIAnalysisMessage's style picker
- On any custom card surface that needs a branded left-edge treatment
- When visual differentiation between insight types is needed beyond color alone

## When not to use

- Do not use multiple accent lines stacked on the same card
- Do not use accent lines on user-authored content — only on AI-generated insights

## Anatomy

1. **Accent element** _(Unique)_ — Absolutely positioned span rendered on the left edge (or top edge for top-bar). pointerEvents: none.
2. **Color slot** _(Shared)_ — Receives the insight type's labelColor — the same saturated accent used for the eyebrow text.
3. **Style variant** _(Unique)_ — One of 7 AccentLineStyle values that determines the visual treatment.

## State variations

- **Side accent** _(style="gradient")_ — Left-edge vertical gradient ribbon (the "side accent") — 4px wide, color fades to transparent at 50% height. Rendered by style="gradient".
- **Hover** _(:hover treatment)_ — Recommended hover treatment for an accented card — the card lifts and the side accent brightens. Hover the card to preview.
- **Top bar** _(style="top-bar")_ — Horizontal gradient bar at the top edge
- **None** _(style="none")_ — No accent treatment

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `color` | `string` | `required` | Accent element fill color — typically the insight type's labelColor. |
| `style` | `AccentLineStyle` | `"gradient"` | One of: gradient \| solid \| top-bar \| glow \| dash \| double \| none. |

## Tokens

### Accent
| Token | Value | Usage |
| --- | --- | --- |
| `color` | `from insight type labelColor` | Accent element fill / gradient start color |
| `width` | `4px (side accent) / 4px (top-bar)` | Accent element thickness |
| `background (side accent)` | `linear-gradient(to bottom, {color} 0%, transparent 50%)` | Left-edge "side accent" gradient — fades to transparent at 50% height |
| `background (top-bar)` | `linear-gradient(to right, {color} 0%, transparent 50%)` | Top-bar gradient — fades to transparent at 50% width |
| `borderRadius (side accent)` | `4px 0 0 4px` | Rounds the side accent to the card corner |

## Canonical implementation

```tsx
import { AIAccentLine } from '@/components/ai/atomic/accent-line/AIAccentLine';

// Gradient ribbon (default — matches the design reference)
<AIAccentLine color="#4D60E6" style="gradient" />

// Solid left rule
<AIAccentLine color="#4D60E6" style="solid" />

// Horizontal top bar
<AIAccentLine color="#4D60E6" style="top-bar" />

// Glowing border
<AIAccentLine color="#4D60E6" style="glow" />

// Dashed left border
<AIAccentLine color="#4D60E6" style="dash" />

// Double parallel lines
<AIAccentLine color="#4D60E6" style="double" />

// No accent
<AIAccentLine color="#4D60E6" style="none" />
```

## Agent rules

1. Read this mirror spec and `ai-accent-line.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-accent-line/ai-accent-line.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
