# Agentic Prompt — AIWhyThisLink

You are implementing **AIWhyThisLink** (`ai:ai-why-this-link`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-why-this-link` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-why-this-link` |
| **Exports** | `AIWhyThisLink` |

## What it is for

> Make the reasoning reachable in one interaction.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-why-this-link/ai-why-this-link.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-why-this-link/ai-why-this-link.md` — anatomy, tokens, examples
6. `src/components/ai/ai-why-this-link.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Only render it when real rationale exists behind onClick.
- Move focus into whatever it opens.
- Its presence is what satisfies the Rationale disclosure obligation — do not claim that obligation without it.
- Place it before the decision, not after.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Rationale disclosure**
- **Attribution**


## Never

- Rendering with no rationale behind it
- Opening a panel without moving focus
- Use as a general help link

## Task

Implement using `AIWhyThisLink` exactly as the contract declares. Use only the props, variants and sizes in `ai-why-this-link.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-why-this-link.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-why-this-link/ai-why-this-link.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-confidence-risk-badge` (The number it explains) · `ai:ai-text-link` (General inline AI links)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
