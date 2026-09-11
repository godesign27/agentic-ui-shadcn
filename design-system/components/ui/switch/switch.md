# Switch

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:switch`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-switch`  
**Import:** `@/components/ui/switch`  

## Purpose

A setting that takes effect the moment it is flipped.

Radix Switch styled as a sliding track and thumb. Semantically a checkbox; visually a commitment that the change is immediate.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/switch.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/switch/switch.md` | This mirror spec |
| `design-system/components/ui/switch/switch.agent.json` | Structured agent contract |
| `design-system/components/ui/switch/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/switch/switch.preview.html` | Visual proof of every documented state |

## When to use

- Settings that apply instantly with no save step
- Enabling or disabling a feature
- Anything a user would describe as "turning on"

## When not to use

- Inside a form that requires submission — use ui:checkbox, because a switch promises immediacy it cannot keep
- Choosing between two named alternatives — use ui:toggle-group or ui:radio-group
- Accepting terms — that is a ui:checkbox

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The track |
| **Thumb** | The sliding knob, translated on state change |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Off** | `checked={false}` | bg-input, thumb at rest |
| **On** | `checked={true}` | bg-primary, thumb translated |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled prop` | opacity-50, cursor-not-allowed |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`switch.agent.json`](switch.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `input` | `bg-input` |
| `primary` | `bg-primary` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `switch` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Space — toggle
- Enter — toggle

**Required**

- An associated label

**Notes**

- Radix gives role="switch" and aria-checked. Screen readers announce on and off rather than checked and unchecked.
- The label must name the setting, not the state. "Email notifications", never "On".
- Position change alone does not meet the non-colour requirement for all users — keep the label adjacent and visible.

## Examples

### Setting row

```tsx
<div className="flex items-center justify-between">
  <Label htmlFor="notifications">Email notifications</Label>
  <Switch id="notifications" />
</div>
```

## Agent rules

1. Label the setting, not the state.
2. If a save button exists, use ui:checkbox instead.
3. Reflect failure by reverting the switch and reporting it — never leave it optimistically on.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- A switch inside a form with a submit button
- A label that reads "On" or "Off"
- Switch with no label

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:checkbox` | Deferred, form-submitted state |
| `ui:toggle` | Toolbar pressed state |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`switch.agent.json`](switch.agent.json) → this file → [`src/components/ui/switch.tsx`](../../../../src/components/ui/switch.tsx)
