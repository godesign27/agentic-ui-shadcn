# Agentic Prompt — AIDialogButton

You are implementing **AIDialogButton** (`ai:ai-dialog-button`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-dialog-button` |
| **Status** | Stable |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-dialog-button` |
| **Exports** | `AIDialogButton` |

## What it is for

> A quiet control in the composer toolbar that does not compete with the message.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-dialog-button/ai-dialog-button.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-dialog-button/ai-dialog-button.md` — anatomy, tokens, examples
6. `src/components/ai/ai-dialog-button.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Icon-only requires aria-label.
- Set isOpen when it owns an open menu.
- Use ai:ai-button for anything primary.
- Pair icon-only controls with ui:tooltip.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**

**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.

## Never

- Icon-only with no accessible name
- Primary actions
- Use outside a composer

## Task

Implement using `AIDialogButton` exactly as the contract declares. Use only the props, variants and sizes in `ai-dialog-button.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-dialog-button.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-dialog-button/ai-dialog-button.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ai:ai-button` (Primary AI actions) · `ui:tooltip` (Naming icon-only controls) · `ui:dropdown-menu` (What a trailing chevron opens)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
