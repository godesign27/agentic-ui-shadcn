# Agentic Prompt — AI Card Queue

You are implementing the **AI Card Queue** (`ai-card-queue`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Queue (`ai-card-queue`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Live view of an agent's execution queue with per-item approval controls, progress tracking, and pause/approve-all governance actions.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-queue/ai-card-queue.agent.json`
4. `components/ai/organisms/ai-card-queue/ai-card-queue.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardQueue` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``"Execution Queue"`` — Card title
- `summary` (`string`) default ``undefined`` — Subtitle summary below title
- `items` (`QueueItem[]`) default ``required`` — Queue items array
- `onApproveAll` (`() => void`) default ``undefined`` — Approve all handler
- `onPause` (`() => void`) default ``undefined`` — Pause queue handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
