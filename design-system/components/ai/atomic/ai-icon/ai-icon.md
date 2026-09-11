# AI Icon

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiIcon`  
**Component type:** React control  
**Status:** Beta  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Not a new icon set — a behavior and color layer applied to standard icons. Every AI icon choice must justify its treatment against the 60-30-10 color rule: 60% neutral, 30% product/semantic, 10% AI identity.

**Export:** `AIIcon`

AIIcon is the canonical way to render any icon on a ZAIDYN AI surface. The icon set itself is the Zaidyn Icon Library — the same `ui-icon-{name}` inventory documented in Foundations → Iconography, where every icon, its keywords, its Figma asset ID, and its fallback strategy live. Use that page to discover or search the full library; use this atom on AI surfaces to render a chosen icon with the right treatment. AIIcon wraps a Zaidyn SVG path with a treatment prop that controls color strategy: neutral (metadata, utility), ai (AI identity, agent output), ai-contained (rounded square container for prominent AI presence), semantic (status-driven color from tone prop), orange-signal (escalation, pending, stale), and tan-container (companion surface). The Motion Icon layer adds opt-in animation — pulse, spin, shimmer, nudge, handoff-trail, completion-settle, alert-ring, or blocked-static — for state-change emphasis without decorative noise.

## Source (canonical implementation)

> Copy `AIIcon.tsx` verbatim from the self-contained component bundle — do not rewrite from description.

| Path | Role |
|------|------|
| `ai/atomic/icon/AIIcon.tsx` | Canonical React source (`ICON_PATHS` registry + renderer) |
| `tokens/ai-tokens.ts` | `AI`, `Standard`, `SIGNAL`, `COMPANION`, `F` |
| `tokens/ai-typography.ts` | `@brand-*` typography scale |
| `components/ai/atomic/ai-icon/ai-icon.md` | This mirror spec |
| `components/ai/atomic/ai-icon/ai-icon.agent.json` | Agent manifest |
| `components/ai/atomic/ai-icon/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Monitor · Warn · Suggest · Execute |
| Accountability | Confidence · Rationale · Audit trail |

## When to use

- Check ICON_PATHS before using any icon
- Use neutral treatment for 60% of icons on any surface
- Reserve AI identity treatment for genuine agent output moments
- Pair motion with visible text or status label
- Stop spin animation when processing completes
- Limit alert-ring to 2 cycles maximum
- Mark decorative icons with the `decorative` prop
- Respect prefers-reduced-motion at all times

## When not to use

- Do not use AI identity treatment on every icon on the surface
- Do not use Signal orange for standard AI output icons — only escalation / stale
- Do not loop attention animations (pulse, nudge) indefinitely
- Do not use motion as the only indicator of state change
- Do not create custom icon shapes outside ICON_PATHS
- Do not use spin for decorative AI presence — use pulse instead
- Do not add shimmer to every AI icon on the page
- Do not skip Lucide fallback documentation — always tag [Lucide] in ICON_PATHS

## Anatomy

1. **SVG Glyph** _(Shared)_ — Standard path data at 12–32px. fill="currentColor" always; color set by treatment + tone.
2. **Container Shell** _(Unique)_ — Optional rounded-square bg for ai-contained and tan-container treatments.
3. **Motion Layer** _(Unique)_ — CSS keyframe animation applied to glyph or container. opt-in only via motion prop.
4. **Accessibility Wrap** _(Shared)_ — role="img" + aria-label for standalone icons. aria-hidden for decorative.

## State variations

