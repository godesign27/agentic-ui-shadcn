# AI Confidence & Risk Badge

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiConfidenceRiskBadge`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Compound accountability badge showing AI output confidence level, risk severity, data freshness, and source availability in a single composable row.

**Export:** `AIConfidenceRiskBadge`

The AI Confidence & Risk Badge is the primary accountability surface for AI outputs. It combines a confidence bar (high/medium/low with % fill), an optional risk chip, a stale-data warning, and a missing-source indicator into a single composable row. Always shown adjacent to AI-generated recommendations, summaries, or decisions.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/confidence-risk-badge/AIConfidenceRiskBadge.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-confidence-risk-badge/ai-confidence-risk-badge.md` | This mirror spec |
| `components/ai/atomic/ai-confidence-risk-badge/ai-confidence-risk-badge.agent.json` | Agent manifest |
| `components/ai/atomic/ai-confidence-risk-badge/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Evaluate · Confirm |
| Accountability | Confidence · Data quality · Data freshness |

## When to use

- See bundle overview

## Anatomy

1. **Confidence bar** _(Unique)_ — Horizontal progress bar inside a pill; fill color encodes level.
2. **Confidence label** _(Unique)_ — Text label "High/Medium/Low Confidence" inline with bar.
3. **Risk chip** _(Unique)_ — Optional pill shown when risk ≠ none.
4. **Stale data chip** _(Shared)_ — Clock icon + "Stale" — shown when staleData=true.
5. **Missing source chip** _(Shared)_ — Info icon + "No source" — shown when missingSource=true.

## State variations

- **High Confidence** _(high)_ — AI output is well-supported — green bar at 90%.
- **Medium Confidence** _(medium)_ — Moderate certainty — amber bar at 55%.
- **Low Confidence** _(low)_ — High uncertainty — red bar at 20%.
- **Stale Data** _(stale)_ — Data freshness concern — orange clock chip appended.
- **Missing Source** _(missing-source)_ — No source citation — red info chip appended.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `confidence` | `ConfidenceLevel` | `—` | high \| medium \| low |
| `risk` | `RiskLevel` | `"none"` | none \| low \| medium \| high |
| `staleData` | `boolean` | `false` | Show stale data indicator |
| `missingSource` | `boolean` | `false` | Show missing source indicator |
| `compact` | `boolean` | `false` | Reduce padding for dense layouts |

## Tokens

### Confidence & Risk
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.signal.subtle` | `#FFF1D6` | Low/medium risk bg |
| `AI.color.signal.default` | `#EC7200` | Medium risk border/text |
| `AI.color.signal.strong` | `#A54F00` | Risk text strong |
| `AI.color.signal.surface` | `#FEFBF4` | Low risk / stale bg |

## JavaScript / React API

```tsx
import { AIConfidenceRiskBadge } from '@/components/ai/atomic/confidence-risk-badge/AIConfidenceRiskBadge';

<AIConfidenceRiskBadge confidence="high" risk="low" />
<AIConfidenceRiskBadge confidence="medium" risk="medium" staleData />
<AIConfidenceRiskBadge confidence="low" risk="high" missingSource />
```

## Agent rules

1. Read this mirror spec and `ai-confidence-risk-badge.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-confidence-risk-badge/ai-confidence-risk-badge.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order