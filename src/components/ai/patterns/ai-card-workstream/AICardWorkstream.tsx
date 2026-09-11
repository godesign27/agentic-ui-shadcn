/**
 * AICardWorkstream — Entry-point card for an AI-operated workstream.
 *
 * On click, navigates the user to the workstream dashboard. The card surfaces
 * just enough at-a-glance state (type, status, three KPIs, project health,
 * assignees, last-updated) for the user to decide whether to drill in.
 *
 * Design contract:
 *  - RiFontSize2 icon (48×48 rounded square) sits top-left; color encodes work type.
 *  - RiFontSize2 label + status pill sit top-right.
 *  - Title is the workstream name (clickable target).
 *  - Up to three KPI columns sit in a row above the health bar.
 *  - Project Health is a horizontal progress bar; color matches status semantics.
 *  - Footer: assignee initials stack + last-updated timestamp.
 *  - Decorative tinted blob in the top-right corner reinforces the type color.
 */

import React from 'react';
import { AI, DS, COMPANION_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ── Types ─────────────────────────────────────────────────────────────────────

export type WorkstreamType   = 'map' | 'roster' | 'data' | 'forecast';
export type WorkstreamStatus = 'active' | 'pending' | 'critical' | 'complete';

export interface WorkstreamMetric {
  label: string;
  value: string;
}

export interface WorkstreamAssignee {
  /** 1–2 character initial shown in the avatar dot. */
  initial: string;
  /** Optional accessible name — used in aria-label. */
  name?: string;
}

export interface AICardWorkstreamProps {
  type?:          WorkstreamType;
  status?:        WorkstreamStatus;
  title?:         string;
  description?:   string;
  /** Up to 3 KPI columns rendered in a single row. */
  metrics?:       WorkstreamMetric[];
  /** 0–100 project-health percentage. */
  healthPercent?: number;
  /** Assignee initial chips rendered as a stack. Truncated to 5 visible. */
  assignees?:     WorkstreamAssignee[];
  /** Human-readable last-updated string ("12M AGO"). */
  lastUpdated?:   string;
  /** Click handler — fired when the card is selected. */
  onClick?:       () => void;
}

/** Demo workstream props for bare mounts / galleries. */
export const SAMPLE_WORKSTREAM = {
  type:          'map' as WorkstreamType,
  status:        'active' as WorkstreamStatus,
  title:         'Territory Map Refresh',
  description:   'Rebalance HCP coverage across Mid-Atlantic and update targeting tiers.',
  metrics:       [
    { label: 'Accounts', value: '1,248' },
    { label: 'Coverage', value: '86%' },
    { label: 'Delta', value: '+12%' },
  ] as WorkstreamMetric[],
  healthPercent: 78,
  assignees:     [
    { initial: 'SK', name: 'Sarah K.' },
    { initial: 'JL', name: 'James L.' },
    { initial: 'AP', name: 'Ana P.' },
  ] as WorkstreamAssignee[],
  lastUpdated:   '12M AGO',
};

// ── Color resolution ─────────────────────────────────────────────────────────

const TYPE_TONE: Record<WorkstreamType, { color: string; tint: string; label: string }> = {
  map:      { color: '#0A9963', tint: 'rgba(10,153,99,0.10)',  label: 'MAP'      },
  roster:   { color: '#D97706', tint: 'rgba(217,119,6,0.10)',  label: 'ROSTER'   },
  data:     { color: '#4D60E6', tint: 'rgba(77, 96, 230,0.10)', label: 'DATA'     },
  forecast: { color: '#9B59B6', tint: 'rgba(155,89,182,0.10)', label: 'FORECAST' },
};

const STATUS_TONE: Record<WorkstreamStatus, { color: string; bg: string; label: string }> = {
  active:   { color: '#0A6E5E', bg: 'rgba(10,110,94,0.10)',  label: 'ACTIVE'   },
  pending:  { color: '#8A640C', bg: 'rgba(138,100,12,0.10)', label: 'PENDING'  },
  critical: { color: '#B21111', bg: 'rgba(178,17,17,0.10)',  label: 'CRITICAL' },
  complete: { color: '#5B5864', bg: 'rgba(91,88,100,0.10)',  label: 'COMPLETE' },
};

// Health bar tone — red when status critical, brand otherwise.
function healthTone(status: WorkstreamStatus): string {
  if (status === 'critical') return '#B21111';
  if (status === 'pending')  return '#D97706';
  return AI.color.brand;  // active / complete → brand-blue
}

// ── Icons ────────────────────────────────────────────────────────────────────

function TypeIcon({ type, color }: { type: WorkstreamType; color: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const };
  if (type === 'map') {
    return (
      <svg {...common}>
        <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 4v13M15 7v13" stroke={color} strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === 'roster') {
    return (
      <svg {...common}>
        <circle cx="9" cy="9" r="3.2" stroke={color} strokeWidth="1.8" />
        <circle cx="16" cy="10" r="2.4" stroke={color} strokeWidth="1.8" />
        <path d="M3 19c1-3 3-4.5 6-4.5s5 1.5 6 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M14 19c.5-2 2-3 4-3s3 1 3.5 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (type === 'data') {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="1.8" fill="none" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke={color} strokeWidth="1.8" fill="none" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke={color} strokeWidth="1.8" fill="none" />
      </svg>
    );
  }
  // forecast — trending line
  return (
    <svg {...common}>
      <path d="M3 17l5-5 4 4 8-9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7h4v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: WorkstreamStatus }) {
  const t = STATUS_TONE[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 999,
      background: t.bg, color: t.color,
      ...AI_TYPOGRAPHY['@ai-overline'],
      whiteSpace: 'nowrap' as const,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.color }} />
      {t.label}
    </span>
  );
}

function TypeBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 999,
      background: 'rgba(26,22,40,0.05)',
      color: 'var(--ai-ds-helper)',
      ...AI_TYPOGRAPHY['@ai-overline'],
      whiteSpace: 'nowrap' as const,
    }}>
      {label}
    </span>
  );
}

