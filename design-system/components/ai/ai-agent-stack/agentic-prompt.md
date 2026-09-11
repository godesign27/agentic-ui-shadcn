# Agentic Prompt — AIAgentStack

You are implementing **AIAgentStack** (`ai:ai-agent-stack`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-agent-stack` |
| **Status** | Stable |
| **Tier / Category** | molecules · AI |
| **Import** | `@/components/ai/ai-agent-stack` |
| **Exports** | `AIAgentStack` |

## What it is for

> Several agents working at once, and what each of them is doing.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-agent-stack/ai-agent-stack.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-agent-stack/ai-agent-stack.md` — anatomy, tokens, examples
6. `src/components/ai/ai-agent-stack.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Every agent needs a real label and a real status.
- Keep maxVisible at three or four.
- Provide a full list somewhere when there is overflow.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Audit trail**


## Never

- Human users
- Status conveyed only by ring colour
- More than about six agents

## Task

Implement using `AIAgentStack` exactly as the contract declares. Use only the props, variants and sizes in `ai-agent-stack.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-agent-stack.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-agent-stack/ai-agent-stack.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-avatar` (A single agent) · `ai:ai-queue-badge` (Per-item detail)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
