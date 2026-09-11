# Agentic Prompt — AILauncher

You are implementing **AILauncher** (`ai:ai-launcher`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-launcher` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-launcher` |
| **Exports** | `AILauncher` |

## What it is for

> The way in. Recognisable, confident, never instructional.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-launcher/ai-launcher.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-launcher/ai-launcher.md` — anatomy, tokens, examples
6. `src/components/ai/ai-launcher.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- One per surface.
- Always give disabledReason when disabling.
- Keep the label plain — "Chat", not "Ask me anything!"
- Wire aria-expanded to the real drawer state.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Multiple launchers on one surface
- Disabled with no reason
- Instructional or chatty labels

## Task

Implement using `AILauncher` exactly as the contract declares. Use only the props, variants and sizes in `ai-launcher.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-launcher.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-launcher/ai-launcher.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:sheet` (The drawer it usually opens) · `ai:ai-avatar` (The mark it uses)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
