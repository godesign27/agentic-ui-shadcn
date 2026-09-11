# Agentic Prompt — AI Memory Chip

You are implementing the **AI Memory Chip** atom from the Guild AI Design System mirror.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/brandnc/implementation source-mirror` |
| **Component** | AI Memory Chip (`ai-chip-memory`) |
| **Status** | Stable |
| **Export** | `AIChipMemory`, `AIMemoryChip` |
| **Canonical path** | `ai/atomic/chip-memory/AIChipMemory.tsx` |

---

## Mandatory read order

1. `components/agent-instructions.md`
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-chip-memory/ai-chip-memory.agent.json`
4. `components/ai/atomic/ai-chip-memory/ai-chip-memory.md`
5. `components/ai/tokens/ai-tokens.ts`
6. `components/ai/tokens/ai-typography.ts`

---

## Critical implementation facts

1. **Non-interactive** — renders as `<span>`, not a button.
2. **MemoryIcon** — bundled 12×12 SVG (chip body + handle + two dot eyes). Color = text token.
3. **VARIANT_CONFIG** — five variants via CSS vars; `memory-removed` uses `#E74C3C` + strikethrough + 0.7 opacity.
4. **Sizes** — `md` uses `@brand-caption-1`; `sm` is 11px with tighter padding.
5. **Radius** — `AI.radius.full` (100px pill).
6. **No emoji** — never substitute 🧠 or Lucide Brain.

---

## State gallery labels

| Variant | Example label |
|---------|---------------|
| using-memory | Q3 strategy brief |
| previous-context | Prior conversation |
| memory-available | Org chart v2 |
| memory-ignored | Old org chart |
| memory-removed | Deprecated brief |

---

## Preview

```
http://127.0.0.1:8780/atoms/ai-chip-memory/ai-chip-memory.preview.html
```

---

## If blocked

Copy canonical `AIChipMemory.tsx` verbatim — do not rewrite `VARIANT_CONFIG` from memory.
