# AI Agent Response Group

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiAgentResponseGroup`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

A flexible conversational card that upgrades from plain text to actions, alerts, or full footer — controlled by a single variant prop.

AIAgentResponseGroup is the primary conversational AI message group. It composes AIMessageHeader, AIMessageBody, and optional action or footer layers into a single branded card.

**Export:** `AIAgentResponseGroup`

Four variants are controlled by a single `variant` prop:

- **default** — header + body only. Use for one-shot responses with no follow-up.
- **with-actions** — header + body + primary and secondary action buttons. Use when the agent offers a recommended path and a fallback option.
- **with-alert** — header + orange "Heads up" alert row + body + action buttons. Use when the agent needs to flag an issue before delivering its recommendation.
- **with-footer** — header + body + full AIResponseFooter (sources, freshness, optional feedback bar). Use when provenance and confidence transparency are required.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/organisms/ai-agent-response-group/AIAgentResponseGroup.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-agent-response-group/ai-agent-response-group.md` | This mirror spec |
| `components/ai/organisms/ai-agent-response-group/ai-agent-response-group.agent.json` | Agent manifest |
| `components/ai/organisms/ai-agent-response-group/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Respond · Suggest · Prompt action · Alert |
| Accountability | Agent identity · Timestamp · Follow-up action · Transparency |

## When to use

- Agent delivers a recommendation and offers a primary + alternative action (with-actions)
- Agent needs to flag a risk, missing field, or important caveat before giving its answer (with-alert)
- Agent response requires source attribution or user feedback collection (with-footer)
- Plain short response with no follow-up needed (default)

## When not to use

- When the response includes structured insight cards — use AIAnalysisMessage instead
- When you need more than two action buttons — use a separate action bar
- User-authored messages — use AIUserBubble instead

## Anatomy

1. **Card surface** _(Unique)_ — Raised card with `var(--ai-card-bg-raised)`, `var(--ai-card-border)`, and `AI.radius.lg` corners.
2. **Message header** _(Shared)_ — AIMessageHeader — bot avatar dot, agent label, right-aligned timestamp.
3. **Alert sub-row** _(Optional)_ — Orange signal row: `var(--ai-signal-surface)` bg, ZS Orange icon, bold label. Present only in with-alert variant.
4. **Message body** _(Shared)_ — AIMessageBody — prose content at @zsai-bubble-body. Bold brand-color spans for emphasis.
5. **Action footer** _(Optional)_ — AIMessageFooter with primary pill button + secondary outline pill. Present in with-actions and with-alert variants.
6. **Response footer** _(Optional)_ — AIResponseFooter with sources, freshness, and optional feedback bar. Present only in with-footer variant.

## State variations

- **Default** _(variant="default")_ — Header + body only. No footer chrome.
- **With actions** _(variant="with-actions")_ — Header + body + primary CTA + secondary outline button, below the card.
- **With alert** _(variant="with-alert")_ — Header + orange Heads Up pill sub-row inside card + body + action buttons below.
- **With footer** _(variant="with-footer")_ — Header + body + AIResponseFooter (sources + feedback) below the card.
- **Notification** _(variant="notification")_ — Entire card surface is orange-tinted. Inline Heads Up label (no pill) + body + action buttons below. Use when the message IS the alert.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `agentLabel` | `string` | `"AI Assistant"` | Agent name shown in the attribution header. |
| `timestamp` | `string` | `"Just now"` | Right-aligned timestamp in the header. |
| `children` | `React.ReactNode` | `required` | Body content. Use <strong> with brand color for inline emphasis. |
| `variant` | `"default" \| "with-actions" \| "with-alert" \| "with-footer"` | `"default"` | Controls which additional layers render below the body. |
| `alertLabel` | `string` | `"Heads up"` | Label text inside the orange alert sub-row. Only visible in with-alert variant. |
| `primaryAction` | `{ label: string; onClick?: () => void }` | `undefined` | Primary pill button. Visible in with-actions and with-alert variants. |
| `secondaryAction` | `{ label: string; onClick?: () => void }` | `undefined` | Secondary outline pill button. Visible in with-actions and with-alert variants. |
| `sources` | `AISource[]` | `[]` | Source chips passed to AIResponseFooter. Only used in with-footer variant. |
| `showFeedback` | `boolean` | `false` | Shows thumbs up/down feedback bar in AIResponseFooter. Only used in with-footer variant. |
| `onFeedback` | `(v: "up" \| "down") => void` | `undefined` | Callback from the feedback bar in with-footer variant. |

## Tokens

### Card surface
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg-raised` | `#FFFFFF` | Card background |
| `--ai-card-border` | `#BECAFE` | Card border stroke |
| `AI.radius.lg` | `20px` | Corner radius |

