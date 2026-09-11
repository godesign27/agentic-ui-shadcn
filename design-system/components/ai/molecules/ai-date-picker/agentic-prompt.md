# Agentic Prompt — AI Date Picker

You are implementing the **AI Date Picker** (`ai-date-picker`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Date Picker (`ai-date-picker`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> The DS Date Picker on the AI surface — AI Action Field trigger, brand-indigo day grid, and a gradient-filled selected date.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-date-picker/ai-date-picker.agent.json`
4. `components/ai/molecules/ai-date-picker/ai-date-picker.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIDatePicker` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `label` (`string`) default ``'Due date'`` — Field label.
- `value` (`string`) default ``—`` — Selected date (formatted).
- `placeholder` (`string`) default ``'MM/DD/YYYY'`` — Trigger placeholder when no value.
- `helper` (`string`) default ``—`` — Helper / validation text below the field.
- `size` (`'normal' \) default `'small'`` — `'normal'`
- `mode` (`'default' \) default `'warning' \` — 'error'`
- `disabled` (`boolean`) default ``false`` — Disables the trigger and panel.
- `open` (`boolean`) default ``—`` — Force the calendar open (docs/preview); omit for live toggle.
- `width` (`number \) default `string`` — `288`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
