/**
 * AIAgentTaskTracker — AI Library Page Pattern.
 *
 * Persistent agentic task governance workspace. Composes existing AI atoms +
 * groups + the new AIAgentTaskCard group across 8 regions:
 *
 *   1. Page header (supervisor agent + global actions)
 *   2. Summary metric row
 *   3. Proactive Agentic Insights
 *   4. Filter + control bar
 *   5. Task registry (list / board)
 *   6. Task detail panel
 *   7. Bidirectional mutation bar (NL command + conflict modal)
 *   8. Mobile companion (separate component — see AIAgentTaskTrackerMobile)
 *
 * Density: basic / simple / rich (default) / robust.
 * Flow state: 'default' | 'needs-input' | 'conflict' | 'empty'.
 *
 * Brand: NO teal. AI emphasis via AI.color.brand (#4D60E6). ZS orange ONLY
 * on Needs-Input / blocked / warning. ZSAI tan reserved for the supervisor
 * agent header surface. Status + health always pair glyph WITH text label.
 */

import React, { useMemo, useRef, useState } from 'react';
import { AI, ZS_ORANGE, ZSAI_TAN, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AITextLink } from '../../molecules/ai-text-link/AITextLink';
import { AICardMetric } from '../../patterns/ai-card-metric/AICardMetric';
import { AIInsightList, type AIInsightItem } from '../../organisms/ai-insight-list/AIInsightList';
import { AINotification } from '../../molecules/ai-notification/AINotification';
import { AIRationalePanel } from '../../organisms/ai-rationale-panel/AIRationalePanel';
import { AISupervisorBar, type AISupervisorBarTone } from '../../atomic/ai-supervisor-bar/AISupervisorBar';
import { AIAvatar } from '../../atomic/ai-avatar/AIAvatar';
import { AICommandCenterDialog } from '../../organisms/ai-command-center-dialog/AICommandCenterDialog';
import { AIChip } from '../../atomic/ai-chip/AIChip';
import {
  AIAgentTaskCard,
  type AIAgentTaskCardProps,
  type AIAgentTaskCardDensity,
} from '../../patterns/ai-agent-task-card/AIAgentTaskCard';

// ─────────────────────────────────────────────────────────────────────────────
// Public props
// ─────────────────────────────────────────────────────────────────────────────

export type AIAgentTaskTrackerDensity = 'basic' | 'simple' | 'rich' | 'robust';

export type AIAgentTaskTrackerFlow =
  | 'default'
  | 'needs-input'
  | 'conflict'
  | 'empty';

export interface AIAgentTaskTrackerProps {
  density?:           AIAgentTaskTrackerDensity;   // default 'rich'
  flow?:              AIAgentTaskTrackerFlow;      // default 'default'
  supervisorAgent?:   { name: string; tasksTracked: number; lastUpdated?: string };
  /** Tone of the flush supervisor bar at the top of the page. Default 'tan'. */
  supervisorTone?:    AISupervisorBarTone;
  tasks?:             AIAgentTaskCardProps[];      // each task is a card-props object
  selectedTaskId?:    string;
  layout?:            'list' | 'board';
  onNewTask?:         () => void;     // primary supervisor-bar action
  onSettings?:        () => void;     // ellipsis menu — Settings
  onExport?:          () => void;     // ellipsis menu — Export activity
  onViewProcessTrace?:() => void;     // title-row tertiary action
}

// ─────────────────────────────────────────────────────────────────────────────
// Sample data — used when caller omits `tasks`
// ─────────────────────────────────────────────────────────────────────────────

