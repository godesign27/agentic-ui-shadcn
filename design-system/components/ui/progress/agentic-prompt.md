# Agentic Prompt — Progress

You are implementing **Progress** (`ui:progress`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:progress` |
| **Status** | Stable |
| **Tier / Category** | atoms · Feedback |
| **Import** | `@/components/ui/progress` |
| **Exports** | `Progress` |
| **Primitive** | `@radix-ui/react-progress` |

## What it is for

> Show how much of a known quantity of work is done.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/progress/progress.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/progress/progress.md` — anatomy, tokens, examples
5. `src/components/ui/progress.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always label the bar.
- Show the numeric value in text alongside.
- Use a spinner for unknown duration, not a fake percentage.
- Announce completion separately.

## Never

- Fabricated progress values
- Unlabelled progress bar
- Using Progress as an input

## Task

Implement using `Progress` exactly as the contract declares. Use only the props, variants and sizes in `progress.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/progress.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/progress/progress.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:slider` (Input along a range) · `ui:skeleton` (Content loading) · `ai:ai-progress` (Agentic work with blocked and escalated states)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
