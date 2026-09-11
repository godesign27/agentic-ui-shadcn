import React from 'react';

/**
 * DS Card Component
 * =====================
 * Source of Truth: upstream AI component source → src/card/
 *
 * Canonical LESS → CSS variable mappings (card.less + config.m.js):
 *   @ds-card-background-color         → var(--background)           #ffffff
 *   @ds-card-hover-background-color   → var(--surface-color-1)      #FAFAFA  (palette.neutral[0])
 *   @ds-card-focus-background-color   → var(--surface-color-1)      #FAFAFA
 *   @ds-card-active-background-color  → var(--teal-00)              #FEFFFF  (palette.primary[0])
 *   @ds-card-active-border-color      → var(--primary)              #2F6F7B  (palette.primary[80] = teal-80)
 *   @ds-card-border                   → 1px solid var(--border)     #B2B0B6  (palette.neutral[30])
 *   @ds-card-border-radius            → var(--radius)               0px
 *   @ds-card-box-shadow               → var(--shadow-flat-right-angle-2)
 *   @ds-card-hover-box-shadow         → var(--shadow-flat-right-angle-4)
 *   focus ring                        → var(--focus-outline-color)  #027AFF
 *   disabled bg                       → var(--disabled-background-color) #F4F3F3
 *   disabled opacity                  → var(--disabled-opacity)     0.4
 *
 * Dark mode token overrides:
 *   background  → var(--surface-color-5)     #1A1628
 *   text color  → var(--inverse-text-color)  #FAFAFA
 *   header bg   → var(--surface-color-4)     #454250
 */

