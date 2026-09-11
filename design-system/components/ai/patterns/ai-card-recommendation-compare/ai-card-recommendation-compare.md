# AI Card Recommendation Compare

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardRecommendationCompare`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Side-by-side comparison of 2–3 AI-generated options with confidence scores, risk levels, expandable tradeoffs, and operator choice controls.

The Recommendation Compare Card presents 2–3 AI-generated options in a scannable column layout. Each option shows a confidence/risk badge, expandable tradeoffs, and key metrics. A "Recommended" badge highlights the highest-confidence option. Operators choose, merge, or send to another agent.

**Export:** `AICardRecommendationCompare`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-recommendation-compare/AICardRecommendationCompare.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-recommendation-compare/ai-card-recommendation-compare.md` | This mirror spec |
| `components/ai/organisms/ai-card-recommendation-compare/ai-card-recommendation-compare.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-recommendation-compare/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | Adaptive · AI Led |
| AI behavior | Compare · Confirm · Evaluate |
| Accountability | Confidence · Rationale · Assumptions |

## Anatomy

1. **Header** _(Shared)_ — Title + options count badge
2. **Option Columns** _(Unique)_ — 2–3 side-by-side option panels
3. **Recommended Badge** _(Unique)_ — Green badge on highest-confidence option
4. **Confidence/Risk Row** _(Shared)_ — AIConfidenceRiskBadge per option
5. **Tradeoffs Disclosure** _(Unique)_ — Expandable bullet list per option
6. **Action Row** _(Shared)_ — Merge Options / Send to Agent

## State variations

- **2 Options** _(options.length=2)_ — Two-column compare view
- **3 Options** _(options.length=3)_ — Three-column compare view
- **Option Chosen** _(chosen=set)_ — Chosen option highlighted with blue background — click a Choose button to activate
- **Tradeoffs Open** _(tradeoffs=expanded)_ — Tradeoff lists visible — click the Tradeoffs toggle to expand

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Compare Options"` | Card title |
| `options` | `RecommendationOption[]` | `required` | 2–3 options to compare |
| `onChoose` | `(index: number) => void` | `undefined` | Called when user chooses an option |
| `onMerge` | `() => void` | `undefined` | Merge options handler |
| `onSendToAgent` | `() => void` | `undefined` | Send to agent handler |

## Tokens

### Brand
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-brand` | `#4D60E6` | Chosen option highlight and Choose button |

## Flows

### Option selection
User reviews and selects an option
- Card shows 2–3 options
- User expands tradeoffs
- User clicks Choose on preferred option
- Option highlights blue
- onChoose fires with index

## Canonical implementation

```tsx
import { AICardRecommendationCompare } from '@/components/ai/organisms/ai-card-recommendation-compare/AICardRecommendationCompare';

<AICardRecommendationCompare
  title="Choose Outreach Strategy"
  options={[
    { label: 'Personalized Email', confidence: 'high', risk: 'low', tradeoffs: ['Slower', 'High engagement'], metrics: { 'Open Rate': '42%', 'Time': '3d' } },
    { label: 'Bulk Campaign', confidence: 'medium', risk: 'medium', tradeoffs: ['Faster', 'Lower personalization'], metrics: { 'Open Rate': '18%', 'Time': '1d' } },
  ]}
  onChoose={(i) => console.log('Chose option', i)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-recommendation-compare.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-recommendation-compare/ai-card-recommendation-compare.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
