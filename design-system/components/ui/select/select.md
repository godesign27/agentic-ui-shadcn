# Select

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:select`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-select`  
**Import:** `@/components/ui/select`  

## Purpose

One choice from a list too long to show all at once.

Radix Select with a popover-styled content surface, scroll buttons, and typeahead. Renders in a portal.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/select.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/select/select.md` | This mirror spec |
| `design-system/components/ui/select/select.agent.json` | Structured agent contract |
| `design-system/components/ui/select/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/select/select.preview.html` | Visual proof of every documented state |

## When to use

- Roughly five to fifty options
- A known, finite set the user picks from
- Grouped options, via SelectGroup and SelectLabel

## When not to use

- Under five options where seeing them aids choice — use ui:radio-group
- Over about fifty, or anything needing search — use ui:command
- Multiple selection — Radix Select is single-select; compose ui:popover with ui:checkbox instead
- Actions rather than values — use ui:dropdown-menu

## Anatomy

`Select` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `SelectTrigger` | `Select` | Yes | The closed-state control |
| `SelectValue` | `SelectTrigger` | Yes | Renders the selection or the placeholder |
| `SelectContent` | `Select` | Yes | Portalled popover surface |
| `SelectGroup` | `SelectContent` | No |  |
| `SelectLabel` | `SelectGroup` | No | Group heading, not an item |
| `SelectItem` | `SelectContent` | Yes | Requires a unique value. An empty-string value is invalid in Radix. |
| `SelectSeparator` | `SelectContent` | No |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `Rest` | Trigger shows SelectValue or placeholder |
| **Open** | `Click or Enter` | Content animates in; focus moves into the list |
| **Item selected** | `Current value` | Check indicator on the right |
| **Item focused** | `Arrow keys or hover` | bg-accent text-accent-foreground |
| **Disabled** | `disabled on trigger or item` | opacity-50, skipped in keyboard navigation |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `position` | `see source` | — | Declared in the component source. |
| `asChild` | `boolean` | `false` | Render the child element instead, merging props and styles |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`select.agent.json`](select.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `background` | `bg-background` |
| `input` | `border-input` |
| `muted` | `bg-muted`, `text-muted` |
| `popover` | `bg-popover`, `text-popover` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `combobox` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Enter or Space — open
- Arrow keys — move between items
- Type a letter — jump to matching item
- Enter — select
- Escape — close and return focus to trigger

**Required**

- A label on the trigger, via ui:label htmlFor or aria-label

**Notes**

- Radix supplies combobox semantics, focus return and typeahead.
- Content is portalled to the body — inside an overflow-hidden container it still renders correctly.
- SelectItem with value="" throws. Use a sentinel value for "none".

## Examples

### Labelled select

```tsx
<Label htmlFor="region">Region</Label>
<Select>
  <SelectTrigger id="region" className="w-[200px]">
    <SelectValue placeholder="Select a region" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Americas</SelectLabel>
      <SelectItem value="us-east">US East</SelectItem>
      <SelectItem value="us-west">US West</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Agent rules

1. Always label the trigger.
2. Always give SelectValue a placeholder.
3. Never use an empty string as an item value.
4. Over fifty options, or any need to search, means ui:command.
5. Actions belong in ui:dropdown-menu, not here.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- SelectItem with an empty value
- SelectItem outside SelectContent
- Unlabelled trigger
- Using Select to fire actions

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:command` | Searchable, large sets |
| `ui:radio-group` | Few options |
| `ui:dropdown-menu` | Actions, not values |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`select.agent.json`](select.agent.json) → this file → [`src/components/ui/select.tsx`](../../../../src/components/ui/select.tsx)