const SAMPLE_TASKS: AIAgentTaskCardProps[] = [
  {
    density: 'rich',
    taskId:  'T-3091',
    title:   'Email Dr. John Lee about Lectrazine clinical trial data',
    taskType:'scheduled',
    status:  'needs-input',
    health:  'needs-attention',
    agent:   { name: 'Outreach Agent', role: 'Worker' },
    originalIntent: 'Share Lectrazine clinical trial data with Dr. John Lee ahead of his next site visit.',
    parameters: [
      { key: 'Recipient', value: 'Dr. John Lee', mutable: false },
      { key: 'Subject',   value: 'Lectrazine clinical trial data', mutable: true },
      { key: 'Send date', value: 'Not confirmed', mutable: true },
      { key: 'Channel',   value: 'Email',         mutable: true },
    ],
    lastUpdated: 'Updated 4m ago',
    needsInput: {
      gap:        'No send date confirmed',
      whyNeeded:  'RxVantage shows Dr. Lee\'s next site visit is June 12 — sending earlier than June 10 gives him time to review.',
      suggestions:['Send June 10th', 'Invite the MSL', 'Send trial data before visit'],
    },
    confidence: 'medium',
    risk:       'medium',
    sources:    [{ label: 'RxVantage', freshness: '12m ago' }, { label: 'CRM · Veeva', freshness: '1h ago' }],
  },
  {
    density: 'simple',
    taskId:  'T-2884',
    title:   'Request MSL visit for Dr. Acharya',
    taskType:'immediate',
    status:  'active',
    agent:   { name: 'Outreach Agent', role: 'Worker' },
    progress: 64,
    lastUpdated: 'Updated 12m ago',
    primaryAction: { label: 'View progress' },
  },
  {
    density: 'simple',
    taskId:  'T-2810',
    title:   'Every Monday, collect status reports from my staff and summarize',
    taskType:'recurring',
    status:  'recurring-active',
    agent:   { name: 'Workflow Agent', role: 'Worker' },
    progress: 28,
    lastUpdated: 'Next run Mon 9:00 AM',
  },
  {
    density: 'simple',
    taskId:  'T-2766',
    title:   'Schedule follow-up visit with Dr. Patel for Q2 when the booking window opens',
    taskType:'scheduled',
    status:  'scheduled',
    agent:   { name: 'Scheduling Agent', role: 'Worker' },
    lastUpdated: 'Window opens Apr 1',
  },
  {
    density: 'simple',
    taskId:  'T-2701',
    title:   'Schedule follow-up appointment with Dr. Jones on May 22nd, 2025',
    taskType:'scheduled',
    status:  'completed',
    agent:   { name: 'Scheduling Agent', role: 'Worker' },
    progress: 100,
    lastUpdated: 'Completed May 22',
  },
  {
    density: 'simple',
    taskId:  'T-2655',
    title:   'Request Patient Liaison Group to contact Dr. Acharya',
    taskType:'immediate',
    status:  'completed',
    agent:   { name: 'Outreach Agent', role: 'Worker' },
    progress: 100,
    lastUpdated: 'Completed Apr 18',
  },
  {
    density: 'simple',
    taskId:  'T-2611',
    title:   'Review Q3 territory plan recommendations and send to leadership',
    taskType:'immediate',
    status:  'pending-approval',
    agent:   { name: 'Planning Agent', role: 'Worker' },
    progress: 88,
    lastUpdated: 'Updated 1h ago',
  },
];

