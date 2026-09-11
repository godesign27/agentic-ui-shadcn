/**
 * AIAgentTaskCard — Guild Agentic AI Group
 *
 * Reusable task record card for a delegated AI task. Surfaces durable task
 * ID, original intent, mutable parameters, assigned agent, status, health,
 * progress, Needs Input descriptor, and next actions.
 *
 * Single component, density-driven via the `density` prop:
 *   basic   — title + status pill + agent name
 *   simple  — adds task type icon + task ID + progress + primary action
 *   rich    — adds intent, mutable params, health, confidence/risk, links
 *   robust  — adds agent stack, Needs Input flow, review/approval, sources
 *
 * Brand: no teal. AI emphasis via AI.color.brand (#4D60E6). Guild orange ONLY
 * on Needs-Input / blocked / warning states. AI_RAMP tan never appears here
 * — it's reserved for the supervisor agent header in the page pattern.
 * All status + health pair a glyph WITH text label — never color alone.
 */

import React from 'react';
import { AI, SIGNAL_ORANGE, DS, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip, type AIStatusPillTone } from '../../atomic/ai-chip/AIChip';
import { AIProgress } from '../../atomic/ai-progress/AIProgress';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AITextLink } from '../../molecules/ai-text-link/AITextLink';
import { AIConfidenceRiskBadge, type RiskLevel } from '../../atomic/ai-confidence-risk-badge/AIConfidenceRiskBadge';
import { AIAgentStack, type Agent } from '../../atomic/ai-agent-stack/AIAgentStack';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AIAgentTaskCardDensity = 'basic' | 'simple' | 'rich' | 'robust';

export type AIAgentTaskType = 'immediate' | 'scheduled' | 'recurring';

export type AIAgentTaskStatus =
  | 'pending'
  | 'active'
  | 'scheduled'
  | 'recurring-active'
  | 'needs-input'
  | 'completed'
  | 'cancelled'
  | 'blocked'
  | 'paused'
  | 'failed'
  | 'escalated'
  | 'pending-approval'
  | 'approved'
  | 'rejected';

export type AIAgentTaskHealth =
  | 'healthy'
  | 'at-risk'
  | 'needs-attention'
  | 'source-delayed'
  | 'source-unavailable'
  | 'stale'
  | 'high-urgency'
  | 'low-confidence';

export interface AIAgentSummary {
  id:    string;
  name:  string;
  role?: string;
}

export interface AIAgentTaskParameter {
  key:     string;
  value:   string;
  mutable: boolean;
}

export interface AIAgentTaskNeedsInput {
  gap:           string;
  whyNeeded?:    string;
  suggestions?:  string[];
}

export interface AIAgentTaskSource {
  label:     string;
  freshness?: string;
}

export interface AIAgentTaskAction {
  label:    string;
  onClick?: () => void;
  status?:  'idle' | 'loading';
}


export interface AIAgentTaskCardProps {
  density?:          AIAgentTaskCardDensity;
  taskId?:           string;
  title?:            string;
  taskType?:         AIAgentTaskType;
  status?:           AIAgentTaskStatus;
  health?:           AIAgentTaskHealth;
  agent?:            AIAgentSummary;
  agentStack?:       AIAgentSummary[];
  originalIntent?:   string;
  parameters?:       AIAgentTaskParameter[];
  progress?:         number;          // 0–100
  lastUpdated?:      string;
  needsInput?:       AIAgentTaskNeedsInput;
  confidence?:       'high' | 'medium' | 'low';
  risk?:             RiskLevel;
  sources?:          AIAgentTaskSource[];
  reviewState?:      { label: string; reviewer?: string };
  primaryAction?:    AIAgentTaskAction;
  secondaryActions?: AIAgentTaskAction[];
  selected?:         boolean;
  onClick?:          () => void;
  onViewRationale?:  () => void;
  onViewTrace?:      () => void;
  onViewSources?:    () => void;
  onResolveInput?:   (suggestion?: string) => void;
}

