# AI Notification

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiNotification`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

AI-detected events surfaced clearly, actionably and with accountability. Eight severity variants map to distinct visual treatments — info, opportunity, warning, urgent, success, blocked, approval and escalated.

Canonical molecules from the Guild AI Design System.

**Export:** `AINotification`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/ai-notification/AINotification.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-notification/ai-notification.md` | This mirror spec |
| `components/ai/molecules/ai-notification/ai-notification.agent.json` | Agent manifest |
| `components/ai/molecules/ai-notification/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Monitor · Warn · Inform · Escalate · Redirect |
| Accountability | Rationale · Owner · Approval · Audit trail · Escalation |

## When to use

- When AI detects an anomaly, risk, opportunity or required action
- When an AI workflow completes or is blocked
- When AI needs to surface a distinct event in a conversation thread
- When the output needs more visual emphasis than plain conversational text

## When not to use

- Do not use for ordinary product alerts unrelated to AI
- Do not use for every AI response — reserve for genuinely distinct events
- Do not use when plain text is sufficient
- Do not use for marketing messages or system errors outside AI workflows

## Anatomy

1. **Left Accent Bar** _(Unique)_ — 3-4px solid bar — primary severity differentiator per card
2. **Severity Icon** _(Shared)_ — Inline SVG icon unique per severity variant
3. **Severity Title** _(Unique)_ — Bold label, severity labelColor, 12px/700
4. **Dismiss Control** _(Shared)_ — Optional × button with aria-label; only for dismissible notifications
5. **Message Body** _(Unique)_ — 13px/400, DS.textDefault, lineHeight 1.55
6. **Action Row** _(Shared)_ — Text link primary action + optional secondary, snooze, why-this, mark-reviewed
7. **Attribution Footer** _(Shared)_ — 10px, DS.textHelper — attribution label + timestamp

## State variations

- **Basic** _(variant="basic")_ — Minimal severity card — icon · title · message · optional single action. No attribution, chips, secondary action, or dismiss/snooze. Use in tight inline surfaces and digest stacks where extra metadata is noise.
- **Enhanced** _(variant="enhanced")_ — Full notification card (default) — adds attribution, timestamp, chips, primary + secondary actions, rationale link, dismiss/snooze controls. Use as the primary output form when the user needs context to act.
- **Info** _(severity="info")_ — Neutral AI-detected update. AI_RAMP blue-purple accent.
- **Opportunity** _(severity="opportunity")_ — Positive business opportunity. Teal accent.
- **Warning** _(severity="warning")_ — Non-critical risk or gap. Signal Orange accent.
- **Urgent** _(severity="urgent")_ — Action required soon. Semantic red accent with pulse.
- **Success** _(severity="success")_ — AI workflow or analysis finished. Green accent.
- **Blocked** _(severity="blocked")_ — AI cannot continue without input. Purple accent.
- **Approval** _(severity="approval")_ — Change ready for human approval. Blue accent.
- **Escalated** _(severity="escalated")_ — Escalated to human owner. Signal Orange accent.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `severity` | `NotificationSeverity` | `required` | info \| opportunity \| warning \| urgent \| success \| blocked \| approval \| escalated |
| `title` | `string` | `required` | Bold severity label shown in the card header |
| `message` | `string` | `required` | Main notification body text |
| `variant` | `"basic" \| "enhanced"` | `"enhanced"` | Top-level form. basic = icon · title · message · optional single action (no attribution / chips / secondary / dismiss). enhanced = full card. |
| `layout` | `NotificationLayout` | `"default"` | default \| compact \| detailed \| actionable \| readonly \| command-center \| side-panel (enhanced variant only) |
| `status` | `NotificationStatus` | `"default"` | default \| expanded \| dismissed \| snoozed \| reviewed \| loading \| error |
| `attribution` | `string` | `undefined` | AI agent label shown in the footer |
| `timestamp` | `string` | `undefined` | Timestamp shown in the footer |
| `primaryAction` | `NotificationAction` | `undefined` | { label, onClick } — text link style primary CTA |
| `secondaryAction` | `NotificationAction` | `undefined` | { label, onClick } — ghost secondary CTA |
| `isDismissible` | `boolean` | `false` | Show dismiss × button in the header |
| `isSnoozable` | `boolean` | `false` | Show Snooze action in the action row |
| `onDismiss` | `() => void` | `undefined` | Called when the user dismisses the notification |
| `onSnooze` | `() => void` | `undefined` | Called when the user snoozes the notification |
| `onViewRationale` | `() => void` | `undefined` | Shows "Why this?" link when provided |
| `onMarkReviewed` | `() => void` | `undefined` | Shows "Mark reviewed" link when provided |

## Tokens

### RiInformationLine
| Token | Value | Usage |
| --- | --- | --- |
| `borderColor` | `AI.color.action.primary` | Left accent bar and title for info severity |

### Warning
| Token | Value | Usage |
| --- | --- | --- |
| `borderColor` | `SIGNAL_ORANGE[60] #EC7200` | Left accent bar and title for warning and escalated severity |

