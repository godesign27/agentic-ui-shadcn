# AI Dialog

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** groups (AI)  
**Repo module:** `aiDialog`  
**Component type:** React group (AI message entry)  
**Status:** Stable  
**Depends On:** `components/ai/atomic/ai-dialog-button/ai-dialog-button.md`, `components/ai/tokens/color.md`, `components/ai/tokens/radius.md`, `components/ai/tokens/shadow.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI Command Center, `components/ai/organisms/ai-chat-thread-group.md`, `components/ai/pages/ai-chat-page.md`  

## Purpose

The primary entry point for all user-to-AI communication. Full card for immersive AI workspaces; slim pill for panels and compact surfaces.

**Exports:** `AIInputCard` (full card) and `AIDialogSlim` (56px pill).

Both variants share the same border state machine: neutral → focus-blue → filled-purple.

**Intent:** Use as the message composer in AI Command Center (idle and chat mode). Do not use as a generic search field — AI-specific affordances (skills, mode, mic) are required.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/components/ai/organisms/input-card/AIInputCard.tsx` | Canonical React source (full card) |
| `src/components/ai/organisms/input-card/AIDialogSlim.tsx` | Canonical React source (slim pill) |
| `@ai-design-system` | Published import path |
| `components/ai/organisms/ai-dialog/ai-dialog.md` | This mirror spec |
| `components/ai/organisms/ai-dialog/ai-dialog.agent.json` | Agent manifest |
| `components/ai/organisms/ai-dialog/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest · Execute |
| Accountability | Confidence |

## When to use

- Primary message entry point in AI Command Center (both idle and chat mode)
- `chatMode=true` for the pinned bottom variant in active conversation
- `AIDialogSlim` in panels, side drawers, and space-constrained surfaces

## When not to use

- Generic search input — has AI-specific affordances (skills, mode, mic)
- Stripping the Add or Mode controls without design review
- Replacing with a standard Field or Textarea

## Anatomy

| Part | Shared | Notes |
|------|--------|-------|
| Card container | Unique | White surface, 1.5px border, dynamic shadow. Border-radius transitions between `AI.radius.lg` (empty) and `AI.radius.md` (chat). |
| Textarea | Shared | Borderless, auto-growing. Open Sans 15px. `max-height: 240px` before scroll. |
| Toolbar row | Unique (full) | **Ghost `AIDialogButton`** controls: Add · Skills · Agent (mode) · spacer · Mic · gradient Send |
| Add menu | Shared | Floating panel with icon rows: paperclip **Add files**, folder **Add to project** `›`, bolt **Skills** `›`. `NEUTRAL.menuHoverBg` on hover. |
| Mode dropdown | Unique (full) | Agent / Plan / Ask — **`AIDialogButton`** label + chevron with `isOpen` |
| Skills picker | Unique (full) | **`AIDialogButton`** with `/` icon + "Skills" label |
| Send button | Shared | **Not `AIDialogButton`** — circular 32px control with **`ArrowRight`** icon (not paper-plane). Gradient when populated; `#E8E7EA` when empty. |
| Slim pill shell | Unique (slim) | 56px height, pill border-radius. `+` opens combined Add/Mode menu. Right button toggles Mic ↔ Send. |

## Toolbar menus

All three left-toolbar triggers ship with built-in popover menus. Position: `absolute`, `bottom: calc(100% + 8px)`, above the toolbar. Close on outside click or item selection.

### Add menu

| Item | Icon | Indicator | Action |
|------|------|-----------|--------|
| Add files | Paperclip | — | Attach files to prompt |
| Add to project | Folder + | Chevron right `›` | Opens project picker sub-menu |
| Skills | Lightning bolt | Chevron right `›` | Opens `SkillMenu` picker |

Each row: leading Lucide icon, label, optional trailing chevron. `NEUTRAL.menuHoverBg` on hover.

### Skills menu (`SkillMenu`)

Slash-picker with skill rows (icon + title + description). Footer: *"Select a skill to add it to your prompt"*.

### Mode dropdown (`ModeDropdown`)

| Option | Description |
|--------|-------------|
| Agent | Default autonomous mode — checkmark on selected |
| Plan | Planning mode before execution |
| Ask | Q&A mode |

Pass dropdown open state to `AIDialogButton` via `isOpen`. Chevron rotates 180° when open.

