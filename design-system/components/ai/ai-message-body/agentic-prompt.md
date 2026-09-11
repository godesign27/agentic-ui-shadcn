# Agentic Prompt — AIMessageBody

You are implementing **AIMessageBody** (`ai:ai-message-body`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-message-body` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-message-body` |
| **Exports** | `AIMessageBody`, `aiMessageBodyVariants` |

## What it is for

> AI prose, kept plain so the interface does not lend it authority the model has not earned.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-message-body/ai-message-body.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-message-body/ai-message-body.md` — anatomy, tokens, examples
6. `src/components/ai/ai-message-body.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always preceded by ai:ai-message-header.
- Set streaming only while text is arriving, and announce completion.
- Keep formatting plain.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Human-authored content
- A body with no header
- Simulated typing delay on already-complete text

## Task

Implement using `AIMessageBody` exactly as the contract declares. Use only the props, variants and sizes in `ai-message-body.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-message-body.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-message-body/ai-message-body.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-message-header` (Required above it) · `ai:ai-message-footer` (Actions below it)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
