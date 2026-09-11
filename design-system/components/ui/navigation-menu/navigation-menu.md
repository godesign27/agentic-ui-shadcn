# NavigationMenu

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:navigation-menu`  
**Category:** Navigation  
**Status:** Stable  
**Primitive:** `@radix-ui/react-navigation-menu`  
**Import:** `@/components/ui/navigation-menu`  

## Purpose

Primary site navigation, with room for a rich panel under each top-level item.

Radix NavigationMenu with an animated viewport and an indicator. Built for websites rather than applications.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/navigation-menu.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/navigation-menu/navigation-menu.md` | This mirror spec |
| `design-system/components/ui/navigation-menu/navigation-menu.agent.json` | Structured agent contract |
| `design-system/components/ui/navigation-menu/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/navigation-menu/navigation-menu.preview.html` | Visual proof of every documented state |

## When to use

- Marketing site headers
- Mega-menus with grouped links and descriptions
- Primary navigation with two levels

## When not to use

- Application menus — use ui:menubar or a toolbar with ui:dropdown-menu
- Actions rather than navigation
- Mobile — collapse to a ui:sheet instead
- Flat navigation with no second level — plain links are better

## Anatomy

`NavigationMenu` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `NavigationMenuList` | `NavigationMenu` | Yes |  |
| `NavigationMenuItem` | `NavigationMenuList` | Yes |  |
| `NavigationMenuTrigger` | `NavigationMenuItem` | No | For items with a panel |
| `NavigationMenuContent` | `NavigationMenuItem` | No | The panel |
| `NavigationMenuLink` | `NavigationMenuItem | NavigationMenuContent` | No | Use asChild with your router link |
| `NavigationMenuIndicator` | `NavigationMenuList` | No | The arrow pointing at the active trigger |
| `NavigationMenuViewport` | `NavigationMenu` | No | Rendered automatically |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `Rest` | Triggers visible |
| **Open** | `Hover or focus on a trigger` | Viewport animates to the panel size |
| **Active link** | `data-active` | bg-accent/50 |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`navigation-menu.agent.json`](navigation-menu.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `background` | `bg-background` |
| `border` | `bg-border` |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `navigation` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Tab — move between top-level items
- Enter or Space — open a panel
- Arrow keys — move within a panel
- Escape — close

**Required**

- An accessible name on the nav when there is more than one on the page

**Notes**

- Opens on hover as well as focus, which is right for site navigation and wrong for actions.
- Use navigationMenuTriggerStyle() for links that must match trigger styling.
- On mobile this pattern does not work. Swap to ui:sheet below the breakpoint.

## Examples

### Two-level nav

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4">
          <li><NavigationMenuLink asChild><a href="/a">Analytics</a></NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Agent rules

1. Navigation only — never actions.
2. Use asChild for router integration.
3. Provide a ui:sheet fallback on mobile.
4. Name the nav when the page has several.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Actions in a navigation menu
- Mobile usage with no fallback
- Application menus

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:menubar` | Application menu bar |
| `ui:sheet` | Mobile navigation |
| `ui:breadcrumb` | Location within the hierarchy |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`navigation-menu.agent.json`](navigation-menu.agent.json) → this file → [`src/components/ui/navigation-menu.tsx`](../../../../src/components/ui/navigation-menu.tsx)
