import React, { useState } from 'react';
import { RiCheckLine, RiArrowDownSLine, RiArrowUpSLine, RiCheckboxCircleLine } from '@remixicon/react';
import { F, AI, ZSAI_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ─── Color tokens ─────────────────────────────────────────────────────────────
// All foreground/background pairs against ZSAI_TAN[00] (#F6F2EB) meet WCAG AA
// (≥4.5:1 normal text). White on the colored icon circles meets AA against
// each color (success-green / brand-blue / helper-gray / orange).
const TODO_SUCCESS_GREEN = '#0E8170';   // one step lighter — 4.7:1 white-on-green (AA), 4.9:1 on tan
const TODO_PENDING_GRAY  = '#5B5864';   // helper text         — 5.4:1 on tan
const TODO_BLOCKED       = '#A5570B';   // orange[80]          — 4.9:1 on tan
const TODO_TEXT_COMPLETED  = '#5B5864'; // 5.4:1 on tan
const TODO_TEXT_INPROGRESS = '#1A1628'; // ~12.5:1 on tan
const TODO_TEXT_PENDING    = '#454250'; // 8.2:1 on tan — darker to offset light weight
const TODO_TEXT_BLOCKED    = '#7A3F08'; // 5.0:1 on tan

/**
 * AIToDo — companion-warm checklist that the agent narrates as it works.
 *
 * Visual rhythm: a vertical connector line runs through the icon column.
 * The segment above the current step is solid (done); the segment around
 * the current step pulses in the brand accent (the agent is here); the
 * segment below is dashed (queued). When every item is completed, the
 * list flips to a calm "Complete" state with a one-time shimmer on the
 * progress bar and an "All done" badge in the header.
 *
 * Item states:
 *   • completed   → outlined check, dimmed copy
 *   • inProgress  → solid accent with right-arrow, bold copy, pulsing ring
 *   • pending     → dashed circle, light copy
 *   • blocked     → orange ring + dot (review-needed) — only orange affordance
 */

export type AIToDoItemStatus = 'completed' | 'inProgress' | 'pending' | 'blocked';

export interface AIToDoItem {
  id?:     string;
  label:   string;
  status:  AIToDoItemStatus;
  note?:   string;
}

export interface AIToDoProps {
  title?:     string;
  items:      AIToDoItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  /** Override the auto "all complete" detection. */
  forceComplete?: boolean;
  onItemClick?: (item: AIToDoItem, index: number) => void;
}

// ─── Scoped CSS ───────────────────────────────────────────────────────────────

const TODO_CSS = `
@keyframes ai-todo-pulse {
  0%, 100% { transform: scale(1);   opacity: 0.85; }
  50%      { transform: scale(1.18); opacity: 0.25; }
}
@keyframes ai-todo-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(220%); }
}
@keyframes ai-todo-row-in {
  from { opacity: 0; transform: translateY(2px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ai-todo-track-grow {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@keyframes ai-todo-arrow {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(1px); }
}
@media (prefers-reduced-motion: reduce) {
  .ai-todo-pulse-ring,
  .ai-todo-shimmer,
  .ai-todo-row,
  .ai-todo-track-fill,
  .ai-todo-arrow { animation: none !important; }
}
`;

// ─── Status icon ─────────────────────────────────────────────────────────────
// Same circle-with-check shape across "done" and "pending" — only the fill
// color changes. In-progress is the brand-accent solid with the pulsing ring.
// Blocked is the orange ring (review-needed) and remains visually distinct.

function StatusIcon({ status }: { status: AIToDoItemStatus }) {
  const baseCircle: React.CSSProperties = {
    width: 20, height: 20, borderRadius: '50%',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  };

  if (status === 'completed') {
    return (
      <span style={{ ...baseCircle, background: TODO_SUCCESS_GREEN, color: '#FFFFFF' }}>
        <RiCheckLine size={12} strokeWidth={3} />
      </span>
    );
  }

  if (status === 'inProgress') {
    return (
      <span style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
        <span
          className="ai-todo-pulse-ring"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: AI.color.action.primary,
            opacity: 0.4,
            animation: 'ai-todo-pulse 1.8s ease-in-out infinite',
            transformOrigin: 'center',
          }}
        />
        <span style={{
          ...baseCircle,
          position: 'absolute', inset: 0,
          background: AI.color.action.primary,
          color: '#FFFFFF',
          boxShadow: `0 0 0 3px ${AI.color.action.primary}22`,
        }}>
          <RiCheckLine size={12} strokeWidth={3} />
        </span>
      </span>
    );
  }

  if (status === 'blocked') {
    return (
      <span style={{ ...baseCircle, background: 'transparent', border: `1.5px solid ${TODO_BLOCKED}`, color: TODO_BLOCKED }}>
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: TODO_BLOCKED }} />
      </span>
    );
  }

  // pending — hollow outlined check (clear visual contrast with the solid
  // completed/in-progress icons). Gray ring + gray check on a transparent
  // background, sized to match the solid icons.
  return (
    <span style={{
      ...baseCircle,
      background: 'transparent',
      border: `1.5px solid ${TODO_PENDING_GRAY}`,
      color: TODO_PENDING_GRAY,
    }}>
      <RiCheckLine size={11} strokeWidth={2.5} />
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AIToDo({
  title = 'To-do list',
  items,
  collapsible = true,
  defaultCollapsed = false,
  forceComplete,
  onItemClick,
}: AIToDoProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const completedCount = items.filter((i) => i.status === 'completed').length;
  const total          = items.length;
  const progress       = total === 0 ? 0 : completedCount / total;
  const isAllComplete  = forceComplete ?? (total > 0 && completedCount === total);
  const isWorking      = items.some((i) => i.status === 'inProgress');

  return (
    <section style={{
      width: '100%',
      boxSizing: 'border-box',
      background: ZSAI_TAN['00'],
      border: `1px solid ${isAllComplete ? `${AI.color.action.primary}33` : 'rgba(60,42,29,0.10)'}`,
      borderRadius: AI.radius.md,
      padding: 16,
      fontFamily: F,
      transition: 'border-color 0.3s ease',
    }}>
      <style>{TODO_CSS}</style>

      {/* Header */}
      <button
        type="button"
        onClick={collapsible ? () => setCollapsed((c) => !c) : undefined}
        aria-expanded={collapsible ? !collapsed : undefined}
        disabled={!collapsible}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', border: 'none', padding: 0,
          cursor: collapsible ? 'pointer' : 'default',
          textAlign: 'left', color: 'inherit',
        }}
      >
        {/* List glyph — flips to a check when complete */}
        <span aria-hidden="true" style={{
          width: 20, height: 20,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: isAllComplete ? AI.color.action.primary : 'var(--ai-zds-text)',
          transition: 'color 0.3s ease',
        }}>
          {isAllComplete ? (
            <RiCheckboxCircleLine size={18} strokeWidth={2} />
          ) : (
            <span style={{
              width: 16, display: 'inline-flex', flexDirection: 'column', gap: 3,
            }}>
              <span style={{ height: 2, background: 'currentColor', borderRadius: 1 }} />
              <span style={{ height: 2, background: 'currentColor', borderRadius: 1 }} />
              <span style={{ height: 2, background: 'currentColor', borderRadius: 1 }} />
            </span>
          )}
        </span>

        <span style={{
          ...AI_TYPOGRAPHY['@zsai-h5'],
          color: isAllComplete ? AI.color.action.primary : 'var(--ai-zds-text)',
          transition: 'color 0.3s ease',
        }}>{title}</span>

        <span aria-hidden="true" style={{
          ...AI_TYPOGRAPHY['@zsai-meta-label'],
          color: 'var(--ai-zds-helper)',
        }}>·</span>

        <span style={{
          ...AI_TYPOGRAPHY['@zsai-meta-label'],
          color: 'var(--ai-zds-helper)',
        }}>{completedCount} of {total} complete</span>

        {isAllComplete && (
          <span style={{
            ...AI_TYPOGRAPHY['@zsai-action-link'],
            color: AI.color.action.primary,
            background: `${AI.color.action.primary}14`,
            border: `1px solid ${AI.color.action.primary}33`,
            borderRadius: 999,
            padding: '3px 9px',
            marginLeft: 6,
          }}>All done</span>
        )}

        <span style={{ flex: 1 }} />

        {collapsible && (
          <span aria-hidden="true" style={{ color: 'var(--ai-zds-helper)' }}>
            {collapsed ? <RiArrowDownSLine size={18} /> : <RiArrowUpSLine size={18} />}
          </span>
        )}
      </button>

      {/* Progress bar — shimmers while the agent is working */}
      {!collapsed && (
        <div style={{
          position: 'relative',
          marginTop: 12,
          height: 3, width: '100%',
          background: 'rgba(60,42,29,0.10)',
          borderRadius: 999,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: AI.color.action.primary,
            transition: 'width 0.45s ease',
            borderRadius: 999,
            position: 'relative',
          }}>
            {(isWorking || isAllComplete) && (
              <span
                className="ai-todo-shimmer"
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)`,
                  animation: `ai-todo-shimmer ${isAllComplete ? '1.4s ease-out 1' : '2.2s ease-in-out infinite'}`,
                  width: '55%',
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* List */}
      {!collapsed && (
        <ul role="list" style={{
          listStyle: 'none', margin: 0, padding: 0,
          marginTop: 14,
        }}>
          {items.map((item, i) => {
            const interactive = Boolean(onItemClick);
            const isInProgress = item.status === 'inProgress';
            const isCompleted  = item.status === 'completed';
            const isBlocked    = item.status === 'blocked';

            // Font weights: pending=300 (light), completed=500 (medium),
            // inProgress=700 (heavy), blocked=600.
            const fontWeight =
                isInProgress ? 700
              : isCompleted  ? 500
              : isBlocked    ? 600
              :                300;

            // Text colors: all chosen to clear WCAG AA (≥4.5:1) on ZSAI_TAN[00].
            const color =
                isInProgress ? TODO_TEXT_INPROGRESS
              : isCompleted  ? TODO_TEXT_COMPLETED
              : isBlocked    ? TODO_TEXT_BLOCKED
              :                TODO_TEXT_PENDING;

            const labelStyle: React.CSSProperties = {
              ...AI_TYPOGRAPHY['@zsai-section-subtitle'],
              fontWeight,
              color,
            };

            return (
              <li key={item.id ?? i} className="ai-todo-row" style={{
                position: 'relative',
                animation: `ai-todo-row-in 0.25s ease both ${i * 60}ms`,
              }}>
                <button
                  type="button"
                  onClick={interactive ? () => onItemClick?.(item, i) : undefined}
                  disabled={!interactive}
                  style={{
                    position: 'relative',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr',
                    alignItems: 'center',
                    gap: 12,
                    padding: '6px 10px 6px 0',
                    minHeight: 36,
                    borderRadius: AI.radius.xs,
                    background: isInProgress ? 'rgba(77, 96, 230,0.06)' : 'transparent',
                    border: 'none',
                    cursor: interactive ? 'pointer' : 'default',
                    textAlign: 'left',
                    color: 'inherit',
                    fontFamily: 'inherit',
                  }}
                >
                  {/* Icon column */}
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <StatusIcon status={item.status} />
                  </span>

                  {/* RiFileCopyLine column */}
                  <span style={{ minWidth: 0 }}>
                    <span style={labelStyle}>{item.label}</span>
                    {item.note && (
                      <span style={{
                        display: 'block',
                        ...AI_TYPOGRAPHY['@zsai-meta-label'],
                        color: 'var(--ai-zds-helper)',
                        marginTop: 2,
                      }}>{item.note}</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default AIToDo;
