# Form

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** groups  
**Component id:** `ui:form`  
**Category:** Forms  
**Status:** Stable  
**Primitive:** `@radix-ui/react-label`  
**Import:** `@/components/ui/form`  
**Depends on:** `ui:label`  

## Purpose

Wires a control to its label, description and error message so the accessibility relationships are correct by construction.

A react-hook-form integration layer. FormField provides context; FormItem generates ids; FormControl wires aria-describedby and aria-invalid; FormMessage renders the error.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/form.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/form/form.md` | This mirror spec |
| `design-system/components/ui/form/form.agent.json` | Structured agent contract |
| `design-system/components/ui/form/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/form/form.preview.html` | Visual proof of every documented state |

## When to use

- Any form with validation
- Any form of more than two fields
- Whenever error messages must be announced

## When not to use

- A single search box with no validation
- A settings surface where each control applies immediately

## Anatomy

`Form` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `FormField` | `Form` | Yes | Provides the react-hook-form Controller and field name context |
| `FormItem` | `FormField` | Yes | Generates the id namespace that ties label, control, description and message together |
| `FormLabel` | `FormItem` | Yes | htmlFor is supplied automatically. Turns text-destructive on error. |
| `FormControl` | `FormItem` | Yes | A Slot. Wraps exactly one control and injects id, aria-describedby and aria-invalid. |
| `FormDescription` | `FormItem` | No | Helper text, automatically referenced by aria-describedby |
| `FormMessage` | `FormItem` | No | The validation error. Renders nothing when valid. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Pristine** | `Untouched` | No message rendered |
| **Invalid** | `Validation failed` | FormLabel and FormMessage turn destructive; aria-invalid set on the control |
| **Submitting** | `formState.isSubmitting` | Disable the submit button and give it accessible busy text |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`form.agent.json`](form.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `destructive` | `text-destructive` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `form` |

**Keyboard**

- Tab through fields
- Enter submits from a single-line input

**Required**

- Generated automatically: id, aria-describedby, aria-invalid

**Notes**

- This is the reason to use ui:form at all — the ARIA wiring is generated, not hand-written, so it cannot drift.
- FormControl must wrap exactly one element. Two children breaks the Slot.
- On failed submit, move focus to the first invalid field. react-hook-form does not do this for you.

## Examples

### One field

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...field} />
          </FormControl>
          <FormDescription>We only use this for receipts.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Save</Button>
  </form>
</Form>
```

## Agent rules

1. The five parts are inseparable. Do not use FormLabel outside FormItem.
2. FormControl wraps exactly one control.
3. Never hand-write aria-describedby inside a form — you will fight the generated value.
4. Move focus to the first invalid field after a failed submit.
5. One submit button.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- FormControl with multiple children
- Parts used outside their required parent
- Manual aria-invalid on a wrapped control

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- Does not move focus to the first invalid field on submit — implement that in your onInvalid handler.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:label` | Standalone labelling outside a form |
| `ui:input` | The usual wrapped control |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`form.agent.json`](form.agent.json) → this file → [`src/components/ui/form.tsx`](../../../../src/components/ui/form.tsx)
