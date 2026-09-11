# AI List Landing

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiListLanding`  
**Component type:** React page  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Turn a product home page into an AI-led morning briefing.

AIListLanding is the AI-led briefing surface for a product home. Instead of a static dashboard, it tells the user what changed, what matters, and what next action deserves attention — in four conditional sections: Territory Health Overview, Recent Impact, Suggested Next Assessments, and What Changed Since You Last Looked. Background defaults to AISoftSurface tone="ambient" — the animated blue/purple/pink orb canvas — so the home immediately reads as AI-led. All sections are AIList groups composed of AIListItem rows; everything is data-driven so the surface can re-shape per product, role, or signal state.

**Export:** `AIListLanding`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/pages/ai-list-landing/AIListLanding.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-list-landing/ai-list-landing.md` | This mirror spec |
| `components/ai/pages/ai-list-landing/ai-list-landing.agent.json` | Agent manifest |
| `components/ai/pages/ai-list-landing/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Monitor · Summarize · Prioritize · Recommend · Detect · Compare · Guide · Assess |
| Accountability | Status · Sources · Confidence · Data freshness · Rationale · Human review · Change history |

## Anatomy

1. **Soft surface** _(Shared)_ — AISoftSurface (default tone="mixed") fills the page canvas.
2. **Header** _(Unique)_ — Eyebrow + h2 greeting + intro narrative + last-updated pill.
3. **Territory Health** _(Shared)_ — AIList narrative variant with intro paragraph + signal items.
4. **Recent Impact** _(Shared)_ — AIList of impact items with leading sparkles icons.
5. **Next Assessments** _(Shared)_ — AIList of assessment items with action affordances.
6. **Change grid** _(Shared)_ — AIList in grid layout for change + data-update items.

## State variations

- **Default briefing** _(sections=DEFAULT_SECTIONS)_ — Four sections fully populated.
- **Generating** _(generating)_ — Every section renders the loading placeholder.
- **No major changes** _("What Changed" empty)_ — Calm "No major changes since you last looked." panel.
- **Data stale** _(sections[*].status="dataStale")_ — Stale-source footer under affected sections.
- **Collapsed sections** _(collapsible)_ — Sections start collapsed; user expands what they need.
- **Tan background** _(backgroundTone="tan")_ — Warm companion canvas — for governance/review briefings.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `eyebrow` | `string` | `"AI Briefing"` | Uppercase eyebrow over the heading. |
| `heading` | `string` | `"Good morning, Sarah."` | Page-level greeting (h2). |
| `intro` | `string` | `"Here's what's changed…"` | One-line briefing intro. |
| `lastUpdated` | `string` | `"Updated 2m ago"` | Freshness pill in the header. |
| `backgroundTone` | `AISoftSurfaceTone` | `"ambient"` | AISoftSurface tone for the page canvas. Defaults to the animated ambient orb canvas. |
| `sections` | `AIListLandingSection[]` | `DEFAULT_SECTIONS` | Section definitions. Each is an AIList props object with id. |
| `generating` | `boolean` | `false` | When true, every section shows the loading placeholder. |
| `onItemOpen` | `(item, sectionId, index) => void` | `undefined` | Fires when an item is opened. |
| `onSectionToggle` | `(sectionId, collapsed) => void` | `undefined` | Fires when a collapsible section is toggled. |
| `onAssessmentStart` | `(item) => void` | `undefined` | Fires when a Suggested Next Assessment item is opened — typical hand-off into AICommandCenterSplitView. |

## Tokens

### Surface
| Token | Value | Usage |
| --- | --- | --- |
| `landing.surface` | `AISoftSurface tone="ambient"` | Page background — animated orb canvas |

### Spacing
| Token | Value | Usage |
| --- | --- | --- |
| `landing.section-gap` | `36px` | Vertical gap between sections |
| `landing.max-width` | `1040px` | Content max width |

## Flows

### Morning briefing
User lands on the AI home and reads the briefing.
- Page renders with last-updated freshness
- User scans Territory Health, Recent Impact, Next Assessments
- User opens a Needs Review item to see rationale + sources
- User picks Generate Scenarios — onAssessmentStart fires and routes into AI Command Center Split View

### No major changes
Calm empty state for the change section.
- "What Changed" renders no-changes status
- Other sections still populated
- RiUserLine can still drill into monitoring signals

## Canonical implementation

```tsx
import { AIListLanding } from '@/components/ai/pages/ai-list-landing/AIListLanding';

<AIListLanding
  heading="Good morning, Sarah."
  intro="Here's what's changed, what matters, and what to look at next."
  lastUpdated="Updated 2m ago"
  onItemOpen={(item, sectionId) => navigate(...)}
  onAssessmentStart={(item) => openSplitView(item)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-list-landing.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-list-landing/ai-list-landing.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