function MetricColumn({ metric }: { metric: WorkstreamMetric }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, minWidth: 0 }}>
      <span style={{
        ...AI_TYPOGRAPHY['@ai-overline'],
        color: 'var(--ai-ds-helper)',
        whiteSpace: 'nowrap' as const,
      }}>{metric.label}</span>
      <span style={{
        ...AI_TYPOGRAPHY['@ai-h3'],
        color: 'var(--ai-ds-text)',
        letterSpacing: '-0.4px',
      }}>{metric.value}</span>
    </div>
  );
}

function HealthBar({ pct, color }: { pct: number; color: string }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div style={{
      width: '100%', height: 6, borderRadius: 999,
      background: 'var(--ai-track-bg)', overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', width: `${clamped}%`,
        background: color, borderRadius: 999,
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}

function AssigneeStack({ assignees }: { assignees: WorkstreamAssignee[] }) {
  const VISIBLE = 3;
  const shown = assignees.slice(0, VISIBLE);
  const extra = assignees.length - VISIBLE;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((a, i) => (
        <div
          key={i}
          aria-label={a.name ?? a.initial}
          style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#EFEEF2',
            border: '2px solid var(--ai-card-bg)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            ...AI_TYPOGRAPHY['@ai-meta-label'], fontWeight: 600,
            color: 'var(--ai-ds-text)',
            marginLeft: i === 0 ? 0 : -8,
            position: 'relative', zIndex: shown.length - i,
            textTransform: 'uppercase',
          }}>
          {a.initial.slice(0, 2)}
        </div>
      ))}
      {extra > 0 && (
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: '#EFEEF2',
          border: '2px solid var(--ai-card-bg)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          ...AI_TYPOGRAPHY['@ai-meta-label'], fontWeight: 600,
          color: 'var(--ai-ds-helper)',
          marginLeft: -8,
        }}>
          +{extra}
        </div>
      )}
    </div>
  );
}

