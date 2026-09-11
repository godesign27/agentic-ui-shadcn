# Agentic Prompt — AIChipQuick

You are implementing **AIChipQuick** (`ai:ai-chip-quick`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-chip-quick` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-chip-quick` |
| **Exports** | `AIChipQuick` |

## What it is for

> Offer a starting point so the user does not face an empty box.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-chip-quick/ai-chip-quick.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-chip-quick/ai-chip-quick.md` — anatomy, tokens, examples
6. `src/components/ai/ai-chip-quick.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Compose, never execute.
- Five chips maximum.
- One isSpecial chip per group.
- Write labels as the user would phrase the request.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Executing on click
- More than five chips
- Use as filter chips

## Task

Implement using `AIChipQuick` exactly as the contract declares. Use only the props, variants and sizes in `ai-chip-quick.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-chip-quick.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-chip-quick/ai-chip-quick.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toggle` (Filter chips) · `ai:ai-dialog-button` (Composer toolbar controls)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
