# Agentic Prompt — Card

You are implementing **Card** (`ui:card`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:card` |
| **Status** | Stable |
| **Tier / Category** | organisms · Layout |
| **Import** | `@/components/ui/card` |
| **Exports** | `Card`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle` |

## What it is for

> Group related content into a unit the eye reads as one thing.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/card/card.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/card/card.md` — anatomy, tokens, examples
5. `src/components/ui/card.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Do not nest cards.
- CardTitle is not a heading element. Make it one when the page structure needs it.
- CardContent has pt-0 — using it without CardHeader leaves the top padding wrong.
- Clickable cards need a real interactive element inside.

### Structure is not optional

```
Card
  CardHeader  (optional)
    CardTitle  (optional)
    CardDescription  (optional)
  CardContent  (optional)
  CardFooter  (optional)
```

## Never

- Nested cards
- onClick on the Card div with no focusable child
- Using Card for tabular data

## Task

Implement using `Card` exactly as the contract declares. Use only the props, variants and sizes in `card.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/card.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/card/card.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:table` (Tabular data) · `ui:accordion` (Collapsible sections) · `ui:skeleton` (Loading placeholder)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
