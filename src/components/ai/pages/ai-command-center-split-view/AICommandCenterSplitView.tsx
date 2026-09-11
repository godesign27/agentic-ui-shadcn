import React, { useRef, useEffect, useState } from 'react';
import { F, DS, AI, AI_THEME } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIAvatar } from '../../atomic/ai-avatar/AIAvatar';
import { AIUserBubble } from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIWorkingIndicator, AIThinkingIndicator, AIGettingInfoIndicator } from '../../atomic/ai-loading-indicators/AILoadingIndicators';
import { AIPatternMessage, PATTERNS, LOADERS, type ChatMsg, type UserMsg, type LoadingMsg, type AIMsg } from '../../_support/AIResponsePatterns';
import { AIInputCard } from '../../organisms/ai-dialog/AIDialog';
import { AIGeneratedDashboard } from '../../patterns/ai-generated-dashboard/AIGeneratedDashboard';
import { AIHandoffTimeline } from '../../organisms/ai-handoff-timeline/AIHandoffTimeline';
import { AICardQueue } from '../../patterns/ai-card-queue/AICardQueue';
import type { AICommandCenterVariant } from '../ai-command-center/AICommandCenter';

// ── Types ─────────────────────────────────────────────────────────────────────
export type SplitViewMode   = 'start' | 'split';
export type OutputStatus    = 'idle' | 'loading' | 'ready' | 'updating';
export type OutputPlaceholderType = 'analysis' | 'workflow' | 'table' | 'scenario' | 'draft' | 'approval' | 'dashboard' | 'handoff' | 'queue';

const OUTPUT_TYPES: OutputPlaceholderType[] = ['analysis', 'workflow', 'table', 'scenario', 'draft', 'approval', 'dashboard', 'handoff', 'queue'];
const OUTPUT_TITLES: Record<OutputPlaceholderType, string> = {
  analysis:  'Analysis Output',
  workflow:  'Generated Workflow',
  table:     'Report Preview',
  scenario:  'Scenario Recommendation',
  draft:     'Draft Output',
  approval:  'Approval Flow',
  dashboard: 'AI Generated Dashboard',
  handoff:   'Handoff Timeline',
  queue:     'Enrichment Queue',
};

// ── Message ID counter ────────────────────────────────────────────────────────
let _svMsgId = 0;
const nextId = () => `sv-${++_svMsgId}-${Date.now()}`;

// ── CSS animations ────────────────────────────────────────────────────────────
function SplitViewAnimStyles() {
  return (
    <style>{`
      @keyframes sv-fade-in  { from{opacity:0} to{opacity:1} }
      @keyframes sv-slide-in { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
      @keyframes sv-chat-in  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
      @keyframes sv-pulse    { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
      @keyframes sv-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @media (prefers-reduced-motion: reduce) {
        [data-sv-anim] { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}

// ── Placeholder output modules ────────────────────────────────────────────────
function AnalysisPlaceholder() {
  const cards = [
    { border: 'var(--ai-status-info-border)', bg: 'var(--ai-status-info-bg)', label: 'Key Trend',        width: '75%', color: '#097174' },
    { border: AI.color.action.primary, bg: AI.color.brandSurface, label: 'Observation',   width: '60%', color: AI.color.action.primary },
    { border: 'var(--ai-signal-border)', bg: 'var(--ai-signal-surface)', label: 'Recommendation',   width: '68%', color: '#A54F00' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {cards.map(c => (
        <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.border}30`, borderLeft: `3px solid ${c.border}`, borderRadius: '8px', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 700, color: c.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</span>
            <span style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper, marginLeft: 'auto', background: 'var(--ai-track-bg)', padding: '1px 6px', borderRadius: '10px' }}>High Confidence</span>
          </div>
          <div style={{ height: '10px', borderRadius: '4px', background: 'var(--ai-track-bg)', width: c.width, marginBottom: '5px' }} />
          <div style={{ height: '8px',  borderRadius: '4px', background: 'var(--ai-track-bg)', width: '90%' }} />
        </div>
      ))}
    </div>
  );
}

