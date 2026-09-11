# AI Analysis Insight

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiAnalysisInsight`  
**Component type:** React molecule  
**Status:** Draft  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The individual finding unit inside an AI analysis message. Each insight is labeled by type, confidence-rated, and visually distinct — so users can scan analytical findings without mistaking them for alerts.

AIAnalysisInsight is the reusable inner finding component used inside AIAnalysisMessage and AI report summaries. It renders a labeled finding card with a left accent bar, type label, confidence badge, body text, and optional metric highlight, source indicators, rationale link, and action button. Twelve insight types are supported: Key Trend, Observation, Risk Signal, Opportunity, Anomaly, Recommendation, Watchout, Evidence, Warning, Context, Benchmark, and Prediction. Each type has distinct visual treatment while sharing the same card structure.

**Export:** `AIAnalysisInsight`

Do not use AIAnalysisInsight for system notifications or generic alerts — use AINotification instead.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/ai-analysis-insight/AIAnalysisInsight.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-analysis-insight/ai-analysis-insight.md` | This mirror spec |
| `components/ai/molecules/ai-analysis-insight/ai-analysis-insight.agent.json` | Agent manifest |
| `components/ai/molecules/ai-analysis-insight/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Identify · Explain · Compare · Evaluate · Recommend |
| Accountability | Confidence · Source · Rationale · Assumption · Review status |

## When to use

- To highlight one analytical finding inside an AI analysis message
- To distinguish trend, observation, risk, opportunity, recommendation, or evidence
- Inside AI report summaries or command center analysis modules
- When users need to scan individual findings quickly without reading a full paragraph

## When not to use

- System notifications or urgent events — use AINotification instead
- Generic alert cards that are not AI-authored analytical findings
- When plain text is enough — do not add insight structure to simple statements
- Do not use severe colors (red/orange) unless the insight is genuinely urgent or risky

## Anatomy

1. **Left Accent Bar** _(Shared)_ — 3px left border — primary visual differentiator for insight type (color varies per type)
2. **RiFontSize2 Label** _(Unique)_ — Uppercase insight type name — KEY TREND / OBSERVATION / RISK SIGNAL etc. — text-based, not color-only
3. **Confidence Badge** _(Shared)_ — Pill chip — High / Medium / Low / Review Suggested / Data Stale / Source Limited — always visible when provided
4. **Optional Title** _(Unique)_ — Short bold summary line above the body text — for richer insight cards
5. **Body Text** _(Unique)_ — Main analytical finding text — factual, specific, never fabricated
6. **Metric Highlight** _(Unique)_ — Optional highlighted metric pill below body — e.g. "+23% engagement"
7. **Sources Strip** _(Shared)_ — Source chips shown when showSources=true and sources array provided
8. **Rationale / Sources Links** _(Shared)_ — Why this? and View sources ghost links when onViewRationale / onViewSources provided
9. **Action Button** _(Unique)_ — Optional follow-up action button — only when the insight has a direct recommended action

## State variations

- **Basic density** _(density="basic")_ — Minimum viable finding — type label + body only. For dense lists, mobile, and surfaces that already provide trust metadata elsewhere.
- **Simple density** _(density="simple")_ — Fast-scan with light trust signal — confidence badge + optional metric chip. For chat / drawer.
- **Rich density** _(density="rich")_ — Contextual insight with trust metadata, freshness, review indicator, and rationale link. For analysis messages, dashboards, review surfaces.
- **Robust density** _(density="robust")_ — Governed, explainable, actionable — adds risk pill, owner, multi-action row, and view-sources/assumptions links. For AI Led dashboards and review/approval flows.
- **Key Trend** _(type="keyTrend")_ — Teal accent bar and label — direction-of-change treatment.
- **Risk Signal** _(type="riskSignal")_ — Red accent — flags risk findings for review.
- **Opportunity** _(type="opportunity")_ — Green accent — positive business finding.
- **Recommendation** _(type="recommendation")_ — Orange accent — AI-suggested next step with a built-in action button.
- **Watchout** _(type="watchout")_ — Subtle orange — caution without urgency.
- **Evidence** _(type="evidence")_ — Neutral gray — source-backed supporting proof point.
- **Anomaly** _(type="anomaly")_ — Purple accent — unexpected data pattern.
- **Warning** _(type="warning")_ — Yellow accent — caution that needs attention but is not yet a risk.
- **Context** _(type="context")_ — Tan accent — background framing.
- **Benchmark** _(type="benchmark")_ — Brand-blue accent — comparison against a target, prior period, or peer group.
- **Prediction** _(type="prediction")_ — Purple accent — forward-looking forecast.
- **High confidence** _(confidence="high")_ — Teal confidence badge signals strong AI certainty.
- **Low confidence** _(confidence="low")_ — Red confidence badge signals uncertain output.
- **Data Stale** _(confidence="dataStale")_ — Orange badge with warning indicator — data freshness caveat.
- **Low risk** _(risk="low")_ — Rich+. Green risk pill alongside the confidence badge.
- **Medium risk** _(risk="medium")_ — Rich+. Amber risk pill.
- **High risk** _(risk="high")_ — Rich+. Red risk pill — pair with reviewIndicator for governance flows.
- **Review suggested** _(reviewIndicator="reviewSuggested")_ — Rich+. Orange review-suggested chip surfaces in the header.
- **Human reviewed** _(reviewIndicator="humanReviewed")_ — Rich+. Green badge indicates the insight has been reviewed and accepted by a human.
- **Escalated** _(reviewIndicator="escalated")_ — Rich+. Red escalation chip — surfaces in approval / oversight flows.
- **With sources + freshness** _(showSources + freshness)_ — Rich+. Source chips + freshness caveat below the body.
- **With rationale link** _(showRationale={true})_ — Why this? ghost link below the body — opens ai-rationale-panel.
- **With action** _(action={{ label }})_ — Single action button rendered below the body — for insights with a direct next step.
- **With multi-action row** _(actions={[…]})_ — Robust only. Multiple actions render as a row below the body.
- **With owner / reviewer** _(owner="Maya Chen")_ — Robust only. Owner line under the metadata row.
- **Hover** _(hover interaction)_ — Subtle outline border appears at card edge — uses color-mix so it renders for every variant (the prior hex-alpha trick silently dropped on CSS-variable colors).

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `type` | `InsightType` | `required` | keyTrend \| observation \| riskSignal \| opportunity \| anomaly \| recommendation \| watchout \| evidence \| warning \| context \| benchmark \| prediction |
| `body` | `string` | `required` | Main analytical finding text |
| `title` | `string` | `—` | Optional short bold summary line above body |
| `density` | `"basic" \| "simple" \| "rich" \| "robust"` | `"rich"` | Content-density variant. Higher-density-only props (risk, freshness, multi-action row, view-assumptions) are silently ignored at lower densities so a Simple insight can never grow a Robust action footer. |
| `confidence` | `ConfidenceVariant` | `—` | Simple+. high \| medium \| low \| reviewSuggested \| dataStale \| sourceLimited |
| `risk` | `"low" \| "medium" \| "high"` | `—` | Rich+. Risk pill rendered next to the confidence badge. |
| `reviewIndicator` | `"reviewSuggested" \| "humanReviewed" \| "escalated"` | `—` | Rich+. Review-status chip in the header row. |
| `metric` | `string` | `—` | Simple+. Metric highlight pill below body. Uses color-mix for the tint so it renders correctly on every variant. |
| `sources` | `string[]` | `—` | Rich+. Source labels shown when showSources=true. |
| `freshness` | `string` | `—` | Rich+. Freshness caveat appended to the sources strip ("Updated 2h ago"). |
| `owner` | `string` | `—` | Robust. Owner / reviewer line under the metadata row. |
| `action` | `{ label, onClick }` | `—` | Rich+. Single action button rendered below the body. |
| `actions` | `AIAnalysisInsightAction[]` | `—` | Robust. Multiple actions render as a row. Takes precedence over `action` when both are provided. |
| `status` | `InsightStatus` | `"default"` | default \| reviewSuggested \| dataStale \| sourceLimited \| selected \| expanded |
| `showRationale` | `boolean` | `false` | Rich+. Show Why this? ghost link — requires onViewRationale to fire |
| `showSources` | `boolean` | `false` | Rich+. Show sources strip and View sources link |
| `showAssumptions` | `boolean` | `false` | Robust. Show View assumptions ghost link. |
| `onViewRationale` | `() => void` | `—` | Fires when user clicks Why this? link |
| `onViewSources` | `() => void` | `—` | Fires when user clicks View sources link |
| `onViewAssumptions` | `() => void` | `—` | Fires when user clicks View assumptions link |
| `onAction` | `() => void` | `—` | Overrides action.onClick — fires when action button is clicked |

## Tokens

### Key Trend
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `#0DACAD` | Left accent bar and label color |
| `bg` | `#f1feff` | Card background |

