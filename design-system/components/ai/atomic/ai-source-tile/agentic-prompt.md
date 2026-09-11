# Agentic Prompt — AI Source Tile

You are implementing the **AI Source Tile** (`ai-source-tile`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Source Tile (`ai-source-tile`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Tinted icon square + bold title + uppercase source caption — for knowledge inputs, citations, attached files.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-source-tile/ai-source-tile.agent.json`
4. `components/ai/atomic/ai-source-tile/ai-source-tile.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AISourceTile` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`ReactNode`) default ``—`` — Source name (bold).
- `source` (`string`) default ``—`` — Uppercase caption shown beneath the title.
- `iconName` (`string`) default ``"zs-icon-layers"`` — ZAIDYN icon class for the leading tile.
- `tone` (`"ai" \) default `"warning" \` — "error" \
- `trailing` (`ReactNode`) default ``—`` — Optional small right-aligned meta.
- `chevron` (`boolean`) default ``false`` — Show a right-facing chevron affordance. Auto-true when onClick is provided. Suppressed when rank is set.
- `subtitle` (`ReactNode`) default ``—`` — Second line under the title (mixed-case body-compact). Wins over `source` when both are set.
- `rank` (`number \) default `string`` — `—`
- `selectable` (`boolean`) default ``false`` — Turn the leading icon square into a checkbox tile. Combine with `selected` + `onSelect` for multi-select behavior.
- `selected` (`boolean`) default ``false`` — Selectable-only. Selected rows carry a brand-tinted background + border.
- `onSelect` (`(next: boolean) => void`) default ``—`` — Selectable-only. Row becomes role="checkbox" with Space/Enter toggling.
- `onClick` (`() => void`) default ``—`` — When set, the tile becomes a clickable button and auto-enables the chevron + hover state.
- `ariaLabel` (`string`) default ``—`` — Override the auto-derived aria-label.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
