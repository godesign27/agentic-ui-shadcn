# Agentic Prompt — AI Picker

You are implementing the **AI Picker** (`ai-picker`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Picker (`ai-picker`) |
| **Status** | Draft |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> AI suggests a date or time from data; the human reviews and decides. Never auto-applies. Scales from a passive chip to a full governance panel by density.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-picker/ai-picker.agent.json`
4. `components/ai/molecules/ai-picker/ai-picker.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIPicker` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `type` (`"date" \) default `"month" \` — "month-range" \
- `density` (`"basic" \) default `"simple" \` — "rich" \
- `label` (`string`) default ``—`` — Field label
- `value` (`string`) default ``""`` — Current formatted value
- `suggestion` (`AISuggestion`) default ``—`` — AI suggestion; absent = trigger only
- `onAccept` (`(value) => void`) default ``—`` — Explicit accept — never auto-fired
- `onReject` (`() => void`) default ``—`` — Reject / dismiss the suggestion
- `onCustomize` (`() => void`) default ``—`` — Robust — open manual customization
- `onChange` (`(value) => void`) default ``—`` — Fired on popover selection
- `disabled` (`boolean`) default ``false`` — Suppresses all AI signals
- `state` (`"default" \) default `"error"`` — `"default"`
- `errorMessage` (`string`) default ``—`` — Message shown in error state

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