/** Demo props for bare mounts / galleries. */
export const SAMPLE_AGENT_TASK: AIAgentTaskCardProps = {
  density: 'rich',
  taskId: 'TASK-4821',
  title: 'Rebalance Mid-Atlantic territory coverage',
  taskType: 'scheduled',
  status: 'active',
  health: 'at-risk',
  agent: { id: 'coverage-agent', name: 'Coverage Agent', role: 'Planner' },
  originalIntent: 'Recover reach in PA-07 and NJ-03 before Q3 planning freeze.',
  parameters: [
    { key: 'Region', value: 'Mid-Atlantic', mutable: false },
    { key: 'FTEs to move', value: '2', mutable: true },
  ],
  progress: 62,
  lastUpdated: '12m ago',
  confidence: 'high',
  risk: 'medium',
  primaryAction: { label: 'Review plan', onClick: () => undefined },
  secondaryActions: [{ label: 'View trace', onClick: () => undefined }],
};


// ─────────────────────────────────────────────────────────────────────────────
// Status + health configuration  (glyph + label + tone; never color-only)
// ─────────────────────────────────────────────────────────────────────────────

interface StatusCfg {
  label:    string;
  pillTone: AIStatusPillTone;
  icon:     string;        // zs-icon-* class
  ribbon?:  'orange' | 'red' | 'brand' | 'success' | 'neutral';
}

const STATUS_CFG: Record<AIAgentTaskStatus, StatusCfg> = {
  'pending':           { label: 'Pending',          pillTone: 'neutral',  icon: 'zs-icon-clock-pending'         },
  'active':            { label: 'Active',           pillTone: 'info',     icon: 'zs-icon-loader'                },
  'scheduled':         { label: 'Scheduled',        pillTone: 'info',     icon: 'zs-icon-calendar'              },
  'recurring-active':  { label: 'Recurring',        pillTone: 'info',     icon: 'zs-icon-refresh'               },
  'needs-input':       { label: 'Needs input',      pillTone: 'warning',  icon: 'zs-icon-help',          ribbon: 'orange' },
  'completed':         { label: 'Completed',        pillTone: 'success',  icon: 'zs-icon-check-circle'          },
  'cancelled':         { label: 'Cancelled',        pillTone: 'neutral',  icon: 'zs-icon-close-circle'          },
  'blocked':           { label: 'Blocked',          pillTone: 'critical', icon: 'zs-icon-close-circle',  ribbon: 'red' },
  'paused':            { label: 'Paused',           pillTone: 'neutral',  icon: 'zs-icon-clock-pending'         },
  'failed':            { label: 'Failed',           pillTone: 'critical', icon: 'zs-icon-close-circle',  ribbon: 'red' },
  'escalated':         { label: 'Escalated',        pillTone: 'warning',  icon: 'zs-icon-arrow-up',      ribbon: 'orange' },
  'pending-approval':  { label: 'Pending approval', pillTone: 'warning',  icon: 'zs-icon-eye-open',      ribbon: 'orange' },
  'approved':          { label: 'Approved',         pillTone: 'success',  icon: 'zs-icon-check-circle'          },
  'rejected':          { label: 'Rejected',         pillTone: 'critical', icon: 'zs-icon-close-circle'          },
};

interface HealthCfg {
  label: string;
  icon:  string;
  tone:  'success' | 'warning' | 'critical' | 'info';
  fg:    string;
  bg:    string;
  border:string;
}

const HEALTH_CFG: Record<AIAgentTaskHealth, HealthCfg> = {
  'healthy':            { label: 'Healthy',            icon: 'zs-icon-check-circle',  tone: 'success',  fg: '#1F6B40', bg: '#EAF4EE',                 border: '#CDE3D5'                 },
  'at-risk':            { label: 'At risk',            icon: 'zs-icon-error-triangle',tone: 'warning',  fg: SIGNAL_ORANGE[80], bg: SIGNAL_ORANGE[10],         border: SIGNAL_ORANGE[30]             },
  'needs-attention':    { label: 'Needs attention',    icon: 'zs-icon-info-fill',     tone: 'warning',  fg: SIGNAL_ORANGE[80], bg: SIGNAL_ORANGE[10],         border: SIGNAL_ORANGE[30]             },
  'source-delayed':     { label: 'Source delayed',     icon: 'zs-icon-clock-pending', tone: 'warning',  fg: SIGNAL_ORANGE[80], bg: SIGNAL_ORANGE[10],         border: SIGNAL_ORANGE[30]             },
  'source-unavailable': { label: 'Source unavailable', icon: 'zs-icon-close-circle',  tone: 'critical', fg: '#7A1010', bg: 'var(--ai-status-error-bg)', border: 'var(--ai-status-error-border)' },
  'stale':              { label: 'Stale',              icon: 'zs-icon-clock-pending', tone: 'warning',  fg: SIGNAL_ORANGE[80], bg: SIGNAL_ORANGE[10],         border: SIGNAL_ORANGE[30]             },
  'high-urgency':       { label: 'High urgency',       icon: 'zs-icon-error-triangle',tone: 'critical', fg: '#7A1010', bg: 'var(--ai-status-error-bg)', border: 'var(--ai-status-error-border)' },
  'low-confidence':     { label: 'Low confidence',     icon: 'zs-icon-help',          tone: 'info',     fg: AI_RAMPBrandText(), bg: 'var(--ai-brand-surface)', border: 'var(--ai-brand-border)' },
};

