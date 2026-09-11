# Sheet

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:sheet`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-dialog`  
**Import:** `@/components/ui/sheet`  

## Purpose

A modal panel anchored to a screen edge, for content that needs more room than a dialog affords.

Radix Dialog repositioned to an edge. Four sides via the side variant. Shares every accessibility behaviour with ui:dialog.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/sheet.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/sheet/sheet.md` | This mirror spec |
| `design-system/components/ui/sheet/sheet.agent.json` | Structured agent contract |
| `design-system/components/ui/sheet/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/sheet/sheet.preview.html` | Visual proof of every documented state |

## When to use

- Filters, settings or detail panels beside the main content
- Mobile navigation, via side="left"
- A bottom sheet on touch, via side="bottom"
- Longer forms that would make a centred dialog unwieldy

## When not to use

- A short confirmation — use ui:dialog or ui:alert-dialog
- Content that should persist while the user works elsewhere — a sheet is modal and blocks the page
- Primary navigation on desktop — use ui:sidebar

## Anatomy

`Sheet` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `SheetTrigger` | `Sheet` | No |  |
| `SheetContent` | `Sheet` | Yes | Carries the side variant. Includes its own close button. |
| `SheetHeader` | `SheetContent` | No |  |
| `SheetTitle` | `SheetHeader` | Yes | Mandatory, as in ui:dialog |
| `SheetDescription` | `SheetHeader` | No |  |
| `SheetFooter` | `SheetContent` | No |  |
| `SheetClose` | `SheetContent` | No |  |

## Variants

| Variant | When to use it |
| --- | --- |
| `right` | The default. Detail panels, filters, settings. |
| `left` | Navigation, especially mobile. |
| `top` | Announcements and search overlays. Rare. |
| `bottom` | Mobile action sheets. The most reachable position on a phone. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `open={false}` | Nothing rendered |
| **Open** | `Trigger activated` | Slides in from the chosen side; focus trapped |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `side` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | `"right"` | Declared in `sheetVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`sheet.agent.json`](sheet.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `foreground` | `text-foreground` |
| `muted` | `text-muted` |
| `ring` | `ring-ring` |
| `secondary` | `bg-secondary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `dialog` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |
| Focus management | Identical to ui:dialog — trap on open, return on close. |

**Keyboard**

- Escape — close
- Tab — cycle within the trap

**Required**

- SheetTitle is mandatory

**Notes**

- Sheet is modal. The page behind it is inert and scroll is locked.
- On narrow screens side="right" and side="left" occupy three-quarters of the width by default.

## Examples

### Filter panel

```tsx
<Sheet>
  <SheetTrigger asChild><Button variant="outline">Filters</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
      <SheetDescription>Narrow the result set.</SheetDescription>
    </SheetHeader>
    <ScrollArea className="h-[calc(100vh-10rem)]">{/* controls */}</ScrollArea>
  </SheetContent>
</Sheet>
```

## Agent rules

1. SheetTitle is mandatory.
2. Choose the side from the content, not from habit: left for nav, bottom for touch actions, right for detail.
3. Long content needs an inner ui:scroll-area.
4. Do not nest sheets or place a dialog inside one.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- SheetContent without SheetTitle
- Nested overlays
- Using a sheet for content that must stay visible while working

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:dialog` | Centred modal |
| `ui:sidebar` | Persistent navigation |
| `ui:scroll-area` | For long sheet content |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`sheet.agent.json`](sheet.agent.json) → this file → [`src/components/ui/sheet.tsx`](../../../../src/components/ui/sheet.tsx)
