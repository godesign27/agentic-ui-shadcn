# Agentic Prompt — AI Status Pill

You are implementing the **AI Status Pill** from the ZAIDYN AI Design System mirror.
---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/zsainc/9904PD0068_zds-ai-mirror` |
| **Component** | AI Status Pill (`ai-status-pill`) |
| **Status** | Stable |
| **Category** | AI atom |


_Hand-off prompt for an agent that **can** fetch `github.com/zsainc/9904PD0068_zds-ai-mirror`. For an agent that can't, use the **Copy Component** action instead — it inlines every dependency file._

---

## Hard rules — read before generating any code

1. **Do NOT invent atoms.** Fetch every atom this component imports from the canonical mirror (read order below). Use each one verbatim. If a render comes back wrong, you almost certainly fabricated one instead of fetching it.
2. **AI Avatar = three ZSAI blue circles + white cross-star.** Fixed fills `#B4BDFF` / `#5A6DFF` / `#1F2A66`, white star. **No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.**
3. **Tokens come from `ai-tokens.ts` and `ai-typography.ts`** — use `AI.color.brand`, `var(--ai-card-bg)`, `AI_TYPOGRAPHY['@zsai-section-subtitle']`, etc. Never hardcode brand hex.
4. **Icons** come from `lucide-react` for non-ZAIDYN glyphs and from the ZAIDYN icon font (`<i class="zs-icon zs-icon-{name}" />` inside `.zs-master-style`) when a ZAIDYN equivalent exists. Do not invent icon names.
5. **Toolbar buttons inside `AIInputCard` are `AIDialogButton` instances** — 34px pill/circle, transparent fill, subtle border. Not raw `<button>` elements.
6. **Quick chips are `AIChipQuick`** — pill, periwinkle border, brand-blue label. Not generic neutral buttons.
7. **File layout matters.** Keep the relative imports the source files use.

---

## Component metadata

- **Display name:** AI Status Pill
- **Component id:** `ai-status-pill`
- **Category:** atomic
- **Status:** Beta
- **File path:** `ai/atomic/status-pill/AIStatusPill.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/zsainc/9904PD0068_zds-ai-mirror`
- **File path:** `ai/atomic/status-pill/AIStatusPill.tsx`

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-status-pill/ai-status-pill.agent.json`
4. `components/ai/atomic/ai-status-pill/ai-status-pill.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

---
