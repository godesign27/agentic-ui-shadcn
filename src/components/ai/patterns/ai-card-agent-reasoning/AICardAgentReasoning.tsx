/**
 * AICardAgentReasoning — Guild Agentic AI Group
 *
 * Reasoning & analysis card for an AI agent. Surfaces the agent's
 * identity, a structured AI Summary panel, optional Optimization
 * Drivers panel, an Explainability toggle, and a primary "Deepen
 * Analysis" action.
 *
 * One component, density-driven via the `density` prop:
 *   basic   — header + AI Summary + footer (Explainability + Deepen)
 *   simple  — adds the Optimization Drivers panel below AI Summary
 *
 * Brand: AI emphasis via AI.color.brand (#4D60E6). The card surface
 * uses the subtle brand-tinted gradient from AI tokens so the card
 * reads as "AI-led content" without competing with the white inner
 * panels that hold the actual reasoning content.
 */

import React, { useState } from 'react';
import { RiRefreshLine } from '@remixicon/react';
import { AI, F } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AIToggle } from '../../atomic/ai-toggle/AIToggle';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AICardAgentReasoningDensity = 'basic' | 'simple';

export type DriverIntensity = 'low' | 'medium' | 'high';

export interface AICardAgentReasoningDriver {
  label:     string;
  weight:    number;             // 0–100 contribution percentage
  intensity: DriverIntensity;    // qualitative bucket
}

export interface AICardAgentReasoningProps {
  density?:                 AICardAgentReasoningDensity;
  /** Agent display name. Default "Guild". */
  agentName?:               string;
  /** Tier role chip next to the name. Default "AGENT". */
  agentRole?:               string;
  /** Subtitle eyebrow under the name. Default "REASONING & ANALYSIS". */
  agentEyebrow?:            string;
  /** When true, show the green "LIVE" pill at top right. Default true. */
  live?:                    boolean;

  summary?: {
    /** Short headline (single sentence). */
    headline:   string;
    /** Longer quoted analysis under the divider. */
    detail:     string;
  };

  /** Simple density only — optimization driver rows. */
  drivers?:                 AICardAgentReasoningDriver[];

  /** Controls the Explainability toggle. Default `false`. */
  explainability?:          boolean;
  onExplainabilityChange?:  (next: boolean) => void;
  onDeepenAnalysis?:        () => void;
}

/** Demo agent-reasoning props for bare mounts / galleries. */
export const SAMPLE_REASONING_SUMMARY = {
  headline: 'Coverage gaps concentrate in three Mid-Atlantic territories.',
  detail:   'Rebalancing two FTEs toward PA-07 and NJ-03 recovers roughly 9% reach without increasing total headcount.',
};

