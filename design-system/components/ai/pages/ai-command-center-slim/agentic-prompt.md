# Agentic Prompt — AI Command Center — Slim

You are implementing the **AI Command Center — Slim** (`ai-command-center-slim`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Command Center — Slim (`ai-command-center-slim`) |
| **Status** | Beta |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> Compact single-line AI prompt bar for lightweight contexts. Adapts between idle and active modes without a full command center footprint.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-command-center-slim/ai-command-center-slim.agent.json`
4. `components/ai/pages/ai-command-center-slim/ai-command-center-slim.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICommandCenterSlim` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`"gray" \) default `"aqua"?`` — `"gray"`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
