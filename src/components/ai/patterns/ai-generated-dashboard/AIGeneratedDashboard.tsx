import React, { useState } from 'react';
import { RiArrowLeftSLine, RiArrowDownSLine, RiSparklingLine, RiPulseLine, RiArrowRightUpLine, RiAlertLine, RiShieldCheckLine, RiCompassLine, RiStackLine, RiSendPlaneLine, RiMessage3Line, RiFlashlightLine, RiEyeLine } from '@remixicon/react'
import { RiBarChart2Line, RiOrganizationChart } from '@remixicon/react'
import { RiFileEditLine, RiMapPinLine, RiGitCommitLine, RiBrainLine, RiPushpin2Line } from '@remixicon/react';
import { F, DS, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIMessageHeader } from '../../atomic/ai-message-header/AIMessageHeader';
import { AIButton } from '../../atomic/ai-button/AIButton';

// ── Types ─────────────────────────────────────────────────────────────────────
export type DashboardStatus =
  | 'draft' | 'active' | 'generating' | 'updating'
  | 'needsApproval' | 'submitted' | 'published' | 'error';

export interface AIGeneratedDashboardProps {
  title?:        string;
  status?:       DashboardStatus;
  outputType?:   string;
  confidence?:   number;
  impactScore?:  number;
  mode?:         'draft' | 'live';
  showHeader?:   boolean;
  variant?:      'standalone' | 'embedded';
  criticalMode?: boolean;     // highlights critical scenario
  mapFocused?:   boolean;     // promotes map module
  onSubmit?:        () => void;
  onToggleDraft?:   () => void;
  onViewRationale?: () => void;
  onViewSources?:   () => void;
  onViewTrace?:     () => void;
  onPromptSelect?:  (prompt: string) => void;
}

// ── Status badge meta ─────────────────────────────────────────────────────────
const STATUS_META: Record<DashboardStatus, { label: string; color: string; bg: string; border: string }> = {
  active:        { label: 'Active',          color: 'var(--ai-status-success-text)', bg: 'var(--ai-status-success-bg)', border: 'var(--ai-status-success-border)' },
  draft:         { label: 'Draft',           color: DS.textHelper,                  bg: 'var(--ai-track-bg)',          border: 'var(--ai-card-border)' },
  generating:    { label: 'Generating',      color: AI.color.action.primary,         bg: AI.color.brandSurface,         border: AI.color.brandBorder },
  updating:      { label: 'Updating',        color: AI.color.action.primary,         bg: AI.color.brandSurface,         border: AI.color.brandBorder },
  needsApproval: { label: 'Needs approval',  color: 'var(--ai-signal-strong)',       bg: 'var(--ai-signal-subtle)',     border: 'var(--ai-signal-border)' },
  submitted:     { label: 'Submitted',       color: 'var(--ai-status-info-text)',    bg: 'var(--ai-status-info-bg)',    border: 'var(--ai-status-info-border)' },
  published:     { label: 'Published',       color: 'var(--ai-status-success-text)', bg: 'var(--ai-status-success-bg)', border: 'var(--ai-status-success-border)' },
  error:         { label: 'Error',           color: 'var(--ai-status-error-text)',   bg: 'var(--ai-status-error-bg)',   border: 'var(--ai-status-error-border)' },
};

// ── Module shell ──────────────────────────────────────────────────────────────
function Module({ title, eyebrow, right, accent, children }: {
  title?:   string;
  eyebrow?: string;
  right?:   React.ReactNode;
  accent?:  'brand' | 'neutral' | 'signal' | 'companion';
  children: React.ReactNode;
}) {
  const bg     = accent === 'brand' ? AI.color.brandSurface
               : accent === 'signal' ? AI.color.signal.surface
               : accent === 'companion' ? AI.color.companion.paper
               : 'var(--ai-card-bg)';
  const border = accent === 'brand' ? AI.color.brandBorder
               : accent === 'signal' ? 'var(--ai-signal-border)'
               : accent === 'companion' ? AI.color.companion.border
               : 'var(--ai-card-border)';
  return (
    <section
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: AI.radius.md,
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: '12px',
        boxSizing: 'border-box',
      }}
    >
      {(title || right) && (
        <header style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
            {eyebrow && (
              <span style={{
                fontFamily: F, ...AI_TYPOGRAPHY['@ai-overline'],
                textTransform: 'uppercase', color: 'var(--ai-ds-helper)',
              }}>{eyebrow}</span>
            )}
            {title && (
              <h3 style={{
                margin: 0, fontFamily: F, fontSize: '14px', fontWeight: 600,
                color: 'var(--ai-ds-text)', letterSpacing: '-0.1px',
              }}>{title}</h3>
            )}
          </div>
          {right}
        </header>
      )}
      {children}
    </section>
  );
}

