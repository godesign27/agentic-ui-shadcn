# AI Card Analysis

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardAnalysis`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Compact analysis summary — metrics + insights + trust + actions in one card. Three densities cover chat, drawer, and dashboard surfaces.

AICardAnalysis gives users a structured, scannable summary of an AI analysis without requiring a full dashboard or long-form response. It composes existing atoms — `AICardMetric` for the metric grid, `AIInsightList` for the findings, `AIChipBrief` for source / freshness, `AIWhyThisLink` for rationale / sources / assumptions, `AIButton` for actions — into one reusable block.

**Export:** `AICardAnalysis`

Three density levels: Simple (chat, narrow drawers), Rich (side drawer, product page), Robust (generated dashboards, review flows). Higher-density-only props (`confidence`, `risk`, `primaryAction`, etc.) are ignored at lower densities with a dev warning — a Simple analysis card cannot accidentally grow a Robust action footer.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/organisms/ai-card-analysis/AICardAnalysis.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-analysis/ai-card-analysis.md` | This mirror spec |
| `components/ai/organisms/ai-card-analysis/ai-card-analysis.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-analysis/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Analyze · Summarize · Compare · Detect · Explain · Recommend · Review |
| Accountability | Sources · Rationale · Confidence · Risk · Data freshness · Human review · Assumptions |

## When to use

- AI summarizes an analysis with metrics and insights
- Conversational response needs structured output
- Side drawer needs compact analysis
- Generated dashboard needs a summary module
- Users need rationale, confidence, or risk metadata attached to an analysis

## When not to use

- A simple text answer is enough
- A full dashboard is needed
- A single notification / alert is enough — use `ai-notification`
- A long-form report is required
- There are no metrics or structured insights

## Anatomy

1. **RiFontSize2 label + timestamp** _(Shared)_ — Optional uppercase analysis type (brand color) and freshness timestamp at top of the card.
2. **Title** _(Shared)_ — Optional H3 analysis title.
3. **Intro** _(Shared)_ — Optional 1-line lead-in sentence ("Here is the full Q2 territory analysis:").
4. **Collapse control** _(Unique)_ — Optional chevron toggle in the header. Top-right, aria-expanded.
5. **Metric grid** _(Shared)_ — `AICardMetric` grid. 2-up by default; caller can override `metricsColumns`.
6. **Insight list** _(Shared)_ — `AIInsightList` — gated by density: Simple = compact density, Rich/Robust = comfortable. Sources + actions surface in Rich+.
7. **Source + freshness** _(Shared)_ — Rich+. `AIChipBrief` pills below the insight list.
8. **Trust footer** _(Shared)_ — Rich+. Confidence pill + risk pill on the left; view-rationale / view-sources / view-assumptions links pushed to the right. Top divider.
9. **Action row** _(Unique)_ — Robust only. Primary + secondary `AIButton`. Top divider.
10. **Loading state** _(Shared)_ — Skeleton grid + calm copy ("Analyzing territory coverage…"). Respects `prefers-reduced-motion`.

## State variations

- **Simple density — chat-ready** _(density="simple")_ — Intro + 4 metric tiles + insight list. No status badges, no actions, no trust footer. Use inside chat bubbles or narrow side drawers.
- **Rich density** _(density="rich")_ — Adds type label, timestamp, source/freshness chips, confidence + risk pills, view-rationale link, and a single action button. Fits a side drawer or product page.
- **Robust density** _(density="robust")_ — Full AI-led card — adds view-sources, view-assumptions, and a primary + secondary action footer. For generated dashboards and review flows.
- **Loading state** _(loading={true})_ — Calm copy + skeleton metric grid + skeleton insight rows. Respects `prefers-reduced-motion`. Use during follow-up prompt updates.
- **Collapsible** _(collapsible defaultExpanded={false})_ — Header includes a chevron toggle; body collapses to the header alone. Body re-expands on click. Aria-expanded reflects state.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `"simple" \| "rich" \| "robust"` | `required` | Controls which fields render. Higher-density-only props are ignored at lower densities with a dev warning. |
| `intro` | `string` | `—` | 1-line lead-in sentence above the title. |
| `title` | `string` | `—` | Analysis title (H3). |
| `analysisType` | `string` | `—` | Uppercase brand-color type label at top ("Territory analysis"). |
| `timestamp` | `string` | `—` | Freshness or "generated at" timestamp. |
| `collapsible` | `boolean` | `false` | Adds a chevron toggle in the header. |
| `defaultExpanded` | `boolean` | `true` | Initial expanded state when `collapsible` is on. |
| `metrics` | `AIAnalysisMetric[]` | `—` | Array of metric card props. Density auto-inherits from the parent unless overridden per metric. |
| `metricsColumns` | `number` | `2` | Column count for the metric grid. |
| `insights` | `AIInsightItem[]` | `—` | Insight list items. |
| `insightsTitle` | `string` | `"Key insights"` | Eyebrow above the insight list. |
| `maxInsights` | `number` | `—` | Cap visible insights; passed to `AIInsightList.maxVisible`. |
| `source` | `{ label, icon? }` | `—` | Rich+. Source chip below the insights. |
| `freshness` | `string` | `—` | Rich+. Freshness chip. |
| `confidence` | `number (0–100)` | `—` | Rich+. Confidence pill. Tone derived from value (green ≥80, amber 60–79, red <60). |
| `risk` | `"low" \| "medium" \| "high"` | `—` | Rich+. Risk pill. |
| `onViewRationale` | `() => void` | `—` | Rich+. Renders the View rationale link. |
| `onViewSources` | `() => void` | `—` | Rich+. Renders the View sources link. |
| `onViewAssumptions` | `() => void` | `—` | Robust. Renders the View assumptions link. |
| `primaryAction` | `{ label, onClick? }` | `—` | Robust. Primary action button in the footer. |
| `secondaryAction` | `{ label, onClick? }` | `—` | Robust. Secondary action button. |
| `loading` | `boolean` | `false` | Skeleton state — metric grid + insight rows shimmer. |
| `loadingLabel` | `string` | `"Analyzing…"` | Calm copy shown above the skeleton. |

## Flows

### Chat analysis response
User asks for Q2 territory analysis; AI returns Simple analysis card inside the response bubble.
- RiUserLine: "Give me the Q2 territory analysis"
- AI returns `<AICardAnalysis density="simple" />` with intro + 4 metrics + 4 insights
- User clicks View rationale (if Rich+) → opens `ai-rationale-panel`

### Side drawer analysis
User opens AI Assisted Side Drawer on a territory page; AI shows a Rich analysis card.
- Side drawer mounts with a Rich card — metric grid + insight list
- User clicks Generate scenario in the action row → opens scenario flow

### Review-needed analysis
Robust card with Medium risk and Needs review prompts the user to open rationale or review flow.
- Card renders with `risk="medium"` + needs-review insight items
- User clicks View rationale → opens detailed `ai-rationale-panel`
- User clicks Review territories → opens review flow

### Updating from follow-up prompt
RiUserLine asks "Show this by region"; metric cards and insight list update with calm transition.
- Card enters `loading` state with skeleton tiles + "Analyzing by region…" copy
- On response, new metrics + insights swap in; respect `prefers-reduced-motion`

## Canonical implementation

```tsx
import { AICardAnalysis } from 'ai/organisms/ai-card-analysis/AICardAnalysis';

