# Agentic Prompt — Dialog

You are implementing **Dialog** (`ui:dialog`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:dialog` |
| **Status** | Stable |
| **Tier / Category** | organisms · Overlay |
| **Import** | `@/components/ui/dialog` |
| **Exports** | `Dialog`, `DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger` |
| **Primitive** | `@radix-ui/react-dialog` |

## What it is for

> Interrupt the user for a self-contained task that must finish before anything else continues.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/dialog/dialog.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/dialog/dialog.md` — anatomy, tokens, examples
5. `src/components/ui/dialog.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- DialogTitle is mandatory, visually hidden if necessary.
- Multi-step workflows go on a page route, not in here.
- Destructive confirmations use ui:alert-dialog.
- Never nest dialogs.
- Long content needs an inner scroll region, not a taller modal.

### Structure is not optional

```
Dialog
  DialogTrigger  (optional)
  DialogPortal  (optional)
    DialogOverlay  (optional)
  DialogContent
    DialogHeader  (optional)
      DialogTitle
      DialogDescription  (optional)
    DialogFooter  (optional)
    DialogClose  (optional)
```

## Never

- DialogContent without DialogTitle
- Nested dialogs
- Multi-step wizards
- Destructive confirmation without alert-dialog semantics

## Task

Implement using `Dialog` exactly as the contract declares. Use only the props, variants and sizes in `dialog.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/dialog.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/dialog/dialog.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:alert-dialog` (Destructive confirmation — Cancel is focused by default) · `ui:sheet` (Edge panel with more room) · `ui:popover` (Non-modal contextual content) · `ui:drawer` (Not in this inventory — use ui:sheet with side="bottom")

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