## Variants

| Variant | Export | Description |
|---------|--------|-------------|
| `full` | `AIInputCard` | Growing textarea with Ghost `AIDialogButton` toolbar (Add, Skills, Agent mode, Mic) + gradient Send |
| `slim` | `AIDialogSlim` | 56px pill — combined Add/Mode menu; right button toggles Mic and Send |

## States

### Full card (`AIInputCard`)

| State | Visual | Use |
|-------|--------|-----|
| empty | Placeholder visible, send button muted, large border-radius (`AI.radius.lg`) | Idle composer |
| focused | Focus ring via `AI.shadow.input.focus`. Border → `AI.color.border.focus` | User typing / field focused |
| filled | Send button activates with gradient fill. Border → `AI.color.action.primary` | Ready to submit |
| chat | Reduced border-radius (`AI.radius.md`) when pinned below conversation thread | Active conversation (`chatMode=true`) |

### Slim pill (`AIDialogSlim`)

| State | Visual | Use |
|-------|--------|-----|
| empty | 56px pill, Mic on right, `+` opens combined Add/Mode menu | Compact idle |
| filled | Right button transitions Mic → ArrowUp with gradient fill | Ready to submit |

## Border state machine

The card border transitions through three states as the user interacts:

1. **Empty** — `rgba(26,22,40,0.18)` — neutral dark-with-opacity border  
2. **Focused** — `rgba(90,109,255,0.45)` — BRAND brand tinted border + elevated shadow  
3. **Filled** — `AI.color.action.primary` (`#5A6DFF`) — fully branded border; send button activates  

## Color Tokens

### Card border

| Token | Value | Usage |
|-------|-------|-------|
| `ai-input.border.color.default` | `rgba(26,22,40,0.18)` | Empty state border |
| `ai-input.border.color.focus` | `rgba(90,109,255,0.45)` | Focus ring accent |
| `ai-input.border.color.filled` | `AI.color.action.primary` `#5A6DFF` | Filled border |

### Card shadow

| Token | Value | Usage |
|-------|-------|-------|
| `ai-input.shadow.default` | `0 0 0 1.5px rgba(26,22,40,0.18), 0 8px 40px rgba(0,0,0,0.07)` | Resting elevation |
| `ai-input.shadow.focus` | `0 0 0 2px rgba(90,109,255,0.35), 0 12px 48px rgba(0,0,0,0.10)` | Focus elevation |

### Send button

| Token | Value | Usage |
|-------|-------|-------|
| `ai-send.surface.filled` | `linear-gradient(135deg, #7A8CFF 0%, #5A6DFF 100%)` | Send button gradient when populated |
| `ai-send.surface.empty` | `#E8E7EA` | Send button muted when empty |

### Shape

| Token | Value | Usage |
|-------|-------|-------|
| `ai-input.border.radius.empty` | `AI.radius.lg` `20px` | Empty state border-radius |
| `ai-input.border.radius.chat` | `AI.radius.md` `16px` | Chat state border-radius |

## AI-Specific Behavior

### Submit message

1. User enters text in textarea
2. Border transitions empty → focused → filled
3. User clicks Send (or Enter) → `onSend(trimmedText)` fires
4. Textarea clears; border returns to empty/focused state

### Chat mode

1. Parent sets `chatMode=true` when composer is pinned below active thread
2. Border-radius reduces from `AI.radius.lg` to `AI.radius.md`
3. All other affordances remain unchanged

### Slim variant

1. `+` button opens combined Add/Mode menu (replaces separate toolbar controls)
2. Right button shows Mic when empty; transitions to gradient Send when text is entered

## Accessibility Requirements

- Textarea must have an accessible label or `aria-label` (e.g. “Message Guild”)
- Send button disabled visually and functionally when input is empty
- Mic and Add controls require accessible names
- Mode dropdown must expose selected mode to assistive tech
- Honor `prefers-reduced-motion` for border/shadow transitions

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSend` | `(text: string) => void` | — | Called with trimmed message text when the user submits |
| `chatMode` | `boolean?` | `false` | When true, uses smaller border-radius (`AI.radius.md`) for pinned chat variant |

## JavaScript / React API

```tsx
import { AIInputCard } from '@ai/organisms/input-card/AIInputCard';
import { AIDialogSlim } from '@ai/organisms/input-card/AIDialogSlim';
import { AIDialogButton } from '@ai/atomic/dialog-button/AIDialogButton';
import { Plus, ArrowRight, Mic, ChevronDown, Check, Paperclip, FolderPlus, Zap, ChevronRight } from 'lucide-react';

