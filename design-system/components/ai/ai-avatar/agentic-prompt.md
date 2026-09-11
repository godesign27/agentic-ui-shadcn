# Agentic Prompt — AIAvatar

You are implementing **AIAvatar** (`ai:ai-avatar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-avatar` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-avatar` |
| **Exports** | `AIAvatar`, `BotAvatar` |

## What it is for

> The mark that tells a user a machine is speaking.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-avatar/ai-avatar.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-avatar/ai-avatar.md` — anatomy, tokens, examples
6. `src/components/ai/ai-avatar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- The palette is fixed. No currentColor, no dark: variants, no theme tokens, no gradient ring.
- Both exports share the same artwork — only size and glow differ.
- Label it when it stands alone; leave it aria-hidden beside a visible agent name.
- Never use it for a human user.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Recolouring the rings
- Adding a gradient or orange ring
- Using it as a human avatar
- Decorative use on non-AI surfaces

## Task

Implement using `AIAvatar` exactly as the contract declares. Use only the props, variants and sizes in `ai-avatar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-avatar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-avatar/ai-avatar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:avatar` (Human users) · `ai:ai-message-header` (The usual host) · `ai:ai-agent-stack` (Several agents at once)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
