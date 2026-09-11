# AI Agent Work Note

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiAgentWorkNote`  
**Component type:** React control  
**Status:** Draft  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Quiet, trustworthy transparency. The agent shows what it is doing without exposing private reasoning.

**Export:** `AIAgentWorkNote`

AIAgentWorkNote is a lightweight inline disclosure atom used in chat threads when the agent is actively working, planning, checking context, or summarizing what it is about to do. It gives the user short, transparent status without exposing hidden chain-of-thought.

The component appears as a collapsed label ("Working >") by default. The user can expand it to read a brief safe summary, collapse it again, or hide it entirely. A "View trace" link optionally escalates to ai-reasoning-trace for full operational detail.

This is NOT a reasoning trace. Do not use it to show private deliberation, unfiltered chain-of-thought, or raw system prompts. All content must be short, safe, and user-facing.

Relationship to other explainability patterns:
• ai-agent-work-note — lightweight inline working note during/immediately after agent activity
• ai-reasoning-trace — full process trace with steps, agents, timing and operational telemetry
• ai-rationale-panel — business-facing explanation of a recommendation or output
• ai-response-footer — source, freshness, feedback and utility actions after an AI response

## Source (canonical implementation)

> Copy `AIAgentWorkNote.tsx` verbatim from the self-contained component bundle — do not rewrite from description.

| Path | Role |
|------|------|
| `ai/atomic/agent-work-note/AIAgentWorkNote.tsx` | Canonical React source |
| `tokens/ai-tokens.ts` | `AI`, `Standard`, `F` — label uses `AI.color.brand` / `brandStrong` |
| `tokens/ai-typography.ts` | `@brand-body-small` on trigger |
| `components/ai/atomic/ai-agent-work-note/ai-agent-work-note.md` | This mirror spec |
| `components/ai/atomic/ai-agent-work-note/ai-agent-work-note.agent.json` | Agent manifest |
| `components/ai/atomic/ai-agent-work-note/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Working · Planning · Checking context · Searching · Routing · Validating · Summarizing · Preparing |
| Accountability | Transparency · Status · Context · User control · Safe explanation |

## When to use

- When the agent is actively working and the user needs lightweight transparency
- When the agent is planning or checking context before responding
- When a short working summary would reduce user uncertainty
- In chat threads before or during a response
- In AI Command Center, AI Assisted Side Drawer or agentic workstreams

## When not to use

- Do not use for every response — only when working transparency is needed
- Do not use for final recommendation rationale — use ai-rationale-panel instead
- Do not use as a full process trace — use ai-reasoning-trace instead
- Do not expose hidden chain-of-thought or system prompts
- Do not use when a simple loading indicator is enough
- Do not use for standard product notifications

## Anatomy

1. **Disclosure label** _(Unique)_ — Status-driven label: "Working", "Plan", "Context check", etc. Always AI brand blue-purple.
2. **Leading icon** _(Optional)_ — Optional icon to the left of the label for additional context.
3. **Chevron** _(Shared)_ — Points right when collapsed, rotates 90° when expanded. AI brand color.
4. **Expanded note area** _(Unique)_ — Brief, safe prose or numbered list. Neutral text color. Max 3–4 lines before truncation.
5. **Bullet/ordered list** _(Optional)_ — Numbered steps when the agent is outlining a plan.
6. **Hide control** _(Optional)_ — Small "Hide" link when hideable=true. Collapses to a "Show working note" restore link.
7. **Progress indicator** _(Optional)_ — Three loading dots shown inline when status=active and loading=true.
8. **"View trace" link** _(Optional)_ — Escalation link to ai-reasoning-trace. Only shown when showViewTrace=true.

## State variations

