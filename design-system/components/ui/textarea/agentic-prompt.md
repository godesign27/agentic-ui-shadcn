# Agentic Prompt — Textarea

You are implementing **Textarea** (`ui:textarea`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:textarea` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/textarea` |
| **Exports** | `Textarea` |

## What it is for

> Multi-line text where the length is genuinely open-ended.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/textarea/textarea.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/textarea/textarea.md` — anatomy, tokens, examples
5. `src/components/ui/textarea.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always pair with ui:label.
- Does not auto-grow — set rows or a min-height class if the default is wrong.
- Announce character limits in a live region.

## Never

- Placeholder as the only label
- A hard character limit with no visible or announced counter

## Task

Implement using `Textarea` exactly as the contract declares. Use only the props, variants and sizes in `textarea.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/textarea.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/textarea/textarea.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:input` (Single-line) · `ui:form` (Validation)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