// ── Metric pill ───────────────────────────────────────────────────────────────
function MetricPill({ label, value, tone = 'neutral' }: {
  label: string; value: string; tone?: 'neutral' | 'brand' | 'success' | 'signal';
}) {
  const palette = tone === 'brand'
    ? { color: AI.color.action.primary,         bg: AI.color.brandSurface,             border: AI.color.brandBorder }
    : tone === 'success'
    ? { color: 'var(--ai-status-success-text)', bg: 'var(--ai-status-success-bg)',     border: 'var(--ai-status-success-border)' }
    : tone === 'signal'
    ? { color: 'var(--ai-signal-strong)',       bg: 'var(--ai-signal-subtle)',         border: 'var(--ai-signal-border)' }
    : { color: DS.textHelper,                  bg: 'var(--ai-track-bg)',              border: 'var(--ai-card-border)' };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'baseline', gap: '6px',
      padding: '4px 10px', borderRadius: AI.radius.full,
      background: palette.bg, border: `1px solid ${palette.border}`,
      fontFamily: F, whiteSpace: 'nowrap',
    }}>
      <span style={{ ...AI_TYPOGRAPHY['@ai-overline'], color: DS.textHelper }}>{label}</span>
      <span style={{ ...AI_TYPOGRAPHY['@ai-h6'], color: palette.color }}>{value}</span>
    </div>
  );
}

// ── Ghost link ────────────────────────────────────────────────────────────────
function GhostLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: F, fontSize: '12px', fontWeight: 600,
        color: hov ? AI.color.action.primaryActive : AI.color.action.primary,
        textDecoration: hov ? 'underline' : 'none', transition: 'color 0.12s',
      }}
    >
      {children}
    </button>
  );
}

