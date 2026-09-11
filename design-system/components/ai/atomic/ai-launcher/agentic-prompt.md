# Agentic Prompt — AI Launcher

You are implementing the **AI Launcher** (`ai-launcher`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Launcher (`ai-launcher`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The default AI entry point on standard SaaS surfaces. Recognizable, confident, never instructional.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-launcher/ai-launcher.agent.json`
4. `components/ai/atomic/ai-launcher/ai-launcher.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AILauncher` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`'avatar-chat' \) default `'avatar-only'`` — `'avatar-chat'`
- `surface` (`'dark' \) default `'light' \` — 'brand'`
- `active` (`boolean`) default ``false`` — Assistant is open — applies the active/open visual state.
- `unread` (`boolean`) default ``false`` — Show the unread updates badge.
- `unreadCount` (`number`) default ``—`` — Optional count rendered inside the badge.
- `loading` (`boolean`) default ``false`` — Replace the avatar with a spinner while the drawer mounts.
- `disabled` (`boolean`) default ``false`` — AI unavailable. Use disabledReason to explain in the tooltip.
- `disabledReason` (`string`) default ``—`` — Tooltip copy shown on the disabled state.
- `highContrast` (`boolean`) default ``false`` — Force the near-black surface on already-dark contexts.
- `tooltipLabel` (`string`) default ``'Open ZAIDYN Agent'`` — Tooltip text.
- `ariaLabel` (`string`) default ``'Open ZAIDYN Agent chat'`` — Accessible label for the button.
- `onClick` (`() => void`) default ``—`` — Open the AI Assisted Side Drawer or Floating Hanging Panel.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
