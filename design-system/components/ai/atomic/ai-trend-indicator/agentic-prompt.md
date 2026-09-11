# Agentic Prompt — AI Trend Indicator

You are implementing the **AI Trend Indicator** (`ai-trend-indicator`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Trend Indicator (`ai-trend-indicator`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> How is this metric trending? One row, three tones — green up, red down, gray flat. Pairs with `ai-metric-value` inside every metric card.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-trend-indicator/ai-trend-indicator.agent.json`
4. `components/ai/atomic/ai-trend-indicator/ai-trend-indicator.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AITrendIndicator` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `delta` (`string`) default ``required`` — Pre-formatted signed value, e.g. `"+8.4%"`.
- `label` (`string`) default ``—`` — Secondary sub-label rendered after the delta.
- `tone` (`"positive" \) default `"negative" \` — "neutral"`
- `size` (`"sm" \) default `"md"`` — `"md"`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
