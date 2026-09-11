# Menubar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:menubar`  
**Category:** Navigation  
**Status:** Stable  
**Primitive:** `@radix-ui/react-menubar`  
**Import:** `@/components/ui/menubar`  

## Purpose

A persistent application menu bar, in the desktop-software sense.

Radix Menubar: a horizontal row of menus that share focus and open on hover once one is open.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/menubar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/menubar/menubar.md` | This mirror spec |
| `design-system/components/ui/menubar/menubar.agent.json` | Structured agent contract |
| `design-system/components/ui/menubar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/menubar/menubar.preview.html` | Visual proof of every documented state |

## When to use

- Desktop-class applications — editors, IDEs, design tools
- When users expect File, Edit, View

## When not to use

- A website — use ui:navigation-menu
- A typical web application — a toolbar with ui:dropdown-menu is lighter and more familiar
- Mobile or narrow layouts

## Anatomy

`Menubar` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `MenubarMenu` | `Menubar` | Yes | One per top-level menu |
| `MenubarTrigger` | `MenubarMenu` | Yes |  |
| `MenubarContent` | `MenubarMenu` | Yes |  |
| `MenubarItem` | `MenubarContent` | No |  |
| `MenubarCheckboxItem` | `MenubarContent` | No |  |
| `MenubarRadioGroup` | `MenubarContent` | No |  |
| `MenubarSub` | `MenubarContent` | No |  |
| `MenubarSeparator` | `MenubarContent` | No |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `Rest` | Triggers visible, no menu open |
| **Open** | `Click or Enter on a trigger` | That menu opens; hovering siblings then switches without clicking |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`menubar.agent.json`](menubar.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `background` | `bg-background` |
| `muted` | `bg-muted`, `text-muted` |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `menubar` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- ArrowLeft/ArrowRight — move between top-level menus
- ArrowDown — open the focused menu
- Arrow keys — move within a menu
- Escape — close

**Notes**

- The whole bar is one tab stop with roving focus.
- This pattern is unfamiliar on the web. Only use it where the desktop metaphor is genuinely expected.

## Examples

### File menu

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Save<MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Agent rules

1. Desktop-class applications only.
2. Use ui:navigation-menu for site navigation.
3. Keep top-level items to about five.
4. Not suitable for narrow layouts — provide an alternative.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Website navigation
- Mobile layouts
- As a general toolbar

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:navigation-menu` | Site navigation |
| `ui:dropdown-menu` | A single menu button |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`menubar.agent.json`](menubar.agent.json) → this file → [`src/components/ui/menubar.tsx`](../../../../src/components/ui/menubar.tsx)
