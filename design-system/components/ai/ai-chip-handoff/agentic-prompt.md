# Agentic Prompt — AIChipHandoff

You are implementing **AIChipHandoff** (`ai:ai-chip-handoff`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-chip-handoff` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-chip-handoff` |
| **Exports** | `AIChipHandoff` |

## What it is for

> Show the moment accountability changed hands.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-chip-handoff/ai-chip-handoff.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-chip-handoff/ai-chip-handoff.md` — anatomy, tokens, examples
6. `src/components/ai/ai-chip-handoff.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Only render for real transfers.
- Name both parties specifically.
- agent-to-human means a person is now accountable — do not use it loosely.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Audit trail**


## Never

- Decorative direction indicators
- Unnamed parties
- Interactive use

## Task

Implement using `AIChipHandoff` exactly as the contract declares. Use only the props, variants and sizes in `ai-chip-handoff.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-chip-handoff.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-chip-handoff/ai-chip-handoff.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-agent-stack` (Who is working now) · `ai:ai-agent-work-note` (What they did)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
