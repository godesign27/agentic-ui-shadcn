import React, { useId } from 'react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip } from '../../atomic/ai-chip/AIChip';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ──────────────────────────────────────────────────────────────────────────
// AICardDataTable
// ──────────────────────────────────────────────────────────────────────────
// Canonical pattern for AI-generated tabular output.
// Three densities (one component, three content levels):
//   simple → chat / drawer    — title + rows + source names + optional trust
//   rich   → split view / page — adds tradeoff/threshold cells, flagged callout,
//                                 source + freshness, view-rationale, actions
//   robust → review / approval — adds row/cell governance states, progressive
//                                 loading, reviewer, audit trail, change summary
// ──────────────────────────────────────────────────────────────────────────

export type AIDataTableDensity = 'simple' | 'rich' | 'robust';
export type AIDataTableState =
  | 'default' | 'loading' | 'progressiveLoading' | 'updating'
  | 'partialData' | 'empty' | 'sourceUnavailable'
  | 'permissionRestricted' | 'error'
  | 'reviewNeeded' | 'actionable' | 'applied' | 'sentForApproval';

export type AIDataTableRiskLevel       = 'low' | 'medium' | 'high' | 'critical' | 'unknown';
export type AIDataTableConfidenceLevel = 'low' | 'medium' | 'high' | 'unknown';

export interface AIDataTableColumn {
  id:     string;
  label:  string;
  align?: 'start' | 'end';
  width?: number | string;
  type?:  'text' | 'number' | 'percent' | 'currency' | 'status';
}

export type CellState =
  | 'default' | 'empty' | 'missing' | 'notApplicable'
  | 'estimated' | 'projected' | 'simulated' | 'aiGenerated'
  | 'stale' | 'flagged' | 'belowThreshold' | 'aboveThreshold'
  | 'changed' | 'loading' | 'error' | 'permissionRestricted';

export interface AIDataTableCell {
  value:  string;
  state?: CellState;
  note?:  string;
}

export type RowState =
  | 'default' | 'highlighted' | 'flagged' | 'needsReview'
  | 'loading' | 'updating' | 'applied' | 'pendingApproval'
  | 'disabled' | 'permissionRestricted' | 'error';

export interface AIDataTableRow {
  id:     string;
  cells:  AIDataTableCell[];
  state?: RowState;
  note?:  string;
}

export interface AICardDataTableProps {
  density?:          AIDataTableDensity;
  state?:            AIDataTableState;
  title?:            string;
  subtitle?:         string;
  intro?:            string;
  generatedBy?:      string;
  timestamp?:        string;
  confidence?:       AIDataTableConfidenceLevel;
  risk?:             AIDataTableRiskLevel;
  columns?:          AIDataTableColumn[];
  rows?:             AIDataTableRow[];
  rowCount?:         number;
  flaggedSummary?:   string;
  source?:           { label: string; icon?: string };
  freshness?:        string;
  reviewer?:         string;
  approvalRequired?: boolean;
  onViewRationale?:     () => void;
  onViewSources?:       () => void;
  onViewAssumptions?:   () => void;
  onViewAuditTrail?:    () => void;
  onViewChangeSummary?: () => void;
  primaryAction?:   { label: string; onClick?: () => void; disabled?: boolean };
  secondaryAction?: { label: string; onClick?: () => void; disabled?: boolean };
  tertiaryAction?:  { label: string; onClick?: () => void };
  // Top-right "Expand Full Table" affordance. When set, renders a small icon
  // button anchored to the header's right edge with a hover tooltip.
  onExpand?:        () => void;
  expandTooltip?:   string;          // default: "Expand Full Table"
  onRetry?:         () => void;
  loadingLabel?:    string;
  className?:       string;
}

