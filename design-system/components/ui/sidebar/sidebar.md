# Sidebar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** templates  
**Component id:** `ui:sidebar`  
**Category:** Layout  
**Status:** Stable  
**Primitive:** `@radix-ui/react-slot`  
**Import:** `@/components/ui/sidebar`  
**Depends on:** `ui:button`, `ui:input`, `ui:separator`, `ui:sheet`, `ui:skeleton`, `ui:tooltip`  

## Purpose

A complete application navigation shell — collapsible, persistent, responsive, and keyboard-reachable.

The largest component in the inventory at 774 lines. Provider, trigger, rail, inset, header, footer, groups, menus, submenus, badges and skeletons. Collapse state persists in a cookie; on mobile it becomes a ui:sheet.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/sidebar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/sidebar/sidebar.md` | This mirror spec |
| `design-system/components/ui/sidebar/sidebar.agent.json` | Structured agent contract |
| `design-system/components/ui/sidebar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/sidebar/sidebar.preview.html` | Visual proof of every documented state |

## When to use

- Application shells with persistent navigation
- Dashboards and admin interfaces
- Any layout needing a collapsible nav that survives reloads

## When not to use

- Marketing sites — use ui:navigation-menu
- Simple layouts where a header is enough
- When you only need a static panel — this brings a provider, a cookie and a keyboard shortcut

## Anatomy

`SidebarProvider` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `SidebarProvider` | — | Yes | Owns open state, the cookie and the Cmd+B shortcut. Nothing works without it. |
| `Sidebar` | `SidebarProvider` | Yes | side, variant and collapsible props |
| `SidebarInset` | `SidebarProvider` | No | The main content region beside the sidebar |
| `SidebarTrigger` | `SidebarProvider` | No | The toggle button |
| `SidebarRail` | `Sidebar` | No | The thin drag-to-toggle edge |
| `SidebarHeader` | `Sidebar` | No |  |
| `SidebarContent` | `Sidebar` | Yes |  |
| `SidebarFooter` | `Sidebar` | No |  |
| `SidebarGroup` | `SidebarContent` | No |  |
| `SidebarGroupLabel` | `SidebarGroup` | No |  |
| `SidebarGroupContent` | `SidebarGroup` | No |  |
| `SidebarMenu` | `SidebarGroupContent` | No | A ul |
| `SidebarMenuItem` | `SidebarMenu` | Yes | An li |
| `SidebarMenuButton` | `SidebarMenuItem` | No | isActive marks the current route. tooltip shows when collapsed. |
| `SidebarMenuSub` | `SidebarMenuItem` | No |  |
| `SidebarMenuAction` | `SidebarMenuItem` | No | A secondary action on hover |
| `SidebarMenuBadge` | `SidebarMenuItem` | No |  |
| `SidebarMenuSkeleton` | `SidebarMenu` | No |  |
| `SidebarSeparator` | `Sidebar` | No |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Expanded** | `Default` | Full width, labels visible |
| **Collapsed (icon)** | `collapsible="icon"` | Icons only. SidebarMenuButton tooltips become the labels. |
| **Collapsed (offcanvas)** | `collapsible="offcanvas"` | Slides entirely out of view |
| **Mobile** | `Below the breakpoint` | Renders as a ui:sheet regardless of the collapsed state |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"outline"` | `"default"` | Declared in `sidebarMenuButtonVariants` |
| `size` | `"default"` \| `"sm"` \| `"lg"` | `"default"` | Declared in `sidebarMenuButtonVariants` |
| `asChild` | `boolean` | `false` | Render the child element instead, merging props and styles |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`sidebar.agent.json`](sidebar.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `sidebar-accent` | `bg-sidebar-accent`, `text-sidebar-accent` |
| `sidebar-border` | `bg-sidebar-border`, `border-sidebar-border` |
| `sidebar-foreground` | `text-sidebar-foreground` |
| `sidebar-ring` | `ring-sidebar-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `complementary` |

**Keyboard**

- Cmd/Ctrl+B — toggle, bound by the provider
- Tab through menu items
- Enter — activate

**Required**

- tooltip on SidebarMenuButton when collapsible="icon"
- isActive plus aria-current on the active route

**Notes**

- When collapsed to icons, the tooltip prop is the only accessible name a menu button has. Omitting it makes the collapsed sidebar unusable.
- The Cmd+B shortcut is registered globally by the provider. Check it does not collide with your editor surfaces.
- Uses its own --sidebar-* token scale, deliberately distinct from the page palette.

## Examples

### Application shell

```tsx
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>{/* brand */}</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive tooltip="Dashboard">
                <a href="/"><Home /><span>Dashboard</span></a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

## Agent rules

1. SidebarProvider must wrap everything, including SidebarInset.
2. Always set the tooltip prop on SidebarMenuButton when collapsible="icon".
3. Mark the active route with isActive.
4. Use the --sidebar-* tokens, not the page tokens.
5. Mobile renders as a Sheet — verify both.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Sidebar without SidebarProvider
- Icon-collapsible menu buttons with no tooltip
- Page tokens instead of sidebar tokens
- Using Sidebar for marketing navigation

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:sheet` | What it becomes on mobile |
| `ui:navigation-menu` | Site navigation |
| `ui:tooltip` | Collapsed labels |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`sidebar.agent.json`](sidebar.agent.json) → this file → [`src/components/ui/sidebar.tsx`](../../../../src/components/ui/sidebar.tsx)
