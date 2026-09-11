# Agentic Prompt — AIChipMemory

You are implementing **AIChipMemory** (`ai:ai-chip-memory`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-chip-memory` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-chip-memory` |
| **Exports** | `AIChipMemory` |

## What it is for

> Tell the user when the system is drawing on something it learned earlier.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-chip-memory/ai-chip-memory.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-chip-memory/ai-chip-memory.md` — anatomy, tokens, examples
6. `src/components/ai/ai-chip-memory.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Only render when memory is genuinely involved.
- Name what is remembered, specifically.
- Forgetting should be as visible as remembering — do not silently drop the removed and ignored variants.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Rationale disclosure**
- **Audit trail**


## Never

- Implying memory that does not exist
- Generic tagging
- Hiding memory use

## Task

Implement using `AIChipMemory` exactly as the contract declares. Use only the props, variants and sizes in `ai-chip-memory.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-chip-memory.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-chip-memory/ai-chip-memory.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-agent-work-note` (What the agent did with it) · `ui:badge` (Generic tags)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