function WorkflowPlaceholder({ activeStep = 0 }: { activeStep?: number }) {
  const labels = [
    'Analyze territory data',
    'Identify coverage gaps',
    'Generate rebalancing plan',
    'Review and approve',
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {labels.map((label, i) => {
        const isActive = i === activeStep;
        const isDone   = i <  activeStep;
        const bg = isActive ? AI.color.action.primary : isDone ? '#27AE60' : 'var(--ai-track-bg)';
        return (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                {isActive ? (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'sv-pulse 1.4s ease-in-out infinite' }} data-sv-anim />
                ) : isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 700, color: DS.textHelper }}>{i + 1}</span>
                )}
              </div>
              {i < labels.length - 1 && (
                <div style={{ width: '1px', height: '22px', background: isDone ? '#27AE60' : isActive ? `${AI.color.action.primary}40` : 'var(--ai-divider)', marginTop: '2px', marginBottom: '2px', transition: 'background 0.3s' }} />
              )}
            </div>
            <div style={{ paddingTop: '5px', paddingBottom: i < labels.length - 1 ? '14px' : '0' }}>
              <span style={{ fontFamily: F, fontSize: '14px', color: isActive || isDone ? DS.textDefault : DS.textHelper }}>{label}</span>
              {isActive && <div style={{ fontFamily: F, fontSize: '12px', color: AI.color.action.primary, marginTop: '2px' }}>In progress…</div>}
              {isDone   && <div style={{ fontFamily: F, fontSize: '12px', color: '#27AE60',                  marginTop: '2px' }}>Completed</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TablePlaceholder() {
  const cols = ['Territory', 'Rep', 'Coverage', 'Priority'];
  const rows: [string, string, string, string, boolean][] = [
    ['Northeast A', 'K. Chen',   '94%', 'Low',    false],
    ['Southwest B', 'M. Park',   '67%', 'High',   true ],
    ['Midwest C',   'J. Torres', '81%', 'Medium', false],
    ['Southeast D', 'A. Patel',  '72%', 'Medium', false],
  ];
  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--ai-divider)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F }}>
        <thead>
          <tr style={{ background: AI.color.brandSurface }}>
            {cols.map(c => (
              <th key={c} style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 700, color: DS.textHelper, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--ai-divider)', whiteSpace: 'nowrap' }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([territory, rep, coverage, priority, flagged], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--ai-card-bg)' : 'var(--ai-row-alt)' }}>
              <td style={{ padding: '8px 12px', fontSize: '12px', color: DS.textDefault, borderBottom: '1px solid var(--ai-divider)' }}>{territory}</td>
              <td style={{ padding: '8px 12px', fontSize: '12px', color: DS.textDefault, borderBottom: '1px solid var(--ai-divider)' }}>{rep}</td>
              <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: flagged ? '#E74C3C' : '#27AE60', borderBottom: '1px solid var(--ai-divider)' }}>{coverage}</td>
              <td style={{ padding: '8px 12px', fontSize: '12px', color: DS.textDefault, borderBottom: '1px solid var(--ai-divider)' }}>{priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScenarioPlaceholder() {
  const scenarios = [
    { label: 'Scenario A', sub: 'Balanced reallocation',  outcome: '+18% coverage', outColor: '#27AE60', recommended: true  },
    { label: 'Scenario B', sub: 'Growth-first strategy',  outcome: '+24% coverage', outColor: AI.color.action.primary, recommended: false },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {scenarios.map(s => (
        <div key={s.label} style={{ background: s.recommended ? AI.color.brandSurface : 'var(--ai-card-bg)', border: `1.5px solid ${s.recommended ? AI.color.brandBorder : 'var(--ai-divider)'}`, borderRadius: '10px', padding: '14px 16px', position: 'relative' }}>
          {s.recommended && (
            <span style={{ position: 'absolute', top: '10px', right: '12px', fontFamily: F, fontSize: '12px', fontWeight: 700, color: AI.color.action.primary, background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`, padding: '2px 7px', borderRadius: '10px' }}>Recommended</span>
          )}
          <div style={{ fontFamily: F, fontSize: '14px', fontWeight: 600, color: DS.textDefault, marginBottom: '3px' }}>{s.label}: {s.sub}</div>
          <div style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper, marginBottom: '10px' }}>
            Projected outcome: <span style={{ color: s.outColor, fontWeight: 600 }}>{s.outcome}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Preview', 'Apply', 'Compare'].map(a => (
              <button key={a} style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper, background: 'none', border: '1px solid var(--ai-btn-outline-border)', borderRadius: '6px', padding: '3px 10px', cursor: 'pointer' }}>{a}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DraftPlaceholder() {
  return (
    <div style={{ background: 'var(--ai-card-bg)', borderRadius: '10px', border: '1px solid var(--ai-divider)', padding: '20px', fontFamily: F }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: DS.textDefault, marginBottom: '4px' }}>Q3 Territory Review — Draft</div>
      <div style={{ fontSize: '12px', color: DS.textHelper, marginBottom: '16px' }}>Generated draft · Pending review</div>
      {[100, 85, 92, 60, 88].map((w, i) => (
        <div key={i} style={{ height: i === 0 ? '11px' : '9px', borderRadius: '4px', background: 'var(--ai-track-bg)', width: `${w}%`, marginBottom: '8px' }} />
      ))}
      <div style={{ height: '1px', background: 'var(--ai-divider)', margin: '16px 0' }} />
      {[75, 90, 55].map((w, i) => (
        <div key={`b-${i}`} style={{ height: '9px', borderRadius: '4px', background: 'var(--ai-track-bg)', width: `${w}%`, marginBottom: '8px' }} />
      ))}
    </div>
  );
}

function ApprovalPlaceholder() {
  const stages = [
    { label: 'Submitted',         person: 'You',       status: 'done'    as const },
    { label: 'Manager Review',    person: 'T. Wilson',  status: 'active'  as const },
    { label: 'Director Approval', person: 'S. Chen',    status: 'pending' as const },
  ];
  return (
    <div style={{ background: 'var(--ai-card-bg)', borderRadius: '10px', border: '1px solid var(--ai-divider)', padding: '16px', fontFamily: F }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: DS.textDefault, marginBottom: '14px' }}>Approval: Q3 Budget Workflow</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        {stages.map((s, i) => (
          <React.Fragment key={s.label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px', background: s.status === 'done' ? '#27AE60' : s.status === 'active' ? AI.color.action.primary : 'var(--ai-track-bg)' }}>
                {s.status === 'done'
                  ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontSize: '12px', fontWeight: 600, color: s.status === 'active' ? 'white' : DS.textHelper }}>{i + 1}</span>
                }
              </div>
              <span style={{ fontFamily: F, fontSize: '12px', color: s.status === 'pending' ? DS.textHelper : DS.textDefault, textAlign: 'center', lineHeight: 1.3 }}>{s.label}</span>
              <span style={{ fontFamily: F, fontSize: '9px', color: DS.textHelper, textAlign: 'center' }}>{s.person}</span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ height: '1px', background: i === 0 ? '#27AE60' : 'var(--ai-divider)', width: '28px', marginBottom: '28px', flexShrink: 0 }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ fontFamily: F, fontSize: '12px', color: 'white', background: AI.color.action.primary, border: 'none', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontWeight: 600 }}>Review</button>
        <button style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper, background: 'none', border: '1px solid var(--ai-btn-outline-border)', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer' }}>Escalate</button>
      </div>
    </div>
  );
}

function QueuePlaceholder() {
  return (
    <AICardQueue
      title="Enrichment Queue"
      summary="Enriching 18 accounts with Clearbit + LinkedIn data"
      items={[
        { id: '1', label: 'Acme Corp',         status: 'complete' },
        { id: '2', label: 'Globex Ltd',        status: 'running',        eta: 'ETA ~30s' },
        { id: '3', label: 'Initech Solutions', status: 'needs-approval' },
        { id: '4', label: 'Umbrella Corp',     status: 'queued',         eta: 'ETA ~2m' },
        { id: '5', label: 'Wonka Industries',  status: 'blocked' },
      ]}
    />
  );
}

function HandoffPlaceholder() {
  return (
    <AIHandoffTimeline
      direction="agent-to-agent"
      steps={[
        { owner: 'Research Agent', ownerType: 'agent', timestamp: 'Jun 6, 10:12 AM', note: 'Analysis complete — 7 accounts flagged at risk. Escalating for human review.', status: 'complete' },
        { owner: 'Sarah Chen',     ownerType: 'human', timestamp: 'Jun 6, 10:35 AM', status: 'active'   },
        { owner: 'Writer Agent',   ownerType: 'agent', timestamp: 'Jun 6, 11:00 AM', status: 'pending'  },
      ]}
    />
  );
}

function OutputPlaceholderContent({ type, workflowStep = 0 }: { type: OutputPlaceholderType; workflowStep?: number }) {
  const subtitles: Record<OutputPlaceholderType, string> = {
    analysis:  'AI-generated analysis based on your prompt.',
    workflow:  'Structured workflow steps generated by Guild Agent.',
    table:     'Tabular data generated from your request.',
    scenario:  'AI-modeled scenarios with projected outcomes.',
    draft:     'Generated draft ready for review and editing.',
    approval:  'Approval workflow created from your request.',
    dashboard: 'Living domain dashboard generated from your prompt — scenarios, impact, and map overlays in one workspace.',
    handoff:   'Auditable timeline of ownership transitions across agents and humans for this workstream.',
    queue:     'Live execution queue showing per-item progress, approvals, and blocked work.',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {type !== 'dashboard' && type !== 'handoff' && type !== 'queue' && (
        <p style={{ margin: 0, fontFamily: F, fontSize: '14px', color: DS.textHelper, lineHeight: 1.55 }}>{subtitles[type]}</p>
      )}
      {type === 'analysis'  && <AnalysisPlaceholder />}
      {type === 'workflow'  && <WorkflowPlaceholder activeStep={workflowStep} />}
      {type === 'table'     && <TablePlaceholder />}
      {type === 'scenario'  && <ScenarioPlaceholder />}
      {type === 'draft'     && <DraftPlaceholder />}
      {type === 'approval'  && <ApprovalPlaceholder />}
      {type === 'dashboard' && <AIGeneratedDashboard variant="embedded" showHeader={false} />}
      {type === 'handoff'   && <HandoffPlaceholder />}
      {type === 'queue'     && <QueuePlaceholder />}
    </div>
  );
}

// ── Right output pane loading state ───────────────────────────────────────────
function OutputLoadingState({ label = 'Generating output…' }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2.5px solid ${AI.color.action.primary}`, borderTopColor: 'transparent', animation: 'sv-spin 0.8s linear infinite', flexShrink: 0 }} data-sv-anim />
        <span style={{ fontFamily: F, fontSize: '14px', color: AI.color.action.primary }}>{label}</span>
      </div>
      {[80, 65, 92, 55, 75].map((w, i) => (
        <div key={i} style={{ height: i === 0 ? '48px' : '32px', borderRadius: '8px', background: `${AI.color.action.primary}09`, width: `${w}%`, animation: `sv-pulse 1.6s ease-in-out ${i * 0.18}s infinite` }} data-sv-anim />
      ))}
    </div>
  );
}

// ── Right output pane ─────────────────────────────────────────────────────────
interface RightPaneProps {
  outputStatus: OutputStatus;
  outputType: OutputPlaceholderType;
  workflowStep?: number;
  onHide: () => void;
}

function RightOutputPane({ outputStatus, outputType, workflowStep = 0, onHide }: RightPaneProps) {
  const title = outputStatus === 'loading' || outputStatus === 'updating' ? 'Generating…' : OUTPUT_TITLES[outputType];

  function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
    const [hov, setHov] = React.useState(false);
    return (
      <button aria-label={label} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} title={label}
        style={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hov ? 'var(--ai-btn-outline-hover-bg)' : 'none', border: 'none', cursor: 'pointer', color: hov ? DS.textDefault : DS.iconDefault, borderRadius: '6px', transition: 'all 0.12s' }}
      >
        {icon}
      </button>
    );
  }

  return (
    <div role="region" aria-label="AI output" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface-color-1)', borderLeft: '1px solid var(--ai-divider)', overflow: 'hidden', minWidth: '360px', animation: 'sv-slide-in 0.32s cubic-bezier(0.16,1,0.3,1) both' }} data-sv-anim>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 16px', background: 'var(--ai-card-bg)', borderBottom: '1px solid var(--ai-divider)', flexShrink: 0 }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: outputStatus === 'ready' ? '#27AE60' : AI.color.action.primary, flexShrink: 0, transition: 'background 0.3s' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: F, fontSize: '14px', fontWeight: 600, color: DS.textDefault, letterSpacing: '-0.1px' }}>{title}</span>
          {outputStatus === 'ready' && (
            <span style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper, marginLeft: '8px' }}>Conditional AI Output</span>
          )}
        </div>
        <ActionBtn label="Copy output" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
        } />
        <ActionBtn label="Save output" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
        } />
        <ActionBtn label="View rationale" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        } />
        <ActionBtn label="Hide output pane" onClick={onHide} icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        } />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {(outputStatus === 'loading' || outputStatus === 'updating') && (
          <OutputLoadingState label={outputStatus === 'updating' ? 'Updating output…' : 'Generating output…'} />
        )}
        {outputStatus === 'ready' && <OutputPlaceholderContent type={outputType} workflowStep={workflowStep} />}
        {outputStatus === 'idle' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span style={{ fontFamily: F, fontSize: '14px', color: DS.textHelper, opacity: 0.6 }}>No generated output for this prompt</span>
          </div>
        )}
      </div>

      {/* Footer */}
      {outputStatus === 'ready' && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--ai-divider)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, background: 'var(--ai-card-bg)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27AE60', flexShrink: 0 }} />
          <span style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper }}>Output ready · Guild Agent · Just now</span>
          <div style={{ flex: 1 }} />
          <button style={{ fontFamily: F, fontSize: '12px', color: AI.color.action.primary, background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>View sources</button>
        </div>
      )}
    </div>
  );
}

