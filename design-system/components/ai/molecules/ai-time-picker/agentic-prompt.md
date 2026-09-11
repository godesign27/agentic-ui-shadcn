# Agentic Prompt — AI Time Picker

You are implementing the **AI Time Picker** (`ai-time-picker`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Time Picker (`ai-time-picker`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> The DS Time Picker on the AI surface — AI Action Field trigger, brand-indigo slots, and a gradient-filled selected time. Menu sits flush to the field.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-time-picker/ai-time-picker.agent.json`
4. `components/ai/molecules/ai-time-picker/ai-time-picker.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AITimePicker` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `label` (`string`) default ``'Pick a time'`` — Field label (above the field).
- `selected` (`string`) default ``—`` — Selected time slot (e.g. "10:30 am").
- `placeholder` (`string`) default ``'Select time'`` — Italic placeholder when no value.
- `slots` (`string[]`) default ``30-min slots`` — Time options rendered in the menu.
- `size` (`'Normal' \) default `'Small' \` — 'X-Small'`
- `surface` (`'soft' \) default `'flat-blue' \` — 'flat-neutral' \
- `disabled` (`boolean`) default ``false`` — Disables the trigger and menu.
- `open` (`boolean`) default ``—`` — Force the menu open (docs/preview); omit for live toggle.
- `width` (`number \) default `string`` — `332`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
