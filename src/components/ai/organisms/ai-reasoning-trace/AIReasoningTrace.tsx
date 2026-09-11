import React, { useState, useEffect, useRef } from 'react';
import { AI, DS, SIGNAL_ORANGE, F } from '../../tokens/ai-tokens';
import { copyToClipboard } from '../../_support/clipboard';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip } from '../../atomic/ai-chip/AIChip';
import { AIProgress } from '../../atomic/ai-progress/AIProgress';
import { AIIcon }     from '../../atomic/ai-icon/AIIcon';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TraceStepStatus =
  | 'pending' | 'running' | 'complete' | 'skipped'
  | 'warning' | 'blocked' | 'failed' | 'escalated' | 'needsReview';

export type TraceRole =
  | 'planner' | 'router' | 'retriever' | 'validator'
  | 'executor' | 'reviewer' | 'memory' | 'tool' | 'human' | 'system';

export type TraceOverallStatus =
  | 'running' | 'complete' | 'blocked' | 'failed' | 'escalated' | 'needsReview';

export type TraceMode = 'business' | 'technical' | 'audit' | 'presentation';

export interface TraceStep {
  id:          string;
  stepNumber?: number;
  role:        TraceRole;
  label:       string;
  status:      TraceStepStatus;
  duration?:   string;
  detail?:     string;
  agent?:      string;
  tool?:       string;
  sourceCount?: number;
  timestamp?:  string;
  owner?:      string;
  canRetry?:   boolean;
  canEscalate?: boolean;
}

export interface AIReasoningTraceProps {
  title?:             string;             // default "AI Process Trace"
  status:             TraceOverallStatus;
  steps:              TraceStep[];
  defaultExpanded?:   boolean;            // default false
  expandedStepIds?:   string[];
  allowExpandAll?:    boolean;
  allowCopy?:         boolean;
  showDurations?:     boolean;            // default true
  showAuditLink?:     boolean;
  showRationaleLink?: boolean;
  showSourcesLink?:   boolean;
  mode?:              TraceMode;          // default 'technical'
  compact?:           boolean;
  onToggle?:          (expanded: boolean) => void;
  onToggleStep?:      (id: string, expanded: boolean) => void;
  onExpandAll?:       () => void;
  onCollapseAll?:     () => void;
  onCopyTrace?:       () => void;
  onViewAuditTrail?:  () => void;
  onViewRationale?:   () => void;
  onViewSources?:     () => void;
  onRetryStep?:       (id: string) => void;
  onEscalateStep?:    (id: string) => void;
}

// ── Role config ───────────────────────────────────────────────────────────────

const ROLE_META: Record<TraceRole, { label: string; color: string; bg: string }> = {
  planner:   { label: 'Planner',   color: AI.color.brand,            bg: AI.color.brandSurface   },
  router:    { label: 'Router',    color: '#0DACAD',                  bg: 'var(--ai-status-info-bg)'           },
  retriever: { label: 'Retriever', color: '#2980B9',                  bg: 'var(--ai-status-info-bg)'           },
  validator: { label: 'Validator', color: SIGNAL_ORANGE[70],              bg: SIGNAL_ORANGE['00']         },
  executor:  { label: 'Executor',  color: AI.color.action.primary,   bg: AI.color.brandSurface   },
  reviewer:  { label: 'Reviewer',  color: 'var(--success-color, #0A6E5E)', bg: 'var(--ai-status-success-bg)'   },
  memory:    { label: 'Memory',    color: '#7A5944',                  bg: 'var(--ai-loading-card-bg)'          },
  tool:      { label: 'Tool',      color: DS.textHelper,             bg: 'var(--ai-track-bg)'                 },
  human:     { label: 'Human',     color: 'var(--success-color, #0A6E5E)', bg: 'var(--ai-status-success-bg)'   },
  system:    { label: 'System',    color: DS.textDefault,            bg: 'var(--ai-track-bg)'                 },
};

// ── Step status config ────────────────────────────────────────────────────────

