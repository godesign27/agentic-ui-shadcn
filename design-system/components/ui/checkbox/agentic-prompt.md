# Agentic Prompt — Checkbox

You are implementing **Checkbox** (`ui:checkbox`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:checkbox` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/checkbox` |
| **Exports** | `Checkbox` |
| **Primitive** | `@radix-ui/react-checkbox` |

## What it is for

> An independent yes-or-no choice, or one of several non-exclusive options.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/checkbox/checkbox.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/checkbox/checkbox.md` — anatomy, tokens, examples
5. `src/components/ui/checkbox.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always pair with ui:label using htmlFor.
- Use indeterminate for parent rows rather than a third visual style.
- A checkbox that applies instantly should probably be a ui:switch.

## Never

- Checkbox with no label
- Using a checkbox where exactly one option must be chosen
- Overriding aria-checked

## Task

Implement using `Checkbox` exactly as the contract declares. Use only the props, variants and sizes in `checkbox.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/checkbox.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/checkbox/checkbox.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:radio-group` (Exclusive choice) · `ui:switch` (Immediate setting) · `ui:form` (Validation)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
