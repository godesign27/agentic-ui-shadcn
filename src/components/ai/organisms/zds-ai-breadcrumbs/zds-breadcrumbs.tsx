/**
 * ZdsBreadcrumbs — ZDS Breadcrumb navigation component
 *
 * GitHub source: zsainc/9904PD0068_zds-ai-mirror · src/breadcrumbs/
 * Spec:          src/imports/pasted_text/breadcrumbs-component.md
 * Reference:     src/imports/Breadcrumbs.png
 *
 * Full variant matrix:
 *   Size    : normal | small | x-small
 *   Variant : default (light bg) | inverse (dark bg)
 *   Type    : default (hierarchy trail) | back (single "← Back" link)
 *   Per item: page icon (swappable, toggleable) + text (toggleable) + states
 *
 * Structure: nav[aria-label] > ol > li (link | separator | current)
 *   - Previous page : italic, --link-text-color teal (hover --link-hover-color)
 *   - Active page   : bold, --link-active-color, aria-current="page", never a link
 *   - Separator     : zs-icon-arrow-right chevron, --helper-text-color (Icon/Neutral)
 *   - Back          : zs-icon-arrow-left + italic link label
 *
 * All colors bind to design-system CSS variables; only Open Sans is used.
 */

import React from 'react';

const FONT = '"Open Sans", sans-serif';

/* ── Icon paths (currentColor so the parent link color drives the fill) ──────── */

// zs-icon-home — default page icon (swappable via item.icon)
const HOME_PATH = 'M12 2.1 1 12h3v9h6v-6h4v6h6v-9h3L12 2.1Z';
// zs-icon-arrow-right — separator chevron (viewBox 0 0 7.778 12.728)
const ARROW_RIGHT_PATH = 'M4.95 6.364L0 1.414L1.414 0L7.778 6.364L1.414 12.728L0 11.314L4.95 6.364Z';
// zs-icon-arrow-left — Back arrow (mirror of arrow-right)
const ARROW_LEFT_PATH = 'M2.828 6.364L7.778 11.314L6.364 12.728L0 6.364L6.364 0L7.778 1.414L2.828 6.364Z';

/* ── Size configuration ─────────────────────────────────────────────────────── */

export type ZdsBreadcrumbSize = 'normal' | 'small' | 'x-small';
export type ZdsBreadcrumbVariant = 'default' | 'inverse';

interface SizeCfg {
  fontSize: string;
  lineHeight: string;
  iconBox: number;      // icon / separator container (square)
  homeVec: number;      // rendered home glyph size
  arrow: { w: number; h: number };
  lsActive: string;     // letter spacing — active (bold) page
  lsLink: string;       // letter spacing — previous (italic) links
}

const SIZE: Record<ZdsBreadcrumbSize, SizeCfg> = {
  normal:    { fontSize: '16px', lineHeight: '1.5', iconBox: 24, homeVec: 20, arrow: { w: 8, h: 13 }, lsActive: '-0.128px', lsLink: '-0.144px' },
  small:     { fontSize: '14px', lineHeight: '1.4', iconBox: 20, homeVec: 18, arrow: { w: 6, h: 11 }, lsActive: '0.176px',  lsLink: '0.176px' },
  'x-small': { fontSize: '12px', lineHeight: '1.4', iconBox: 16, homeVec: 14, arrow: { w: 5, h: 8 },  lsActive: '-0.208px', lsLink: '-0.208px' },
};

/* ── Palette (bound to design-system CSS variables) ─────────────────────────── */

interface Palette {
  link: string;
  linkHover: string;
  linkDisabled: string;
  active: string;
  activeIcon: string;
  separator: string;
  focus: string;
}

