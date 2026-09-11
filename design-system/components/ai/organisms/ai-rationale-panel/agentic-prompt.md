# Agentic Prompt — AI Rationale

You are implementing the **AI Rationale** (`ai-rationale-panel`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Rationale (`ai-rationale-panel`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Collapsible explainability output revealing what the AI found, why it matters, what alternatives were considered, and what assumptions and sources informed the decision. Surfaces in chat, drawers, command center, or any AI output context.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-rationale-panel/ai-rationale-panel.agent.json`
4. `components/ai/organisms/ai-rationale-panel/ai-rationale-panel.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIRationalePanel` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `whatFound` (`string`) default ``required`` — Key finding text
- `whyMatters` (`string`) default ``required`` — Business impact text
- `considered` (`string[]`) default ``required`` — List of alternatives considered
- `assumptions` (`string[]`) default ``required`` — List of assumptions
- `sources` (`RationaleSource[]`) default ``required`` — Sources array with label and optional url
- `defaultOpen` (`boolean`) default ``false`` — Whether panel starts open

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
