# Agentic Prompt — AIQueueBadge

You are implementing **AIQueueBadge** (`ai:ai-queue-badge`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-queue-badge` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-queue-badge` |
| **Exports** | `AIQueueBadge` |

## What it is for

> The state of one item in an agent queue, readable at a glance.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-queue-badge/ai-queue-badge.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-queue-badge/ai-queue-badge.md` — anatomy, tokens, examples
6. `src/components/ai/ai-queue-badge.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never a button — pair it with a real control.
- needs-approval must mean a human genuinely has to act.
- Use ui:badge for non-AI status.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Audit trail**


## Never

- Use as an interactive control
- Generic status
- Colour-only status

## Task

Implement using `AIQueueBadge` exactly as the contract declares. Use only the props, variants and sizes in `ai-queue-badge.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-queue-badge.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-queue-badge/ai-queue-badge.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:badge` (Generic status) · `ai:ai-chip-brief` (Task brief readiness) · `ai:ai-progress` (Overall progress)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