function palette(variant: ZdsBreadcrumbVariant): Palette {
  if (variant === 'inverse') {
    return {
      link:         'var(--inverse-text-color, #FAFAFA)',
      linkHover:    'var(--zs-link-inverse-hover-color, #DEDCDE)',
      linkDisabled: 'var(--zs-text-inverse-disabled-color, #9C9AA1)',
      active:       'var(--inverse-text-color, #FAFAFA)',
      activeIcon:   'var(--icon-neutral-inverse-color, #FFFFFF)',
      separator:    'var(--icon-neutral-inverse-color, #FFFFFF)',
      focus:        'var(--focus-outline-color, #027AFF)',
    };
  }
  return {
    link:         'var(--link-text-color, #2F6F7B)',
    linkHover:    'var(--link-hover-color, #2D535F)',
    linkDisabled: 'var(--disabled-text-color, #716E79)',
    active:       'var(--link-active-color, #022D42)',
    activeIcon:   'var(--link-active-color, #022D42)',
    separator:    'var(--helper-text-color, #5B5864)',
    focus:        'var(--focus-outline-color, #027AFF)',
  };
}

/* ── Icon renderers ─────────────────────────────────────────────────────────── */

function HomeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={HOME_PATH} fill="currentColor" />
    </svg>
  );
}

function Chevron({ dir, w, h }: { dir: 'left' | 'right'; w: number; h: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 7.778 12.728" fill="none" aria-hidden="true">
      <path d={dir === 'right' ? ARROW_RIGHT_PATH : ARROW_LEFT_PATH} fill="currentColor" />
    </svg>
  );
}

/* ── Public types ───────────────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  /** Display text */
  label: string;
  /** SPA click handler — makes this item an interactive link */
  onClick?: () => void;
  /** Anchor href — renders an <a>; takes precedence over onClick for semantics */
  href?: string;
  /** Swap icon — any node. Defaults to the home glyph when showIcon is set. */
  icon?: React.ReactNode;
  /** Show the page icon (default: false; the trail's first item typically sets this) */
  showIcon?: boolean;
  /** Show the text label (default: true) */
  showText?: boolean;
  /** Grey the icon + text and disable interaction */
  disabled?: boolean;
}

export interface ZdsBreadcrumbsProps {
  /** Ordered list — last item is always the current (active) page and never a link */
  items: BreadcrumbItem[];
  /**
   * Collapse the trail to first + overflow "…" + last (maxVisible − 1) items when
   * the depth exceeds this. 0 = show all. The hidden items appear in a dropdown menu.
   */
  maxVisible?: number;
  /** 'normal' (16px) | 'small' (14px) | 'x-small' (12px). Defaults to 'normal'. */
  size?: ZdsBreadcrumbSize;
  /** 'default' (light bg) | 'inverse' (dark bg). Defaults to 'default'. */
  variant?: ZdsBreadcrumbVariant;
  /**
   * 'standard' (ZDS primary teal links) | 'ai' (AI brand-blue links). The AI theme
   * re-anchors the link CSS variables to the AI brand — the base component is never
   * forked. Defaults to 'standard'.
   */
  theme?: 'standard' | 'ai';
  /** 'default' hierarchy trail | 'back' single back-link. Defaults to 'default'. */
  type?: 'default' | 'back';
  /** Label for the Back link (type='back'). Defaults to 'Back to page'. */
  backLabel?: string;
  /** Click handler for the Back link */
  onBack?: () => void;
  /** Override aria-label for the nav element */
  ariaLabel?: string;
  /**
   * Container padding. Spec default is 16px, but embedded nav bars usually want 0.
   * Defaults to 0 to preserve host layouts; pass '16px' for the standalone spec look.
   */
  padding?: string | number;
}

/* ── Link part (previous page / active page / back) ─────────────────────────── */

interface LinkPartProps {
  label: string;
  size: SizeCfg;
  pal: Palette;
  /** active = current page (bold, non-italic, non-interactive) */
  active?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  showText?: boolean;
  /** leading icon (Back arrow) rendered before the label */
  leading?: React.ReactNode;
}

