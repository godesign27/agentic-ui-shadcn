# Agentic Prompt — AIControlBar

You are implementing **AIControlBar** (`ai:ai-control-bar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-control-bar` |
| **Status** | Stable |
| **Tier / Category** | molecules · AI |
| **Import** | `@/components/ai/ai-control-bar` |
| **Exports** | `AIControlBar` |

## What it is for

> The human can always stop the machine.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-control-bar/ai-control-bar.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-control-bar/ai-control-bar.md` — anatomy, tokens, examples
6. `src/components/ai/ai-control-bar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Wire every handler to the real agent. A pause that does not pause is worse than none.
- Keep cancel two-step.
- Pair with ai:ai-progress so the user knows what they are pausing.
- This is what makes AI Led mode acceptable — do not ship AI Led without it.

### Accountability contract

This component operates at **Confirm / Apply** level. Rendering it obliges you to provide:

- **Attribution**
- **Approval**
- **Audit trail**
- **Reversibility**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Unwired controls
- Single-click cancel
- Use as a generic toolbar

## Task

Implement using `AIControlBar` exactly as the contract declares. Use only the props, variants and sizes in `ai-control-bar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-control-bar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-control-bar/ai-control-bar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-progress` (What is being controlled) · `ai:ai-queue-badge` (Per-item state)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