- **Neutral** _(treatment="neutral" — 60%)_ — NEUTRAL.textHelper color. Use for timestamps, metadata, utility actions, form labels, nav. Avoid using "neutral" for AI identity icons — use "ai" for agent output.
- **Semantic** _(treatment="semantic" — 30%)_ — Status-driven color from tone prop: success, warning, error, urgent, blocked, approval, escalated. Avoid semantic colors for decorative icons with no status meaning.
- **AI Identity** _(treatment="ai" — 10%)_ — BRAND brand (#5A6DFF) for agent output, generated-content labels, AI presence. Reserve for true AI identity moments — never on every icon.
- **AI Contained** _(treatment="ai-contained")_ — Rounded brandSurface square + brand glyph. Use for named-agent attribution, AI Led command centers, high-prominence AI actions. Containers carry visual weight — use infrequently.
- **Orange Signal** _(treatment="orange-signal")_ — Signal orange (#EC7200) for AI warnings, stale source indicators, escalation required, pending states. Never for informational or standard AI output icons.
- **Tan Container** _(treatment="tan-container")_ — BRAND Tan surface bg + warm ink. For memory cards, companion panels, warm AI surfaces using the BRAND Tan palette. Avoid on primary AI surfaces — this is for secondary companion contexts.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `required` | Key from ICON_PATHS registry (e.g. "ai-assist", "search", "clock") |
| `size` | `AIIconSize` | `"md"` | xs=12px (inline metadata) · sm=16px Standard normal (default for most contexts) · md=20px Standard large (standard AI icon) · lg=24px Standard x-large (prominent AI identity) · xl=32px (hero / empty states only) |
| `treatment` | `AIIconTreatment` | `"neutral"` | Color strategy: neutral \| ai \| ai-contained \| semantic \| orange-signal \| tan-container |
| `tone` | `AIIconTone` | `"default"` | Semantic tone for treatment="semantic": success \| warning \| error \| urgent \| blocked \| escalated \| ... |
| `container` | `boolean` | `false` | Render icon in a rounded-square container background |
| `label` | `string` | `undefined` | Accessible label. Required for non-decorative standalone icons. |
| `decorative` | `boolean` | `false` | Mark icon as aria-hidden (paired with visible text label) |
| `motion` | `AIIconMotion` | `"none"` | Animation: none \| pulse \| spin \| shimmer \| nudge \| handoff-trail \| completion-settle \| alert-ring |
| `motionLoop` | `boolean` | `false` | Loop motion indefinitely (only appropriate for active progress states) |
| `style` | `CSSProperties` | `undefined` | Inline style override applied to outermost element |

## Tokens

### Treatment Colors
| Token | Value | Usage |
| --- | --- | --- |
| `NEUTRAL.textHelper` | `#5b5864` | neutral treatment — all utility / metadata icons |
| `AI.color.brand` | `#5A6DFF` | ai + ai-contained treatment — AI identity, agent activity |
| `AI.color.brandSurface` | `#F5F6FF` | ai-contained container background |
| `SIGNAL[60]` | `#EC7200` | orange-signal treatment — escalation, pending, stale only |
| `COMPANION['00']` | `#F6F2EB` | tan-container background — companion surface contexts |

### Motion Tokens
| Token | Value | Usage |
| --- | --- | --- |
| `AI.motion.icon.pulse.duration` | `1200ms` | Waiting for review, active AI presence |
| `AI.motion.icon.spin.duration` | `900ms` | Processing, loading, refreshing |
| `AI.motion.icon.shimmer.duration` | `1400ms` | AI generating, retrieving information |
| `AI.motion.icon.nudge.duration` | `220ms` | New notification, new suggestion (one-shot) |
| `AI.motion.icon.completion.duration` | `280ms` | Success, saved, approved (one-shot) |
| `AI.motion.icon.alertRing.duration` | `1000ms` | Action required, escalation (max 2 cycles) |

## Flows

### Icon source priority
Always source icons in this order. AIIcon is not a new icon set — it is a treatment layer over standard icons.
- 1. Standard icon (confirmed) — path data from the brandnc/implementation source-mirror repo. No fallback needed. Tagged [Standard] in ICON_PATHS.
- 2. Existing AI Library icon — if another AI component already renders the same concept, extract the path rather than duplicating.
- 3. Lucide fallback — import from lucide-react or add a path to ICON_PATHS tagged [Lucide]. Normalize to 24×24. Replace with Standard when a match ships.

### Processing → complete flow
Icon transitions from spinning to settled success state.
- Render <AIIcon name="refresh" treatment="ai" motion="spin" motionLoop={true} />
- AI processing completes
- Switch to <AIIcon name="check-circle" treatment="semantic" tone="success" motion="completion-settle" />
- Animation settles; icon becomes static

### Semantic icon mapping
Canonical mapping from AI concepts to icon + treatment + motion. Standard icon first; Lucide fallback only when no standard equivalent exists.
- AI Thinking — Standard: refresh · treatment: ai · motion: spin (AI loading/processing state)
- AI Identity — Standard: ai-assist · treatment: ai-contained · motion: pulse (named agent attribution)
- AI Warning — Standard: ai-warning · treatment: orange-signal · motion: alert-ring (AI-detected issue requires attention)
- Success / Complete — Standard: check (fallback: check-circle) · treatment: semantic · motion: completion-settle (task done, saved, applied)
- Error / Blocked — Standard: error-circle · treatment: semantic · motion: none (static blocked state — no loop)
- Search — Standard: search · treatment: neutral · motion: none (filter, find, lookup)
- Bookmark / Save — Standard: bookmark · treatment: neutral · motion: none (save to workspace, bookmark insight)
- Share — Lucide: share · treatment: neutral · motion: none (replace when Standard ships equivalent)
- Copy — Lucide: copy · treatment: neutral · motion: none (replace when Standard ships equivalent)
- Dismiss / Close — Standard: close · treatment: neutral · motion: none (dismiss notification, close panel)
- Escalation — Lucide: flag · treatment: orange-signal · motion: alert-ring (escalate to human)
- Agent Handoff — Lucide: users · treatment: ai · motion: handoff-trail (transfer of ownership)
- Memory / History — Lucide: history · treatment: tan-container · motion: none (memory chip, prior context, session recall)
- Data Source — Lucide: database · treatment: neutral · motion: none (source attribution chips in response footer)
- Rationale / Why — Lucide: info · treatment: ai · motion: none (AIWhyThisLink, rationale panel trigger)
- Governance / Trust — Lucide: shield-check · treatment: semantic · motion: none (audit trail, governance approval)

## JavaScript / React API

```tsx
import { AIIcon } from '@/components/ai/atomic/icon/AIIcon';

// Neutral — utility / metadata
<AIIcon name="clock"       treatment="neutral"      />

// AI identity
<AIIcon name="ai-assist"   treatment="ai"           />

// AI contained — prominent AI presence
<AIIcon name="ai-assist"   treatment="ai-contained" size="lg" label="AI Assistant" />

// Semantic — success state
<AIIcon name="check-circle" treatment="semantic" tone="success" />

// Orange signal — escalation / stale
<AIIcon name="ai-warning"  treatment="orange-signal" />

// Motion — spinning while processing (with arrowheads)
<AIIcon name="refresh"     treatment="ai"  motion="spin"  motionLoop={true} decorative />

// Motion — clean spinner (no arrowheads — open arc)
<AIIcon name="spinner"     treatment="ai"  motion="spin"  motionLoop={true} decorative />

// Motion — pulse for attention
<AIIcon name="ai-assist"   treatment="ai"  motion="pulse" motionLoop={true} label="AI is active" />
```

## Agent rules

1. Read this mirror spec and `ai-icon.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-icon/ai-icon.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order