# Agentic Prompt — AI Card Memory

You are implementing the **AI Card Memory** (`ai-card-memory`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Memory (`ai-card-memory`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Recalled memory entry with provenance, date, and content. Lets users decide whether to reuse, ignore, or permanently remove a recalled context.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-memory/ai-card-memory.agent.json`
4. `components/ai/organisms/ai-card-memory/ai-card-memory.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardMemory` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`MemoryVariant`) default ``required`` — Memory state variant
- `source` (`string`) default ``required`` — Memory source label
- `date` (`string`) default ``required`` — Memory creation/retrieval date
- `content` (`string`) default ``required`` — Memory content excerpt
- `onReuse` (`() => void`) default ``undefined`` — Reuse memory handler
- `onIgnore` (`() => void`) default ``undefined`` — Ignore for session handler
- `onRemove` (`() => void`) default ``undefined`` — Permanently remove handler

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
