# Agentic Prompt — AI Message Footer

You are implementing the **AI Message Footer** atom from the ZAIDYN AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Message Footer (`ai-message-footer`) |
| **Status** | Stable |
| **Export** | `AIMessageFooter` |
| **Canonical path** | `src/app/components/ai/atomic/message-footer/AIMessageFooter.tsx` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-message-footer/ai-message-footer.agent.json`
4. `components/ai/atomic/ai-message-footer/ai-message-footer.md`
5. `components/ai/tokens/ai-tokens.ts`
6. `components/ai/tokens/ai-typography.ts`

---

## Critical implementation facts

1. **Three inline button components** — `PrimaryButton`, `SecondaryButton`, `GhostButton` (not `AIButton` import).
2. **Primary** — `flex:1`, `minWidth:140px`, gradient + shadow; hover → `AI.color.action.primaryActive`.
3. **Secondary** — outline `var(--ai-btn-outline-border)`, text `var(--ai-neutral-text)`, weight 500.
4. **Ghost** — no border, `NEUTRAL.textDisabled`, weight 400, padding `8px 6px`.
5. **Container** — flex row, gap 8px, padding bottom 10px.
6. **Null render** — `!visible || actions.length === 0`.

---

## Layout gallery (design reference)

| Label | Actions |
|-------|---------|
| Example usage | Confirm & Apply Assignment + Edit |
| Primary only | Primary CTA |
| Primary + Secondary | Primary CTA + Secondary |
| Full set | Primary CTA + Secondary + Cancel |

---

## Preview

```
http://127.0.0.1:8780/atoms/ai-message-footer/ai-message-footer.preview.html
```

---

## If blocked

Copy canonical `AIMessageFooter.tsx` verbatim — do not substitute `AIButton`.
