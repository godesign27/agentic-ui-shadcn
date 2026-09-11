/**
 * AISupervisorBar — ZAIDYN Agentic AI Atom
 *
 * Page-level supervisor agent identity strip. Sits flush against the top
 * edge of an AI Led page (no border-radius, no left/right margin). Three
 * tone variants:
 *
 *   tan   — ZSAI tan companion surface (default; warmest, calmest)
 *   dark  — Inverted brand-ink surface (high-emphasis / hero)
 *   light — Neutral white surface with subtle border-bottom (low chrome)
 *
 * Responsive layout:
 *   Desktop (≥ 480 px):  [Avatar · Name + role · stat line]  [actions · moreMenu]
 *   Mobile  (<  480 px):  Row 1 — [Avatar · Name]  [moreMenu ···]
 *                          Row 2 — [role · stat · meta] (indented to align under Name)
 *   On mobile, `actions` is hidden — all actions should live in the `moreMenu` trigger.
 */

import React, { useRef, useState, useEffect } from 'react';
import { AI, ZSAI_TAN, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar } from '../ai-avatar/AIAvatar';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AISupervisorBarTone = 'tan' | 'dark' | 'light';

export interface AISupervisorBarProps {
  /** Agent display name, e.g. "Smart Assist". */
  name:         string;
  /**
   * Inline role marker. Pass a string for a small meta-label, or any React
   * node (e.g. AIChipBrief) to render verbatim. Defaults to "Supervisor agent".
   */
  role?:        React.ReactNode;
  /** Short secondary line — e.g. "7 tasks tracked". Pairs with `meta`. */
  stat?:        string;
  /** Secondary metadata appended after the stat — e.g. "Updated 2m ago". */
  meta?:        string;
  /** Color tone. Defaults to "tan". */
  tone?:        AISupervisorBarTone;
  /** Avatar pixel size. Defaults to 36. */
  avatarSize?:  number;
  /**
   * Desktop-only inline action buttons (e.g. "+ New task"). These are hidden
   * on mobile — use `moreMenu` for the overflow trigger that works everywhere.
   */
  actions?:     React.ReactNode;
  /**
   * Overflow / three-dot menu trigger. Shown on both mobile and desktop.
   * On mobile this is the ONLY action control visible — all actions should
   * be accessible through this menu. On desktop it sits to the right of `actions`.
   */
  moreMenu?:    React.ReactNode;
  /** Optional onClick — when set the bar is rendered as role="button". */
  onClick?:     () => void;
  /** Accessible label override — defaults to `${name}, ${role}`. */
  ariaLabel?:   string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tone tokens
// ─────────────────────────────────────────────────────────────────────────────

interface ToneCfg {
  bg:           string;
  borderBottom: string;
  nameColor:    string;
  roleColor:    string;
  statColor:    string;
}

const TONE_CFG: Record<AISupervisorBarTone, ToneCfg> = {
  tan: {
    bg:           ZSAI_TAN['00'],
    borderBottom: ZSAI_TAN[30],
    nameColor:    ZSAI_TAN[100],
    roleColor:    ZSAI_TAN[80],
    statColor:    ZSAI_TAN[80],
  },
  dark: {
    bg:           AI.color.brandInk,
    borderBottom: AI.color.brandInk,
    nameColor:    AI.color.text.onAction,
    roleColor:    'rgba(255,255,255,0.78)',
    statColor:    'rgba(255,255,255,0.7)',
  },
  light: {
    bg:           '#FFFFFF',
    borderBottom: 'var(--ai-card-border)',
    nameColor:    'var(--ai-zds-text)',
    roleColor:    'var(--ai-zds-helper)',
    statColor:    'var(--ai-zds-helper)',
  },
};

const MOBILE_BREAKPOINT = 480;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function AISupervisorBar({
  name,
  role       = 'Supervisor agent',
  stat,
  meta,
  tone       = 'tan',
  avatarSize = 36,
  actions,
  moreMenu,
  onClick,
  ariaLabel,
}: AISupervisorBarProps) {
  const cfg = TONE_CFG[tone];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setIsMobile(entry.contentRect.width < MOBILE_BREAKPOINT);
    });
    observer.observe(el);
    // Sync immediately so first render isn't wrong on narrow containers.
    setIsMobile(el.getBoundingClientRect().width < MOBILE_BREAKPOINT);
    return () => observer.disconnect();
  }, []);

  const secondaryLine = [
    typeof role === 'string' && role ? role : null,
    stat,
    meta,
  ].filter(Boolean).join(' · ');

  const padY = Math.max(10, Math.round((64 - avatarSize) / 2));

  if (isMobile) {
    // ── Mobile layout ───────────────────────────────────────────────────────
    // Row 1: Avatar · Name (flex-1) · moreMenu (···)
    // Row 2: role · stat · meta — indented by avatar width + gap
    const indent = avatarSize + 14; // avatarSize + gap
    return (
      <div
        ref={containerRef}
        role={onClick ? 'button' : 'banner'}
        aria-label={ariaLabel ?? (typeof role === 'string' ? `${name}, ${role}` : name)}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: `${padY}px 16px`,
          background: cfg.bg,
          borderBottom: `1px solid ${cfg.borderBottom}`,
          fontFamily: F,
          cursor: onClick ? 'pointer' : 'default',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {/* Row 1 — Avatar · Name · ··· */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <AIAvatar size={avatarSize} />
          <span style={{
            flex: 1,
            minWidth: 0,
            ...AI_TYPOGRAPHY['@zsai-card-title'],
            color: cfg.nameColor,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {name}
          </span>
          {moreMenu && (
            <div style={{ flexShrink: 0 }}>
              {moreMenu}
            </div>
          )}
        </div>

        {/* Row 2 — role · stat · meta (indented to align under name) */}
        {secondaryLine && (
          <div style={{
            paddingLeft: indent,
            ...AI_TYPOGRAPHY['@zsai-meta-label'],
            color: cfg.statColor,
          }}>
            {secondaryLine}
          </div>
        )}
      </div>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      role={onClick ? 'button' : 'banner'}
      aria-label={ariaLabel ?? (typeof role === 'string' ? `${name}, ${role}` : name)}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: `${padY}px 20px`,
        background: cfg.bg,
        borderBottom: `1px solid ${cfg.borderBottom}`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: F,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <AIAvatar size={avatarSize} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Name + role marker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexWrap: 'wrap' }}>
          <span style={{ ...AI_TYPOGRAPHY['@zsai-card-title'], color: cfg.nameColor }}>
            {name}
          </span>
          {typeof role === 'string'
            ? (role && (
                <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: cfg.roleColor }}>
                  {role}
                </span>
              ))
            : role}
        </div>
        {/* Stat line */}
        {(stat || meta) && (
          <div style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: cfg.statColor }}>
            {[stat, meta].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>

      {(actions || moreMenu) && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {actions}
          {moreMenu}
        </div>
      )}
    </div>
  );
}

export default AISupervisorBar;
