# AI Assisted Side Drawer

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiAssistedSideDrawer`  
**Component type:** React page  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Contextual AI assistant panel that augments the primary workspace without replacing it. Surfaces suggestions, summaries, and explanations inline.

A page-level pattern that layers an AI assistant onto any content workspace. The interior content is always the AIAgentDrawer group (header, conversation thread, quick suggestion chips, input), and the pattern ships three companion variants that govern how that drawer is surfaced.

**Export:** `AIAssistedSideDrawer`

**Default** — Persistent right-side column visible on load with the full AIInputCard toolbar at the bottom. Best when AI guidance is central to the workflow.

**Focused dialog** — Same persistent drawer shell, but the bottom input row collapses to the AIDialogSlim pill (+ · Message Guild Agent… · RiMicLine). Best when the full toolbar is overkill — narrower drawers, secondary surfaces.

**Hanging panel** — Drawer detaches from the edge into a floating, draggable card. Header carries a grab handle for repositioning and a dock icon that snaps the panel back to the docked side position. Best when AI is supplementary and page space is at a premium.

All three variants share the same AIAgentDrawer interior, the same conversation state, and the same prompt + handoff architecture — only the shell and the input affordance differ.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/pages/ai-assisted-side-drawer/AIAssistedSideDrawer.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-assisted-side-drawer/ai-assisted-side-drawer.md` | This mirror spec |
| `components/ai/pages/ai-assisted-side-drawer/ai-assisted-side-drawer.agent.json` | Agent manifest |
| `components/ai/pages/ai-assisted-side-drawer/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted |
| AI behavior | Suggest · Explain · Guide · Summarize · Ask · Recommend |
| Accountability | Sources · Rationale · Assumptions · Feedback · User control · Docking state · Context awareness |

## When to use

- Use Standard Panel when AI guidance is integral to the page workflow
- Use Floating Panel when AI is supplementary and page space is limited

## When not to use

- Do not use when the AI interaction is the primary page purpose — use AICommandCenter instead
- Do not use Standard Panel on narrow viewports — prefer Floating Panel

## Anatomy

1. **App content area** _(Shared)_ — Primary workspace — never obscured by the docked drawer.
2. **Drawer shell** _(Unique)_ — Persistent right column, default 380px, resizable via left-edge drag handle. Becomes a floating card in the hanging-panel variant.
3. **Left-edge resize handle** _(Unique)_ — Docked variants only — drag to resize; Arrow keys when focused; double-click to reset to default width.
4. **Hanging panel container** _(Unique)_ — Hanging-panel variant only — fixed-position card draggable from any point in the header strip.
5. **Grab handle** _(Unique)_ — Hanging-panel variant only — header carries the grab handle (drag to move) and the dock icon.
6. **AIAgentDrawer interior** _(Shared)_ — The composable AI Agent Drawer group — header, welcome bubble, conversation thread, quick chips, and input — rendered identically in all three variants.
7. **Dock toggle icon** _(Unique)_ — Hanging-panel variant only — RiSidebarUnfoldLine / RiSidebarFoldLine; tooltip "Dock as side drawer" / "Open as floating panel"; swaps between hanging-panel and default.
8. **Close icon** _(Shared)_ — Close icon; hides the panel without clearing conversation state. Closing the hanging-panel resets to the hanging layout so the next open is always floating.
9. **Bottom input row** _(Shared)_ — Either the full AIInputCard toolbar (default) or the AIDialogSlim pill (focused-dialog and hanging-panel by default). Inherited from the AIAgentDrawer variant prop.
10. **Quick suggestion chips** _(Shared)_ — Four prompt chips below the thread before any messages have been sent. Identical across all three variants.

## State variations

- **Default — docked** _(variant="default")_ — Persistent right drawer visible on load with the full AIInputCard toolbar. Resize handle is subtle until hovered. The base configuration.
- **Default — at minimum width** _(variant="default")_ — Width locked at min (320px). Orange top accent bar. Handle shows "Minimum width" tooltip.
- **Default — responding** _(variant="default")_ — ThinkingIndicator / GettingInfoIndicator animates below the latest user message while the AI is generating.
- **Focused dialog** _(variant="focused-dialog")_ — Same docked drawer, bottom input row collapses to the AIDialogSlim pill (+ · Message · RiMicLine). Used where the full toolbar is overkill — tighter drawer surfaces.
- **Hanging panel — floating** _(variant="hanging-panel")_ — Drawer is detached from the edge into a draggable floating card with rounded corners and a soft drop shadow. Header carries a grab handle and a RiSidebarFoldLine dock icon.
- **Hanging panel — dock-back hover** _(variant="hanging-panel")_ — Dock icon highlights with the brand surface tint; tooltip reads "Dock as side drawer". Click snaps the panel back to the default docked layout while preserving conversation.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "focused-dialog" \| "hanging-panel"` | `"default"` | Inherits from the AIAgentDrawer variant model. "default" = docked drawer + full input toolbar; "focused-dialog" = docked drawer + AIDialogSlim pill; "hanging-panel" = floating, draggable card with grab handle + dock toggle. |
| `chat` | `ChatState` | `required` | Lifted chat state shared across variants — switching variants preserves the conversation. |
| `initialWidth` | `number` | `380` | Default drawer width in px. Honored by "default" and "focused-dialog" (docked shell only). |
| `onDock` | `() => void` | `—` | "hanging-panel" only: called when the dock icon is clicked — caller flips variant to "default". |
| `onUndock` | `() => void` | `—` | Docked variants: called when the user lifts the drawer off the edge — caller flips variant to "hanging-panel". |
| `onClose` | `() => void` | `—` | Hides the panel without clearing conversation state. Closing the hanging panel resets it to the floating layout so the next open is always hanging. |
| `aria-label (dock btn)` | `"Dock as side drawer"` | `required` | Accessible label on the RiSideBarLine dock icon button (hanging-panel variant). |

