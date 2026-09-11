# Agentic Prompt — Button

You are implementing **Button** (`ui:button`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:button` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/button` |
| **Exports** | `Button`, `buttonVariants` |
| **Primitive** | `@radix-ui/react-slot` |

## What it is for

> The single most important decision available in a region, and every lesser one alongside it.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/button/button.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/button/button.md` — anatomy, tokens, examples
5. `src/components/ui/button.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- One variant="default" button per action region.
- Label with a verb naming the specific outcome — "Delete project", not "OK".
- size="icon" without an accessible name is a hard failure.
- Do not restyle via className when a variant already expresses the intent.
- buttonVariants is imported by ui:alert-dialog, ui:calendar, ui:carousel and ui:pagination. Renaming a variant breaks all four silently.

## Never

- Two primary buttons in one action region
- variant="destructive" on a non-destructive action
- Removing focus-visible styling
- Icon-only button with no accessible name

## Task

Implement using `Button` exactly as the contract declares. Use only the props, variants and sizes in `button.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/button.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/button/button.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toggle` (For binary state rather than an action) · `ui:dropdown-menu` (When one button hides several actions) · `ui:alert-dialog` (Required companion for destructive actions)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
