import React from 'react';

/**
 * AI Toolbar
 * ==========
 * The AI-styled sibling of the standard ZDS Toolbar (see zds/zds-toolbar.tsx),
 * which is its starting point. Same anatomy — a horizontal or vertical strip of
 * icon-link actions with optional labels (icon-only items get a hover tooltip)
 * — but wearing the ZAIDYN
 * AI surface:
 *
 *   - The AI brand color (--aiu-brand = ZSAI[80]) replaces the standard teal
 *     ramp (teal[80]) everywhere hover / selected / pressed fills appear.
 *   - AI corner radius (--aiu-radius-*) instead of the ZDS --radius.
 *   - AI elevation (--aiu-shadow-md) instead of the flat ZDS shadow.
 *   - AI focus ring (--aiu-focus).
 *
 * Everything is driven by the --aiu-* CSS custom properties defined in
 * src/styles/ai-utilities.css, so editing that CSS restyles the toolbar. The
 * only typography used is the Open Sans face already loaded by the kit.
 *
 * Floating variant: pass `floating` to render the toolbar inside a positioned
 * stage with a six-dot drag grabber. The user can grab the grip and move the
 * bar anywhere within the stage; the position clamps to the stage bounds.
 */

const F = '"Open Sans", system-ui, sans-serif';

// Canonical ZDS icon glyphs (24×24), shared with the standard toolbar. Fill is
// supplied at render time via currentColor so the glyph inherits the AI token.
const ICON_PATHS: Record<string, string> = {
  home:
    'M18.3 21H5.6C5.4 21 5.2 20.9 5 20.7C4.8 20.5 4.7 20.3 4.7 20.1V12H2L11.3 3.5C11.5 3.3 11.7 3.3 11.9 3.3C12.1 3.3 12.3 3.4 12.5 3.5L21.8 12H19.1V20.1C19.2 20.6 18.8 21 18.3 21ZM12.8 19.2H17.3V10.3L11.9 5.4L6.5 10.3V19.2H11H12.8Z',
  calendar:
    'M17 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H7V1H9V3H15V1H17V3ZM15 5H9V7H7V5H4V9H20V5H17V7H15V5ZM20 11H4V19H20V11Z',
  search:
    'M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z',
  palette:
    'M12 2C17.522 2 22 5.978 22 10.889C21.9992 12.3622 21.4136 13.7748 20.3717 14.8165C19.3299 15.8581 17.9172 16.4435 16.444 16.444H14.478C13.556 16.444 12.811 17.189 12.811 18.111C12.811 18.533 12.978 18.922 13.233 19.211C13.5 19.511 13.667 19.9 13.667 20.333C13.667 21.256 12.9 22 12 22C6.478 22 2 17.522 2 12C2 6.478 6.478 2 12 2ZM10.811 18.111C10.8106 17.6293 10.9052 17.1523 11.0893 16.7072C11.2735 16.2622 11.5436 15.8578 11.8842 15.5172C12.2248 15.1766 12.6292 14.9065 13.0742 14.7223C13.5193 14.5382 13.9963 14.4436 14.478 14.444H16.444C17.3866 14.4435 18.2905 14.0689 18.9572 13.4026C19.6239 12.7363 19.9989 11.8326 20 10.89C20 7.139 16.468 4 12 4C9.93558 3.99812 7.95034 4.79436 6.45938 6.22225C4.96841 7.65014 4.08715 9.59913 3.99986 11.6617C3.91256 13.7243 4.62599 15.7408 5.99097 17.2895C7.35595 18.8383 9.2668 19.7994 11.324 19.972C10.9892 19.4093 10.812 18.7668 10.811 18.112V18.111ZM7.5 12C7.10218 12 6.72064 11.842 6.43934 11.5607C6.15804 11.2794 6 10.8978 6 10.5C6 10.1022 6.15804 9.72064 6.43934 9.43934C6.72064 9.15804 7.10218 9 7.5 9C7.89782 9 8.27936 9.15804 8.56066 9.43934C8.84196 9.72064 9 10.1022 9 10.5C9 10.8978 8.84196 11.2794 8.56066 11.5607C8.27936 11.842 7.89782 12 7.5 12ZM16.5 12C16.1022 12 15.7206 11.842 15.4393 11.5607C15.158 11.2794 15 10.8978 15 10.5C15 10.1022 15.158 9.72064 15.4393 9.43934C15.7206 9.15804 16.1022 9 16.5 9C16.8978 9 17.2794 9.15804 17.5607 9.43934C17.842 9.72064 18 10.1022 18 10.5C18 10.8978 17.842 11.2794 17.5607 11.5607C17.2794 11.842 16.8978 12 16.5 12ZM12 9C11.6022 9 11.2206 8.84196 10.9393 8.56066C10.658 8.27936 10.5 7.89782 10.5 7.5C10.5 7.10218 10.658 6.72064 10.9393 6.43934C11.2206 6.15804 11.6022 6 12 6C12.3978 6 12.7794 6.15804 13.0607 6.43934C13.342 6.72064 13.5 7.10218 13.5 7.5C13.5 7.89782 13.342 8.27936 13.0607 8.56066C12.7794 8.84196 12.3978 9 12 9Z',
  territory:
    'M20 3H22V9H20V5H16V3H20ZM4 3H8V5H4V9H2V3H4ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z',
  'caret-down': 'M12 16L6 10H18L12 16Z',
};

