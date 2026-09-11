# FormField

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** groups  
**Component id:** `pattern:form-field`  
**Category:** Forms  
**Status:** Stable  
**Import:** `@/components/patterns/form-field`  
**Depends on:** `ui:label`  

## Purpose

A labelled control with its description and error, wired together correctly.

The composition rules/composition.json requires for the form-submit pattern. Clones the child control to inject id, aria-describedby and aria-invalid, so the three relationships that make a field usable cannot be forgotten.

## Source

| Path | Role |
| --- | --- |
| `src/components/patterns/form-field.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/patterns/form-field/form-field.md` | This mirror spec |
| `design-system/components/patterns/form-field/form-field.agent.json` | Structured agent contract |
| `design-system/components/patterns/form-field/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/patterns/form-field/form-field.preview.html` | Visual proof of every documented state |

## When to use

- A standalone field outside react-hook-form
- Any field needing a description, an error, or both
- Satisfying the form-submit composition rule

## When not to use

- Inside react-hook-form — use ui:form, which derives the same wiring from form state
- For a control that is not a form field
- When the label would be redundant with a visible heading — it is still required, so use sr-only rather than omitting it

## Anatomy

| Part | Role |
| --- | --- |
| **Label** | ui:label with htmlFor wired to the generated id. Turns destructive on error. |
| **Control** | Your child element, cloned with id, aria-describedby and aria-invalid |
| **Description** | Optional helper text, referenced by aria-describedby |
| **Error** | role="alert" so a failure arriving after render is announced |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `No error` | Label neutral, no alert region |
| **Required** | `required` | Visual asterisk plus an sr-only "(required)" — the asterisk alone is not a label |
| **Described** | `description set` | aria-describedby points at the helper text |
| **Invalid** | `error set` | Label and message destructive; aria-invalid set; error appended to aria-describedby |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`form-field.agent.json`](form-field.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `destructive` | `text-destructive` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |
| Live region | The error message is role="alert" |

**Keyboard**

- Clicking the label focuses the control

**Required**

- label
- A single React element as children

**Notes**

- aria-describedby lists description then error, in that reading order — description is context, error is the newest news.
- The child is cloned, so props you set on it yourself win over the injected ones. That is deliberate: you can override the generated id.
- Children must be exactly one element. A fragment or an array breaks cloneElement.
- The required asterisk is aria-hidden and paired with an sr-only "(required)" — an asterisk announces as "star" or not at all.

## Examples

### Standalone field

```tsx
<FormField
  label="Email"
  description="We only use this for receipts."
  error={errors.email}
  required
>
  <Input type="email" autoComplete="email" />
</FormField>
```

## Agent rules

1. Exactly one child element.
2. Use ui:form inside react-hook-form; this is for standalone fields.
3. Never omit the label. Use sr-only if it must be visually hidden.
4. Pass error only when validation has actually failed — role="alert" interrupts.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Multiple children
- Omitting the label
- Asterisk as the only required indicator
- Use for non-form controls

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:form` | react-hook-form integration |
| `ui:label` | The label alone |
| `ui:input` | The usual child |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`form-field.agent.json`](form-field.agent.json) → this file → [`src/components/patterns/form-field.tsx`](../../../../src/components/patterns/form-field.tsx)
