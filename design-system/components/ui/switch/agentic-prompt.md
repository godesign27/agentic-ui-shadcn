# Agentic Prompt — Switch

You are implementing **Switch** (`ui:switch`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:switch` |
| **Status** | Stable |
| **Tier / Category** | atoms · Forms |
| **Import** | `@/components/ui/switch` |
| **Exports** | `Switch` |
| **Primitive** | `@radix-ui/react-switch` |

## What it is for

> A setting that takes effect the moment it is flipped.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/switch/switch.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/switch/switch.md` — anatomy, tokens, examples
5. `src/components/ui/switch.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Label the setting, not the state.
- If a save button exists, use ui:checkbox instead.
- Reflect failure by reverting the switch and reporting it — never leave it optimistically on.

## Never

- A switch inside a form with a submit button
- A label that reads "On" or "Off"
- Switch with no label

## Task

Implement using `Switch` exactly as the contract declares. Use only the props, variants and sizes in `switch.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/switch.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/switch/switch.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:checkbox` (Deferred, form-submitted state) · `ui:toggle` (Toolbar pressed state)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
