# Agentic Prompt — AIButton

You are implementing **AIButton** (`ai:ai-button`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-button` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-button` |
| **Exports** | `AIButton`, `aiButtonVariants` |

## What it is for

> Commit to something a machine proposed.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-button/ai-button.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-button/ai-button.md` — anatomy, tokens, examples
6. `src/components/ai/ai-button.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Only for actions originating from AI output. Standard actions use ui:button.
- status must track real work — never animate loading to simulate effort.
- Change the label with the status; the icon alone is not announced.
- On error, say what failed and what the user can do next.

### Accountability contract

This component operates at **Confirm / Apply** level. Rendering it obliges you to provide:

- **Attribution**
- **Approval**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Use on standard product actions
- Simulated loading
- Error state with no explanation

## Task

Implement using `AIButton` exactly as the contract declares. Use only the props, variants and sizes in `ai-button.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-button.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-button/ai-button.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:button` (Standard actions) · `ai:ai-action` (The full decision row)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
