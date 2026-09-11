# ContextMenu

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:context-menu`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-context-menu`  
**Import:** `@/components/ui/context-menu`  

## Purpose

Actions for the specific thing the user right-clicked.

Radix ContextMenu. Structurally identical to ui:dropdown-menu but triggered by right-click or long-press.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/context-menu.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/context-menu/context-menu.md` | This mirror spec |
| `design-system/components/ui/context-menu/context-menu.agent.json` | Structured agent contract |
| `design-system/components/ui/context-menu/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/context-menu/context-menu.preview.html` | Visual proof of every documented state |

## When to use

- Per-item actions in a file browser, canvas or grid
- A power-user accelerator for actions that also exist elsewhere

## When not to use

- As the only path to an action — right-click is undiscoverable and awkward on touch
- On a primarily touch surface
- For navigation

## Anatomy

`ContextMenu` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `ContextMenuTrigger` | `ContextMenu` | Yes | Wraps the right-clickable region — not a button |
| `ContextMenuContent` | `ContextMenu` | Yes |  |
| `ContextMenuItem` | `ContextMenuContent` | No |  |
| `ContextMenuCheckboxItem` | `ContextMenuContent` | No |  |
| `ContextMenuRadioGroup` | `ContextMenuContent` | No |  |
| `ContextMenuSub` | `ContextMenuContent` | No |  |
| `ContextMenuSeparator` | `ContextMenuContent` | No |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `Rest` | Nothing rendered |
| **Open** | `Right-click or long-press on the trigger region` | Opens at the pointer position |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `inset` | `boolean` | — | Declared in the component source. |
| `checked` | `see source` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`context-menu.agent.json`](context-menu.agent.json)

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
| Role | `menu` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Shift+F10 or the Menu key — open
- Arrow keys — navigate
- Escape — close

**Notes**

- Keyboard users reach this via Shift+F10. Most do not know that. Never make it the only route.
- Every action here must also exist in a visible ui:dropdown-menu or toolbar.

## Examples

### Canvas item

```tsx
<ContextMenu>
  <ContextMenuTrigger className="flex h-40 items-center justify-center rounded-md border border-dashed">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={rename}>Rename</ContextMenuItem>
    <ContextMenuItem onSelect={duplicate}>Duplicate</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Agent rules

1. Always duplicate these actions somewhere visible.
2. Not appropriate as a primary interaction on touch.
3. Destructive items still require confirmation.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Sole route to an action
- Primary interaction on a touch surface
- Navigation

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:dropdown-menu` | The discoverable equivalent — provide both |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`context-menu.agent.json`](context-menu.agent.json) → this file → [`src/components/ui/context-menu.tsx`](../../../../src/components/ui/context-menu.tsx)
