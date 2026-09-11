# Agentic Prompt — AI Led Navigation

You are implementing the **AI Led Navigation** (`ai-led-navigation`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Led Navigation (`ai-led-navigation`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> The navigation rail for AI Led product shells — inspired by modern AI tools, tuned to Guild enterprise visual language.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-led-navigation/ai-led-navigation.agent.json`
4. `components/ai/organisms/ai-led-navigation/ai-led-navigation.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AILedNavigation` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `brandLabel` (`string`) default ``"Guild AI"`` — Product / system label shown next to the AIAvatar mark.
- `brandIcon` (`ReactNode`) default ``<AIAvatar />`` — Header brand mark. Defaults to the canonical Guild AI Avatar.
- `currentWorkspace` (`{ id: string; label: string; tone?: "ai" \) default `"tan" }`` — `Workspace A`
- `primaryActions` (`AILedNavItem[]`) default ``5 defaults`` — High-frequency AI actions row.
- `workspaceGroups` (`AILedNavGroup[]`) default ``Projects preset`` — Workspace / project sections — each group may contain nested children.
- `pinnedItems` (`AILedNavItem[]`) default ``2 defaults`` — Pinned conversations / agents / artifacts.
- `recentItems` (`AILedNavItem[]`) default ``4 defaults`` — Recent conversations / workstreams / outputs.
- `user` (`{ initials: string; name: string; subtitle: string }`) default ``User Name preset`` — Footer account block.
- `variant` (`"default" \) default `"collapsed" \` — "workspace-focused" \
- `state` (`"default" \) default `"nested-open" \` — "loading-recents" \
- `selectedItemId` (`string`) default ``undefined`` — Active route / item id. Drives aria-current + selected styling.
- `collapsed` (`boolean`) default ``undefined`` — Shortcut for variant="collapsed" — useful when toggling via a parent control.
- `onToggleCollapse` (`() => void`) default ``undefined`` — Fired when the user clicks the collapse / expand button.
- `onItemSelect` (`(item: AILedNavItem) => void`) default ``undefined`` — Fired when any item is activated. Parent typically routes via item.href or item.id.
- `onNewChat` (`() => void`) default ``undefined`` — Convenience handler for the New chat action.
- `onSearch` (`(query: string) => void`) default ``undefined`` — Fired when the user submits the inline search (Enter). Receives the typed query string. Existing callers that ignore the arg remain back-compatible.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
