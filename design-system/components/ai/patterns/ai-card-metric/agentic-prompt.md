# Agentic Prompt — AI Card Metric

You are implementing the **AI Card Metric** (`ai-card-metric`) from the Guild AI Design System.

| | |
|---|---|
| **Component** | AI Card Metric (`ai-card-metric`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | `components/ai/organisms/ai-card-metric/AICardMetric.tsx` |

> Simple optimizes for scanning. Rich adds business context. Robust adds AI insight, trust metadata, and action — all from one `density` prop.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-metric/ai-card-metric.agent.json`
4. `components/ai/organisms/ai-card-metric/ai-card-metric.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`
6. Dependency atoms listed in the mirror (do not invent lookalikes)

## Task

Implement `AICardMetric` exactly as specified. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills (accent teal `#0A6E5E`, amber `SIGNAL_AMBER[60]`, green `SIGNAL_GREEN[60]`).

## Props (summary)

- `density` (`"basic" | "simple" | "rich" | "robust"`) — gates which fields render
- `label` (`string`) — uppercase eyebrow (sentence-case at `basic`)
- `value` (`string | number`) — primary KPI
- `unit` (`string`) — optional suffix
- `valueSize` (`"sm" | "md" | "lg"`, default `"md"`)
- `accent` (`"teal" | "indigo" | "amber" | "red" | "green" | "gray"`, default `"teal"`)
- `icon` (`string | ReactNode`) — `basic` only
- `trend` (`{ delta, label?, tone? }`) — ignored at `basic`
- `status` / `target` / `source` / `freshness` / `secondaryMetric` / `actionLink` — Rich+
- `insight` / `confidence` / `onViewSources` / `onViewRationale` / `primaryAction` / `secondaryAction` — Robust
- `loading` (`boolean`, default `false`)
- `onClick` (`() => void`) — whole-card button
- `accentBar` (`boolean`, default `false`) — opt-in 2px bottom rail

## Sample exports

- `SAMPLE_CARD_METRIC_SIMPLE` — Total Sales
- `SAMPLE_CARD_METRIC_RICH` — Call Coverage
- `SAMPLE_CARD_METRIC_ROBUST` — Workload Index

## Rules

- Do not invent variants or props beyond the mirror.
- Do not invent atoms — use `AIMetricValue`, `AITrendIndicator`, `AIChip`, `AIInsightCallout`, `AIWhyThisLink`, `AIButton`.
- Do not hardcode brand hex — use documented tokens.
- Self-contained under `components/ai/` — do not require `an external AI UI package`.
- Load `components/ai/tokens/css/ai-surface.css` for `--ai-*` surface vars.
- Preserve accessibility notes from the mirror / agent.json.
- Respect `prefers-reduced-motion` for skeleton shimmer.
