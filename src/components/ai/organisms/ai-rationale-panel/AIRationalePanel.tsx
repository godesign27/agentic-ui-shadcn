import React, { useState } from 'react';
import { AI, ZDS, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

export interface RationaleSource {
  label: string;
  url?: string;
}

export interface AIRationalePanelProps {
  whatFound?:   string;
  whyMatters?:  string;
  considered?:  string[];
  assumptions?: string[];
  sources?:     RationaleSource[];
  defaultOpen?: boolean;
}

/** Demo rationale content for bare mounts / galleries. */
export const SAMPLE_RATIONALE = {
  whatFound:   'Three Mid-Atlantic territories show declining call frequency paired with rising competitive share.',
  whyMatters:  'Without rebalancing, Q3 reach is projected to drop ~9% in PA-07 and NJ-03.',
  considered:  [
    'Hiring net-new FTEs vs. reassigning existing coverage',
    'Prioritizing oncology Tier-1 accounts first',
    'Deferring rural territories until next cycle',
  ],
  assumptions: [
    'CRM call notes are current through last Friday',
    'No major formulary changes in the next 60 days',
  ],
  sources: [
    { label: 'CRM engagement extract (Q2)' },
    { label: 'Competitive launch tracker' },
  ] as RationaleSource[],
  defaultOpen: true,
};

// ── Remix-style inline SVG icons ─────────────────────────────────────────────

function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function IconLightbulb() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 1.6-.85 3-2.1 3.8V11a.75.75 0 0 1-.75.75h-3.3A.75.75 0 0 1 5.65 11V9.8C4.35 9 3.5 7.6 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M6 12.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M6.5 14h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function IconScales() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 1.5v11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M5.5 13.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M2 4.5L8 3l6 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1 6l1.5 3.5a1.5 1.5 0 0 0 3 0L7 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6l1.5 3.5a1.5 1.5 0 0 0 3 0L15 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconPaperclip() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M13 7.5L7.5 13a3.5 3.5 0 0 1-5-5l6-6a2 2 0 0 1 2.83 2.83l-5.66 5.66a.75.75 0 0 1-1.06-1.06L10 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M1 5h7M5.5 2L8.5 5 5.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function AIRationalePanel({
  whatFound    = SAMPLE_RATIONALE.whatFound,
  whyMatters   = SAMPLE_RATIONALE.whyMatters,
  considered   = SAMPLE_RATIONALE.considered,
  assumptions  = SAMPLE_RATIONALE.assumptions,
  sources      = SAMPLE_RATIONALE.sources,
  defaultOpen  = SAMPLE_RATIONALE.defaultOpen,
}: AIRationalePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      width: '100%',
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: F,
    }}>
      {/* ── Outer toggle ──────────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Why this decision?"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          background: 'var(--ai-card-bg-raised)',
          border: 'none',
          borderBottom: open ? '1px solid var(--ai-card-border)' : 'none',
          cursor: 'pointer', fontFamily: F,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: AI.color.brand }}>
          <IconInfo />
          <span style={{ fontSize: 14, fontFamily: F, color: 'var(--ai-zds-text)' }}>Why this decision?</span>
        </div>
        <span style={{ color: 'var(--ai-zds-helper)' }}>
          <IconChevron open={open} />
        </span>
      </button>

      {/* ── Expanded narrative — single flat view ─────────────────────────────── */}
      {open && (
        <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* What I found */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: 'var(--ai-zds-text)' }}>
              <IconSearch />
              <span style={{ ...AI_TYPOGRAPHY['@zsai-panel-section-head'], fontFamily: F, color: 'var(--ai-zds-text)' }}>What I found</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, fontFamily: F, color: 'var(--ai-zds-text)', lineHeight: 1.65 }}>
              {whatFound}
            </p>
          </div>

          <div style={{ height: 1, background: AI.color.border.default }} />

          {/* Why it matters */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: AI.color.brand }}>
              <IconLightbulb />
              <span style={{ ...AI_TYPOGRAPHY['@zsai-panel-section-head'], fontFamily: F, color: 'var(--ai-zds-text)' }}>Why it matters</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, fontFamily: F, color: AI.color.brand, lineHeight: 1.65 }}>
              {whyMatters}
            </p>
          </div>

          {considered.length > 0 && (
            <>
              <div style={{ height: 1, background: AI.color.border.default }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: 'var(--ai-zds-text)' }}>
                  <IconScales />
                  <span style={{ ...AI_TYPOGRAPHY['@zsai-panel-section-head'], fontFamily: F, color: 'var(--ai-zds-text)' }}>What I considered</span>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {considered.map((item, i) => (
                    <li key={i} style={{ fontSize: 12, fontFamily: F, color: AI.color.brand, lineHeight: 1.6 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {(assumptions.length > 0 || sources.length > 0) && (
            <>
              <div style={{ height: 1, background: AI.color.border.default }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: 'var(--ai-zds-text)' }}>
                  <IconPaperclip />
                  <span style={{ ...AI_TYPOGRAPHY['@zsai-panel-section-head'], fontFamily: F, color: 'var(--ai-zds-text)' }}>Assumptions + Sources</span>
                </div>

                {assumptions.length > 0 && (
                  <div style={{ marginBottom: sources.length > 0 ? 10 : 0 }}>
                    <div style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: 'var(--ai-zds-helper)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                      Assumptions
                    </div>
                    <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {assumptions.map((a, i) => (
                        <li key={i} style={{ fontSize: 12, fontFamily: F, color: 'var(--ai-zds-text)', lineHeight: 1.55 }}>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sources.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: 'var(--ai-zds-helper)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                      Sources
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {sources.map((src, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: AI.color.brand }}>
                          <IconArrow />
                          {src.url
                            ? <a href={src.url} style={{ fontSize: 12, fontFamily: F, color: AI.color.brand, textDecoration: 'none' }}>{src.label}</a>
                            : <span style={{ fontSize: 12, fontFamily: F, color: AI.color.brand }}>{src.label}</span>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default AIRationalePanel;