### Risk Signal
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `#E74C3C` | Left accent bar and label color |
| `bg` | `#FFF5F5` | Card background |

### Opportunity
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `#27AE60` | Left accent bar and label color |
| `bg` | `#F0FFF4` | Card background |

### Recommendation / Watchout
| Token | Value | Usage |
| --- | --- | --- |
| `border` | `ZS_ORANGE[60] (#EC7200)` | Left accent bar |
| `bg` | `ZS_ORANGE["00"] (#FEFBF4)` | Card background for Recommendation and Watchout |

## Flows

### Insight with rationale
User reads a Risk Signal and opens the rationale to understand the AI reasoning
- Render AIAnalysisInsight with type="riskSignal" and showRationale=true
- User sees red accent bar, RISK SIGNAL label, and confidence badge
- User clicks Why this? — onViewRationale fires
- Parent opens AIRationalePanel overlay with full reasoning

## Canonical implementation

```tsx
import { AIAnalysisInsight } from '@/components/ai/molecules/ai-analysis-insight/AIAnalysisInsight';

{/* Key Trend */}
<AIAnalysisInsight
  type="keyTrend"
  body="Q1 oncology territories show 23% higher engagement in Northeast regions."
  confidence="high"
  metric="+23% engagement"
  showRationale
  onViewRationale={() => openRationale()}
/>

{/* Risk Signal */}
<AIAnalysisInsight
  type="riskSignal"
  body="Three critical accounts show declining engagement and no assigned follow-up."
  confidence="reviewSuggested"
  action={{ label: 'Review accounts', onClick: () => openAccounts() }}
/>

{/* Recommendation */}
<AIAnalysisInsight
  type="recommendation"
  body="Reassign two accounts from Southwest to Northeast to improve coverage balance."
  confidence="medium"
/>
```

## Agent rules

1. Read this mirror spec and `ai-analysis-insight.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-analysis-insight/ai-analysis-insight.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