- **Collapsed** _(Default)_ — "Working >" — label + chevron only. Default state in most surfaces.
- **Expanded** _(Open)_ — Label + chevron down + short prose or numbered list in reveal area.
- **Active working** _(status=active)_ — Label with inline loading dots: "Working···". Chevron hidden while streaming.
- **Planning** _(status=planning)_ — "Plan" label with numbered steps listing what the agent will do.
- **Context check** _(status=checkingContext)_ — "Context check" with a one-line interpretation of the request.
- **Searching** _(status=searching)_ — "Checking context" with a brief search note.
- **Hidden** _(hidden=true)_ — Renders only a small "Show working note" restore link.
- **Complete** _(status=complete)_ — "Working note complete" — muted close state after agent moves on.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `auto from status` | Override the disclosure label. Defaults to STATUS_LABEL[status]. |
| `status` | `WorkNoteStatus` | `"idle"` | Drives the default label and visual state. Options: idle \| active \| planning \| checkingContext \| searching \| routing \| validating \| complete \| hidden. |
| `content` | `string` | `undefined` | Prose note shown in the expanded body. |
| `items` | `string[]` | `undefined` | Numbered list items shown in the expanded body. |
| `icon` | `React.ReactNode` | `undefined` | Optional leading icon to the left of the label. |
| `showChevron` | `boolean` | `true` | Show/hide the expand chevron. |
| `defaultExpanded` | `boolean` | `false` | Initial expanded state (uncontrolled). |
| `expanded` | `boolean` | `undefined` | Controlled expanded state. |
| `hideable` | `boolean` | `false` | Show a Hide link next to the label. |
| `hidden` | `boolean` | `undefined` | Controlled hidden state. |
| `showViewTrace` | `boolean` | `false` | Show "View trace →" link in expanded body. |
| `loading` | `boolean` | `false` | Show loading dots inline when status=active. |
| `onToggle` | `(open: boolean) => void` | `undefined` | Called when the user toggles expand/collapse. |
| `onHide` | `() => void` | `undefined` | Called when the user clicks Hide. |
| `onViewTrace` | `() => void` | `undefined` | Called when the user clicks View trace. |

## Tokens

### Label
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.brand` | `#5A6DFF` | Disclosure label and chevron color |
| `ai.color.brandStrong` | `#2D3DA3` | Label hover state |
| `ai.color.brandSurface` | `#F5F6FF` | Label button hover background |

### Expanded body
| Token | Value | Usage |
| --- | --- | --- |
| `NEUTRAL.textDefault` | `#1A1628` | Expanded note prose color |
| `NEUTRAL.textHelper` | `#6B6575` | Hide link and secondary text |

### Motion
| Token | Value | Usage |
| --- | --- | --- |
| `awn-open` | `opacity 0→1 + translateY(-4px)→0` | Expanded body reveal |
| `awn-dot` | `scale 0.6→1 staggered` | Active loading dots |
| `awn-pulse` | `opacity 0.35→0.85` | Reserved for future streaming state |

## Flows

### Agent starts working
User submits prompt → agent begins processing → work note appears
- User submits prompt
- AIAgentWorkNote renders with status="active" loading={true} (shows dots)
- Agent begins response generation
- Work note collapses or changes to status="complete"

### User expands work note
User opens note to read brief agent summary
- Note renders collapsed: "Working >"
- User clicks/taps the label
- Chevron rotates, expanded body reveals
- User reads short safe summary
- User clicks again to collapse

### Escalate to trace
User wants full operational detail
- Note is expanded with showViewTrace={true}
- "View trace →" link visible in expanded body
- User clicks View trace
- ai-reasoning-trace opens with full step detail

### User hides note
User removes note from view
- Note renders with hideable={true}
- "Hide" control visible next to label
- User clicks Hide
- Note collapses to "Show working note" restore link
- User can restore at any time

## JavaScript / React API

```tsx
import { AIAgentWorkNote } from '@/components/ai/atomic/agent-work-note/AIAgentWorkNote';

// Collapsed (default)
<AIAgentWorkNote status="idle" />

// Active — loading dots
<AIAgentWorkNote status="active" loading={true} />

// Expanded with planning steps
<AIAgentWorkNote
  status="planning"
  defaultExpanded={true}
  items={[
    'Review the drawer pattern',
    'Align the AI panel to the standard drawer',
    'Create the split-view command center variant',
  ]}
/>

// Context check
<AIAgentWorkNote
  status="checkingContext"
  defaultExpanded={true}
  content="This should be a lightweight inline disclosure, not a full reasoning trace."
/>

// Hideable with View trace escalation
<AIAgentWorkNote
  status="idle"
  defaultExpanded={true}
  content="I'm checking the request and preparing a design-system-safe prompt."
  hideable={true}
  showViewTrace={true}
  onViewTrace={() => console.log('open ai-reasoning-trace')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-agent-work-note.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-agent-work-note/ai-agent-work-note.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order