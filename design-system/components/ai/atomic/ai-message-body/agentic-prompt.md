# Agentic Prompt — AI Text Response

You are implementing the **AI Text Response** atom from the ZAIDYN AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Text Response (`ai-message-body`) |
| **Status** | Stable |
| **Export** | `AIMessageBody` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-message-body/ai-message-body.agent.json`
4. `components/ai/atomic/ai-message-body/ai-message-body.md`
5. `components/ai/tokens/ai-tokens.ts`
6. `components/ai/tokens/ai-typography.ts`

---

## Task

Integrate **AIMessageBody** per the mirror spec. Copy canonical implementation — do not recreate tokens from memory.

### Canonical implementation rules

- Single `<p>` element — `margin: 0`, children as plain prose
- Typography via `AI_TYPOGRAPHY['@brand-bubble-body']`:
  - **md (default):** 16px / 400 / 1.55 line-height / −0.1px letter-spacing
  - **sm:** bubble-body with `fontSize: 14`
  - **lg:** bubble-body with `fontSize: 18`
- Font: `F` from `ai-tokens.ts` (`"Open Sans", sans-serif`)
- Color: `var(--ai-neutral-text)` — never hardcode brand hex
- No bold, no headings inside this atom

### State variations (preview content)

1. **Standard** — Q2 territory coverage paragraph
2. **Short answer** — "Coverage is at 74%. Northeast is your biggest gap."
3. **Multi-sentence analysis** — Pacific region overload analysis (single prose block)

---

## Preview

Open `components/ai/atomic/ai-message-body/ai-message-body.preview.html` via the preview server:

```
http://127.0.0.1:8780/atoms/ai-message-body/ai-message-body.preview.html
```

---

## If blocked

Re-read `components/ai/atomic/ai-message-body/ai-message-body.md` and the bundle source at `src/app/components/ai/atomic/message-body/AIMessageBody.tsx`.
