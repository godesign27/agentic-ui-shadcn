# AI Brief Chip

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiChipBrief`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Status indicator for agent task briefs. Communicates execution readiness at a glance — from draft to awaiting approval to running.

**Export:** `AIChipBrief`

The AI Brief Chip surfaces the live status of an AI task brief inline — wherever a brief is referenced in the UI. Each status applies a **full semantic surface** — background, border, dot, and label text share a hue family so status is readable at a glance without relying on dot color alone. Designed for density: fits in table rows, sidebar list items, or stacked chip groups.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/chip-brief/AIChipBrief.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-chip-brief/ai-chip-brief.md` | This mirror spec |
| `components/ai/atomic/ai-chip-brief/ai-chip-brief.agent.json` | Agent manifest |
| `components/ai/atomic/ai-chip-brief/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Confirm · Execute |
| Accountability | Approval · Audit trail |

## When to use

- See bundle overview

## Anatomy

1. **Status dot** _(Unique)_ — Colored 7px circle — matches label ink for the active status. Pulses when running.
2. **Label text** _(Unique)_ — Caller-supplied string describing the brief. Ink color matches status semantics.
3. **Pill shell** _(Unique per status)_ — Full-radius border; background and stroke use the status semantic surface tokens below.

## State variations

- **Default** _(default)_ — Neutral state — brief exists but no action needed.
- **Ready** _(ready)_ — Brief is fully formed and ready to execute.
- **Missing** _(missing)_ — Required brief data is absent — blocks execution.
- **Edited** _(edited)_ — Brief was manually edited since last run.
- **Waiting Approval** _(waiting-approval)_ — Brief submitted, awaiting human sign-off.
- **Running** _(running)_ — Brief is actively executing — dot pulses.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `BriefChipStatus` | `"default"` | One of: default \| ready \| missing \| edited \| waiting-approval \| running |
| `label` | `string` | `—` | Text label for the brief |
| `size` | `"sm" \| "md"` | `"md"` | Controls padding and font size |

## Tokens

Each status maps to a semantic surface triplet (background · border · ink). Dot uses the same ink token as label text.

| Status | Background | Border | Ink (dot + label) |
| --- | --- | --- | --- |
| `default` | `#F4F3F3` | `#DEDCDE` | `#716E79` |
| `ready` | `#E8F5E9` | `#A5D6A7` | `#2E7D32` |
| `missing` | `#FBE9E7` | `#FFCCBC` | `#BF360C` |
| `edited` | `#F5F6FF` | `#D2D6FF` | `#434F99` |
| `waiting-approval` | `#FEFBF4` | `#FFD68F` | `#A54F00` |
| `running` | `#F5F6FF` | `#D2D6FF` | `#5A6DFF` |

> **Note:** The atoms bundle listed only shared brand pill tokens plus dot colors for `running` and `edited`. Canonical implementation uses per-status semantic surfaces as shown above — `edited` is brand blue, not signal orange.

## Flows

### Status dot pulse
Running state
- status="running" detected
- CSS keyframe animation injected via <style> tag
- Dot pulses at 1.4s ease-in-out
- prefers-reduced-motion disables animation

## JavaScript / React API

```tsx
import { AIChipBrief } from '@/components/ai/atomic/chip-brief/AIChipBrief';

<AIChipBrief status="ready" label="Q3 Pipeline Brief" />
<AIChipBrief status="running" label="Executing…" />
<AIChipBrief status="waiting-approval" label="Pending review" />
```

## Agent rules

1. Read this mirror spec and `ai-chip-brief.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-chip-brief/ai-chip-brief.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order