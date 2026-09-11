# Agentic Prompt — AI Menu

You are implementing the **AI Menu** (`ai-menu`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Menu (`ai-menu`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> A vertical AI-action list — 12px radius, --ai-card-bg surface, brand border, @zsai-menu-item type, AI active/selected accents.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-menu/ai-menu.agent.json`
4. `components/ai/molecules/ai-menu/ai-menu.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIMenu` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `items` (`AIMenuItem[]`) default ``[]`` — Rows. Each item: { type?, label?, icon?, disabled?, active?, selected?, children?, onClick? }.
- `size` (`'normal' \) default `'small' \` — 'x-small'`
- `multiSelect` (`boolean`) default ``false`` — Rows become role="menuitemcheckbox" with a leading checkmark.
- `onSelect` (`(item: AIMenuItem) => void`) default ``—`` — Fires when a non-disabled item is activated.
- `embedded` (`boolean`) default ``false`` — Skip the standalone border/shadow (used inside a popup overlay).
- `'aria-label'` (`string`) default ``'Menu'`` — Accessible name for the menu container.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
