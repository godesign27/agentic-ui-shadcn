# Agentic Prompt — AI Dialog

You are implementing the **AI Dialog** group from the Guild AI Design System mirror.

Fetch specs and implementation guidance from the GitHub repository below.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Dialog (`ai-dialog`) |
| **Status** | Stable |
| **Category** | AI group |
| **Variants** | `AIInputCard` (full card) · `AIDialogSlim` (slim pill) |

---

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section  
2. `components/ai/llms.txt`  
3. `components/ai/atomic/ai-dialog-button/ai-dialog-button.md` — Ghost toolbar buttons  
4. `components/ai/organisms/ai-dialog/ai-dialog.agent.json`  
5. `components/ai/organisms/ai-dialog/ai-dialog.md` — **read「Border state machine」and「Canonical implementation」**  
6. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/color.md`

---

## Critical implementation facts (do not skip)

1. **Two variants** — `AIInputCard` (full card with toolbar) and `AIDialogSlim` (56px pill).  
2. **Border state machine** — empty → focused → filled; use `ai-input.border.*` tokens exactly.  
3. **Do not strip affordances** — Add, Mode, and Mic controls require design review to remove.  
4. **`chatMode=true`** — only for pinned bottom composer in active conversation (smaller radius).  
5. **Not a search input** — has AI-specific skills, mode, and mic affordances.  
6. **Built-in menus** — Add, Skills (`SkillMenu`), Mode (`Agent`/`Plan`/`Ask` with checkmark).
7. **Send uses `ArrowRight`** — circular 32px; not paper-plane / kite icon.

---

## Task

Integrate **AI Dialog** using **`AIInputCard`** and/or **`AIDialogSlim`** as documented in the mirror spec.

---

## Props / API

| Prop | Type | Default |
|------|------|---------|
| `onSend` | `(text: string) => void` | — |
| `chatMode` | `boolean?` | `false` |

---

## When to use

- Primary message entry in AI Command Center (idle and chat mode)
- `chatMode=true` for pinned bottom variant in active conversation
- `AIDialogSlim` in panels and compact surfaces

## When NOT to use

- Generic search input
- Stripping Add or Mode controls without design review
- Standard Field replacement

---

## Deliverable checklist

- [ ] Border state machine: empty → focused → filled with correct token values  
- [ ] Send button: muted when empty, gradient when filled  
- [ ] `chatMode` reduces border-radius to `AI.radius.md`  
- [ ] Toolbar: Ghost AIDialogButton for Add, `/ Skills`, Agent chevron, Mic  
- [ ] Send button: circular with `ArrowRight` (not paper-plane)  
- [ ] Add menu: paperclip · folder+ · lightning icons; chevrons on project + skills rows  
- [ ] Add / Skills / Mode menus open above toolbar with outside-click close  
- [ ] Slim pill: 56px height, combined Add/Mode menu, Mic/Send toggle  

---

## If blocked

Re-read `components/ai/organisms/ai-dialog/ai-dialog.md` → **Border state machine** and **Canonical implementation**.
