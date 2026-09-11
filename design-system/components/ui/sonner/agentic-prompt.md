# Agentic Prompt — SonnerToaster

You are implementing **SonnerToaster** (`ui:sonner`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:sonner` |
| **Status** | Stable |
| **Tier / Category** | templates · Feedback |
| **Import** | `@/components/ui/sonner` |
| **Exports** | `SonnerToaster` |

## What it is for

> The same job as ui:toaster, through a different library with a simpler imperative API.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/sonner/sonner.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/sonner/sonner.md` — anatomy, tokens, examples
5. `src/components/ui/sonner.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Choose Sonner or ui:toaster. Never both — two systems means every toast appears twice.
- The export is SonnerToaster, not Toaster. That is deliberate.
- Sonner actions carry no altText requirement. If you need that accessibility contract, use ui:toast.

## Never

- Running alongside ui:toaster
- Re-aliasing SonnerToaster back to Toaster

## Task

Implement using `SonnerToaster` exactly as the contract declares. Use only the props, variants and sizes in `sonner.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/sonner.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/sonner/sonner.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toaster` (The Radix-based alternative) · `ui:toast` (The Radix primitives)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