const STEP_STATUS_META: Record<TraceStepStatus, { color: string; icon: React.ReactNode; label: string }> = {
  pending:    { color: DS.border,                      label: 'Pending',      icon: <PendingIcon /> },
  running:    { color: AI.color.brand,                  label: 'Running',      icon: <SpinnerIcon /> },
  complete:   { color: 'var(--success-color, #0A6E5E)', label: 'Complete',     icon: <CheckIcon /> },
  skipped:    { color: DS.textHelper,                  label: 'Skipped',      icon: <SkipIcon /> },
  warning:    { color: SIGNAL_ORANGE[60],                   label: 'Warning',      icon: <WarningIcon /> },
  blocked:    { color: SIGNAL_ORANGE[70],                   label: 'Blocked',      icon: <BlockedIcon /> },
  failed:     { color: 'var(--error-color, #B21111)',   label: 'Failed',       icon: <FailedIcon /> },
  escalated:  { color: SIGNAL_ORANGE[70],                   label: 'Escalated',    icon: <EscalatedIcon /> },
  needsReview:{ color: SIGNAL_ORANGE[60],                   label: 'Needs review', icon: <ReviewIcon /> },
};

// ── Overall status config ─────────────────────────────────────────────────────

const OVERALL_STATUS_META: Record<TraceOverallStatus, { label: string; color: string; bg: string }> = {
  running:    { label: 'Running',      color: AI.color.brand,                  bg: AI.color.brandSurface },
  complete:   { label: 'Done',         color: 'var(--success-color, #0A6E5E)', bg: 'var(--ai-status-success-bg)' },
  blocked:    { label: 'Blocked',      color: SIGNAL_ORANGE[70],                   bg: SIGNAL_ORANGE['00']       },
  failed:     { label: 'Failed',       color: 'var(--error-color, #B21111)',   bg: 'var(--ai-status-error-bg)'   },
  escalated:  { label: 'Escalated',    color: SIGNAL_ORANGE[70],                   bg: SIGNAL_ORANGE['00']       },
  needsReview:{ label: 'Needs review', color: SIGNAL_ORANGE[60],                   bg: SIGNAL_ORANGE['00']       },
};

// ── Keyframe injection ────────────────────────────────────────────────────────

function injectKeyframes() {
  if (typeof document === 'undefined' || document.getElementById('ai-trace-kf')) return;
  const s = document.createElement('style');
  s.id = 'ai-trace-kf';
  s.textContent = `
    @keyframes ai-trace-spin { to { transform: rotate(360deg); } }
    @keyframes ai-trace-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
    @keyframes ai-trace-expand {
      from { opacity: 0; transform: translateY(-4px); max-height: 0; }
      to   { opacity: 1; transform: translateY(0);    max-height: 200px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .ai-trace-spin  { animation: none !important; }
      .ai-trace-pulse { animation: none !important; }
    }
  `;
  document.head.appendChild(s);
}

// ── Step status icons ─────────────────────────────────────────────────────────

