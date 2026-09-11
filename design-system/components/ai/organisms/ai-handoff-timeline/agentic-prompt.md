# Agentic Prompt — AI Handoff Timeline

You are implementing the **AI Handoff Timeline** (`ai-handoff-timeline`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Handoff Timeline (`ai-handoff-timeline`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Auditable vertical timeline of every ownership transfer in a multi-agent or human-in-loop workflow. Each node records who held ownership, when, and why.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-handoff-timeline/ai-handoff-timeline.agent.json`
4. `components/ai/organisms/ai-handoff-timeline/ai-handoff-timeline.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIHandoffTimeline` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `steps` (`HandoffStep[]`) default ``required`` — Array of timeline steps
- `direction` (`HandoffDirection`) default ``"agent-to-agent"`` — Controls AIChipHandoff in header
- `title` (`string`) default ``"Handoff Timeline"`` — Card title
- `onRetry` (`() => void`) default ``undefined`` — Retry handler (shown on failed)
- `onReassign` (`() => void`) default ``undefined`` — Reassign handler
- `onViewAudit` (`() => void`) default ``undefined`` — View audit handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
