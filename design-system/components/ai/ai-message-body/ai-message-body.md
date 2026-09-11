# AIMessageBody

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-message-body`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-message-body`  

## Purpose

AI prose, kept plain so the interface does not lend it authority the model has not earned.

The text body of an AI response. Three sizes. Sets a polite live region while streaming so assistive technology follows the update.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-message-body.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-message-body/ai-message-body.md` | This mirror spec |
| `design-system/components/ai/ai-message-body/ai-message-body.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-message-body/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-message-body/ai-message-body.preview.html` | Visual proof of every documented state |

## When to use

- Any AI-generated prose
- Streaming responses, with streaming set while text is arriving

## When not to use

- Human-authored content
- Structured output like tables — use ui:table inside the region instead
- Without a preceding ai:ai-message-header

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The prose container. Paragraph spacing is handled; other formatting is not. |

## Sizes

| Size | Guidance |
| --- | --- |
| `sm` | 14px. Dense panels. |
| `md` | 16px. The default. |
| `lg` | 18px. Hero responses. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Static** | `streaming={false}` | No live region |
| **Streaming** | `streaming={true}` | aria-live="polite" and aria-busy, so the update is announced without interrupting |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Declared in `aiMessageBodyVariants` |
| `streaming` | `boolean` | — | AI response prose. Deliberately plain. Headings and bold inside a response make the model sound more authoritative than it is; keep emphasis for the surrounding UI. / const aiMessageBodyVariants = cva("text-foreground [&_p+p]:mt-3", { variants: { size: { sm: "text-sm leading-6", md: "text-base leading-7", lg: "text-lg leading-8", }, }, defaultVariants: { size: "md" }, }) export interface AIMessageBodyProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof aiMessageBodyVariants> { /** Set while the response is still arriving so assistive tech announces the update. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-message-body.agent.json`](ai-message-body.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `foreground` | `text-foreground` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |
| Live region | aria-live="polite" while streaming |

**Notes**

- Set streaming only while text is genuinely arriving. Leaving it on makes every later change announce.
- Announce completion too — a live region that stops updating tells the user nothing.
- Headings and bold inside a response make the model sound more certain than it is. Keep emphasis in the surrounding UI.

## Examples

### Streaming response

```tsx
<AIMessageBody streaming={isStreaming}>
  <p>{text}</p>
</AIMessageBody>
```

## Agent rules

1. Always preceded by ai:ai-message-header.
2. Set streaming only while text is arriving, and announce completion.
3. Keep formatting plain.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Human-authored content
- A body with no header
- Simulated typing delay on already-complete text

## Related components

| Component | Use it instead when |
| --- | --- |
| `ai:ai-message-header` | Required above it |
| `ai:ai-message-footer` | Actions below it |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-message-body.agent.json`](ai-message-body.agent.json) → this file → [`src/components/ai/ai-message-body.tsx`](../../../../src/components/ai/ai-message-body.tsx)
