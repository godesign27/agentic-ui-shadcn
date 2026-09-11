# Agentic Prompt — HoverCard

You are implementing **HoverCard** (`ui:hover-card`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:hover-card` |
| **Status** | Stable |
| **Tier / Category** | molecules · Overlay |
| **Import** | `@/components/ui/hover-card` |
| **Exports** | `HoverCard`, `HoverCardContent`, `HoverCardTrigger` |
| **Primitive** | `@radix-ui/react-hover-card` |

## What it is for

> A rich preview of what a link points to, without making the user go there.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/hover-card/hover-card.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/hover-card/hover-card.md` — anatomy, tokens, examples
5. `src/components/ui/hover-card.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Preview only. Never the sole source of anything.
- No primary actions inside.
- Not appropriate on mobile-first surfaces.

### Structure is not optional

```
HoverCard
  HoverCardTrigger
  HoverCardContent
```

## Never

- Critical information
- Primary actions inside the card
- Mobile-first usage

## Task

Implement using `HoverCard` exactly as the contract declares. Use only the props, variants and sizes in `hover-card.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/hover-card.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/hover-card/hover-card.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:tooltip` (Short text) · `ui:popover` (Click-triggered, interactive)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