### Urgent
| Token | Value | Usage |
| --- | --- | --- |
| `borderColor` | `#E74C3C` | Left accent bar and title for urgent severity |

### Success
| Token | Value | Usage |
| --- | --- | --- |
| `borderColor` | `#27AE60` | Left accent bar and title for success severity |

### Blocked
| Token | Value | Usage |
| --- | --- | --- |
| `borderColor` | `#9B59B6` | Left accent bar and title for blocked severity |

## Flows

### AI Assisted detection
AI detects a coverage gap → warning notification appears in side panel → user reviews gaps → user applies assignment change
- AI detects 31 unassigned accounts
- severity="warning" card appears in side panel
- RiUserLine clicks Review gaps →
- Assignment workflow opens

### AI Led monitoring stack
Command Center monitors territory → multiple alerts fire → stack collapses beyond 3 → user opens urgent alert first
- 3 alerts detected
- AINotificationStack renders intro + 3 cards
- overflow collapsed with View all
- User acts on urgent first

### Blocked workstream
Agent cannot continue → blocked notification → user reconnects source → workstream resumes
- severity="blocked" rendered
- RiUserLine clicks Reconnect source →
- Source reconnected
- Workstream resumes — success notification replaces blocked

## Canonical implementation

```tsx
import { AINotification, AINotificationStack } from '@/components/ai/molecules/ai-notification/AINotification';

// Basic — slim severity card, no attribution/chips/secondary actions
<AINotification
  variant="basic"
  severity="warning"
  title="Coverage gap detected"
  message="Northeast region now has 31 accounts without an assigned rep."
  primaryAction={{ label: 'Review gaps', onClick: () => {} }}
/>

// Enhanced (default) — full card with attribution, chips, dismiss
<AINotification
  severity="warning"
  title="Coverage gap detected"
  message="Northeast region now has 31 accounts without an assigned rep. Review before Q3 lock."
  primaryAction={{ label: 'Review gaps', onClick: () => {} }}
  isDismissible
  attribution="Guild AI"
  timestamp="Just now"
/>

// Stack
<AINotificationStack
  intro="3 coverage alerts detected in your territory:"
  notifications={[
    { severity: 'urgent',  title: 'Action required',       message: 'Two accounts in the Pacific region require immediate rep assignment before end of quarter.', primaryAction: { label: 'Assign now' } },
    { severity: 'warning', title: 'Coverage gap detected', message: 'Northeast region now has 31 accounts without an assigned rep. Review before Q3 lock.',      primaryAction: { label: 'Review gaps' } },
    { severity: 'success', title: 'Analysis complete',     message: 'Coverage analysis finished. 74% overall coverage. Report ready for export.',                 primaryAction: { label: 'Export report' } },
  ]}
  onViewAll={() => {}}
/>
```

## Agent rules

1. Read this mirror spec and `ai-notification.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-notification/ai-notification.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
