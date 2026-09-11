# AI Agent Drawer

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiAgentDrawer`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The canonical AI assistant panel content. Bring Guild Agent into any surface — the header, conversation thread, quick suggestion chips, and input are all in one composable group.

AIAgentDrawer is the composable interior content for the Guild Agent side panel. It renders the full Guild Agent experience — branded header, welcome message bubble, conversation thread, contextual quick suggestion chips, and the shared AIInputCard — without imposing any positioning, sizing, or drawer shell constraints. This makes it independently usable in any container: a docked drawer, a floating panel, a modal, or an embedded section. The ai-assisted-side-drawer page pattern uses this component for its interior content. A `variant="focused-dialog"` swap replaces the bottom AIInputCard toolbar with the AIDialogSlim pill (+ · Message · Mic) for tighter drawer surfaces where the full toolbar is overkill. A `variant="hanging-panel"` lifts the drawer off the edge into a draggable floating panel — header carries a grab handle (drag to move) and a dock icon that snaps the panel back to the docked side position. Orthogonal to variant, `headerTone="dark"` repaints only the header bar to an inverse brand-ink surface (white title + icons) while the chat body stays light.

**Export:** `AIAgentDrawer` (co-located TSX — no package required)

## Source (canonical implementation)

| Path | Role |
|------|------|
| `components/ai/organisms/ai-agent-drawer/AIAgentDrawer.tsx` | Canonical React source |
| `components/ai/tokens/ai-tokens.ts` · `ai-typography.ts` | Tokens |
| `components/ai/tokens/css/ai-surface.css` | Surface CSS vars (`--ai-card-bg`, `--ai-chip-*`, …) |
| `components/ai/organisms/ai-agent-drawer/ai-agent-drawer.md` | This mirror spec |
| `components/ai/organisms/ai-agent-drawer/ai-agent-drawer.agent.json` | Agent manifest |
| `components/ai/organisms/ai-agent-drawer/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted |
| AI behavior | Suggest · Explain · Guide · Ask · Summarize |
| Accountability | Sources · Rationale · Feedback · User control · Context awareness |

## When to use

- Inside the ai-assisted-side-drawer as the standard panel content
- Inside a floating panel overlay when the full drawer shell is not needed
- Any surface embedding the Guild Agent conversation experience

## When not to use

- As a standalone page — it has no min-height and requires a parent container with defined height
- When you need the full drawer shell with resize handle — use ai-assisted-side-drawer instead

## Anatomy

1. **Header bar** _(Unique)_ — AIAvatar (30px) + agent title + optional history/more-options buttons + close button. `headerTone="dark"` repaints the bar to brand-ink with white title + icons; the light chat body is unchanged.
2. **Chat area** _(Unique)_ — Scrollable flex-1 area; light panel surface. Welcome bubble always at top.
3. **Welcome bubble** _(Unique)_ — White card with greeting copy only (no nested avatar / agent name — identity lives in the header).
4. **Quick suggestion chips** _(Shared)_ — `AIButton` `variant="secondary"` pills (icon + label) visible only before any messages; populate input on click. Default icons: File, RiArrowRightUpLine, RiPulseLine, Idea.
5. **Input** _(Shared)_ — `AIInputCard` (default) or `AIDialogSlim` (`focused-dialog` / `hanging-panel`) with hasMessages state-aware toolbar.

## State variations

