# SonnerToaster

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** templates  
**Component id:** `ui:sonner`  
**Category:** Feedback  
**Status:** Stable  
**Import:** `@/components/ui/sonner`  

## Purpose

The same job as ui:toaster, through a different library with a simpler imperative API.

A Sonner wrapper themed to shadcn tokens. Exports SonnerToaster — deliberately not Toaster, so it cannot collide with ui:toaster at an import site. Reads the theme from the dark class this app actually toggles.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/sonner.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/sonner/sonner.md` | This mirror spec |
| `design-system/components/ui/sonner/sonner.agent.json` | Structured agent contract |
| `design-system/components/ui/sonner/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/sonner/sonner.preview.html` | Visual proof of every documented state |

## When to use

- When you prefer Sonner's imperative toast() API and stacking behaviour
- Promise-based toasts that resolve to success or failure

## When not to use

- Alongside ui:toaster — running both produces two toast systems and two viewports
- When you need the Radix action and altText contract

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The Sonner Toaster, themed with shadcn CSS variables |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Empty** | `No toasts` | Nothing visible |
| **Stacked** | `Several toasts` | Sonner stacks and collapses them |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`sonner.agent.json`](sonner.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `border` | `border-border` |
| `foreground` | `text-foreground` |
| `muted` | `bg-muted`, `text-muted` |
| `primary` | `bg-primary`, `text-primary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `region` |

**Keyboard**

- Sonner supplies its own focus and dismissal handling

**Notes**

- Sonner manages its own announcements. Verify against your screen-reader targets — the contract differs from Radix Toast, which requires altText on every action.
- Theme is read from the dark class on <html> via a MutationObserver, matching tailwind darkMode: ["class"]. The upstream shadcn snippet reads next-themes, which no provider here mounts — it would report "system" regardless and render light toasts on a dark page.

## Examples

### Mount once, then call imperatively

```tsx
// src/App.tsx — one system only
<SonnerToaster />

// anywhere
import { toast } from "sonner"
toast.success("Project archived", {
  action: { label: "Undo", onClick: undo },
})
```

## Agent rules

1. Choose Sonner or ui:toaster. Never both — two systems means every toast appears twice.
2. The export is SonnerToaster, not Toaster. That is deliberate.
3. Sonner actions carry no altText requirement. If you need that accessibility contract, use ui:toast.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Running alongside ui:toaster
- Re-aliasing SonnerToaster back to Toaster

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- Only one toast system may be mounted. Nothing enforces that at build time — it is a review concern.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toaster` | The Radix-based alternative |
| `ui:toast` | The Radix primitives |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`sonner.agent.json`](sonner.agent.json) → this file → [`src/components/ui/sonner.tsx`](../../../../src/components/ui/sonner.tsx)