function AI_RAMPBrandText() { return AI.color.text.primary; }

const TASKTYPE_CFG: Record<AIAgentTaskType, { icon: string; label: string }> = {
  'immediate':  { icon: 'zs-icon-loader',   label: 'Immediate' },
  'scheduled':  { icon: 'zs-icon-calendar', label: 'Scheduled' },
  'recurring':  { icon: 'zs-icon-refresh',  label: 'Recurring' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders a Guild font glyph. The `icons.css` cascade scopes the
 * font-family + ::before content rules to a `.zs-master-style` ancestor,
 * so the wrapper-and-child structure is required.
 */
function Glyph({ name, size = 14, color }: { name: string; size?: number; color?: string }) {
  return (
    <span
      className="zs-master-style"
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size,
        color: color ?? 'inherit',
        flexShrink: 0,
      }}
    >
      <span className={`zs-icon ${name}`} style={{ fontSize: size, lineHeight: 1 }} />
    </span>
  );
}

// HealthBadge removed — the Rich + Robust card headers now show a single
// status pill on the right. Health context is still surfaced via the
// Needs Input panel and the parameter strip; the HEALTH_CFG map is kept
// in case a future consumer needs to render the badge in another surface.

function ParameterChip({ p }: { p: AIAgentTaskParameter }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 999,
      background: p.mutable ? 'var(--ai-brand-surface)' : 'var(--ai-card-bg-raised)',
      border: `1px solid ${p.mutable ? 'var(--ai-brand-border)' : 'var(--ai-card-border)'}`,
      ...AI_TYPOGRAPHY['@ai-meta-label'],
      color: p.mutable ? 'var(--ai-brand-text)' : 'var(--ai-ds-helper)',
      whiteSpace: 'nowrap' as const,
    }}>
      {p.mutable && <Glyph name="zs-icon-edit" size={10} color="currentColor" />}
      <span style={{ fontWeight: 600 }}>{p.key}:</span>&nbsp;{p.value}
    </span>
  );
}

function SourceChip({ s }: { s: AIAgentTaskSource }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 999,
      background: 'transparent',
      border: '1px solid var(--ai-card-border)',
      ...AI_TYPOGRAPHY['@ai-meta-label'],
      color: 'var(--ai-ds-text)',
      whiteSpace: 'nowrap' as const,
    }}>
      <Glyph name="zs-icon-doc-generic" size={10} color="var(--ai-ds-helper)" />
      {s.label}
      {s.freshness && <span style={{ color: 'var(--ai-ds-helper)', fontWeight: 400 }}>· {s.freshness}</span>}
    </span>
  );
}

function NeedsInputPanel({
  data,
  onResolve,
}: {
  data: AIAgentTaskNeedsInput;
  onResolve?: (suggestion?: string) => void;
}) {
  return (
    <div role="group" aria-label="Needs input" style={{
      marginTop: 10,
      padding: 12,
      borderRadius: AI.radius.sm,
      background: SIGNAL_ORANGE['00'],
      border: `1px solid ${SIGNAL_ORANGE[20]}`,
      borderLeft: `4px solid ${SIGNAL_ORANGE[60]}`,
    }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: SIGNAL_ORANGE[80], marginBottom: 6 }}>
        <Glyph name="zs-icon-help" size={12} color={SIGNAL_ORANGE[80]} />
        Needs input
      </div>
      <div style={{ ...AI_TYPOGRAPHY['@ai-body-small'], color: 'var(--ai-ds-text)', marginBottom: data.whyNeeded ? 4 : 8 }}>
        <strong>{data.gap}</strong>
      </div>
      {data.whyNeeded && (
        <div style={{ ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-ds-helper)', marginBottom: 8 }}>
          {data.whyNeeded}
        </div>
      )}
      {data.suggestions && data.suggestions.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {data.suggestions.map((s) => (
            <button key={s} onClick={() => onResolve?.(s)} style={{
              padding: '4px 10px', borderRadius: 999,
              background: '#FFFFFF',
              border: `1px solid ${SIGNAL_ORANGE[40]}`,
              color: SIGNAL_ORANGE[80],
              fontFamily: F, fontSize: 12, fontWeight: 600,
              cursor: 'pointer',
            }}>
              {s}
            </button>
          ))}
          <button onClick={() => onResolve?.()} style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'transparent',
            border: `1px solid ${SIGNAL_ORANGE[20]}`,
            color: SIGNAL_ORANGE[80],
            fontFamily: F, fontSize: 12, fontWeight: 500,
            cursor: 'pointer',
          }}>
            Reply…
          </button>
        </div>
      )}
    </div>
  );
}

