# Agentic Prompt — AI Picker Trigger

You are implementing the **AI Picker Trigger** (`ai-picker-trigger`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Picker Trigger (`ai-picker-trigger`) |
| **Status** | Draft |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The styled field that signals an AI-enhanced date/time picker — brand-tinted border, 12px radius, and an AI badge at higher densities.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-picker-trigger/ai-picker-trigger.agent.json`
4. `components/ai/atomic/ai-picker-trigger/ai-picker-trigger.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIPickerTrigger` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `label` (`string`) default ``—`` — Field label
- `value` (`string`) default ``—`` — Current formatted value
- `placeholder` (`string`) default ``"Select…"`` — Shown when no value
- `icon` (`"calendar" \) default `"calendar-range" \` — "clock"`
- `density` (`"basic" \) default `"simple" \` — "rich" \
- `state` (`"default" \) default `"focused" \` — "selected" \
- `aiLabel` (`string`) default ``"AI"`` — AI badge label
- `errorMessage` (`string`) default ``—`` — Message below field in error state
- `onClick` (`() => void`) default ``—`` — Opens popover (wired by the group)

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
