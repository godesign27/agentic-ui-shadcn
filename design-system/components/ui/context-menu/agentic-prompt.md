# Agentic Prompt — ContextMenu

You are implementing **ContextMenu** (`ui:context-menu`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:context-menu` |
| **Status** | Stable |
| **Tier / Category** | organisms · Overlay |
| **Import** | `@/components/ui/context-menu` |
| **Exports** | `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuGroup`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuPortal`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger` |
| **Primitive** | `@radix-ui/react-context-menu` |

## What it is for

> Actions for the specific thing the user right-clicked.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/context-menu/context-menu.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/context-menu/context-menu.md` — anatomy, tokens, examples
5. `src/components/ui/context-menu.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always duplicate these actions somewhere visible.
- Not appropriate as a primary interaction on touch.
- Destructive items still require confirmation.

### Structure is not optional

```
ContextMenu
  ContextMenuTrigger
  ContextMenuContent
    ContextMenuItem  (optional)
    ContextMenuCheckboxItem  (optional)
    ContextMenuRadioGroup  (optional)
    ContextMenuSub  (optional)
    ContextMenuSeparator  (optional)
```

## Never

- Sole route to an action
- Primary interaction on a touch surface
- Navigation

## Task

Implement using `ContextMenu` exactly as the contract declares. Use only the props, variants and sizes in `context-menu.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/context-menu.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/context-menu/context-menu.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:dropdown-menu` (The discoverable equivalent — provide both)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
