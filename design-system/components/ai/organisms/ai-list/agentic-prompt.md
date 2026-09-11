# Agentic Prompt — AI List

You are implementing the **AI List** (`ai-list`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI List (`ai-list`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Section wrapper for AI-led narrative lists.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-list/ai-list.agent.json`
4. `components/ai/organisms/ai-list/ai-list.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIList` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``required`` — Section heading.
- `icon` (`ReactNode`) default ``undefined`` — Leading icon in the heading row.
- `intro` (`string`) default ``undefined`` — AI briefing paragraph under the heading.
- `items` (`AIListItemProps[]`) default ``required`` — List rows. Each entry is the props object of an AIListItem.
- `layout` (`"stack" \) default `"grid" \` — "compact"`
- `collapsible` (`boolean`) default ``false`` — Enables the collapse toggle.
- `defaultCollapsed` (`boolean`) default ``false`` — Initial collapsed state when collapsible.
- `status` (`AIListStatus`) default ``"default"`` — Section state — default / loading / empty / updating / dataStale / error / noChanges.
- `count` (`number`) default ``items.length`` — Override the count pill value.
- `emptyMessage` (`string`) default ``"No items to show."`` — Custom message for empty state.
- `footerAction` (`{ label: string; onClick?: () => void }`) default ``undefined`` — Ghost link below the items.
- `onItemOpen` (`(item, index) => void`) default ``undefined`` — Fallback handler when an item has no onClick of its own.
- `tone` (`"ai" \) default `"tan" \` — "neutral"`

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
