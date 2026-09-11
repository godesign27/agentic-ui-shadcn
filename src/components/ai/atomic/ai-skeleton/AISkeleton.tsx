import React from 'react';
import { AI } from '../../tokens/ai-tokens';

const FONT = 'var(--zs-font-family, "Open Sans", system-ui, sans-serif)';

// ── Tokens ───────────────────────────────────────────────────────────────────
const TOKEN = {
  /** The one fill. Brand blue, not the standard's neutral grey. */
  skeleton:  `var(--zs-ai-skeleton-default, ${AI.color.brandSubtle})`,
  surface:   `var(--zs-ai-skeleton-surface, ${AI.color.brandSurface})`,
  separator: `var(--zs-ai-skeleton-separator, ${AI.color.brandBorder})`,
  text:      `var(--zs-ai-skeleton-text, ${AI.color.brandInk})`,
  helper:    `var(--zs-ai-skeleton-text-helper, ${AI.color.brandStrong})`,
  inverse:   'var(--zs-text-inverse, #ffffff)',
  icon:      `var(--zs-ai-skeleton-icon, ${AI.color.brand})`,
  // Brand chrome.
  brand:      AI.color.brand,
  brandInk:   AI.color.brandInk,
  brandBorder: AI.color.brandBorder,
} as const;

/**
 * The sweep highlight. A translucent full-strength brand band travelling over
 * the subtle brand base — the two ends of the same ramp, so the loader reads as
 * one colour in motion rather than two colours competing.
 */
const SWEEP = 'rgba(77, 96, 230, 0.30)';   // AI.color.brand @ 30%
const SWEEP_EDGE = 'rgba(77, 96, 230, 0)'; // same hue, transparent

// ── Motion ───────────────────────────────────────────────────────────────────

const SWEEP_STYLE_ID = 'ai-skeleton-motion';

function injectSweepKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SWEEP_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = SWEEP_STYLE_ID;
  // A band of fixed width travelling left→right. Fixed width matters for the
  // same reason it does on the progress bar: a band that grew would read as a
  // quantity, and a skeleton has no quantity to report.
  style.textContent = `
    @keyframes ai-skeleton-sweep {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    .ai-skeleton-sweep::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        ${SWEEP_EDGE} 0%,
        ${SWEEP} 50%,
        ${SWEEP_EDGE} 100%
      );
      animation: ai-skeleton-sweep var(--ai-skeleton-duration, 1600ms) ease-in-out infinite;
      animation-delay: var(--ai-skeleton-delay, 0ms);
    }
    @keyframes ai-skeleton-pulse {
      0%, 100% { opacity: 0.35; }
      50%      { opacity: 1; }
    }
    .ai-skeleton-pulse {
      animation: ai-skeleton-pulse var(--ai-skeleton-duration, 1600ms) ease-in-out infinite;
      animation-delay: var(--ai-skeleton-delay, 0ms);
    }
    @media (prefers-reduced-motion: reduce) {
      .ai-skeleton-sweep::after { animation: none; opacity: 0; }
      .ai-skeleton-pulse        { animation: none; opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export interface AISkeletonMotionProps {
  /**
   * Brand-tinted sweep. **On by default** — the inverse of the standard
   * component, where the Figma page ships no animation.
   */
  shimmer?: boolean;
  /**
   * Sweep duration in ms. Default 1600.
   *
   * Set through `--ai-skeleton-duration`, which **inherits** — so setting it on
   * any composed root (or any ancestor of your own) rescales every skeleton
   * below it. Slower reads calmer; faster reads busier.
   */
  duration?: number;
}

function useSweep(shimmer: boolean): string | undefined {
  React.useEffect(() => {
    if (shimmer) injectSweepKeyframes();
  }, [shimmer]);
  return shimmer ? 'ai-skeleton-sweep' : undefined;
}

/**
 * Motion custom properties. Both inherit, so a value set on a container reaches
 * every `::after` below it — the only way to reach a pseudo-element, since
 * inline styles cannot.
 */
function motionVars(delay?: number, duration?: number): React.CSSProperties | undefined {
  if (!delay && !duration) return undefined;
  const vars: Record<string, string> = {};
  if (delay)    vars['--ai-skeleton-delay']    = `${delay}ms`;
  if (duration) vars['--ai-skeleton-duration'] = `${duration}ms`;
  return vars as React.CSSProperties;
}

// ── Primitive ────────────────────────────────────────────────────────────────

export interface AISkeletonBlockProps extends AISkeletonMotionProps {
  width?: number | string;
  height?: number | string;
  /** Defaults to `AI.radius.xs`. Pass `AI.radius.full` for pill strips. */
  radius?: string;
  /**
   * Offset this block's sweep, in ms. Set through a custom property because the
   * animation lives on a ::after pseudo-element, which inline styles cannot
   * reach.
   */
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

/** The one rectangle every other shape is made of. Rounded, unlike the standard. */
export function AISkeletonBlock({
  width = '100%',
  height = 16,
  radius = AI.radius.xs,
  delay = 0,
  shimmer = true,
  duration,
  style,
  className,
}: AISkeletonBlockProps) {
  const sweep = useSweep(shimmer);
  const delayVar = motionVars(delay, duration);
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={[sweep, className].filter(Boolean).join(' ') || undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width,
        height,
        flexShrink: 0,
        background: TOKEN.skeleton,
        borderRadius: radius,
        ...delayVar,
        ...style,
      }}
    />
  );
}

// ── Atom 1 · profile ─────────────────────────────────────────────────────────

export interface AISkeletonProfileProps extends AISkeletonMotionProps {
  size?: number;
  style?: React.CSSProperties;
}

/**
 * 48×48 frame, 40×40 circle centered at x:4 y:4 — geometry unchanged. Rendered
 * as a full-radius block rather than the standard's circle vector: the standard
 * needs the vector because a rect radius is forbidden there, and here it isn't.
 */
export function AISkeletonProfile({ size = 48, shimmer = true, style }: AISkeletonProfileProps) {
  const inner = (size * 40) / 48;
  const offset = (size - inner) / 2;
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/profile"
      style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}
    >
      <AISkeletonBlock
        width={inner}
        height={inner}
        radius={AI.radius.full}
        shimmer={shimmer}
        style={{ position: 'absolute', left: offset, top: offset }}
      />
    </div>
  );
}

// ── Atom 2 · controls ────────────────────────────────────────────────────────

export interface AISkeletonControlsProps extends AISkeletonMotionProps {
  size?: number;
  style?: React.CSSProperties;
}

/** Two 24×24 squares 8px apart in a 56×24 frame. Always a pair. */
export function AISkeletonControls({ size = 24, shimmer = true, style }: AISkeletonControlsProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/controls"
      style={{ display: 'flex', gap: 8, height: size, flexShrink: 0, ...style }}
    >
      <AISkeletonBlock width={size} height={size} shimmer={shimmer} />
      <AISkeletonBlock width={size} height={size} shimmer={shimmer} />
    </div>
  );
}

// ── Atom 3 · header ──────────────────────────────────────────────────────────

export interface AISkeletonHeaderProps extends AISkeletonMotionProps {
  width?: number | string;
  height?: number;
  style?: React.CSSProperties;
}

/** A single 24px-tall title bar. 120px is a starting value, not a constraint. */
export function AISkeletonHeader({
  width = 120,
  height = 24,
  shimmer = true,
  style,
}: AISkeletonHeaderProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/header"
      style={{ width, height, flexShrink: 0, ...style }}
    >
      <AISkeletonBlock width="100%" height="100%" shimmer={shimmer} />
    </div>
  );
}

// ── Atom 4 · body ────────────────────────────────────────────────────────────

export interface AISkeletonBodyProps extends AISkeletonMotionProps {
  width?: number | string;
  /**
   * Stagger the two lines so the sweep reads as one pass over a paragraph
   * rather than two synchronized bars. Purely cosmetic; off under reduced
   * motion along with everything else.
   */
  stagger?: boolean;
  style?: React.CSSProperties;
}

/** Exactly two 16px lines, 16px apart. Not a line-count prop. */
export function AISkeletonBody({
  width = '100%',
  stagger = true,
  shimmer = true,
  style,
}: AISkeletonBodyProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/body"
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width, ...style }}
    >
      <AISkeletonBlock width="100%" height={16} shimmer={shimmer} />
      <AISkeletonBlock width="100%" height={16} shimmer={shimmer} delay={stagger ? 200 : 0} />
    </div>
  );
}

// ── Composed · card ──────────────────────────────────────────────────────────

export type AISkeletonCardVariant = 'profile-left' | 'profile-center' | 'title' | 'text';

export const AI_SKELETON_CARD_VARIANTS: AISkeletonCardVariant[] =
  ['profile-left', 'profile-center', 'title', 'text'];

export interface AISkeletonCardProps extends AISkeletonMotionProps {
  variant?: AISkeletonCardVariant;
  title?: string;
  width?: number | string;
  height?: number | string;
  announce?: boolean;
  style?: React.CSSProperties;
}

/**
 * 280×160, vertical, 10px item spacing — geometry unchanged. The shell takes
 * `AI.radius.sm` and the soft brand card shadow in place of the standard's
 * square white plate.
 */
export function AISkeletonCard({
  variant = 'profile-left',
  title = 'Card Title',
  width = 280,
  height = 160,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonCardProps) {
  const profile = variant === 'profile-left' || variant === 'profile-center';
  const padding = profile ? '16px' : '16px 32px';

  return (
    <div
      {...(announce ? { 'aria-busy': true, 'aria-live': 'polite' as const } : {})}
      data-name="ai-skeleton/card"
      style={{
        boxSizing: 'border-box',
        width,
        height,
        padding,
        background: TOKEN.surface,
        border: `1px solid ${TOKEN.brandBorder}`,
        borderRadius: AI.radius.sm,
        boxShadow: AI.shadow.card.default,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: variant === 'profile-left' ? 'flex-start' : 'center',
        fontFamily: FONT,
        ...motionVars(undefined, duration),
        ...style,
      }}
    >
      {profile && <AISkeletonProfile shimmer={shimmer} />}

      {variant === 'title' && <AISkeletonBlock width={96} height={16} shimmer={shimmer} />}

      {variant === 'text' && (
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 14,
            lineHeight: 1.5,
            color: TOKEN.text,
            textAlign: 'center',
          }}
        >
          {title}
        </span>
      )}

      {/*
        Fluid, not the Figma's literal 248px. A fixed inner width is fine at the
        drawn 280px card and wrong everywhere else: in a grid cell the bars
        escape the card and run across their neighbours. Width is a starting
        value on this component, so the interior has to follow the shell.
      */}
      <AISkeletonBody shimmer={shimmer} style={{ marginTop: 'auto', alignSelf: 'stretch' }} />
    </div>
  );
}

// ── Composed · table ─────────────────────────────────────────────────────────

export interface AISkeletonTableColumn {
  label?: string;
  width: number;
  icons?: boolean;
}

/** The nine Figma columns plus the leading 52px selection cell. Total 1913px. */
export const AI_SKELETON_TABLE_COLUMNS: AISkeletonTableColumn[] = [
  { width: 52 },
  { label: 'Name',           width: 190, icons: true },
  { label: 'Data',           width: 300, icons: true },
  { label: 'Recurrence',     width: 154 },
  { label: 'Number',         width: 180, icons: true },
  { label: 'Date',           width: 215, icons: true },
  { label: 'Date & time',    width: 225, icons: true },
  { label: 'Dropdown',       width: 198, icons: true },
  { label: 'Text with icon', width: 190, icons: true },
  { label: 'Actions',        width: 209 },
];

function TableHeaderIcons() {
  const s = { width: 18, height: 18, flexShrink: 0 } as const;
  return (
    <span aria-hidden="true" style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
      <svg {...s} viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke={TOKEN.icon} strokeWidth="1.4" />
        <rect x="8.3" y="7.6" width="1.4" height="5.4" fill={TOKEN.icon} />
        <rect x="8.3" y="4.8" width="1.4" height="1.6" fill={TOKEN.icon} />
      </svg>
      <svg {...s} viewBox="0 0 18 18" fill="none">
        <path d="M5.2 3.2 L5.2 13.4 M2.8 11 L5.2 13.6 L7.6 11" stroke={TOKEN.icon} strokeWidth="1.4" />
        <path d="M12.8 14.8 L12.8 4.6 M10.4 7 L12.8 4.4 L15.2 7" stroke={TOKEN.icon} strokeWidth="1.4" />
      </svg>
      <svg {...s} viewBox="0 0 18 18" fill="none">
        <rect x="2.2" y="4.5" width="13.6" height="1.5" fill={TOKEN.icon} />
        <rect x="4.4" y="8.2" width="9.2" height="1.5" fill={TOKEN.icon} />
        <rect x="6.6" y="11.9" width="4.8" height="1.5" fill={TOKEN.icon} />
      </svg>
    </span>
  );
}

export interface AISkeletonTableProps extends AISkeletonMotionProps {
  rows?: number;
  columns?: AISkeletonTableColumn[];
  header?: boolean;
  /**
   * Cascade the sweep down the rows so the table fills top-to-bottom. 80ms per
   * row — enough to read as a direction, short enough not to feel slow.
   */
  cascade?: boolean;
  style?: React.CSSProperties;
}

/**
 * A real header row over N skeleton rows. The header keeps its actual column
 * names and sort/filter affordances — the shape of the table is known before
 * the data is, so there is no reason to hide it.
 */
export function AISkeletonTable({
  rows = 7,
  columns = AI_SKELETON_TABLE_COLUMNS,
  header = true,
  cascade = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonTableProps) {
  const cell: React.CSSProperties = {
    boxSizing: 'border-box',
    height: 56,
    flexShrink: 0,
    background: TOKEN.surface,
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    overflow: 'hidden',
  };

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      data-name="ai-skeleton/table"
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FONT,
        border: `1px solid ${TOKEN.brandBorder}`,
        borderRadius: AI.radius.sm,
        overflow: 'hidden',
        ...motionVars(undefined, duration),
        ...style,
      }}
    >
      {header && (
        <div style={{ display: 'flex', alignItems: 'center' }} data-name="Header Row">
          {columns.map((col, i) => (
            <div
              key={`h-${i}`}
              style={{ ...cell, width: col.width, borderBottom: `1px solid ${TOKEN.separator}`, gap: 10 }}
            >
              {i === 0 ? (
                <span
                  aria-hidden="true"
                  style={{
                    width: 20,
                    height: 20,
                    background: TOKEN.brand,
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M5.2499 7.64745L12.8327 0L14 1.17627L5.2499 10L0 4.70593L1.16646 3.52966L5.2499 7.64745Z"
                      fill={TOKEN.inverse}
                    />
                  </svg>
                </span>
              ) : (
                <>
                  <span
                    style={{
                      flex: '1 0 0',
                      minWidth: 0,
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: 1.5,
                      letterSpacing: '-0.144px',
                      color: TOKEN.text,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.label}
                  </span>
                  {col.icons && <TableHeaderIcons />}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {Array.from({ length: rows }, (_, r) => (
        <div key={`r-${r}`} style={{ display: 'flex', alignItems: 'center' }} data-name="Skeleton Row">
          {columns.map((col, i) => (
            <div
              key={`c-${r}-${i}`}
              style={{ ...cell, width: col.width, borderBottom: `1px solid ${TOKEN.skeleton}` }}
            >
              <AISkeletonBlock width="100%" height={16} shimmer={shimmer} delay={cascade ? r * 80 : 0} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Composed · panel ─────────────────────────────────────────────────────────

export interface AISkeletonPanelProps extends AISkeletonMotionProps {
  items?: number;
  width?: number | string;
  height?: number | string;
  title?: string;
  onClose?: () => void;
  /** Cascade the sweep down the list, 60ms per row. */
  cascade?: boolean;
  style?: React.CSSProperties;
}

/**
 * A 400×900 side panel: a real header with a live close button over N
 * placeholder rows. The header is deliberately not skeleton — a user must be
 * able to back out of a panel that is still loading. Its fill swaps from ZDS
 * ink to `AI.color.brandInk`, which is the accent swap and nothing more.
 */
export function AISkeletonPanel({
  items = 10,
  width = 400,
  height = 900,
  title,
  onClose,
  cascade = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonPanelProps) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      data-name="ai-skeleton/panel"
      style={{
        boxSizing: 'border-box',
        width,
        height,
        background: TOKEN.surface,
        borderRadius: AI.radius.lg,
        boxShadow: AI.shadow.card.raised,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FONT,
        overflow: 'hidden',
        ...motionVars(undefined, duration),
        ...style,
      }}
    >
      {/* Menu Header — real chrome */}
      <div
        data-name="Menu Header"
        style={{
          height: 64,
          flexShrink: 0,
          background: TOKEN.brandInk,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 16,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          style={{
            width: 24,
            height: 24,
            padding: 0,
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: onClose ? 'pointer' : 'default',
          }}
        >
          <svg width="12.728" height="12.728" viewBox="0 0 12.728 12.728" fill="none">
            <path
              d="M6.364 4.95L11.314 0L12.728 1.414L7.778 6.364L12.728 11.314L11.314 12.728L6.364 7.778L1.414 12.728L0 11.314L4.95 6.364L0 1.414L1.414 0L6.364 4.95Z"
              fill={TOKEN.inverse}
            />
          </svg>
        </button>
      </div>

      {title && (
        <div
          data-name="Menu Title"
          style={{ boxSizing: 'border-box', height: 53, padding: '24px 0 20px 12px', flexShrink: 0 }}
        >
          <span style={{ fontFamily: FONT, fontSize: 14, lineHeight: 1.5, color: TOKEN.text }}>{title}</span>
        </div>
      )}

      {/* Menu List — skeleton rows */}
      <div
        data-name="Menu List"
        style={{ display: 'flex', flexDirection: 'column', paddingTop: title ? 0 : 16 }}
      >
        {Array.from({ length: items }, (_, i) => (
          <div
            key={i}
            data-name="Skeleton/list item"
            style={{ height: 48, flexShrink: 0, position: 'relative' }}
          >
            <AISkeletonBlock
              width={200}
              height={21}
              shimmer={shimmer}
              delay={cascade ? i * 60 : 0}
              style={{ position: 'absolute', left: 24, top: 13 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Atom 5 · media ───────────────────────────────────────────────────────────

export type AISkeletonMediaRatio = '16:9' | '4:3' | '3:2' | '1:1';

const MEDIA_RATIO: Record<AISkeletonMediaRatio, number> = {
  '16:9': 9 / 16,
  '4:3':  3 / 4,
  '3:2':  2 / 3,
  '1:1':  1,
};

export interface AISkeletonMediaProps extends AISkeletonMotionProps {
  ratio?: AISkeletonMediaRatio;
  width?: number | string;
  radius?: string;
  delay?: number;
  /** Centered glyph. `play` for video, `image` for stills, `none` for a bare plate. */
  glyph?: 'none' | 'play' | 'image';
  style?: React.CSSProperties;
}

/**
 * An aspect-ratio placeholder for imagery. Holds its own height from its width,
 * so a card never reflows when the picture lands — the whole point of a
 * skeleton, and the one shape the atom set was missing.
 */
export function AISkeletonMedia({
  ratio = '16:9',
  width = '100%',
  radius = AI.radius.sm,
  delay = 0,
  glyph = 'none',
  shimmer = true,
  duration,
  style,
}: AISkeletonMediaProps) {
  const sweep = useSweep(shimmer);
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/media"
      className={sweep}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width,
        paddingTop: `${MEDIA_RATIO[ratio] * 100}%`,
        background: TOKEN.skeleton,
        borderRadius: radius,
        ...motionVars(delay, duration),
        ...style,
      }}
    >
      {glyph !== 'none' && (
        <svg
          viewBox="0 0 24 24"
          width={28}
          height={28}
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {glyph === 'play' ? (
            <path d="M9 6.5 L18 12 L9 17.5 Z" fill={TOKEN.icon} />
          ) : (
            <>
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke={TOKEN.icon} strokeWidth="1.6" />
              <circle cx="8.5" cy="10" r="1.6" fill={TOKEN.icon} />
              <path d="M4.5 17.5 L10 12 L14 15.5 L17 13 L19.5 15.5" fill="none" stroke={TOKEN.icon} strokeWidth="1.6" />
            </>
          )}
        </svg>
      )}
    </div>
  );
}

// ── Atom 6 · paragraph ───────────────────────────────────────────────────────

export interface AISkeletonParagraphProps extends AISkeletonMotionProps {
  /** Line count. The last one is short. */
  lines?: number;
  width?: number | string;
  lineHeight?: number;
  gap?: number;
  /** Width of the final line. A ragged edge is what makes text look like text. */
  lastLineWidth?: number | string;
  /** Per-line sweep offset, in ms. */
  stagger?: number;
  style?: React.CSSProperties;
}

/**
 * Variable-length text. `AISkeletonBody` stays exactly two equal lines because
 * that is what the standard's Figma page draws; this is the free-form version
 * for anywhere the copy length is genuinely unknown.
 */
export function AISkeletonParagraph({
  lines = 3,
  width = '100%',
  lineHeight = 16,
  gap = 12,
  lastLineWidth = '60%',
  stagger = 120,
  shimmer = true,
  duration,
  style,
}: AISkeletonParagraphProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/paragraph"
      style={{ display: 'flex', flexDirection: 'column', gap, width, ...style }}
    >
      {Array.from({ length: Math.max(1, lines) }).map((_, i) => (
        <AISkeletonBlock
          key={i}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          height={lineHeight}
          shimmer={shimmer}
          duration={duration}
          delay={i * stagger}
        />
      ))}
    </div>
  );
}

// ── Composed · list row ──────────────────────────────────────────────────────

export interface AISkeletonListRowProps extends AISkeletonMotionProps {
  avatar?: boolean;
  /** Circular avatar, as in a feed. Square reads as a thumbnail. */
  avatarShape?: 'circle' | 'square';
  avatarSize?: number;
  /** A trailing affordance placeholder — a button, a chevron, a timestamp. */
  trailing?: boolean;
  divider?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

/** Avatar · two lines · optional trailing block. The most common loading shape there is. */
export function AISkeletonListRow({
  avatar = true,
  avatarShape = 'circle',
  avatarSize = 40,
  trailing = false,
  divider = true,
  delay = 0,
  shimmer = true,
  duration,
  style,
}: AISkeletonListRowProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/list-row"
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 0',
        width: '100%',
        borderBottom: divider ? `1px solid ${TOKEN.separator}` : undefined,
        ...motionVars(delay, duration),
        ...style,
      }}
    >
      {avatar && (
        <AISkeletonBlock
          width={avatarSize}
          height={avatarSize}
          radius={avatarShape === 'circle' ? AI.radius.full : AI.radius.xs}
          shimmer={shimmer}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 auto', minWidth: 0 }}>
        <AISkeletonBlock width="45%" height={12} shimmer={shimmer} />
        <AISkeletonBlock width="70%" height={12} shimmer={shimmer} />
      </div>
      {trailing && <AISkeletonBlock width={64} height={24} radius={AI.radius.full} shimmer={shimmer} />}
    </div>
  );
}

export interface AISkeletonListProps extends AISkeletonMotionProps {
  rows?: number;
  avatar?: boolean;
  avatarShape?: 'circle' | 'square';
  trailing?: boolean;
  /** Offset each row so the list fills top-to-bottom, matching the read direction. */
  cascade?: boolean;
  announce?: boolean;
  style?: React.CSSProperties;
}

export function AISkeletonList({
  rows = 5,
  avatar = true,
  avatarShape = 'circle',
  trailing = false,
  cascade = true,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonListProps) {
  return (
    <div
      aria-busy={announce ? true : undefined}
      aria-live={announce ? 'polite' : undefined}
      data-name="ai-skeleton/list"
      style={{ width: '100%', ...motionVars(undefined, duration), ...style }}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <AISkeletonListRow
          key={i}
          avatar={avatar}
          avatarShape={avatarShape}
          trailing={trailing}
          divider={i < rows - 1}
          delay={cascade ? i * 80 : 0}
          shimmer={shimmer}
        />
      ))}
    </div>
  );
}

// ── Composed · message ───────────────────────────────────────────────────────

export interface AISkeletonMessageProps extends AISkeletonMotionProps {
  /** `assistant` sits left in a tinted bubble; `user` sits right, bare. */
  from?: 'assistant' | 'user';
  lines?: number;
  width?: number | string;
  /** Three pulsing dots below the copy — the agent is still composing. */
  thinking?: boolean;
  announce?: boolean;
  style?: React.CSSProperties;
}

/**
 * A response being composed. This is the wait that actually happens most often
 * in this library and the atom set had nothing for it: an avatar, a ragged
 * paragraph, and an optional thinking tail.
 */
export function AISkeletonMessage({
  from = 'assistant',
  lines = 3,
  width = 420,
  thinking = true,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonMessageProps) {
  const assistant = from === 'assistant';
  React.useEffect(() => { if (thinking) injectSweepKeyframes(); }, [thinking]);

  return (
    <div
      aria-busy={announce ? true : undefined}
      aria-live={announce ? 'polite' : undefined}
      data-name="ai-skeleton/message"
      style={{
        display: 'flex',
        gap: 12,
        width,
        maxWidth: '100%',
        flexDirection: assistant ? 'row' : 'row-reverse',
        ...motionVars(undefined, duration),
        ...style,
      }}
    >
      <AISkeletonBlock width={32} height={32} radius={AI.radius.full} shimmer={shimmer} />
      <div
        style={{
          boxSizing: 'border-box',
          flex: '1 1 auto',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: assistant ? '16px 18px' : 0,
          background: assistant ? TOKEN.surface : undefined,
          border: assistant ? `1px solid ${TOKEN.brandBorder}` : undefined,
          borderRadius: assistant ? AI.radius.md : undefined,
        }}
      >
        <AISkeletonParagraph
          lines={lines}
          lineHeight={12}
          gap={10}
          lastLineWidth={assistant ? '55%' : '40%'}
          shimmer={shimmer}
        />
        {thinking && (
          <div aria-hidden="true" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="ai-skeleton-pulse"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: AI.radius.full,
                  background: TOKEN.brand,
                  ...motionVars(i * 180, duration),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Layout · grid ────────────────────────────────────────────────────────────

export interface AISkeletonGridProps extends AISkeletonMotionProps {
  count?: number;
  /** Fixed track count, or leave unset to auto-fill against `minItemWidth`. */
  columns?: number;
  minItemWidth?: number;
  gap?: number;
  /** Per-cell sweep offset, in ms. */
  stagger?: number;
  /** Defaults to an `AISkeletonCard`. */
  renderItem?: (index: number) => React.ReactNode;
  announce?: boolean;
  style?: React.CSSProperties;
}

/**
 * Repeats a skeleton across a responsive grid and owns the cascade, so callers
 * never hand-compute delays. The offset is set on each cell and inherits down,
 * which is what lets it reach the `::after` inside.
 */
export function AISkeletonGrid({
  count = 6,
  columns,
  minItemWidth = 240,
  gap = 16,
  stagger = 90,
  renderItem,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonGridProps) {
  return (
    <div
      aria-busy={announce ? true : undefined}
      aria-live={announce ? 'polite' : undefined}
      data-name="ai-skeleton/grid"
      style={{
        display: 'grid',
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
        gap,
        width: '100%',
        ...motionVars(undefined, duration),
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={motionVars(i * stagger)}>
          {renderItem
            ? renderItem(i)
            : <AISkeletonCard variant="text" width="100%" announce={false} shimmer={shimmer} />}
        </div>
      ))}
    </div>
  );
}

// ── Mode · overlay ───────────────────────────────────────────────────────────

export interface AISkeletonOverlayProps extends AISkeletonMotionProps {
  /** When false the overlay is gone and children are fully live. */
  busy?: boolean;
  radius?: string;
  /** How much of the stale content shows through. */
  opacity?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Refresh, not initial load — two different states that deserve two different
 * treatments. Real content stays mounted underneath and a sweeping plate sits
 * over it, so a table being re-fetched keeps its column widths and scroll
 * position instead of collapsing to bars.
 *
 * Children are **not** `aria-hidden`: the previous values are still true, just
 * stale. The wrapper carries `aria-busy`, and pointer events are blocked so
 * nobody acts on data that is about to change.
 */
export function AISkeletonOverlay({
  busy = true,
  radius = AI.radius.sm,
  opacity = 0.82,
  children,
  shimmer = true,
  duration,
  style,
}: AISkeletonOverlayProps) {
  const sweep = useSweep(shimmer && busy);
  return (
    <div
      aria-busy={busy || undefined}
      aria-live="polite"
      data-name="ai-skeleton/overlay"
      style={{ position: 'relative', ...motionVars(undefined, duration), ...style }}
    >
      <div style={{ pointerEvents: busy ? 'none' : undefined }}>{children}</div>
      {busy && (
        <div
          aria-hidden="true"
          className={sweep}
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: radius,
            background: TOKEN.surface,
            opacity,
          }}
        />
      )}
    </div>
  );
}

// ── Coverage · metric tile ───────────────────────────────────────────────────

export interface AISkeletonMetricTileProps extends AISkeletonMotionProps {
  label?: boolean;
  /** A trailing delta pill, as on `ai-trend-indicator`. */
  delta?: boolean;
  /** A thin plotted strip under the value, as on `ai-metric-tile`. */
  sparkline?: boolean;
  width?: number | string;
  bordered?: boolean;
  delay?: number;
  announce?: boolean;
  style?: React.CSSProperties;
}

/**
 * Covers `ai-metric-value`, `ai-metric-tile`, `ai-trend-indicator` and the KPI
 * row of `ai-card-metric` / `ai-generated-dashboard`.
 *
 * The value bar is deliberately taller and shorter than the label: a number is
 * the largest, briefest thing on a tile, and a skeleton that reverses that
 * reads as a paragraph.
 */
export function AISkeletonMetricTile({
  label = true,
  delta = true,
  sparkline = false,
  width = 200,
  bordered = true,
  delay = 0,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonMetricTileProps) {
  return (
    <div
      {...(announce ? { 'aria-busy': true, 'aria-live': 'polite' as const } : {})}
      data-name="ai-skeleton/metric-tile"
      style={{
        boxSizing: 'border-box',
        width,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: bordered ? 16 : 0,
        background: bordered ? TOKEN.surface : undefined,
        border: bordered ? `1px solid ${TOKEN.brandBorder}` : undefined,
        borderRadius: bordered ? AI.radius.sm : undefined,
        ...motionVars(delay, duration),
        ...style,
      }}
    >
      {label && <AISkeletonBlock width="55%" height={10} shimmer={shimmer} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <AISkeletonBlock width="40%" height={28} shimmer={shimmer} />
        {delta && <AISkeletonBlock width={52} height={18} radius={AI.radius.full} shimmer={shimmer} delay={120} />}
      </div>
      {sparkline && <AISkeletonBlock width="100%" height={24} shimmer={shimmer} delay={200} />}
    </div>
  );
}

// ── Coverage · chart ─────────────────────────────────────────────────────────

export type AISkeletonChartVariant = 'bar' | 'line' | 'donut';

/** Fixed, not random. A skeleton redrawing itself on every render is a distraction. */
const CHART_BARS = [0.45, 0.72, 0.55, 0.9, 0.6, 0.8, 0.5, 0.68];

export interface AISkeletonChartProps extends AISkeletonMotionProps {
  variant?: AISkeletonChartVariant;
  width?: number | string;
  height?: number;
  /** Axis rules. Off for a sparkline-style strip. */
  axis?: boolean;
  bars?: number;
  delay?: number;
  announce?: boolean;
  style?: React.CSSProperties;
}

/**
 * Covers `ai-card-analysis`, `ai-analysis-insight`, `ai-generated-dashboard` and
 * anything else that draws data.
 *
 * The bars carry **no** implied values — the heights are a fixed decorative
 * pattern. A chart skeleton that looked like a plausible reading would be a
 * claim about data nobody has yet.
 */
export function AISkeletonChart({
  variant = 'bar',
  width = '100%',
  height = 160,
  axis = true,
  bars = 8,
  delay = 0,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonChartProps) {
  // Hoisted: hooks cannot live inside the `donut` branch below.
  const sweep = useSweep(shimmer);
  const ring = Math.min(height, 140);

  return (
    <div
      {...(announce ? { 'aria-busy': true, 'aria-live': 'polite' as const } : {})}
      data-name="ai-skeleton/chart"
      style={{
        boxSizing: 'border-box',
        width,
        height,
        display: 'flex',
        alignItems: variant === 'donut' ? 'center' : 'stretch',
        justifyContent: variant === 'donut' ? 'center' : undefined,
        gap: 8,
        borderLeft: axis && variant !== 'donut' ? `1px solid ${TOKEN.separator}` : undefined,
        borderBottom: axis && variant !== 'donut' ? `1px solid ${TOKEN.separator}` : undefined,
        padding: variant === 'donut' ? 0 : '0 8px 0 8px',
        ...motionVars(delay, duration),
        ...style,
      }}
    >
      {variant === 'bar' && Array.from({ length: bars }).map((_, i) => (
        <div key={i} style={{ flex: '1 1 0', display: 'flex', alignItems: 'flex-end' }}>
          <AISkeletonBlock
            width="100%"
            height={`${CHART_BARS[i % CHART_BARS.length] * 100}%`}
            radius={AI.radius.xs}
            shimmer={shimmer}
            delay={i * 70}
          />
        </div>
      ))}

      {variant === 'line' && (
        <div style={{ position: 'relative', flex: '1 1 auto', alignSelf: 'stretch' }}>
          <AISkeletonBlock
            width="100%"
            height="100%"
            radius={AI.radius.xs}
            shimmer={shimmer}
            style={{ opacity: 0.5 }}
          />
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d="M0 32 L14 24 L28 28 L42 14 L56 20 L70 8 L84 15 L100 5" fill="none" stroke={TOKEN.icon} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      )}

      {variant === 'donut' && (
        <div
          aria-hidden="true"
          className={sweep}
          style={{
            width: ring,
            height: ring,
            borderRadius: AI.radius.full,
            border: `${Math.round(ring * 0.18)}px solid ${TOKEN.skeleton}`,
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative',
          }}
        />
      )}
    </div>
  );
}

// ── Coverage · timeline ──────────────────────────────────────────────────────

export interface AISkeletonTimelineProps extends AISkeletonMotionProps {
  steps?: number;
  /** `vertical` for a trace or handoff; `horizontal` for a stepper. */
  orientation?: 'vertical' | 'horizontal';
  cascade?: boolean;
  announce?: boolean;
  style?: React.CSSProperties;
}

/**
 * Covers `ai-reasoning-trace`, `ai-handoff-timeline`, `ai-agent-task-tracker`
 * and `zds-ai-stepper`.
 *
 * The connectors are real geometry rather than placeholders: the *shape* of a
 * process is known before its contents are, and drawing it early is what stops
 * the layout jumping when the steps resolve.
 */
export function AISkeletonTimeline({
  steps = 4,
  orientation = 'vertical',
  cascade = true,
  announce = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonTimelineProps) {
  const vertical = orientation === 'vertical';

  return (
    <div
      {...(announce ? { 'aria-busy': true, 'aria-live': 'polite' as const } : {})}
      data-name="ai-skeleton/timeline"
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: vertical ? 'stretch' : 'flex-start',
        gap: vertical ? 0 : 8,
        width: '100%',
        ...motionVars(undefined, duration),
        ...style,
      }}
    >
      {Array.from({ length: steps }).map((_, i) => {
        const delay = cascade ? i * 90 : 0;
        const last = i === steps - 1;

        return vertical ? (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
              <AISkeletonBlock width={16} height={16} radius={AI.radius.full} shimmer={shimmer} delay={delay} />
              {!last && <div style={{ flex: '1 1 auto', width: 2, minHeight: 24, background: TOKEN.separator }} />}
            </div>
            <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: last ? 0 : 20 }}>
              <AISkeletonBlock width="35%" height={12} shimmer={shimmer} delay={delay} />
              <AISkeletonBlock width="80%" height={12} shimmer={shimmer} delay={delay + 90} />
            </div>
          </div>
        ) : (
          <div key={i} style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AISkeletonBlock width={16} height={16} radius={AI.radius.full} shimmer={shimmer} delay={delay} />
              {!last && <div style={{ flex: '1 1 auto', height: 2, background: TOKEN.separator }} />}
            </div>
            <AISkeletonBlock width="70%" height={12} shimmer={shimmer} delay={delay} />
          </div>
        );
      })}
    </div>
  );
}

// ── Coverage · field ─────────────────────────────────────────────────────────

export interface AISkeletonFieldProps extends AISkeletonMotionProps {
  label?: boolean;
  helper?: boolean;
  /** Matches the AI field heights: 50 / 44 / 38. */
  size?: 'normal' | 'small' | 'xsmall';
  width?: number | string;
  delay?: number;
  style?: React.CSSProperties;
}

const FIELD_HEIGHT: Record<NonNullable<AISkeletonFieldProps['size']>, number> = {
  normal: 50,
  small: 44,
  xsmall: 38,
};

/**
 * Covers `ai-input-field`, `ai-picker`, `ai-date-picker`, `ai-time-picker`,
 * `ai-search` and any form inside `ai-dialog`.
 *
 * The control keeps the real field's height and `AI.radius.md`, so a form does
 * not resize the instant it becomes editable.
 */
export function AISkeletonField({
  label = true,
  helper = false,
  size = 'normal',
  width = '100%',
  delay = 0,
  shimmer = true,
  duration,
  style,
}: AISkeletonFieldProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/field"
      style={{ display: 'flex', flexDirection: 'column', gap: 8, width, ...motionVars(delay, duration), ...style }}
    >
      {label && <AISkeletonBlock width={96} height={12} shimmer={shimmer} />}
      <AISkeletonBlock width="100%" height={FIELD_HEIGHT[size]} radius={AI.radius.md} shimmer={shimmer} delay={80} />
      {helper && <AISkeletonBlock width="60%" height={10} shimmer={shimmer} delay={160} />}
    </div>
  );
}

// ── Coverage · chips ─────────────────────────────────────────────────────────

/** Fixed widths, so a chip row does not reshuffle on every render. */
const CHIP_WIDTHS = [72, 96, 64, 108, 80, 88];

export interface AISkeletonChipsProps extends AISkeletonMotionProps {
  count?: number;
  height?: number;
  cascade?: boolean;
  style?: React.CSSProperties;
}

/**
 * Covers `ai-chip`, `ai-badge`, `ai-confidence-risk-badge`, `ai-source-tile`,
 * `ai-file-attachment` and the tag rows on the card family. Uneven widths are
 * the point — a row of identical pills reads as a control, not as content.
 */
export function AISkeletonChips({
  count = 4,
  height = 28,
  cascade = true,
  shimmer = true,
  duration,
  style,
}: AISkeletonChipsProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-name="ai-skeleton/chips"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 8, ...motionVars(undefined, duration), ...style }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <AISkeletonBlock
          key={i}
          width={CHIP_WIDTHS[i % CHIP_WIDTHS.length]}
          height={height}
          radius={AI.radius.full}
          shimmer={shimmer}
          delay={cascade ? i * 70 : 0}
        />
      ))}
    </div>
  );
}

export const AISkeleton = {
  Block: AISkeletonBlock,
  Profile: AISkeletonProfile,
  Controls: AISkeletonControls,
  Header: AISkeletonHeader,
  Body: AISkeletonBody,
  Card: AISkeletonCard,
  Table: AISkeletonTable,
  Panel: AISkeletonPanel,
  Media: AISkeletonMedia,
  Paragraph: AISkeletonParagraph,
  ListRow: AISkeletonListRow,
  List: AISkeletonList,
  Message: AISkeletonMessage,
  Grid: AISkeletonGrid,
  Overlay: AISkeletonOverlay,
  MetricTile: AISkeletonMetricTile,
  Chart: AISkeletonChart,
  Timeline: AISkeletonTimeline,
  Field: AISkeletonField,
  Chips: AISkeletonChips,
};

export default AISkeleton;
