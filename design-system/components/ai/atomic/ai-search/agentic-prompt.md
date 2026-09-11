# Agentic Prompt — AI Search

You are implementing the **AI Search** (`ai-search`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Search (`ai-search`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The standard Search, themed. Teal becomes AI brand, square corners become rounded, and the field gains a focus ring.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-search/ai-search.agent.json`
4. `components/ai/atomic/ai-search/ai-search.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AISearch` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `AISearch · size` (`'normal' \) default `'small' \` — 'x-small'`
- `AISearch · condensed` (`boolean`) default ``false`` — Icon-only round trigger, exactly height x height. Suppresses the button.
- `AISearch · button` (`boolean`) default ``true`` — Render the solid brand submit button beside the field.
- `AISearch · value` (`string`) default ``''`` — Controlled value. A non-empty value flips the text upright.
- `AISearch · onChange` (`(value: string) => void`) default ``—`` — Fires on every keystroke.
- `AISearch · onSearch` (`(value: string) => void`) default ``—`` — Fires on submit, or on click in the condensed variant.
- `AISearch · busy` (`boolean`) default ``false`` — AI-only. Indeterminate hairline under the field.
- `AISearch · fieldWidth` (`number \) default `'fill'`` — `332`
- `AISearch · disabled` (`boolean`) default ``false`` — Dims to 0.55 and drops the ring.
- `AIDropdownFilter · orientation` (`'horizontal' \) default `'vertical'`` — `'horizontal'`
- `AIDropdownFilter · filterValue / searchValue` (`string`) default ``''`` — The two independently controlled values.
- `AISearchField · leftIcon` (`boolean`) default ``true`` — Show the magnifier. Off on the dropdown select field.
- `AISearchField · caret` (`boolean`) default ``false`` — Show the caret. On for the dropdown select field.
- `AISearchField · asSelect` (`boolean`) default ``false`` — Render a listbox trigger button instead of a text input.
- `AISearchField · focusState` (`boolean`) default ``—`` — Force the focused visual for docs and previews.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
