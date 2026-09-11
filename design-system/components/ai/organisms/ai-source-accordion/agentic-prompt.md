# Agentic Prompt — AI Source Accordion

You are implementing the **AI Source Accordion** (`ai-source-accordion`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Source Accordion (`ai-source-accordion`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Collapsible question-scoped multi-select. Stacks selectable AISourceTile rows under a header with a live "N selected" pill; optional free-text row + Continue CTA.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-source-accordion/ai-source-accordion.agent.json`
4. `components/ai/organisms/ai-source-accordion/ai-source-accordion.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AISourceAccordion` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `` (`ReactNode`) default ```` — Header label — the decision prompt this accordion scopes.
- `` (`AISourceAccordionOption[]`) default ```` — Rows to render. Each option supports title, subtitle, rank, tone, disabled.
- `` (`string[]`) default ```` — Controlled selection — pair with onChange.
- `` (`(ids: string[]) => void`) default ```` — Fires whenever selection changes (controlled or uncontrolled).
- `` (`string[]`) default ```` — Uncontrolled default selection. Defaults to [].
- `` (`boolean`) default ```` — Renders a dashed-tile free-text row below the last option.
- `` (`string`) default ```` — Placeholder for the free-text input. Defaults to "Or type…".
- `` (`(value: string) => void`) default ```` — Fires when the user submits the free-text row.
- `` (`string`) default ```` — Continue CTA label. Renders only when paired with onSubmit.
- `` (`(selectedIds: string[]) => void`) default ```` — CTA click handler — receives the current selection.
- `` (`boolean`) default ```` — Initial open state. Defaults to true.
- `` (`boolean`) default ```` — Suppresses toggling + CTA + input.
- `` (`AISourceTileTone`) default ```` — Applied to rows that don't set their own tone. Defaults to "ai".

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
