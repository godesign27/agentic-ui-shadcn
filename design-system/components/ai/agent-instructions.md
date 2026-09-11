# AI components — agent source of truth

**This is the shadcn/ui implementation repo.** Governed AI kit components stay at `src/components/ai/{slug}.tsx` with specs in `design-system/components/ai/{slug}/`. The imported ZAIDYN AI library uses the zds-ai folder architecture.

Folder tiers (aligned to the AI Pattern Library docs-site sidebar — do **not** use a `groups/` folder):

```
src/components/ai/                         # runtime
  {slug}.tsx                               # governed shadcn ports (UI Kit)
  foundations/ atomic/ molecules/ organisms/ patterns/ pages/ data-viz/ tokens/ _support/

design-system/components/ai/               # specs
  {slug}/                                  # governed four-file contracts
  foundations/ atomic/ molecules/ organisms/ patterns/ pages/ data-viz/ tokens/ _support/
```

Canonical membership + **within-section order** for the imported library live in [`registry.v1.2.json`](registry.v1.2.json) (`libOrder`). The governed shadcn kit is indexed by [`llms.txt`](llms.txt) (generated).

Imported module folders hold:

| File | Role |
|------|------|
| `{slug}.md` | Narrative mirror spec |
| `{slug}.agent.json` | Machine contract (`authority.source` points at `src/`) |
| `agentic-prompt.md` | Copy-paste agent brief |
| `{slug}.preview.html` | Standalone HTML preview |

Runtime TSX lives under `src/components/ai/{tier}/{slug}/` with relative imports. Do not invent a `groups/` tier.

## Import pattern

Governed shadcn ports:

```tsx
import { AIButton } from '@/components/ai/ai-button'
```

Imported zds-ai architecture:

```tsx
import { AI, F } from '@/components/ai/tokens/ai-tokens'
import { AI_TYPOGRAPHY } from '@/components/ai/tokens/ai-typography'
import { AIAvatar } from '@/components/ai/atomic/ai-avatar/AIAvatar'
```

Peer deps: `react`, `@remixicon/react`. Host CSS is loaded from `src/main.tsx`.

## Reading order

1. This file
2. [`llms.txt`](llms.txt) — governed kit
3. [`registry.v1.2.json`](registry.v1.2.json) — imported library
4. [`design.md`](design.md) — tokens, visual rules
5. [`../../../AGENT_RULES.md`](../../../AGENT_RULES.md)
6. Target module folder

## AI Avatar (critical — agents often get this wrong)

**Read first:** [`atomic/ai-avatar/agentic-prompt.md`](atomic/ai-avatar/agentic-prompt.md) → [`ai-avatar.md`](atomic/ai-avatar/ai-avatar.md)

| Rule | Detail |
|------|--------|
| **No orange gradient ring** | Three BRAND blue circles only |
| **Fixed hex fills** | Same on light and dark page chrome |
| **No dark-mode recolor** | Do not use `currentColor` or theme tokens that invert the rings |
| **Same SVG for both exports** | `AIAvatar` and `BotAvatar` share identical circles + path |

## Standard vs AI components

| Need | Use |
|------|-----|
| Button, table, nav, field | `@/components/ui/*` |
| Governed AI kit (UI Kit) | `@/components/ai/{slug}` |
| Imported AI library | `@/components/ai/{tier}/{slug}/…` |