// ──────────────────────────────────────────────────────────────────────────
// Density gating — dev-only warning
// ──────────────────────────────────────────────────────────────────────────
function warnExtraneous(density: AIDataTableDensity, p: AICardDataTableProps) {
  if (typeof process === 'undefined' || process.env?.NODE_ENV === 'production') return;
  const richOnly = ['subtitle', 'freshness', 'flaggedSummary', 'onViewRationale', 'primaryAction', 'secondaryAction'] as const;
  const robustOnly = ['generatedBy', 'timestamp', 'reviewer', 'approvalRequired', 'onViewSources', 'onViewAssumptions', 'onViewAuditTrail', 'onViewChangeSummary', 'tertiaryAction', 'onExpand'] as const;
  if (density === 'simple') {
    const offenders = [...richOnly, ...robustOnly].filter((k) => (p as any)[k] != null);
    if (offenders.length) console.warn(`[AICardDataTable] density="simple" ignores props: ${offenders.join(', ')}`);
  } else if (density === 'rich') {
    const offenders = robustOnly.filter((k) => (p as any)[k] != null);
    if (offenders.length) console.warn(`[AICardDataTable] density="rich" ignores props: ${offenders.join(', ')}`);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Inline pills — confidence + risk + approval status
// ──────────────────────────────────────────────────────────────────────────

const RISK_TONE: Record<AIDataTableRiskLevel, { bg: string; border: string; text: string; label: string }> = {
  low:      { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40', label: 'Low risk' },
  medium:   { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E', label: 'Medium risk' },
  high:     { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'High risk' },
  critical: { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'Critical risk' },
  unknown:  { bg: 'var(--ai-card-bg-raised, #F5F4F7)', border: 'var(--ai-card-border, #E5E7EB)', text: 'var(--ai-zds-helper, #6B6876)', label: 'Risk unknown' },
};

const CONFIDENCE_TONE: Record<AIDataTableConfidenceLevel, { bg: string; border: string; text: string; label: string }> = {
  high:    { bg: '#EAF4EE', border: '#CDE3D5', text: '#1F6B40', label: 'High confidence' },
  medium:  { bg: '#FBF1DA', border: '#EAD5A6', text: '#854D0E', label: 'Medium confidence' },
  low:     { bg: 'var(--ai-status-error-bg, #FBEFEF)', border: 'var(--ai-status-error-border, #F1C7C7)', text: 'var(--ai-status-error-text, #C0392B)', label: 'Low confidence' },
  unknown: { bg: 'var(--ai-card-bg-raised, #F5F4F7)', border: 'var(--ai-card-border, #E5E7EB)', text: 'var(--ai-zds-helper, #6B6876)', label: 'Confidence unknown' },
};

function Pill({ tone, label }: { tone: { bg: string; border: string; text: string }; label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 999,
      background: tone.bg, border: `1px solid ${tone.border}`,
      color: tone.text, fontFamily: F, fontSize: 12, fontWeight: 600,
    }}>
      {label}
    </span>
  );
}

// Top-right expand affordance — small icon button with a hover tooltip.
// Uses the ZAIDYN `frame-expand` glyph (matches the in-product convention
// for "open this view full-screen"). Tooltip is rendered as a small bubble
// to the left of the button so it doesn't clip outside the card.
function ExpandButton({ onClick, tooltip }: { onClick: () => void; tooltip: string }) {
  const [hov, setHov] = React.useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {hov && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            right: 30, top: '50%', transform: 'translateY(-50%)',
            background: '#1A1628', color: '#FFFFFF',
            fontFamily: F, fontSize: 12, fontWeight: 600,
            padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {tooltip}
        </span>
      )}
      <button
        type="button"
        onClick={onClick}
        aria-label={tooltip}
        title={tooltip}
        style={{
          background: 'transparent',
          border: '1px solid transparent',
          borderRadius: 6,
          padding: 4,
          cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ai-zds-helper, #6B6876)',
          transition: 'background 0.12s ease, border-color 0.12s ease, color 0.12s ease',
          ...(hov ? {
            background: 'var(--ai-card-bg, #FFFFFF)',
            borderColor: 'var(--ai-card-border, #E2E0E6)',
            color: 'var(--ai-zds-text, #1A1628)',
          } : {}),
        }}
      >
        <span className="zs-master-style" style={{ display: 'inline-flex', color: 'inherit' }}>
          <i className="zs-icon zs-icon-frame-expand" style={{ fontSize: 15, lineHeight: 1, color: 'currentColor' }} aria-hidden="true" />
        </span>
      </button>
    </span>
  );
}

function ApprovalTag({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 4,
      background: '#FBF1DA', border: '1px solid #EAD5A6', color: '#854D0E',
      fontFamily: F, fontSize: 12, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase' as const,
    }}>{label}</span>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Cell rendering — state-aware
// ──────────────────────────────────────────────────────────────────────────

