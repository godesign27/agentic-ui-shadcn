# AI Handoff Chip

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiChipHandoff`  
**Component type:** React status chip  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** Handoff timelines, audit trails, queue cards — see `components/ai/llms.txt`  

## Purpose

Directional ownership chip communicating agent-to-agent, agent-to-human, and system handoff transitions in a compact pill format.

**Exports:** `AIChipHandoff` (primary), `AIHandoffChip` (backward-compat alias), `HandoffDirection` type.

The AI Handoff Chip visualizes a transfer of ownership or control between two parties — an agent to another agent, an agent to a human, a human back to an agent, a system trigger, or a failed handoff. It compresses what would otherwise be a full timeline step into a single inline pill, suitable for table rows and audit trails.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/chip-handoff/AIChipHandoff.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.md` | This mirror spec |
| `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.preview.html` | Vanilla JS preview port |
| `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.agent.json` | Agent manifest |
| `components/ai/atomic/ai-chip-handoff/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Transfer · Escalate |
| Accountability | Audit trail · Owner |

## When to use

- Show ownership transfer inline in audit trails, table rows, or timeline summaries
- Communicate agent-to-agent delegation without a full timeline step
- Indicate human escalation or hand-back in compact form
- Mark failed handoff attempts with dashed arrow and red tones

## When not to use

- Full handoff narrative with timestamps and rationale — use `AIHandoffTimeline` group
- Interactive handoff controls — chip is display-only
- Generic directional labels unrelated to AI ownership transfer

## Anatomy

1. **From icon** _(Unique)_ — Symbolic glyph representing from-entity type (agent ⬡, human ◉, system ⊞).
2. **From label** _(Unique)_ — Caller-supplied name for the source party.
3. **Arrow** _(Shared)_ — Directional arrow SVG — dashed for failed state.
4. **To label** _(Unique)_ — Caller-supplied name for the target party.
5. **To icon** _(Unique)_ — Symbolic glyph for target entity type.

## State variations

| Direction | Key | Shell treatment | Arrow |
|-----------|-----|-----------------|-------|
| **Agent → Agent** | `agent-to-agent` | Brand surface/bg, brand border, brand text | Solid brand blue |
| **Agent → Human** | `agent-to-human` | Signal surface, signal border, signal strong text | Solid signal orange |
| **Human → Agent** | `human-to-agent` | Success-tinted bg/border, `#27AE60` text | Solid green |
| **System → Agent** | `system-to-agent` | Purple-tinted bg/border, `#9B59B6` text | Solid purple |
| **Failed** | `failed` | Red-tinted bg/border, `#E74C3C` text | Dashed red arrow |

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `HandoffDirection` | — | `agent-to-agent` \| `agent-to-human` \| `human-to-agent` \| `system-to-agent` \| `failed` |
| `fromLabel` | `string` | — | Name of the source party |
| `toLabel` | `string` | — | Name of the target party |
| `size` | `"sm" \| "md"` | `"md"` | Controls padding and font size |

## Tokens

### Per-direction color mapping

| Direction | Background | Border | Text | Arrow |
| --- | --- | --- | --- | --- |
| Agent → Agent | `var(--ai-brand-surface)` | `var(--ai-brand-border)` | `var(--ai-brand-text)` | `AI.color.brand` |
| Agent → Human | `var(--ai-signal-surface)` | `var(--ai-signal-border)` | `AI.color.signal.strong` | `AI.color.signal.default` |
| Human → Agent | `var(--ai-status-success-bg)` | `var(--ai-status-success-border)` | `#27AE60` | `#27AE60` |
| System → Agent | `var(--ai-status-purple-bg)` | `var(--ai-status-purple-border)` | `#9B59B6` | `#9B59B6` |
| Failed | `rgba(231,76,60,0.08)` | `rgba(231,76,60,0.25)` | `#E74C3C` | `#E74C3C` dashed |

### Structural tokens

| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.full` | `100px` | Pill border-radius |
| `AI_TYPOGRAPHY['@brand-caption-1']` | `12px / 400 / 1.5` | `md` label typography |
| `AI.color.brandSurface` | `#F5F6FF` | Agent-to-agent bg |
| `AI.color.signal.surface` | `#FEFBF4` | Agent-to-human bg |
| `AI.color.signal.default` | `#EC7200` | Agent-to-human arrow |

### Entity glyphs

| Entity | Glyph | Usage |
| --- | --- | --- |
| Agent | ⬡ | AI agent source or target |
| Human | ◉ | Human reviewer source or target |
| System | ⊞ | Automated trigger source |

## JavaScript / React API

```tsx
import { AIChipHandoff } from '@/components/ai/atomic/chip-handoff/AIChipHandoff';

<AIChipHandoff direction="agent-to-human" fromLabel="Research Agent" toLabel="Sarah K." />
<AIChipHandoff direction="failed" fromLabel="Planner Agent" toLabel="Executor Agent" />
<AIChipHandoff direction="agent-to-agent" fromLabel="Research Agent" toLabel="Planner Agent" size="sm" />
```

## Agent rules

1. Read this mirror spec and `ai-chip-handoff.agent.json` before implementing.
2. Copy canonical `AIChipHandoff.tsx` verbatim — do not fabricate direction colors or icons.
3. Use `AI.*` tokens and CSS vars — never hardcode brand hex for agent-to-agent.
4. Failed state must use dashed arrow SVG — not a text arrow or emoji.
5. Entity glyphs are ⬡ / ◉ / ⊞ — not avatars or emoji.

Full agent contract: `components/ai/atomic/ai-chip-handoff/ai-chip-handoff.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order