const SAMPLE_INSIGHTS: AIInsightItem[] = [
  {
    id: 'i1',
    text: 'Dr. Smith hasn\'t opened the last 3 emails about Lectrazine. Outreach goal at risk.',
    type: 'risk',
    severity: 'warning',
    statusLabel: 'Outreach at risk',
    source: { label: 'Marketing Cloud' },
    freshness: '12m ago',
    action: { label: 'Schedule a visit for June 3rd @ 9:30 AM' },
  },
  {
    id: 'i2',
    text: 'Karen F. (MSL) scheduled a visit with Dr. Acharya on May 25th.',
    type: 'observation',
    severity: 'info',
    statusLabel: 'New activity',
    source: { label: 'CRM · Veeva' },
    freshness: '2h ago',
    action: { label: 'Plan a follow-up lunch with Dr. Acharya' },
  },
  {
    id: 'i3',
    text: 'Hobson Family Medical changed office hours — availability updated in the Customer Summary.',
    type: 'observation',
    severity: 'info',
    source: { label: 'External calendar' },
    freshness: '1d ago',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Status filter chips — counts derived from tasks
// ─────────────────────────────────────────────────────────────────────────────

interface FilterChip {
  key:      string;
  label:    string;
  match:    (t: AIAgentTaskCardProps) => boolean;
}

// Filter targets — driven by metric-card clicks (no chip row).
const FILTERS: FilterChip[] = [
  { key: 'all',         label: 'All tasks',        match: () => true },
  { key: 'active',      label: 'Active',           match: (t) => t.status === 'active' },
  { key: 'needsInput',  label: 'Needs Input',      match: (t) => t.status === 'needs-input' },
  { key: 'scheduled',   label: 'Scheduled',        match: (t) => t.status === 'scheduled' },
  { key: 'highRisk',    label: 'Health risks',     match: (t) => t.risk === 'high' || t.health === 'at-risk' || t.health === 'high-urgency' || t.health === 'needs-attention' },
  { key: 'recurring',   label: 'Recurring',        match: (t) => t.status === 'recurring-active' },
  { key: 'completed',   label: 'Completed',        match: (t) => t.status === 'completed' || t.status === 'approved' },
  { key: 'blocked',     label: 'Blocked',          match: (t) => t.status === 'blocked' || t.status === 'failed' },
  { key: 'approval',    label: 'Pending approval', match: (t) => t.status === 'pending-approval' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders a ZAIDYN font glyph. The `icons.css` cascade scopes the
 * font-family + ::before content rules to a `.zs-master-style` ancestor,
 * so the wrapper-and-child structure is required — combining both classes
 * on a single element renders an empty box.
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

// ─────────────────────────────────────────────────────────────────────────────
// Region: Page header (supervisor agent strip + global actions)
// ─────────────────────────────────────────────────────────────────────────────

// (Previous TitleRow was removed — page identity now lives in the
// AISupervisorBar above.)

// ─────────────────────────────────────────────────────────────────────────────
// Supervisor bar actions — primary "New task" + ellipsis menu
// ─────────────────────────────────────────────────────────────────────────────

function SupervisorActions({
  tone,
  onNewTask,
  onExport,
  onSettings,
}: {
  tone: AISupervisorBarTone;
  onNewTask?:  () => void;
  onExport?:   () => void;
  onSettings?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the menu on outside click
  React.useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  // Tone-aware "more" button styling so the kebab reads correctly on
  // dark / tan / light supervisor surfaces.
  const moreBtnColor = tone === 'dark' ? '#FFFFFF' : 'var(--ai-zds-text)';
  const moreBtnBorder = tone === 'dark'
    ? 'rgba(255,255,255,0.28)'
    : 'var(--ai-card-border)';
  const moreBtnBg = tone === 'dark' ? 'rgba(255,255,255,0.08)' : '#FFFFFF';

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <AIButton
        variant="primary"
        size="sm"
        icon="zs-icon-add"
        label="New task"
        onClick={onNewTask}
      />

      <button
        type="button"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        title="More actions"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 32, height: 32,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: moreBtnBg,
          border: `1px solid ${moreBtnBorder}`,
          borderRadius: 8,
          color: moreBtnColor,
          cursor: 'pointer',
        }}
      >
        <Glyph name="zs-icon-more" size={16} color={moreBtnColor} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="More actions"
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            minWidth: 200,
            background: '#FFFFFF',
            border: '1px solid var(--ai-card-border)',
            borderRadius: 10,
            boxShadow: '0 12px 36px rgba(15, 17, 38, 0.18), 0 2px 6px rgba(15,17,38,0.08)',
            padding: 6,
            zIndex: 50,
          }}
        >
          {[
            { label: 'Export activity', icon: 'zs-icon-download', onClick: onExport },
            { label: 'Settings',        icon: 'zs-icon-settings', onClick: onSettings },
          ].map((item) => (
            <button
              key={item.label}
              role="menuitem"
              onClick={() => { item.onClick?.(); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                padding: '8px 10px', borderRadius: 6,
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: F, fontSize: 14, color: 'var(--ai-zds-text)',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ai-card-bg-raised)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <Glyph name={item.icon} size={14} color="var(--ai-zds-helper)" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Region: Summary metric row
// ─────────────────────────────────────────────────────────────────────────────

function SummaryRow({
  tasks,
  density,
  filter,
  onFilterChange,
}: {
  tasks: AIAgentTaskCardProps[];
  density: AIAgentTaskTrackerDensity;
  filter: string;
  onFilterChange: (k: string) => void;
}) {
  const counts = useMemo(() => {
    return {
      active:      tasks.filter((t) => t.status === 'active').length,
      needsInput:  tasks.filter((t) => t.status === 'needs-input').length,
      scheduled:   tasks.filter((t) => t.status === 'scheduled').length,
      recurring:   tasks.filter((t) => t.status === 'recurring-active').length,
      completed:   tasks.filter((t) => t.status === 'completed').length,
      blocked:     tasks.filter((t) => t.status === 'blocked' || t.status === 'failed').length,
      health:      tasks.filter((t) => t.health === 'at-risk' || t.health === 'high-urgency' || t.health === 'needs-attention').length,
      approval:    tasks.filter((t) => t.status === 'pending-approval').length,
    };
  }, [tasks]);

  const metricDensity = density === 'robust' ? 'rich' : density === 'basic' ? 'basic' : 'simple';
  const isRobust = density === 'robust';

  // Each card now carries a filter key. Clicking a card sets that filter
  // on the list below; clicking the active card again clears back to 'all'.
  // The first card — "All tasks" — is the default selected state and the
  // clear-filter affordance.
  const cards: Array<{
    filterKey: string;
    label: string;
    value: number;
    accent: 'indigo' | 'amber' | 'red' | 'green' | 'gray';
    status?: { label: string; tone: 'success' | 'warning' | 'critical' | 'neutral' | 'info' };
  }> = [
    { filterKey: 'all',        label: 'All tasks',        value: tasks.length,      accent: 'gray' },
    { filterKey: 'active',     label: 'Active tasks',     value: counts.active,     accent: 'indigo' },
    { filterKey: 'needsInput', label: 'Needs input',      value: counts.needsInput, accent: 'amber', status: counts.needsInput > 0 ? { label: 'Action required', tone: 'warning' } : undefined },
    { filterKey: 'scheduled',  label: 'Scheduled',        value: counts.scheduled,  accent: 'indigo' },
    { filterKey: 'highRisk',   label: 'Health risks',     value: counts.health,     accent: 'red',   status: counts.health > 0 ? { label: 'Watch', tone: 'warning' } : undefined },
  ];

  if (isRobust) {
    cards.push(
      { filterKey: 'recurring',  label: 'Recurring',        value: counts.recurring, accent: 'indigo' },
      { filterKey: 'completed',  label: 'Completed today',  value: counts.completed, accent: 'green' },
      { filterKey: 'blocked',    label: 'Blocked',          value: counts.blocked,   accent: 'red',  status: counts.blocked > 0 ? { label: 'Blocked', tone: 'critical' } : undefined },
      { filterKey: 'approval',   label: 'Pending approval', value: counts.approval,  accent: 'amber',status: counts.approval > 0 ? { label: 'Awaiting', tone: 'warning' } : undefined },
    );
  }

  // AICardMetric prop gating (from runtime warnings):
  //   density="basic"  ignores accent + status
  //   density="simple" ignores status
  //   density="rich"   accepts both
  const allowAccent = metricDensity !== 'basic';
  const allowStatus = metricDensity === 'rich' || metricDensity === 'robust';

  return (
    <section
      role="tablist"
      aria-label="Filter task list by metric"
      style={{
        display: 'grid',
        // Rich page → 5 cards across one row.
        // Robust page → 9 cards laid out as 5 + 4 over two rows.
        gridTemplateColumns: `repeat(${isRobust ? 5 : cards.length}, minmax(160px, 1fr))`,
        gap: 12,
      }}
    >
      {cards.map((c) => {
        const isActive = filter === c.filterKey;
        return (
          <MetricFilterCard
            key={c.label}
            isActive={isActive}
            onClick={() => onFilterChange(isActive ? 'all' : c.filterKey)}
          >
            <AICardMetric
              density={metricDensity as any}
              label={c.label}
              value={c.value}
              {...(allowAccent ? { accent: c.accent } : {})}
              {...(allowStatus && c.status ? { status: c.status } : {})}
            />
          </MetricFilterCard>
        );
      })}
    </section>
  );
}

// ── Clickable metric-card wrapper — hover + selected + keyboard a11y ────────
function MetricFilterCard({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: AI.radius.md,
        // Brand glow ring when selected; soft elevation on hover only.
        boxShadow:
          isActive
            ? `0 0 0 2px ${AI.color.brand}, 0 6px 18px ${AI.shadow.action.default}`
            : hover
              ? `0 0 0 1px ${AI.color.brandBorder}, 0 6px 18px rgba(15,17,38,0.06)`
              : 'none',
        transform: hover && !isActive ? 'translateY(-1px)' : 'none',
        transition: 'box-shadow 160ms ease-out, transform 120ms ease-out',
        outline: 'none',
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Region: Proactive Agentic Insights
// ─────────────────────────────────────────────────────────────────────────────

function InsightsRegion({ density }: { density: AIAgentTaskTrackerDensity }) {
  if (density === 'basic' || density === 'simple') return null;

  return (
    <section aria-labelledby="agentic-insights-h" style={{
      padding: 20,
      // "Context" color application — pulled from AIAnalysisInsight's
      // context type tokens (ZSAI_TAN). Same warm companion surface used
      // by other AI library context-type insights.
      background: ZSAI_TAN['00'],         // #F6F2EB
      border: `1px solid ${ZSAI_TAN[60]}`, // #B89580
      borderRadius: AI.radius.md,
    }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {/* AI Avatar atom — replaces the inline brand-gradient circle. */}
        <AIAvatar size={24} />
        <h2 id="agentic-insights-h" style={{ margin: 0, ...AI_TYPOGRAPHY['@zsai-h4'], color: ZSAI_TAN[80] }}>
          Agentic Insights
        </h2>
        <span style={{ flex: 1 }} />
        <AITextLink label="View all signals" variant="chevron" size="sm" tone="ai" />
      </header>

      <AIInsightList
        items={SAMPLE_INSIGHTS}
        density="comfortable"
        showSources
        showActions
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Region: Filter + control bar
// ─────────────────────────────────────────────────────────────────────────────

function FilterBar({
  filter,
  onClearFilter,
  layout,
  onLayoutChange,
  onViewProcessTrace,
  filteredCount,
  totalCount,
}: {
  filter: string;
  onClearFilter: () => void;
  layout: 'list' | 'board';
  onLayoutChange: (l: 'list' | 'board') => void;
  onViewProcessTrace?: () => void;
  filteredCount: number;
  totalCount: number;
}) {
  // Human-readable label for the currently active metric filter.
  const activeLabel = FILTERS.find((f) => f.key === filter)?.label ?? 'All tasks';
  const isFiltered  = filter !== 'all';
  return (
    <section style={{
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      padding: '10px 0', borderBottom: '1px solid var(--ai-card-border)',
    }}>
      {/* Filter status + clear affordance — replaces the old chip row.
          Click any metric card above to set; this row reports what is set
          and offers a one-click "Clear" back to All tasks. */}
      <div style={{ flex: 1, minWidth: 0, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {isFiltered ? (
          <>
            <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)' }}>
              Filtered by
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 999,
              background: 'var(--ai-brand-surface)',
              border: '1px solid var(--ai-brand-border)',
              color: 'var(--ai-brand-text)',
              ...AI_TYPOGRAPHY['@zsai-body-small'], fontWeight: 700, fontFamily: F,
            }}>
              {activeLabel}
              <button
                type="button"
                aria-label="Clear filter"
                onClick={onClearFilter}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: 0, lineHeight: 0, color: 'var(--ai-brand-text)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginLeft: 2,
                }}
              >
                <Glyph name="zs-icon-close" size={11} color="var(--ai-brand-text)" />
              </button>
            </span>
            <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)' }}>
              · {filteredCount} of {totalCount}
            </span>
          </>
        ) : (
          <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)' }}>
            Showing all {totalCount} tasks · click any metric card to filter
          </span>
        )}
      </div>

      {/* Controls — process trace, search / sort / filter, layout */}
      <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <AIButton variant="tertiary" size="sm" icon="zs-icon-data" label="View process trace" onClick={onViewProcessTrace} />
        <span aria-hidden="true" style={{
          display: 'inline-block', width: 1, height: 18, background: 'var(--ai-card-border)', margin: '0 2px',
        }} />
        <button aria-label="RiSearchLine" style={iconBtnStyle()}><Glyph name="zs-icon-search" size={14} color="var(--ai-zds-helper)" /></button>
        <button aria-label="Sort"   style={iconBtnStyle()}><Glyph name="zs-icon-arrow-up-down" size={14} color="var(--ai-zds-helper)" /></button>
        <button aria-label="Filter" style={iconBtnStyle()}><Glyph name="zs-icon-filter" size={14} color="var(--ai-zds-helper)" /></button>
        <LayoutSegmentedControl layout={layout} onChange={onLayoutChange} />
      </div>
    </section>
  );
}

function iconBtnStyle(): React.CSSProperties {
  return {
    width: 30, height: 30, borderRadius: 6,
    background: 'transparent', border: '1px solid var(--ai-card-border)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  };
}

// ── Icon-only List / Board segmented control ─────────────────────────────────
function ListIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BoardIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

function LayoutSegmentedControl({
  layout,
  onChange,
}: {
  layout: 'list' | 'board';
  onChange: (l: 'list' | 'board') => void;
}) {
  const seg = (active: boolean): React.CSSProperties => ({
    width: 30, height: 28,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: active ? '#FFFFFF' : 'transparent',
    color: active ? 'var(--ai-brand-text)' : 'var(--ai-zds-helper)',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background 120ms ease-out, color 120ms ease-out',
    boxShadow: active ? '0 1px 2px rgba(15,17,38,0.08)' : 'none',
  });
  return (
    <div
      role="group"
      aria-label="Registry layout"
      style={{
        display: 'inline-flex',
        gap: 2,
        padding: 2,
        marginLeft: 4,
        background: 'var(--ai-card-bg-raised)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: 8,
      }}
    >
      <button
        type="button"
        aria-pressed={layout === 'list'}
        aria-label="List view"
        title="List view"
        onClick={() => onChange('list')}
        style={seg(layout === 'list')}
      >
        <ListIcon />
      </button>
      <button
        type="button"
        aria-pressed={layout === 'board'}
        aria-label="Board view"
        title="Board view"
        onClick={() => onChange('board')}
        style={seg(layout === 'board')}
      >
        <BoardIcon />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Region: Task registry list
// ─────────────────────────────────────────────────────────────────────────────

function TaskRegistry({
  tasks,
  density,
  selectedTaskId,
  onSelect,
  layout,
}: {
  tasks: AIAgentTaskCardProps[];
  density: AIAgentTaskTrackerDensity;
  selectedTaskId?: string;
  onSelect: (id: string) => void;
  layout: 'list' | 'board';
}) {
  // Density gating: basic → all cards basic; simple → simple; rich → mix
  // (the Needs-Input task is upgraded to Rich for visibility), robust → all
  // robust.
  function densityFor(t: AIAgentTaskCardProps): AIAgentTaskCardDensity {
    if (density === 'basic')   return 'basic';
    if (density === 'simple')  return 'simple';
    if (density === 'robust')  return 'robust';
    // Rich page → Rich for Needs Input + Pending approval; Simple for the rest.
    if (t.status === 'needs-input' || t.status === 'pending-approval') return 'rich';
    return 'simple';
  }

  if (tasks.length === 0) {
    return (
      <section style={{
        padding: 40, textAlign: 'center',
        background: 'var(--ai-card-bg)',
        border: '1px dashed var(--ai-card-border)',
        borderRadius: AI.radius.md,
      }}>
        <Glyph name="zs-icon-check-circle" size={36} color="var(--ai-zds-helper)" />
        <div style={{ marginTop: 8, ...AI_TYPOGRAPHY['@zsai-h6'], color: 'var(--ai-zds-text)' }}>
          No active tasks
        </div>
        <div style={{ marginTop: 4, ...AI_TYPOGRAPHY['@zsai-body-small'], color: 'var(--ai-zds-helper)' }}>
          When you delegate a task, Smart Assist will track it here.
        </div>
      </section>
    );
  }

  if (layout === 'board') {
    // Board view — group by major status family
    const cols: Array<{ key: string; label: string; match: (t: AIAgentTaskCardProps) => boolean }> = [
      { key: 'active',     label: 'Active / Recurring', match: (t) => t.status === 'active' || t.status === 'recurring-active' },
      { key: 'scheduled',  label: 'Scheduled',          match: (t) => t.status === 'scheduled' },
      { key: 'needsInput', label: 'Needs Input',        match: (t) => t.status === 'needs-input' },
      { key: 'approval',   label: 'Pending approval',   match: (t) => t.status === 'pending-approval' },
      { key: 'completed',  label: 'Completed',          match: (t) => t.status === 'completed' || t.status === 'approved' },
    ];
    return (
      <section style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, minmax(220px, 1fr))`, gap: 12 }}>
        {cols.map((c) => {
          const items = tasks.filter(c.match);
          return (
            <div key={c.key} style={{
              background: 'var(--ai-card-bg-raised)',
              border: '1px solid var(--ai-card-border)',
              borderRadius: AI.radius.sm, padding: 10,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ ...AI_TYPOGRAPHY['@zsai-section-subtitle'], color: 'var(--ai-zds-text)' }}>{c.label}</span>
                <span style={{ ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)' }}>{items.length}</span>
              </div>
              {items.map((t) => (
                <AIAgentTaskCard
                  key={t.taskId}
                  {...t}
                  density="simple"
                  selected={t.taskId === selectedTaskId}
                  onClick={() => onSelect(t.taskId)}
                />
              ))}
            </div>
          );
        })}
      </section>
    );
  }

  return (
    <section role="list" aria-label="Tracked tasks" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tasks.map((t) => (
        <div role="listitem" key={t.taskId}>
          <AIAgentTaskCard
            {...t}
            density={densityFor(t)}
            selected={t.taskId === selectedTaskId}
            onClick={() => onSelect(t.taskId)}
            onViewRationale={() => {}}
            onViewTrace={() => {}}
            onViewSources={() => {}}
          />
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Region: Task detail panel
// ─────────────────────────────────────────────────────────────────────────────

function DetailPanel({ task, onClose }: { task?: AIAgentTaskCardProps; onClose: () => void }) {
  if (!task) return null;
  return (
    <aside aria-label="Task detail" style={{
      width: 380, flexShrink: 0,
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.md,
      padding: 16,
      display: 'flex', flexDirection: 'column', gap: 14,
      maxHeight: 'calc(100vh - 64px)', overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ ...AI_TYPOGRAPHY['@zsai-section-subtitle'], color: 'var(--ai-brand-text)' }}>Task detail</span>
        <button aria-label="Close" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ai-zds-helper)' }}>
          <Glyph name="zs-icon-close" size={14} />
        </button>
      </div>

      <AIAgentTaskCard
        {...task}
        density="robust"
        agentStack={task.agentStack ?? [
          { id: 'sup', name: 'Smart Assist',   role: 'Supervisor' },
          { id: 'wrk', name: task.agent?.name ?? 'Worker', role: 'Worker' },
        ]}
        reviewState={{ label: 'Awaiting reviewer assignment', reviewer: 'Sarah K.' }}
        primaryAction={{ label: 'Resolve input', onClick: () => {} }}
        secondaryActions={[
          { label: 'Pause',     onClick: () => {} },
          { label: 'Escalate',  onClick: () => {} },
          { label: 'Cancel',    onClick: () => {} },
        ]}
        onViewRationale={() => {}}
        onViewTrace={() => {}}
        onViewSources={() => {}}
      />

      <AIRationalePanel
        whatFound="Recipient Dr. John Lee has not opened the last 3 emails about Lectrazine. RxVantage shows a site visit window of June 12; sending June 10 maximizes review time."
        whyMatters="Outreach goal at risk — sending without a confirmed date risks duplicate or missed contact."
        considered={[
          'Send immediately',
          'Wait for manual confirmation',
          'Send June 10th (recommended)',
        ]}
        assumptions={[
          'Dr. Lee\'s next visit window is firm per RxVantage as of 12m ago',
          'Email channel preference is unchanged from prior outreach',
        ]}
        sources={[
          { label: 'RxVantage',   url: '#' },
          { label: 'CRM · Veeva', url: '#' },
        ]}
        defaultOpen={false}
      />

      <div>
        <div style={{ ...AI_TYPOGRAPHY['@zsai-section-subtitle'], color: 'var(--ai-zds-text)', marginBottom: 6 }}>
          RiPulseLine timeline
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { time: '4m ago',  text: 'Smart Assist paused execution — waiting on send date.' },
            { time: '12m ago', text: 'Outreach Agent retrieved RxVantage visit window.' },
            { time: '18m ago', text: 'Smart Assist created task from user delegation.' },
          ].map((row, i) => (
            <li key={i} style={{
              display: 'flex', gap: 8, padding: '6px 8px',
              background: 'var(--ai-card-bg-raised)', borderRadius: AI.radius.xs,
              ...AI_TYPOGRAPHY['@zsai-body-extra-small'], color: 'var(--ai-zds-text)',
            }}>
              <span style={{ color: 'var(--ai-zds-helper)', flexShrink: 0, minWidth: 56 }}>{row.time}</span>
              <span>{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Region: Bidirectional mutation bar (NL command)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Bottom mutation surface — uses AICommandCenterDialog's "bottom-docked"
 * variant. The variant itself handles sticky positioning, horizontal
 * centering, max-width, and the gradient backdrop.
 */
function MutationBar({ density }: { density: AIAgentTaskTrackerDensity }) {
  if (density === 'basic') return null;
  return (
    <AICommandCenterDialog
      variant="bottom-docked"
      maxWidth={680}
      backdropColor="#F7F8FC"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Conflict resolution modal (rendered only in `flow === 'conflict'`)
// ─────────────────────────────────────────────────────────────────────────────

function ConflictResolutionModal() {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="conflict-h" style={{
      position: 'absolute', inset: 0,
      background: 'rgba(15, 17, 38, 0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        width: 'min(560px, 100%)',
        background: '#FFFFFF',
        border: `2px solid ${ZS_ORANGE[40]}`,
        borderRadius: AI.radius.md,
        padding: 18,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Glyph name="zs-icon-error-triangle" size={18} color={ZS_ORANGE[80]} />
          <h2 id="conflict-h" style={{ margin: 0, ...AI_TYPOGRAPHY['@zsai-h5'], color: ZS_ORANGE[80] }}>
            Conflicting edits on task T-3091
          </h2>
        </header>

        <p style={{ margin: 0, ...AI_TYPOGRAPHY['@zsai-body-small'], color: 'var(--ai-zds-text)' }}>
          You changed the schedule in the side panel while a natural-language command tried to apply a different date. Pick one to proceed — nothing has been applied yet.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { label: 'Panel edit',         value: 'Send June 9th',  icon: 'zs-icon-edit'      },
            { label: 'Natural language',   value: 'Send June 10th', icon: 'zs-icon-ai-assist' },
          ].map((p) => (
            <div key={p.label} style={{
              padding: 12, borderRadius: AI.radius.sm,
              background: 'var(--ai-card-bg-raised)',
              border: '1px solid var(--ai-card-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...AI_TYPOGRAPHY['@zsai-meta-label'], color: 'var(--ai-zds-helper)', marginBottom: 4 }}>
                <Glyph name={p.icon} size={11} color="var(--ai-zds-helper)" />
                {p.label}
              </div>
              <div style={{ ...AI_TYPOGRAPHY['@zsai-body'], color: 'var(--ai-zds-text)', fontWeight: 600 }}>
                {p.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <AIButton variant="tertiary"  size="sm" label="Cancel" />
          <AIButton variant="secondary" size="sm" label="Merge changes" />
          <AIButton variant="secondary" size="sm" label="Keep panel edit" />
          <AIButton variant="primary"   size="sm" label="Keep natural language" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────────────────────────────────────

export function AIAgentTaskTracker({
  density = 'rich',
  flow = 'default',
  supervisorAgent = { name: 'AI Agent Task Tracker', tasksTracked: 7, lastUpdated: 'Updated 2m ago' },
  // Default to the darkest brand-ink (zsai-100) tone. The Basic density
  // variant overrides this back to "tan" for the calmer MVP scope.
  supervisorTone = 'dark',
  tasks: tasksProp,
  selectedTaskId: selectedTaskIdProp,
  layout: layoutProp = 'list',
  onNewTask,
  onSettings,
  onExport,
  onViewProcessTrace,
}: AIAgentTaskTrackerProps) {
  const tasks = useMemo(() => tasksProp ?? SAMPLE_TASKS, [tasksProp]);

  const [filter,    setFilter]   = useState<string>('all');
  const [layout,    setLayout]   = useState<'list' | 'board'>(layoutProp);
  const [selected,  setSelected] = useState<string | undefined>(
    selectedTaskIdProp ?? (density === 'rich' || density === 'robust' ? 'T-3091' : undefined),
  );

  const filtered = useMemo(() => {
    const def = FILTERS.find((f) => f.key === filter)!;
    if (flow === 'empty') return [];
    return tasks.filter(def.match);
  }, [tasks, filter, flow]);

  const selectedTask = useMemo(
    () => tasks.find((t) => t.taskId === selected),
    [tasks, selected],
  );

  const showDetailPanel = (density === 'rich' || density === 'robust') && selectedTask && flow !== 'empty';

  return (
    // Page root — fills the available area and scrolls internally so the
    // full-page preview wrapper can never crop the top region.
    <div style={{
      position: 'relative',
      width: '100%',
      // height fills the embedding wrapper but allows overflow scroll for
      // long content (Rich + Robust). Falls back to a sensible min in the
      // documentation preview.
      height: '100%',
      minHeight: 720,
      background: '#F7F8FC',
      fontFamily: F,
      overflowY: 'auto',
    }}>
      {/* Flush supervisor bar — edge-to-edge against page top.
          Primary "New task" + ellipsis (Export / Settings) live in the
          supervisor bar's right-aligned actions slot. */}
      <AISupervisorBar
        name={supervisorAgent.name}
        role={<AIChip kind="brief" label="Supervisor agent" size="sm" noDot />}
        stat={`${supervisorAgent.tasksTracked} tasks tracked`}
        meta={supervisorAgent.lastUpdated}
        tone={supervisorTone}
        actions={
          <SupervisorActions
            tone={supervisorTone}
            onNewTask={onNewTask}
            onExport={onExport}
            onSettings={onSettings}
          />
        }
      />

      {/* Padded body — all other regions live here. The supervisor bar
          above carries the page identity, so no separate h1 / description
          row is rendered. */}
      <div style={{
        padding: 24,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Summary metrics — clickable filter targets (hide on `empty`) */}
        {flow !== 'empty' && (
          <SummaryRow
            tasks={tasks}
            density={density}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}

        {/* Insights — rich + robust only */}
        {flow !== 'empty' && <InsightsRegion density={density} />}

        {/* Filter status + controls bar — hide on `empty` */}
        {flow !== 'empty' && (
          <FilterBar
            filter={filter}
            onClearFilter={() => setFilter('all')}
            layout={layout}
            onLayoutChange={setLayout}
            onViewProcessTrace={onViewProcessTrace}
            filteredCount={filtered.length}
            totalCount={tasks.length}
          />
        )}

        {/* Two-column body: registry + detail panel */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TaskRegistry
              tasks={filtered}
              density={density}
              selectedTaskId={selected}
              onSelect={setSelected}
              layout={layout}
            />
          </div>
          {showDetailPanel && (
            <DetailPanel task={selectedTask} onClose={() => setSelected(undefined)} />
          )}
        </div>

      </div>

      {/* Bidirectional NL mutation bar — AICommandCenterDialog's
          "bottom-docked" variant handles sticky positioning, centering,
          max-width, and the gradient backdrop. Hidden on empty + basic. */}
      {flow !== 'empty' && density !== 'basic' && <MutationBar density={density} />}

      {/* Conflict modal overlays everything when flow === 'conflict' */}
      {flow === 'conflict' && <ConflictResolutionModal />}
    </div>
  );
}

export default AIAgentTaskTracker;