// ── Internal chip button ──────────────────────────────────────────────────────
function ChipButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: F, fontSize: '12px',
        color: hov ? AI.color.action.primary : DS.textHelper,
        background: hov ? AI.color.brandSurface : 'var(--ai-card-bg)',
        border: hov ? `1.5px solid ${AI.color.brandBorder}` : '1.5px solid var(--ai-btn-outline-border)',
        borderRadius: '100px', padding: '5px 14px', cursor: 'pointer',
        backdropFilter: 'blur(8px)', transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
export interface AICommandCenterSplitViewProps {
  variant?:         AICommandCenterVariant;
  showBackground?:  boolean;
  suggestions?:     string[];
}

// ── Main component ────────────────────────────────────────────────────────────
export function AICommandCenterSplitView({
  variant        = 'gray',
  showBackground = true,
  suggestions,
}: AICommandCenterSplitViewProps) {
  const [mode,          setMode]          = useState<SplitViewMode>('start');
  const [messages,      setMessages]      = useState<ChatMsg[]>([]);
  const [inputValue,    setInputValue]    = useState('');
  const [outputStatus,  setOutputStatus]  = useState<OutputStatus>('idle');
  const [outputIndex,   setOutputIndex]   = useState(0);
  const [workflowStep,  setWorkflowStep]  = useState(0);
  const [showOutputPane, setShowOutputPane] = useState(true);
  const patternCount   = useRef(0);
  const promptCount    = useRef(0);
  const firstFlowTimers = useRef<number[]>([]);
  const scrollAreaRef  = useRef<HTMLDivElement>(null);

  useEffect(() => () => { firstFlowTimers.current.forEach(t => clearTimeout(t)); }, []);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const theme    = AI_THEME[variant === 'aqua' ? 'aqua' : 'default'];
  const bgActive = showBackground ? theme['gradient.surface.active'] : 'var(--background)';
  const bgEmpty  = showBackground ? theme['gradient.surface.idle']   : 'var(--ai-card-bg)';

  const outputType = OUTPUT_TYPES[outputIndex % OUTPUT_TYPES.length];

  const defaultSuggestions = [
    'Analyze Q1 alignment and show key insights',
    'Create a territory balance scenario',
    'Generate a call plan for underperforming accounts',
    'Compare this quarter to last quarter',
    'Build an approval workflow for Q3 budget',
  ];
  const chips = suggestions ?? defaultSuggestions;

  // Scroll chat to bottom on new messages
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || messages.length === 0) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const idx     = patternCount.current % PATTERNS.length;
    const loader  = LOADERS[idx];
    const pattern = PATTERNS[idx];
    patternCount.current += 1;

    const isFirst = messages.length === 0;
    promptCount.current += 1;
    const isThird  = promptCount.current === 3;
    const isFourth = promptCount.current === 4;
    const userId  = nextId();
    const loadId  = nextId();
    const aiId    = nextId();

    setMessages(prev => [
      ...prev,
      { id: userId, kind: 'user', text } as UserMsg,
      { id: loadId, kind: 'loading', variant: loader } as LoadingMsg,
    ]);
    setInputValue('');

    if (isFirst) {
      setMode('split');
      setShowOutputPane(true);
      setOutputStatus('loading');

      const WORKFLOW_IDX  = OUTPUT_TYPES.indexOf('workflow');
      const DASHBOARD_IDX = OUTPUT_TYPES.indexOf('dashboard');
      const t = (ms: number, fn: () => void) => firstFlowTimers.current.push(window.setTimeout(fn, ms));

      // Phase 1 — loader resolves, workflow pattern appears at step 0
      t(1800, () => {
        setMessages(prev => [
          ...prev.filter(m => m.id !== loadId),
          { id: aiId, kind: 'ai', pattern, userText: text } as AIMsg,
        ]);
        setWorkflowStep(0);
        setOutputIndex(WORKFLOW_IDX);
        setOutputStatus('ready');
      });

      // Phase 2 — cycle through the four workflow steps
      [1, 2, 3, 4].forEach((step, i) => {
        t(1800 + (i + 1) * 1100, () => setWorkflowStep(step));
      });

      // Phase 3 — transition to the generated dashboard output
      t(1800 + 5 * 1100, () => {
        setOutputStatus('updating');
      });
      t(1800 + 5 * 1100 + 700, () => {
        setOutputIndex(DASHBOARD_IDX);
        setOutputStatus('ready');
      });
      return;
    }

    setOutputStatus('updating');
    setTimeout(() => {
      setMessages(prev => [
        ...prev.filter(m => m.id !== loadId),
        { id: aiId, kind: 'ai', pattern, userText: text } as AIMsg,
      ]);
      setOutputStatus('ready');
      if (isThird) {
        setOutputIndex(OUTPUT_TYPES.indexOf('handoff'));
      } else if (isFourth) {
        setOutputIndex(OUTPUT_TYPES.indexOf('queue'));
      } else {
        setOutputIndex(prev => prev + 1);
      }
    }, 2000);
  };

  // ── Start state (centered) ────────────────────────────────────────────────
  if (mode === 'start') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <SplitViewAnimStyles />
        <div style={{ position: 'absolute', inset: 0, background: bgEmpty, pointerEvents: 'none' }} />
        {/* Ambient glow halo */}
        <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)', width: '820px', height: '260px', background: 'radial-gradient(ellipse at center, rgba(180,170,255,0.45) 0%, rgba(165,236,243,0.28) 32%, transparent 68%)', pointerEvents: 'none', filter: 'blur(22px)', zIndex: 0 }} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
            <AIAvatar />
            <h1 style={{ ...AI_TYPOGRAPHY['@ai-h1'], color: DS.textDefault, margin: 0, letterSpacing: '-0.5px', fontFamily: F }}>
              {greeting}, Theo!
            </h1>
          </div>
          <p style={{ ...AI_TYPOGRAPHY['@ai-subtitle-2'], color: DS.textHelper, fontFamily: F, marginBottom: '28px', textAlign: 'center' }}>
            Ask me anything, or choose a quick action below
          </p>
          <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={false} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '680px', width: '100%', justifyContent: 'center', marginTop: '16px' }}>
            {chips.map(chip => (
              <ChipButton key={chip} label={chip} onClick={() => setInputValue(chip)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Split state (two panes) ───────────────────────────────────────────────
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden', background: bgActive }}>
      <SplitViewAnimStyles />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* ── Left chat pane ── */}
        <div role="region" aria-label="AI conversation" style={{ width: '38%', minWidth: '320px', maxWidth: '480px', display: 'flex', flexDirection: 'column', background: 'var(--ai-card-bg)', borderRight: '1px solid var(--ai-divider)', overflow: 'hidden', flexShrink: 0, animation: 'sv-chat-in 0.28s cubic-bezier(0.16,1,0.3,1) both' }} data-sv-anim>
          {/* Chat pane header */}
          <div style={{ height: '48px', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--ai-divider)', flexShrink: 0 }}>
            <AIAvatar size={24} />
            <span style={{ fontFamily: F, fontSize: '14px', fontWeight: 600, color: DS.textDefault }}>Guild Agent</span>
            <div style={{ flex: 1 }} />
            {!showOutputPane && (
              <button onClick={() => setShowOutputPane(true)} title="Show output pane"
                style={{ fontFamily: F, fontSize: '12px', color: AI.color.action.primary, background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`, borderRadius: '6px', padding: '3px 10px', cursor: 'pointer' }}
              >
                Show output
              </button>
            )}
          </div>

          {/* Chat thread */}
          <div ref={scrollAreaRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map(msg => {
              if (msg.kind === 'user') return <AIUserBubble key={msg.id} text={(msg as UserMsg).text} />;
              if (msg.kind === 'loading') {
                const v = (msg as LoadingMsg).variant;
                if (v === 'working')  return <AIWorkingIndicator  key={msg.id} />;
                if (v === 'thinking') return <AIThinkingIndicator key={msg.id} />;
                return <AIGettingInfoIndicator key={msg.id} />;
              }
              if (msg.kind === 'ai') return (
                <AIPatternMessage key={msg.id} pattern={(msg as AIMsg).pattern} userText={(msg as AIMsg).userText} />
              );
              return null;
            })}
            <div />
          </div>

          {/* Input */}
          <div style={{ padding: '8px 12px 12px', flexShrink: 0, borderTop: '1px solid var(--ai-divider)' }}>
            <AIInputCard inputValue={inputValue} onInputChange={setInputValue} onSend={handleSend} hasMessages={true} />
          </div>
        </div>

        {/* ── Right output pane (or restore button) ── */}
        {showOutputPane
          ? <RightOutputPane outputStatus={outputStatus} outputType={outputType} workflowStep={workflowStep} onHide={() => setShowOutputPane(false)} />
          : <div style={{ width: '40px', flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12px', background: 'var(--surface-color-1)', borderLeft: '1px solid var(--ai-divider)' }}>
              <button onClick={() => setShowOutputPane(true)} title="Show output pane"
                style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`, borderRadius: '6px', cursor: 'pointer', color: AI.color.action.primary }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            </div>
        }
      </div>
    </div>
  );
}

export default AICommandCenterSplitView;
