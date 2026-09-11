# Toggle

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:toggle`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-toggle`  
**Import:** `@/components/ui/toggle`  

## Purpose

A control that stays pressed — formatting state in a toolbar, not an action.

Radix Toggle with two variants and three sizes. Semantically a pressed button, not a checkbox.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/toggle.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/toggle/toggle.md` | This mirror spec |
| `design-system/components/ui/toggle/toggle.agent.json` | Structured agent contract |
| `design-system/components/ui/toggle/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/toggle/toggle.preview.html` | Visual proof of every documented state |

## When to use

- Text formatting controls — bold, italic, underline
- A single filter that is either applied or not
- Toolbar controls where the pressed state must be visible

## When not to use

- A settings toggle — use ui:switch, which announces on and off
- One of several exclusive options — use ui:toggle-group with type="single"
- An action that fires and completes — use ui:button

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The button, carrying data-state=on|off |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Off** | `pressed={false}` | Transparent background |
| **On** | `pressed={true}` | bg-accent text-accent-foreground |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled prop` | opacity-50, pointer-events-none |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"outline"` | `"default"` | Declared in `toggleVariants` |
| `size` | `"default"` \| `"sm"` \| `"lg"` | `"default"` | Declared in `toggleVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`toggle.agent.json`](toggle.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `input` | `border-input` |
| `muted` | `bg-muted`, `text-muted` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button with aria-pressed` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Space — toggle
- Enter — toggle

**Required**

- aria-label when icon-only

**Notes**

- Radix sets aria-pressed. Screen readers announce "pressed" or "not pressed".
- Icon-only toggles always need an accessible name and usually a ui:tooltip.

## Examples

### Icon toggle

```tsx
<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

## Agent rules

1. Icon-only toggles require aria-label.
2. Use ui:switch for settings, not this.
3. Pair icon-only toggles with ui:tooltip.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Icon-only toggle with no accessible name
- Using Toggle for an immediate setting

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toggle-group` | Several related toggles |
| `ui:switch` | Settings |
| `ui:button` | Actions |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`toggle.agent.json`](toggle.agent.json) → this file → [`src/components/ui/toggle.tsx`](../../../../src/components/ui/toggle.tsx)
