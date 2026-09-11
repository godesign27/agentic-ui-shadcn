# Agentic Prompt — Tooltip

You are implementing **Tooltip** (`ui:tooltip`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:tooltip` |
| **Status** | Stable |
| **Tier / Category** | molecules · Overlay |
| **Import** | `@/components/ui/tooltip` |
| **Exports** | `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` |
| **Primitive** | `@radix-ui/react-tooltip` |

## What it is for

> Name a control whose purpose is not obvious from its appearance.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/tooltip/tooltip.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/tooltip/tooltip.md` — anatomy, tokens, examples
5. `src/components/ui/tooltip.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never put critical information in a tooltip.
- The trigger must be focusable.
- An icon button still needs aria-label — the tooltip is not a substitute.
- Mount TooltipProvider once at the app root, not per tooltip.

### Structure is not optional

```
TooltipProvider
  Tooltip
    TooltipTrigger
    TooltipContent
```

## Never

- Critical-only information
- Interactive content inside TooltipContent
- Non-focusable trigger
- Tooltip as the only accessible name

## Task

Implement using `Tooltip` exactly as the contract declares. Use only the props, variants and sizes in `tooltip.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/tooltip.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/tooltip/tooltip.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:hover-card` (Richer hover preview) · `ui:popover` (Interactive content)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
