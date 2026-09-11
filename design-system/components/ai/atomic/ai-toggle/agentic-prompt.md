# Agentic Prompt — AI Toggle

You are implementing the **AI Toggle** (`ai-toggle`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Toggle (`ai-toggle`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Track + thumb switch with high-contrast OFF state. White thumb passes 3:1 contrast against both ON and OFF tracks.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-toggle/ai-toggle.agent.json`
4. `components/ai/atomic/ai-toggle/ai-toggle.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIToggle` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `checked` (`boolean`) default ``—`` — Current on/off state.
- `onChange` (`(next: boolean) => void`) default ``—`` — Fires with the next state on click or Space/Enter.
- `label` (`ReactNode`) default ``—`` — Adjacent label. Omit for icon-only / wrapped usage; provide aria-label instead.
- `labelPlacement` (`"start" \) default `"end" \` — "none"`
- `size` (`"sm" \) default `"md"`` — `"md"`
- `disabled` (`boolean`) default ``false`` — Suppresses interaction + desaturates the track.
- `aria-label` (`string`) default ``—`` — Required when label is omitted.
- `id` (`string`) default ``—`` — When provided, ties the label to the switch via htmlFor.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