const CELL_BG: Partial<Record<CellState, string>> = {
  flagged:        '#FBEFEF',
  belowThreshold: '#FBEFEF',
  aboveThreshold: '#EAF4EE',
  changed:        'var(--ai-brand-surface, #EEF0FB)',
};

const CELL_FG: Partial<Record<CellState, string>> = {
  flagged:        'var(--ai-status-error-text, #C0392B)',
  belowThreshold: 'var(--ai-status-error-text, #C0392B)',
  aboveThreshold: '#1F6B40',
  stale:          'var(--ai-zds-helper, #6B6876)',
  estimated:      'var(--ai-zds-helper, #6B6876)',
  projected:      'var(--ai-zds-helper, #6B6876)',
  simulated:      'var(--ai-zds-helper, #6B6876)',
  aiGenerated:    AI.color.brand,
  error:          'var(--ai-status-error-text, #C0392B)',
};

function CellShimmer() {
  return (
    <span style={{
      display: 'inline-block', height: 10, width: 56, borderRadius: 4,
      background: 'linear-gradient(90deg, #EFEEF2 0%, #F5F4F7 50%, #EFEEF2 100%)',
      backgroundSize: '200% 100%',
      animation: 'ai-shimmer 1.4s ease infinite',
    }} />
  );
}

function CellContent({ cell, type }: { cell: AIDataTableCell; type?: AIDataTableColumn['type'] }) {
  const s = cell.state ?? 'default';
  if (s === 'loading') return <CellShimmer />;
  if (s === 'empty' || s === 'missing' || s === 'notApplicable') {
    return <span style={{ color: 'var(--ai-zds-helper, #9CA3AF)' }} aria-label={s === 'notApplicable' ? 'not applicable' : 'missing'}>—</span>;
  }
  const italic = s === 'estimated' || s === 'projected' || s === 'simulated' || s === 'aiGenerated';
  const showDot = s === 'aiGenerated';
  const showClock = s === 'stale';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontStyle: italic ? 'italic' : 'normal',
      fontVariantNumeric: type === 'number' || type === 'percent' || type === 'currency' ? 'tabular-nums' : 'normal',
    }}>
      {showDot && (
        <span aria-hidden="true" style={{
          width: 6, height: 6, borderRadius: '50%', background: AI.color.brand, flexShrink: 0,
        }} />
      )}
      {showClock && (
        <span aria-hidden="true" className="zs-master-style" style={{ display: 'inline-flex', color: 'inherit' }}>
          <i className="zs-icon zs-icon-clock-pending" style={{ fontSize: 12, lineHeight: 1, color: 'currentColor' }} />
        </span>
      )}
      <span>{cell.value}</span>
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Row-state visual markers
// ──────────────────────────────────────────────────────────────────────────

function RowLead({ state }: { state?: RowState }) {
  if (!state || state === 'default') return null;
  const common: React.CSSProperties = {
    width: 8, height: 8, borderRadius: '50%', flexShrink: 0, display: 'inline-block',
  };
  if (state === 'applied')          return <span aria-label="Applied"          style={{ ...common, background: '#1F6B40' }} />;
  if (state === 'pendingApproval')  return <span aria-label="Pending approval" style={{ ...common, background: '#E67E22' }} />;
  if (state === 'flagged')          return <span aria-label="Flagged"          style={{ ...common, background: 'var(--ai-status-error-text, #C0392B)' }} />;
  if (state === 'needsReview')      return <span aria-label="Needs review"     style={{ ...common, background: '#854D0E' }} />;
  if (state === 'loading' || state === 'updating') return <span aria-label="Updating" style={{ ...common, background: '#9896A0', animation: 'ai-shimmer 1.4s ease infinite' }} />;
  if (state === 'permissionRestricted') return (
    <span aria-label="Locked" className="zs-master-style" style={{ display: 'inline-flex', color: 'var(--ai-zds-helper, #6B6876)' }}>
      <i className="zs-icon zs-icon-lock" style={{ fontSize: 12, lineHeight: 1, color: 'currentColor' }} />
    </span>
  );
  return null;
}

// ──────────────────────────────────────────────────────────────────────────
// Skeleton row
// ──────────────────────────────────────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: '10px 12px', borderTop: '1px solid var(--ai-card-border, #E5E7EB)' }}>
          <CellShimmer />
        </td>
      ))}
    </tr>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Shimmer keyframe (same as other group cards)
// ──────────────────────────────────────────────────────────────────────────

