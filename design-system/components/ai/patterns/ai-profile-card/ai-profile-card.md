# AI Profile Card

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiProfileCard`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Entity profile · 4 densities · 3 themes · chat + drawer contexts

AIProfileCard is a progressive-density entity summary card optimized for two placement contexts: inline in a chat thread (max-width 520px) and full-width inside a side drawer. Basic density surfaces identity only. Simple adds Decile chip, KOL role chip, and a three-stat row. Rich adds AI badge, confidence badge, sentiment badge, and a brief insight callout. Robust replaces the insight callout with a full AI Recommendation panel with primary and secondary CTAs.

**Export:** `AIProfileCard`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-profile-card/AIProfileCard.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-profile-card/ai-profile-card.md` | This mirror spec |
| `components/ai/organisms/ai-profile-card/ai-profile-card.agent.json` | Agent manifest |
| `components/ai/organisms/ai-profile-card/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · AI Assisted · Adaptive |
| AI behavior | Identify · Recommend · Validate · Summarize |
| Accountability | Confidence · Sentiment · Sources · Data freshness · Human review |

## When to use

- As an inline entity card in a chat thread when the AI surfaces a HCP profile
- Inside a side drawer to show full AI context for a selected entity
- In recommendation flows where AI suggests engagement with a specific person

## When not to use

- For lists of entities — use AI List or AI Card Queue instead
- When no AI-computed signals are available — use Basic density and omit AI-reserved props

## Anatomy

1. **Card shell** _(Unique)_ — Rounded 12px container with theme-mapped background and border.
2. **Profile avatar** _(Unique)_ — Circular 48px avatar — image or initials fallback.
3. **Name + AI badge** _(Unique)_ — Entity name with optional inline AI badge and confidence badge.
4. **Decile chip** _(Shared)_ — AIChipBrief with AI provenance styling. Simple+ only.
5. **Role / tag chips** _(Shared)_ — AIChipBrief in neutral tone for role label and sentiment badge.
6. **Stats row** _(Unique)_ — Three StatItems: Total Visits / TRX Last 90D / Last Visit.
7. **Insight callout** _(Shared)_ — Rich density only. Sparkle + one-line insight + source + dismiss.
8. **Recommendation panel** _(Shared)_ — Robust density only. Rationale, source, Why this?, CTA buttons, dismiss.

## State variations

- **Basic** _(density="basic")_ — Identity only — avatar, name, specialty, org. No AI signals.
- **Simple** _(density="simple")_ — Adds AI Decile chip, KOL role chip, and three-stat row.
- **Rich** _(density="rich")_ — Adds AI badge, confidence badge, sentiment badge, and brief insight callout.
- **Robust** _(density="robust")_ — Replaces insight callout with full AI Recommendation panel including CTAs.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `'basic' \| 'simple' \| 'rich' \| 'robust'` | `—` | Content density. Each level is a strict superset of the previous. |
| `theme` | `'light' \| 'dark-gradient' \| 'tan'` | `'light'` | Color theme. |
| `context` | `'chat' \| 'side-drawer'` | `'side-drawer'` | chat caps card width at 520px. |
| `name` | `string` | `—` | Entity full name. |
| `specialty` | `string` | `—` | Entity specialty or job title. |
| `organization` | `string` | `—` | Entity organization or affiliation. |
| `avatarUrl` | `string` | `undefined` | Optional avatar image URL. Falls back to initials. |
| `decile` | `number` | `undefined` | AI-computed decile rank (1–10). Simple+ only. |
| `role` | `string` | `undefined` | KOL role or attribute label. Simple+ only. |
| `stats` | `{ totalVisits, trxLast90d, trxDelta?, lastVisit }` | `undefined` | Stat row data. Simple+ only. |
| `sentiment` | `'positive' \| 'negative' \| 'neutral'` | `undefined` | Model-computed sentiment. Rich+ only. |
| `confidence` | `'high' \| 'medium' \| 'low'` | `undefined` | AI confidence level. Rich+ only. |
| `insight` | `{ summary, source, onDismiss? }` | `undefined` | Brief AI insight. Rich density only. |
| `recommendation` | `{ rationale, source, whyThisUrl?, actions, onDismiss? }` | `undefined` | Full AI recommendation panel. Robust density only. |
| `disabled` | `boolean` | `false` | Suppresses all AI signals while keeping the identity shell. |

## Canonical implementation

```tsx
import { AIProfileCard } from '@/components/ai/organisms/ai-profile-card/AIProfileCard';

// Basic — identity only
<AIProfileCard
  density="basic"
  theme="light"
  name="Dr. Sarah Chen"
  specialty="Endocrinology"
  organization="Riverside Endocrine Associates"
/>

// Robust — full AI recommendation panel
<AIProfileCard
  density="robust"
  theme="dark-gradient"
  context="chat"
  name="Dr. Sarah Chen"
  specialty="Endocrinology"
  organization="Riverside Endocrine Associates"
  decile={9}
  role="KOL · Regional speaker"
  stats={{ totalVisits: 14, trxLast90d: 182, trxDelta: '+12%', lastVisit: 'May 12' }}
  sentiment="positive"
  confidence="high"
  recommendation={{
    rationale: 'Dr. Chen is a Decile 9 endocrinologist with +12% TRX growth.',
    source: 'CRM · Sentiment model · Updated 2h ago',
    actions: {
      primary:   { label: 'Schedule Visit', onClick: handleSchedule },
      secondary: { label: 'Message',        onClick: handleMessage  },
    },
    onDismiss: handleDismiss,
  }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-profile-card.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-profile-card/ai-profile-card.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
