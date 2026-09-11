# Agentic Prompt — RadioGroup

You are implementing **RadioGroup** (`ui:radio-group`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:radio-group` |
| **Status** | Stable |
| **Tier / Category** | molecules · Forms |
| **Import** | `@/components/ui/radio-group` |
| **Exports** | `RadioGroup`, `RadioGroupItem` |
| **Primitive** | `@radix-ui/react-radio-group` |

## What it is for

> Exactly one choice from a small set, with every option visible.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/radio-group/radio-group.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/radio-group/radio-group.md` — anatomy, tokens, examples
5. `src/components/ui/radio-group.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Label the group, not only the items.
- Every RadioGroupItem needs a Label with htmlFor.
- Over five options means ui:select.
- Provide a default value unless empty is genuinely valid.

## Never

- A single radio button
- Items with no labels
- Adding tabIndex to items

## Task

Implement using `RadioGroup` exactly as the contract declares. Use only the props, variants and sizes in `radio-group.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/radio-group.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/radio-group/radio-group.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:select` (Many options) · `ui:checkbox` (Non-exclusive) · `ui:toggle-group` (Compact exclusive choice in a toolbar)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
