# AI Card Metric
_ai-card-metric_

> Simple optimizes for scanning. Rich adds business context. Robust adds AI insight, trust metadata, and action — all from one `density` prop.

## Metadata
- **Category:** organisms
- **Status:** Beta
- **Source path:** `components/ai/organisms/ai-card-metric/AICardMetric.tsx`
- **Tier 1 · Experience Mode:** AI Assisted · Adaptive · AI Led
- **Tier 2 · AI Behavior:** Monitor · Evaluate · Suggest · Explain
- **Tier 3 · Accountability:** Confidence · Data quality · Data freshness · Rationale
- **Metrics:** 5 states · 8 shared · ~12KB context · 4 behaviors

## Overview

AICardMetric renders a KPI summary at one of three densities. Simple is a fast-scan tile for dashboards (label + value + trend + optional accent + optional status dot). Rich adds business context (target, source, freshness, status badge, optional secondary metric, optional action link). Robust adds AI-led intelligence (AI insight callout, confidence pill, view-sources + view-rationale, primary + secondary actions). The card refuses to render fields above the chosen density and logs a dev warning when callers pass them, so a Simple card cannot accidentally grow an AI insight callout.

Accent system: six colors (teal / indigo / amber / red / green / gray) shown as both a top-left dot and an optional bottom border rail (`accentBar`), so the surrounding tone reads from any distance.

**Export:** `AICardMetric` · Sample props: `SAMPLE_CARD_METRIC_SIMPLE` · `SAMPLE_CARD_METRIC_RICH` · `SAMPLE_CARD_METRIC_ROBUST`

## Source (canonical implementation)

Self-contained under `components/ai/`. Agents must not require `an external AI UI package`.

| Path | Role |
|------|------|
| `components/ai/organisms/ai-card-metric/AICardMetric.tsx` | Canonical React source |
| `components/ai/organisms/ai-card-metric/ai-card-metric.md` | This spec |
| `components/ai/organisms/ai-card-metric/ai-card-metric.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-metric/agentic-prompt.md` | Copy-paste prompt |

**Dependencies (do not invent):**
- `atomic/ai-metric-value/AIMetricValue.tsx`
- `atomic/ai-trend-indicator/AITrendIndicator.tsx`
- `atomic/ai-chip/AIChip.tsx`
- `atomic/ai-insight-callout/AIInsightCallout.tsx`
- `molecules/ai-why-this-link/AIWhyThisLink.tsx`
- `atomic/ai-button/AIButton.tsx`
- `tokens/ai-tokens.ts` · `tokens/ai-typography.ts` · `tokens/css/ai-surface.css`

## When to use
- Dashboards and KPI grids (Simple)
- Generated dashboards, product overviews, review surfaces (Rich)
- AI-led intelligence cards, agentic review flows, Command Center Split View (Robust)

## When not to use
- When a single value with no trend or context is all that's needed — use a plain stat tile instead
- When the metric requires multiple visualizations — use a chart pattern
- Robust density when Simple is enough
- Robust density when the AI is not actually interpreting the metric

## Anatomy
1. **Accent dot + rail** _(Shared)_ — Top-left 8px square + optional 2px bottom border (`accentBar`) in the same accent color (teal / indigo / amber / red / green / gray).
2. **Eyebrow label** _(Shared)_ — Uppercase micro-eyebrow text (`@ai-micro-eyebrow`). Identifies the metric.
3. **Status pill** _(Shared)_ — Rich/Robust only. `AIChip kind="status"` top-right — `On track` / `Below target` / `Needs review` / `Critical`.
4. **Primary value** _(Shared)_ — `AIMetricValue` — large bold KPI number with optional unit suffix.
5. **Trend + target** _(Shared)_ — `AITrendIndicator` (delta + direction tone) inline with optional `Target: Close` text.
6. **Secondary metric** _(Unique)_ — Rich only. Sub-row with label + value, separated by a thin divider.
7. **Source + freshness** _(Shared)_ — Rich/Robust. `AIChip kind="brief"` pills with leading database / clock glyph.
8. **AI insight callout** _(Unique)_ — Robust only. `AIInsightCallout` — pale brand-blue card with sparkle + AI INSIGHT eyebrow + italic body.
9. **Confidence + sources** _(Shared)_ — Robust only. Inline confidence pill + View sources control.
10. **Action row** _(Shared)_ — Robust only. Primary + secondary `AIButton` on the left, `AIWhyThisLink view-rationale` on the right.
11. **Bottom action link** _(Unique)_ — Rich only (when no Robust action row). Inline brand-blue label + right-chevron — `View coverage gaps ›`.

