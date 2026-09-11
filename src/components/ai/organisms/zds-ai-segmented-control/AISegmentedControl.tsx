import React, { useState } from 'react';
import { AI, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

/**
 * AISegmentedControl — the ZDS Segmented Control, re-imagined in the ZAIDYN AI
 * brand, built on the signature "Pill" treatment that used to live inside AITab.
 *
 * It mirrors the standard ZDS Segmented Control contract one-to-one — mutually
 * exclusive options, Solid + Outline types, Normal / Small / X-Small sizes,
 * Default / Hover / Pressed / Disabled interaction states, keyboard focus and a
 * Full-width stretch mode — but keeps the AI pill aesthetic:
 *
 *   - track            --ai-card-bg-raised on --ai-card-border, fully rounded
 *   - Solid active     AI.gradient.action.full fill, white label, soft brand glow
 *   - Outline active   transparent chip with an AI.color.brand (#4D60E6) border + brand label
 *   - inactive         transparent chip, --ai-zds-text label
 *   - hover / pressed   --ai-card-bg / AI.color.brandSubtle tints
 *   - focus ring       AI.color.border.focus (#4D60E6)
 *   - shape            AI.radius.full — fully-rounded chips (the standard is square)
 *
 * Consumes AI tokens only (ai-tokens.ts / ai-typography.ts) — no fork of the
 * standard component, no raw hex outside the token layer.
 */

export type AISegmentedType = 'solid' | 'outline';
export type AISegmentedSize = 'normal' | 'small' | 'x-small';
export type AISegmentedInteraction = 'default' | 'hover' | 'pressed' | 'disabled';

export interface AISegment {
  label: string;
  value: string;
  /** Leading zs-icon glyph name (e.g. "sparkle", "link"). */
  leftIcon?: string;
  disabled?: boolean;
}

export interface AISegmentedControlProps {
  segments: AISegment[];
  value: string;
  onChange: (value: string) => void;
  type?: AISegmentedType;
  size?: AISegmentedSize;
  /** Stretch segments to fill the available width. */
  fullWidth?: boolean;
  'aria-label'?: string;
  /**
   * Docs-only: force per-segment interaction states for static state previews.
   * When omitted the control resolves hover/press live from pointer events.
   */
  states?: AISegmentedInteraction[];
  /** Docs-only: force a focus ring on the segment at this index. */
  focusIndex?: number;
}

const F = ZDS.font;

// Pill dimensions per size — taller/rounder than the square standard control.
const SEG_DIMS: Record<AISegmentedSize, { h: number; padX: number; fs: number; icon: number }> = {
  normal:    { h: 40, padX: 18, fs: 16, icon: 16 },
  small:     { h: 35, padX: 16, fs: 14, icon: 14 },
  'x-small': { h: 30, padX: 14, fs: 12, icon: 12 },
};

// ── AI-tinted zsIcon glyph (catalog font, never inline SVG) ──────────────────
function AiIcon({ name, size = 16, color }: { name: string; size?: number; color: string }) {
  return (
    <span className="zs-master-style" style={{ display: 'inline-flex', flex: 'none' }}>
      <span
        aria-hidden="true"
        role="img"
        className={`zs-icon zs-icon-${name}`}
        style={{
          fontSize: size, lineHeight: 1, width: size, height: size,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color, flex: 'none',
        }}
      />
    </span>
  );
}

export function AISegmentedControl({
  segments,
  value,
  onChange,
  type = 'solid',
  size = 'normal',
  fullWidth = false,
  'aria-label': ariaLabel = 'View options',
  states,
  focusIndex = -1,
}: AISegmentedControlProps) {
  const d = SEG_DIMS[size] ?? SEG_DIMS.normal;
  const [hover, setHover] = useState(-1);
  const [press, setPress] = useState(-1);
  const [focus, setFocus] = useState(-1);

  const brand = AI.color.brand; // #4D60E6
  const focusRing = `0 0 0 2px var(--ai-card-bg-raised), 0 0 0 4px ${AI.color.border.focus}`;

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        gap: 4, padding: 4, boxSizing: 'border-box',
        background: 'var(--ai-card-bg-raised)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: AI.radius.full,
        fontFamily: F,
      }}
    >
      {segments.map((seg, i) => {
        const isActive = seg.value === value;
        // Interaction state: forced (docs) or live (pointer).
        const forced = states?.[i];
        const disabled = seg.disabled || forced === 'disabled';
        const isHover = forced ? forced === 'hover' : i === hover && !disabled;
        const isPressed = forced ? forced === 'pressed' : i === press && !disabled;
        const showFocus = focusIndex === i || focus === i;

        // Resolve background / text per Type × active × interaction.
        let bg: string;
        let color: string;
        let border = 'none';
        let shadow = 'none';

        if (isActive && type === 'solid') {
          bg = isPressed
            ? AI.color.action.primaryActive
            : isHover
              ? AI.color.action.primaryHover
              : (AI.gradient.action.full as string);
          color = AI.color.text.onAction;
          shadow = `0 4px 12px ${AI.shadow.action.default}`;
        } else if (isActive && type === 'outline') {
          bg = isHover || isPressed ? 'var(--ai-card-bg)' : 'transparent';
          color = brand;
          border = `1px solid ${brand}`;
        } else {
          // Inactive chip
          bg = isPressed
            ? AI.color.brandSubtle
            : isHover
              ? 'var(--ai-card-bg)'
              : 'transparent';
          color = 'var(--ai-zds-text)';
        }

        const iconColor = isActive && type === 'solid' ? AI.color.text.onAction : brand;

        return (
          <button
            key={seg.value}
            role="radio"
            aria-checked={isActive}
            aria-label={seg.label}
            disabled={disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !disabled && onChange(seg.value)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => { setHover(-1); setPress(-1); }}
            onMouseDown={() => setPress(i)}
            onMouseUp={() => setPress(-1)}
            onFocus={() => setFocus(i)}
            onBlur={() => setFocus(-1)}
            style={{
              position: 'relative',
              flex: fullWidth ? '1 1 0' : '0 0 auto',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              height: d.h, padding: `0 ${d.padX}px`, margin: 0,
              border, borderRadius: AI.radius.full,
              background: bg, color,
              boxShadow: showFocus ? focusRing : shadow,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.55 : 1,
              boxSizing: 'border-box',
              ...AI_TYPOGRAPHY['@zsai-body-small'], fontFamily: F, fontSize: d.fs,
              fontWeight: isActive ? 600 : 500,
              whiteSpace: 'nowrap',
              transition: 'background .18s ease-out, color .12s ease-out, box-shadow .12s ease-out',
            }}
          >
            {seg.leftIcon && <AiIcon name={seg.leftIcon} size={d.icon} color={iconColor} />}
            <span>{seg.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default AISegmentedControl;
