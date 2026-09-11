# Agentic Prompt — AI Quick Chips

You are implementing the **AI Quick Chips** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Quick Chips (`ai-chip-quick`) |
| **Status** | Stable |
| **Export** | `AIChipQuick`, `QUICK_ACTIONS`, `AIQuickChip` |
| **Canonical path** | `ai/atomic/chip-quick/AIChipQuick.tsx` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-chip-quick/ai-chip-quick.agent.json`
4. `components/ai/atomic/ai-chip-quick/ai-chip-quick.md`
5. `components/ai/tokens/ai-tokens.ts`
6. `components/ai/tokens/ai-typography.ts`

---

## Critical implementation facts

1. **Single chip atom** — `AIChipQuick`; parent maps `QUICK_ACTIONS` (8 items max).
2. **Standard chip** — white bg, 1.5px border, `AI.radius.full`; hover → `--ai-chip-bg-hover`, `AI.color.border.strong`, primary icon/label.
3. **Special chip** (`isSpecial`) — "All Prompts"; resting periwinkle border + brand label; hover → `AI.gradient.action.full` + shadow.
4. **Typography** — `AI_TYPOGRAPHY['@brand-body-small']` (14px); Lucide icons at 13px, `strokeWidth={2}`.
5. **CSS vars** — `--ai-chip-bg`, `--ai-chip-bg-hover`, `--ai-chip-border`, `--ai-neutral-text`, `--ai-neutral-icon`.
6. **Idle only** — parent hides chips when conversation starts; do not render after first message.

---

## QUICK_ACTIONS labels (canonical)

Create a scenario · Territory balance · Generate call plan · Vacancy management · Analyze team health · Roster management · KPI trend · **All Prompts** (special)

---

## Preview

```
http://127.0.0.1:8780/atoms/ai-chip-quick/ai-chip-quick.preview.html
```

---

## If blocked

Re-read `components/ai/atomic/ai-chip-quick/ai-chip-quick.md` and copy canonical `AIChipQuick.tsx` verbatim.
