# AI Metric Tile

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiMetricTile`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Compact raised tile for a single metric reading — eyebrow + value + optional qualifier.

AIMetricTile is the canonical surface for surfacing a single metric reading — confidence, trend, threshold, target — inside detail drawers, trust panels, and capability inspectors. The tile pairs an uppercase eyebrow ("CONFIDENCE", "TREND", "HALT THRESHOLD") with the metric value rendered in the brand-ink, and an optional qualifier chip tinted by tone ("High" in brand blue, "Medium" in ZS orange, "Low" in ZS orange deep, neutral in helper grey).

**Export:** `AIMetricTile`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/metric-tile/AIMetricTile.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-metric-tile/ai-metric-tile.md` | This mirror spec |
| `components/ai/atomic/ai-metric-tile/ai-metric-tile.agent.json` | Agent manifest |
| `components/ai/atomic/ai-metric-tile/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Quantify · Evaluate · Summarize |
| Accountability | Accountability · Trust · Transparency |

## Anatomy

1. **Eyebrow label** _(Unique)_ — Uppercase metric name — "CONFIDENCE", "TREND", "HALT THRESHOLD".
2. **Value** _(Unique)_ — Numeric or short-text value rendered at 22px (md) or 18px (sm).
3. **Qualifier** _(Optional)_ — Small trailing chip — "High", "Medium", "Low", "Stable" — tinted by tone.
4. **Accent rule** _(Optional)_ — 3px right border in the qualifier tone, when accent=true.

## State variations

- **Positive qualifier** _(positive)_ — Brand-blue qualifier — High confidence, on-track.
- **Attention qualifier** _(attention)_ — ZS orange qualifier — Medium confidence.
- **Critical qualifier** _(critical)_ — ZS orange deep qualifier — Low confidence, halted.
- **Neutral** _(neutral)_ — Helper grey — no qualitative judgment.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `—` | Uppercase eyebrow label. |
| `value` | `ReactNode` | `—` | Metric value body. |
| `qualifier` | `string` | `—` | Small trailing chip text. |
| `qualifierTone` | `"positive" \| "attention" \| "critical" \| "neutral"` | `"positive"` | Drives the qualifier color. |
| `size` | `"sm" \| "md"` | `"md"` | Padding + value font size. |
| `accent` | `boolean` | `false` | Adds a 3px right border in the qualifier tone. |
| `ariaLabel` | `string` | `—` | Override the auto-derived aria-label. |

## Canonical implementation

```tsx
import { AIMetricTile } from '@/components/ai/atomic/metric-tile/AIMetricTile';

<AIMetricTile label="CONFIDENCE" value="94%" qualifier="High" />
<AIMetricTile label="TREND"      value="Stable" />
<AIMetricTile label="HALT THRESHOLD" value="0.75" qualifier="risk" qualifierTone="attention" />
```

## Agent rules

1. Read this mirror spec and `ai-metric-tile.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-metric-tile/ai-metric-tile.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
