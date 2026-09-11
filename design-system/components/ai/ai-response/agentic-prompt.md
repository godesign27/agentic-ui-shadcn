# Agentic Prompt — AIResponse

You are implementing **AIResponse** (`ai:ai-response`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-response` |
| **Status** | Stable |
| **Tier / Category** | groups · AI |
| **Import** | `@/components/ai/ai-response` |
| **Exports** | `AIResponse` |

## What it is for

> One AI turn, assembled so attribution, progress and recourse are present by construction.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-response/ai-response.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-response/ai-response.md` — anatomy, tokens, examples
6. `src/components/ai/ai-response.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Prefer this over hand-assembling the parts — the order is the safety property.
- Set streaming only while text is arriving.
- Use bare only where the containing thread already marks AI authorship.
- Set showFeedback false only when feedback genuinely has nowhere to go.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Rationale disclosure**


## Never

- Human messages
- Reordering the parts
- Consequential approvals

## Task

Implement using `AIResponse` exactly as the contract declares. Use only the props, variants and sizes in `ai-response.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-response.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-response/ai-response.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-approval-card` (Consequential decisions) · `ai:ai-message-header` (The parts, used directly)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