// ── Main card ────────────────────────────────────────────────────────────────

export function AICardWorkstream({
  type          = SAMPLE_WORKSTREAM.type,
  status        = SAMPLE_WORKSTREAM.status,
  title         = SAMPLE_WORKSTREAM.title,
  description   = SAMPLE_WORKSTREAM.description,
  metrics       = SAMPLE_WORKSTREAM.metrics,
  healthPercent = SAMPLE_WORKSTREAM.healthPercent,
  assignees     = SAMPLE_WORKSTREAM.assignees,
  lastUpdated   = SAMPLE_WORKSTREAM.lastUpdated,
  onClick,
}: AICardWorkstreamProps) {
  const tt   = TYPE_TONE[type];
  const bar  = healthTone(status);
  const clickable = !!onClick;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${title} workstream`}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        width: '100%',
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: 16,
        padding: '20px 22px 16px',
        gap: 14,
        fontFamily: DS.font,
        cursor: clickable ? 'pointer' : 'default',
        textAlign: 'left',
        overflow: 'hidden',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (!clickable) return;
        const el = e.currentTarget;
        el.style.transform = 'translateY(-1px)';
        el.style.boxShadow = '0 6px 24px rgba(26,22,40,0.08)';
        el.style.borderColor = 'rgba(26,22,40,0.16)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'none';
        el.style.boxShadow = 'none';
        el.style.borderColor = 'var(--ai-card-border)';
      }}
    >
      {/* Decorative tinted blob in the top-right reinforcing the type tone */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -36, right: -36,
          width: 130, height: 130, borderRadius: '50%',
          background: tt.tint,
          pointerEvents: 'none',
        }}
      />

      {/* Header row — type icon + type badge + status pill */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, position: 'relative' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: tt.color,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#FFFFFF', flexShrink: 0,
          boxShadow: `0 4px 14px ${tt.color}33`,
        }}>
          <TypeIcon type={type} color="#FFFFFF" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, flexWrap: 'wrap' as const, justifyContent: 'flex-end' }}>
          <TypeBadge label={tt.label} />
          <StatusPill status={status} />
        </div>
      </div>

      {/* Title + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
        <h3 style={{
          margin: 0,
          ...AI_TYPOGRAPHY['@ai-h4'],
          color: 'var(--ai-ds-text)',
        }}>{title}</h3>
        <p style={{
          margin: 0,
          ...AI_TYPOGRAPHY['@ai-section-subtitle'],
          color: 'var(--ai-ds-helper)',
        }}>{description}</p>
      </div>

      {/* Metrics row — up to 3 KPI columns */}
      {metrics.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))`,
          gap: 12,
          position: 'relative',
          paddingTop: 4,
        }}>
          {metrics.slice(0, 3).map((m, i) => (
            <MetricColumn key={`${m.label}-${i}`} metric={m} />
          ))}
        </div>
      )}

      {/* Divider above health bar */}
      <div style={{ height: 1, background: 'var(--ai-card-border)', position: 'relative' }} />

      {/* Project Health */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: 'var(--ai-ds-text)' }}>Project Health</span>
          <span style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], fontWeight: 600, color: bar }}>{Math.round(healthPercent)}%</span>
        </div>
        <HealthBar pct={healthPercent} color={bar} />
      </div>

      {/* Footer — assignee stack + timestamp */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, position: 'relative' }}>
        {assignees && assignees.length > 0 ? (
          <AssigneeStack assignees={assignees} />
        ) : <span />}
        {lastUpdated && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            color: 'var(--ai-ds-helper)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            <ClockIcon />
            {lastUpdated}
          </span>
        )}
      </div>
    </button>
  );
}

export default AICardWorkstream;
