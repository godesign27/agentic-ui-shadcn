# Agentic Prompt — FormField

You are implementing **FormField** (`pattern:form-field`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `pattern:form-field` |
| **Status** | Stable |
| **Tier / Category** | groups · Forms |
| **Import** | `@/components/patterns/form-field` |
| **Exports** | `FormField` |

## What it is for

> A labelled control with its description and error, wired together correctly.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/patterns/form-field/form-field.agent.json` — props, variants, forbidden usage
4. `design-system/components/patterns/form-field/form-field.md` — anatomy, tokens, examples
5. `src/components/patterns/form-field.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Exactly one child element.
- Use ui:form inside react-hook-form; this is for standalone fields.
- Never omit the label. Use sr-only if it must be visually hidden.
- Pass error only when validation has actually failed — role="alert" interrupts.

## Never

- Multiple children
- Omitting the label
- Asterisk as the only required indicator
- Use for non-form controls

## Task

Implement using `FormField` exactly as the contract declares. Use only the props, variants and sizes in `form-field.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/patterns/form-field.tsx` — the source settles every disagreement.
2. Open `design-system/components/patterns/form-field/form-field.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:form` (react-hook-form integration) · `ui:label` (The label alone) · `ui:input` (The usual child)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
