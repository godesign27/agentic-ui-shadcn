# Agentic Prompt — AI Avatar

You are implementing the **AI Avatar** atom from the ZAIDYN AI Design System mirror.

Fetch specs and implementation guidance from the GitHub repository below.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Avatar (`ai-avatar`) |
| **Status** | Stable |
| **Category** | AI atom |
| **Variants** | `AIAvatar` (34px) · `BotAvatar` (18px) |

---

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section  
2. `components/ai/llms.txt`  
3. `components/ai/atomic/ai-avatar/ai-avatar.agent.json`  
4. `components/ai/atomic/ai-avatar/ai-avatar.md` — **read「Presentation & theme」and「Canonical implementation」**  
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/color.md`

---

## Critical implementation facts (do not skip)

1. **No orange gradient ring** — Stable spec uses three BRAND blue circles only.  
2. **No `useId()` / no `<linearGradient>`** — presentational SVG only.  
3. **`AIAvatar` and `BotAvatar` use the same SVG** — only default size, drop-shadow, and a11y differ.  
4. **Fixed hex fills** — `#B4BDFF` → `#5A6DFF` → `#1F2A66` → white monogram.  
5. **Do not dark-mode adapt** — same colors on light and dark page chrome.  
6. **Copy the canonical TSX block** from `ai-avatar.md` exactly — do not recreate from memory.

---

## Task

Integrate **AI Avatar** using **`AIAvatar`** and **`BotAvatar`** as documented in the mirror spec.

---

## Props / API

| Prop | Type | Default |
|------|------|---------|
| `size` | `number?` | `34` (`AIAvatar`) / `18` (`BotAvatar`) |

**Accessibility:** `AIAvatar` → `aria-label="ZAIDYN Agent"` · `BotAvatar` → `aria-hidden="true"` when text attributes speaker

---

## When NOT to use

- No orange outer ring  
- No dark-mode color inversion on the rings  
- No generic bot icons  
- No custom sizes without design review  

---

## Deliverable checklist

- [ ] Three concentric circles with exact hex fills from spec  
- [ ] White cross-star path matches canonical `d=` attribute  
- [ ] No gradient, no `useId()`  
- [ ] Looks like doc-site preview on **light background**  
- [ ] Same appearance when placed on dark toolbar/chrome  

---

## If blocked

Re-read `components/ai/atomic/ai-avatar/ai-avatar.md` → **Presentation & theme** and **Canonical implementation**.
