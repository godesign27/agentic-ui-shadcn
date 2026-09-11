# AI Trend Indicator

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiTrendIndicator`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

How is this metric trending? One row, three tones — green up, red down, gray flat. Pairs with `ai-metric-value` inside every metric card.

Renders a directional arrow + signed delta + a secondary "vs Close" label. Caller passes a pre-formatted delta string (`+8.4%`, `-3.1%`, `0.0%`, `+4`) so the atom stays unit-agnostic. Inline SVG arrow keeps the atom font-independent — works on surfaces that have not loaded the Guild icon font.

**Export:** `AITrendIndicator`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/trend-indicator/AITrendIndicator.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-trend-indicator/ai-trend-indicator.md` | This mirror spec |
| `components/ai/atomic/ai-trend-indicator/ai-trend-indicator.agent.json` | Agent manifest |
| `components/ai/atomic/ai-trend-indicator/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Monitor · Evaluate |
| Accountability | — |

## Anatomy

1. **Direction glyph** _(Unique)_ — Inline SVG up-arrow / down-arrow / flat dash. Color matches tone.
2. **Delta** _(Unique)_ — Bold tone-colored signed value (e.g. `+8.4%`).
3. **Sub-label** _(Unique)_ — Optional secondary label (`vs prior`, `vs target`, `new gaps`). Helper color.

## State variations

- **Positive** _(tone="positive")_ — Green up-arrow — metric improved
- **Negative** _(tone="negative")_ — Red down-arrow — metric declined
- **Neutral** _(tone="neutral")_ — Gray flat dash — no change or no comparison yet

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `delta` | `string` | `required` | Pre-formatted signed value, e.g. `"+8.4%"`. |
| `label` | `string` | `—` | Secondary sub-label rendered after the delta. |
| `tone` | `"positive" \| "negative" \| "neutral"` | `"neutral"` | Color + glyph direction. |
| `size` | `"sm" \| "md"` | `"md"` | Glyph + font scale. |

## Canonical implementation

```tsx
import { AITrendIndicator } from 'ai/atomic/trend-indicator/AITrendIndicator';

<AITrendIndicator delta="+8.4%" label="vs prior"  tone="positive" />
<AITrendIndicator delta="-3.1%" label="vs target" tone="negative" />
<AITrendIndicator delta="0.0%"  label="vs prior"  tone="neutral" />
```

## Agent rules

1. Read this mirror spec and `ai-trend-indicator.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-trend-indicator/ai-trend-indicator.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