// Map agent stack from spec shape → AIAgentStack atom shape
function toStackAgents(stack?: AIAgentSummary[]): Agent[] {
  if (!stack) return [];
  return stack.map((a) => ({ id: a.id, label: a.name, status: 'active' as const }));
}

// Map AIAgentTask status → AIProgress status (only what AIProgress accepts)
function toProgressStatus(s: AIAgentTaskStatus): 'running' | 'complete' | 'blocked' | 'error' | 'paused' | 'escalated' {
  if (s === 'completed' || s === 'approved') return 'complete';
  if (s === 'blocked') return 'blocked';
  if (s === 'failed' || s === 'rejected') return 'error';
  if (s === 'paused') return 'paused';
  if (s === 'escalated') return 'escalated';
  return 'running';
}

// ─────────────────────────────────────────────────────────────────────────────
// Density variants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Basic density — 2-row layout.
 *   Row 1: leading status glyph + title
 *   Row 2: status pill + task ID + needs-input gap (if any) + agent name
 *
 * The state-driven row (row 2) keeps state and identity info readable on
 * a single line below the title without crowding the title itself. When
 * the task is in `needs-input`, the gap descriptor appears inline with a
 * small warning glyph — matching the prototype's compact list pattern.
 */
function Basic(props: AIAgentTaskCardProps) {
  const statusCfg = STATUS_CFG[props.status];
  const hasGap = !!props.needsInput?.gap;
  // Visually align the secondary row to the start of the title text by
  // matching the glyph width + row gap from row 1.
  const indent = 14 + 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {/* Row 1 — icon + title */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <Glyph name={statusCfg.icon} size={14} color={ribbonColor(statusCfg.ribbon)} />
        <span style={{
          flex: 1, minWidth: 0,
          ...AI_TYPOGRAPHY['@ai-body-small'], color: 'var(--ai-ds-text)', fontWeight: 600,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const,
        }}>
          {props.title}
        </span>
      </div>

      {/* Row 2 — status pill + ID + gap + agent */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        marginLeft: indent,
      }}>
        <AIChip kind="status" label={statusCfg.label} tone={statusCfg.pillTone} size="sm" />
        <code style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 12, color: 'var(--ai-ds-helper)',
        }}>{props.taskId}</code>
        {hasGap && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            color: SIGNAL_ORANGE[80],
            fontFamily: F, fontSize: 12, fontWeight: 600,
          }}>
            <Glyph name="zs-icon-error-triangle" size={11} color={SIGNAL_ORANGE[80]} />
            {props.needsInput!.gap}
          </span>
        )}
        {props.agent && (
          <span style={{
            marginLeft: 'auto',
            ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)',
          }}>
            {props.agent.name}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Simple density — adopts the Rich card chrome (status pill, dashed
 * sources footnote, tinted action footer) but trims the intent strip
 * for a lighter row.
 *
 * Special-case for Needs Input: when `needsInput` is provided, the card
 * becomes an accordion. The Needs Input panel is collapsible from a
 * chevron on the title row. The dashed sources footnote and tinted
 * action footer are NOT rendered — the suggestion chips inside the
 * panel itself are the resolution path. Matches the AICardBrief /
 * AIRationalePanel collapsible group pattern.
 */
function Simple(props: AIAgentTaskCardProps) {
  const statusCfg = STATUS_CFG[props.status];
  const typeCfg = TASKTYPE_CFG[props.taskType];
  const isNeedsInputAccordion = !!props.needsInput;
  // Default to expanded so the gap + suggestions are visible by default;
  // user toggles closed if the row is contextual or already understood.
  const [expanded, setExpanded] = React.useState(true);

  const hasSources = !!props.sources && props.sources.length > 0;
  const hasActionFooter = !!props.primaryAction;
  // In Needs Input accordion mode, suppress the sources footnote and the
  // action footer — the panel's suggestion chips are the resolution path.
  const renderSources = hasSources && !isNeedsInputAccordion;
  const renderActionFooter = hasActionFooter && !isNeedsInputAccordion;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ── Body — padded ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 16px' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <Glyph name={typeCfg.icon} size={16} color={ribbonColor(statusCfg.ribbon) ?? 'var(--ai-ds-helper)'} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...AI_TYPOGRAPHY['@ai-body'], color: 'var(--ai-ds-text)', fontWeight: 600 }}>
              {props.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>
              <code style={{ fontFamily: 'ui-monospace, monospace' }}>{props.taskId}</code>
              <span>· {typeCfg.label}</span>
              {props.agent && <span>· {props.agent.name}</span>}
              {props.lastUpdated && <span>· {props.lastUpdated}</span>}
            </div>
          </div>
          <AIChip kind="status" label={statusCfg.label} tone={statusCfg.pillTone} size="sm" />
          {/* Accordion toggle — only when the Needs Input panel is the
              card's primary collapsible region. Stops click bubble so it
              doesn't also fire the card's onClick. */}
          {isNeedsInputAccordion && (
            <button
              type="button"
              aria-label={expanded ? 'Collapse needs-input details' : 'Expand needs-input details'}
              aria-expanded={expanded}
              onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
              style={{
                width: 24, height: 24,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: '1px solid var(--ai-card-border)',
                borderRadius: 6, cursor: 'pointer',
                color: 'var(--ai-ds-helper)',
                flexShrink: 0,
              }}
            >
              <Glyph
                name={expanded ? 'zs-icon-carat-up' : 'zs-icon-carat-down'}
                size={12}
                color="currentColor"
              />
            </button>
          )}
        </div>

        {/* Progress — hidden in Needs Input accordion mode */}
        {typeof props.progress === 'number' && !isNeedsInputAccordion && (
          <AIProgress value={props.progress} status={toProgressStatus(props.status)} size="thin" showLabel={false} />
        )}

        {/* Needs Input panel — collapsible when isNeedsInputAccordion */}
        {props.needsInput && expanded && (
          <NeedsInputPanel data={props.needsInput} onResolve={props.onResolveInput} />
        )}
      </div>

      {/* ── Footnote row — Sources (dashed-top border) ──────────────────── */}
      {renderSources && (
        <div style={{
          padding: '10px 16px',
          borderTop: '1px dashed var(--ai-card-border)',
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        }}>
          <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>Sources</span>
          {props.sources!.map((s, i) => <SourceChip key={`${s.label}-${i}`} s={s} />)}
        </div>
      )}

      {/* ── Action footer (solid-top border + tinted bg) ───────────────── */}
      {renderActionFooter && (
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid var(--ai-card-border)',
          background: 'var(--ai-card-bg-raised)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap',
        }}>
          <AIButton
            variant="primary" size="sm" label={props.primaryAction!.label}
            status={props.primaryAction!.status === 'loading' ? 'loading' : 'default'}
            onClick={(e: any) => { e?.stopPropagation?.(); props.primaryAction!.onClick?.(); }}
          />
        </div>
      )}
    </div>
  );
}

