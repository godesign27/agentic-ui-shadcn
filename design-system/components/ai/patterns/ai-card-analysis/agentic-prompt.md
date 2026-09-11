# Agentic Prompt — AI Card Analysis

You are implementing the **AI Card Analysis** (`ai-card-analysis`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Analysis (`ai-card-analysis`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Compact analysis summary — metrics + insights + trust + actions in one card. Three densities cover chat, drawer, and dashboard surfaces.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-analysis/ai-card-analysis.agent.json`
4. `components/ai/organisms/ai-card-analysis/ai-card-analysis.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardAnalysis` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`"simple" \) default `"rich" \` — "robust"`
- `intro` (`string`) default ``—`` — 1-line lead-in sentence above the title.
- `title` (`string`) default ``—`` — Analysis title (H3).
- `analysisType` (`string`) default ``—`` — Uppercase brand-color type label at top ("Territory analysis").
- `timestamp` (`string`) default ``—`` — Freshness or "generated at" timestamp.
- `collapsible` (`boolean`) default ``false`` — Adds a chevron toggle in the header.
- `defaultExpanded` (`boolean`) default ``true`` — Initial expanded state when `collapsible` is on.
- `metrics` (`AIAnalysisMetric[]`) default ``—`` — Array of metric card props. Density auto-inherits from the parent unless overridden per metric.
- `metricsColumns` (`number`) default ``2`` — Column count for the metric grid.
- `insights` (`AIInsightItem[]`) default ``—`` — Insight list items.
- `insightsTitle` (`string`) default ``"Key insights"`` — Eyebrow above the insight list.
- `maxInsights` (`number`) default ``—`` — Cap visible insights; passed to `AIInsightList.maxVisible`.
- `source` (`{ label, icon? }`) default ``—`` — Rich+. Source chip below the insights.
- `freshness` (`string`) default ``—`` — Rich+. Freshness chip.
- `confidence` (`number (0–100)`) default ``—`` — Rich+. Confidence pill. Tone derived from value (green ≥80, amber 60–79, red <60).
- `risk` (`"low" \) default `"medium" \` — "high"`
- `onViewRationale` (`() => void`) default ``—`` — Rich+. Renders the View rationale link.
- `onViewSources` (`() => void`) default ``—`` — Rich+. Renders the View sources link.
- `onViewAssumptions` (`() => void`) default ``—`` — Robust. Renders the View assumptions link.
- `primaryAction` (`{ label, onClick? }`) default ``—`` — Robust. Primary action button in the footer.
- `secondaryAction` (`{ label, onClick? }`) default ``—`` — Robust. Secondary action button.
- `loading` (`boolean`) default ``false`` — Skeleton state — metric grid + insight rows shimmer.
- `loadingLabel` (`string`) default ``"Analyzing…"`` — Calm copy shown above the skeleton.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
