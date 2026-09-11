# Agentic Prompt — Accordion

You are implementing **Accordion** (`ui:accordion`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:accordion` |
| **Status** | Stable |
| **Tier / Category** | organisms · Disclosure |
| **Import** | `@/components/ui/accordion` |
| **Exports** | `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger` |
| **Primitive** | `@radix-ui/react-accordion` |

## What it is for

> Let a long page stay scannable by collapsing detail the user can open on demand.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/accordion/accordion.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/accordion/accordion.md` — anatomy, tokens, examples
5. `src/components/ui/accordion.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- type is required.
- Do not hide content most users need.
- Three or more sections, or use something else.
- Remember collapsed content is not findable by Ctrl+F.

### Structure is not optional

```
Accordion
  AccordionItem
    AccordionTrigger
    AccordionContent
```

## Never

- Accordion with no type
- Hiding primary content
- Fewer than three sections

## Task

Implement using `Accordion` exactly as the contract declares. Use only the props, variants and sizes in `accordion.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/accordion.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/accordion/accordion.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:collapsible` (A single disclosure with no group behaviour) · `ui:tabs` (Peer views)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
