# Agentic Prompt — AI Insight List

You are implementing the **AI Insight List** (`ai-insight-list`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Insight List (`ai-insight-list`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> A semantic list of AI findings — positive / risk / warning / observation / review-needed — with optional source, freshness, confidence, and per-item action.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-insight-list/ai-insight-list.agent.json`
4. `components/ai/organisms/ai-insight-list/ai-insight-list.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIInsightList` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``—`` — Optional uppercase eyebrow above the list.
- `items` (`AIInsightItem[]`) default ``required`` — Array of insight items — each with text, severity, optional source/freshness/confidence/action.
- `density` (`"compact" \) default `"comfortable" \` — "spacious"`
- `maxVisible` (`number`) default ``—`` — Cap visible items; show "N more" button to reveal the rest.
- `showSources` (`boolean`) default ``false`` — Render `source` + `freshness` chips per item when provided.
- `showActions` (`boolean`) default ``false`` — Render `action` link per item when provided.
- `onItemAction` (`(item: AIInsightItem) => void`) default ``—`` — Callback fired when any item's action is clicked.
- `onShowMore` (`() => void`) default ``—`` — Callback fired when "Show more" is clicked.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
