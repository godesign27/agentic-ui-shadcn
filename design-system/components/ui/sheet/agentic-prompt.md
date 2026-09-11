# Agentic Prompt — Sheet

You are implementing **Sheet** (`ui:sheet`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:sheet` |
| **Status** | Stable |
| **Tier / Category** | organisms · Overlay |
| **Import** | `@/components/ui/sheet` |
| **Exports** | `Sheet`, `SheetClose`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetOverlay`, `SheetPortal`, `SheetTitle`, `SheetTrigger` |
| **Primitive** | `@radix-ui/react-dialog` |

## What it is for

> A modal panel anchored to a screen edge, for content that needs more room than a dialog affords.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/sheet/sheet.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/sheet/sheet.md` — anatomy, tokens, examples
5. `src/components/ui/sheet.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- SheetTitle is mandatory.
- Choose the side from the content, not from habit: left for nav, bottom for touch actions, right for detail.
- Long content needs an inner ui:scroll-area.
- Do not nest sheets or place a dialog inside one.

### Structure is not optional

```
Sheet
  SheetTrigger  (optional)
  SheetContent
    SheetHeader  (optional)
      SheetTitle
      SheetDescription  (optional)
    SheetFooter  (optional)
    SheetClose  (optional)
```

## Never

- SheetContent without SheetTitle
- Nested overlays
- Using a sheet for content that must stay visible while working

## Task

Implement using `Sheet` exactly as the contract declares. Use only the props, variants and sizes in `sheet.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/sheet.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/sheet/sheet.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:dialog` (Centred modal) · `ui:sidebar` (Persistent navigation) · `ui:scroll-area` (For long sheet content)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
