# Agentic Prompt — AlertDialog

You are implementing **AlertDialog** (`ui:alert-dialog`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:alert-dialog` |
| **Status** | Stable |
| **Tier / Category** | organisms · Overlay |
| **Import** | `@/components/ui/alert-dialog` |
| **Exports** | `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogTitle`, `AlertDialogTrigger` |
| **Primitive** | `@radix-ui/react-alert-dialog` |

## What it is for

> Stop the user before something irreversible happens, and make cancelling the easy path.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/alert-dialog/alert-dialog.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/alert-dialog/alert-dialog.md` — anatomy, tokens, examples
5. `src/components/ui/alert-dialog.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Name the object in the title and the loss in the description.
- Label the action with the verb — "Delete project", never "OK" or "Yes".
- Never focus the confirm action by default.
- Style AlertDialogAction as destructive when the action is destructive.
- An AI agent must never open and confirm this flow without a human gesture.

### Structure is not optional

```
AlertDialog
  AlertDialogTrigger  (optional)
  AlertDialogContent
    AlertDialogHeader  (optional)
      AlertDialogTitle
      AlertDialogDescription
    AlertDialogFooter
      AlertDialogCancel
      AlertDialogAction
```

## Never

- Confirm button labelled OK or Yes
- Initial focus on the confirm action
- Omitting AlertDialogCancel
- Collecting input inside an alert dialog

## Task

Implement using `AlertDialog` exactly as the contract declares. Use only the props, variants and sizes in `alert-dialog.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/alert-dialog.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/alert-dialog/alert-dialog.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:dialog` (Non-destructive tasks and forms) · `ui:toast` (Reporting the outcome afterwards)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
