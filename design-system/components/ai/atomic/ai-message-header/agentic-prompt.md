# Agentic Prompt — AI Message Header

You are implementing the **AI Message Header** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Message Header (`ai-message-header`) |
| **Status** | Stable |
| **Export** | `AIMessageHeader` |
| **Dependency** | `BotAvatar` from `atomic/avatar/AIAvatar.tsx` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-message-header/ai-message-header.agent.json`
4. `components/ai/atomic/ai-message-header/ai-message-header.md`
5. `components/ai/tokens/ai-tokens.ts`
6. `components/ai/tokens/ai-typography.ts`

---

## Critical implementation facts

1. **BotAvatar** — viewBox `0 0 42 42`; fills `#B4BDFF` / `#5A6DFF` / `#1F2A66`; white cross-star path. **No orange ring.**
2. **Sizes** — md: 16px avatar, `@brand-agent-name` (11/600), 10px timestamp · sm: 14px / 10px / 9px.
3. **Layout** — `display:flex`, `gap:7px`, timestamp `marginLeft:auto`.
4. **Colors** — label and timestamp both `var(--ai-neutral-helper)`; font `F`.
5. **Default timestamp** — `"Just now"`; pass `undefined` to hide.

---

## Design reference gallery

| agentLabel | timestamp | size |
|------------|-----------|------|
| AI Analysis | Just now | md |
| AI Response | 2 min ago | md |
| AI Assistant | Just now | md |
| Territory Agent | 2 min ago | sm |

---

## Preview

```
http://127.0.0.1:8780/atoms/ai-message-header/ai-message-header.preview.html
```

---

## If blocked

Copy canonical `AIMessageHeader.tsx` and `BotAvatar` from the bundle verbatim.
