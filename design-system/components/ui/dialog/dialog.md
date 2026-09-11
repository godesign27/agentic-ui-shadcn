# Dialog

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:dialog`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-dialog`  
**Import:** `@/components/ui/dialog`  

## Purpose

Interrupt the user for a self-contained task that must finish before anything else continues.

Radix Dialog: a centred modal with an overlay, focus trap, Escape dismissal and focus return. Renders in a portal.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/dialog.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/dialog/dialog.md` | This mirror spec |
| `design-system/components/ui/dialog/dialog.agent.json` | Structured agent contract |
| `design-system/components/ui/dialog/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/dialog/dialog.preview.html` | Visual proof of every documented state |

## When to use

- A short focused task — rename, invite, quick edit
- Content that genuinely requires the rest of the page to wait
- A form of one to four fields

## When not to use

- A multi-step workflow — that belongs on a page route. This is the most frequent misuse.
- A destructive confirmation — use ui:alert-dialog, which has the right semantics and focus default
- Contextual detail beside a trigger — use ui:popover or ui:hover-card
- An edge panel with room for a lot of content — use ui:sheet
- Anything the user might want to reach by URL

## Anatomy

`Dialog` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `DialogTrigger` | `Dialog` | No | Use asChild to wrap your own button |
| `DialogPortal` | `Dialog` | No | Applied automatically by DialogContent |
| `DialogOverlay` | `DialogPortal` | No | Rendered by DialogContent |
| `DialogContent` | `Dialog` | Yes | The modal surface. Includes its own close button. |
| `DialogHeader` | `DialogContent` | No |  |
| `DialogTitle` | `DialogHeader` | Yes | Required by Radix for the accessible name. Omitting it logs a warning and breaks screen-reader announcement. |
| `DialogDescription` | `DialogHeader` | No | Wired to aria-describedby |
| `DialogFooter` | `DialogContent` | No | Action row. Reverses to a column on mobile. |
| `DialogClose` | `DialogContent` | No |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `open={false}` | Nothing rendered |
| **Open** | `open={true}` | Overlay fades in, content zooms in, focus moves inside and is trapped |
| **Closing** | `Escape, overlay click, or close button` | Animates out; focus returns to the trigger |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`dialog.agent.json`](dialog.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent` |
| `background` | `bg-background` |
| `muted` | `text-muted` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `dialog` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |
| Focus management | Focus moves into the content on open and returns to the trigger on close. Radix handles both. |

**Keyboard**

- Escape — close
- Tab — cycle within the trap
- Shift+Tab — reverse

**Required**

- DialogTitle is mandatory — it supplies the accessible name

**Notes**

- DialogTitle is not optional. If the design has no visible title, render one inside a VisuallyHidden wrapper.
- Do not nest a Dialog inside a Dialog. Replace the content instead.
- Page scroll is locked while open. Long content needs its own scroll container.

## Examples

### Edit dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Changes save when you click Save.</DialogDescription>
    </DialogHeader>
    {/* fields */}
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Agent rules

1. DialogTitle is mandatory, visually hidden if necessary.
2. Multi-step workflows go on a page route, not in here.
3. Destructive confirmations use ui:alert-dialog.
4. Never nest dialogs.
5. Long content needs an inner scroll region, not a taller modal.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- DialogContent without DialogTitle
- Nested dialogs
- Multi-step wizards
- Destructive confirmation without alert-dialog semantics

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:alert-dialog` | Destructive confirmation — Cancel is focused by default |
| `ui:sheet` | Edge panel with more room |
| `ui:popover` | Non-modal contextual content |
| `ui:drawer` | Not in this inventory — use ui:sheet with side="bottom" |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`dialog.agent.json`](dialog.agent.json) → this file → [`src/components/ui/dialog.tsx`](../../../../src/components/ui/dialog.tsx)
