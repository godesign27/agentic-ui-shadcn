# Agentic Prompt — AI Card Agent Reasoning

You are implementing the **AI Card Agent Reasoning** (`ai-card-agent-reasoning`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Agent Reasoning (`ai-card-agent-reasoning`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Surface an agent's reasoning + optional optimization drivers behind an Explainability toggle.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-agent-reasoning/ai-card-agent-reasoning.agent.json`
4. `components/ai/organisms/ai-card-agent-reasoning/ai-card-agent-reasoning.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardAgentReasoning` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`'basic' \) default `'simple'`` — `—`
- `agentName` (`string`) default ``'Zaidyn'`` — Bold display name in the header.
- `agentRole` (`string`) default ``'AGENT'`` — Small tier chip next to the name.
- `agentEyebrow` (`string`) default ``'REASONING & ANALYSIS'`` — Uppercase subtitle eyebrow under the name.
- `live` (`boolean`) default ``true`` — Show the green "● LIVE" pill in the top right.
- `summary` (`{ headline; detail }`) default ``—`` — Required. Brief headline + longer quoted analysis.
- `drivers` (`{ label; weight; intensity }[]`) default ``undefined`` — Simple-density only. Each row renders the label + percentage + intensity (High gets a tinted chip).
- `explainability` (`boolean`) default ``false`` — Controls the toggle. When `onExplainabilityChange` is not wired, the card manages local state.
- `onExplainabilityChange` (`(next: boolean) => void`) default ``undefined`` — External handler for the Explainability toggle.
- `onDeepenAnalysis` (`() => void`) default ``undefined`` — Click handler for the primary "Deepen Analysis" CTA.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
