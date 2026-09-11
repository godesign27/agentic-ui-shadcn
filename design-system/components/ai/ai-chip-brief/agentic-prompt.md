# Agentic Prompt — AIChipBrief

You are implementing **AIChipBrief** (`ai:ai-chip-brief`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-chip-brief` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-chip-brief` |
| **Exports** | `AIChipBrief`, `aiChipBriefVariants` |

## What it is for

> Whether an agent task brief is ready to run — and whether a human still has to say yes.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-chip-brief/ai-chip-brief.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-chip-brief/ai-chip-brief.md` — anatomy, tokens, examples
6. `src/components/ai/ai-chip-brief.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never a button.
- waiting-approval must mean a human genuinely has to approve.
- Use ai:ai-queue-badge once it is executing.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**
- **Approval**


## Never

- Interactive use
- Colour-only status
- Generic badging

## Task

Implement using `AIChipBrief` exactly as the contract declares. Use only the props, variants and sizes in `ai-chip-brief.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-chip-brief.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-chip-brief/ai-chip-brief.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-queue-badge` (Execution state) · `ui:badge` (Generic status)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
