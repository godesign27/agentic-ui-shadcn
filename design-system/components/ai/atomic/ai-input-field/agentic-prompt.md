# Agentic Prompt — AI Action Field

You are implementing the **AI Action Field** (`ai-input-field`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Action Field (`ai-input-field`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The text-entry atom for AI surfaces. Mirrors DS Field’s scope (label · input · helper) but restyled onto the Guild brand surface — rounded outline, brand-blue border, and a soft blue-halo focus.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-input-field/ai-input-field.agent.json`
4. `components/ai/atomic/ai-input-field/ai-input-field.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIInputField` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `label` (`string`) default ``'Label'`` — Field label rendered above the input.
- `value` (`string`) default ``—`` — Controlled input value.
- `placeholder` (`string`) default ``'Placeholder text…'`` — Placeholder shown when empty.
- `helper` (`string`) default ``'Helper text'`` — Helper / validation text below the input.
- `size` (`'normal' \) default `'small'`` — `'normal'`
- `mode` (`'default' \) default `'warning' \` — 'error'`
- `state` (`'default' \) default `'focused'`` — `—`
- `disabled` (`boolean`) default ``false`` — Non-editable, reduced contrast.
- `onChange` (`(next: string) => void`) default ``—`` — Change handler receiving the new value.
- `width` (`number \) default `string`` — `280`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
