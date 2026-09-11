# Agentic Prompt — AIApprovalCard

You are implementing **AIApprovalCard** (`ai:ai-approval-card`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-approval-card` |
| **Status** | Beta |
| **Tier / Category** | groups · AI |
| **Import** | `@/components/ai/ai-approval-card` |
| **Exports** | `AIApprovalCard` |

## What it is for

> A consequential proposal, and the human decision about it, in an order that cannot be got wrong.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-approval-card/ai-approval-card.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-approval-card/ai-approval-card.md` — anatomy, tokens, examples
6. `src/components/ai/ai-approval-card.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never auto-fire. There is no prop for it, and there must not be.
- Omit confidence when the model produced none — never pass a guess.
- Wire onWhyThis to real reasoning, or omit it.
- Set requiresReview for anything consequential.
- On failure, always supply errorMessage saying what to do next.

### Accountability contract

This component operates at **Confirm / Apply / Approve** level. Rendering it obliges you to provide:

- **Attribution**
- **Rationale disclosure**
- **Confidence signalling**
- **Approval**
- **Audit trail**
- **Reversibility**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Auto-applying on mount
- Invented confidence values
- A rationale link with nothing behind it
- An error state with no explanation
- Use for informational responses

## Task

Implement using `AIApprovalCard` exactly as the contract declares. Use only the props, variants and sizes in `ai-approval-card.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-approval-card.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-approval-card/ai-approval-card.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-response` (Informational turns) · `ai:ai-action` (The decision row alone) · `ui:alert-dialog` (Final confirmation for destructive actions)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
