# Input

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:input`  
**Category:** Forms  
**Status:** Stable  
**Import:** `@/components/ui/input`  

## Purpose

A single line of user-supplied text, with the focus and disabled behavior already correct.

A styled native input. All native props and types pass through; type="file" receives specific styling.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/input.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/input/input.md` | This mirror spec |
| `design-system/components/ui/input/input.agent.json` | Structured agent contract |
| `design-system/components/ui/input/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/input/input.preview.html` | Visual proof of every documented state |

## When to use

- Single-line text, email, password, number, search, url, tel
- File selection via type="file"

## When not to use

- Multi-line text — use ui:textarea
- Choosing from a known set — use ui:select
- Searching a large set with filtering — use ui:command
- Dates — use ui:calendar inside ui:popover
- Any input without a ui:label, which is never acceptable

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The native input element. No wrapper is provided — pair it with ui:label and ui:form yourself. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | border-input on bg-background |
| **Placeholder** | `Empty` | text-muted-foreground. Never a substitute for a label. |
| **Focus-visible** | `Keyboard or click focus` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled prop` | cursor-not-allowed, opacity-50 |
| **Invalid** | `Validation failure` | Not styled by this component. ui:form supplies the error colouring and aria-describedby wiring. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`input.agent.json`](input.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `input` | `border-input` |
| `muted` | `text-muted` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `textbox` |

**Keyboard**

- Standard text editing keys

**Required**

- An associated label via ui:label htmlFor, or aria-label
- aria-describedby pointing at any helper or error text
- aria-invalid when validation fails

**Notes**

- A placeholder is not a label. It disappears on input and is invisible to some assistive technology.
- type="number" is hostile to screen readers and to users who paste formatted values. Prefer type="text" with inputMode="numeric".
- This component does not render error state. Use ui:form, which wires aria-invalid and aria-describedby for you.

## Examples

### Labelled input

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" autoComplete="email" />
</div>
```

## Agent rules

1. Never render an Input without an associated Label.
2. Set autoComplete on anything a browser can fill.
3. Use ui:form for validation rather than hand-wiring aria-describedby.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Placeholder as the only label
- Error communicated by border colour alone
- Removing the focus ring

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:textarea` | Multi-line |
| `ui:label` | Required companion |
| `ui:form` | Validation and error wiring |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`input.agent.json`](input.agent.json) → this file → [`src/components/ui/input.tsx`](../../../../src/components/ui/input.tsx)
