# AI Card Memory

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardMemory`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Recalled memory entry with provenance, date, and content. Lets users decide whether to reuse, ignore, or permanently remove a recalled context.

The AI Card Memory surfaces a single recalled memory entry so users can review its provenance, decide whether to reuse it in the current context, ignore it for this session, or permanently remove it. The ZSAI Tan companion palette grounds memory entries in a warm, archive-like aesthetic.

**Export:** `AICardMemory`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-memory/AICardMemory.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-memory/ai-card-memory.md` | This mirror spec |
| `components/ai/organisms/ai-card-memory/ai-card-memory.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-memory/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Recall · Guide |
| Accountability | Memory control · Sources |

## Anatomy

1. **Header** _(Shared)_ — AIChipMemory variant + source label + date chip
2. **Content Excerpt** _(Unique)_ — 2–3 lines of recalled content
3. **View Sources Link** _(Shared)_ — AIWhyThisLink for provenance
4. **Action Row** _(Shared)_ — Reuse / Review / Ignore / Remove

## State variations

- **Using Memory** _(variant=using-memory)_ — Memory actively in use — tan background
- **Previous Context** _(variant=previous-context)_ — Recalled from prior session
- **Available** _(variant=memory-available)_ — Memory available to reuse — blue tint
- **Ignored** _(variant=memory-ignored)_ — Memory ignored this session — muted
- **Removed** _(variant=memory-removed)_ — Memory removed — strikethrough, faded

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `MemoryVariant` | `required` | Memory state variant |
| `source` | `string` | `required` | Memory source label |
| `date` | `string` | `required` | Memory creation/retrieval date |
| `content` | `string` | `required` | Memory content excerpt |
| `onReuse` | `() => void` | `undefined` | Reuse memory handler |
| `onIgnore` | `() => void` | `undefined` | Ignore for session handler |
| `onRemove` | `() => void` | `undefined` | Permanently remove handler |

## Tokens

### Companion
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-companion-paper` | `#F6F2EB` | Using-memory background |
| `--ai-companion-highlight` | `#F1E4D0` | Previous-context background |

## Flows

### Memory reuse
Agent surfaces memory and user accepts it
- Memory Card shown with using-memory variant
- User reads content
- Clicks Reuse
- Memory applied to current context
- Card removed from surface

## Canonical implementation

```tsx
import { AICardMemory } from '@/components/ai/organisms/ai-card-memory/AICardMemory';

<AICardMemory
  variant="using-memory"
  source="Session: Acme Corp Review"
  date="May 28, 2026"
  content="User preferred executive summary format with risk flags in red. Declined detailed appendix."
  onReuse={() => console.log('Reuse')}
  onIgnore={() => console.log('Ignore')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-memory.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-memory/ai-card-memory.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