function Rich(props: AIAgentTaskCardProps) {
  const statusCfg = STATUS_CFG[props.status];
  const typeCfg = TASKTYPE_CFG[props.taskType];
  const hasSources = !!props.sources && props.sources.length > 0;
  const hasFootnote = hasSources;
  const hasActionFooter = !!props.primaryAction;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ── Body — padded ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 18px' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <Glyph name={typeCfg.icon} size={18} color={ribbonColor(statusCfg.ribbon) ?? 'var(--ai-brand-text)'} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...AI_TYPOGRAPHY['@ai-card-title'], color: 'var(--ai-ds-text)' }}>{props.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>
              <code style={{ fontFamily: 'ui-monospace, monospace' }}>{props.taskId}</code>
              <span>· {typeCfg.label}</span>
              {props.agent && <span>· {props.agent.name}</span>}
              {props.lastUpdated && <span>· {props.lastUpdated}</span>}
            </div>
          </div>
          {/* Single status pill — health surfaces via the Needs Input panel */}
          <AIChip kind="status" label={statusCfg.label} tone={statusCfg.pillTone} />
        </div>

        {/* Intent */}
        {props.originalIntent && (
          <div style={{
            padding: '8px 10px', background: 'var(--ai-card-bg-raised)',
            borderLeft: `3px solid ${AI.color.brand}`,
            ...AI_TYPOGRAPHY['@ai-body-small'], color: 'var(--ai-ds-text)',
          }}>
            <span style={{ fontWeight: 700, color: 'var(--ai-brand-text)' }}>Intent.</span>{' '}
            {props.originalIntent}
          </div>
        )}

        {/* Progress */}
        {typeof props.progress === 'number' && (
          <AIProgress value={props.progress} status={toProgressStatus(props.status)} size="sm" showLabel={false} />
        )}

        {/* Needs Input panel */}
        {props.needsInput && (
          <NeedsInputPanel data={props.needsInput} onResolve={props.onResolveInput} />
        )}
      </div>

      {/* ── Footnote row — Sources (dashed-top border) ──────────────────── */}
      {hasFootnote && (
        <div style={{
          padding: '10px 18px',
          borderTop: '1px dashed var(--ai-card-border)',
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        }}>
          <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>Sources</span>
          {props.sources!.map((s, i) => <SourceChip key={`${s.label}-${i}`} s={s} />)}
        </div>
      )}

      {/* ── Action footer (solid-top border + tinted bg) ───────────────── */}
      {hasActionFooter && (
        <div style={{
          padding: '10px 18px',
          borderTop: '1px solid var(--ai-card-border)',
          background: 'var(--ai-card-bg-raised)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap',
        }}>
          <AIButton
            variant="primary" size="sm" label={props.primaryAction!.label}
            status={props.primaryAction!.status === 'loading' ? 'loading' : 'default'}
            onClick={(e: any) => { e?.stopPropagation?.(); props.primaryAction!.onClick?.(); }}
          />
        </div>
      )}
    </div>
  );
}