// ── 1. Output header ──────────────────────────────────────────────────────────
function OutputHeader({
  title, status, outputType, confidence, impactScore, draftMode,
  onToggleDraft, onSubmit, onViewRationale, embedded,
}: {
  title: string;
  status: DashboardStatus;
  outputType: string;
  confidence: number;
  impactScore: number;
  draftMode: boolean;
  embedded: boolean;
  onToggleDraft?: () => void;
  onSubmit?: () => void;
  onViewRationale?: () => void;
}) {
  const sm  = STATUS_META[status];
  const [submitHov, setSubmitHov] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
      padding: embedded ? '4px 0 12px' : '4px 0 16px',
      borderBottom: '1px solid var(--ai-divider)',
    }}>
      {!embedded && (
        <button aria-label="Back" style={{
          width: 30, height: 30, borderRadius: AI.radius.sm,
          border: '1px solid var(--ai-card-border)', background: 'var(--ai-card-bg)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: DS.iconDefault, cursor: 'pointer', flexShrink: 0,
        }}>
          <RiArrowLeftSLine size={16} strokeWidth={2} />
        </button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h2 style={{
            margin: 0, fontFamily: F, fontSize: embedded ? '16px' : '20px',
            fontWeight: 600, color: 'var(--ai-ds-text)', letterSpacing: '-0.2px',
          }}>{title}</h2>
          <span aria-label={`Status: ${sm.label}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: F, fontSize: '12px', fontWeight: 600,
            color: sm.color, background: sm.bg, border: `1px solid ${sm.border}`,
            borderRadius: AI.radius.full, padding: '2px 10px',
          }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: sm.color }} />
            {sm.label}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: F, fontSize: '12px', fontWeight: 600,
            color: AI.color.action.primary, background: AI.color.brandSurface,
            border: `1px solid ${AI.color.brandBorder}`,
            borderRadius: AI.radius.full, padding: '2px 10px',
          }}>
            <RiMapPinLine size={11} strokeWidth={2.2} />
            {outputType}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <MetricPill label="Confidence"   value={`${confidence.toFixed(1)}%`}                          tone="success" />
          <MetricPill label="Impact score" value={`${impactScore >= 0 ? '+' : ''}${impactScore.toFixed(1)}%`} tone="brand" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <button
          aria-pressed={draftMode}
          onClick={onToggleDraft}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: AI.radius.sm,
            border: `1px solid ${draftMode ? 'var(--ai-signal-border)' : 'var(--ai-card-border)'}`,
            background: draftMode ? 'var(--ai-signal-subtle)' : 'var(--ai-card-bg)',
            color: draftMode ? 'var(--ai-signal-strong)' : DS.textDefault,
            fontFamily: F, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          <RiFileEditLine size={13} strokeWidth={2} />
          Draft mode
        </button>
        <div style={{ display: 'inline-flex', borderRadius: AI.radius.sm, overflow: 'hidden', boxShadow: `0 4px 14px ${AI.shadow.action.default}` }}>
          <button
            onClick={onSubmit}
            onMouseEnter={() => setSubmitHov(true)}
            onMouseLeave={() => setSubmitHov(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', border: 'none',
              background: submitHov ? AI.color.action.primaryHover : AI.color.action.primary,
              color: AI.color.text.onAction,
              fontFamily: F, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.12s',
            }}
          >
            <RiSendPlaneLine size={13} strokeWidth={2.2} />
            Submit
          </button>
          <button
            aria-label="More submit options"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '7px 10px', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.2)',
              background: AI.color.action.primaryActive, color: AI.color.text.onAction, cursor: 'pointer',
            }}
          >
            <RiArrowDownSLine size={13} strokeWidth={2.2} />
          </button>
        </div>
        {onViewRationale && (
          <GhostLink onClick={onViewRationale}>View rationale →</GhostLink>
        )}
      </div>
    </div>
  );
}

// ── 2. Current Focus module ───────────────────────────────────────────────────
function CurrentFocusModule({ prompt, why, onViewRationale }: {
  prompt: string; why: string; onViewRationale?: () => void;
}) {
  return (
    <section
      role="region" aria-label="Current focus"
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: AI.radius.lg,
        background: AI.gradient.surface.subtle,
        border: `1px solid ${AI.color.brandBorder}`,
        padding: '20px 22px',
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 95% 0%, rgba(101, 124, 236,0.18), transparent 55%)',
      }} />
      <header style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
        <RiCompassLine size={14} color={AI.color.action.primary} strokeWidth={2.2} />
        <span style={{
          fontFamily: F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: AI.color.action.primaryActive,
        }}>Current focus</span>
      </header>
      <blockquote style={{
        margin: 0, padding: '0 0 0 14px',
        borderLeft: `3px solid ${AI.color.action.primary}`,
        fontFamily: F, fontSize: '15px', fontWeight: 600, lineHeight: 1.5,
        color: AI.color.brandStrong, position: 'relative',
      }}>
        “{prompt}”
      </blockquote>
      <div style={{ position: 'relative' }}>
        <span style={{
          fontFamily: F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--ai-ds-helper)',
        }}>Why this matters</span>
        <p style={{
          margin: '4px 0 0', fontFamily: F, fontSize: '13px',
          color: 'var(--ai-ds-text)', lineHeight: 1.55,
        }}>{why}</p>
      </div>
      {onViewRationale && (
        <div style={{ position: 'relative' }}>
          <GhostLink onClick={onViewRationale}>View rationale</GhostLink>
        </div>
      )}
    </section>
  );
}

// ── 3. Intelligence Evolution ─────────────────────────────────────────────────
function IntelligenceEvolutionModule() {
  const rows = [
    { label: 'Scenario accuracy', value: '+4.2%',       icon: RiArrowRightUpLine, tone: 'success' as const, hint: 'last 30d' },
    { label: 'Drift detection',   value: 'Stable (4w)', icon: RiShieldCheckLine, tone: 'info'    as const, hint: 'no anomalies' },
    { label: 'Confidence level',  value: 'Trending up', icon: RiBarChart2Line,  tone: 'brand'   as const, hint: '+1.8 pts' },
  ];
  const toneColor: Record<string, string> = {
    success: 'var(--ai-status-success-text)',
    info:    'var(--ai-status-info-text)',
    brand:   AI.color.action.primary,
  };
  return (
    <Module title="Intelligence evolution" eyebrow="System health" accent="neutral">
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
        {rows.map((row, idx) => {
          const Icon = row.icon;
          return (
            <li key={row.label} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0',
              borderTop: idx === 0 ? 'none' : '1px solid var(--ai-divider)',
            }}>
              <span aria-hidden="true" style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--ai-track-bg)', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: toneColor[row.tone],
              }}>
                <Icon size={14} strokeWidth={2} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: F, fontSize: '13px', color: 'var(--ai-ds-text)', fontWeight: 600 }}>{row.label}</div>
                <div style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper }}>{row.hint}</div>
              </div>
              <span style={{
                fontFamily: F, fontSize: '13px', fontWeight: 600,
                color: toneColor[row.tone],
              }}>{row.value}</span>
            </li>
          );
        })}
      </ul>
    </Module>
  );
}

// ── 4. Agent Analysis ─────────────────────────────────────────────────────────
function AgentAnalysisModule({ onViewRationale, onViewSources, onViewTrace }: {
  onViewRationale?: () => void; onViewSources?: () => void; onViewTrace?: () => void;
}) {
  const drivers = [
    { label: 'Population density',  weight: 35, impact: 'High',   tone: 'success' as const },
    { label: 'Account clustering',  weight: 25, impact: 'Medium', tone: 'info'    as const },
    { label: 'Travel infrastructure', weight: 20, impact: 'High', tone: 'success' as const },
  ];
  const toneColor: Record<string, string> = {
    success: 'var(--ai-status-success-text)',
    info:    'var(--ai-status-info-text)',
  };
  return (
    <Module accent="neutral">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <AIMessageHeader agentLabel="Guild · Reasoning & analysis" timestamp="Live" />
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '2px 8px', borderRadius: AI.radius.full,
          background: 'var(--ai-status-success-bg)', border: '1px solid var(--ai-status-success-border)',
          color: 'var(--ai-status-success-text)', fontFamily: F, fontSize: '12px', fontWeight: 600,
        }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ai-status-success-text)' }} />
          Live
        </span>
      </div>

      <div>
        <span style={{
          fontFamily: F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--ai-ds-helper)',
        }}>AI summary</span>
        <p style={{
          margin: '4px 0 0', fontFamily: F, fontSize: '13px', lineHeight: 1.55,
          color: 'var(--ai-ds-text)',
        }}>
          Scaling the cardiovascular sales force by 15% in high-growth metro clusters.
          The proposed Boston cluster re-alignment prioritizes travel-time efficiency over
          account count variance — influenced by the current fuel-cost index and rep feedback
          from the Q1 audit.
        </p>
      </div>

      <div>
        <span style={{
          fontFamily: F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--ai-ds-helper)',
        }}>Optimization drivers</span>
        <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {drivers.map(d => (
            <li key={d.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: F, fontSize: '12px', color: 'var(--ai-ds-text)', flex: 1 }}>{d.label}</span>
                <span style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper }}>{d.weight}%</span>
                <span style={{
                  fontFamily: F, fontSize: '12px', fontWeight: 600,
                  padding: '1px 7px', borderRadius: AI.radius.full,
                  color: toneColor[d.tone],
                  background: d.tone === 'success' ? 'var(--ai-status-success-bg)' : 'var(--ai-status-info-bg)',
                  border: `1px solid ${d.tone === 'success' ? 'var(--ai-status-success-border)' : 'var(--ai-status-info-border)'}`,
                }}>{d.impact}</span>
              </div>
              <div role="progressbar" aria-valuenow={d.weight} aria-valuemin={0} aria-valuemax={100} style={{
                height: 6, borderRadius: 3, background: 'var(--ai-track-bg)', overflow: 'hidden',
              }}>
                <div style={{
                  width: `${d.weight * 2.4}%`, maxWidth: '100%', height: '100%',
                  background: AI.gradient.action.full,
                }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer style={{
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        paddingTop: 10, borderTop: '1px solid var(--ai-divider)',
      }}>
        <span style={{ fontFamily: F, fontSize: '12px', color: 'var(--ai-ds-helper)' }}>
          Guild Analytics · Updated just now
        </span>
        <div style={{ flex: 1 }} />
        {onViewRationale && <GhostLink onClick={onViewRationale}>Why this?</GhostLink>}
        {onViewSources   && <><span style={{ color: 'var(--ai-ds-helper)', fontFamily: F, fontSize: '12px' }}>·</span><GhostLink onClick={onViewSources}>Sources</GhostLink></>}
        {onViewTrace     && <><span style={{ color: 'var(--ai-ds-helper)', fontFamily: F, fontSize: '12px' }}>·</span><GhostLink onClick={onViewTrace}>Process trace</GhostLink></>}
      </footer>
    </Module>
  );
}

// ── 5. Scenario cards ─────────────────────────────────────────────────────────
type ScenarioCard = {
  title: string;
  description: string;
  badges: { label: string; tone: 'neutral' | 'critical' | 'active' | 'map' }[];
  accounts: string;
  territories: string;
  variance: string;
  health: number;
  owner: string;
  updated: string;
  critical?: boolean;
};

function ScenarioCardsModule({ critical }: { critical?: boolean }) {
  const scenarios: ScenarioCard[] = [
    {
      title: 'Immunology launch readiness',
      description: 'Designing the initial territory structure for the upcoming biologics portfolio.',
      badges: [{ label: 'Roster', tone: 'neutral' }, { label: 'Critical', tone: 'critical' }],
      accounts: '0.8k', territories: '24', variance: '12.5%', health: 45,
      owner: 'ZA', updated: '5m ago', critical: true,
    },
    {
      title: 'Newark territory health review',
      description: 'Investigating workload pressure in the Newark territory following recent zip code reassignment.',
      badges: [{ label: 'RiMapLine', tone: 'map' }, { label: 'Active', tone: 'active' }],
      accounts: '2.6k', territories: '18', variance: '15.3%', health: 35,
      owner: 'JR', updated: '2h ago',
    },
  ];

  const badgeStyle = (tone: ScenarioCard['badges'][number]['tone']) => {
    if (tone === 'critical') return { color: 'var(--ai-signal-strong)', bg: 'var(--ai-signal-subtle)', border: 'var(--ai-signal-border)' };
    if (tone === 'active')   return { color: 'var(--ai-status-success-text)', bg: 'var(--ai-status-success-bg)', border: 'var(--ai-status-success-border)' };
    if (tone === 'map')      return { color: AI.color.action.primary, bg: AI.color.brandSurface, border: AI.color.brandBorder };
    return { color: DS.textHelper, bg: 'var(--ai-track-bg)', border: 'var(--ai-card-border)' };
  };

  return (
    <Module title="Generated scenarios" eyebrow="Alternatives & projects" accent="neutral">
      <div style={{
        display: 'grid', gap: 12,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      }}>
        {scenarios.map(s => {
          const isCritical = critical && s.critical;
          return (
            <article key={s.title} style={{
              background: 'var(--ai-card-bg)',
              border: `1px solid ${isCritical ? 'var(--ai-signal-border)' : 'var(--ai-card-border)'}`,
              borderRadius: AI.radius.md,
              padding: '14px 14px 12px',
              display: 'flex', flexDirection: 'column', gap: 10,
              outline: isCritical ? `2px solid var(--ai-signal-border)` : 'none',
              outlineOffset: '-1px',
            }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {s.badges.map(b => {
                  const bs = badgeStyle(b.tone);
                  return (
                    <span key={b.label} style={{
                      fontFamily: F, fontSize: '12px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: AI.radius.full,
                      color: bs.color, background: bs.bg, border: `1px solid ${bs.border}`,
                    }}>{b.label}</span>
                  );
                })}
              </div>
              <h4 style={{
                margin: 0, fontFamily: F, fontSize: '14px', fontWeight: 600,
                color: 'var(--ai-ds-text)', letterSpacing: '-0.1px',
              }}>{s.title}</h4>
              <p style={{
                margin: 0, fontFamily: F, fontSize: '12px', lineHeight: 1.5,
                color: DS.textHelper,
              }}>{s.description}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <MetricPill label="Accounts"    value={s.accounts}    />
                <MetricPill label="Territories" value={s.territories} />
                <MetricPill label="Variance"    value={s.variance}    tone="signal" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontFamily: F, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: DS.textHelper, fontWeight: 700 }}>Project health</span>
                  <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 700, color: 'var(--ai-ds-text)' }}>{s.health}%</span>
                </div>
                <div role="progressbar" aria-valuenow={s.health} aria-valuemin={0} aria-valuemax={100} style={{ height: 6, borderRadius: 3, background: 'var(--ai-track-bg)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${s.health}%`, height: '100%',
                    background: s.health < 50 ? 'var(--ai-signal-strong)' : AI.gradient.action.full,
                  }} />
                </div>
              </div>
              <footer style={{
                display: 'flex', alignItems: 'center', gap: 8,
                paddingTop: 8, borderTop: '1px solid var(--ai-divider)',
              }}>
                <span aria-hidden="true" style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: F, fontSize: '12px', fontWeight: 700,
                  color: AI.color.action.primaryActive,
                }}>{s.owner}</span>
                <span style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper, flex: 1 }}>{s.updated}</span>
                {isCritical && (
                  <button style={{
                    fontFamily: F, fontSize: '12px', fontWeight: 600,
                    color: 'var(--ai-signal-strong)', background: 'var(--ai-signal-subtle)',
                    border: '1px solid var(--ai-signal-border)', borderRadius: AI.radius.sm,
                    padding: '3px 10px', cursor: 'pointer',
                  }}>Escalate</button>
                )}
              </footer>
            </article>
          );
        })}
      </div>
    </Module>
  );
}

