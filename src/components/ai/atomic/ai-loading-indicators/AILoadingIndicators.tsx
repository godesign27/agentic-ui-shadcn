import React, { useState, useEffect } from 'react';
import { F, AI, ZSAI_TAN } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export type LoaderType = 'working' | 'thinking' | 'getting-info';

// Tier 3 component tokens — ai-loader.*
// ai-loader.indicator.color        → AI.color.action.primary
// ai-loader.indicator.color.track  → AI.color.surface.emphasis
// ai-loader.indicator.color.muted  → AI.color.border.strong
// ai-loader.label.color            → ZDS neutral (from ZDS namespace)
// ai-loader.border.radius          → AI.radius.sm
const T = {
  indicatorColor:      AI.color.action.primary,
  indicatorColorTrack: AI.color.surface.emphasis,
  indicatorColorMuted: AI.color.border.strong,
  chevronColor:        AI.color.border.strong,
  radiusPill:          AI.radius.sm,
} as const;

// ── Shared: step row ──────────────────────────────────────────────────────────
function ThinkStep({ label, state, details }: {
  label: string;
  state: 'done' | 'active' | 'pending';
  details: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDone   = state === 'done';
  const isActive = state === 'active';

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{ paddingTop: '3px', flexShrink: 0, width: 12, display: 'flex', justifyContent: 'center' }}>
        {isDone ? (
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ai-zds-icon)', marginTop: '2px' }} />
        ) : isActive ? (
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: T.indicatorColor }} />
        ) : (
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ai-track-bg)', marginTop: '2px' }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontSize: '13px', fontFamily: F, lineHeight: 1.45,
          color: isDone ? 'var(--ai-zds-helper)' : isActive ? 'var(--ai-zds-text)' : 'var(--ai-btn-disabled-text)',
          fontWeight: isActive ? 600 : 400,
          display: 'block',
        }}>
          {label}
        </span>
        <button onClick={() => setOpen(v => !v)} style={{
          display: 'inline-flex', alignItems: 'center', gap: '3px',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '1px 0', marginTop: '1px',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
            style={{ transition: 'transform 0.15s ease', transform: open ? 'rotate(90deg)' : 'none' }}>
            <path d="M3.5 2l3 3-3 3" stroke="var(--ai-zds-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: '12px', fontFamily: F, color: 'var(--ai-btn-disabled-text)', lineHeight: 1 }}>View details</span>
        </button>
        {open && (
          <div style={{
            marginTop: '6px', padding: '8px 10px',
            background: 'var(--ai-confidence-track)', borderRadius: '6px',
            fontSize: '12px', fontFamily: F, color: 'var(--ai-zds-helper)', lineHeight: 1.55,
          }}>
            {details}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Keyframes (injected once) ─────────────────────────────────────────────────
function LoadingStyles() {
  return (
    <style>{`
      @keyframes ai-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes ai-in {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes ai-pulse-text {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.45; }
      }
      @media (prefers-reduced-motion: reduce) {
        [data-ai-loader] { animation: none !important; }
      }
    `}</style>
  );
}

export type LoaderTheme = 'default' | 'tan';

const TAN_PILL = 'var(--ai-loading-pill-bg)';   // ZSAI_TAN['00'] @ 50%
const TAN_CARD = 'var(--ai-loading-card-bg)';   // ZSAI_TAN[10] @ 50%

// ── Level 1: Simple working — for quick/direct requests ───────────────────────
export function AIWorkingIndicator({ theme = 'default' }: { theme?: LoaderTheme }) {
  const pillBg = theme === 'tan' ? TAN_PILL : 'var(--ai-loading-pill-bg)';
  return (
    <>
      <LoadingStyles />
      <div data-ai-loader style={{ animation: 'ai-in 0.2s ease both', width: '100%' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 14px 9px 12px',
          background: pillBg,
          border: '1px solid var(--ai-card-border)',
          borderRadius: T.radiusPill,
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M3.5 2l3 3-3 3" stroke="var(--ai-zds-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span data-ai-loader style={{
            ...AI_TYPOGRAPHY['@zsai-status-label'], fontFamily: F, color: 'var(--ai-zds-helper)', flex: 1,
            animation: 'ai-pulse-text 1.6s ease-in-out infinite',
          }}>
            Working...
          </span>
          <div data-ai-loader style={{
            width: 14, height: 14, borderRadius: '50%',
            border: `1.5px solid ${T.indicatorColorTrack}`,
            borderTopColor: T.indicatorColor,
            borderRightColor: T.indicatorColor,
            animation: 'ai-spin 0.9s linear infinite',
            flexShrink: 0,
          }} />
        </div>
      </div>
    </>
  );
}

// ── Shared pill header — collapsed state matches Working pill exactly ─────────
function CollapsedPill({ label, pillBg = 'white', onToggle }: {
  label: string;
  pillBg?: string;
  onToggle: () => void;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '9px 14px 9px 12px',
      background: pillBg,
      border: '1px solid var(--ai-card-border)',
      borderRadius: T.radiusPill,
      width: '100%', boxSizing: 'border-box',
      cursor: 'pointer',
    }} onClick={onToggle} role="button" aria-label={`Expand ${label}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M3.5 2l3 3-3 3" stroke="var(--ai-zds-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span data-ai-loader style={{
        fontSize: '12px', fontFamily: F, color: 'var(--ai-zds-helper)', lineHeight: 1, flex: 1,
        animation: 'ai-pulse-text 1.6s ease-in-out infinite',
      }}>
        {label}
      </span>
      <div data-ai-loader style={{
        width: 14, height: 14, borderRadius: '50%',
        border: `1.5px solid ${T.indicatorColorTrack}`,
        borderTopColor: T.indicatorColor,
        borderRightColor: T.indicatorColor,
        animation: 'ai-spin 0.9s linear infinite',
        flexShrink: 0,
      }} />
    </div>
  );
}

// ── Shared expanded card header row ───────────────────────────────────────────
function ExpandedHeader({ label, cardBg = 'var(--ai-loading-card-bg)', onToggle }: {
  label: string;
  cardBg?: string;
  onToggle: () => void;
}) {
  return (
    <button onClick={onToggle} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: '6px',
      padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
        style={{ flexShrink: 0, transition: 'transform 0.18s ease' }}>
        <path d="M2 4.5l4 4 4-4" stroke={T.chevronColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span data-ai-loader style={{
        fontSize: '13px', fontFamily: F, color: 'var(--ai-btn-disabled-text)', lineHeight: 1, flex: 1,
        animation: 'ai-pulse-text 1.6s ease-in-out infinite',
      }}>
        {label}
      </span>
      <div data-ai-loader style={{
        width: 12, height: 12, borderRadius: '50%',
        border: `1.5px solid ${T.indicatorColorTrack}`,
        borderTopColor: T.indicatorColor,
        borderRightColor: T.indicatorColor,
        animation: 'ai-spin 0.9s linear infinite',
        flexShrink: 0,
      }} />
    </button>
  );
}

// ── Level 2: Thinking — for complex multi-step requests ───────────────────────
export function AIThinkingIndicator({ theme = 'default' }: { theme?: LoaderTheme }) {
  const [step, setStep]           = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const pillBg = theme === 'tan' ? TAN_PILL : 'var(--ai-loading-pill-bg)';
  const cardBg = theme === 'tan' ? TAN_CARD : 'var(--ai-loading-card-bg)';

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 900);
    return () => clearTimeout(t);
  }, []);

  const STEPS = [
    { label: 'Retrieving data from documents', details: 'Searched ZAIDYN Analytics, Q1 alignment dataset, and territory records. Found 14 relevant data points across 3 sources.' },
    { label: 'Thinking', details: 'Analyzing retrieved data for patterns, outliers, and actionable insights relevant to your query.' },
  ];

  return (
    <>
      <LoadingStyles />
      <div data-ai-loader style={{ animation: 'ai-in 0.2s ease both', width: '100%' }}>
        {collapsed ? (
          <CollapsedPill label="Thinking..." pillBg={pillBg} onToggle={() => setCollapsed(false)} />
        ) : (
          <div style={{ background: cardBg, borderRadius: AI.radius.md, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
            <ExpandedHeader label="Thinking..." onToggle={() => setCollapsed(true)} />
            <div style={{ padding: '2px 14px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {STEPS.map((s, i) => (
                <ThinkStep key={i} label={s.label} state={i < step ? 'done' : i === step ? 'active' : 'pending'} details={s.details} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Level 3: Getting info — for complex + data fetch requests ─────────────────
export function AIGettingInfoIndicator({ theme = 'default' }: { theme?: LoaderTheme }) {
  const [step, setStep]           = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const pillBg = theme === 'tan' ? TAN_PILL : 'var(--ai-loading-pill-bg)';
  const cardBg = theme === 'tan' ? TAN_CARD : 'var(--ai-loading-card-bg)';

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const STEPS = [
    { label: 'Retrieving data from documents', details: 'Searched ZAIDYN Analytics, territory alignment records, and historical performance data. Found 22 relevant entries.' },
    { label: 'Analyzing retrieved data', details: 'Cross-referencing Q1 performance metrics with territory assignments and quota attainment data.' },
    { label: 'Thinking', details: 'Synthesizing patterns from the analysis to generate a response tailored to your question.' },
  ];

  return (
    <>
      <LoadingStyles />
      <div data-ai-loader style={{ animation: 'ai-in 0.2s ease both', width: '100%' }}>
        {collapsed ? (
          <CollapsedPill label="Getting information..." pillBg={pillBg} onToggle={() => setCollapsed(false)} />
        ) : (
          <div style={{ background: cardBg, borderRadius: AI.radius.md, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
            <ExpandedHeader label="Getting information..." onToggle={() => setCollapsed(true)} />
            <div style={{ padding: '2px 14px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {STEPS.map((s, i) => (
                <ThinkStep key={i} label={s.label} state={i < step ? 'done' : i === step ? 'active' : 'pending'} details={s.details} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Level 3 (Tan): Getting info — companion surface / AI Assisted contexts ────
export function AIGettingInfoIndicatorTan() {
  const [step, setStep]           = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const tanPill     = 'var(--ai-loading-pill-bg)';  // was ZSAI_TAN['00'] #F6F2EB
  const tanCard     = 'var(--ai-loading-card-bg)';  // was ZSAI_TAN[10] #ECE6DD
  const tanDetail   = ZSAI_TAN[20]  as string;   // #F1E4D0

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const STEPS = [
    { label: 'Retrieving data from documents', details: 'Searched ZAIDYN Analytics, territory alignment records, and historical performance data. Found 22 relevant entries.' },
    { label: 'Analyzing retrieved data', details: 'Cross-referencing Q1 performance metrics with territory assignments and quota attainment data.' },
    { label: 'Thinking', details: 'Synthesizing patterns from the analysis to generate a response tailored to your question.' },
  ];

  return (
    <>
      <LoadingStyles />
      <div data-ai-loader style={{ animation: 'ai-in 0.2s ease both', width: '100%' }}>
        {collapsed ? (
          <CollapsedPill label="Getting information..." pillBg={tanPill} onToggle={() => setCollapsed(false)} />
        ) : (
          <div style={{ background: tanCard, borderRadius: AI.radius.md, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
            <ExpandedHeader label="Getting information..." cardBg={tanCard} onToggle={() => setCollapsed(true)} />
            <div style={{ padding: '2px 14px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {STEPS.map((s, i) => (
                <ThinkStep key={i} label={s.label} state={i < step ? 'done' : i === step ? 'active' : 'pending'} details={s.details} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