// ─── Metadata export (required per proposal spec) ────────────────────────────
export const DS_CARD_SOURCE = {
  github: 'upstream AI component source/src/card/',
  lessFile: 'src/card/card.less',
  configFile: 'src/card/config.m.js',
  mappings: {
    '@ds-card-background-color':        'var(--background)',
    '@ds-card-hover-background-color':  'var(--surface-color-1)',
    '@ds-card-focus-background-color':  'var(--surface-color-1)',
    '@ds-card-active-background-color': 'var(--teal-00)',
    '@ds-card-active-border-color':     'var(--primary)',
    '@ds-card-border':                  '1px solid var(--border)',
    '@ds-card-border-radius':           'var(--radius)',
    '@ds-card-box-shadow':              'var(--shadow-flat-right-angle-2)',
    '@ds-card-hover-box-shadow':        'var(--shadow-flat-right-angle-4)',
    'focus-ring':                       'var(--focus-outline-color)',
    'disabled-background':              'var(--disabled-background-color)',
    'disabled-opacity':                 'var(--disabled-opacity)',
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
export type DSCardMode = 'light' | 'dark';

export interface DSCardProps {
  /** Light (default) or dark surface variant */
  mode?: DSCardMode;
  /** Makes the entire card focusable/clickable; adds role="button" */
  interactive?: boolean;
  /** Renders the optional <header> slot with a bottom border */
  hasHeader?: boolean;
  /** Renders the optional <footer> slot with surface-color-1 background */
  hasFooter?: boolean;
  /** Content for the <header> slot */
  header?: React.ReactNode;
  /** Optional node pinned to the trailing (right) edge of the header — e.g. a
   *  collapse chevron or header-level actions. Header becomes space-between. */
  headerTrailing?: React.ReactNode;
  /** When true, the body (and footer) are hidden — used by collapsible cards. */
  collapsed?: boolean;
  /** Content for the <section> (body) slot — always rendered */
  body: React.ReactNode;
  /** Content for the <footer> slot */
  footer?: React.ReactNode;
  /** Applies the active state: teal-00 background + primary border */
  active?: boolean;
  /** Applies the disabled state: dimmed + muted background, pointer-events none */
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function DSCard({
  mode = 'light',
  interactive = false,
  hasHeader = false,
  hasFooter = false,
  header,
  headerTrailing,
  collapsed = false,
  body,
  footer,
  active = false,
  disabled = false,
  onClick,
  style,
  className,
  id,
  'aria-label': ariaLabel,
}: DSCardProps) {
  const [hovered, setHovered] = React.useState(false);

  const isDark = mode === 'dark';

  // ── Token resolution ───────────────────────────────────────────────────────
  // All values map directly to CSS custom properties — no hardcoded hex or px.
  const cardBg =
    active   ? 'var(--teal-00)'
    : hovered ? (isDark ? 'var(--surface-color-4)' : 'var(--surface-color-1)')
    : isDark  ? 'var(--surface-color-5)'
    : 'var(--background)';

  const cardBorder = active
    ? '1px solid var(--primary)'
    : '1px solid var(--border)';

  const cardShadow = hovered && !disabled
    ? 'var(--shadow-flat-right-angle-4)'
    : 'var(--shadow-flat-right-angle-2)';

  const textColor = isDark ? 'var(--inverse-text-color)' : 'var(--text-color)';

  const headerBg = isDark ? 'var(--surface-color-4)' : 'var(--background)';

  const footerBg = isDark ? 'var(--surface-color-4)' : 'var(--surface-color-1)';

  const separatorColor = 'var(--border)';

  // ── Root element ───────────────────────────────────────────────────────────
  // interactive → <a> (navigation) or stays as <div role="button">
  const isClickable = interactive && !disabled;
  const Container: React.ElementType = interactive ? 'a' : 'div';

  const rootStyle: React.CSSProperties = {
    display:        'flex',
    flexDirection:  'column',
    minWidth:       '240px',
    backgroundColor: cardBg,
    color:          textColor,
    borderRadius:   'var(--radius)',           // 0px — @ds-card-border-radius
    border:         cardBorder,                // 1px solid var(--border)
    boxShadow:      cardShadow,               // flat right-angle shadow family
    fontFamily:     '"Open Sans", sans-serif',
    cursor:         disabled ? 'not-allowed' : isClickable ? 'pointer' : 'default',
    textDecoration: 'none',
    outline:        'none',
    // Matches card.less: transition border + box-shadow @ds-animation-duration-fast ease-out
    transition:     'border 0.15s ease-out, box-shadow 0.15s ease-out, background-color 0.15s ease-out',
    opacity:        disabled ? 'var(--disabled-opacity)' as unknown as number : undefined,
    pointerEvents:  disabled ? 'none' : undefined,
    ...style,
  };

  return (
    <>
      {/* Focus-visible ring: var(--focus-outline-color) per .zs-focus() mixin */}
      {isClickable && (
        <style dangerouslySetInnerHTML={{ __html: `
          .ds-card-interactive:focus-visible {
            outline: 2px solid var(--focus-outline-color) !important;
            outline-offset: 2px;
          }
        ` }} />
      )}

      <Container
        id={id}
        className={[className, isClickable ? 'ds-card-interactive' : ''].filter(Boolean).join(' ') || undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        onClick={isClickable ? onClick : undefined}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={
          isClickable
            ? (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        style={rootStyle}
      >
        {/* ── HEADER slot ─────────────────────────────────────────────────── */}
        {/* card.html: <header class="zs-padding-2 zs-border-bottom"> */}
        {hasHeader && (
          <header
            style={{
              minHeight:    '56px',
              padding:      '16px',
              backgroundColor: headerBg,
              borderBottom: collapsed ? 'none' : `1px solid ${separatorColor}`,
              display:      'flex',
              alignItems:   'center',
              justifyContent: headerTrailing ? 'space-between' : undefined,
              gap:          '12px',
              boxSizing:    'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
              {header}
            </div>
            {headerTrailing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {headerTrailing}
              </div>
            )}
          </header>
        )}

        {/* ── BODY slot ───────────────────────────────────────────────────── */}
        {/* card.html: <section class="zs-padding-2"> */}
        {!collapsed && (
          <section style={{ padding: '16px', flex: 1 }}>
            {body}
          </section>
        )}

        {/* ── FOOTER slot ─────────────────────────────────────────────────── */}
        {/* card.html: <footer class="zs-padding-2 zs-bg-surface-1"> */}
        {hasFooter && !collapsed && (
          <footer
            style={{
              minHeight:       '56px',
              padding:         '16px',
              backgroundColor: footerBg,
              display:         'flex',
              alignItems:      'center',
              boxSizing:       'border-box',
            }}
          >
            {footer}
          </footer>
        )}
      </Container>
    </>
  );
}

export default DSCard;
