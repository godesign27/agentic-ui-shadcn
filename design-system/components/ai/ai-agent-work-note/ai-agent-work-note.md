# AIAgentWorkNote

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-agent-work-note`  
**Category:** AI  
**Status:** Draft  
**Import:** `@/components/ai/ai-agent-work-note`  

## Purpose

Show what the agent is doing without exposing raw reasoning.

A collapsed disclosure carrying a status label and, when opened, a prose note or numbered steps. Quiet by default.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · AI Led |
| AI behavior | Suggest |
| Accountability | Attribution · Rationale disclosure · Audit trail |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-agent-work-note.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-agent-work-note/ai-agent-work-note.md` | This mirror spec |
| `design-system/components/ai/ai-agent-work-note/ai-agent-work-note.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-agent-work-note/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-agent-work-note/ai-agent-work-note.preview.html` | Visual proof of every documented state |

## When to use

- Disclosing intermediate agent steps
- Building trust during a long-running operation
- When a user would reasonably ask "what is it doing?"

## When not to use

- To dump raw chain-of-thought — this is disclosure, not a transcript
- Expanded by default; the user opts in
- To fill silence during a wait — use ai:ai-loading-indicators

## Anatomy

| Part | Role |
| --- | --- |
| **Trigger** | The status label plus a chevron. Disabled when there is no body. |
| **Body** | Prose and/or a numbered list, revealed on expand |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Collapsed** | `Default` | Label only. The default on purpose. |
| **Expanded** | `Click or Enter` | Body revealed, chevron rotated |
| **No body** | `No content or items` | Trigger is disabled and the chevron is hidden — nothing to open |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `status` | `WorkNoteStatus` | — | Declared in the component source. |
| `label` | `string` | — | Declared in the component source. |
| `content` | `string` | — | Declared in the component source. |
| `items` | `string[]` | — | Declared in the component source. |
| `defaultExpanded` | `boolean` | — | Declared in the component source. |
| `expanded` | `boolean` | — | Declared in the component source. |
| `onExpandedChange` | `(value: boolean) => void` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-agent-work-note.agent.json`](ai-agent-work-note.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `ai-accent` | `ring-ai-accent` |
| `ai-muted` | `text-ai-muted` |
| `ai-surface` | `bg-ai-surface`, `border-ai-surface` |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `button with aria-expanded` |

**Keyboard**

- Enter or Space — toggle

**Required**

- aria-controls, wired automatically to the body id

**Notes**

- When there is no body the trigger is genuinely disabled, so a keyboard user is not sent to a control that does nothing.
- Status labels are plain language: "Checking context", not "checkingContext".

## Examples

### Disclosed steps

```tsx
<AIAgentWorkNote
  status="planning"
  items={["Read the account history", "Compared against Q3 targets", "Ranked by expected value"]}
/>
```

## Agent rules

1. Collapsed by default.
2. What it discloses must be true — this is not progress theatre.
3. Summarise reasoning; do not paste raw model output.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Raw chain-of-thought
- Expanded by default
- Fabricated steps

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-loading-indicators` | Simple waiting |
| `ui:collapsible` | Non-AI disclosure |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-agent-work-note.agent.json`](ai-agent-work-note.agent.json) → this file → [`src/components/ai/ai-agent-work-note.tsx`](../../../../src/components/ai/ai-agent-work-note.tsx)
