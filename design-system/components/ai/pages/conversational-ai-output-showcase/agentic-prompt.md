# Agentic Prompt — Conversational AI Output Showcase

You are implementing the **Conversational AI Output Showcase** (`conversational-ai-output-showcase`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | Conversational AI Output Showcase (`conversational-ai-output-showcase`) |
| **Status** | Stable |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> The definitive reference for Wave 1 conversational AI output patterns. Maps every atom and group component to its experience tier, surface, behaviour verbs, and accountability tokens — with live interactive examples.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/conversational-ai-output-showcase/conversational-ai-output-showcase.agent.json`
4. `components/ai/pages/conversational-ai-output-showcase/conversational-ai-output-showcase.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `ConversationalAIOutputShowcase` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

_See mirror Props API._

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