export type AIToolbarIcon = 'home' | 'calendar' | 'search' | 'palette' | 'territory';
export type AIToolbarState = 'default' | 'hover' | 'pressed' | 'selected' | 'disabled' | 'focused';
export type AIToolbarLabelPosition = 'none' | 'right' | 'below';

/**
 * Resolved token strings for a given state — every value is an --aiu-* CSS
 * custom property (with a literal fallback) so the AI CSS drives the styling.
 */
function itemColors(state: AIToolbarState) {
  switch (state) {
    case 'hover':
    case 'selected':
      return { bg: 'var(--aiu-brand, #4D60E6)', fg: 'var(--aiu-on-primary, #ffffff)' };
    case 'pressed':
      return { bg: 'var(--aiu-bg-primary-active, #1F2A66)', fg: 'var(--aiu-on-primary, #ffffff)' };
    case 'disabled':
      return { bg: 'transparent', fg: 'var(--disabled-text-color, #716e79)' };
    case 'default':
    case 'focused':
    default:
      return { bg: 'transparent', fg: 'var(--aiu-text-secondary, #3544A4)' };
  }
}

function labelColor(state: AIToolbarState) {
  if (state === 'disabled') return 'var(--disabled-text-color, #716e79)';
  if (state === 'hover' || state === 'pressed' || state === 'selected') return 'var(--aiu-on-primary, #ffffff)';
  return 'var(--aiu-text, #1F2A66)';
}

export interface AIToolbarIconLinkProps {
  icon: AIToolbarIcon;
  label?: string;
  labelPosition?: AIToolbarLabelPosition;
  caret?: boolean;
  /** Force a static state (spec / showcase matrices). Interactive when omitted. */
  state?: AIToolbarState;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function AIToolbarIconLink({
  icon,
  label = 'Home',
  labelPosition = 'none',
  caret = false,
  state,
  selected = false,
  disabled = false,
  onClick,
}: AIToolbarIconLinkProps) {
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const isDisabled = state === 'disabled' || disabled;

  const effectiveState: AIToolbarState = state
    ?? (isDisabled
      ? 'disabled'
      : pressed
        ? 'pressed'
        : hover
          ? 'hover'
          : selected
            ? 'selected'
            : 'default');

  const showFocusRing = !isDisabled && (state === 'focused' || focused);

  const c = itemColors(effectiveState);
  const vertical = labelPosition === 'below';
  const gap = labelPosition === 'right' ? 4 : labelPosition === 'below' ? 2 : 4;

  const iconEl = (
    <span aria-hidden="true" style={{ display: 'inline-flex', color: c.fg }}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={ICON_PATHS[icon]} fill="currentColor" />
      </svg>
    </span>
  );

  const caretEl = caret ? (
    <span aria-hidden="true" style={{ display: 'inline-flex', color: c.fg }}>
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={ICON_PATHS['caret-down']} fill="currentColor" />
      </svg>
    </span>
  ) : null;

  const labelEl =
    labelPosition !== 'none' && label ? (
      <span
        style={{
          fontFamily: F,
          fontSize: 12,
          lineHeight: '150%',
          fontWeight: 'var(--font-weight-bold)' as unknown as number,
          color: labelColor(effectiveState),
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    ) : null;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      aria-label={label}
      // Icon-only items (no visible label) get a native hover/focus tooltip.
      // Native title is used so it is never clipped by the bar's overflow.
      title={labelPosition === 'none' ? label : undefined}
      aria-pressed={effectiveState === 'selected' || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        padding: 16,
        border: '2px solid transparent',
        borderRadius: 'var(--aiu-radius-sm, 12px)',
        background: c.bg,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontFamily: F,
        outline: 'none',
        transition: 'background 120ms ease, color 120ms ease',
        boxShadow: showFocusRing ? `inset 0 0 0 2px var(--aiu-focus, #4D60E6)` : undefined,
      }}
    >
      {iconEl}
      {labelEl}
      {caretEl}
    </button>
  );
}

/**
 * Six-dot drag grabber for the floating variant. Colour follows the AI text
 * token; rotates a quarter-turn for vertical bars so the grip reads correctly.
 */
function ToolbarGrabber({
  horizontal,
  onPointerDown,
}: {
  horizontal: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}) {
  const dots = (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[4, 8, 12].map((cy) =>
        [5, 11].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.4} fill="currentColor" />),
      )}
    </svg>
  );
  return (
    <button
      type="button"
      aria-label="Move toolbar"
      onPointerDown={onPointerDown}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: horizontal ? '0 6px' : '6px 0',
        border: 'none',
        background: 'transparent',
        color: 'var(--aiu-text-secondary, #3544A4)',
        cursor: 'grab',
        touchAction: 'none',
        outline: 'none',
        transform: horizontal ? undefined : 'rotate(90deg)',
      }}
    >
      {dots}
    </button>
  );
}

