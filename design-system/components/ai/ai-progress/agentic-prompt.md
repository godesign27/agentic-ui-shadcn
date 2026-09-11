# Agentic Prompt — AIProgress

You are implementing **AIProgress** (`ai:ai-progress`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-progress` |
| **Status** | Draft |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-progress` |
| **Exports** | `AIProgress` |

## What it is for

> Progress for work that can be blocked or escalated, not merely slow.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-progress/ai-progress.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-progress/ai-progress.md` — anatomy, tokens, examples
6. `src/components/ai/ai-progress.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Omit value rather than inventing a percentage.
- Blocked and escalated must reflect real conditions.
- Pair blocked with an ai:ai-control-bar or an ai:ai-action so the user can resolve it.
- Announce completion separately — the bar reaching 100% is not itself announced.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Audit trail**


## Never

- Fabricated percentages
- Blocked or escalated used decoratively
- Use for generic loading

## Task

Implement using `AIProgress` exactly as the contract declares. Use only the props, variants and sizes in `ai-progress.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-progress.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-progress/ai-progress.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:progress` (Standard progress) · `ai:ai-loading-indicators` (Unknown duration) · `ai:ai-control-bar` (Resolving a blocked run)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
