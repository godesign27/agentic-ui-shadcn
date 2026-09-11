# Agentic Prompt — AIConfidenceRiskBadge

You are implementing **AIConfidenceRiskBadge** (`ai:ai-confidence-risk-badge`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-confidence-risk-badge` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-confidence-risk-badge` |
| **Exports** | `AIConfidenceRiskBadge` |

## What it is for

> State how sure the model is and how much is at stake, before the human decides.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.md` — anatomy, tokens, examples
6. `src/components/ai/ai-confidence-risk-badge.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never render a confidence value the model did not produce. Absent means absent, not high.
- Never map a model probability onto a level without documenting the thresholds.
- Show it before the decision, not after.
- missingSource is a claim about the output, not a UI state — only set it when true.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Confidence signalling**
- **Rationale disclosure**


## Never

- Invented confidence values
- Colour without the text label
- Use as a generic status badge

## Task

Implement using `AIConfidenceRiskBadge` exactly as the contract declares. Use only the props, variants and sizes in `ai-confidence-risk-badge.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-confidence-risk-badge.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-why-this-link` (The reasoning behind the number) · `ai:ai-action` (The decision it informs) · `ui:badge` (Generic status)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
