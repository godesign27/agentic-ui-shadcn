# AI Memory Chip

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiChipMemory`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI memory surfaces, conversation context rows — see `components/ai/llms.txt`  

## Purpose

Inline label indicating the AI is drawing on remembered context. Variants cover active use, available recall, and ignored or removed memory states.

**Export:** `AIChipMemory` · alias `AIMemoryChip`

The AI Memory Chip communicates how the AI is relating to stored context or past interaction memory. Warm companion surfaces distinguish memory from primary brand blue. Ignored and removed memory use muted opacity and strikethrough to signal deactivation without removing from view.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/chip-memory/AIChipMemory.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-chip-memory/ai-chip-memory.md` | This mirror spec |
| `components/ai/atomic/ai-chip-memory/ai-chip-memory.agent.json` | Agent manifest |
| `components/ai/atomic/ai-chip-memory/agentic-prompt.md` | Copy-paste prompt for doc site |
| `components/ai/atomic/ai-chip-memory/ai-chip-memory.preview.html` | Vanilla JS preview |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Recall · Guide |
| Accountability | Memory control · User feedback |

## When to use

- Below AI responses to show which memory sources are active
- In memory management panels to indicate recall state
- To distinguish available vs ignored vs removed context items

## When not to use

- For task status — use `AIChipBrief`
- For agent handoff direction — use `AIChipHandoff`
- For idle suggested prompts — use `AIChipQuick`

## Anatomy

1. **Memory icon** _(Unique)_ — Custom chip/robot SVG (12×12). Color matches text token per variant. Not emoji, not Lucide.
2. **Label text** _(Unique)_ — Caller-supplied label. Strikethrough on inner span for `memory-removed`.
3. **Pill shell** _(Shared)_ — `AI.radius.full`. Background/border from CSS vars or semantic rgba.

## State variations

| Variant | Label example | Visual |
|---------|---------------|--------|
| **using-memory** | Q3 strategy brief | Raised card surface, default text |
| **previous-context** | Prior conversation | Same surface as using-memory |
| **memory-available** | Org chart v2 | Brand periwinkle surface + border |
| **memory-ignored** | Old org chart | Neutral track bg, helper text, opacity 0.7 |
| **memory-removed** | Deprecated brief | Red tint, strikethrough, opacity 0.7 |

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `MemoryVariant` | `required` | `using-memory` \| `previous-context` \| `memory-available` \| `memory-ignored` \| `memory-removed` |
| `label` | `string` | `required` | Text label for the memory item |
| `size` | `"sm" \| "md"` | `"md"` | `sm` = 11px / 2×8px pad · `md` = `@brand-caption-1` / 3×10px pad |

## Tokens

### Variant config (CSS vars)

| Variant | Background | Border | Text |
|---------|------------|--------|------|
| using-memory | `var(--ai-card-bg-raised)` | `var(--ai-card-border)` | `var(--ai-neutral-text)` |
| previous-context | `var(--ai-card-bg-raised)` | `var(--ai-card-border)` | `var(--ai-neutral-text)` |
| memory-available | `var(--ai-brand-surface)` | `var(--ai-brand-border)` | `var(--ai-brand-text)` |
| memory-ignored | `var(--ai-confidence-track)` | `var(--ai-card-border)` | `var(--ai-neutral-helper)` |
| memory-removed | `rgba(231,76,60,0.08)` | `rgba(231,76,60,0.25)` | `#E74C3C` |

### Semantic references

| Token | Maps to | Usage |
| --- | --- | --- |
| `AI.color.companion.surface` | `#ECE6DD` | Warm companion palette (design doc) |
| `AI.color.companion.highlight` | `#F1E4D0` | Previous context warmth |
| `AI.color.companion.border` | `#E8D6BF` | Companion chip border |
| `AI.color.companion.ink` | `#3C2A1D` | Companion chip text |
| `AI.color.brandSurface` | `#F5F6FF` | memory-available bg |
| `AI.radius.full` | `100px` | Pill shape |

### Typography

| Size | Spec |
| --- | --- |
| `md` | `AI_TYPOGRAPHY['@brand-caption-1']` — 12px / 400 / 1.5 |
| `sm` | 11px / 400 / 1.4 |

## JavaScript / React API

```tsx
import { AIChipMemory } from '@/components/ai/atomic/chip-memory/AIChipMemory';

<AIChipMemory variant="using-memory" label="Q3 strategy brief" />
<AIChipMemory variant="previous-context" label="Prior conversation" />
<AIChipMemory variant="memory-available" label="Org chart v2" />
<AIChipMemory variant="memory-ignored" label="Old org chart" />
<AIChipMemory variant="memory-removed" label="Deprecated brief" />

// Compact size in response footers
<AIChipMemory variant="using-memory" label="Q3 strategy brief" size="sm" />
```

## Agent rules

1. Read this mirror spec and `ai-chip-memory.agent.json` before implementing.
2. Use `VARIANT_CONFIG` from canonical TSX — CSS vars, not invented hex for standard states.
3. Memory icon is the bundled SVG — do not use emoji or Lucide brain icons.
4. Strikethrough applies to label span only, not the icon.
5. Copy canonical `AIChipMemory.tsx` verbatim.

Full agent contract: `components/ai/atomic/ai-chip-memory/ai-chip-memory.agent.json`.

## Related Components

- `components/ai/atomic/ai-chip-brief/ai-chip-brief.md` — task brief status chip
- `components/ai/atomic/ai-chip-quick/ai-chip-quick.md` — idle suggested prompts
- `components/ai/llms.txt` — AI component index
