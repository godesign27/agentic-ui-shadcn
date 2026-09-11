# Agentic Prompt — AI Handoff Chip

You are implementing the **AI Handoff Chip** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Handoff Chip (`ai-chip-handoff`) |
| **Status** | Stable |
| **Export** | `AIChipHandoff` (alias: `AIHandoffChip`) |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.agent.json`
4. `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.md`
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

---

## Hard rules

1. **Do NOT invent atoms.** Copy canonical `AIChipHandoff.tsx` verbatim.
2. **Five directions only:** `agent-to-agent`, `agent-to-human`, `human-to-agent`, `system-to-agent`, `failed`.
3. **Entity glyphs:** ⬡ agent, ◉ human, ⊞ system — not avatars or emoji.
4. **Failed arrow** must be dashed SVG — not text `→` or emoji.
5. **Tokens** from `ai-tokens.ts` — never hardcode brand hex for agent-to-agent.

---

## Task

Integrate **AIChipHandoff** per the mirror spec. Copy canonical implementation — do not recreate tokens from memory.

---

## If blocked

Re-read `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.md` and the bundle source at `ai/atomic/chip-handoff/AIChipHandoff.tsx`.
