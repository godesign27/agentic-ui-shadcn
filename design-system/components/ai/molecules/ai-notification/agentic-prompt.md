# Agentic Prompt — AI Notification

You are implementing the **AI Notification** (`ai-notification`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Notification (`ai-notification`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> AI-detected events surfaced clearly, actionably and with accountability. Eight severity variants map to distinct visual treatments — info, opportunity, warning, urgent, success, blocked, approval and escalated.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-notification/ai-notification.agent.json`
4. `components/ai/molecules/ai-notification/ai-notification.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AINotification` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `severity` (`NotificationSeverity`) default ``required`` — info \
- `title` (`string`) default ``required`` — Bold severity label shown in the card header
- `message` (`string`) default ``required`` — Main notification body text
- `variant` (`"basic" \) default `"enhanced"`` — `"enhanced"`
- `layout` (`NotificationLayout`) default ``"default"`` — default \
- `status` (`NotificationStatus`) default ``"default"`` — default \
- `attribution` (`string`) default ``undefined`` — AI agent label shown in the footer
- `timestamp` (`string`) default ``undefined`` — Timestamp shown in the footer
- `primaryAction` (`NotificationAction`) default ``undefined`` — { label, onClick } — text link style primary CTA
- `secondaryAction` (`NotificationAction`) default ``undefined`` — { label, onClick } — ghost secondary CTA
- `isDismissible` (`boolean`) default ``false`` — Show dismiss × button in the header
- `isSnoozable` (`boolean`) default ``false`` — Show Snooze action in the action row
- `onDismiss` (`() => void`) default ``undefined`` — Called when the user dismisses the notification
- `onSnooze` (`() => void`) default ``undefined`` — Called when the user snoozes the notification
- `onViewRationale` (`() => void`) default ``undefined`` — Shows "Why this?" link when provided
- `onMarkReviewed` (`() => void`) default ``undefined`` — Shows "Mark reviewed" link when provided

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