## State variations
- **Basic — title + icon + value** _(density="basic")_ — Smallest density. Sentence-case title on the left, icon on the top-right, value below. No accent dot, no rail, no trend, no status. Icon accepts a Guild glyph (e.g. `"zs-icon-wrench"`) OR any React node (e.g. a Lucide icon) when the Guild library lacks the right metaphor.
- **Up trend — vs prior** _(tone="positive")_ — Green up-arrow + positive delta. Default healthy metric.
- **Down trend — vs target** _(tone="negative")_ — Red down-arrow + signed negative delta. Card accent flips to red when the metric is below target.
- **Neutral trend** _(tone="neutral")_ — Flat dash + helper-color delta. Use when there's no comparison yet or the metric is intentionally static.
- **No trend row** _(trend omitted)_ — Trend prop omitted entirely. Value sits flush above the bottom rail.
- **Loading skeleton** _(loading={true})_ — Skeleton bars replace value + trend while the data is in flight. Eyebrow + accent dot stay visible to anchor the card identity.
- **Clickable card** _(onClick={fn})_ — Setting `onClick` renders the whole card as a `<button>` with hover elevation and focus ring. Aria label is auto-derived from the label + value.
- **Accent bar variant — color palette** _(accentBar={true})_ — Opt-in 2px bottom rail in the accent color. Off by default. Teal (healthy), green (positive), red (negative / critical), amber (caution / review), indigo (AI-estimated / forecast), gray (neutral).
- **Rich density** _(density="rich")_ — Adds status badge (top-right), target inline with the trend, source + freshness chips, optional secondary metric, and an optional bottom action link.
- **Robust density** _(density="robust")_ — Full AI-led card — adds AI insight callout, confidence pill, view-sources, primary + secondary actions, view-rationale.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `density` | `"basic" \| "simple" \| "rich" \| "robust"` | `"simple"` (bare mount) | Controls which fields render. `basic` = title + icon + value only. Higher-density-only fields are ignored (with dev warning) at lower densities. |
| `label` | `string` | required (bare → Total Sales) | Eyebrow label (uppercase) for `simple`/`rich`/`robust`; sentence-case title at `density="basic"`. |
| `value` | `string \| number` | required (bare → 42.8) | Primary KPI value. |
| `unit` | `string` | — | Optional unit suffix rendered inline with the value. |
| `valueSize` | `"sm" \| "md" \| "lg"` | `"md"` | Type scale for the metric value. |
| `accent` | `"teal" \| "indigo" \| "amber" \| "red" \| "green" \| "gray"` | `"teal"` | Dot + bottom rail color. Ignored at `density="basic"`. |
| `icon` | `string \| ReactNode` | — | `basic` only. Top-right glyph. Guild `zs-icon-*` preferred, or any React node. |
| `trend` | `{ delta, label?, tone? }` | — | Trend row data. `tone` is `"positive" \| "negative" \| "neutral"`. Ignored at `density="basic"`. |
| `status` | `{ label, tone }` | — | Rich+. Top-right status pill. |
| `target` | `string` | — | Rich+. Comparison line ("Target: 81%"). |
| `source` | `{ label, icon? }` | — | Rich+. Source chip with optional `zs-icon-*` (defaults to `zs-icon-data-table`). |
| `freshness` | `string` | — | Rich+. Freshness chip with clock glyph. |
| `secondaryMetric` | `{ label, value }` | — | Rich. Sub-row beneath the primary metric. |
| `actionLink` | `{ label, href?, onClick? }` | — | Rich. Bottom-row action link with right-chevron. |
| `insight` | `string` | — | Robust. Body for the AI INSIGHT callout. |
| `confidence` | `number (0–100)` | — | Robust. Confidence percentage. Green (≥80) / amber (60–79) / red (<60). |
| `onViewSources` | `() => void` | — | Robust. Renders the View sources link. |
| `onViewRationale` | `() => void` | — | Robust. Renders the View rationale link in the action row. |
| `primaryAction` | `{ label, onClick? }` | — | Robust. Primary `AIButton` in the action row. |
| `secondaryAction` | `{ label, onClick? }` | — | Robust. Secondary `AIButton` in the action row. |
| `loading` | `boolean` | `false` | Skeleton state — value swaps for a shimmer bar. |
| `onClick` | `() => void` | — | Makes the entire card clickable (renders as `<button>` with hover elevation). |
| `accentBar` | `boolean` | `false` | Opt-in 2px bottom rail in the accent color. |

