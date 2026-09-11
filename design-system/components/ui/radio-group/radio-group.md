# RadioGroup

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:radio-group`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-radio-group`  
**Import:** `@/components/ui/radio-group`  

## Purpose

Exactly one choice from a small set, with every option visible.

Radix RadioGroup with roving focus. The group owns the value; items are stateless.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/radio-group.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/radio-group/radio-group.md` | This mirror spec |
| `design-system/components/ui/radio-group/radio-group.agent.json` | Structured agent contract |
| `design-system/components/ui/radio-group/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/radio-group/radio-group.preview.html` | Visual proof of every documented state |

## When to use

- Two to five mutually exclusive options where seeing them all aids the decision
- Choices with enough weight to deserve the space

## When not to use

- More than about five options — use ui:select
- Non-exclusive choices — use ui:checkbox
- A binary on/off setting — use ui:switch
- When no selection is valid — a radio group cannot be unset once set

## Anatomy

| Part | Role |
| --- | --- |
| **RadioGroup** | Owns value, onValueChange, and roving focus |
| **RadioGroupItem** | One option. Requires a value and an associated label. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Unselected** | `Not the group value` | border-primary, empty |
| **Selected** | `Matches the group value` | Filled circle indicator |
| **Focus-visible** | `Arrow key or Tab` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled on group or item` | opacity-50, removed from arrow navigation |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`radio-group.agent.json`](radio-group.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `primary` | `border-primary`, `text-primary` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `radiogroup` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Arrow keys — move between and select options
- Tab — enter and leave the group as one stop
- Space — select the focused option

**Required**

- A label for the group itself, via aria-label or aria-labelledby
- A label per item

**Notes**

- The whole group is one tab stop. Arrow keys move within it. This is correct and expected — do not add tabIndex to items.
- Arrow-key navigation selects as it moves. If that is wrong for your case, the control should be a ui:select.

## Examples

### Labelled group

```tsx
<RadioGroup defaultValue="card" aria-label="Payment method">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="card" id="card" />
    <Label htmlFor="card">Card</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="invoice" id="invoice" />
    <Label htmlFor="invoice">Invoice</Label>
  </div>
</RadioGroup>
```

## Agent rules

1. Label the group, not only the items.
2. Every RadioGroupItem needs a Label with htmlFor.
3. Over five options means ui:select.
4. Provide a default value unless empty is genuinely valid.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- A single radio button
- Items with no labels
- Adding tabIndex to items

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:select` | Many options |
| `ui:checkbox` | Non-exclusive |
| `ui:toggle-group` | Compact exclusive choice in a toolbar |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`radio-group.agent.json`](radio-group.agent.json) → this file → [`src/components/ui/radio-group.tsx`](../../../../src/components/ui/radio-group.tsx)