### Alert sub-row
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-signal-surface` | `#FEFBF4` | Alert row background |
| `--ai-signal-border` | `#FFD68F` | Alert row border |
| `ZS_ORANGE[70]` | `#CB6100` | Alert label and icon color |

### Action buttons
| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `linear-gradient(135deg, #657CEC, #4D60E6)` | Primary button fill |
| `AI.color.text.onAction` | `#FFFFFF` | Primary button label |
| `--ai-btn-outline-border` | `#BECAFE` | Secondary button border |
| `AI.radius.md` | `16px` | Button corner radius |

## Flows

### Agent recommendation with action
Agent delivers a suggestion and the user either accepts or overrides.
- Mount AIAgentResponseGroup with variant="with-actions"
- Body text states the recommendation
- User clicks primary button — agent proceeds with suggestion
- Or user clicks secondary — agent prompts for their preference

### Agent flags a missing configuration
Agent detects a problem and gives the user a quick fix path.
- Mount with variant="with-alert" and appropriate alertLabel
- Orange sub-row draws the eye before the body text
- User reads context in body text
- User clicks primary to accept the agent fix, or secondary to handle it manually

## Canonical implementation

```tsx
import { AIAgentResponseGroup } from '@/components/ai/organisms/ai-agent-response-group/AIAgentResponseGroup';

// Default — text only
<AIAgentResponseGroup agentLabel="AI Agent" timestamp="Just now">
  Let's build your campaign.{' '}
  <strong style={{ color: 'var(--ai-brand, #4D60E6)' }}>
    What brand are you trying to grow, and what's the primary goal?
  </strong>
</AIAgentResponseGroup>

// With actions
<AIAgentResponseGroup
  agentLabel="AI Agent"
  timestamp="Just now"
  variant="with-actions"
  primaryAction={{ label: 'Use this goal' }}
  secondaryAction={{ label: 'Change it' }}
>
  Based on current position, I'd suggest targeting{' '}
  <strong>Share of Voice</strong> as your primary KPI — you're 12 pts
  behind the leading competitor in your core segment.
</AIAgentResponseGroup>

// With alert
<AIAgentResponseGroup
  agentLabel="AI Agent"
  timestamp="Just now"
  variant="with-alert"
  alertLabel="Heads up"
  primaryAction={{ label: 'Yes, set 6 weeks' }}
  secondaryAction={{ label: "I'll set it" }}
>
  You haven't set a flight end date. Campaigns without end dates tend to
  overspend. Want me to suggest a 6-week window?
</AIAgentResponseGroup>

// With footer
<AIAgentResponseGroup
  agentLabel="AI Agent"
  timestamp="Just now"
  variant="with-footer"
  sources={[{ label: 'Campaign data', freshness: 'fresh' }]}
  showFeedback
>
  Your Q3 brand health scores improved 4 pts across all measured segments.
</AIAgentResponseGroup>
```

## Agent rules

1. Read this mirror spec and `ai-agent-response-group.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-agent-response-group/ai-agent-response-group.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
