# Agentic Prompt — Toaster

You are implementing **Toaster** (`ui:toaster`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:toaster` |
| **Status** | Stable |
| **Tier / Category** | templates · Feedback |
| **Import** | `@/components/ui/toaster` |
| **Exports** | `Toaster` |

## What it is for

> The one place toasts actually render.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/toaster/toaster.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/toaster/toaster.md` — anatomy, tokens, examples
5. `src/components/ui/toaster.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Mount exactly once, at the root.
- Do not conditionally render it.
- Pick either this or ui:sonner — not both.

## Never

- Multiple Toaster instances
- Conditional mounting
- Running alongside ui:sonner

## Task

Implement using `Toaster` exactly as the contract declares. Use only the props, variants and sizes in `toaster.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/toaster.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/toaster/toaster.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toast` (The primitives it renders) · `ui:sonner` (The alternative — choose one)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
