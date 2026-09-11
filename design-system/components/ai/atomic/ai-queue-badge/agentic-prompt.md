# Agentic Prompt — AI Queue Badge

You are implementing the **AI Queue Badge** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Queue Badge (`ai-queue-badge`) |
| **Status** | Stable |
| **Export** | `AIQueueBadge` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-queue-badge/ai-queue-badge.agent.json`
4. `components/ai/atomic/ai-queue-badge/ai-queue-badge.md`
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

---

## Hard rules

1. **Do NOT invent atoms.** Copy canonical `AIQueueBadge.tsx` verbatim.
2. **Tokens** from `ai-tokens.ts` / `ai-typography.ts` — never hardcode brand hex.
3. **Five states only:** `queued`, `running`, `blocked`, `needs-approval`, `complete`.
4. **Spinner** uses `AI.color.brand` + `AI.color.brandBorder`; `ai-queue-spin` at 0.9s linear.
5. **Count pill** uses `AI_TYPOGRAPHY['@brand-numeric-badge']`.

---

## Task

Integrate **AIQueueBadge** per the mirror spec. Copy canonical implementation — do not recreate tokens from memory.

---

## If blocked

Re-read `components/ai/atomic/ai-queue-badge/ai-queue-badge.md` and the bundle source at `ai/atomic/queue-badge/AIQueueBadge.tsx`.
