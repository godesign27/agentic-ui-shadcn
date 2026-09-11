# Agentic Prompt — AI Top Bar

You are implementing the **AI Top Bar** (`ai-supervisor-bar`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Top Bar (`ai-supervisor-bar`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Page-top agent identity strip · tan · dark · light · uses AIAvatar

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-supervisor-bar/ai-supervisor-bar.agent.json`
4. `components/ai/atomic/ai-supervisor-bar/ai-supervisor-bar.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AISupervisorBar` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `name` (`string`) default ``—`` — Agent display name shown as the primary label.
- `role` (`string`) default ``'Supervisor agent'`` — Inline eyebrow next to the name.
- `stat` (`string`) default ``undefined`` — Second line, e.g. "7 tasks tracked".
- `meta` (`string`) default ``undefined`` — Appended to stat with a `·` separator, e.g. "Updated 2m ago".
- `tone` (`'tan' \) default `'dark' \` — 'light'`
- `avatarSize` (`number`) default ``36`` — AIAvatar pixel size. Bar height auto-adjusts.
- `actions` (`React.ReactNode`) default ``undefined`` — Right-aligned slot for optional controls (chevron / settings / dismiss).
- `onClick` (`() => void`) default ``undefined`` — When set, the bar renders as role="button" with Enter/Space activation.
- `ariaLabel` (`string`) default ```${name}, ${role}``` — Accessible label override.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