const SHIMMER = `@keyframes ai-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { [style*="ai-shimmer"] { animation: none !important; } }`;

// ──────────────────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────────────────


/** Demo props for bare mounts / galleries. */
export const SAMPLE_DATA_TABLE_COLUMNS: AIDataTableColumn[] = [
  { id: 'territory', label: 'Territory' },
  { id: 'reach', label: 'Reach', align: 'end', type: 'percent' },
  { id: 'delta', label: 'Δ vs Q1', align: 'end', type: 'percent' },
  { id: 'status', label: 'Status', type: 'status' },
];

export const SAMPLE_DATA_TABLE_ROWS: AIDataTableRow[] = [
  {
    id: 'r1',
    cells: [
      { value: 'PA-07' },
      { value: '61%' },
      { value: '-8%', state: 'flagged' },
      { value: 'At risk' },
    ],
    state: 'flagged',
  },
  {
    id: 'r2',
    cells: [
      { value: 'NJ-03' },
      { value: '68%' },
      { value: '-4%' },
      { value: 'Watch' },
    ],
  },
  {
    id: 'r3',
    cells: [
      { value: 'NY-12' },
      { value: '82%' },
      { value: '+2%' },
      { value: 'On track' },
    ],
  },
];

export const SAMPLE_DATA_TABLE = {
  density: 'simple' as AIDataTableDensity,
  title: 'Territory reach snapshot',
  columns: SAMPLE_DATA_TABLE_COLUMNS,
  rows: SAMPLE_DATA_TABLE_ROWS,
  source: { label: 'Coverage warehouse' },
};