<AIInputCard onSend={(text) => sendMessage(text)} />
<AIInputCard chatMode onSend={(text) => sendMessage(text)} />
<AIDialogSlim onSend={(text) => sendMessage(text)} />
```

## Canonical implementation (copy exactly)

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { Plus, ArrowRight, Mic, ChevronDown, Check, Paperclip, FolderPlus, Zap, ChevronRight } from 'lucide-react';
import { AIDialogButton } from '@ai/atomic/dialog-button/AIDialogButton';

const AI = {
  color: { action: { primary: '#5A6DFF' }, border: { focus: '#7A8CFF' } },
  gradient: { action: { full: 'linear-gradient(135deg, #7A8CFF 0%, #5A6DFF 100%)' } },
  shadow: {
    input: {
      default: '0 0 0 1.5px rgba(26,22,40,0.18), 0 8px 40px rgba(0,0,0,0.07)',
      focus:   '0 0 0 2px rgba(90,109,255,0.35), 0 12px 48px rgba(0,0,0,0.10)',
    },
  },
  radius: { lg: '20px', md: '16px' },
};

const ADD_MENU = [
  { label: 'Add files', icon: Paperclip, submenu: false },
  { label: 'Add to project', icon: FolderPlus, submenu: true },
  { label: 'Skills', icon: Zap, submenu: true, opensSkills: true },
];

const SKILLS = [
  { title: 'Oncology Q3', description: 'Q3 oncology segment alignment data' },
  { title: 'Market Access', description: 'Payer coverage and formulary insights' },
];

interface AIInputCardProps {
  onSend:     (text: string) => void;
  chatMode?:  boolean;
}

export function AIInputCard({ onSend, chatMode = false }: AIInputCardProps) {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [mode, setMode] = useState<'Agent' | 'Plan' | 'Ask'>('Agent');
  const [addOpen, setAddOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const filled = value.trim().length > 0;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setAddOpen(false);
        setSkillsOpen(false);
        setModeOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function closeMenus() {
    setAddOpen(false);
    setSkillsOpen(false);
    setModeOpen(false);
  }

  function handleSend() {
    if (!filled) return;
    onSend(value.trim());
    setValue('');
  }

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: 0,
    background: '#fff',
    border: '1px solid #DEDCDE',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    padding: '6px',
    minWidth: '180px',
    zIndex: 20,
  };

  return (
    <div ref={rootRef} style={{
      background: '#fff',
      borderRadius: chatMode ? AI.radius.md : AI.radius.lg,
      boxShadow: focus ? AI.shadow.input.focus : AI.shadow.input.default,
      border: `1.5px solid ${filled ? AI.color.action.primary : focus ? AI.color.border.focus : 'rgba(26,22,40,0.18)'}`,
      transition: 'box-shadow 0.15s, border-color 0.15s',
      overflow: 'visible',
    }}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Message Guild Agent…"
        rows={1}
        style={{
          width: '100%', resize: 'none', border: 'none', outline: 'none',
          padding: '14px 16px 8px', fontFamily: '"Open Sans", sans-serif',
          fontSize: '15px', color: '#1A1628', background: 'transparent',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', padding: '6px 10px 10px', gap: '6px' }}>
        <div style={{ position: 'relative' }}>
          <AIDialogButton
            icon={<Plus size={16} strokeWidth={2} />}
            aria-label="Add content"
            isOpen={addOpen}
            onClick={() => { setAddOpen(v => !v); setSkillsOpen(false); setModeOpen(false); }}
          />
          {addOpen && (
            <div style={menuStyle} role="menu">
              {ADD_MENU.map(({ label, icon: Icon, submenu, opensSkills }) => (
                <button
                  key={label}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    if (opensSkills) { setSkillsOpen(true); }
                    closeMenus();
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    border: 'none', background: 'transparent', padding: '10px 12px',
                    borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#2F2C3C',
                  }}
                >
                  <Icon size={16} strokeWidth={2} color="#5b5864" />
                  <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
                  {submenu && <ChevronRight size={14} color="#87848D" strokeWidth={2} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <AIDialogButton
            icon={<span style={{ fontFamily: 'monospace', fontWeight: 700 }}>/</span>}
            label="Skills"
            isOpen={skillsOpen}
            onClick={() => { setSkillsOpen(v => !v); setAddOpen(false); setModeOpen(false); }}
          />
          {skillsOpen && (
            <div style={{ ...menuStyle, minWidth: '280px', padding: '8px' }} role="menu">
              {SKILLS.map((skill) => (
                <button key={skill.title} type="button" role="menuitem" onClick={closeMenus}
                  style={{ display: 'flex', gap: '10px', width: '100%', textAlign: 'left', border: 'none',
                    background: 'transparent', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                  <span style={{ color: '#2F6F7B', fontSize: '16px' }}>▤</span>
                  <span>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#2F2C3C' }}>{skill.title}</div>
                    <div style={{ fontSize: '12px', color: '#716E79' }}>{skill.description}</div>
                  </span>
                </button>
              ))}
              <div style={{ borderTop: '1px solid #DEDCDE', marginTop: '4px', padding: '8px 10px 4px',
                fontSize: '11px', color: '#87848D' }}>
                Select a skill to add it to your prompt
              </div>
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <AIDialogButton
            label={mode}
            trailingIcon={<ChevronDown size={12} style={{ transform: modeOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />}
            isOpen={modeOpen}
            onClick={() => { setModeOpen(v => !v); setAddOpen(false); setSkillsOpen(false); }}
          />
          {modeOpen && (
            <div style={menuStyle} role="menu">
              {(['Agent', 'Plan', 'Ask'] as const).map((opt) => (
                <button key={opt} type="button" role="menuitem"
                  onClick={() => { setMode(opt); setModeOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                    border: 'none', background: 'transparent', padding: '8px 10px', borderRadius: '8px',
                    fontSize: '13px', cursor: 'pointer', color: '#2F2C3C' }}>
                  {opt}
                  {mode === opt && <Check size={14} color="#5A6DFF" strokeWidth={2.5} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <AIDialogButton icon={<Mic size={16} strokeWidth={2} />} aria-label="Voice input" />
        <button
          onClick={handleSend}
          aria-label="Send message"
          style={{
            width: '32px', height: '32px', borderRadius: '50%', border: 'none',
            cursor: filled ? 'pointer' : 'default',
            background: filled ? AI.gradient.action.full : '#E8E7EA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s', flexShrink: 0,
          }}
        >
          <ArrowRight size={16} color={filled ? '#fff' : '#B2B0B6'} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
```

