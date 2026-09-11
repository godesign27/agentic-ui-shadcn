# Agentic Prompt — ScrollArea

You are implementing **ScrollArea** (`ui:scroll-area`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:scroll-area` |
| **Status** | Stable |
| **Tier / Category** | molecules · Layout |
| **Import** | `@/components/ui/scroll-area` |
| **Exports** | `ScrollArea`, `ScrollBar` |
| **Primitive** | `@radix-ui/react-scroll-area` |

## What it is for

> A scrollable region with a scrollbar that looks the same on every platform.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/scroll-area/scroll-area.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/scroll-area/scroll-area.md` — anatomy, tokens, examples
5. `src/components/ui/scroll-area.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always set an explicit height or max-height on the root.
- Add ScrollBar orientation="horizontal" explicitly for horizontal scroll.
- Do not wrap the whole page in a ScrollArea.

### Structure is not optional

```
ScrollArea
  ScrollBar  (optional)
```

## Never

- ScrollArea with no bounded height
- Wrapping the document scroll

## Task

Implement using `ScrollArea` exactly as the contract declares. Use only the props, variants and sizes in `scroll-area.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/scroll-area.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/scroll-area/scroll-area.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:sheet` (Common host for long content) · `ui:table` (Wrap wide tables for horizontal scroll)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
