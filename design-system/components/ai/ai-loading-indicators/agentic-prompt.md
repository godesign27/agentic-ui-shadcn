# Agentic Prompt — AILoadingIndicator

You are implementing **AILoadingIndicator** (`ai:ai-loading-indicators`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-loading-indicators` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-loading-indicators` |
| **Exports** | `AILoadingIndicator` |

## What it is for

> Say that the machine is working, truthfully.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-loading-indicators/ai-loading-indicators.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-loading-indicators/ai-loading-indicators.md` — anatomy, tokens, examples
6. `src/components/ai/ai-loading-indicators.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Must track real in-flight work. Never animate to simulate effort.
- Announce the outcome when it unmounts.
- Use ai:ai-progress when the total is known.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Simulated thinking time
- Animation with no status text
- Use for content loading

## Task

Implement using `AILoadingIndicator` exactly as the contract declares. Use only the props, variants and sizes in `ai-loading-indicators.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-loading-indicators.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-loading-indicators/ai-loading-indicators.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-progress` (Determinate agentic work) · `ui:skeleton` (Content loading)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
