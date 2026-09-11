# Avatar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:avatar`  
**Category:** Data Display  
**Status:** Stable  
**Primitive:** `@radix-ui/react-avatar`  
**Import:** `@/components/ui/avatar`  

## Purpose

Identify a person or entity at a glance, and degrade gracefully when the image is missing.

Radix Avatar with automatic fallback. AvatarFallback renders only after the image fails or while it loads.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/avatar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/avatar/avatar.md` | This mirror spec |
| `design-system/components/ui/avatar/avatar.agent.json` | Structured agent contract |
| `design-system/components/ui/avatar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/avatar/avatar.preview.html` | Visual proof of every documented state |

## When to use

- User identity in a header, comment or list
- Attribution on content
- Stacked group membership

## When not to use

- Decorative imagery — use a plain img
- Logos that must not be cropped to a circle
- Any image where detail matters — this is 40px and circular

## Anatomy

`Avatar` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `AvatarImage` | `Avatar` | No | Requires alt. Radix hides it until it loads successfully. |
| `AvatarFallback` | `Avatar` | Yes | Initials or an icon. Not optional in practice — without it a failed image leaves an empty circle. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Loading** | `Image in flight` | Fallback shown |
| **Loaded** | `Image resolved` | Image replaces the fallback |
| **Error** | `Image failed` | Fallback stays |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`avatar.agent.json`](avatar.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `muted` | `bg-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `img` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Required**

- alt on AvatarImage

**Notes**

- Always give AvatarImage an alt — the person's name, not "avatar" or "profile picture".
- When the name is already visible next to the avatar, set alt="" so it is not announced twice.
- Initials in a fallback are announced letter by letter by some screen readers. With alt set correctly on the image this rarely matters.

## Examples

### With fallback

```tsx
<Avatar>
  <AvatarImage src="/ada.png" alt="Ada Lovelace" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>
```

## Agent rules

1. Always include AvatarFallback.
2. alt is the person's name, or empty if the name is already adjacent.
3. Do not use Avatar for logos or detailed imagery.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Avatar without a fallback
- alt="avatar"
- Decorative use

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:skeleton` | Loading placeholder before data arrives |
| `ai:ai-avatar` | Agent identity, with a deliberately fixed palette |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`avatar.agent.json`](avatar.agent.json) → this file → [`src/components/ui/avatar.tsx`](../../../../src/components/ui/avatar.tsx)