// ── 6. Impact & RiPulseLine ──────────────────────────────────────────────────────
function ImpactActivityModule() {
  const impact = [
    { eyebrow: 'Impact snapshot',     headline: '12 decisions',     sub: 'influenced this week', icon: RiFlashlightLine,          tone: 'brand' as const },
    { eyebrow: 'Variance control',    headline: '-6.4% avg',         sub: 'variance reduction',   icon: RiArrowRightUpLine,   tone: 'success' as const },
    { eyebrow: 'Risk avoidance',      headline: '1 high-risk move', sub: 'prevented',            icon: RiShieldCheckLine,  tone: 'signal' as const },
    { eyebrow: 'Confidence trend',    headline: 'Stable growth',    sub: '3-month outlook',      icon: RiBarChart2Line,    tone: 'brand' as const },
  ];
  const thresholds = [
    { label: 'Variance > 15%',         status: 'Active',     tone: 'signal'  as const },
    { label: 'Vacancy > 3 per region', status: 'Monitoring', tone: 'warning' as const },
    { label: 'Travel > 2h / day',      status: 'Clear',      tone: 'success' as const },
  ];
  const thresholdMeta: Record<string, { color: string; bg: string; border: string }> = {
    signal:  { color: 'var(--ai-signal-strong)',       bg: 'var(--ai-signal-subtle)',      border: 'var(--ai-signal-border)' },
    warning: { color: 'var(--ai-status-warning-text)', bg: 'var(--ai-status-warning-bg)',  border: 'var(--ai-status-warning-border)' },
    success: { color: 'var(--ai-status-success-text)', bg: 'var(--ai-status-success-bg)',  border: 'var(--ai-status-success-border)' },
  };
  const tonePalette: Record<string, string> = {
    brand:   AI.color.action.primary,
    success: 'var(--ai-status-success-text)',
    signal:  'var(--ai-signal-strong)',
  };

  return (
    <Module title="Impact & activity" eyebrow="Dashboard intelligence" accent="neutral">
      <div style={{
        display: 'grid', gap: 10,
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      }}>
        {impact.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.eyebrow} style={{
              background: 'var(--ai-card-bg-raised)',
              border: '1px solid var(--ai-card-border)',
              borderRadius: AI.radius.sm, padding: '10px 12px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: F, fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--ai-ds-helper)',
              }}>
                <Icon size={11} strokeWidth={2} color={tonePalette[m.tone]} />
                {m.eyebrow}
              </span>
              <span style={{ fontFamily: F, fontSize: '15px', fontWeight: 700, color: tonePalette[m.tone], lineHeight: 1.1 }}>
                {m.headline}
              </span>
              <span style={{ fontFamily: F, fontSize: '12px', color: DS.textHelper }}>{m.sub}</span>
            </div>
          );
        })}
      </div>

      <div style={{
        background: 'var(--ai-card-bg-raised)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: AI.radius.sm, padding: '12px 14px',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <RiPulseLine size={12} strokeWidth={2} color={AI.color.action.primary} />
          <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ai-ds-helper)' }}>
            System activity coherence
          </span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: F, fontSize: '12px', color: 'var(--ai-ds-text)' }}>
          <li><strong style={{ color: DS.textHelper, fontWeight: 600 }}>Active signals:</strong> 12 territory alerts</li>
          <li><strong style={{ color: DS.textHelper, fontWeight: 600 }}>Influenced by:</strong> Capability — Workload Index</li>
          <li><strong style={{ color: DS.textHelper, fontWeight: 600 }}>Agents engaged:</strong> Scenario Strategist, Guild</li>
          <li><strong style={{ color: DS.textHelper, fontWeight: 600 }}>Related flows:</strong> Northeast Monitoring</li>
        </ul>
      </div>

      <div>
        <span style={{ fontFamily: F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ai-ds-helper)' }}>
          Escalation thresholds
        </span>
        <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {thresholds.map(t => {
            const m = thresholdMeta[t.tone];
            return (
              <li key={t.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 10px', borderRadius: AI.radius.sm,
                background: m.bg, border: `1px solid ${m.border}`,
              }}>
                <RiAlertLine size={12} strokeWidth={2} color={m.color} />
                <span style={{ fontFamily: F, fontSize: '12px', color: 'var(--ai-ds-text)', flex: 1 }}>{t.label}</span>
                <span style={{
                  fontFamily: F, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase', color: m.color,
                }}>{t.status}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Module>
  );
}

// ── 7. Contextual Prompts ─────────────────────────────────────────────────────
function ContextualPromptsModule({ onPromptSelect }: { onPromptSelect?: (p: string) => void }) {
  const prompts = [
    { label: 'Simulate 5-zip shift scenario',    icon: RiOrganizationChart  },
    { label: 'Analyze travel time impact',       icon: RiPulseLine  },
    { label: 'Compare with Northeast model',     icon: RiStackLine    },
    { label: 'Show reasoning for Boston split',  icon: RiBrainLine     },
  ];
  return (
    <Module
      eyebrow="Contextual prompts"
      title="Refine this dashboard"
      accent="brand"
      right={
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '5px 11px', borderRadius: AI.radius.full,
          background: 'var(--ai-card-bg)', border: `1px solid ${AI.color.brandBorder}`,
          color: AI.color.action.primary, fontFamily: F, fontSize: '12px',
          fontWeight: 600, cursor: 'pointer',
        }}>
          <RiMessage3Line size={12} strokeWidth={2.2} />
          Talk
        </button>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: -4 }}>
        <AIMessageHeader agentLabel="Guild" timestamp="" size="sm" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {prompts.map(p => {
          const Icon = p.icon;
          return (
            <span key={p.label} onClick={() => onPromptSelect?.(p.label)} style={{ cursor: 'pointer' }}>
              <AIButton variant="secondary" size="sm" icon={<Icon />} label={p.label} />
            </span>
          );
        })}
      </div>
    </Module>
  );
}

