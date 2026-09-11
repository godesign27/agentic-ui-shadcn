# Command

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:command`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-dialog`  
**Import:** `@/components/ui/command`  
**Depends on:** `ui:dialog`  

## Purpose

Find and run anything by typing, without knowing where it lives in the interface.

A cmdk-based command palette with fuzzy filtering, grouping and keyboard navigation. CommandDialog wraps it in ui:dialog for the familiar Cmd+K overlay.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/command.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/command/command.md` | This mirror spec |
| `design-system/components/ui/command/command.agent.json` | Structured agent contract |
| `design-system/components/ui/command/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/command/command.preview.html` | Visual proof of every documented state |

## When to use

- A global Cmd+K palette
- Searching a large option set — fifty entries or more
- A combobox where the user types to filter
- Power-user navigation

## When not to use

- A small known set — use ui:select
- As the only route to a feature — palettes are for acceleration, not discovery
- A primarily touch interface

## Anatomy

`Command` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `CommandDialog` | — | No | Command wrapped in ui:dialog. The usual Cmd+K form. |
| `CommandInput` | `Command` | Yes | The filter field. Autofocused inside CommandDialog. |
| `CommandList` | `Command` | Yes | The scrollable results region |
| `CommandEmpty` | `CommandList` | Yes | Shown when nothing matches. Never omit it. |
| `CommandGroup` | `CommandList` | No | Headed section; hides itself when all children are filtered out |
| `CommandItem` | `CommandGroup` | No |  |
| `CommandSeparator` | `CommandList` | No |  |
| `CommandShortcut` | `CommandItem` | No | Presentational only |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Empty query** | `No input` | All items shown, grouped |
| **Filtering** | `Typing` | Items filter live; empty groups disappear |
| **No results** | `Nothing matches` | CommandEmpty renders |
| **Item selected** | `Arrow keys` | bg-accent text-accent-foreground |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`command.agent.json`](command.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `border` | `bg-border` |
| `foreground` | `text-foreground` |
| `muted` | `text-muted` |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `combobox with listbox` |

**Keyboard**

- Arrow keys — move through results
- Enter — run the selected item
- Escape — close
- Cmd/Ctrl+K — the conventional open shortcut, which you must bind yourself

**Required**

- A placeholder on CommandInput describing what can be searched

**Notes**

- cmdk supplies combobox and listbox semantics and active-descendant management.
- Always render CommandEmpty. Without it a failed search shows a blank box.
- The Cmd+K binding is yours to add — see src/components/prompt-library/usePromptHotkeys.ts for the pattern already used in this repo.

## Examples

### Command palette

```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search commands…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Navigation">
      <CommandItem onSelect={() => go('/ui-kit')}>UI Kit</CommandItem>
      <CommandItem onSelect={() => go('/brand-preview')}>Brand preview</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

## Agent rules

1. CommandEmpty is mandatory.
2. Group once past about ten items.
3. Bind the open shortcut yourself; CommandShortcut only renders the hint.
4. Never the sole route to a feature.
5. Under fifty options with no search need means ui:select.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Omitting CommandEmpty
- Sole route to a feature
- Items outside CommandList

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:dialog` | CommandDialog composes it |
| `ui:select` | Small known sets |
| `ui:popover` | Inline combobox shell |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`command.agent.json`](command.agent.json) → this file → [`src/components/ui/command.tsx`](../../../../src/components/ui/command.tsx)
