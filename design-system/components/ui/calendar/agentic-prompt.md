# Agentic Prompt — Calendar

You are implementing **Calendar** (`ui:calendar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:calendar` |
| **Status** | Stable |
| **Tier / Category** | organisms · Forms |
| **Import** | `@/components/ui/calendar` |
| **Exports** | `Calendar`, `CalendarDayButton` |

## What it is for

> Pick a date when the surrounding days matter to the choice.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/calendar/calendar.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/calendar/calendar.md` — anatomy, tokens, examples
5. `src/components/ui/calendar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Pair with a text input for typed entry.
- Use the disabled matcher to prevent invalid selections up front.
- Announce selections in a live region.
- Inside ui:popover, render PopoverContent with className="w-auto p-0".

## Never

- Calendar as the only date-entry route
- Allowing invalid dates then rejecting on submit
- Using a day grid for distant historical dates

## Task

Implement using `Calendar` exactly as the contract declares. Use only the props, variants and sizes in `calendar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/calendar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/calendar/calendar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:popover` (The usual host for a date-picker field) · `ui:input` (Typed entry alternative)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