function PendingIcon()   { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={DS.border} strokeWidth="1.5"/></svg>; }
function CheckIcon()     { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="var(--success-color,#0A6E5E)" opacity="0.12"/><path d="M4 7l2 2 4-4" stroke="var(--success-color,#0A6E5E)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function SkipIcon()      { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={DS.textHelper} strokeWidth="1.5"/><line x1="4" y1="7" x2="10" y2="7" stroke={DS.textHelper} strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function WarningIcon()   { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M7 2L12.5 12H1.5L7 2Z" fill={SIGNAL_ORANGE['00']} stroke={SIGNAL_ORANGE[60]} strokeWidth="1.2"/><line x1="7" y1="6" x2="7" y2="9" stroke={SIGNAL_ORANGE[70]} strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="10.5" r="0.7" fill={SIGNAL_ORANGE[70]}/></svg>; }
function BlockedIcon()   { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={SIGNAL_ORANGE['00']} stroke={SIGNAL_ORANGE[60]} strokeWidth="1.2"/><path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke={SIGNAL_ORANGE[70]} strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function FailedIcon()    { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#FFEDE9" stroke="var(--error-color,#B21111)" strokeWidth="1.2"/><path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="var(--error-color,#B21111)" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function EscalatedIcon() { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={SIGNAL_ORANGE['00']} stroke={SIGNAL_ORANGE[70]} strokeWidth="1.2"/><path d="M7 10V5M5 7l2-2 2 2" stroke={SIGNAL_ORANGE[70]} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ReviewIcon()    { return <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={SIGNAL_ORANGE['00']} stroke={SIGNAL_ORANGE[60]} strokeWidth="1.2"/><ellipse cx="7" cy="7" rx="3" ry="1.8" stroke={SIGNAL_ORANGE[70]} strokeWidth="1.2"/><circle cx="7" cy="7" r="1" fill={SIGNAL_ORANGE[70]}/></svg>; }

function SpinnerIcon()   {
  return (
    <>
      <style>{`@keyframes ai-trace-spin { to { transform: rotate(360deg); } }`}</style>
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none"
        className="ai-trace-spin"
        style={{ animation: 'ai-trace-spin 0.75s linear infinite' }}>
        <circle cx="7" cy="7" r="5.5" stroke={AI.color.brandSubtle} strokeWidth="1.5"/>
        <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke={AI.color.brand} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </>
  );
}

// ── Chevron ───────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ transition: 'transform 0.18s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
      aria-hidden="true">
      <path d="M3 4.5l3 3 3-3" stroke={DS.textHelper} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Bot icon ──────────────────────────────────────────────────────────────────

function BotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="10" height="7" rx="2" fill={AI.color.brand} opacity="0.15"/>
      <rect x="2" y="5" width="10" height="7" rx="2" stroke={AI.color.brand} strokeWidth="1.2"/>
      <circle cx="4.8" cy="8.5" r="1" fill={AI.color.brand}/>
      <circle cx="9.2" cy="8.5" r="1" fill={AI.color.brand}/>
      <path d="M7 5V3" stroke={AI.color.brand} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="7" cy="2.5" r="0.8" fill={AI.color.brand}/>
    </svg>
  );
}

// ── Step row ──────────────────────────────────────────────────────────────────

