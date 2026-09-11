# Agentic Prompt — AI Dialog Button

You are implementing the **AI Dialog Button** atom from the ZAIDYN AI Design System mirror.

Fetch specs and implementation guidance from the GitHub repository below.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Dialog Button (`ai-dialog-button`) |
| **Status** | Stable |
| **Category** | AI atom |
| **Surface** | Ghost (default) |
| **Shapes** | Icon-only · Icon + label · Label + trailing icon |

---

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section  
2. `components/ai/llms.txt`  
3. `components/ai/atomic/ai-dialog-button/ai-dialog-button.agent.json`  
4. `components/ai/atomic/ai-dialog-button/ai-dialog-button.md` — **read「Ghost surface」and「Canonical implementation」**  
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/color.md`

---

## Critical implementation facts (do not skip)

1. **Ghost is the default surface** — transparent fill, `rgba(26,22,40,0.14)` border, 34px height, 100px radius.  
2. **Three shapes, one primitive** — `AIDialogButton` adapts to circle (icon-only) or pill (labeled).  
3. **Do not use for Send** — gradient Send is a separate pattern in `ai-dialog`.  
4. **`isOpen`** — pass dropdown open state for Agent/Skills triggers.  
5. **Icon-only needs `aria-label`** — Add, Mic buttons.  
6. **Copy canonical TSX** from `ai-dialog-button.md` exactly.

---

## Task

Integrate **AIDialogButton** (Ghost) for AI Dialog toolbar: Add (`+`), Skills (`/ Skills`), Agent (chevron), Mic.

---

## Props / API

| Prop | Type | Default |
|------|------|---------|
| `icon` | `React.ReactNode` | — |
| `label` | `string` | — |
| `trailingIcon` | `React.ReactNode` | — |
| `isOpen` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `onClick` | `() => void` | — |
| `aria-label` | `string` | — |

---

## When NOT to use

- Gradient Send CTA  
- Navigation links  
- Plain unstyled toolbar icons in AI Dialog  

---

## Deliverable checklist

- [ ] 34px height, 100px radius on all variants  
- [ ] Ghost resting: transparent + subtle border  
- [ ] Hover: `#D2D6FF` border, `#F5F6FF` fill  
- [ ] Open: `#96A4FF` border, `#E6E9FF` fill  
- [ ] Skills uses monospace `/` leading icon  
- [ ] Agent uses chevron with `isOpen` rotation  

---

## If blocked

Re-read `components/ai/atomic/ai-dialog-button/ai-dialog-button.md` → **Ghost surface** and **Canonical implementation**.
