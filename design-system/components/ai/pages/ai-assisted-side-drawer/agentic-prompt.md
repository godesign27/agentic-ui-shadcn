# Agentic Prompt — AI Assisted Side Drawer

You are implementing the **AI Assisted Side Drawer** (`ai-assisted-side-drawer`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Assisted Side Drawer (`ai-assisted-side-drawer`) |
| **Status** | Stable |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> Contextual AI assistant panel that augments the primary workspace without replacing it. Surfaces suggestions, summaries, and explanations inline.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-assisted-side-drawer/ai-assisted-side-drawer.agent.json`
4. `components/ai/pages/ai-assisted-side-drawer/ai-assisted-side-drawer.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAssistedSideDrawer` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`"default" \) default `"focused-dialog" \` — "hanging-panel"`
- `chat` (`ChatState`) default ``required`` — Lifted chat state shared across variants — switching variants preserves the conversation.
- `initialWidth` (`number`) default ``380`` — Default drawer width in px. Honored by "default" and "focused-dialog" (docked shell only).
- `onDock` (`() => void`) default ``—`` — "hanging-panel" only: called when the dock icon is clicked — caller flips variant to "default".
- `onUndock` (`() => void`) default ``—`` — Docked variants: called when the user lifts the drawer off the edge — caller flips variant to "hanging-panel".
- `onClose` (`() => void`) default ``—`` — Hides the panel without clearing conversation state. Closing the hanging panel resets it to the floating layout so the next open is always hanging.
- `aria-label (dock btn)` (`"Dock as side drawer"`) default ``required`` — Accessible label on the RiSideBarLine dock icon button (hanging-panel variant).

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
