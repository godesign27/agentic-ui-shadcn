# Agentic Prompt — Toast

You are implementing **Toast** (`ui:toast`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:toast` |
| **Status** | Stable |
| **Tier / Category** | organisms · Feedback |
| **Import** | `@/components/ui/toast` |
| **Exports** | `Toast`, `ToastAction`, `ToastActionElement`, `ToastClose`, `ToastDescription`, `ToastProps`, `ToastProvider`, `ToastTitle`, `ToastViewport` |
| **Primitive** | `@radix-ui/react-toast` |

## What it is for

> Confirm that something happened, without taking the user away from what they are doing.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/toast/toast.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/toast/toast.md` — anatomy, tokens, examples
5. `src/components/ui/toast.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- One line. Keep it short enough to read before it goes.
- ToastAction requires altText.
- At most one action per toast.
- Persistent errors belong in ui:alert.
- Never put unrecoverable information in a toast.

### Structure is not optional

```
ToastProvider
  ToastViewport
  Toast
    ToastTitle  (optional)
    ToastDescription  (optional)
    ToastAction  (optional)
    ToastClose  (optional)
```

## Never

- Critical information in a toast
- Multiple actions in one toast
- ToastAction with no altText
- Long multi-paragraph toasts

## Task

Implement using `Toast` exactly as the contract declares. Use only the props, variants and sizes in `toast.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/toast.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/toast/toast.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toaster` (The render host — required) · `ui:alert` (Persistent messages) · `ui:sonner` (The alternative toast system — pick one)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
