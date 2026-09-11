# Agentic Prompt — AI Progress

You are implementing the **AI Progress** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Progress (`ai-progress`) |
| **Status** | Draft |
| **Export** | `AIProgress` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-progress/ai-progress.agent.json`
4. `components/ai/atomic/ai-progress/ai-progress.md`
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

---

## Hard rules

1. **Do NOT invent atoms.** Copy canonical `AIProgress.tsx` verbatim.
2. **Tokens** from `ai-tokens.ts` / `ai-typography.ts` — never hardcode brand hex.
3. **Indeterminate** when percent unknown — never fake precision.
4. **Orange fill** only for blocked/escalated — running uses brand gradient (`AI.color.brand` → `AI.color.action.primaryHover`).
5. **Motion** must respect `prefers-reduced-motion: reduce`.

---

## Task

Integrate **AIProgress** per the mirror spec. Copy canonical implementation — do not recreate tokens from memory.

---

## If blocked

Re-read `components/ai/atomic/ai-progress/ai-progress.md` and the bundle source at `src/app/components/ai/atomic/progress/AIProgress.tsx`.
