import React, { useState, useRef, useEffect } from 'react';
import { RiAddLine, RiMicLine, RiArrowRightLine, RiArrowUpLine, RiArrowRightSLine as ChevronRightIcon } from '@remixicon/react';
import { RiAttachmentLine, RiFolderAddLine, RiFlashlightLine } from '@remixicon/react';
import { F, DS, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { SkillMenu, type Skill } from '../../_support/SkillMenu';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ── Tier 3 component tokens — ai-input.* ──────────────────────────────────────
// ai-input.surface.color              → #FFFFFF
// ai-input.border.color.default       → rgba(26,22,40,0.18)
// ai-input.border.color.focus         → rgba(77, 96, 230,0.45)
// ai-input.border.color.filled        → AI.color.action.primary
// ai-input.shadow.default             → AI.shadow.input.default
// ai-input.shadow.focus               → AI.shadow.input.focus
// ai-input.border.radius              → AI.radius.lg (always)

// ai-send.* tokens
// ai-send.surface.filled              → AI.gradient.action.full
// ai-send.surface.empty               → rgba(0,0,0,0.06)
// ai-send.border.radius               → AI.radius.full (circular when filled)

// ── Chevron right icon ────────────────────────────────────────────────────────
function RiArrowRightSLine({ hovered }: { hovered: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 3.5l4.5 4.5L6 12.5" stroke={hovered ? DS.iconHover : DS.iconDefault}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Add menu ──────────────────────────────────────────────────────────────────
const ADD_ITEMS = [
  { icon: RiAttachmentLine,  label: 'Add files',      hasArrow: false },
  { icon: RiFolderAddLine, label: 'Add to project', hasArrow: true  },
  { icon: RiFlashlightLine,        label: 'Skills',          hasArrow: true  },
] as const;

function AddMenuItem({ icon: Icon, label, hasArrow }: { icon: React.ElementType; label: string; hasArrow: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button role="menuitem"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '10px 16px',
        background: hov ? DS.menuHoverBg : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s ease',
      }}>
      <Icon size={16} color={hov ? DS.iconHover : DS.iconDefault} strokeWidth={1.8} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, ...AI_TYPOGRAPHY['@ai-menu-item'], fontFamily: F, color: 'var(--ai-ds-text)' }}>{label}</span>
      {hasArrow && <RiArrowRightSLine hovered={hov} />}
    </button>
  );
}

function AddMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  return (
    <div ref={ref} role="menu" aria-label="Add content" style={{
      position: 'absolute', bottom: 'calc(100% + 8px)', left: '0',
      width: '224px', background: 'var(--ai-card-bg)', borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.12)',
      border: '1px solid var(--ai-card-border)', overflow: 'hidden', zIndex: 100,
      paddingTop: '4px', paddingBottom: '4px',
    }}>
      {ADD_ITEMS.map(item => <AddMenuItem key={item.label} {...item} />)}
    </div>
  );
}

// ── Mode dropdown (Agent / Plan / Ask) ────────────────────────────────────────
const MODE_ITEMS = ['Agent', 'Plan', 'Ask'] as const;
type AIMode = typeof MODE_ITEMS[number];

