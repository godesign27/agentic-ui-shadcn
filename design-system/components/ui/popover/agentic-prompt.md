# Agentic Prompt — Popover

You are implementing **Popover** (`ui:popover`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:popover` |
| **Status** | Stable |
| **Tier / Category** | molecules · Overlay |
| **Import** | `@/components/ui/popover` |
| **Exports** | `Popover`, `PopoverContent`, `PopoverTrigger` |
| **Primitive** | `@radix-ui/react-popover` |

## What it is for

> Contextual content anchored to a trigger, without blocking the page.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/popover/popover.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/popover/popover.md` — anatomy, tokens, examples
5. `src/components/ui/popover.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never hide critical information in a popover.
- Use ui:dropdown-menu for action lists, not this.
- Use ui:tooltip for plain hints.
- Trigger needs an accessible name.

### Structure is not optional

```
Popover
  PopoverTrigger
  PopoverContent
```

## Never

- Critical-only information
- Action menus
- Nesting a modal dialog inside a popover

## Task

Implement using `Popover` exactly as the contract declares. Use only the props, variants and sizes in `popover.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/popover.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/popover/popover.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:tooltip` (Text hints) · `ui:dropdown-menu` (Actions) · `ui:hover-card` (Hover-triggered preview) · `ui:dialog` (Focused tasks)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
