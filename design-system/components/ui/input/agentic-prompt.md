# Agentic Prompt — Input

You are implementing **Input** (`ui:input`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:input` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/input` |
| **Exports** | `Input` |

## What it is for

> A single line of user-supplied text, with the focus and disabled behavior already correct.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/input/input.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/input/input.md` — anatomy, tokens, examples
5. `src/components/ui/input.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never render an Input without an associated Label.
- Set autoComplete on anything a browser can fill.
- Use ui:form for validation rather than hand-wiring aria-describedby.

## Never

- Placeholder as the only label
- Error communicated by border colour alone
- Removing the focus ring

## Task

Implement using `Input` exactly as the contract declares. Use only the props, variants and sizes in `input.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/input.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/input/input.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:textarea` (Multi-line) · `ui:label` (Required companion) · `ui:form` (Validation and error wiring)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
