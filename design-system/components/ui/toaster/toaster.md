# Toaster

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** templates  
**Component id:** `ui:toaster`  
**Category:** Feedback  
**Status:** Stable  
**Import:** `@/components/ui/toaster`  
**Depends on:** `ui:toast`  

## Purpose

The one place toasts actually render.

The render host for ui:toast. Subscribes to the useToast queue and maps it to Toast elements. Mount once at the app root.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/toaster.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/toaster/toaster.md` | This mirror spec |
| `design-system/components/ui/toaster/toaster.agent.json` | Structured agent contract |
| `design-system/components/ui/toaster/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/toaster/toaster.preview.html` | Visual proof of every documented state |

## When to use

- Once, at the application root, whenever ui:toast is used anywhere

## When not to use

- More than once — duplicate Toasters render duplicate toasts
- Inside a route or a conditionally rendered branch

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | ToastProvider plus ToastViewport, with the queue mapped to Toast elements |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Empty** | `No toasts queued` | Viewport present but empty |
| **Populated** | `Toasts queued` | Renders in order, capped by the queue limit in use-toast.ts |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`toaster.agent.json`](toaster.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `region` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- F8 — focus the viewport

**Notes**

- Mount it at the root so toasts survive route changes.
- Two Toasters means every toast appears twice.

## Examples

### Root mount

```tsx
// src/App.tsx
<>
  <Routes>{/* … */}</Routes>
  <Toaster />
</>
```

## Agent rules

1. Mount exactly once, at the root.
2. Do not conditionally render it.
3. Pick either this or ui:sonner — not both. This is the default: it matches the rest of the library and enforces altText on toast actions.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Multiple Toaster instances
- Conditional mounting
- Running alongside ui:sonner

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:toast` | The primitives it renders |
| `ui:sonner` | The alternative — choose one |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`toaster.agent.json`](toaster.agent.json) → this file → [`src/components/ui/toaster.tsx`](../../../../src/components/ui/toaster.tsx)