// Simple — chat / narrow drawer
<AICardAnalysis
  density="simple"
  intro="Here is the full Q2 territory analysis:"
  metrics={[
    { label: 'Overall coverage', value: '74', unit: '%', accent: 'teal',  trend: { delta: '+8%', label: 'QoQ',         tone: 'positive' } },
    { label: 'Accounts at risk', value: '31',            accent: 'amber', trend: { delta: '-4',  label: 'vs last week', tone: 'positive' } },
  ]}
  insights={[
    { id: '1', text: 'Northeast gap widened 12% since Q1.', severity: 'critical' },
    { id: '2', text: 'Southeast above target for 3 quarters.', severity: 'positive' },
  ]}
/>

// Robust — generated dashboard / review flow
<AICardAnalysis
  density="robust"
  analysisType="Territory analysis"
  title="Q2 territory coverage — needs review"
  metrics={[ /* … */ ]}
  insights={[ /* … */ ]}
  source={{ label: 'Territory model' }}
  freshness="Updated 2h ago"
  confidence={88}
  risk="medium"
  onViewRationale={() => {}}
  onViewSources={() => {}}
  primaryAction={{ label: 'Review territories' }}
  secondaryAction={{ label: 'Generate scenario' }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-analysis.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-analysis/ai-card-analysis.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
