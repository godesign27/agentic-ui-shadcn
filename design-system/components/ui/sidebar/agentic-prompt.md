# Agentic Prompt — Sidebar

You are implementing **Sidebar** (`ui:sidebar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:sidebar` |
| **Status** | Stable |
| **Tier / Category** | templates · Layout |
| **Import** | `@/components/ui/sidebar` |
| **Exports** | `Sidebar`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarHeader`, `SidebarInput`, `SidebarInset`, `SidebarMenu`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubButton`, `SidebarMenuSubItem`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger`, `useSidebar` |
| **Primitive** | `@radix-ui/react-slot` |

## What it is for

> A complete application navigation shell — collapsible, persistent, responsive, and keyboard-reachable.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/sidebar/sidebar.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/sidebar/sidebar.md` — anatomy, tokens, examples
5. `src/components/ui/sidebar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- SidebarProvider must wrap everything, including SidebarInset.
- Always set the tooltip prop on SidebarMenuButton when collapsible="icon".
- Mark the active route with isActive.
- Use the --sidebar-* tokens, not the page tokens.
- Mobile renders as a Sheet — verify both.

### Structure is not optional

```
SidebarProvider
  Sidebar
    SidebarRail  (optional)
    SidebarHeader  (optional)
    SidebarContent
      SidebarGroup  (optional)
        SidebarGroupLabel  (optional)
        SidebarGroupContent  (optional)
          SidebarMenu  (optional)
            SidebarMenuItem
              SidebarMenuButton  (optional)
              SidebarMenuSub  (optional)
              SidebarMenuAction  (optional)
              SidebarMenuBadge  (optional)
            SidebarMenuSkeleton  (optional)
    SidebarFooter  (optional)
    SidebarSeparator  (optional)
  SidebarInset  (optional)
  SidebarTrigger  (optional)
```

## Never

- Sidebar without SidebarProvider
- Icon-collapsible menu buttons with no tooltip
- Page tokens instead of sidebar tokens
- Using Sidebar for marketing navigation

## Task

Implement using `Sidebar` exactly as the contract declares. Use only the props, variants and sizes in `sidebar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/sidebar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/sidebar/sidebar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:sheet` (What it becomes on mobile) · `ui:navigation-menu` (Site navigation) · `ui:tooltip` (Collapsed labels)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
