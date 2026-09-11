# Agentic Prompt — AIMessageFooter

You are implementing **AIMessageFooter** (`ai:ai-message-footer`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-message-footer` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-message-footer` |
| **Exports** | `AIMessageFooter` |

## What it is for

> Where the user says yes to what the response offered.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-message-footer/ai-message-footer.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-message-footer/ai-message-footer.md` — anatomy, tokens, examples
6. `src/components/ai/ai-message-footer.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Three actions maximum.
- Use ai:ai-action when the decision needs a review signal.
- Label with verbs.

### Accountability contract

This component operates at **Confirm / Apply** level. Rendering it obliges you to provide:

- **Attribution**
- **Approval**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- More than three actions
- Consequential approval without a review signal

## Task

Implement using `AIMessageFooter` exactly as the contract declares. Use only the props, variants and sizes in `ai-message-footer.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-message-footer.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-message-footer/ai-message-footer.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-action` (Approval decisions) · `ai:ai-feedback-bar` (Sentiment, not actions)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
