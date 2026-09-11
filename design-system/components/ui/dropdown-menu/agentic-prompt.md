# Agentic Prompt — DropdownMenu

You are implementing **DropdownMenu** (`ui:dropdown-menu`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:dropdown-menu` |
| **Status** | Stable |
| **Tier / Category** | organisms · Overlay |
| **Import** | `@/components/ui/dropdown-menu` |
| **Exports** | `DropdownMenu`, `DropdownMenuCheckboxItem`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuPortal`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuTrigger` |
| **Primitive** | `@radix-ui/react-dropdown-menu` |

## What it is for

> A list of actions revealed from a button, with proper menu semantics.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/dropdown-menu/dropdown-menu.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/dropdown-menu/dropdown-menu.md` — anatomy, tokens, examples
5. `src/components/ui/dropdown-menu.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Use ui:select for values, this for actions.
- Group with separators and labels once past about seven items.
- Destructive items get destructive styling and a confirmation step.
- DropdownMenuShortcut is display only — bind the key separately.
- Icon-only triggers need an accessible name.

### Structure is not optional

```
DropdownMenu
  DropdownMenuTrigger
  DropdownMenuContent
    DropdownMenuLabel  (optional)
    DropdownMenuItem  (optional)
      DropdownMenuShortcut  (optional)
    DropdownMenuCheckboxItem  (optional)
    DropdownMenuRadioGroup  (optional)
      DropdownMenuRadioItem
    DropdownMenuSub  (optional)
    DropdownMenuSeparator  (optional)
```

## Never

- Selecting a form value
- Destructive item with no confirmation
- Items outside DropdownMenuContent
- Unlabelled trigger

## Task

Implement using `DropdownMenu` exactly as the contract declares. Use only the props, variants and sizes in `dropdown-menu.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/dropdown-menu.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/dropdown-menu/dropdown-menu.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:select` (Form values) · `ui:context-menu` (Right-click) · `ui:menubar` (Persistent application menu bar) · `ui:command` (Searchable command palette)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
