# Agentic Prompt — Collapsible

You are implementing **Collapsible** (`ui:collapsible`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:collapsible` |
| **Status** | Stable |
| **Tier / Category** | molecules · Disclosure |
| **Import** | `@/components/ui/collapsible` |
| **Exports** | `Collapsible`, `CollapsibleContent`, `CollapsibleTrigger` |
| **Primitive** | `@radix-ui/react-collapsible` |

## What it is for

> One thing that opens and closes, with no group to coordinate.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/collapsible/collapsible.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/collapsible/collapsible.md` — anatomy, tokens, examples
5. `src/components/ui/collapsible.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Bring your own styling — nothing is applied.
- Use ui:accordion for grouped sections.
- Trigger labels name the content, not the gesture.

### Structure is not optional

```
Collapsible
  CollapsibleTrigger
  CollapsibleContent
```

## Never

- Using Collapsible for a group where Accordion belongs

## Task

Implement using `Collapsible` exactly as the contract declares. Use only the props, variants and sizes in `collapsible.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/collapsible.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/collapsible/collapsible.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:accordion` (Grouped, styled, with heading semantics)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
