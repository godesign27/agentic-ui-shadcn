# Agentic Prompt — AI Card Recommendation Compare

You are implementing the **AI Card Recommendation Compare** (`ai-card-recommendation-compare`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Recommendation Compare (`ai-card-recommendation-compare`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Side-by-side comparison of 2–3 AI-generated options with confidence scores, risk levels, expandable tradeoffs, and operator choice controls.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-recommendation-compare/ai-card-recommendation-compare.agent.json`
4. `components/ai/organisms/ai-card-recommendation-compare/ai-card-recommendation-compare.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardRecommendationCompare` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``"Compare Options"`` — Card title
- `options` (`RecommendationOption[]`) default ``required`` — 2–3 options to compare
- `onChoose` (`(index: number) => void`) default ``undefined`` — Called when user chooses an option
- `onMerge` (`() => void`) default ``undefined`` — Merge options handler
- `onSendToAgent` (`() => void`) default ``undefined`` — Send to agent handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
