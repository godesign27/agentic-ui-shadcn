# Agentic Prompt — AITextLink

You are implementing **AITextLink** (`ai:ai-text-link`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-text-link` |
| **Status** | Beta |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-text-link` |
| **Exports** | `AITextLink` |

## What it is for

> An inline link inside AI prose whose label stands on its own.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-text-link/ai-text-link.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-text-link/ai-text-link.md` — anatomy, tokens, examples
6. `src/components/ai/ai-text-link.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- The label must stand alone — an icon is never the only signal of purpose.
- Always pair disabled with disabledReason.
- Reserve the attention tone for escalation, approval and staleness.
- Use ai:ai-why-this-link for the standard rationale entry.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Rationale disclosure**


## Never

- Icon-only meaning
- Disabled with no reason
- Attention tone for emphasis

## Task

Implement using `AITextLink` exactly as the contract declares. Use only the props, variants and sizes in `ai-text-link.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-text-link.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-text-link/ai-text-link.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-why-this-link` (The standard rationale entry) · `ui:button` (variant="link" for standard links)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
