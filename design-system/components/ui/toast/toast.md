# Toast

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:toast`  
**Category:** Feedback  
**Status:** Stable  
**Primitive:** `@radix-ui/react-toast`  
**Import:** `@/components/ui/toast`  

## Purpose

Confirm that something happened, without taking the user away from what they are doing.

Radix Toast primitives with swipe-to-dismiss and a default and destructive variant. The render host is ui:toaster; the queue is useToast.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/toast.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/toast/toast.md` | This mirror spec |
| `design-system/components/ui/toast/toast.agent.json` | Structured agent contract |
| `design-system/components/ui/toast/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/toast/toast.preview.html` | Visual proof of every documented state |

## When to use

- Confirming a completed action
- Non-blocking errors the user can act on later
- Undo affordances after a reversible change

## When not to use

- Anything the user must read — toasts disappear and many users will miss them
- Errors that block progress — use ui:alert, which stays
- Anything needing a decision — use ui:alert-dialog
- Long messages, or several at once

## Anatomy

`ToastProvider` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `ToastProvider` | — | Yes | Supplied by ui:toaster |
| `ToastViewport` | `ToastProvider` | Yes | Where toasts render. Supplied by ui:toaster. |
| `Toast` | `ToastProvider` | Yes |  |
| `ToastTitle` | `Toast` | No |  |
| `ToastDescription` | `Toast` | No |  |
| `ToastAction` | `Toast` | No | A single action, typically Undo. altText is required. |
| `ToastClose` | `Toast` | No |  |

## Variants

| Variant | When to use it |
| --- | --- |
| `default` | Confirmations and neutral information. |
| `destructive` | Failures. Consider whether a ui:alert that stays would serve better. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Entering** | `Added to the queue` | Slides in from the top on mobile, bottom-right on desktop |
| **Visible** | `During its duration` | Timer paused on hover and focus |
| **Swiping** | `Drag right` | Follows the pointer |
| **Dismissed** | `Timeout, swipe or close` | Animates out |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"destructive"` | `"default"` | Declared in `toastVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`toast.agent.json`](toast.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `destructive` | `bg-destructive`, `border-destructive`, `ring-destructive`, `text-destructive` |
| `foreground` | `text-foreground` |
| `muted` | `border-muted` |
| `ring` | `ring-ring` |
| `secondary` | `bg-secondary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `status` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- F8 — focus the toast viewport
- Tab — reach actions once focused
- Escape — dismiss

**Required**

- altText on ToastAction

**Notes**

- Radix announces toasts politely and pauses the timer on hover and focus.
- ToastAction requires altText — it is what screen-reader users hear as the alternative to the action.
- The default duration may be too short to read a long message. Keep toasts to one line.
- A dismissed toast is gone. Never put the only copy of important information in one.

## Examples

### Undo toast

```tsx
toast({
  title: "Project archived",
  description: "Apollo moved to the archive.",
  action: <ToastAction altText="Undo archiving Apollo" onClick={undo}>Undo</ToastAction>,
})
```

## Agent rules

1. One line. Keep it short enough to read before it goes.
2. ToastAction requires altText.
3. At most one action per toast.
4. Persistent errors belong in ui:alert.
5. Never put unrecoverable information in a toast.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Critical information in a toast
- Multiple actions in one toast
- ToastAction with no altText
- Long multi-paragraph toasts

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toaster` | The render host — required |
| `ui:alert` | Persistent messages |
| `ui:sonner` | The alternative toast system — pick one |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`toast.agent.json`](toast.agent.json) → this file → [`src/components/ui/toast.tsx`](../../../../src/components/ui/toast.tsx)
