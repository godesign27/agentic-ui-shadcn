# Agentic Prompt — Separator

You are implementing **Separator** (`ui:separator`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:separator` |
| **Status** | Stable |
| **Tier / Category** | atoms · Layout |
| **Import** | `@/components/ui/separator` |
| **Exports** | `Separator` |
| **Primitive** | `@radix-ui/react-separator` |

## What it is for

> A visible break between groups, without implying they are different kinds of thing.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/separator/separator.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/separator/separator.md` — anatomy, tokens, examples
5. `src/components/ui/separator.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Leave decorative true unless the break is semantically meaningful.
- Vertical separators need a parent height.
- Prefer spacing over rules when either would work.

## Never

- Separator as a general border
- Vertical separator in a parent with no height

## Task

Implement using `Separator` exactly as the contract declares. Use only the props, variants and sizes in `separator.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/separator.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/separator/separator.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:card` (Sectioning inside a card)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
