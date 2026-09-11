# Agentic Prompt — AIMessageHeader

You are implementing **AIMessageHeader** (`ai:ai-message-header`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-message-header` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-message-header` |
| **Exports** | `AIMessageHeader` |

## What it is for

> Establish who is speaking before the user reads a word.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-message-header/ai-message-header.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-message-header/ai-message-header.md` — anatomy, tokens, examples
6. `src/components/ai/ai-message-header.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Render before the body, always.
- Name the agent specifically — "Research agent", not "AI".
- This is what satisfies the Attribution obligation on a conversational surface.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Rendering after the body
- Use for human messages
- A generic "AI" label where a specific agent name exists

## Task

Implement using `AIMessageHeader` exactly as the contract declares. Use only the props, variants and sizes in `ai-message-header.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-message-header.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-message-header/ai-message-header.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-message-body` (What follows it) · `ai:ai-avatar` (The mark it uses)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
