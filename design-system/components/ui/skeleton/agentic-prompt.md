# Agentic Prompt — Skeleton

You are implementing **Skeleton** (`ui:skeleton`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:skeleton` |
| **Status** | Stable |
| **Tier / Category** | atoms · Feedback |
| **Import** | `@/components/ui/skeleton` |
| **Exports** | `Skeleton` |

## What it is for

> Show the shape of what is coming, so the wait feels shorter and the layout does not jump.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/skeleton/skeleton.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/skeleton/skeleton.md` — anatomy, tokens, examples
5. `src/components/ui/skeleton.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Mirror the real layout — matching sizes and counts.
- Always pair with an announced loading state; the visual pulse is invisible to screen readers.
- Do not leave a skeleton up after an error.
- Skip it for waits under 300ms.

## Never

- Skeleton with no announced loading state
- Skeleton persisting through an error
- Shapes that do not match the eventual content

## Task

Implement using `Skeleton` exactly as the contract declares. Use only the props, variants and sizes in `skeleton.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/skeleton.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/skeleton/skeleton.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:progress` (Determinate progress) · `ui:card` (Common host)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
