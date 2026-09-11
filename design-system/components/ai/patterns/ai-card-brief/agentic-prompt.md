# Agentic Prompt — AI Card Brief

You are implementing the **AI Card Brief** (`ai-card-brief`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Brief (`ai-card-brief`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Pre-execution brief for an agent task. Surfaces goal, data sources, constraints, and output format so humans can review and approve before the AI acts.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-brief/ai-card-brief.agent.json`
4. `components/ai/organisms/ai-card-brief/ai-card-brief.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardBrief` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `agentName` (`string`) default ``"Research Agent"`` — Display name of the agent
- `goal` (`string`) default ``required`` — Task goal statement shown in GOAL block
- `sources` (`string[]`) default ``[]`` — Data sources list
- `constraints` (`string[]`) default ``[]`` — Agent constraints list
- `outputFormat` (`string`) default ``undefined`` — Expected output format description
- `status` (`BriefChipStatus`) default ``"default"`` — Status chip state
- `onRun` (`() => void`) default ``undefined`` — Run button handler
- `onEdit` (`() => void`) default ``undefined`` — Edit button handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
