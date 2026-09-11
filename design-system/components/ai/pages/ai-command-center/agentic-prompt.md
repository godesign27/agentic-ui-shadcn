# Agentic Prompt — AI Command Center

You are implementing the **AI Command Center** (`ai-command-center`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Command Center (`ai-command-center`) |
| **Status** | Stable |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> Full AI chat workspace with idle state, conversation thread, and response patterns. The complete AI Led command surface for agentic tasks and conversational flows.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-command-center/ai-command-center.agent.json`
4. `components/ai/pages/ai-command-center/ai-command-center.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICommandCenter` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `theme` (`"default" \) default `"aqua"?`` — `"default"`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