export function AICardDataTable(props: AICardDataTableProps) {
  const {
    density = SAMPLE_DATA_TABLE.density,
    state = 'default',
    title = SAMPLE_DATA_TABLE.title,
    subtitle,
    intro,
    generatedBy,
    timestamp,
    confidence,
    risk,
    columns = SAMPLE_DATA_TABLE_COLUMNS,
    rows = SAMPLE_DATA_TABLE_ROWS,
    rowCount,
    flaggedSummary,
    source = SAMPLE_DATA_TABLE.source,
    freshness,
    reviewer,
    approvalRequired,
    onViewRationale,
    onViewSources,
    onViewAssumptions,
    onViewAuditTrail,
    onViewChangeSummary,
    primaryAction,
    secondaryAction,
    tertiaryAction,
    onExpand,
    expandTooltip = 'Expand Full Table',
    onRetry,
    loadingLabel = 'Generating table…',
    className,
  } = props;

  warnExtraneous(density, props);

  const sectioned = density !== 'simple';
  const tintedBg  = 'var(--ai-card-bg-raised, #F5F4F7)';
  const bodyBg    = 'var(--ai-card-bg, #FFFFFF)';
  const divider   = 'var(--ai-card-border, #E5E7EB)';
  const titleId   = useId();

  const isLoading              = state === 'loading';
  const isProgressive          = state === 'progressiveLoading';
  const isUpdating             = state === 'updating';
  const isEmpty                = state === 'empty';
  const isError                = state === 'error';
  const isSourceUnavailable    = state === 'sourceUnavailable';
  const isPermissionRestricted = state === 'permissionRestricted';
  const isSentForApproval      = state === 'sentForApproval';
  const isApplied              = state === 'applied';

  const showTopTrust   = (confidence && confidence !== 'unknown') || (risk && risk !== 'unknown');
  const showFooter     = sectioned && (rowCount != null || source || freshness || reviewer || primaryAction || secondaryAction || tertiaryAction || onViewRationale || onViewSources || onViewAssumptions || onViewAuditTrail || onViewChangeSummary);
  const showLinks      = onViewRationale || onViewSources || onViewAssumptions || onViewAuditTrail || onViewChangeSummary;
  const showActionRow  = primaryAction || secondaryAction || tertiaryAction;

  const numCols = columns.length;
  const skeletonRowCount = 4;

  const tableMode = !isLoading && !isEmpty && !isError && !isSourceUnavailable;

  return (
    <>
      <style>{SHIMMER}</style>

      {/* Conversational intro lives outside the card shell — same pattern as
          chat bubbles where the bubble holds the artifact and the lead-in
          floats above it. */}
      {intro && (
        <p style={{
          margin: '0 0 8px', fontFamily: F, fontSize: 13, lineHeight: 1.55,
          color: 'var(--ai-zds-text, #2F2C3C)',
        }}>{intro}</p>
      )}

      <section
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? 'AI data table' : undefined}
        aria-busy={isLoading || isUpdating || isProgressive || undefined}
        className={className}
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          gap: sectioned ? 0 : 12,
          padding: sectioned ? 0 : '14px 16px 16px',
          background: bodyBg,
          border: `1px solid ${divider}`,
          borderRadius: 16,
          boxShadow: AI.shadow.card.default,
          fontFamily: F,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        {(title || subtitle || generatedBy || timestamp || showTopTrust || isSentForApproval || onExpand) && (
          <header style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            ...(sectioned
              ? { padding: '14px 20px', background: tintedBg, borderBottom: `1px solid ${divider}` }
              : {}),
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexWrap: 'wrap' }}>
                {generatedBy && (
                  <span style={{
                    fontFamily: F, fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                    color: AI.color.brand,
                  }}>{generatedBy}</span>
                )}
                {generatedBy && timestamp && (
                  <span style={{ color: 'var(--ai-zds-helper, #9CA3AF)', opacity: 0.6 }}>·</span>
                )}
                {timestamp && (
                  <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>{timestamp}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {showTopTrust && confidence && confidence !== 'unknown' && <Pill tone={CONFIDENCE_TONE[confidence]} label={CONFIDENCE_TONE[confidence].label} />}
                {showTopTrust && risk       && risk       !== 'unknown' && <Pill tone={RISK_TONE[risk]}             label={RISK_TONE[risk].label} />}
                {isSentForApproval && <ApprovalTag label="Sent for approval" />}
                {state === 'reviewNeeded' && <ApprovalTag label="Review needed" />}
                {isApplied && <ApprovalTag label="Applied" />}
                {onExpand && <ExpandButton onClick={onExpand} tooltip={expandTooltip} />}
              </div>
            </div>
            {title && (
              <h3 id={titleId} style={{
                margin: 0, fontFamily: F, fontSize: 15, fontWeight: 700,
                color: 'var(--ai-zds-text, #1A1628)', lineHeight: 1.3,
              }}>{title}</h3>
            )}
            {subtitle && density !== 'simple' && (
              <p style={{
                margin: 0, fontFamily: F, fontSize: 12, lineHeight: 1.55,
                color: 'var(--ai-zds-helper, #6B6876)',
              }}>{subtitle}</p>
            )}
          </header>
        )}

        {/* ── Body ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          ...(sectioned ? { padding: '14px 20px 16px', background: bodyBg } : {}),
        }}>
          {/* Flagged summary callout (Rich+) */}
          {density !== 'simple' && flaggedSummary && !isLoading && !isError && !isEmpty && !isSourceUnavailable && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              padding: '8px 12px',
              background: '#FBF1DA', border: '1px solid #EAD5A6', borderRadius: 8,
              color: '#854D0E', fontFamily: F, fontSize: 12, lineHeight: 1.5,
            }}>
              <span aria-hidden="true" className="zs-master-style" style={{ display: 'inline-flex', color: 'inherit', flexShrink: 0, marginTop: 1 }}>
                <i className="zs-icon zs-icon-alert" style={{ fontSize: 13, lineHeight: 1, color: 'currentColor' }} />
              </span>
              <span>{flaggedSummary}</span>
            </div>
          )}

          {/* Body-level callouts */}
          {(isError || isSourceUnavailable || isEmpty || isPermissionRestricted) && (
            <BodyCallout
              state={state}
              onRetry={onRetry}
            />
          )}

          {/* Table */}
          {tableMode && (
            <div role="region" aria-label={title ? `${title} table` : 'Data table'} style={{
              overflow: 'auto', borderRadius: 8,
              border: `1px solid ${divider}`,
            }}>
              <table style={{
                width: '100%', borderCollapse: 'separate', borderSpacing: 0,
                fontFamily: F, fontSize: 12.5,
              }}>
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th key={c.id} scope="col" style={{
                        textAlign: c.align ?? (c.type === 'number' || c.type === 'percent' || c.type === 'currency' ? 'right' : 'left'),
                        width: c.width,
                        padding: '8px 12px',
                        background: tintedBg,
                        borderBottom: `1px solid ${divider}`,
                        color: 'var(--ai-zds-helper, #6B6876)',
                        fontFamily: F, fontSize: 14, fontWeight: 700,
                        letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                      }}>{c.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <RowRender key={r.id} row={r} columns={columns} />
                  ))}
                  {isProgressive && (
                    <>
                      {Array.from({ length: skeletonRowCount }).map((_, i) => (
                        <SkeletonRow key={`sk-${i}`} cols={numCols} />
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Loading: full-table skeleton */}
          {isLoading && (
            <>
              <div role="status" aria-live="polite" style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                {loadingLabel}
              </div>
              <div style={{ border: `1px solid ${divider}`, borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      {columns.map((c) => (
                        <th key={c.id} style={{
                          padding: '8px 12px', background: tintedBg, borderBottom: `1px solid ${divider}`,
                          textAlign: 'left', fontFamily: F, fontSize: 14, fontWeight: 700,
                          letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                          color: 'var(--ai-zds-helper, #6B6876)',
                        }}>{c.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: skeletonRowCount }).map((_, i) => (
                      <SkeletonRow key={i} cols={numCols} />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Updating / progressive caption */}
          {(isUpdating || isProgressive) && tableMode && (
            <div role="status" aria-live="polite" style={{
              fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)',
            }}>
              {isProgressive ? 'Validating remaining rows…' : 'Updating…'}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {showFooter && (
          <footer style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: '12px 20px 14px', background: tintedBg, borderTop: `1px solid ${divider}`,
          }}>
            {/* Trust line */}
            {(rowCount != null || source || freshness || reviewer || showLinks) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {rowCount != null && (
                    <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                      {rowCount} {rowCount === 1 ? 'row' : 'rows'}
                    </span>
                  )}
                  {source && (
                    <AIChip kind="brief"
                      label={source.label} size="sm" noDot
                      icon={source.icon ?? 'zs-icon-data-table'}
                      accentColor="var(--ai-zds-helper, #6B6876)"
                      accentBg="var(--ai-card-bg, #FFFFFF)"
                    />
                  )}
                  {freshness && (
                    <AIChip kind="brief"
                      label={freshness} size="sm" noDot
                      icon="zs-icon-clock-pending"
                      accentColor="var(--ai-zds-helper, #6B6876)"
                      accentBg="var(--ai-card-bg, #FFFFFF)"
                    />
                  )}
                  {reviewer && (
                    <span style={{ fontFamily: F, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                      Reviewer: <span style={{ color: 'var(--ai-zds-text, #2F2C3C)', fontWeight: 600 }}>{reviewer}</span>
                    </span>
                  )}
                </div>
                {showLinks && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginLeft: 'auto' }}>
                    {onViewRationale     && <AIWhyThisLink variant="view-rationale"   onClick={onViewRationale} />}
                    {onViewSources       && <AIWhyThisLink variant="view-sources"     onClick={onViewSources} />}
                    {onViewAssumptions   && <AIWhyThisLink variant="view-assumptions" onClick={onViewAssumptions} />}
                    {onViewAuditTrail    && (
                      <button onClick={onViewAuditTrail} style={linkBtnStyle}>View audit trail</button>
                    )}
                    {onViewChangeSummary && (
                      <button onClick={onViewChangeSummary} style={linkBtnStyle}>View change summary</button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Action row */}
            {showActionRow && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                paddingTop: 8, borderTop: `1px solid ${divider}`,
              }}>
                {tertiaryAction && (
                  <AIButton variant="tertiary" size="sm" label={tertiaryAction.label} onClick={tertiaryAction.onClick} />
                )}
                <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 8 }}>
                  {secondaryAction && (
                    <AIButton
                      variant="secondary" size="sm"
                      label={secondaryAction.label}
                      onClick={secondaryAction.onClick}
                      disabled={secondaryAction.disabled}
                    />
                  )}
                  {primaryAction && (
                    <AIButton
                      variant="primary" size="sm"
                      label={approvalRequired && !isSentForApproval ? 'Send for approval' : primaryAction.label}
                      onClick={primaryAction.onClick}
                      disabled={primaryAction.disabled || isSentForApproval}
                    />
                  )}
                </div>
              </div>
            )}
          </footer>
        )}
      </section>
    </>
  );
}

const linkBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
  color: AI.color.brand, fontFamily: F, fontSize: 12, fontWeight: 600,
};

// ──────────────────────────────────────────────────────────────────────────
// Sub-renderers
// ──────────────────────────────────────────────────────────────────────────

function RowRender({ row, columns }: { row: AIDataTableRow; columns: AIDataTableColumn[] }) {
  const rs = row.state ?? 'default';
  const isDimmed = rs === 'disabled' || rs === 'permissionRestricted';
  const leftRailColor =
      rs === 'needsReview' ? '#E67E22'
    : rs === 'flagged'     ? 'var(--ai-status-error-text, #C0392B)'
    : rs === 'pendingApproval' ? '#E67E22'
    : rs === 'applied'     ? '#1F6B40'
    : null;

  const rowBg =
      rs === 'highlighted'     ? 'var(--ai-brand-surface, #EEF0FB)'
    : rs === 'applied'         ? '#F4FAF6'
    : rs === 'pendingApproval' ? '#FEFBF4'
    : 'transparent';

  return (
    <tr
      aria-disabled={isDimmed || undefined}
      style={{ opacity: isDimmed ? 0.55 : 1, background: rowBg }}
    >
      {columns.map((c, i) => {
        const cell = row.cells[i] ?? { value: '' };
        const cs = cell.state ?? 'default';
        const bg = CELL_BG[cs];
        const fg = CELL_FG[cs];
        const isFirst = i === 0;
        return (
          <td
            key={c.id}
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--ai-card-border, #E5E7EB)',
              background: bg,
              color: fg ?? 'var(--ai-zds-text, #2F2C3C)',
              textAlign: c.align ?? (c.type === 'number' || c.type === 'percent' || c.type === 'currency' ? 'right' : 'left'),
              fontWeight: rs === 'highlighted' ? 600 : 400,
              position: 'relative',
              fontVariantNumeric: c.type === 'number' || c.type === 'percent' || c.type === 'currency' ? 'tabular-nums' : 'normal',
            }}
          >
            {isFirst && leftRailColor && (
              <span aria-hidden="true" style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: leftRailColor,
              }} />
            )}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {isFirst && <RowLead state={rs} />}
              <CellContent cell={cell} type={c.type} />
            </span>
            {cell.note && (
              <div style={{ marginTop: 2, fontSize: 12, color: 'var(--ai-zds-helper, #6B6876)' }}>
                {cell.note}
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}

function BodyCallout({ state, onRetry }: { state: AIDataTableState; onRetry?: () => void }) {
  const config: Record<string, { title: string; body: string; tone: 'warn' | 'err' | 'neutral' }> = {
    error:                { title: 'Something went wrong',  body: 'The table couldn’t load. Try again or check the source.', tone: 'err' },
    sourceUnavailable:    { title: 'Source unavailable',    body: 'One or more upstream sources are temporarily unavailable.', tone: 'warn' },
    empty:                { title: 'No matching rows',      body: 'Nothing meets the current filters. Adjust assumptions or ask for another view.', tone: 'neutral' },
    permissionRestricted: { title: 'Permission restricted', body: 'You don’t have access to view this table. Contact your administrator.', tone: 'warn' },
  };
  const cfg = config[state] ?? config.empty;
  const tone =
      cfg.tone === 'err'  ? { bg: 'var(--ai-status-error-bg, #FBEFEF)', bd: 'var(--ai-status-error-border, #F1C7C7)', tx: 'var(--ai-status-error-text, #C0392B)' }
    : cfg.tone === 'warn' ? { bg: '#FBF1DA', bd: '#EAD5A6', tx: '#854D0E' }
    :                       { bg: 'var(--ai-card-bg-raised, #F5F4F7)', bd: 'var(--ai-card-border, #E5E7EB)', tx: 'var(--ai-zds-helper, #6B6876)' };
  return (
    <div role={cfg.tone === 'err' ? 'alert' : 'status'} style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      padding: '14px 16px',
      background: tone.bg, border: `1px solid ${tone.bd}`, borderRadius: 8,
      color: tone.tx, fontFamily: F,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700 }}>{cfg.title}</div>
      <div style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--ai-zds-text, #2F2C3C)' }}>{cfg.body}</div>
      {onRetry && (state === 'error' || state === 'sourceUnavailable') && (
        <div style={{ marginTop: 4 }}>
          <AIButton variant="secondary" size="sm" label="Retry" onClick={onRetry} />
        </div>
      )}
    </div>
  );
}

export default AICardDataTable;