function LinkPart({
  label, size, pal, active = false, interactive = false, disabled = false,
  onClick, href, icon, showIcon = false, showText = true, leading,
}: LinkPartProps) {
  const baseColor = disabled
    ? pal.linkDisabled
    : active
      ? pal.active
      : pal.link;

  const contentStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: FONT,
    fontStyle: active ? 'normal' : 'italic',
    fontWeight: active ? 'var(--font-weight-bold, 700)' : 'var(--font-weight-regular, 400)',
    fontSize: size.fontSize,
    lineHeight: size.lineHeight,
    letterSpacing: active ? size.lsActive : size.lsLink,
    color: baseColor,
    whiteSpace: 'nowrap',
  };

  const iconNode = showIcon ? (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size.iconBox,
        height: size.iconBox,
        flexShrink: 0,
        // active page icon can differ from text color (Icon/Primary/Pressed)
        color: disabled ? pal.linkDisabled : active ? pal.activeIcon : 'inherit',
      }}
    >
      {icon ?? <HomeIcon size={size.homeVec} />}
    </span>
  ) : null;

  const inner = (
    <>
      {leading}
      {iconNode}
      {showText && <span>{label}</span>}
    </>
  );

  // Active page (or non-interactive) → span with aria-current
  if (active || !interactive || disabled) {
    return (
      <span style={contentStyle} aria-current={active ? 'page' : undefined} aria-disabled={disabled || undefined}>
        {inner}
      </span>
    );
  }

  const applyFocus = (el: HTMLElement, on: boolean) => {
    el.style.outline = on ? `2px solid ${pal.focus}` : 'none';
    el.style.outlineOffset = on ? '2px' : '0';
    el.style.borderRadius = '2px';
  };

  const commonHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = pal.linkHover),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = baseColor),
    onFocus: (e: React.FocusEvent<HTMLElement>) => applyFocus(e.currentTarget, true),
    onBlur:  (e: React.FocusEvent<HTMLElement>) => applyFocus(e.currentTarget, false),
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} style={{ ...contentStyle, textDecoration: 'none', cursor: 'pointer' }} {...commonHandlers}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...contentStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      {...commonHandlers}
    >
      {inner}
    </button>
  );
}

/* ── Overflow "…" menu (collapsed trail) ────────────────────────────────────── */