// ── 8. RiMapLine / visual output ────────────────────────────────────────────────────
function MapOutputModule({ focused }: { focused?: boolean }) {
  const regions = [
    { name: 'North Jersey',   x: 64, y: 18, color: '#8E5CF6' },
    { name: 'Central Jersey', x: 52, y: 46, color: '#4D60E6' },
    { name: 'South Jersey',   x: 38, y: 78, color: '#27A6A4' },
  ];
  const pins = [
    { x: 60, y: 28, tone: 'signal'  as const, label: 'High pressure' },
    { x: 48, y: 50, tone: 'brand'   as const, label: 'Hotspot' },
    { x: 36, y: 72, tone: 'success' as const, label: 'Stable' },
  ];
  const pinColor: Record<string, string> = {
    signal:  'var(--ai-signal-strong)',
    brand:   AI.color.action.primary,
    success: 'var(--ai-status-success-text)',
  };
  return (
    <Module
      accent="neutral"
      eyebrow="Visual output"
      title="Alignment map"
      right={
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: AI.radius.full,
          background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`,
          color: AI.color.action.primary, fontFamily: F, fontSize: '12px', fontWeight: 600,
        }}>
          <RiMapPinLine size={11} strokeWidth={2.2} />
          Alignment map
        </span>
      }
    >
      {/* a11y summary */}
      <p style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        RiMapLine shows three New Jersey regions — North, Central, South. Three pins indicate one high-pressure zone, one hotspot, and one stable territory. Three zips are highlighted across the territories.
      </p>

      <div style={{
        position: 'relative',
        height: focused ? 360 : 280,
        borderRadius: AI.radius.md,
        background: 'linear-gradient(160deg, #EDF1FF 0%, #F6F2EB 65%, #EAF7F2 100%)',
        border: '1px solid var(--ai-card-border)',
        overflow: 'hidden',
      }}>
        {/* terrain shapes */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.55 }} aria-hidden="true">
          <path d="M10,18 Q40,5 78,22 Q90,40 80,55 Q60,68 35,55 Q15,45 10,18 Z" fill="rgba(101, 124, 236,0.18)" />
          <path d="M20,55 Q50,42 80,58 Q92,72 78,84 Q55,92 30,84 Q15,72 20,55 Z" fill="rgba(39,166,164,0.16)" />
          <path d="M28,70 Q55,60 78,72 Q88,82 76,90 Q55,96 32,92 Q22,84 28,70 Z" fill="rgba(236,114,0,0.10)" />
        </svg>

        {/* overlay chips */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          {['Density map', 'Territory zones'].map(label => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: AI.radius.full,
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)',
              border: '1px solid var(--ai-card-border)',
              fontFamily: F, fontSize: '12px', fontWeight: 600,
              color: 'var(--ai-ds-text)',
            }}>
              <RiEyeLine size={10} strokeWidth={2.2} color={AI.color.action.primary} />
              {label}
            </span>
          ))}
        </div>

        {/* region labels */}
        {regions.map(r => (
          <span key={r.name} style={{
            position: 'absolute',
            left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%, -50%)',
            fontFamily: F, fontSize: '12px', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: r.color, opacity: 0.85,
            padding: '2px 6px', borderRadius: AI.radius.full,
            background: 'rgba(255,255,255,0.55)',
          }}>{r.name}</span>
        ))}

        {/* pins */}
        {pins.map((p, i) => (
          <span key={i} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y + 6}%`,
            transform: 'translate(-50%, -100%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 22, height: 22, borderRadius: '50% 50% 50% 0',
            background: pinColor[p.tone], color: '#fff',
            transformOrigin: 'bottom left',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          }}>
            <RiPushpin2Line size={11} strokeWidth={2.2} style={{ transform: 'rotate(45deg)' }} />
          </span>
        ))}

        {/* legend */}
        <div style={{
          position: 'absolute', bottom: 10, left: 10,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
          border: '1px solid var(--ai-card-border)', borderRadius: AI.radius.sm,
          padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <span style={{ fontFamily: F, fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: DS.textHelper }}>Pressure</span>
          {pins.map(p => (
            <span key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: F, fontSize: '12px', color: 'var(--ai-ds-text)' }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: pinColor[p.tone] }} />
              {p.label}
            </span>
          ))}
        </div>

        {/* territory legend */}
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
          border: '1px solid var(--ai-card-border)', borderRadius: AI.radius.sm,
          padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <span style={{ fontFamily: F, fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: DS.textHelper }}>Territories</span>
          {regions.map(r => (
            <span key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: F, fontSize: '12px', color: 'var(--ai-ds-text)' }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, background: r.color }} />
              {r.name}
            </span>
          ))}
        </div>
      </div>

      <footer style={{
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        paddingTop: 6, fontFamily: F, fontSize: '12px', color: DS.textHelper,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <RiSparklingLine size={11} strokeWidth={2.2} color={AI.color.action.primary} />
          Analysis in 2.1s
        </span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: DS.textHelper, opacity: 0.5 }} />
        <span>Precomputed model active</span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: DS.textHelper, opacity: 0.5 }} />
        <span>3 pins · 2 zones · 3 territories · 3 zips</span>
      </footer>
    </Module>
  );
}