## Tokens

### Panel Surface
| Token | Value | Usage |
| --- | --- | --- |
| `ai-panel.background` | `#FFFFFF` | Panel background — white contrasts with page neutral surface |
| `ai-panel.border` | `AI.color.brandBorder (#BECAFE)` | Left separator (Standard) and container border (Floating) |
| `ai-panel.width.default` | `380px` | Default width of the Standard Drawer |
| `ai-panel.width.min` | `max(320, 75% of default)` | Minimum locked width — orange accent bar appears at this point |
| `ai-panel.width.max` | `min(640px, 50vw)` | Maximum expansion for wider AI content review |
| `ai-panel.floating.shadow` | `0 8px 32px rgba(26,22,40,0.14)` | Elevation shadow for floating panel |

### Dock Icon
| Token | Value | Usage |
| --- | --- | --- |
| `dock-btn.aria-label` | `"Dock as side drawer"` | Required accessible label on the RiSideBarLine icon button |
| `dock-btn.focus-ring` | `2px solid #4D60E6` | Visible focus outline — 2px brand blue, 1px offset |
| `dock-btn.hover-bg` | `AI.color.brandSurface (#F5F6FF)` | Button background on hover |

### AI Tokens (inherited)
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#4D60E6` | Send button gradient, focus ring, active chip border |
| `AI.color.brandSurface` | `#F5F6FF` | User bubble background, hover state background |
| `AI.color.brandBorder` | `#BECAFE` | Chip borders, input border, dividers |
| `SIGNAL_ORANGE[60]` | `#EC7200` | Minimum width accent bar — only for locked/at-min state |

## Flows

### Floating → dock → Standard
User docks the floating panel into the persistent side drawer while preserving conversation.
- Floating Panel is open with conversation in progress
- User hovers or focuses the RiSideBarLine icon in the header
- AITooltip appears: "Dock as side drawer"
- User clicks (or presses Enter/Space on the focused button)
- onDock() fires → parent sets variant = "standard"
- StandardDrawer mounts with the shared chat state intact
- Conversation thread is identical to what was in the Floating Panel

### Standard resize flow
User resizes the Standard drawer via mouse drag or keyboard.
- User hovers left edge → resize handle highlights, tooltip appears
- Drag left → drawer grows wider; drag right → narrower
- Width updates live; overlay shows current px value
- Release → width saved for session
- At minimum: orange accent bar appears, tooltip updates to "Minimum width"
- Double-click handle → resets to default 380px
- Keyboard focus on handle → Arrow keys resize in 8px increments; Shift+Arrow = 40px

## Canonical implementation

```tsx
// AI Assisted Side Panel — Standard variant skeleton
import { AIInputCard }         from '@/components/ai/organisms/ai-dialog/AIDialog';
import { BotAvatar }           from '@/components/ai/atomic/avatar/AIAvatar';
import { UserBubble }          from '@/components/ai-chat-patterns';
import { useAIChat }           from '@/components/ai/_support/useAIChat';

export function PageWithStandardPanel() {
  const { messages, inputValue, setInputValue, sendMessage } = useAIChat();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* page content */}
      </main>
      <aside style={{ width: 360, borderLeft: '1px solid rgba(26,22,40,0.10)',
                      display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {messages.map(msg =>
            msg.role === 'user'
              ? <UserBubble key={msg.id} text={msg.text} />
              : <AIPatternMessage key={msg.id} message={msg} />
          )}
        </div>
        <div style={{ padding: 12 }}>
          <AIInputCard inputValue={inputValue} onInputChange={setInputValue}
            onSend={sendMessage} hasMessages={messages.length > 0} />
        </div>
      </aside>
    </div>
  );
}
```

## Agent rules

1. Read this mirror spec and `ai-assisted-side-drawer.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-assisted-side-drawer/ai-assisted-side-drawer.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
