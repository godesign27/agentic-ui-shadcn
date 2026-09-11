# Agentic Prompt — AI Button

You are implementing the **AI Button** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Button (`ai-button`) |
| **Status** | Stable |
| **Export** | `AIButton`, `AIAction` |
| **Canonical path** | `ai/atomic/button/AIButton.tsx` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-button/ai-button.agent.json`
4. `components/ai/atomic/ai-button/ai-button.md`
5. `components/ai/tokens/ai-tokens.ts`
6. `components/ai/tokens/ai-typography.ts`

---

## Critical implementation facts

1. **Primary** — `AI.gradient.action.full` at rest; shadow `0 2px 8px AI.shadow.action.default`; hover/active/loading/complete → `AI.color.action.primaryActive` (#3F50C7).
2. **Status (primary only)** — `loading` (spinner 12/14px), `complete` (check, ~1.5s revert), `error` (#C0392B Retry). `minWidth` per size prevents reflow.
3. **Secondary** — `NEUTRAL.border` outline, weight 500; hover `AI.color.surface.default`; CSS vars `--ai-neutral-text`, `--ai-btn-disabled-*`.
4. **Tertiary** — no border; weight 400; `--ai-neutral-helper` → `--ai-neutral-text` on hover.
5. **SIZE_MAP** — sm 32px/11px/80px min · md 40px/12px/120px · lg 48px/13px/160px.
6. **Ghost removed** — toolbar triggers use `AIDialogButton`.
7. **AIAction** — composed row in same file; optional "Requires review" pill with Signal orange signal tokens.

---

## State variations to render

| Group | States |
|-------|--------|
| Variants | primary · secondary · tertiary |
| Sizes | sm · md · lg |
| Status | default · loading · complete · error |
| Disabled | all three variants inert |

---

## Preview

```
http://127.0.0.1:8780/atoms/ai-button/ai-button.preview.html
```

---

## If blocked

Re-read `components/ai/atomic/ai-button/ai-button.md` and copy canonical `AIButton.tsx` verbatim from the bundle — do not invent styling.
