# Agentic Prompt — Label

You are implementing **Label** (`ui:label`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:label` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/label` |
| **Exports** | `Label` |
| **Primitive** | `@radix-ui/react-label` |

## What it is for

> Names a control, and makes its text a click target for it.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/label/label.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/label/label.md` — anatomy, tokens, examples
5. `src/components/ui/label.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- htmlFor is mandatory. A Label without it is a bug.
- Do not use Label for headings.
- Required-field markers need text or aria-required, not an asterisk alone.

## Never

- Label with no htmlFor
- Asterisk as the only required indicator

## Task

Implement using `Label` exactly as the contract declares. Use only the props, variants and sizes in `label.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/label.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/label/label.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:form` (FormLabel wires htmlFor automatically)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
