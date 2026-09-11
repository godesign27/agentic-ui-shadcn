# AIAvatar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — AI  
**Tier:** atoms  
**Component id:** `ai:ai-avatar`  
**Category:** AI  
**Status:** Stable  
**Import:** `@/components/ai/ai-avatar`  

## Purpose

The mark that tells a user a machine is speaking.

Three concentric BRAND-blue circles with a white monogram. Exported at two sizes: AIAvatar (34px, with a glow) for hero identity, BotAvatar (18px, no glow) for inline attribution. Identical artwork; only size and shadow differ.

## Experience metadata

This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.

| Axis | Value |
| --- | --- |
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest |
| Accountability | Attribution |
| Human gesture required | No |
| Reversible | not-applicable |

## Source

| Path | Role |
| --- | --- |
| `src/components/ai/ai-avatar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ai/ai-avatar/ai-avatar.md` | This mirror spec |
| `design-system/components/ai/ai-avatar/ai-avatar.agent.json` | Structured agent contract |
| `design-system/components/ai/ai-avatar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ai/ai-avatar/ai-avatar.preview.html` | Visual proof of every documented state |

## When to use

- Agent identity at the top of an AI surface
- Inline attribution in ai:ai-message-header
- Inside ai:ai-launcher and ai:ai-agent-stack

## When not to use

- As a human user avatar — use ui:avatar, and keep the two visually distinct
- Decoratively, anywhere that is not AI-generated
- Recoloured to match a surface — the fixed palette is what makes it recognisable

## Anatomy

| Part | Role |
| --- | --- |
| **Outer ring** | #B4BDFF — the lightest circle, r=17 |
| **Middle ring** | #5A6DFF — the BRAND blue, r=13 |
| **Inner disc** | #1F2A66 — the dark core, r=9 |
| **Monogram** | White, 9px, semibold. One character. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Hero** | `AIAvatar` | 34px with drop-shadow(0 4px 14px rgba(90,109,255,0.45)) |
| **Inline** | `BotAvatar` | 18px, no shadow. Same circles. |
| **Labelled** | `label prop set` | role="img" with an accessible name |
| **Decorative** | `no label` | aria-hidden — correct when an adjacent text label names the agent |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `number` | — | Declared in the component source. |
| `monogram` | `string` | — | Declared in the component source. |
| `glow` | `boolean` | — | The attribution affordance for the entire AI namespace. The palette is FIXED and identical in light and dark. Do not recolor it, do not use currentColor, do not add a dark: variant, and do not add a gradient ring. A user learns this mark means "a machine produced this"; if it changes with theme or context it stops being recognisable. / const RINGS = ["#B4BDFF", "#5A6DFF", "#1F2A66"] as const interface AvatarMarkProps extends React.SVGProps<SVGSVGElement> { size?: number monogram?: string /** Hero treatment. Only AIAvatar uses it. |
| `label` | `string` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`ai-avatar.agent.json`](ai-avatar.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `img` |

**Required**

- label, unless an adjacent visible text label already names the agent

**Notes**

- Without a label the SVG is aria-hidden, which is right when it sits beside the agent name in ai:ai-message-header.
- Standing alone — in ai:ai-agent-stack, say — it must carry a label naming the agent and its status.
- The fixed fills are chosen for contrast against both light and dark chrome. Do not recolour them to "fix" dark mode.

## Examples

### Inline attribution

```tsx
<BotAvatar size={20} />
<span className="text-sm font-semibold">Research agent</span>
```

### Standing alone

```tsx
<AIAvatar label="Research agent" />
```

## Agent rules

1. The palette is fixed. No currentColor, no dark: variants, no theme tokens, no gradient ring.
2. Both exports share the same artwork — only size and glow differ.
3. Label it when it stands alone; leave it aria-hidden beside a visible agent name.
4. Never use it for a human user.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Recolouring the rings
- Adding a gradient or orange ring
- Using it as a human avatar
- Decorative use on non-AI surfaces

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:avatar` | Human users |
| `ai:ai-message-header` | The usual host |
| `ai:ai-agent-stack` | Several agents at once |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`ai-avatar.agent.json`](ai-avatar.agent.json) → this file → [`src/components/ai/ai-avatar.tsx`](../../../../src/components/ai/ai-avatar.tsx)
