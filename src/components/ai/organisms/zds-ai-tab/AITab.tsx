import React, { useState } from 'react';
import { AI, ZDS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

/**
 * AITab — the ZDS Tab, re-imagined in the ZAIDYN AI brand.
 *
 * This is the AI-surface sibling of the standard ZDS Tab (src/tab/). It keeps
 * the same information architecture — Solid (underline bar), Outline (bordered
 * boxes joined to a content container) and Vertical orientations, optional
 * leading/trailing icons, content panels, and full roving-tabindex keyboard
 * support — but re-anchors every visual token to the AI system:
 *
 *   - active accent      AI.color.brand            #4D60E6  (was teal)
 *   - active fill / tint AI.color.brandSubtle      #D2DBFF
 *   - surfaces           --ai-card-bg / --ai-card-bg-raised
 *   - border             --ai-card-border
 *   - text / helper      --ai-zds-text / --ai-zds-helper
 *   - shape              AI.radius.md / .full (rounded — the base is square)
 *   - active bar         AI.gradient.action.full   (brand gradient)
 *   - focus ring         AI.color.border.focus     #4D60E6
 *   - typography         @zsai-* tokens
 *
 * The AI-native fully-rounded "Pill" segmented treatment now lives in its own
 * component — AISegmentedControl (ai/atomic/segmented-control/) — the AI sibling
 * of the standard ZDS Segmented Control.
 *
 * Consumes AI tokens only (ai-tokens.ts / ai-typography.ts) — no fork of the
 * standard component, no raw hex outside the token layer.
 */

export type AITabStyle = 'solid' | 'outline' | 'vertical';

export interface AITabItem {
  label: string;
  /** Leading zs-icon glyph name (e.g. "sparkle", "link"). */
  leftIcon?: string;
  /** Trailing zs-icon glyph name. */
  rightIcon?: string;
  /** Body content for the matching panel (Outline / Solid-with-content / Pill). */
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface AITabProps {
  items: AITabItem[];
  /** Visual style. */
  variant?: AITabStyle;
  /** Show the joined content-panel below (Solid) — Outline always shows it. */
  withPanel?: boolean;
  /** Controlled active index. */
  value?: number;
  /** Uncontrolled initial active index. */
  defaultValue?: number;
  onChange?: (index: number) => void;
  /** Corner radius token for Outline surfaces. */
  radius?: keyof typeof AI.radius;
}

/** Default corner radius for AI tab surfaces (xs = 6px — two steps down from md). */
const DEFAULT_RADIUS: keyof typeof AI.radius = 'xs';

const BAR = 3;
const F = ZDS.font;
// Content-panel fill — AI brand blue (#4D60E6 = rgb(77,96,230)) fading top→bottom to 0%.
// Top-down AI-brand wash for the active tab — fades to 0% before the tab's bottom edge.
const TAB_GRADIENT = 'linear-gradient(180deg, rgba(77,96,230,0.14) 0%, rgba(77,96,230,0) 78%)';
const LOREM =
  'The assistant analysed the selected dataset and surfaced the highlights here. Switch tabs to review each generated section — every panel is produced from the same run.';

// ── AI-tinted zsIcon glyph (catalog font, never inline SVG) ──────────────────
// The glyph rules are scoped to `.zs-master-style .zs-icon-*::before`, so the
// icon element needs a `.zs-master-style` ANCESTOR to resolve its glyph. AI
// surfaces don't sit under that scope, so we self-scope with a wrapper span.
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

function Label({ item, textColor, iconColor }: { item: AITabItem; textColor: string; iconColor: string }) {
  return (
    <>
      {item.leftIcon && <AiIcon name={item.leftIcon} color={textColor} />}
      <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
      {item.rightIcon && <AiIcon name={item.rightIcon} color={iconColor} />}
    </>
  );
}

// Shared roving-tabindex keyboard handler.
function makeKeyHandler(
  count: number, setActive: (i: number) => void, orientation: 'horizontal' | 'vertical',
  isEnabled: (i: number) => boolean,
) {
  const next = (from: number, dir: 1 | -1) => {
    let i = from;
    for (let step = 0; step < count; step++) {
      i = (i + dir + count) % count;
      if (isEnabled(i)) return i;
    }
    return from;
  };
  return (e: React.KeyboardEvent, current: number) => {
    const fwd = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const back = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    if (e.key === fwd)  { e.preventDefault(); setActive(next(current, 1)); }
    if (e.key === back) { e.preventDefault(); setActive(next(current, -1)); }
    if (e.key === 'Home') { e.preventDefault(); for (let i = 0; i < count; i++) if (isEnabled(i)) { setActive(i); break; } }
    if (e.key === 'End')  { e.preventDefault(); for (let i = count - 1; i >= 0; i--) if (isEnabled(i)) { setActive(i); break; } }
  };
}

function useActive(props: AITabProps) {
  const [uncontrolled, setUncontrolled] = useState(props.defaultValue ?? 0);
  const isControlled = props.value !== undefined;
  const active = isControlled ? (props.value as number) : uncontrolled;
  const setActive = (i: number) => {
    if (!isControlled) setUncontrolled(i);
    props.onChange?.(i);
  };
  return [active, setActive] as const;
}

// ── Public component ─────────────────────────────────────────────────────────
export function AITab(props: AITabProps) {
  const { items, variant = 'solid', withPanel = false, radius = DEFAULT_RADIUS } = props;
  const [active, setActive] = useActive(props);
  const [hover, setHover] = useState(-1);
  const [focus, setFocus] = useState(-1);

  const brand = AI.color.brand;                 // #4D60E6
  const focusRing = `0 0 0 2px var(--ai-card-bg), 0 0 0 4px ${AI.color.border.focus}`;
  const isEnabled = (i: number) => !items[i]?.disabled;

  const panel = (i: number): React.ReactNode => (
    <div style={{ ...AI_TYPOGRAPHY['@zsai-body'], color: 'var(--ai-zds-text)' }}>
      <div style={{ ...AI_TYPOGRAPHY['@zsai-card-title'], color: 'var(--ai-zds-text)', marginBottom: 6 }}>
        {items[i]?.label}
      </div>
      {items[i]?.content ?? LOREM}
    </div>
  );

  // ── VERTICAL ───────────────────────────────────────────────────────────────
  if (variant === 'vertical') {
    const onKey = makeKeyHandler(items.length, setActive, 'vertical', isEnabled);
    return (
      <div style={{ display: 'inline-flex', gap: 16, alignItems: 'stretch' }}>
        <div role="tablist" aria-orientation="vertical" style={{ display: 'inline-flex', flexDirection: 'column', width: 200, gap: 4 }}>
          {items.map((item, i) => {
            const isActive = i === active;
            const isHover = i === hover && isEnabled(i);
            const textColor = item.disabled ? 'var(--ai-zds-helper)' : isActive ? brand : 'var(--ai-zds-text)';
            return (
              <button
                key={item.label} role="tab" aria-selected={isActive} disabled={item.disabled}
                tabIndex={isActive ? 0 : -1}
                onClick={() => isEnabled(i) && setActive(i)}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
                onFocus={() => setFocus(i)} onBlur={() => setFocus(-1)}
                onKeyDown={(e) => onKey(e, i)}
                style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                  boxSizing: 'border-box', padding: '10px 16px', margin: 0, border: 'none', textAlign: 'left',
                  background: isActive ? AI.color.brandSubtle : isHover ? 'var(--ai-card-bg-raised)' : 'transparent',
                  borderRadius: AI.radius.xs, cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.55 : 1,
                  ...AI_TYPOGRAPHY['@zsai-body-small'], fontFamily: F,
                  fontWeight: isActive ? 600 : 400, color: textColor,
                  boxShadow: focus === i ? focusRing : 'none',
                }}
              >
                <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: BAR, borderRadius: BAR, background: isActive ? AI.gradient.action.full : 'transparent' }} />
                <Label item={item} textColor={textColor} iconColor={brand} />
              </button>
            );
          })}
        </div>
        {(withPanel || items.some((it) => it.content)) && (
          <div role="tabpanel" style={{
            flex: 1, minWidth: 260, background: 'var(--ai-card-bg)',
            border: '1px solid var(--ai-card-border)',
            borderRadius: AI.radius[radius], padding: 18,
          }}>
            {panel(active)}
          </div>
        )}
      </div>
    );
  }

  // ── OUTLINE ──────────────────────────────────────────────────────────────
  if (variant === 'outline') {
    const onKey = makeKeyHandler(items.length, setActive, 'horizontal', isEnabled);
    const r = AI.radius[radius];
    return (
      <div style={{ display: 'inline-block', minWidth: 320 }}>
        <div role="tablist" aria-orientation="horizontal" style={{ display: 'flex', gap: 6 }}>
          {items.map((item, i) => {
            const isActive = i === active;
            const isHover = i === hover && isEnabled(i);
            const textColor = item.disabled ? 'var(--ai-zds-helper)' : isActive ? brand : 'var(--ai-zds-text)';
            return (
              <button
                key={item.label} role="tab" aria-selected={isActive} disabled={item.disabled}
                tabIndex={isActive ? 0 : -1}
                onClick={() => isEnabled(i) && setActive(i)}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
                onFocus={() => setFocus(i)} onBlur={() => setFocus(-1)}
                onKeyDown={(e) => onKey(e, i)}
                style={{
                  position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 16px', margin: 0, cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.55 : 1,
                  background: isActive ? TAB_GRADIENT : isHover ? 'var(--ai-card-bg-raised)' : 'transparent',
                  color: textColor, ...AI_TYPOGRAPHY['@zsai-body-small'], fontFamily: F,
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: `1px solid ${isActive ? 'var(--ai-card-border)' : 'transparent'}`,
                  borderRight: `1px solid ${isActive ? 'var(--ai-card-border)' : 'transparent'}`,
                  borderTop: 'none',
                  borderBottom: `1px solid ${isActive ? 'var(--ai-card-bg)' : 'transparent'}`,
                  borderTopLeftRadius: r, borderTopRightRadius: r,
                  marginBottom: -1, zIndex: isActive ? 1 : 0,
                  boxShadow: focus === i ? focusRing : 'none',
                }}
              >
                <Label item={item} textColor={textColor} iconColor={brand} />
              </button>
            );
          })}
        </div>
        <div role="tabpanel" style={{
          background: 'var(--ai-card-bg)', border: '1px solid var(--ai-card-border)',
          borderRadius: r, borderTopLeftRadius: 0, padding: 18, position: 'relative',
        }}>
          {panel(active)}
        </div>
      </div>
    );
  }

  // ── SOLID (default) ──────────────────────────────────────────────────────
  const onKey = makeKeyHandler(items.length, setActive, 'horizontal', isEnabled);
  return (
    <div style={{ display: 'inline-block', minWidth: withPanel ? 360 : undefined }}>
      <div role="tablist" aria-orientation="horizontal" style={{
        display: 'inline-flex', gap: 28, borderBottom: '1px solid var(--ai-card-border)',
      }}>
        {items.map((item, i) => {
          const isActive = i === active;
          const isHover = i === hover && isEnabled(i);
          const textColor = item.disabled ? 'var(--ai-zds-helper)'
            : isActive ? brand : isHover ? 'var(--ai-zds-text)' : 'var(--ai-zds-helper)';
          const bar = isActive ? AI.gradient.action.full : isHover ? AI.color.brandBorder : 'transparent';
          return (
            <button
              key={item.label} role="tab" aria-selected={isActive} disabled={item.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => isEnabled(i) && setActive(i)}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
              onFocus={() => setFocus(i)} onBlur={() => setFocus(-1)}
              onKeyDown={(e) => onKey(e, i)}
              style={{
                position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 2px', margin: 0, border: 'none', background: 'none',
                cursor: item.disabled ? 'not-allowed' : 'pointer', opacity: item.disabled ? 0.55 : 1,
                ...AI_TYPOGRAPHY['@zsai-body'], fontFamily: F, fontWeight: isActive ? 600 : 400, color: textColor,
                boxShadow: focus === i ? focusRing : 'none',
              }}
            >
              <Label item={item} textColor={textColor} iconColor={brand} />
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: BAR, borderRadius: BAR, background: bar }} />
            </button>
          );
        })}
      </div>
      {(withPanel || items.some((it) => it.content)) && (
        <div role="tabpanel" style={{
          marginTop: 12, background: 'var(--ai-card-bg)',
          border: '1px solid var(--ai-card-border)',
          borderRadius: AI.radius[radius], padding: 18,
        }}>
          {panel(active)}
        </div>
      )}
    </div>
  );
}

export default AITab;
