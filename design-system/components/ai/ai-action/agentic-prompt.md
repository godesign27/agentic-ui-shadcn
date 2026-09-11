# Agentic Prompt — AIAction

You are implementing **AIAction** (`ai:ai-action`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-action` |
| **Status** | Beta |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-action` |
| **Exports** | `AIAction`, `aiActionVariants` |

## What it is for

> The decision point at the end of every AI recommendation. Primary confirms, secondary reviews, tertiary dismisses.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-action/ai-action.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-action/ai-action.md` — anatomy, tokens, examples
6. `src/components/ai/ai-action.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never auto-fire. A human gesture is always required.
- Three visible actions maximum. A fourth belongs in an overflow menu.
- When requiresReview is set, the signal must render before the row — do not reorder it.
- Label with verbs naming the outcome: "Approve territory change", not "OK".
- Pair with ai:ai-confidence-risk-badge and ai:ai-why-this-link so the user can judge before deciding.

### Accountability contract

This component operates at **Suggest / Confirm / Apply / Approve** level. Rendering it obliges you to provide:

- **Attribution**
- **Approval**
- **Audit trail**
- **Rationale disclosure**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Standard product actions that are not AI-generated
- A generic button replacement
- More than three visible actions
- Rendering when no decision is being requested
- Auto-applying on mount

## Task

Implement using `AIAction` exactly as the contract declares. Use only the props, variants and sizes in `ai-action.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-action.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-action/ai-action.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-button` (The individual button) · `ai:ai-confidence-risk-badge` (Show certainty before asking for a decision) · `ai:ai-why-this-link` (Show reasoning before asking for a decision) · `ui:alert-dialog` (Destructive confirmations still need one)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
