# Agentic Prompt — AI Agent Response

You are implementing the **AI Agent Response** (`ai-agent-response`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Agent Response (`ai-agent-response`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The minimal unit of AI speech — header plus body in a branded card. Use this atom when the response stands alone with no follow-up actions or structured data.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-agent-response/ai-agent-response.agent.json`
4. `components/ai/atomic/ai-agent-response/ai-agent-response.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAgentResponse` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `agentLabel` (`string`) default ``"AI Assistant"`` — Name displayed in the attribution header.
- `timestamp` (`string`) default ``"Just now"`` — Right-aligned timestamp string in the header.
- `size` (`"sm" \) default `"md"`` — `"md"`
- `children` (`React.ReactNode`) default ``required`` — Body content. Use <strong> with brand color for emphasis.
- `dark` (`boolean`) default ``false`` — Renders the response card on a deep brand-ink surface with light text — for use on dark chat chrome.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