export const SAMPLE_REASONING_DRIVERS: AICardAgentReasoningDriver[] = [
  { label: 'Call frequency decline', weight: 42, intensity: 'high' },
  { label: 'Sample utilization drop', weight: 28, intensity: 'medium' },
  { label: 'New competitive launches', weight: 18, intensity: 'medium' },
  { label: 'Seasonal access friction', weight: 12, intensity: 'low' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Driver intensity tokens — tints derived from AI_RAMP brand ramp
// ─────────────────────────────────────────────────────────────────────────────

const INTENSITY_CFG: Record<DriverIntensity, { bg: string; border: string; text: string; label: string }> = {
  high:   { bg: AI.color.surface.emphasis, border: AI.color.border.subtle, text: AI.color.text.primary, label: 'High' },
  medium: { bg: 'transparent',     border: 'transparent', text: 'var(--ai-ds-helper)', label: 'Medium' },
  low:    { bg: 'transparent',     border: 'transparent', text: 'var(--ai-ds-helper)', label: 'Low'    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Inline icons
// ─────────────────────────────────────────────────────────────────────────────

function BrainIcon({ size = 22, color = AI.color.text.secondary }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 4.5C7.5 4.5 6.2 5.4 5.7 6.7C4.4 6.9 3.5 8 3.5 9.3C3.5 10 3.8 10.6 4.2 11.1C3.8 11.6 3.5 12.2 3.5 12.9C3.5 14.1 4.3 15.1 5.5 15.4C5.7 16.7 6.8 17.7 8.2 17.7C8.6 17.7 9 17.6 9.4 17.5C9.7 18.5 10.7 19.2 11.8 19.2C12.6 19.2 13.3 18.8 13.7 18.2L13.7 5.4C13.3 4.8 12.6 4.4 11.8 4.4C10.6 4.4 9.5 5.2 9 6.3"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M15 4.5C16.5 4.5 17.8 5.4 18.3 6.7C19.6 6.9 20.5 8 20.5 9.3C20.5 10 20.2 10.6 19.8 11.1C20.2 11.6 20.5 12.2 20.5 12.9C20.5 14.1 19.7 15.1 18.5 15.4C18.3 16.7 17.2 17.7 15.8 17.7C15.4 17.7 15 17.6 14.6 17.5C14.3 18.5 13.3 19.2 12.2 19.2"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M12 6V19" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function AgentHeader({
  agentName,
  agentRole,
  agentEyebrow,
  live,
}: {
  agentName: string;
  agentRole: string;
  agentEyebrow: string;
  live: boolean;
}) {
  return (
    <header style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        {/* Brain avatar — light lavender bubble */}
        <span aria-hidden="true" style={{
          width: 40, height: 40, borderRadius: 10,
          background: AI.color.brandSubtle,
          border: `1px solid ${AI.color.brandBorder}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <BrainIcon size={22} color={AI.color.text.secondary} />
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              ...AI_TYPOGRAPHY['@ai-card-title'],
              color: 'var(--ai-ds-text)',
              fontWeight: 700,
            }}>
              {agentName}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '2px 8px', borderRadius: 999,
              background: AI.color.brandSubtle,
              border: `1px solid ${AI.color.brandBorder}`,
              color: AI.color.text.secondary,
              fontFamily: F, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.06em',
            }}>
              {agentRole}
            </span>
          </div>
          <div style={{
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            color: 'var(--ai-ds-helper)',
            fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            marginTop: 2,
          }}>
            {agentEyebrow}
          </div>
        </div>
      </div>

      {live && (
        <span role="status" aria-label="Agent live" style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: 999,
          background: 'var(--ai-card-bg-raised)',
          border: '1px solid var(--ai-card-border)',
          color: 'var(--ai-ds-helper)',
          fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
        }}>
          <span aria-hidden="true" style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#27AE60',
            boxShadow: '0 0 0 2px rgba(39,174,96,0.18)',
          }} />
          LIVE
        </span>
      )}
    </header>
  );
}

function SummaryPanel({ headline, detail }: { headline: string; detail: string }) {
  return (
    <section aria-label="AI summary" style={{
      background: '#FFFFFF',
      border: `1px solid ${AI.color.brandBorder}`,
      borderRadius: AI.radius.md,
      padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{
        ...AI_TYPOGRAPHY['@ai-meta-label'],
        color: AI.color.text.secondary,
        fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
      }}>
        AI Summary
      </div>
      <div style={{
        ...AI_TYPOGRAPHY['@ai-body'],
        color: 'var(--ai-ds-text)',
      }}>
        {headline}
      </div>
      <div style={{ height: 1, background: AI.color.surface.subtle }} />
      <p style={{
        margin: 0,
        ...AI_TYPOGRAPHY['@ai-body-small'],
        color: 'var(--ai-ds-helper)',
        lineHeight: 1.55,
      }}>
        “{detail}”
      </p>
    </section>
  );
}

function DriversPanel({ drivers }: { drivers: AICardAgentReasoningDriver[] }) {
  return (
    <section aria-label="Optimization drivers" style={{
      background: '#FFFFFF',
      border: `1px solid ${AI.color.brandBorder}`,
      borderRadius: AI.radius.md,
      padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{
        ...AI_TYPOGRAPHY['@ai-meta-label'],
        color: 'var(--ai-ds-helper)',
        fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
        marginBottom: 4,
      }}>
        Optimization Drivers
      </div>
      {drivers.map((d) => {
        const cfg = INTENSITY_CFG[d.intensity];
        const showChip = d.intensity === 'high';
        return (
          <div key={d.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            ...AI_TYPOGRAPHY['@ai-body-small'],
            color: 'var(--ai-ds-text)',
          }}>
            <span>{d.label}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700 }}>{Math.round(d.weight)}%</span>
              {showChip ? (
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '2px 10px', borderRadius: 999,
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  color: cfg.text,
                  fontFamily: F, fontSize: 12, fontWeight: 700,
                }}>
                  {cfg.label}
                </span>
              ) : (
                <span style={{
                  color: cfg.text, fontFamily: F, fontSize: 12, fontWeight: 600,
                  minWidth: 50, textAlign: 'right',
                }}>
                  {cfg.label}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

export function AICardAgentReasoning({
  density      = 'simple',
  agentName    = 'Guild',
  agentRole    = 'AGENT',
  agentEyebrow = 'REASONING & ANALYSIS',
  live         = true,
  summary      = SAMPLE_REASONING_SUMMARY,
  drivers      = SAMPLE_REASONING_DRIVERS,
  explainability: explainabilityProp = false,
  onExplainabilityChange,
  onDeepenAnalysis = () => undefined,
}: AICardAgentReasoningProps) {
  // Locally-controlled when no `onExplainabilityChange` is wired so the
  // toggle is always interactive in demos / docs.
  const [internalExplain, setInternalExplain] = useState<boolean>(!!explainabilityProp);
  const explain = onExplainabilityChange ? !!explainabilityProp : internalExplain;
  const setExplain = (next: boolean) => {
    if (onExplainabilityChange) onExplainabilityChange(next);
    else setInternalExplain(next);
  };

  const showDrivers = density === 'simple' && drivers && drivers.length > 0;

  return (
    <div
      role="group"
      aria-label={`${agentName} reasoning and analysis`}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 20,
        borderRadius: AI.radius.lg,
        // Subtle brand-tinted gradient — the canonical AI surface for
        // AI-led content. Pulls from AI.gradient.surface.subtle.
        background: AI.gradient.surface.subtle,
        border: `1px solid ${AI.color.brandBorder}`,
        fontFamily: F,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      <AgentHeader
        agentName={agentName}
        agentRole={agentRole}
        agentEyebrow={agentEyebrow}
        live={live}
      />

      <SummaryPanel headline={summary.headline} detail={summary.detail} />

      {showDrivers && <DriversPanel drivers={drivers!} />}

      {/* Footer — Explainability toggle (left) + Deepen Analysis (right) */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, marginTop: 4, flexWrap: 'wrap',
      }}>
        <AIToggle checked={explain} onChange={setExplain} label="Explainability" />
        <AIButton
          variant="primary"
          size="md"
          icon={<RiRefreshLine size={14} />}
          label="Deepen Analysis"
          onClick={onDeepenAnalysis}
        />
      </div>
    </div>
  );
}

export default AICardAgentReasoning;