## Tokens

### Accent
| Token | Value | Usage |
| --- | --- | --- |
| `metric-card.accent.teal` | `#0A6E5E` | Default healthy / positive metrics |
| `metric-card.accent.indigo` | `AI.color.brand` | AI-estimated / forecast values |
| `metric-card.accent.amber` | `#E67E22` (`SIGNAL_AMBER[60]`) | Caution / review |
| `metric-card.accent.red` | `#C0392B` | Negative vs target / critical |
| `metric-card.accent.green` | `#27AE60` (`SIGNAL_GREEN[60]`) | Positive |
| `metric-card.accent.gray` | `DS.iconDefault` | Neutral / static |

## Flows

### Density escalation
Same metric, three densities — Simple in dashboards, Rich in product pages, Robust in AI-led review flows.
- Start with Simple on a dashboard grid — label + value + trend
- On the product page, escalate to Rich — adds target + source + freshness + status
- In an AI review flow, escalate to Robust — adds AI insight + confidence + sources + actions

## Code example
```tsx
import { AICardMetric } from 'components/ai/organisms/ai-card-metric/AICardMetric';

// Simple — fast-scan tile
<AICardMetric
  density="simple"
  label="Total Sales"
  value="42.8" unit="K"
  accent="teal"
  trend={{ delta: '+8.4%', label: 'vs prior', tone: 'positive' }}
/>

// Rich — adds context
<AICardMetric
  density="rich"
  label="Call Coverage"
  value="78" unit="%"
  accent="red"
  trend={{ delta: '-3.1%', label: 'vs target', tone: 'negative' }}
  target="Target: 81%"
  status={{ label: 'Below target', tone: 'warning' }}
  source={{ label: 'Field activity data' }}
  freshness="Updated 1h ago"
  actionLink={{ label: 'View coverage gaps' }}
/>

// Robust — adds AI insight + actions
<AICardMetric
  density="robust"
  label="Workload Index"
  value="1.15"
  accent="amber"
  trend={{ delta: '+0.08', label: 'vs prior', tone: 'positive' }}
  target="Threshold: 1.25"
  status={{ label: 'Needs review', tone: 'warning' }}
  source={{ label: 'Territory model' }}
  freshness="2h ago"
  insight="Newark pressure increased after the recent zip moves. Review adjacent zip options to balance workload before Q3 planning locks."
  confidence={88}
  onViewSources={() => {}}
  onViewRationale={() => {}}
  primaryAction={{ label: 'Review options' }}
  secondaryAction={{ label: 'Reassign zip' }}
/>
```
