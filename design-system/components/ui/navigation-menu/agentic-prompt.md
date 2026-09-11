# Agentic Prompt — NavigationMenu

You are implementing **NavigationMenu** (`ui:navigation-menu`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:navigation-menu` |
| **Status** | Stable |
| **Tier / Category** | organisms · Navigation |
| **Import** | `@/components/ui/navigation-menu` |
| **Exports** | `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuIndicator`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuTrigger`, `NavigationMenuViewport`, `navigationMenuTriggerStyle` |
| **Primitive** | `@radix-ui/react-navigation-menu` |

## What it is for

> Primary site navigation, with room for a rich panel under each top-level item.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/navigation-menu/navigation-menu.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/navigation-menu/navigation-menu.md` — anatomy, tokens, examples
5. `src/components/ui/navigation-menu.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Navigation only — never actions.
- Use asChild for router integration.
- Provide a ui:sheet fallback on mobile.
- Name the nav when the page has several.

### Structure is not optional

```
NavigationMenu
  NavigationMenuList
    NavigationMenuItem
      NavigationMenuTrigger  (optional)
      NavigationMenuContent  (optional)
    NavigationMenuIndicator  (optional)
  NavigationMenuViewport  (optional)
  NavigationMenuLink  (inside NavigationMenuItem | NavigationMenuContent)
```

## Never

- Actions in a navigation menu
- Mobile usage with no fallback
- Application menus

## Task

Implement using `NavigationMenu` exactly as the contract declares. Use only the props, variants and sizes in `navigation-menu.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/navigation-menu.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/navigation-menu/navigation-menu.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:menubar` (Application menu bar) · `ui:sheet` (Mobile navigation) · `ui:breadcrumb` (Location within the hierarchy)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
