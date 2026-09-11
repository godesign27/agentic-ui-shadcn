# AlertDialog

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:alert-dialog`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-alert-dialog`  
**Import:** `@/components/ui/alert-dialog`  
**Depends on:** `ui:button`  

## Purpose

Stop the user before something irreversible happens, and make cancelling the easy path.

Radix AlertDialog. Unlike ui:dialog it cannot be dismissed by clicking the overlay, and Cancel receives initial focus — both deliberate.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/alert-dialog.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/alert-dialog/alert-dialog.md` | This mirror spec |
| `design-system/components/ui/alert-dialog/alert-dialog.agent.json` | Structured agent contract |
| `design-system/components/ui/alert-dialog/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/alert-dialog/alert-dialog.preview.html` | Visual proof of every documented state |

## When to use

- Deleting something
- Discarding unsaved work
- Any action that cannot be undone
- Any action with consequences outside the current session

## When not to use

- Routine confirmations where the action is trivially reversible — the friction is not free
- A form or any input collection — use ui:dialog
- Informational messages — use ui:toast or ui:alert
- So often that users stop reading it

## Anatomy

`AlertDialog` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `AlertDialogTrigger` | `AlertDialog` | No |  |
| `AlertDialogContent` | `AlertDialog` | Yes |  |
| `AlertDialogHeader` | `AlertDialogContent` | No |  |
| `AlertDialogTitle` | `AlertDialogHeader` | Yes | Name the specific object: "Delete Apollo?" |
| `AlertDialogDescription` | `AlertDialogHeader` | Yes | State exactly what is lost. This is the whole point of the component. |
| `AlertDialogFooter` | `AlertDialogContent` | Yes |  |
| `AlertDialogCancel` | `AlertDialogFooter` | Yes | Receives initial focus. Never omit it. |
| `AlertDialogAction` | `AlertDialogFooter` | Yes | Label with the verb. Add destructive styling via className. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Closed** | `open={false}` | Nothing rendered |
| **Open** | `Trigger activated` | Focus moves to AlertDialogCancel, not to the confirm action |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`alert-dialog.agent.json`](alert-dialog.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `alertdialog` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |
| Focus management | Cancel receives initial focus. Overlay clicks do not dismiss. Both differ from ui:dialog and are intentional. |

**Keyboard**

- Escape — cancel
- Tab — cycle within the trap
- Enter — activate the focused control, which is Cancel by default

**Required**

- AlertDialogTitle and AlertDialogDescription are both required

**Notes**

- role="alertdialog" makes assistive technology announce it more assertively than a plain dialog.
- Never move initial focus to AlertDialogAction. A stray Enter would then destroy data.
- AlertDialogAction is not destructive-styled by default — add bg-destructive text-destructive-foreground yourself.

## Examples

### Delete confirmation

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete project</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete “Apollo”?</AlertDialogTitle>
      <AlertDialogDescription>
        This removes the project and its 42 runs. This cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Delete project
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Agent rules

1. Name the object in the title and the loss in the description.
2. Label the action with the verb — "Delete project", never "OK" or "Yes".
3. Never focus the confirm action by default.
4. Style AlertDialogAction as destructive when the action is destructive.
5. An AI agent must never open and confirm this flow without a human gesture.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Confirm button labelled OK or Yes
- Initial focus on the confirm action
- Omitting AlertDialogCancel
- Collecting input inside an alert dialog

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:dialog` | Non-destructive tasks and forms |
| `ui:toast` | Reporting the outcome afterwards |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`alert-dialog.agent.json`](alert-dialog.agent.json) → this file → [`src/components/ui/alert-dialog.tsx`](../../../../src/components/ui/alert-dialog.tsx)