function StepRow({
  step,
  index,
  isExpanded,
  onToggle,
  showDurations,
  mode,
  compact,
  onRetry,
  onEscalate,
  isLast,
}: {
  step:         TraceStep;
  index:        number;
  isExpanded:   boolean;
  onToggle:     () => void;
  showDurations: boolean;
  mode:          TraceMode;
  compact:       boolean;
  onRetry?:      () => void;
  onEscalate?:   () => void;
  isLast:        boolean;
}) {
  const [hov, setHov] = useState(false);
  const statusMeta = STEP_STATUS_META[step.status];
  const roleMeta   = ROLE_META[step.role];
  const num        = step.stepNumber ?? (index + 1);
  const hasDetail  = !!(step.detail || step.agent || step.tool || (step.sourceCount !== undefined));
  const showTechnical = mode === 'technical' || mode === 'audit';

  const rowH = compact ? '36px' : '44px';

  return (
    <div
      style={{
        borderBottom: isLast ? 'none' : `1px solid var(--ai-card-border)`,
        position: 'relative',
      }}
    >
      {/* Main row */}
      <button
        onClick={hasDetail ? onToggle : undefined}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-expanded={hasDetail ? isExpanded : undefined}
        aria-label={`Step ${num}: ${step.label} — ${statusMeta.label}${step.duration ? `, ${step.duration}` : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          height: rowH,
          padding: compact ? '0 10px 0 12px' : '0 12px 0 14px',
          background: hov && hasDetail ? AI.color.brandSurface : 'transparent',
          border: 'none',
          cursor: hasDetail ? 'pointer' : 'default',
          textAlign: 'left',
          transition: 'background 0.12s',
          boxSizing: 'border-box',
          fontFamily: F,
        }}
      >
        {/* Step number — matches the list-item label size so number + icon
            read as part of the same line, not as smaller metadata. */}
        <span style={{
          width: '18px',
          flexShrink: 0,
          fontSize: compact ? '11px' : '12px',
          fontWeight: 700,
          color: step.status === 'running' ? AI.color.brand
               : step.status === 'complete' ? 'var(--success-color, #0A6E5E)'
               : DS.textHelper,
          textAlign: 'right',
          lineHeight: 1,
          zIndex: 1,
          background: 'var(--ai-card-bg)',
        }}>
          {num}
        </span>

        {/* Status icon — bumped from 14→16px to match the body-icon size
            spec (ds-size-n) used everywhere else next to inline text. */}
        <span style={{ width: '16px', height: '16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 }}>
          {statusMeta.icon}
        </span>

        {/* Role chip */}
        <AIChip kind="brief"
          label={roleMeta.label}
          size="sm"
          noDot
          accentColor={roleMeta.color}
          accentBg={roleMeta.bg}
        />

        {/* Label */}
        <span style={{
          fontSize: compact ? '11px' : '12px',
          fontWeight: 500,
          color: step.status === 'skipped' ? DS.textHelper
               : step.status === 'failed'  ? 'var(--error-color, #B21111)'
               : step.status === 'blocked' ? SIGNAL_ORANGE[70]
               : DS.textDefault,
          flex: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textDecoration: step.status === 'skipped' ? 'line-through' : 'none',
          opacity: step.status === 'skipped' ? 0.55 : 1,
        }}>
          {step.label}
        </span>

        {/* Agent/tool badge (technical mode) */}
        {showTechnical && step.agent && (
          <span style={{ fontSize: '9px', color: DS.textHelper, fontStyle: 'italic', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {step.agent}
          </span>
        )}

        {/* Source count (technical mode) */}
        {showTechnical && step.sourceCount !== undefined && (
          <span style={{ fontSize: '9px', color: DS.textHelper, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {step.sourceCount} src
          </span>
        )}

        {/* Duration */}
        {showDurations && step.duration && (
          <span style={{
            fontSize: '10px',
            color: step.status === 'running' ? AI.color.brand : DS.textHelper,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            fontFamily: '"Roboto Mono", monospace',
          }}>
            {step.duration}
          </span>
        )}

        {/* Expand chevron */}
        {hasDetail && <Chevron open={isExpanded} />}
      </button>

      {/* Expanded detail */}
      {isExpanded && hasDetail && (
        <div
          style={{
            padding: compact ? '6px 12px 8px 40px' : '8px 14px 12px 44px',
            background: AI.color.brandSurface,
            borderTop: `1px solid var(--ai-card-border)`,
            animation: 'ai-trace-expand 0.18s ease-out',
          }}
        >
          {step.detail && (
            <p style={{ margin: '0 0 6px', ...AI_TYPOGRAPHY['@ai-trace-detail'], color: DS.textDefault }}>
              {step.detail}
            </p>
          )}

          {/* Metadata row */}
          {(step.agent || step.tool || step.timestamp || step.owner) && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: step.detail ? '4px' : 0 }}>
              {step.agent && <MetaChip label="Agent" value={step.agent} />}
              {step.tool  && <MetaChip label="Tool"  value={step.tool}  />}
              {step.owner && <MetaChip label="Owner" value={step.owner} />}
              {step.timestamp && <MetaChip label="Time" value={step.timestamp} />}
            </div>
          )}

          {/* Action links for blocked/failed steps */}
          {(step.status === 'blocked' || step.status === 'failed' || step.status === 'escalated') && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              {step.canRetry && (
                <GhostLink label="↻ Retry" color={AI.color.brand} onClick={() => {}} />
              )}
              {step.canEscalate && (
                <GhostLink label="↑ Escalate" color={SIGNAL_ORANGE[70]} onClick={() => {}} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: '3px', fontSize: '10px', fontFamily: F }}>
      <span style={{ color: DS.textHelper, fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ color: DS.textDefault }}>{value}</span>
    </span>
  );
}

function GhostLink({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: '10px', fontFamily: F, fontWeight: 600,
        color, opacity: hov ? 1 : 0.75,
        padding: '2px 0', textDecoration: hov ? 'underline' : 'none',
        transition: 'opacity 0.12s',
      }}
    >
      {label}
    </button>
  );
}

// RiFileCopyLine-trace link — text + icon, sized to match the inline body icon spec
// (ds-size-n / 16px from the Foundations Iconography page). Built locally
// since GhostLink only takes a string label; we need the registry copy glyph.
function CopyTraceLink({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const color = copied ? 'var(--success-color, #0A6E5E)' : DS.textHelper;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: '12px', fontFamily: F, fontWeight: 600,
        color, opacity: hov ? 1 : 0.85,
        padding: '2px 0',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        textDecoration: hov ? 'underline' : 'none',
        transition: 'opacity 0.12s',
      }}
    >
      <AIIcon name={copied ? 'check' : 'copy'} size="sm" decorative />
      {copied ? 'Copied' : 'Copy trace'}
    </button>
  );
}

// ── Completion sound (Web Audio API, no external file) ───────────────────────

function playCompletionTone() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    // Soft two-note ascending chime
    ([[ 523.25, 0 ], [ 783.99, 0.18 ]] as [number, number][]).forEach(([freq, delay]) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.55);
      osc.start(now + delay);
      osc.stop(now + delay + 0.6);
    });
  } catch { /* audio unavailable — silent fallback */ }
}

// ── Main component ────────────────────────────────────────────────────────────

export function AIReasoningTrace({
  title             = 'AI Process Trace',
  status,
  steps,
  defaultExpanded   = false,
  expandedStepIds,
  allowExpandAll    = true,
  allowCopy         = true,
  showDurations     = true,
  showAuditLink     = false,
  showRationaleLink = false,
  showSourcesLink   = false,
  mode              = 'technical',
  compact           = false,
  onToggle,
  onToggleStep,
  onExpandAll,
  onCollapseAll,
  onCopyTrace,
  onViewAuditTrail,
  onViewRationale,
  onViewSources,
  onRetryStep,
  onEscalateStep,
}: AIReasoningTraceProps) {
  useEffect(() => { injectKeyframes(); }, []);

  // Play soft chime when status transitions to complete
  const prevStatus = useRef<TraceOverallStatus>(status);
  useEffect(() => {
    if (prevStatus.current !== 'complete' && status === 'complete') {
      playCompletionTone();
    }
    prevStatus.current = status;
  }, [status]);

  const [traceOpen, setTraceOpen]    = useState(defaultExpanded);
  const [expanded, setExpanded]      = useState<Set<string>>(new Set(expandedStepIds ?? []));
  const [copied, setCopied]          = useState(false);

  const statusMeta   = OVERALL_STATUS_META[status];
  const hasActions   = showAuditLink || showRationaleLink || showSourcesLink || allowCopy;
  const isAuditMode  = mode === 'audit';
  const isPresMode   = mode === 'presentation';

  function toggleTrace() {
    const next = !traceOpen;
    setTraceOpen(next);
    onToggle?.(next);
  }

  function toggleStep(id: string) {
    const next = new Set(expanded);
    const wasOpen = next.has(id);
    wasOpen ? next.delete(id) : next.add(id);
    setExpanded(next);
    onToggleStep?.(id, !wasOpen);
  }

  function handleExpandAll() {
    setExpanded(new Set(steps.map(s => s.id)));
    onExpandAll?.();
  }

  function handleCollapseAll() {
    setExpanded(new Set());
    onCollapseAll?.();
  }

  function handleCopy() {
    const text = steps.map((s, i) => {
      const n = s.stepNumber ?? (i + 1);
      return `${n}. [${ROLE_META[s.role].label}] ${s.label}${s.duration ? ` — ${s.duration}` : ''} — ${STEP_STATUS_META[s.status].label}${s.detail ? `\n   ${s.detail}` : ''}`;
    }).join('\n');
    copyToClipboard(`${title}\nStatus: ${statusMeta.label}\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopyTrace?.();
  }

  const containerBorder = status === 'blocked' || status === 'escalated' || status === 'needsReview'
    ? SIGNAL_ORANGE[30]
    : status === 'failed'
    ? 'var(--ai-status-error-border)'
    : 'var(--ai-card-border)';

  return (
    <div
      style={{
        fontFamily: F,
        border: `1px solid ${containerBorder}`,
        borderRadius: '10px',
        background: 'var(--ai-card-bg)',
        overflow: 'hidden',
        maxWidth: '560px',
        width: '100%',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <button
        onClick={toggleTrace}
        aria-expanded={traceOpen}
        aria-label={`${title} — ${statusMeta.label}. ${traceOpen ? 'Collapse' : 'Expand'} trace.`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: compact ? '8px 12px' : '10px 14px',
          background: traceOpen ? AI.color.brandSurface : 'var(--ai-card-bg)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderBottom: traceOpen ? `1px solid var(--ai-card-border)` : 'none',
          transition: 'background 0.12s',
          boxSizing: 'border-box',
        }}
      >
        <Chevron open={traceOpen} />

        {/* AI sparkle — sourced from the AI Brand registry (atomic/icon
            AIIcon, name="ai-assist-fill"). Replaces the bespoke BotIcon so
            the title carries our canonical AI identity glyph. */}
        <AIIcon name="ai-assist-fill" size="sm" treatment="ai" decorative />

        <span style={{ fontSize: compact ? '11px' : '12px', fontWeight: 700, color: DS.textDefault, flex: 1, letterSpacing: '-0.1px' }}>
          {title}
        </span>

        {/* Progress indicator for running */}
        {status === 'running' && (
          <span
            className="ai-trace-pulse"
            style={{
              width: '6px', height: '6px', borderRadius: '100px',
              background: AI.color.brand,
              flexShrink: 0,
              animation: 'ai-trace-pulse 1200ms ease-in-out infinite',
            }}
            aria-hidden="true"
          />
        )}

        {/* Overall status badge */}
        <span style={{
          fontSize: '10px', fontWeight: 700,
          color: statusMeta.color,
          background: statusMeta.bg,
          padding: '2px 8px',
          borderRadius: '100px',
          flexShrink: 0,
          border: `1px solid ${statusMeta.color}22`,
        }}>
          {statusMeta.label}
        </span>

        {/* Step count */}
        {!compact && (
          <span style={{ fontSize: '10px', color: DS.textHelper, flexShrink: 0 }}>
            {steps.length} steps
          </span>
        )}
      </button>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      {traceOpen && (
        <>
          {/* Progress bar — always shown when trace is open */}
          {!isPresMode && (
            <AIProgress
              variant="thin"
              value={Math.round((steps.filter(s => s.status === 'complete').length / steps.length) * 100)}
              status={
                status === 'complete'  ? 'complete'  :
                status === 'failed'    ? 'error'     :
                status === 'blocked' || status === 'escalated' ? 'blocked' :
                status === 'needsReview' ? 'blocked' :
                'running'
              }
              showLabel={false}
            />
          )}

          {/* Expand / collapse all — single toggle. Label flips based on
              whether every detail-bearing step is currently expanded; one
              affordance is plenty for a binary state. */}
          {allowExpandAll && !isPresMode && steps.some(s => s.detail || s.agent || s.tool) && (() => {
            const detailSteps = steps.filter(s => s.detail || s.agent || s.tool);
            const allOpen = detailSteps.length > 0 && detailSteps.every(s => expanded.has(s.id));
            return (
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '6px 14px',
                borderBottom: '1px solid var(--ai-card-border)',
                background: 'var(--ai-card-bg-raised)',
              }}>
                <GhostLink
                  label={allOpen ? 'Collapse all' : 'Expand all'}
                  color={AI.color.brand}
                  onClick={allOpen ? handleCollapseAll : handleExpandAll}
                />
              </div>
            );
          })()}

          {/* Step rows */}
          <div role="list" aria-label={`${steps.length} process steps`}>
            {steps.map((step, i) => (
              <div key={step.id} role="listitem">
                <StepRow
                  step={step}
                  index={i}
                  isExpanded={expanded.has(step.id)}
                  onToggle={() => toggleStep(step.id)}
                  showDurations={showDurations && !isPresMode}
                  mode={mode}
                  compact={compact}
                  onRetry={step.canRetry ? () => onRetryStep?.(step.id) : undefined}
                  onEscalate={step.canEscalate ? () => onEscalateStep?.(step.id) : undefined}
                  isLast={i === steps.length - 1}
                />
              </div>
            ))}
          </div>

          {/* ── Footer ──────────────────────────────────────────────────────── */}
          {hasActions && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: compact ? '6px 12px' : '8px 14px',
              borderTop: `1px solid var(--ai-card-border)`,
              background: 'var(--ai-card-bg-raised)',
            }}>
              {allowCopy && (
                <CopyTraceLink copied={copied} onClick={handleCopy} />
              )}
              {showRationaleLink && (
                <GhostLink label="View rationale →" color={AI.color.brand} onClick={() => onViewRationale?.()} />
              )}
              {showSourcesLink && (
                <GhostLink label="View sources →" color={AI.color.brand} onClick={() => onViewSources?.()} />
              )}
              {showAuditLink && (
                <GhostLink label="View audit trail →" color={DS.textHelper} onClick={() => onViewAuditTrail?.()} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Example data ──────────────────────────────────────────────────────────────

export const EXAMPLE_TRACE_STEPS: TraceStep[] = [
  { id: 'p1',  role: 'planner',   label: 'Parsing prompt',             status: 'complete',  duration: '0.3s',  detail: 'Identified intent: workflow generation. Entities: approval flow, Q3 budget.' },
  { id: 'r1',  role: 'router',    label: 'Routing to agents',          status: 'complete',  duration: '0.1s',  detail: 'Selected Retrieval Agent, Validation Agent and Executor Agent based on intent class.' },
  { id: 're1', role: 'retriever', label: 'Fetching context',           status: 'complete',  duration: '1.2s',  detail: 'Pulled 4 relevant workflows from workspace. Similarity threshold: 0.82.', sourceCount: 4 },
  { id: 'v1',  role: 'validator', label: 'Validating permissions',     status: 'complete',  duration: '0.4s',  detail: 'User has workflow_create scope. Team quota: 3 of 10 active workflows.' },
  { id: 'e1',  role: 'executor',  label: 'Generating step graph',      status: 'complete',  duration: '2.1s'  },
  { id: 'v2',  role: 'validator', label: 'Validating graph',           status: 'complete',  duration: '0.6s'  },
  { id: 'e2',  role: 'executor',  label: 'Finalizing output',          status: 'complete',  duration: '0.9s'  },
];

export const BLOCKED_TRACE_STEPS: TraceStep[] = [
  { id: 'p1',  role: 'planner',   label: 'Parsing prompt',             status: 'complete',  duration: '0.3s' },
  { id: 'r1',  role: 'router',    label: 'Routing to agents',          status: 'complete',  duration: '0.1s' },
  { id: 're1', role: 'retriever', label: 'Fetching context',           status: 'complete',  duration: '1.2s' },
  { id: 'v1',  role: 'validator', label: 'Validating permissions',     status: 'blocked',   duration: '0.4s',  detail: 'User does not have workflow_create scope. Contact your admin to request access.', canEscalate: true },
  { id: 'e1',  role: 'executor',  label: 'Generating step graph',      status: 'pending'   },
];

export default AIReasoningTrace;
