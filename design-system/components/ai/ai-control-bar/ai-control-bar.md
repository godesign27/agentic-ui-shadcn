# AIControlBar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** molecules  
**Component id:** `ai:ai-control-bar`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-control-bar`  
**Depends on:** `ai:ai-button`  

## Purpose

The human can always stop the machine.

State-aware execution controls for a running workstream: pause, resume, redirect and a two-step cancel.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Led |
| AI behavior | Confirm · Apply |
| Accountability | Attribution · Approval · Audit trail · Reversibility |
| Human gesture required | Yes — no state may change without one |
| Reversible | always |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-control-bar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-control-bar/ai-control-bar.md` | This mirror spec |
| `design-system/components/ai/ai-control-bar/ai-control-bar.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-control-bar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-control-bar/ai-control-bar.preview.html` | Visual proof of every documented state |

## When to use

- Alongside any AI Led workstream
- Wherever an agent runs long enough that a user may want to intervene
- With ai:ai-progress on a multi-step run

## When not to use

- For a single short request — there is nothing to pause
- As a generic toolbar
- Where the actions are not actually wired to the agent

## Anatomy

| Part | Role |
| --- | --- |
| **Label** | Optional context, pushed left |
| **Controls** | The set changes with state. Never more than two at once. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Running** | `state="running"` | Pause and Cancel |
| **Paused** | `state="paused"` | Resume and Cancel |
| **Redirect available** | `state="redirect-available"` | Redirect and Keep running |
| **Cancel confirm** | `state="cancel-confirm"` | Two-step. A status message states that progress is kept. |
| **Saved progress** | `state="saved-progress"` | Resume only, with confirmation that progress was saved |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-control-bar.agent.json`](ai-control-bar.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-muted` | `text-ai-muted` |
| `ai-signal` | `text-ai-signal` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `group` |
| Live region | The cancel-confirm and saved-progress messages use role="status" |

**Keyboard**

- Tab between controls

**Required**

- aria-label on the group — supplied by the component

**Notes**

- Cancel is two-step by design. A single-click cancel on a long-running agent loses work.
- The confirm message states that progress is kept — reassurance belongs in the moment of hesitation.
- The control set changes with state, so focus can land on a different button than the user expected. Manage focus when the state changes under them.

## Examples

### Running workstream

```tsx
<AIControlBar
  state="running"
  label="Rebalancing territories"
  onPause={pause}
  onCancel={() => setState("cancel-confirm")}
/>
```

## Agent rules

1. Wire every handler to the real agent. A pause that does not pause is worse than none.
2. Keep cancel two-step.
3. Pair with ai:ai-progress so the user knows what they are pausing.
4. This is what makes AI Led mode acceptable — do not ship AI Led without it.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Unwired controls
- Single-click cancel
- Use as a generic toolbar

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-progress` | What is being controlled |
| `ai:ai-queue-badge` | Per-item state |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-control-bar.agent.json`](ai-control-bar.agent.json) → this file → [`src/components/ai/ai-control-bar.tsx`](../../../../src/components/ai/ai-control-bar.tsx)
