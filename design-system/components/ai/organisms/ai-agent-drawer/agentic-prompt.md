# Agentic Prompt — AI Agent Drawer

You are implementing the **AI Agent Drawer** (`ai-agent-drawer`) from the Guild AI Design System.

| | |
|---|---|
| **Component** | AI Agent Drawer (`ai-agent-drawer`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | `components/ai/organisms/ai-agent-drawer/AIAgentDrawer.tsx` |

> Self-contained under `components/ai/` — do **not** require `an external AI UI package`.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/README.md` — self-contained agent contract
3. `components/ai/llms.txt`
4. `components/ai/organisms/ai-agent-drawer/ai-agent-drawer.agent.json`
5. `components/ai/organisms/ai-agent-drawer/ai-agent-drawer.md`
6. `components/ai/tokens/ai-tokens.ts` + `ai-typography.ts` + `css/ai-surface.css`

## Task

Use the co-located `AIAgentDrawer.tsx` and its relative imports. Fetch dependency atoms from their folders under `components/ai/` (avatar, button, dialog, loading indicators, `_support/`). Prefer `AI.color.*` / CSS vars over literal brand hex.

## Props (summary)

- `title`, `greeting`, `quickSuggestions`, `width`
- `variant`: `'default' | 'focused-dialog' | 'hanging-panel'`
- `headerTone`: `'light' | 'dark'`
- `onHistory` / `onClose` / `onMoreOptions`

## Hard rules

- AI Avatar = three AI_RAMP blues + white cross-star. No orange ring.
- Load `components/ai/tokens/css/ai-surface.css` so `--ai-*` surface vars resolve.
- Quick chips = `AIButton` `variant="secondary"`.
- Do not invent atoms — copy from sibling folders in `components/ai/`.
