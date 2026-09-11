# Agentic Prompt — Alert

You are implementing **Alert** (`ui:alert`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:alert` |
| **Status** | Stable |
| **Tier / Category** | molecules · Feedback |
| **Import** | `@/components/ui/alert` |
| **Exports** | `Alert`, `AlertDescription`, `AlertTitle` |

## What it is for

> A message that stays on the page because it remains true.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/alert/alert.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/alert/alert.md` — anatomy, tokens, examples
5. `src/components/ui/alert.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Reserve destructive for errors and risks.
- Always pair the variant with an icon and a title so colour is not the only signal.
- For an alert present on page load, reconsider role="alert" — it will interrupt.
- Transient confirmations belong in ui:toast.

### Structure is not optional

```
Alert
  AlertTitle  (optional)
  AlertDescription  (optional)
```

## Never

- Colour as the only error signal
- Using Alert for transient confirmations
- Destructive variant for non-errors

## Task

Implement using `Alert` exactly as the contract declares. Use only the props, variants and sizes in `alert.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/alert.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/alert/alert.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toast` (Transient) · `ui:alert-dialog` (Blocking) · `ui:form` (Field-level errors)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