> **Note:** `AIDialogSlim` source is in the same package folder. Copy from canonical package — do not recreate the slim variant from memory.

## Agent rules

1. **Use Ghost `AIDialogButton` for toolbar** — Add, Skills, Agent, Mic per `ai-dialog-button.md`.
2. **Send uses `ArrowRight`** — circular 32px control; not `SendHorizontal` / paper-plane icon.
3. **Built-in menus** — Add, Skills, and Mode dropdowns with `isOpen` on `AIDialogButton`.
4. **Use `chatMode=true`** only for pinned bottom composer in active conversation.
5. **Border state machine** — empty → focused → filled; transitions must use documented token values.
6. **Two variants** — `AIInputCard` for immersive workspaces; `AIDialogSlim` for compact surfaces.
7. Import from canonical package — do not rebuild composer chrome ad hoc.

Full agent contract: `components/ai/organisms/ai-dialog/ai-dialog.agent.json`.

## Do's and Don'ts

- Do use as the primary message entry in AI Command Center.
- Do set `chatMode=true` when pinning below an active thread.
- Do use `AIDialogSlim` in panels and drawers with limited space.
- Don't use as a search input.
- Don't remove Add or Mode controls without design review.
- Don't substitute a standard Field.

## Related Components

- `components/ai/atomic/ai-dialog-button/ai-dialog-button.md` — Ghost toolbar buttons (Add, Skills, Agent, Mic)
- `components/ai/organisms/ai-chat-thread-group.md` — typical parent assembly
- `components/ai/pages/ai-chat-page.md` — full-page chat pattern
