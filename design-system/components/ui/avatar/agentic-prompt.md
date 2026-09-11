# Agentic Prompt — Avatar

You are implementing **Avatar** (`ui:avatar`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:avatar` |
| **Status** | Stable |
| **Tier / Category** | atoms · Data Display |
| **Import** | `@/components/ui/avatar` |
| **Exports** | `Avatar`, `AvatarFallback`, `AvatarImage` |
| **Primitive** | `@radix-ui/react-avatar` |

## What it is for

> Identify a person or entity at a glance, and degrade gracefully when the image is missing.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/avatar/avatar.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/avatar/avatar.md` — anatomy, tokens, examples
5. `src/components/ui/avatar.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always include AvatarFallback.
- alt is the person's name, or empty if the name is already adjacent.
- Do not use Avatar for logos or detailed imagery.

### Structure is not optional

```
Avatar
  AvatarImage  (optional)
  AvatarFallback
```

## Never

- Avatar without a fallback
- alt="avatar"
- Decorative use

## Task

Implement using `Avatar` exactly as the contract declares. Use only the props, variants and sizes in `avatar.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/avatar.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/avatar/avatar.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:skeleton` (Loading placeholder before data arrives) · `ai:ai-avatar` (Agent identity, with a deliberately fixed palette)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.
