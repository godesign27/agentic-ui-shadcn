# Agentic Prompt — Toggle

You are implementing **Toggle** (`ui:toggle`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:toggle` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/toggle` |
| **Exports** | `Toggle`, `toggleVariants` |
| **Primitive** | `@radix-ui/react-toggle` |

## What it is for

> A control that stays pressed — formatting state in a toolbar, not an action.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/toggle/toggle.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/toggle/toggle.md` — anatomy, tokens, examples
5. `src/components/ui/toggle.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Icon-only toggles require aria-label.
- Use ui:switch for settings, not this.
- Pair icon-only toggles with ui:tooltip.

## Never

- Icon-only toggle with no accessible name
- Using Toggle for an immediate setting

## Task

Implement using `Toggle` exactly as the contract declares. Use only the props, variants and sizes in `toggle.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/toggle.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/toggle/toggle.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toggle-group` (Several related toggles) · `ui:switch` (Settings) · `ui:button` (Actions)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
