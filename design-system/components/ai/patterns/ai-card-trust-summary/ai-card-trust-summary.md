# AI Card Trust Summary

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardTrustSummary`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Governance surface for AI-generated outputs. Visualises confidence level, risk, data quality, and freshness — and flags when human review is required.

The Trust Summary Card is the primary governance surface for AI-generated outputs. It visualises a confidence arc (0–100%), risk level, data quality stars, data freshness, source count, and whether human review is required — all in a compact card pattern for embedding alongside AI outputs in dashboards and reports.

**Export:** `AICardTrustSummary`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-trust-summary/AICardTrustSummary.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-trust-summary/ai-card-trust-summary.md` | This mirror spec |
| `components/ai/organisms/ai-card-trust-summary/ai-card-trust-summary.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-trust-summary/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Evaluate · Confirm |
| Accountability | Confidence · Data quality · Data freshness · Sources |

## Anatomy

1. **Header** _(Shared)_ — Title + Risk badge (Low / Medium / High). headerTone="gray" (default) or "tan" (#F6F2EB COMPANION_TAN[00]) for companion contexts.
2. **Confidence bar** _(Unique)_ — Horizontal progress bar — color-tinted track + filled bar matching the high/medium/low tone.
3. **Icon rows** _(Unique)_ — Risk Level · Data Quality · Last Refreshed — each with a 14px inline SVG icon and a colored value on the right.
4. **Source chips** _(Shared)_ — Bordered pill chips listing the data sources that informed the output.
5. **View sources link** _(Shared)_ — AIWhyThisLink at the bottom of the body.
6. **Request Review CTA** _(Shared)_ — Footer button visible only when requiresReview=true.

## State variations

- **High Confidence** _(confidence ≥ 70)_ — Green confidence bar + Low Risk badge.
- **Medium Confidence** _(40 ≤ confidence < 70)_ — Amber confidence bar + Medium Risk badge.
- **Low Confidence** _(confidence < 40)_ — Red confidence bar + High Risk badge — review required.
- **Tan header** _(headerTone="tan")_ — Card header uses COMPANION_TAN[00] (#F6F2EB) instead of the default gray raised surface. Use for companion / warm panel contexts.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `confidence` | `number` | `required` | Confidence score 0–100. Tone (green/amber/red) is derived from this value. |
| `risk` | `RiskLevel` | `required` | none \| low \| medium \| high — drives the header risk badge label + color. |
| `dataQuality` | `number \| string` | `required` | Numeric 0–100 score OR a label string ("Complete" / "Partial" / "Insufficient"). Numeric scores auto-map to a label. |
| `lastUpdated` | `string` | `required` | Human-readable last updated value (e.g. "2 hours ago", "Jun 6, 2026"). |
| `sources` | `string[]` | `undefined` | Source chip labels rendered as bordered pills. Falls back to "N sources" if absent. |
| `sourceCount` | `number` | `undefined` | Number of data sources — used when `sources` is not provided. |
| `requiresReview` | `boolean` | `required` | Toggles the Request Review footer button. |
| `headerTone` | `"gray" \| "tan"` | `"gray"` | Header background tone. gray = default raised card surface. tan = COMPANION_TAN[00] (#F6F2EB) for companion / warm panel contexts. |
| `onRequestReview` | `() => void` | `undefined` | Called when the Request Review button is clicked. |
| `onViewSources` | `() => void` | `undefined` | Called when "View sources" link is clicked. |

## Tokens

### Signal
| Token | Value | Usage |
| --- | --- | --- |
| `--signal-default` | `#EC7200` | Medium/high risk indicators |

## Flows

### Review request
User requests human review
- Card shows Review Required badge
- User clicks Request Review
- Review workflow triggered
- Card updates to show review pending

## Canonical implementation

```tsx
import { AICardTrustSummary } from '@/components/ai/organisms/ai-card-trust-summary/AICardTrustSummary';

<AICardTrustSummary
  confidence={78}
  risk="medium"
  dataQuality={80}
  lastUpdated="Jun 6, 2026"
  sourceCount={4}
  requiresReview={false}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-trust-summary.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-trust-summary/ai-card-trust-summary.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
