# Agentic Prompt — AIDialogSlim

You are implementing **AIDialogSlim** (`ai:ai-dialog`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-dialog` |
| **Status** | Stable |
| **Tier / Category** | groups · AI |
| **Import** | `@/components/ai/ai-dialog` |
| **Exports** | `AIDialogSlim`, `AIInputCard` |

## What it is for

> Where the human writes to the machine.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-dialog/ai-dialog.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-dialog/ai-dialog.md` — anatomy, tokens, examples
6. `src/components/ai/ai-dialog.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- One composer per surface.
- Never invert Enter and Shift+Enter.
- Disable submit while busy; do not hide it.
- Put ai:ai-dialog-button controls in the toolbar slot and ai:ai-chip-quick in suggestions.
- Composing is not sending — the human still presses submit.

### Structure is not optional

```
AIInputCard
```

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Multiple composers on one surface
- Hiding the submit control
- Inverting the Enter convention
- Use as a general text input

## Task

Implement using `AIDialogSlim` exactly as the contract declares. Use only the props, variants and sizes in `ai-dialog.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-dialog.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-dialog/ai-dialog.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-dialog-button` (Built for the toolbar slot) · `ai:ai-chip-quick` (Built for the suggestions slot) · `ui:textarea` (Non-AI multi-line input)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
