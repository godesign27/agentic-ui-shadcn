# Agentic Prompt — AI Metric Value

You are implementing the **AI Metric Value** (`ai-metric-value`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Metric Value (`ai-metric-value`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The big number at the heart of every AI Card Metric. Three sizes share one type scale so dashboards stay rhythmic.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-metric-value/ai-metric-value.agent.json`
4. `components/ai/atomic/ai-metric-value/ai-metric-value.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIMetricValue` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `value` (`string \) default `number`` — `required`
- `unit` (`string`) default ``—`` — Optional inline unit suffix.
- `size` (`"sm" \) default `"md" \` — "lg"`
- `color` (`string`) default ``var(--ai-zds-text)`` — Override the value color (e.g. for accent treatment).
- `ariaLabel` (`string`) default ``—`` — Accessible name. Defaults to `${value} ${unit}`.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