function OverflowMenu({
  hidden, size, pal,
}: {
  hidden: BreadcrumbItem[];
  size: SizeCfg;
  pal: Palette;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        aria-label="Show hidden breadcrumbs"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          padding: '0 2px',
          cursor: 'pointer',
          fontFamily: FONT,
          fontSize: size.fontSize,
          lineHeight: size.lineHeight,
          color: pal.link,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = pal.linkHover)}
        onMouseLeave={e => (e.currentTarget.style.color = pal.link)}
        onFocus={e => { e.currentTarget.style.outline = `2px solid ${pal.focus}`; e.currentTarget.style.outlineOffset = '2px'; e.currentTarget.style.borderRadius = '2px'; }}
        onBlur={e => { e.currentTarget.style.outline = 'none'; }}
      >
        …
      </button>

      {open && (
        <ul
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 20,
            minWidth: 180,
            margin: 0,
            padding: '4px',
            listStyle: 'none',
            background: 'var(--background, #FFFFFF)',
            border: '1px solid var(--border-light-color, #E4E3E6)',
            borderRadius: 'var(--radius, 4px)',
            boxShadow: 'var(--shadow-blur-3)',
          }}
        >
          {hidden.map((h, i) => (
            <li key={i} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => { setOpen(false); h.onClick?.(); }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius, 4px)',
                  fontFamily: FONT,
                  fontStyle: 'italic',
                  fontSize: size.fontSize,
                  lineHeight: size.lineHeight,
                  color: 'var(--link-text-color, #2F6F7B)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-color-1, #FAFAFA)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {h.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────────────────────── */

export function ZdsBreadcrumbs({
  items,
  maxVisible = 0,
  size = 'normal',
  variant = 'default',
  theme = 'standard',
  type = 'default',
  backLabel = 'Back to page',
  onBack,
  ariaLabel = 'Breadcrumb',
  padding = 0,
}: ZdsBreadcrumbsProps) {
  const cfg = SIZE[size];
  const pal = palette(variant);

  // AI theme — scoped CSS-variable overrides re-anchor the teal link tokens to the
  // AI brand blue (globals.css). The base component/markup is never forked; only
  // these variables change, cascading to links and the overflow menu.
  const themeVars: React.CSSProperties = theme === 'ai'
    ? ({
        '--link-text-color': 'var(--color-ai-brand, #4D60E6)',
        '--link-hover-color': 'var(--color-ai-brand-strong, #3544A4)',
        '--link-active-color': 'var(--color-ai-brand-ink, #1F2A66)',
        '--link-visited-color': 'var(--color-ai-brand-ink, #1F2A66)',
      } as React.CSSProperties)
    : {};
  const navStyle: React.CSSProperties = { padding, ...themeVars };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    gap: '4px',
  };

  // Type = Back → single "← Back" link
  if (type === 'back') {
    return (
      <nav aria-label={ariaLabel} style={navStyle}>
        <LinkPart
          label={backLabel}
          size={cfg}
          pal={pal}
          interactive
          onClick={onBack}
          showText
          leading={
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: cfg.iconBox,
                height: cfg.iconBox,
                flexShrink: 0,
              }}
            >
              <Chevron dir="left" w={cfg.arrow.w} h={cfg.arrow.h} />
            </span>
          }
        />
      </nav>
    );
  }

  // Build the display sequence, collapsing the middle into an overflow node when
  // the trail is deeper than maxVisible (first + "…" + last maxVisible−1 items).
  type Node =
    | { kind: 'item'; item: BreadcrumbItem; isLast: boolean }
    | { kind: 'overflow'; hidden: BreadcrumbItem[] };

  let nodes: Node[];
  if (maxVisible > 0 && items.length > maxVisible) {
    const tailCount = Math.max(1, maxVisible - 1);
    const head = items[0];
    const tail = items.slice(items.length - tailCount);
    const hidden = items.slice(1, items.length - tailCount);
    nodes = [
      { kind: 'item', item: head, isLast: false },
      { kind: 'overflow', hidden },
      ...tail.map((item, i) => ({ kind: 'item' as const, item, isLast: i === tail.length - 1 })),
    ];
  } else {
    nodes = items.map((item, i) => ({ kind: 'item' as const, item, isLast: i === items.length - 1 }));
  }

  const separator = (key: string) => (
    <li
      key={key}
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: cfg.iconBox,
        height: cfg.iconBox,
        flexShrink: 0,
        color: pal.separator,
      }}
    >
      <Chevron dir="right" w={cfg.arrow.w} h={cfg.arrow.h} />
    </li>
  );

  return (
    <nav aria-label={ariaLabel} style={navStyle}>
      <ol style={listStyle}>
        {nodes.map((node, idx) => {
          const isLastNode = idx === nodes.length - 1;
          return (
            <React.Fragment key={idx}>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                {node.kind === 'overflow' ? (
                  <OverflowMenu hidden={node.hidden} size={cfg} pal={pal} />
                ) : (
                  <LinkPart
                    label={node.item.label}
                    size={cfg}
                    pal={pal}
                    active={node.isLast}
                    interactive={!node.isLast && !node.item.disabled && !!(node.item.onClick || node.item.href)}
                    disabled={node.item.disabled}
                    onClick={node.item.onClick}
                    href={node.item.href}
                    icon={node.item.icon}
                    showIcon={node.item.showIcon ?? false}
                    showText={node.item.showText ?? true}
                  />
                )}
              </li>
              {!isLastNode && separator(`sep-${idx}`)}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
