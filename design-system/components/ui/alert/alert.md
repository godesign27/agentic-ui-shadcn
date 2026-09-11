# Alert

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:alert`  
**Category:** Feedback  
**Status:** Stable  
**Import:** `@/components/ui/alert`  

## Purpose

A message that stays on the page because it remains true.

A static inline message with default and destructive variants. Icons are positioned automatically by the base class.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/alert.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/alert/alert.md` | This mirror spec |
| `design-system/components/ui/alert/alert.agent.json` | Structured agent contract |
| `design-system/components/ui/alert/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/alert/alert.preview.html` | Visual proof of every documented state |

## When to use

- Persistent form-level errors
- Ongoing system state — maintenance, degraded service, quota
- Contextual warnings before the user acts

## When not to use

- Confirming something that just happened — use ui:toast, which dismisses itself
- A blocking confirmation — use ui:alert-dialog
- So routinely that users learn to ignore it
- Field-level validation — use ui:form and FormMessage

## Anatomy

`Alert` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `AlertTitle` | `Alert` | No | Renders an h5 |
| `AlertDescription` | `Alert` | No |  |

## Variants

| Variant | When to use it |
| --- | --- |
| `default` | Informational or neutral state. |
| `destructive` | An error or a risk. Do not use for merely important information. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `variant="default"` | bg-background, border-border |
| **Destructive** | `variant="destructive"` | border-destructive/50, text-destructive |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"destructive"` | `"default"` | Declared in `alertVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`alert.agent.json`](alert.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `destructive` | `border-destructive`, `text-destructive` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `alert` |

**Required**

- role="alert" is set on the root

**Notes**

- role="alert" is an assertive live region: it interrupts the screen reader. That is right for an error appearing in response to an action, and wrong for content present on page load — which will be announced over everything else.
- For a message present at load, render a plain styled div instead, or use role="status".
- The destructive variant must not rely on colour alone — keep the icon and the title.

## Examples

### Error alert

```tsx
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>Your card was declined. Try another payment method.</AlertDescription>
</Alert>
```

## Agent rules

1. Reserve destructive for errors and risks.
2. Always pair the variant with an icon and a title so colour is not the only signal.
3. For an alert present on page load, reconsider role="alert" — it will interrupt.
4. Transient confirmations belong in ui:toast.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Colour as the only error signal
- Using Alert for transient confirmations
- Destructive variant for non-errors

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toast` | Transient |
| `ui:alert-dialog` | Blocking |
| `ui:form` | Field-level errors |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`alert.agent.json`](alert.agent.json) → this file → [`src/components/ui/alert.tsx`](../../../../src/components/ui/alert.tsx)
