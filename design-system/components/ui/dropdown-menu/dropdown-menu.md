# DropdownMenu

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:dropdown-menu`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-dropdown-menu`  
**Import:** `@/components/ui/dropdown-menu`  

## Purpose

A list of actions revealed from a button, with proper menu semantics.

Radix DropdownMenu with submenus, checkbox items, radio groups, labels, separators and shortcut slots.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/dropdown-menu.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/dropdown-menu/dropdown-menu.md` | This mirror spec |
| `design-system/components/ui/dropdown-menu/dropdown-menu.agent.json` | Structured agent contract |
| `design-system/components/ui/dropdown-menu/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/dropdown-menu/dropdown-menu.preview.html` | Visual proof of every documented state |

## When to use

- An overflow or "more actions" menu
- A user account menu
- Actions too numerous to sit in a toolbar
- View options, using checkbox or radio items

## When not to use

- Selecting a form value — use ui:select, which has the right semantics for a value
- Navigating a site — use ui:navigation-menu
- Right-click context — use ui:context-menu
- Two or fewer actions — just show the buttons

## Anatomy

`DropdownMenu` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `DropdownMenuTrigger` | `DropdownMenu` | Yes | Use asChild with a Button |
| `DropdownMenuContent` | `DropdownMenu` | Yes |  |
| `DropdownMenuLabel` | `DropdownMenuContent` | No | A section heading, not selectable |
| `DropdownMenuItem` | `DropdownMenuContent` | No |  |
| `DropdownMenuCheckboxItem` | `DropdownMenuContent` | No |  |
| `DropdownMenuRadioGroup` | `DropdownMenuContent` | No |  |
| `DropdownMenuRadioItem` | `DropdownMenuRadioGroup` | Yes |  |
| `DropdownMenuSub` | `DropdownMenuContent` | No | Wraps SubTrigger and SubContent |
| `DropdownMenuSeparator` | `DropdownMenuContent` | No |  |
| `DropdownMenuShortcut` | `DropdownMenuItem` | No | Presentational only — it does not bind the key |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `Rest` | Nothing rendered |
| **Open** | `Click, Enter, Space or ArrowDown` | Focus moves into the menu |
| **Item focused** | `Arrow keys or hover` | bg-accent text-accent-foreground |
| **Submenu open** | `Hover or ArrowRight on SubTrigger` | Opens to the side with collision detection |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`dropdown-menu.agent.json`](dropdown-menu.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `muted` | `bg-muted` |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `menu` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |
| Focus management | Focus enters the menu on open and returns to the trigger on close. |

**Keyboard**

- ArrowDown or Enter — open
- Arrow keys — move between items
- ArrowRight/ArrowLeft — enter and leave submenus
- Type a letter — typeahead
- Escape — close and return focus
- Tab — close and move on

**Required**

- An accessible name on the trigger

**Notes**

- Radix supplies menu, menuitem, menuitemcheckbox and menuitemradio roles plus roving focus.
- DropdownMenuShortcut only renders the hint. Bind the actual key yourself.
- Destructive items still need ui:alert-dialog confirmation — closing the menu is not a confirmation.

## Examples

### Row actions

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Row actions">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem onSelect={edit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onSelect={duplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive" onSelect={confirmDelete}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Agent rules

1. Use ui:select for values, this for actions.
2. Group with separators and labels once past about seven items.
3. Destructive items get destructive styling and a confirmation step.
4. DropdownMenuShortcut is display only — bind the key separately.
5. Icon-only triggers need an accessible name.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Selecting a form value
- Destructive item with no confirmation
- Items outside DropdownMenuContent
- Unlabelled trigger

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:select` | Form values |
| `ui:context-menu` | Right-click |
| `ui:menubar` | Persistent application menu bar |
| `ui:command` | Searchable command palette |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`dropdown-menu.agent.json`](dropdown-menu.agent.json) → this file → [`src/components/ui/dropdown-menu.tsx`](../../../../src/components/ui/dropdown-menu.tsx)
