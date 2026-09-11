# Agentic Prompt — Form

You are implementing **Form** (`ui:form`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:form` |
| **Status** | Stable |
| **Tier / Category** | groups · Forms |
| **Import** | `@/components/ui/form` |
| **Exports** | `Form`, `FormControl`, `FormDescription`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`, `useFormField` |
| **Primitive** | `@radix-ui/react-label` |

## What it is for

> Wires a control to its label, description and error message so the accessibility relationships are correct by construction.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/form/form.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/form/form.md` — anatomy, tokens, examples
5. `src/components/ui/form.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- The five parts are inseparable. Do not use FormLabel outside FormItem.
- FormControl wraps exactly one control.
- Never hand-write aria-describedby inside a form — you will fight the generated value.
- Move focus to the first invalid field after a failed submit.
- One submit button.

### Structure is not optional

```
Form
  FormField
    FormItem
      FormLabel
      FormControl
      FormDescription  (optional)
      FormMessage  (optional)
```

## Never

- FormControl with multiple children
- Parts used outside their required parent
- Manual aria-invalid on a wrapped control

## Task

Implement using `Form` exactly as the contract declares. Use only the props, variants and sizes in `form.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/form.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/form/form.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:label` (Standalone labelling outside a form) · `ui:input` (The usual wrapped control)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
