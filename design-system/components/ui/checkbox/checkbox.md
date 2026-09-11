# Checkbox

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:checkbox`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-checkbox`  
**Import:** `@/components/ui/checkbox`  

## Purpose

An independent yes-or-no choice, or one of several non-exclusive options.

Radix Checkbox with a Lucide check indicator. Supports an indeterminate state through checked="indeterminate".

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/checkbox.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/checkbox/checkbox.md` | This mirror spec |
| `design-system/components/ui/checkbox/checkbox.agent.json` | Structured agent contract |
| `design-system/components/ui/checkbox/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/checkbox/checkbox.preview.html` | Visual proof of every documented state |

## When to use

- Opting in or out of one thing
- Selecting several items from a list
- A parent checkbox summarising children, via the indeterminate state

## When not to use

- Exactly one choice from several — use ui:radio-group
- A setting that applies immediately — use ui:switch, which reads as a state rather than a selection
- Selecting from many options — use ui:select or ui:command

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The interactive box |
| **Indicator** | The check or dash glyph, rendered only when checked or indeterminate |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Unchecked** | `checked={false}` | border-primary, transparent fill |
| **Checked** | `checked={true}` | bg-primary with the check glyph |
| **Indeterminate** | `checked="indeterminate"` | For a parent whose children are partly selected. Announced as mixed. |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled prop` | cursor-not-allowed, opacity-50 |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`checkbox.agent.json`](checkbox.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `primary` | `bg-primary`, `border-primary`, `text-primary` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `checkbox` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Space — toggle
- Tab — move focus

**Required**

- An associated label, or aria-label

**Notes**

- Radix supplies role, aria-checked and the mixed state. Do not add them by hand.
- Group related checkboxes in a fieldset with a legend.

## Examples

### With label

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

## Agent rules

1. Always pair with ui:label using htmlFor.
2. Use indeterminate for parent rows rather than a third visual style.
3. A checkbox that applies instantly should probably be a ui:switch.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Checkbox with no label
- Using a checkbox where exactly one option must be chosen
- Overriding aria-checked

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:radio-group` | Exclusive choice |
| `ui:switch` | Immediate setting |
| `ui:form` | Validation |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`checkbox.agent.json`](checkbox.agent.json) → this file → [`src/components/ui/checkbox.tsx`](../../../../src/components/ui/checkbox.tsx)
