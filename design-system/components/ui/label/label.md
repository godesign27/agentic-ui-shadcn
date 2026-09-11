# Label

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:label`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-label`  
**Import:** `@/components/ui/label`  

## Purpose

Names a control, and makes its text a click target for it.

Radix Label with peer-disabled styling. The htmlFor association is what makes a form usable — not decoration.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/label.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/label/label.md` | This mirror spec |
| `design-system/components/ui/label/label.agent.json` | Structured agent contract |
| `design-system/components/ui/label/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/label/label.preview.html` | Visual proof of every documented state |

## When to use

- Every form control, without exception

## When not to use

- As a general heading — use a semantic heading element
- For static text that names nothing

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The label element. htmlFor must match the control id. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | text-sm font-medium |
| **Peer disabled** | `Associated control is disabled` | cursor-not-allowed, opacity-70 via peer-disabled: — requires the control to carry the peer class |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`label.agent.json`](label.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `label` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Clicking the label focuses or toggles the associated control

**Required**

- htmlFor matching the control id

**Notes**

- A label without htmlFor is decorative text and provides no accessible name.
- Radix Label prevents text selection on double-click, which stops accidental selection when toggling a checkbox.

## Examples

### Basic

```tsx
<Label htmlFor="name">Full name</Label>
<Input id="name" />
```

## Agent rules

1. htmlFor is mandatory. A Label without it is a bug.
2. Do not use Label for headings.
3. Required-field markers need text or aria-required, not an asterisk alone.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Label with no htmlFor
- Asterisk as the only required indicator

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:form` | FormLabel wires htmlFor automatically |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`label.agent.json`](label.agent.json) → this file → [`src/components/ui/label.tsx`](../../../../src/components/ui/label.tsx)