// ── Generating skeleton ───────────────────────────────────────────────────────
function GeneratingState() {
  return (
    <div role="status" aria-live="polite" style={{
      display: 'flex', flexDirection: 'column', gap: 14, padding: '8px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div data-sv-anim style={{
          width: 18, height: 18, borderRadius: '50%',
          border: `2.5px solid ${AI.color.action.primary}`,
          borderTopColor: 'transparent',
          animation: 'gd-spin 0.8s linear infinite',
        }} />
        <span style={{ fontFamily: F, fontSize: '13px', color: AI.color.action.primary, fontWeight: 600 }}>
          Generating dashboard…
        </span>
      </div>
      {[78, 62, 90, 50, 84, 70].map((w, i) => (
        <div key={i} data-sv-anim style={{
          height: i % 2 === 0 ? 64 : 36, borderRadius: AI.radius.sm,
          background: `${AI.color.action.primary}10`, width: `${w}%`,
          animation: `gd-pulse 1.6s ease-in-out ${i * 0.16}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ── Animation styles ──────────────────────────────────────────────────────────
function GDAnimStyles() {
  return (
    <style>{`
      @keyframes gd-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes gd-pulse   { 0%,100%{opacity:0.45} 50%{opacity:0.95} }
      @keyframes gd-reveal  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      @media (prefers-reduced-motion: reduce) {
        [data-gd-anim], [data-sv-anim] { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AIGeneratedDashboard({
  title         = 'Cardiology Expansion Q2',
  status        = 'active',
  outputType    = 'Alignment RiMapLine',
  confidence    = 92.4,
  impactScore   = 12.2,
  mode          = 'draft',
  showHeader    = true,
  variant       = 'standalone',
  criticalMode  = false,
  mapFocused    = false,
  onSubmit,
  onToggleDraft,
  onViewRationale,
  onViewSources,
  onViewTrace,
  onPromptSelect,
}: AIGeneratedDashboardProps) {
  const [draftMode, setDraftMode] = useState(mode === 'draft');
  const embedded = variant === 'embedded';

  const handleToggleDraft = () => {
    setDraftMode(v => !v);
    onToggleDraft?.();
  };

  if (status === 'generating') {
    return (
      <div role="region" aria-label="AI generated dashboard" style={{
        height: '100%', overflow: 'auto',
        background: embedded ? 'transparent' : 'var(--surface-color-1)',
        padding: embedded ? 0 : '24px',
      }}>
        <GDAnimStyles />
        {showHeader && (
          <OutputHeader
            title={title} status="generating" outputType={outputType}
            confidence={confidence} impactScore={impactScore}
            draftMode={draftMode} embedded={embedded}
          />
        )}
        <GeneratingState />
      </div>
    );
  }

  return (
    <div
      role="region" aria-label="AI generated dashboard"
      style={{
        height: '100%', overflowY: 'auto',
        background: embedded ? 'transparent' : 'var(--surface-color-1)',
        padding: embedded ? 0 : '24px',
        fontFamily: F,
      }}
    >
      <GDAnimStyles />

      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {showHeader && (
          <OutputHeader
            title={title} status={status} outputType={outputType}
            confidence={confidence} impactScore={impactScore}
            draftMode={draftMode} embedded={embedded}
            onToggleDraft={handleToggleDraft}
            onSubmit={onSubmit}
            onViewRationale={onViewRationale}
          />
        )}

        {status === 'updating' && (
          <div role="status" aria-live="polite" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: AI.radius.sm,
            background: AI.color.brandSurface, border: `1px solid ${AI.color.brandBorder}`,
            color: AI.color.action.primaryActive, fontFamily: F, fontSize: '12px',
          }}>
            <div data-gd-anim style={{
              width: 12, height: 12, borderRadius: '50%',
              border: `2px solid ${AI.color.action.primary}`, borderTopColor: 'transparent',
              animation: 'gd-spin 0.8s linear infinite',
            }} />
            Updating affected modules from your follow-up prompt…
          </div>
        )}

        <CurrentFocusModule
          prompt="Assess feasibility of moving 10 adjacent zips to balance the Boston cluster."
          why="Reduces travel time by 18% for the lead oncology rep without increasing vacancy risk."
          onViewRationale={onViewRationale}
        />

        {/* RiMapLine module — first when map-focused */}
        {mapFocused && <MapOutputModule focused />}

        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        }}>
          <AgentAnalysisModule
            onViewRationale={onViewRationale}
            onViewSources={onViewSources}
            onViewTrace={onViewTrace}
          />
          <IntelligenceEvolutionModule />
        </div>

        <ScenarioCardsModule critical={criticalMode} />

        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: mapFocused ? 'minmax(0, 1fr)' : 'minmax(0, 1.2fr) minmax(0, 1fr)',
        }}>
          <ImpactActivityModule />
          {!mapFocused && <ContextualPromptsModule onPromptSelect={onPromptSelect} />}
        </div>

        {/* RiMapLine module — last when not map-focused */}
        {!mapFocused && <MapOutputModule />}
        {mapFocused && <ContextualPromptsModule onPromptSelect={onPromptSelect} />}

        <footer style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          padding: '12px 4px 4px', borderTop: '1px solid var(--ai-divider)',
          fontFamily: F, fontSize: '12px', color: DS.textHelper,
        }}>
          <RiGitCommitLine size={12} strokeWidth={2} color={AI.color.action.primary} />
          <span>Version 1.4 · {status === 'submitted' ? 'Submitted' : draftMode ? 'Draft' : 'Live'} · Owner: Theo Mitchell</span>
          <div style={{ flex: 1 }} />
          <GhostLink onClick={onViewSources}>View sources</GhostLink>
          <span>·</span>
          <GhostLink onClick={onViewTrace}>Audit trail</GhostLink>
        </footer>
      </div>
    </div>
  );
}

export default AIGeneratedDashboard;