export interface AIToolbarItem {
  icon: AIToolbarIcon;
  label: string;
  caret?: boolean;
}

const DEFAULT_ITEMS: AIToolbarItem[] = [
  { icon: 'home', label: 'Home', caret: true },
  { icon: 'calendar', label: 'Calendar', caret: true },
  { icon: 'search', label: 'Search' },
  { icon: 'palette', label: 'Palette', caret: true },
  { icon: 'territory', label: 'Territory' },
];

export interface AIToolbarProps {
  orientation?: 'horizontal' | 'vertical';
  label?: 'none' | 'right' | 'below' | 'right-caret';
  items?: AIToolbarItem[];
  /**
   * Surface treatment:
   *   - 'tinted' (default) — the AI blue-tinted surface (--aiu-surface).
   *   - 'white'            — a plain white surface (like the standard ZDS light
   *                          toolbar), keeping the AI brand accents / radius.
   */
  surface?: 'tinted' | 'white';
  /**
   * Docked variant: pin the (vertical) bar to the left or right edge of a
   * positioned stage. All rounded corners are kept. Overrides orientation to
   * vertical. Mutually exclusive with `floating`.
   */
  dock?: 'left' | 'right';
  /**
   * Floating variant: wrap the bar in a positioned stage and render a drag
   * grabber so the user can move it around within the stage.
   */
  floating?: boolean;
  /** Height of the floating / docked stage (px). Default 260. */
  stageHeight?: number;
  /**
   * Backdrop for the docked / floating stage:
   *   - 'gradient' (default) — the AI blue-tinted gradient surface.
   *   - 'white'              — a plain white surface (--background), so the
   *                            docked bar reads against a clean page background.
   */
  stageSurface?: 'gradient' | 'white';
  /**
   * Theme applied to the bar itself, independent of the stage backdrop:
   *   - 'inherit' (default) — the bar follows the surrounding theme.
   *   - 'dark'              — the bar resolves the dark --aiu-* overrides (dark
   *                           surface + light glyphs) even when it sits on a
   *                           light stage. Lets a dark nav ride a white backdrop.
   */
  barTheme?: 'inherit' | 'dark';
  /** Initial floating offset within the stage (px). Default { x: 40, y: 48 }. */
  floatingOffset?: { x: number; y: number };
  defaultSelectedIndex?: number;
  onSelect?: (index: number, item: AIToolbarItem) => void;
}

