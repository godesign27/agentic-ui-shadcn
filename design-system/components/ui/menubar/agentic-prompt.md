# Agentic Prompt — Menubar

You are implementing **Menubar** (`ui:menubar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:menubar` |
| **Status** | Stable |
| **Tier / Category** | organisms · Navigation |
| **Import** | `@/components/ui/menubar` |
| **Exports** | `Menubar`, `MenubarCheckboxItem`, `MenubarContent`, `MenubarGroup`, `MenubarItem`, `MenubarLabel`, `MenubarMenu`, `MenubarPortal`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarTrigger` |
| **Primitive** | `@radix-ui/react-menubar` |

## What it is for

> A persistent application menu bar, in the desktop-software sense.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/menubar/menubar.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/menubar/menubar.md` — anatomy, tokens, examples
5. `src/components/ui/menubar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Desktop-class applications only.
- Use ui:navigation-menu for site navigation.
- Keep top-level items to about five.
- Not suitable for narrow layouts — provide an alternative.

### Structure is not optional

```
Menubar
  MenubarMenu
    MenubarTrigger
    MenubarContent
      MenubarItem  (optional)
      MenubarCheckboxItem  (optional)
      MenubarRadioGroup  (optional)
      MenubarSub  (optional)
      MenubarSeparator  (optional)
```

## Never

- Website navigation
- Mobile layouts
- As a general toolbar

## Task

Implement using `Menubar` exactly as the contract declares. Use only the props, variants and sizes in `menubar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/menubar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/menubar/menubar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:navigation-menu` (Site navigation) · `ui:dropdown-menu` (A single menu button)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