- **Welcome** _(messages=0)_ — Welcome bubble + quick suggestion chips visible. No conversation yet.
- **Chips visible** _(messages=0)_ — Chips are shown as pre-filled shortcut suggestions above the input.
- **Conversation active** _(messages>0)_ — Thread renders below welcome bubble. Chips hidden. Scroll to latest.
- **Responding** _(loading=true)_ — ThinkingIndicator or GettingInfoIndicator shows below last user message.
- **Focused dialog input** _(variant=focused-dialog)_ — Bottom input row switches from the full AIInputCard toolbar to the AIDialogSlim pill (+ · Message · Mic). Used in tighter drawer surfaces where the full toolbar is overkill.
- **Hanging panel** _(variant=hanging-panel)_ — Floating, draggable panel detached from the page edge — rounded corners, drop shadow, focused-dialog input. Header carries a grab handle (drag to move) and a dock icon that toggles between docked (RiSidebarFoldLine) and floating (RiSidebarUnfoldLine). Closing the panel resets to the floating layout so the next open is always hanging.
- **Dark header** _(headerTone=dark)_ — Inverse brand-ink header bar with white title + icons over the same light chat body. Orthogonal to variant. Pair with `onHistory` for the clock/recent-chats affordance.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Guild Agent"` | Agent name shown in the header. |
| `greeting` | `string` | `built-in` | Welcome message text inside the first message bubble. |
| `quickSuggestions` | `string[] \| {icon,label}[]` | `4 defaults` | Chip labels shown when no conversation exists yet. |
| `width` | `number` | `380` | Informational width hint; layout is controlled by the parent container. |
| `variant` | `'default' \| 'focused-dialog' \| 'hanging-panel'` | `'default'` | Input widget + panel chrome. Orthogonal to `headerTone`. |
| `headerTone` | `'light' \| 'dark'` | `'light'` | Header surface treatment. `"dark"` repaints only the header bar to brand-ink. |
| `onHistory` | `() => void` | `undefined` | Chat-history (clock) callback. If omitted, the history icon is not rendered. |
| `onClose` | `() => void` | `undefined` | Close callback. If omitted, the × button is not rendered. |
| `onMoreOptions` | `() => void` | `undefined` | More-options (⋯) button callback. |

## Tokens

### Panel surface
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg-raised` | `#F9F8FA` | Panel background |
| `--ai-card-bg` | `#ffffff` | Welcome bubble / header (light) |

### Header
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-divider` | `rgba(0,0,0,0.06)` | Header bottom divider (light tone) |

### Header · dark
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brandInk` | `#1F2A66` | Dark header background |
| `AI.color.text.onAction` | `#FFFFFF` | Dark header title + icons |

### Chip
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-chip-border` | `rgba(0,0,0,0.12)` | Default chip border |
| hover border | `rgba(77, 96, 230,0.4)` | Chip border on hover |

### Avatar (hard rule)
| Fill | Token / value |
| --- | --- |
| Outer | `AI.color.decorative.wash` (`#A6B4FC`) |
| Mid | `AI.color.brand` (`#4D60E6`) |
| Core | `AI.color.brandInk` (`#1F2A66`) |
| Star | white — **no orange ring, no Z letterform** |

## Flows

### Suggestion → Response
User taps a quick chip and receives an AI response
- RiUserLine taps "Summarize my reports" chip
- Input populates with chip text
- RiUserLine sends
- Chips hide
- Loading indicator
- AIPatternMessage renders

## Canonical implementation

```tsx
import { AIAgentDrawer } from './AIAgentDrawer';
// Host must load: components/ai/tokens/css/ai-surface.css

<div style={{ width: 380, height: '100%', borderLeft: '1px solid #E5E3E6' }}>
  <AIAgentDrawer
    title="Guild Agent"
    greeting="Hi Theo! I can help with your reports — summarize results, identify alignment trends, or suggest next actions."
    quickSuggestions={['Summarize my reports', 'Identify Q1 trends', 'Compare alignments', 'Suggest improvements']}
    onClose={() => setPanelOpen(false)}
  />
</div>

<AIAgentDrawer
  title="Guild Agent"
  headerTone="dark"
  onHistory={() => openRecentChats()}
  onClose={() => setPanelOpen(false)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-agent-drawer.agent.json` before implementing.
2. Do not hardcode brand hex — use `components/ai/tokens/ai-tokens.ts`.
3. Do not invent dependency atomics — fetch from sibling folders under `components/ai/`.
4. Prefer token references (`AI.color.*`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).
5. Always load `components/ai/tokens/css/ai-surface.css` so organism surface vars resolve.
6. Do **not** require `an external AI UI package` — this tree is self-contained for agents.

Full agent contract: `components/ai/organisms/ai-agent-drawer/ai-agent-drawer.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
