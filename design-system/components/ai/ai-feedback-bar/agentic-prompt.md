# Agentic Prompt — AIFeedbackBar

You are implementing **AIFeedbackBar** (`ai:ai-feedback-bar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-feedback-bar` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-feedback-bar` |
| **Exports** | `AIFeedbackBar` |

## What it is for

> Let the human correct the record.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-feedback-bar/ai-feedback-bar.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-feedback-bar/ai-feedback-bar.md` — anatomy, tokens, examples
6. `src/components/ai/ai-feedback-bar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Wire the handlers to something real.
- One bar per response.
- Reflect the stored sentiment through the sentiment prop so it survives a re-render.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Feedback that is discarded
- Multiple bars per response
- Removing the accessible names

## Task

Implement using `AIFeedbackBar` exactly as the contract declares. Use only the props, variants and sizes in `ai-feedback-bar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-feedback-bar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-feedback-bar/ai-feedback-bar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-message-footer` (Actions rather than sentiment)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
