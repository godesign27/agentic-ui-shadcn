# AI Metric Value

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiMetricValue`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The big number at the heart of every AI Card Metric. Three sizes share one type scale so dashboards stay rhythmic.

Renders a single KPI value (e.g. `42.8K`, `78%`, `1.18`) at one of three sizes — sm 24px, md 32px, lg 40px. Tabular numerals + tight letter-spacing keep numbers crisp and aligned. Optional `unit` slot renders inline at 60% of the value size so suffixes like `K` / `%` stay clearly subordinate.

**Export:** `AIMetricValue`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/metric-value/AIMetricValue.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-metric-value/ai-metric-value.md` | This mirror spec |
| `components/ai/atomic/ai-metric-value/ai-metric-value.agent.json` | Agent manifest |
| `components/ai/atomic/ai-metric-value/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Monitor · Evaluate |
| Accountability | — |

## Anatomy

1. **Value text** _(Unique)_ — Primary numeric value. Bold, tabular numerals, tight tracking.
2. **Unit suffix** _(Unique)_ — Optional inline unit (`K`, `%`). 60% of value font-size, weight 600, opacity 0.7.

## State variations

- **Small** _(size="sm")_ — 24px / 700 — compact dashboards, dense grids
- **Medium** _(size="md")_ — 32px / 700 — default for Rich + Robust metric cards
- **Large** _(size="lg")_ — 40px / 700 — hero KPI, single-metric cards

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | `required` | Primary value to render. |
| `unit` | `string` | `—` | Optional inline unit suffix. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | RiFontSize2 scale. |
| `color` | `string` | `var(--ai-ds-text)` | Override the value color (e.g. for accent treatment). |
| `ariaLabel` | `string` | `—` | Accessible name. Defaults to `${value} ${unit}`. |

## Canonical implementation

```tsx
import { AIMetricValue } from 'ai/atomic/metric-value/AIMetricValue';

<AIMetricValue value="42.8" unit="K"  size="md" />
<AIMetricValue value="78"   unit="%"  size="md" />
<AIMetricValue value="1.18"            size="lg" />
```

## Agent rules

1. Read this mirror spec and `ai-metric-value.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-metric-value/ai-metric-value.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
