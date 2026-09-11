# Agentic Prompt — AIAgentWorkNote

You are implementing **AIAgentWorkNote** (`ai:ai-agent-work-note`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-agent-work-note` |
| **Status** | Draft |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-agent-work-note` |
| **Exports** | `AIAgentWorkNote` |

## What it is for

> Show what the agent is doing without exposing raw reasoning.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-agent-work-note/ai-agent-work-note.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-agent-work-note/ai-agent-work-note.md` — anatomy, tokens, examples
6. `src/components/ai/ai-agent-work-note.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Collapsed by default.
- What it discloses must be true — this is not progress theatre.
- Summarise reasoning; do not paste raw model output.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Rationale disclosure**
- **Audit trail**


## Never

- Raw chain-of-thought
- Expanded by default
- Fabricated steps

## Task

Implement using `AIAgentWorkNote` exactly as the contract declares. Use only the props, variants and sizes in `ai-agent-work-note.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-agent-work-note.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-agent-work-note/ai-agent-work-note.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-loading-indicators` (Simple waiting) · `ui:collapsible` (Non-AI disclosure)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
