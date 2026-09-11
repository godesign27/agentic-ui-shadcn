# Agentic Prompt — AI User Bubble

You are implementing the **AI User Bubble** (`ai-user-bubble`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI User Bubble (`ai-user-bubble`) |
| **Status** | Stable |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> Message container for the human user's input in a conversational AI interface. Visually distinct from AI-generated responses — positioned right-aligned with a light fill.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-user-bubble/ai-user-bubble.agent.json`
4. `components/ai/molecules/ai-user-bubble/ai-user-bubble.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIUserBubble` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `text` (`string`) default ``""`` — The user's message text to display in the bubble.
- `size` (`"default" \) default `"medium"`` — `"default"`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
