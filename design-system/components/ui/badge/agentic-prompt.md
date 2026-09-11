# Agentic Prompt — Badge

You are implementing **Badge** (`ui:badge`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:badge` |
| **Status** | Stable |
| **Tier / Category** | atoms · Data Display |
| **Import** | `@/components/ui/badge` |
| **Exports** | `Badge`, `badgeVariants` |

## What it is for

> A short label that classifies the thing next to it.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/badge/badge.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/badge/badge.md` — anatomy, tokens, examples
5. `src/components/ui/badge.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Status goes in the text, not only the colour.
- A bare number needs an aria-label giving it meaning.
- For an interactive chip use ui:button variant="outline" size="sm", not a Badge.
- Keep to one or two words.

## Never

- Badge as a clickable control
- Colour-only status
- Long text

## Task

Implement using `Badge` exactly as the contract declares. Use only the props, variants and sizes in `badge.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/badge.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/badge/badge.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:button` (Interactive chips) · `ui:toggle` (Filter chips)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