function Robust(props: AIAgentTaskCardProps) {
  const statusCfg = STATUS_CFG[props.status];
  const typeCfg = TASKTYPE_CFG[props.taskType];
  const stackAgents = toStackAgents(props.agentStack);
  const hasSources = !!props.sources && props.sources.length > 0;
  const hasActionFooter = !!props.primaryAction || (props.secondaryActions && props.secondaryActions.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ── Body — padded ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 20px' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Glyph name={typeCfg.icon} size={20} color={ribbonColor(statusCfg.ribbon) ?? 'var(--ai-brand-text)'} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...AI_TYPOGRAPHY['@ai-h6'], color: 'var(--ai-ds-text)' }}>{props.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>
              <code style={{ fontFamily: 'ui-monospace, monospace' }}>{props.taskId}</code>
              <span>· {typeCfg.label}</span>
              {props.lastUpdated && <span>· {props.lastUpdated}</span>}
            </div>
          </div>
          {/* Single status pill — health surfaces via Needs Input panel */}
          <AIChip kind="status" label={statusCfg.label} tone={statusCfg.pillTone} />
        </div>

        {/* Assigned agents */}
        {(stackAgents.length > 0 || props.agent) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>Assigned</span>
            {stackAgents.length > 0 ? (
              <>
                <AIAgentStack agents={stackAgents} maxVisible={4} size={22} />
                <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-text)' }}>
                  {props.agentStack!.map((a) => a.name).join(' · ')}
                </span>
              </>
            ) : (
              <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-text)', fontWeight: 600 }}>
                {props.agent!.name}{props.agent!.role && <span style={{ color: 'var(--ai-ds-helper)', fontWeight: 400 }}> · {props.agent!.role}</span>}
              </span>
            )}
          </div>
        )}

        {/* Intent */}
        {props.originalIntent && (
          <div style={{
            padding: '10px 12px',
            background: 'var(--ai-card-bg-raised)',
            borderLeft: `3px solid ${AI.color.brand}`,
            borderRadius: AI.radius.xs,
            ...AI_TYPOGRAPHY['@ai-body-small'], color: 'var(--ai-ds-text)',
          }}>
            <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-brand-text)', marginBottom: 3, fontWeight: 700 }}>Original intent</div>
            {props.originalIntent}
          </div>
        )}

        {/* Mutable parameters */}
        {props.parameters && props.parameters.length > 0 && (
          <div>
            <div style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)', marginBottom: 6 }}>Mutable parameters</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {props.parameters.map((p) => <ParameterChip key={p.key} p={p} />)}
            </div>
          </div>
        )}

        {/* Progress */}
        {typeof props.progress === 'number' && (
          <AIProgress value={props.progress} status={toProgressStatus(props.status)} size="md" showLabel percentLabel />
        )}

        {/* Confidence + risk */}
        {(props.confidence || (props.risk && props.risk !== 'none')) && (
          <AIConfidenceRiskBadge confidence={props.confidence ?? 'medium'} risk={props.risk ?? 'none'} />
        )}

        {/* Needs Input */}
        {props.needsInput && (
          <NeedsInputPanel data={props.needsInput} onResolve={props.onResolveInput} />
        )}

        {/* Review state */}
        {props.reviewState && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', borderRadius: AI.radius.xs,
            background: 'var(--ai-brand-surface)',
            border: '1px solid var(--ai-brand-border)',
            ...AI_TYPOGRAPHY['@ai-caption-1'], color: 'var(--ai-brand-text)',
          }}>
            <Glyph name="zs-icon-eye-open" size={11} color="var(--ai-brand-text)" />
            <span style={{ fontWeight: 600 }}>{props.reviewState.label}</span>
            {props.reviewState.reviewer && (
              <span style={{ color: 'var(--ai-ds-helper)' }}>· {props.reviewState.reviewer}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Footnote row — Sources (dashed-top border) ─────────────────── */}
      {hasSources && (
        <div style={{
          padding: '10px 20px',
          borderTop: '1px dashed var(--ai-card-border)',
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        }}>
          <span style={{ ...AI_TYPOGRAPHY['@ai-meta-label'], color: 'var(--ai-ds-helper)' }}>Sources</span>
          {props.sources!.map((s, i) => <SourceChip key={`${s.label}-${i}`} s={s} />)}
        </div>
      )}

      {/* ── Action footer — primary + secondary actions ────────────────── */}
      {hasActionFooter && (
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--ai-card-border)',
          background: 'var(--ai-card-bg-raised)',
          display: 'flex', flexWrap: 'wrap', gap: 8,
        }}>
          {props.primaryAction && (
            <AIButton variant="primary" size="md" label={props.primaryAction.label}
                      status={props.primaryAction.status === 'loading' ? 'loading' : 'default'}
                      onClick={(e: any) => { e?.stopPropagation?.(); props.primaryAction!.onClick?.(); }} />
          )}
          {props.secondaryActions?.map((a) => (
            <AIButton key={a.label} variant="secondary" size="md" label={a.label}
                      onClick={(e: any) => { e?.stopPropagation?.(); a.onClick?.(); }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ribbonColor(ribbon?: StatusCfg['ribbon']): string | undefined {
  switch (ribbon) {
    case 'orange':  return SIGNAL_ORANGE[60];
    case 'red':     return 'var(--ai-status-error-text)';
    case 'brand':   return AI.color.brand;
    case 'success': return '#1F6B40';
    default:        return undefined;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

export function AIAgentTaskCard(props: AIAgentTaskCardProps) {
  const merged: AIAgentTaskCardProps = { ...SAMPLE_AGENT_TASK, ...props };
  const { density = 'rich', selected, onClick } = merged;

  const radius  = density === 'basic' ? AI.radius.xs : AI.radius.sm;

  // Simple + Rich + Robust paint their own per-region padding because they
  // carry a footer / footnote that has its own background (matching the
  // AICardTrustSummary pattern). Only the bare-bones Basic variant lets
  // the shell own padding.
  const shellPadding = density === 'basic' ? '10px 14px' : 0;

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      aria-pressed={onClick ? selected : undefined}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        padding: shellPadding,
        background: 'var(--ai-card-bg)',
        border: `1px solid ${selected ? AI.color.brand : 'var(--ai-card-border)'}`,
        borderRadius: radius,
        boxShadow: selected ? `0 0 0 2px ${AI.color.brand}33` : undefined,
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: F,
        overflow: 'hidden',
      }}
    >
      {density === 'basic'  && <Basic  {...merged} />}
      {density === 'simple' && <Simple {...merged} />}
      {density === 'rich'   && <Rich   {...merged} />}
      {density === 'robust' && <Robust {...merged} />}
    </div>
  );
}

export default AIAgentTaskCard;
