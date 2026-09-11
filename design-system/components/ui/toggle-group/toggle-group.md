# ToggleGroup

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:toggle-group`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-toggle-group`  
**Import:** `@/components/ui/toggle-group`  
**Depends on:** `ui:toggle`  

## Purpose

A set of related toggles that share a value and a visual group.

Radix ToggleGroup in single or multiple mode. Items inherit variant and size from the group through context.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/toggle-group.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/toggle-group/toggle-group.md` | This mirror spec |
| `design-system/components/ui/toggle-group/toggle-group.agent.json` | Structured agent contract |
| `design-system/components/ui/toggle-group/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/toggle-group/toggle-group.preview.html` | Visual proof of every documented state |

## When to use

- Text alignment — left, centre, right
- A compact exclusive choice in a toolbar, with type="single"
- Multiple filters applied together, with type="multiple"

## When not to use

- A form field choice that needs a label and validation — use ui:radio-group
- More than about five options
- Navigation between views — use ui:tabs

## Anatomy

`ToggleGroup` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `ToggleGroupItem` | `ToggleGroup` | Yes | Inherits variant and size from the group. Setting them per item is ignored unless the group omits them. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Unselected** | `Not in value` | Transparent |
| **Selected** | `In value` | bg-accent text-accent-foreground |
| **Focus-visible** | `Arrow keys` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled on group or item` | opacity-50 |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"outline"` | `"default"` | Inherited from `ui:toggle` via `toggleVariants` |
| `size` | `"default"` \| `"sm"` \| `"lg"` | `"default"` | Inherited from `ui:toggle` via `toggleVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`toggle-group.agent.json`](toggle-group.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `group` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Arrow keys — move between items
- Tab — enter and leave as one stop
- Space or Enter — toggle

**Required**

- aria-label on the group
- aria-label per icon-only item

**Notes**

- Roving focus: the group is one tab stop.
- type="single" allows deselection unless you handle the empty value — decide whether empty is valid.

## Examples

### Alignment

```tsx
<ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align centre"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>
```

## Agent rules

1. Label the group.
2. Set variant and size on the group, not per item.
3. Icon-only items need aria-label.
4. Decide whether type="single" may be emptied.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Unlabelled group
- Icon-only items with no accessible name
- Using ToggleGroup for page navigation

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toggle` | A single independent toggle |
| `ui:radio-group` | Form-field exclusive choice |
| `ui:tabs` | View switching |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`toggle-group.agent.json`](toggle-group.agent.json) → this file → [`src/components/ui/toggle-group.tsx`](../../../../src/components/ui/toggle-group.tsx)
