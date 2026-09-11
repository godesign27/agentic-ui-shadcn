import React, { useState, useRef, useEffect, useId } from 'react';
import { RiArrowRightSLine, RiCheckLine } from '@remixicon/react';
import { F, AI, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

/**
 * AIMenu + AIPopupMenu — AI-styled Menu and Popup Menu.
 *
 * Shares the ZDS Menu behavior/prop surface (see zds/zds-menu.tsx) but wears
 * the AI dialog chrome: the same surface/border/shadow/radius already used by
 * the AICommandCenterDialog `PlusMenu` and the AIPicker `PopoverShell` —
 *   • surface  var(--ai-card-bg) + AI.color.brandBorder
 *   • radius   AI.radius.sm (12px)
 *   • shadow   layered soft-blue elevation
 *   • hover    ZDS.menuHoverBg   • group title ZDS.textHelper
 *   • type     AI_TYPOGRAPHY['@zsai-menu-item']
 *   • active   AI.color.action.primary fill / white text
 *   • selected AI.color.surface.default bg + AI.color.brand checkmark
 *   • focus    brand focus ring
 * so a menu reads as a sibling of the AI dialog, not a fork of it.
 */

const CARD_BG = 'var(--ai-card-bg, #FFFFFF)';
const MENU_SHADOW = '0 8px 32px rgba(31,42,102,0.12), 0 2px 8px rgba(0,0,0,0.06)';

export type AIMenuSize = 'normal' | 'small' | 'x-small';

export interface AIMenuItem {
  type?: 'item' | 'separator' | 'group-title' | 'submenu';
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  selected?: boolean;
  children?: AIMenuItem[];
  onClick?: () => void;
}

const SIZES: Record<AIMenuSize, { height: number; padX: number }> = {
  normal: { height: 40, padX: 14 },
  small: { height: 36, padX: 12 },
  'x-small': { height: 32, padX: 10 },
};

export interface AIMenuProps {
  size?: AIMenuSize;
  items: AIMenuItem[];
  multiSelect?: boolean;
  /** Inverse (dark) surface — light text on a deep-brand menu. */
  inverse?: boolean;
  onSelect?: (item: AIMenuItem) => void;
  embedded?: boolean;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export function AIMenu({
  size = 'normal',
  items,
  multiSelect = false,
  inverse = false,
  onSelect,
  embedded = false,
  style,
  className,
  id,
  'aria-label': ariaLabel = 'Menu',
}: AIMenuProps) {
  const cfg = SIZES[size];
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const uid = useId();

  const keyFor = (it: AIMenuItem, i: number) => it.id ?? it.label ?? `${it.type}-${i}`;

  return (
    <div
      id={id}
      role="menu"
      aria-label={ariaLabel}
      className={(className ? className + ' ' : '') + 'ai-menu'}
      style={{
        fontFamily: F,
        background: inverse ? AI.color.brandInk : CARD_BG,
        border: embedded ? 'none' : `1px solid ${inverse ? AI.color.brandInk : AI.color.brandBorder}`,
        borderRadius: AI.radius.sm,
        boxShadow: embedded ? 'none' : MENU_SHADOW,
        padding: '6px 0',
        minWidth: 220,
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ai-menu-item:focus-visible {
          box-shadow: inset 0 0 0 2px var(--ai-card-bg, #ffffff), inset 0 0 0 4px ${AI.color.border.focus};
          outline: none;
        }
      `}} />
      {items.map((it, i) => {
        const k = keyFor(it, i);

        if (it.type === 'separator') {
          return <hr key={k} role="separator" style={{ border: 'none', borderTop: `1px solid ${inverse ? 'rgba(255,255,255,0.18)' : ZDS.border}`, margin: '6px 0' }} />;
        }

        if (it.type === 'group-title') {
          return (
            <div key={k} role="presentation" style={{
              padding: `6px ${cfg.padX}px 4px`, fontFamily: F, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase', color: inverse ? 'rgba(255,255,255,0.66)' : ZDS.textHelper,
              pointerEvents: 'none', userSelect: 'none',
            }}>{it.label}</div>
          );
        }

        const isSubmenu = it.type === 'submenu' && !!it.children?.length;
        const hovered = hoverId === k && !it.disabled;
        const subOpen = isSubmenu && openSub === k;
        const bg = it.active
          ? AI.color.action.primary
          : hovered || subOpen
            ? (inverse ? 'rgba(255,255,255,0.12)' : ZDS.menuHoverBg)
            : it.selected
              ? (inverse ? 'rgba(255,255,255,0.08)' : AI.color.surface.default)
              : 'transparent';
        const fg = it.active
          ? AI.color.text.onAction
          : it.disabled
            ? (inverse ? 'rgba(255,255,255,0.4)' : ZDS.textDisabled)
            : (inverse ? '#FFFFFF' : ZDS.textDefault);
        const iconColor = it.active ? AI.color.text.onAction : (inverse ? 'rgba(255,255,255,0.86)' : AI.color.brand);

        return (
          <div
            key={k}
            style={{ position: 'relative' }}
            onMouseEnter={() => { setHoverId(k); if (isSubmenu) setOpenSub(k); }}
            onMouseLeave={() => { setHoverId((h) => (h === k ? null : h)); if (isSubmenu) setOpenSub((s) => (s === k ? null : s)); }}
          >
            <button
              type="button"
              className="ai-menu-item"
              role={multiSelect ? 'menuitemcheckbox' : 'menuitem'}
              aria-checked={multiSelect ? !!it.selected : undefined}
              aria-disabled={it.disabled || undefined}
              aria-haspopup={isSubmenu ? 'menu' : undefined}
              aria-expanded={isSubmenu ? subOpen : undefined}
              disabled={it.disabled}
              tabIndex={it.disabled ? -1 : 0}
              onClick={() => { if (it.disabled) return; it.onClick?.(); onSelect?.(it); }}
              onKeyDown={(e) => {
                if (it.disabled) return;
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); it.onClick?.(); onSelect?.(it); }
                if (isSubmenu && e.key === 'ArrowRight') { e.preventDefault(); setOpenSub(k); }
                if (e.key === 'Escape') setOpenSub(null);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                height: cfg.height, padding: `0 ${cfg.padX}px`,
                background: bg, color: fg, border: 'none', textAlign: 'left',
                cursor: it.disabled ? 'not-allowed' : 'pointer', opacity: it.disabled ? 0.55 : 1,
                transition: 'background 0.12s ease', boxSizing: 'border-box',
                ...AI_TYPOGRAPHY['@zsai-menu-item'], fontFamily: F,
              }}
            >
              {multiSelect && (
                <span style={{ width: 16, flexShrink: 0, display: 'inline-flex' }}>
                  {it.selected ? <RiCheckLine size={16} color={it.active ? AI.color.text.onAction : (inverse ? '#FFFFFF' : AI.color.brand)} /> : null}
                </span>
              )}
              {it.icon && <span style={{ display: 'inline-flex', color: iconColor, flexShrink: 0 }}>{it.icon}</span>}
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</span>
              {isSubmenu && <RiArrowRightSLine size={16} color={iconColor} style={{ flexShrink: 0 }} />}
            </button>

            {isSubmenu && subOpen && (
              <div style={{ position: 'absolute', top: -6, left: '100%', marginLeft: 4, zIndex: 10 }}>
                <AIMenu size={size} items={it.children!} multiSelect={multiSelect} inverse={inverse} onSelect={onSelect} aria-label={`${it.label} submenu`} id={`${uid}-sub-${i}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export interface AIPopupMenuProps extends Omit<AIMenuProps, 'embedded' | 'id'> {
  trigger: React.ReactNode | ((open: boolean) => React.ReactNode);
  triggerLabel?: string;
  align?: 'left' | 'right';
  closeOnSelect?: boolean;
}

export function AIPopupMenu({
  trigger,
  triggerLabel = 'Open menu',
  align = 'left',
  closeOnSelect = true,
  onSelect,
  multiSelect = false,
  ...menuProps
}: AIPopupMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block', fontFamily: F }}>
      <span
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={typeof trigger === 'function' ? triggerLabel : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); }
          if (e.key === 'Escape') setOpen(false);
        }}
        style={{ display: 'inline-flex', cursor: 'pointer', outline: 'none' }}
      >
        {typeof trigger === 'function' ? trigger(open) : trigger}
      </span>

      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', [align]: 0, zIndex: 1000,
            border: `1px solid ${AI.color.brandBorder}`, borderRadius: AI.radius.sm,
            boxShadow: MENU_SHADOW, background: CARD_BG, overflow: 'hidden',
          } as React.CSSProperties}
        >
          <AIMenu
            {...menuProps}
            id={menuId}
            multiSelect={multiSelect}
            embedded
            onSelect={(it) => { onSelect?.(it); if (closeOnSelect && !multiSelect) setOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}

export default AIMenu;