// Chevron for the mode trigger
function ModeChevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
      style={{ transition: 'transform 0.15s ease', transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ModeDropdown() {
  const [active, setActive] = useState<AIMode>('Agent');
  const [open, setOpen]     = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <AIButton
        variant="secondary"
        label={active}
        trailingIcon={<ModeChevron open={open} />}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      />

      {open && (
        <div role="listbox" style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '0',
          minWidth: '120px', background: 'var(--ai-card-bg)', borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 12px 36px rgba(0,0,0,0.11)',
          border: '1px solid var(--ai-card-border)', overflow: 'hidden',
          paddingTop: '4px', paddingBottom: '4px', zIndex: 100,
        }}>
          {MODE_ITEMS.map(mode => (
            <ModeOption key={mode} mode={mode} isActive={active === mode}
              onSelect={() => { setActive(mode); setOpen(false); }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModeOption({ mode, isActive, onSelect }: { mode: AIMode; isActive: boolean; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button role="option" aria-selected={isActive}
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '9px 14px',
        background: hov ? DS.menuHoverBg : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s ease',
      }}>
      <span style={{ flex: 1, ...AI_TYPOGRAPHY['@ai-menu-item'], fontFamily: F, fontWeight: isActive ? 600 : 400, color: 'var(--ai-ds-text)' }}>{mode}</span>
      {isActive && (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 6.5l3.5 3.5 6-6" stroke={AI.color.action.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Slash icon for Skills button ──────────────────────────────────────────────
const SkillsSlash = (
  <span style={{
    fontFamily: '"SF Mono", "Fira Code", "Roboto Mono", monospace',
    fontSize: '13px',
    fontWeight: 700,
    color: 'currentColor',
    lineHeight: 1,
    letterSpacing: '-0.5px',
  }}>
    /
  </span>
);

// ── Slim dialog helpers ───────────────────────────────────────────────────────
const SLIM_ADD_ITEMS = [
  { icon: RiAttachmentLine,  label: 'Add files',      hasArrow: false },
  { icon: RiFolderAddLine, label: 'Add to project', hasArrow: true  },
  { icon: RiFlashlightLine,        label: 'Skills',          hasArrow: true  },
] as const;

const SLIM_MODE_ITEMS = ['Agent', 'Plan', 'Ask'] as const;
type SlimMode = typeof SLIM_MODE_ITEMS[number];

function SlimPlusMenuItem({ icon: Icon, label, hasArrow, onClick }: {
  icon: React.ElementType; label: string; hasArrow: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 14px',
        background: hov ? DS.menuHoverBg : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s' }}>
      <Icon size={15} color={hov ? DS.iconHover : DS.iconDefault} strokeWidth={1.8} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, ...AI_TYPOGRAPHY['@ai-menu-item'], fontFamily: F, color: 'var(--ai-ds-text)' }}>{label}</span>
      {hasArrow && <ChevronRightIcon size={13} color={DS.iconDefault} />}
    </button>
  );
}

function SlimModeItem({ label, isActive, onSelect }: { label: string; isActive: boolean; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onSelect} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 14px',
        background: hov ? DS.menuHoverBg : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.12s' }}>
      <span style={{ flex: 1, ...AI_TYPOGRAPHY['@ai-menu-item'], fontFamily: F, fontWeight: isActive ? 600 : 400, color: 'var(--ai-ds-text)' }}>{label}</span>
      {isActive && (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 6.5l3.5 3.5 6-6" stroke={AI.color.action.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function SlimPlusMenu({ mode, onModeChange, onClose }: { mode: SlimMode; onModeChange: (m: SlimMode) => void; onClose: () => void; }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, width: '220px',
      background: 'var(--ai-card-bg)', borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.12)',
      border: '1px solid var(--ai-card-border)', overflow: 'hidden', zIndex: 100 }}>
      <div style={{ padding: '6px 0 2px', borderBottom: '1px solid var(--ai-card-border)' }}>
        <div style={{ padding: '4px 14px 6px', fontFamily: F, fontSize: '10px', color: DS.textHelper, letterSpacing: '0.05em' }}>ADD CONTENT</div>
        {SLIM_ADD_ITEMS.map(({ icon, label, hasArrow }) => (
          <SlimPlusMenuItem key={label} icon={icon} label={label} hasArrow={hasArrow} onClick={onClose} />
        ))}
      </div>
      <div style={{ padding: '6px 0' }}>
        <div style={{ padding: '4px 14px 6px', fontFamily: F, fontSize: '10px', color: DS.textHelper, letterSpacing: '0.05em' }}>MODE</div>
        {SLIM_MODE_ITEMS.map(m => (
          <SlimModeItem key={m} label={m} isActive={mode === m} onSelect={() => { onModeChange(m); onClose(); }} />
        ))}
      </div>
    </div>
  );
}

// ── Slim variant (single-line pill) ──────────────────────────────────────────
export interface AIDialogSlimProps {
  inputValue?: string;
  onInputChange?: (v: string) => void;
  onSend?: () => void;
  maxWidth?: string;
}

/** Demo dialog input defaults for bare mounts / galleries. */
export const SAMPLE_DIALOG_INPUT = '';

export function AIDialogSlim({
  inputValue = SAMPLE_DIALOG_INPUT,
  onInputChange = () => undefined,
  onSend = () => undefined,
  maxWidth = '680px',
}: AIDialogSlimProps) {
  const [focused,  setFocused]  = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [mode,     setMode]     = useState<SlimMode>('Agent');
  const inputRef = useRef<HTMLInputElement>(null);
  const filled = inputValue.trim().length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); onSend(); }
  };

  const borderColor = filled
    ? AI.color.action.primary
    : focused
      ? 'rgba(77, 96, 230,0.45)'
      : 'var(--ai-input-border)';

  return (
    <div style={{ width: '100%', maxWidth, height: '56px', background: 'var(--ai-input-bg)', borderRadius: '999px',
      border: `1.5px solid ${borderColor}`,
      boxShadow: focused ? AI.shadow.input.focus : AI.shadow.input.default,
      transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      display: 'flex', alignItems: 'center', padding: '0 8px', gap: '6px',
      boxSizing: 'border-box', position: 'relative' }}>

      {/* + button */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button onClick={() => setPlusOpen(v => !v)}
          aria-label="Add content or choose mode" aria-expanded={plusOpen}
          style={{ width: '40px', height: '40px', borderRadius: '50%',
            background: plusOpen ? 'rgba(77, 96, 230,0.10)' : 'rgba(0,0,0,0.05)',
            border: plusOpen ? `1.5px solid ${AI.color.action.primary}` : '1.5px solid transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: plusOpen ? AI.color.action.primary : DS.iconDefault, transition: 'all 0.15s ease' }}>
          <RiAddLine size={17} strokeWidth={2} />
        </button>
        {plusOpen && <SlimPlusMenu mode={mode} onModeChange={setMode} onClose={() => setPlusOpen(false)} />}
      </div>

      {/* Mode badge — shown when not 'Agent' */}
      {mode !== 'Agent' && (
        <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 500, color: AI.color.action.primary,
          background: 'rgba(77, 96, 230,0.08)', borderRadius: '999px', padding: '3px 10px',
          flexShrink: 0, whiteSpace: 'nowrap' }}>
          {mode}
        </span>
      )}

      {/* Text input */}
      <input ref={inputRef} type="text" value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Message Guild Agent…"
        aria-label="Message Guild"
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
          ...AI_TYPOGRAPHY['@ai-input-text'], fontFamily: F, color: 'var(--ai-ds-text)', minWidth: 0 }}
      />

      {/* RiMicLine → RiSendPlaneLine toggle */}
      <button onClick={filled ? onSend : undefined}
        aria-label={filled ? 'Send message' : 'Voice input'}
        style={{ width: '40px', height: '40px', borderRadius: '50%',
          background: filled ? AI.gradient.action.full : 'rgba(0,0,0,0.06)',
          border: 'none', cursor: filled ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: filled ? AI.color.text.onAction : DS.iconDefault, flexShrink: 0,
          transition: 'background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
          boxShadow: filled ? `0 4px 14px ${AI.shadow.action.emphasis}` : 'none' }}>
        {filled ? <RiArrowUpLine size={17} strokeWidth={2.5} /> : <RiMicLine size={17} strokeWidth={2} />}
      </button>
    </div>
  );
}

// ── Main input card ───────────────────────────────────────────────────────────
export interface AIInputCardProps {
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  hasMessages: boolean;
}

export function AIInputCard({ inputValue, onInputChange, onSend, hasMessages }: AIInputCardProps) {
  const [addMenuOpen,   setAddMenuOpen]   = useState(false);
  const [skillMenuOpen, setSkillMenuOpen] = useState(false);
  const [focused,       setFocused]       = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSkillSelect = (skill: Skill) => {
    onInputChange(inputValue.trim() ? `${inputValue} /${skill.name}` : `/${skill.name}`);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); }
  };

  const filled = inputValue.trim().length > 0;

  const borderColor = filled
    ? AI.color.action.primary
    : focused
    ? 'rgba(77, 96, 230,0.45)'
    : 'var(--ai-input-border)';

  return (
    <div style={{
      width:        '100%',
      maxWidth:     hasMessages ? '100%' : '680px',
      background:   'var(--ai-input-bg)',
      borderRadius: AI.radius.lg,
      boxShadow:    focused ? AI.shadow.input.focus : AI.shadow.input.default,
      transition:   'box-shadow 0.25s ease, border-color 0.25s ease',
      position:     'relative',
      marginBottom: hasMessages ? 0 : '20px',
      border:       `1.5px solid ${borderColor}`,
    }}>
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Message Guild Agent…"
        rows={hasMessages ? 1 : 2}
        style={{
          width: '100%', border: 'none', outline: 'none', resize: 'none',
          padding: hasMessages ? '12px 20px 0' : '16px 20px 0 20px',
          ...AI_TYPOGRAPHY['@ai-input-text'], fontFamily: F, color: 'var(--ai-ds-text)',
          background: 'transparent', boxSizing: 'border-box',
        }}
      />

      {/* Toolbar row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px 14px 14px', gap: '6px' }}>

        {/* + Add */}
        <div style={{ position: 'relative' }}>
          <AIButton
            variant="secondary"
            icon={<RiAddLine size={16} strokeWidth={2} />}
            onClick={() => setAddMenuOpen(v => !v)}
            aria-label="Add content"
            aria-expanded={addMenuOpen}
          />
          {addMenuOpen && <AddMenu onClose={() => setAddMenuOpen(false)} />}
        </div>

        {/* / Skills */}
        <div style={{ position: 'relative' }}>
          <AIButton
            variant="secondary"
            icon={SkillsSlash}
            label="Skills"
            onClick={() => setSkillMenuOpen(v => !v)}
            aria-label="Browse skills"
            aria-expanded={skillMenuOpen}
            aria-haspopup="dialog"
          />
          {skillMenuOpen && (
            <SkillMenu onClose={() => setSkillMenuOpen(false)} onSelect={handleSkillSelect} />
          )}
        </div>

        {/* Mode dropdown */}
        <ModeDropdown />

        <div style={{ flex: 1 }} />

        {/* RiMicLine */}
        <AIButton
          variant="secondary"
          icon={<RiMicLine size={16} strokeWidth={2} />}
          aria-label="Voice input"
        />

        {/* RiSendPlaneLine — gradient fill when message is ready */}
        <button
          onClick={onSend}
          aria-label="Send message"
          style={{
            width:        '34px',
            height:       '34px',
            borderRadius: AI.radius.full,
            background:   filled ? AI.gradient.action.full : 'rgba(0,0,0,0.06)',
            border:       filled ? 'none' : '1px solid rgba(26,22,40,0.14)',
            cursor:       filled ? 'pointer' : 'default',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            color:        filled ? AI.color.text.onAction : DS.textDisabled,
            flexShrink:   0,
            transition:   'all 0.18s ease',
            boxShadow:    filled ? `0 4px 14px ${AI.shadow.action.emphasis}` : 'none',
          }}
        >
          <RiArrowRightLine size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export { AIInputCard as AIDialog };
export default AIInputCard;