export function AIToolbar({
  orientation = 'horizontal',
  label = 'none',
  items = DEFAULT_ITEMS,
  surface = 'tinted',
  dock,
  floating = false,
  stageHeight = 260,
  stageSurface = 'gradient',
  barTheme = 'inherit',
  floatingOffset = { x: 40, y: 48 },
  defaultSelectedIndex = 0,
  onSelect,
}: AIToolbarProps) {
  // Docked toolbars are always vertical.
  const horizontal = dock ? false : orientation === 'horizontal';
  const labelPosition: AIToolbarLabelPosition =
    label === 'none' ? 'none' : label === 'below' ? 'below' : 'right';
  const withCaret = label === 'right-caret';
  // Surface token — driven by CSS custom properties.
  const surfaceBg = surface === 'white' ? 'var(--background, #ffffff)' : 'var(--aiu-surface, #F5F6FF)';
  const [selected, setSelected] = React.useState(defaultSelectedIndex);

  // When docked, the bar sits flush against the viewport edge, so the corners on
  // that edge are squared while the inner corners keep the AI radius.
  // Stage backdrop — plain white surface, or the AI blue-tinted gradient.
  const stageBg =
    stageSurface === 'white'
      ? 'var(--background, #ffffff)'
      : 'var(--aiu-gradient-surface, linear-gradient(135deg,#F5F6FF 0%,#D2DBFF 50%,#F5F6FF 100%))';

  const R = 'var(--aiu-radius-md, 16px)';
  const barRadius =
    dock === 'left'
      ? `0 ${R} ${R} 0`
      : dock === 'right'
        ? `${R} 0 0 ${R}`
        : R;

  // Floating drag — position tracked relative to the stage; clamped to bounds.
  const stageRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState(floatingOffset);
  const dragRef = React.useRef<{ dx: number; dy: number } | null>(null);

  const onGrabberPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const stage = stageRef.current?.getBoundingClientRect();
    const bar = barRef.current?.getBoundingClientRect();
    if (!stage || !bar) return;
    // Offset of the pointer within the bar at grab time.
    dragRef.current = { dx: e.clientX - bar.left, dy: e.clientY - bar.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const s = stageRef.current?.getBoundingClientRect();
      const b = barRef.current?.getBoundingClientRect();
      const d = dragRef.current;
      if (!s || !b || !d) return;
      const nx = Math.min(Math.max(0, ev.clientX - s.left - d.dx), Math.max(0, s.width - b.width));
      const ny = Math.min(Math.max(0, ev.clientY - s.top - d.dy), Math.max(0, s.height - b.height));
      setPos({ x: nx, y: ny });
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const bar = (
    <div
      ref={barRef}
      role="toolbar"
      // `.dark` scoped to the bar resolves the dark --aiu-* overrides for the bar
      // surface + glyphs only, so a dark nav can sit on a light stage.
      className={barTheme === 'dark' ? 'dark' : undefined}
      aria-orientation={orientation}
      style={{
        display: 'inline-flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: 'stretch',
        gap: 'var(--aiu-toolbar-item-gap, 4px)',
        padding: 'var(--aiu-toolbar-padding, 4px)',
        background: surfaceBg,
        boxShadow: 'var(--aiu-shadow-md, 0 4px 16px rgba(77,96,230,0.18))',
        borderRadius: barRadius,
        fontFamily: F,
        overflow: 'hidden',
        position: floating ? 'absolute' : undefined,
        left: floating ? pos.x : undefined,
        top: floating ? pos.y : undefined,
      }}
    >
      {floating && <ToolbarGrabber horizontal={horizontal} onPointerDown={onGrabberPointerDown} />}
      {items.map((item, i) => (
        <AIToolbarIconLink
          key={`${item.icon}-${item.label}`}
          icon={item.icon}
          label={item.label}
          labelPosition={labelPosition}
          caret={withCaret && !!item.caret}
          selected={i === selected}
          onClick={() => {
            setSelected(i);
            onSelect?.(i, item);
          }}
        />
      ))}
    </div>
  );

  // Docked variant: pin the vertical bar to the left or right edge of a stage.
  // All rounded corners are kept (the bar retains --aiu-radius-md).
  if (dock) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: stageHeight,
          borderRadius: 'var(--aiu-radius-md, 16px)',
          background: stageBg,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            // Flush against the docked edge — no gap on that side.
            left: dock === 'left' ? 0 : undefined,
            right: dock === 'right' ? 0 : undefined,
          }}
        >
          {bar}
        </div>
      </div>
    );
  }

  if (!floating) return bar;

  return (
    <div
      ref={stageRef}
      style={{
        position: 'relative',
        width: '100%',
        height: stageHeight,
        borderRadius: 'var(--aiu-radius-md, 16px)',
        background: stageBg,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 12,
          left: 16,
          fontFamily: F,
          fontSize: 12,
          color: 'var(--aiu-text-secondary, #3544A4)',
          pointerEvents: 'none',
        }}
      >
        Drag the grip to move
      </span>
      {bar}
    </div>
  );
}

export default AIToolbar;
