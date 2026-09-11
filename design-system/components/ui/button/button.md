# Button

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:button`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-slot`  
**Import:** `@/components/ui/button`  

## Purpose

The single most important decision available in a region, and every lesser one alongside it.

The primary interactive control. Six variants spanning full emphasis to bare text, four sizes, and asChild polymorphism for rendering as a link while keeping button styling.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/button.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/button/button.md` | This mirror spec |
| `design-system/components/ui/button/button.agent.json` | Structured agent contract |
| `design-system/components/ui/button/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/button/button.preview.html` | Visual proof of every documented state |

## When to use

- Any action the user takes — submit, save, open, confirm, cancel
- As a link that must look like a button, via asChild with an anchor inside
- Icon-only actions, using size="icon" plus an accessible name

## When not to use

- Navigation between pages that should read as a link — use a plain anchor or variant="link"
- Toggling a binary setting — use ui:switch or ui:toggle so the state is announced
- One choice among several — use ui:radio-group or ui:tabs
- A destructive action on its own — pair variant="destructive" with ui:alert-dialog

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The button element, or any element when asChild is set |
| **Icon** | Optional leading or trailing SVG. Sized automatically to 16px and made non-interactive by the base class |
| **Label** | The action text. A verb phrase, not a noun |

## Variants

| Variant | When to use it |
| --- | --- |
| `default` | The one primary action in a region. Never two. |
| `destructive` | Irreversible or damaging actions only. Always confirm first. |
| `outline` | Secondary actions that still need a visible boundary. |
| `secondary` | Secondary actions on a busy surface where an outline would add noise. |
| `ghost` | Tertiary actions, toolbar controls, and icon buttons inside dense UI. |
| `link` | An action that is semantically navigation but must sit in a button row. |

## Sizes

| Size | Guidance |
| --- | --- |
| `default` | h-10. The standard. Use unless you have a reason not to. |
| `sm` | h-9. Dense toolbars and table rows. Verify the 44px touch target is still met by surrounding padding. |
| `lg` | h-11. Primary calls to action on marketing or empty-state surfaces. |
| `icon` | h-10 w-10. Square, icon only. Requires aria-label or an sr-only span. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Full opacity, variant background |
| **Hover** | `Pointer over` | Background shifts to /90 or /80 opacity depending on variant |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ring ring-offset-2. Never remove. |
| **Disabled** | `disabled prop` | opacity-50 and pointer-events-none. Still reachable by screen readers, which is correct. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"destructive"` \| `"outline"` \| `"secondary"` \| `"ghost"` \| `"link"` | `"default"` | Declared in `buttonVariants` |
| `size` | `"default"` \| `"sm"` \| `"lg"` \| `"icon"` | `"default"` | Declared in `buttonVariants` |
| `asChild` | `boolean` | `false` | Render the child element instead, merging props and styles |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`button.agent.json`](button.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `background` | `bg-background` |
| `destructive` | `bg-destructive`, `text-destructive` |
| `input` | `border-input` |
| `primary` | `bg-primary`, `text-primary` |
| `ring` | `ring-ring` |
| `secondary` | `bg-secondary`, `text-secondary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button` |

**Keyboard**

- Enter — activate
- Space — activate

**Required**

- aria-label or visible text content
- aria-label required when size="icon"

**Notes**

- Native button element gives keyboard and screen-reader behavior for free.
- disabled removes the element from the tab order. If the user needs to know why it is disabled, use aria-disabled and handle the click instead.
- When asChild renders an anchor, the element becomes a link: Space no longer activates it and it gains link semantics. That is usually what you want for navigation, and wrong for actions.

## Examples

### Primary action

```tsx
<Button onClick={save}>Save changes</Button>
```

### Destructive, confirmed

```tsx
<AlertDialogTrigger asChild>
  <Button variant="destructive">Delete project</Button>
</AlertDialogTrigger>
```

### As a link

```tsx
<Button asChild variant="link">
  <a href="/docs">Read the docs</a>
</Button>
```

### Icon only

```tsx
<Button size="icon" aria-label="Close panel">
  <X />
</Button>
```

## Agent rules

1. One variant="default" button per action region.
2. Label with a verb naming the specific outcome — "Delete project", not "OK".
3. size="icon" without an accessible name is a hard failure.
4. Do not restyle via className when a variant already expresses the intent.
5. buttonVariants is imported by ui:alert-dialog, ui:calendar, ui:carousel and ui:pagination. Renaming a variant breaks all four silently.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Two primary buttons in one action region
- variant="destructive" on a non-destructive action
- Removing focus-visible styling
- Icon-only button with no accessible name

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toggle` | For binary state rather than an action |
| `ui:dropdown-menu` | When one button hides several actions |
| `ui:alert-dialog` | Required companion for destructive actions |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`button.agent.json`](button.agent.json) → this file → [`src/components/ui/button.tsx`](../../../../src/components/ui/button.tsx)
