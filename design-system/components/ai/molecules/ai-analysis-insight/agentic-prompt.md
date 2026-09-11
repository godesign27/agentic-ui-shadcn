# Agentic Prompt — AI Analysis Insight

You are implementing the **AI Analysis Insight** (`ai-analysis-insight`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Analysis Insight (`ai-analysis-insight`) |
| **Status** | Draft |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> The individual finding unit inside an AI analysis message. Each insight is labeled by type, confidence-rated, and visually distinct — so users can scan analytical findings without mistaking them for alerts.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-analysis-insight/ai-analysis-insight.agent.json`
4. `components/ai/molecules/ai-analysis-insight/ai-analysis-insight.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAnalysisInsight` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `type` (`InsightType`) default ``required`` — keyTrend \
- `body` (`string`) default ``required`` — Main analytical finding text
- `title` (`string`) default ``—`` — Optional short bold summary line above body
- `density` (`"basic" \) default `"simple" \` — "rich" \
- `confidence` (`ConfidenceVariant`) default ``—`` — Simple+. high \
- `risk` (`"low" \) default `"medium" \` — "high"`
- `reviewIndicator` (`"reviewSuggested" \) default `"humanReviewed" \` — "escalated"`
- `metric` (`string`) default ``—`` — Simple+. Metric highlight pill below body. Uses color-mix for the tint so it renders correctly on every variant.
- `sources` (`string[]`) default ``—`` — Rich+. Source labels shown when showSources=true.
- `freshness` (`string`) default ``—`` — Rich+. Freshness caveat appended to the sources strip ("Updated 2h ago").
- `owner` (`string`) default ``—`` — Robust. Owner / reviewer line under the metadata row.
- `action` (`{ label, onClick }`) default ``—`` — Rich+. Single action button rendered below the body.
- `actions` (`AIAnalysisInsightAction[]`) default ``—`` — Robust. Multiple actions render as a row. Takes precedence over `action` when both are provided.
- `status` (`InsightStatus`) default ``"default"`` — default \
- `showRationale` (`boolean`) default ``false`` — Rich+. Show Why this? ghost link — requires onViewRationale to fire
- `showSources` (`boolean`) default ``false`` — Rich+. Show sources strip and View sources link
- `showAssumptions` (`boolean`) default ``false`` — Robust. Show View assumptions ghost link.
- `onViewRationale` (`() => void`) default ``—`` — Fires when user clicks Why this? link
- `onViewSources` (`() => void`) default ``—`` — Fires when user clicks View sources link
- `onViewAssumptions` (`() => void`) default ``—`` — Fires when user clicks View assumptions link
- `onAction` (`() => void`) default ``—`` — Overrides action.onClick — fires when action button is clicked

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
