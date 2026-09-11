# Agentic Prompt — AIIcon

You are implementing **AIIcon** (`ai:ai-icon`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-icon` |
| **Status** | Beta |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-icon` |
| **Exports** | `AIIcon`, `aiIconVariants` |

## What it is for

> A treatment layer over standard icons — not a new icon set.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-icon/ai-icon.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-icon/ai-icon.md` — anatomy, tokens, examples
6. `src/components/ai/ai-icon.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Set either label or decorative on every instance.
- Follow 60-30-10 — treatment="ai" is scarce.
- Motion must track real work.
- Reserve orange-signal for review and escalation.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Neither labelled nor decorative
- Decorative motion
- Overusing the AI treatment

## Task

Implement using `AIIcon` exactly as the contract declares. Use only the props, variants and sizes in `ai-icon.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-icon.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-icon/ai-icon.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-avatar` (Agent identity, not iconography)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
