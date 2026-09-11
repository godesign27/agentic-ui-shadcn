# Agentic Prompt — AI Popup Menu

You are implementing the **AI Popup Menu** (`ai-popup-menu`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Popup Menu (`ai-popup-menu`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> A trigger + hidden AIMenu overlay — AI dialog chrome, opens on click, closes on outside-click / Escape.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-popup-menu/ai-popup-menu.agent.json`
4. `components/ai/molecules/ai-popup-menu/ai-popup-menu.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIMenu` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `trigger` (`ReactNode \) default `(open: boolean) => ReactNode`` — `—`
- `triggerLabel` (`string`) default ``'Open menu'`` — Accessible label for the trigger button.
- `items` (`AIMenuItem[]`) default ``[]`` — Passed through to the embedded AIMenu.
- `align` (`'left' \) default `'right'`` — `'left'`
- `multiSelect` (`boolean`) default ``false`` — Multi-select menu mode (checkmarks).
- `closeOnSelect` (`boolean`) default ``true`` — Close after a pick — ignored in multiSelect.
- `onSelect` (`(item: AIMenuItem) => void`) default ``—`` — Fires when a non-disabled item is activated.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
