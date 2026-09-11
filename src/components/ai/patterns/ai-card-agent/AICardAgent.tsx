/**
 * AICardAgent — Product-facing card that introduces a named AI agent.
 *
 * Idle: identity (icon + role chip + name + first-person description),
 * a short capabilities list, and two affordances at the bottom — Talk
 * (full-width primary, flips to a voice briefing) and Chat (square,
 * opens the AI Assisted Side Panel via a brief inline toast).
 *
 * Talking: gradient overlay with a pulsing waveform and typewriter-
 * streamed script. Round RiCloseLine dismisses back to idle.
 */

import React, { useState, useEffect, useRef } from 'react';
import { RiMicLine, RiMessage2Line, RiCloseLine, RiVolumeUpLine, RiPulseLine, RiGitBranchLine, RiAlertLine } from '@remixicon/react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AgentCardState = 'idle' | 'talking';

export interface AgentCardConfig {
  role:         string;
  name:         string;
  description:  string;
  capabilities: string[];
  icon:         React.ReactNode;
  accent:       string;
  accentBg:     string;
  talkScript:   string;
}

export interface AICardAgentProps {
  config:      AgentCardConfig;
  /** Locks the card to a render state. Used for static previews. */
  forceState?: AgentCardState;
}

// ─── Waveform ────────────────────────────────────────────────────────────────

const WAVE = [4, 7, 12, 9, 14, 8, 11, 6, 13, 7, 10, 5, 8, 12, 6];

function VoiceWaveform({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden
      style={{
        display: 'inline-flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: 3, height: 24,
      }}
    >
      {WAVE.map((h, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: 3, height: h, borderRadius: 999,
            background: accent,
            animation: `ai-card-agent-pulse ${700 + (i % 4) * 150}ms ease-in-out ${i * 60}ms infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Typewriter hook ─────────────────────────────────────────────────────────

function useTypewriter(text: string, active: boolean, speed = 28): string {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);
  useEffect(() => {
    if (!active) { setDisplayed(''); idx.current = 0; return; }
    idx.current = 0;
    setDisplayed('');
    const id = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return displayed;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AICardAgent({ config, forceState }: AICardAgentProps) {
  const [internalState, setInternalState] = useState<AgentCardState>('idle');
  const [chatHint, setChatHint] = useState(false);
  const state = forceState ?? internalState;

  const talkText = useTypewriter(config.talkScript, state === 'talking');

  const handleTalk = () => {
    if (forceState) return;
    setInternalState('talking');
    setChatHint(false);
  };
  const handleChat = () => {
    if (forceState) return;
    setChatHint(true);
    setInternalState('idle');
    window.setTimeout(() => setChatHint(false), 3000);
  };
  const handleClose = () => {
    if (forceState) return;
    setInternalState('idle');
  };

  const [firstWord, ...rest] = config.description.split(' ');
  const restOfDesc = rest.join(' ');

  return (
    <div style={{ position: 'relative', width: '100%', minWidth: 0, fontFamily: DS.font }}>
      <style>{`
        @keyframes ai-card-agent-pulse {
          0%, 100% { opacity: 0.5; transform: scaleY(0.8); }
          50%      { opacity: 1;   transform: scaleY(1);   }
        }
        @keyframes ai-card-agent-cursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @media (prefers-reduced-motion: reduce) {
          [data-ai-card-agent-wave] > span { animation: none !important; }
          [data-ai-card-agent-cursor]      { animation: none !important; }
        }
      `}</style>

      {/* ── Idle ── */}
      <div style={{
        background: 'var(--ai-card-bg)',
        border: '1px solid var(--ai-card-border)',
        borderRadius: 16,
        boxShadow: AI.shadow.card.default,
        overflow: 'hidden',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity:        state === 'talking' ? 0 : 1,
        transform:      state === 'talking' ? 'scale(0.95)' : 'scale(1)',
        pointerEvents:  state === 'talking' ? 'none' : 'auto',
      }}>
        <div style={{ padding: 20 }}>
          {/* Icon + role chip */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: config.accentBg, color: config.accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {config.icon}
            </div>
            <span style={{
              ...AI_TYPOGRAPHY['@ai-meta-label'], fontWeight: 600,
              padding: '5px 11px', borderRadius: 999,
              border: '1px solid var(--ai-card-border)',
              background: 'var(--ai-card-bg)',
              color: 'var(--ai-ds-helper)',
              whiteSpace: 'nowrap',
            }}>
              {config.role}
            </span>
          </div>

          {/* Name */}
          <h3 style={{
            margin: '0 0 6px',
            ...AI_TYPOGRAPHY['@ai-h3'],
            color: 'var(--ai-ds-text)',
          }}>
            {config.name}
          </h3>

          {/* Description — first word in accent */}
          <p style={{
            margin: '0 0 16px',
            ...AI_TYPOGRAPHY['@ai-section-subtitle'],
            color: 'var(--ai-ds-helper)',
          }}>
            <span style={{ color: config.accent, fontWeight: 600 }}>{firstWord}</span>
            {' '}{restOfDesc}
          </p>

          <div style={{ height: 1, background: 'var(--ai-card-border)', margin: '0 0 14px' }} />

          {/* Capabilities */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              ...AI_TYPOGRAPHY['@ai-micro-eyebrow'],
              textTransform: 'uppercase',
              color: 'var(--ai-ds-helper)',
              marginBottom: 10,
            }}>
              Capabilities
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {config.capabilities.map((cap, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{
                    flexShrink: 0, marginTop: 6,
                    width: 6, height: 6, borderRadius: '50%',
                    background: config.accent,
                  }} />
                  <span style={{
                    ...AI_TYPOGRAPHY['@ai-section-subtitle'],
                    color: 'var(--ai-ds-text)',
                  }}>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Talk + Chat */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={handleTalk}
              style={{
                flex: 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                height: 48, borderRadius: 12,
                background: '#111827', color: '#FFFFFF',
                border: 'none', cursor: 'pointer',
                ...AI_TYPOGRAPHY['@ai-button-label'],
                fontFamily: DS.font,
                transition: 'background 0.15s ease, transform 0.08s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#1F2937'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#111827'; }}
              onMouseDown ={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
              onMouseUp   ={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              <RiMicLine size={15} />
              Talk
            </button>
            <button
              type="button"
              onClick={handleChat}
              aria-label={`Open chat with ${config.name}`}
              title={`Open chat with ${config.name}`}
              style={{
                width: 48, height: 48, borderRadius: 12,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                border: chatHint ? '1px solid transparent' : '1px solid var(--ai-card-border)',
                background: chatHint ? config.accent : 'var(--ai-card-bg)',
                color: chatHint ? '#FFFFFF' : 'var(--ai-ds-helper)',
                cursor: 'pointer',
                transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              }}
            >
              <RiMessage2Line size={17} />
            </button>
          </div>

          {/* Chat hint toast */}
          {chatHint && (
            <div style={{
              marginTop: 12,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 11px', borderRadius: 12,
              background: `${config.accent}15`,
              color: config.accent,
              ...AI_TYPOGRAPHY['@ai-meta-label'],
            }}>
              <RiMessage2Line size={12} />
              Opening AI Assisted Panel for {config.name}…
            </div>
          )}
        </div>
      </div>

      {/* ── Talking overlay ── */}
      <div
        aria-hidden={state !== 'talking'}
        style={{
          position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity:        state === 'talking' ? 1 : 0,
          transform:      state === 'talking' ? 'scale(1)' : 'scale(0.95)',
          pointerEvents:  state === 'talking' ? 'auto' : 'none',
          background: 'linear-gradient(160deg, #EEF0FF 0%, #F4F0FF 60%, #FFF5EE 100%)',
          fontFamily: DS.font,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${config.accent}18 0%, transparent 70%)`,
          }}
        />

        <div style={{
          position: 'relative',
          padding: '24px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          minHeight: 360, height: '100%',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 1px 3px rgba(26,22,40,0.08)',
            color: 'var(--ai-ds-text)',
            ...AI_TYPOGRAPHY['@ai-meta-label'],
            fontWeight: 600,
            marginBottom: 22,
          }}>
            Agent Briefing
            <RiVolumeUpLine size={13} style={{ color: config.accent }} />
          </div>

          <h3 style={{
            margin: '0 0 14px',
            ...AI_TYPOGRAPHY['@ai-h3'],
            color: 'var(--ai-ds-text)',
            textAlign: 'center',
          }}>
            {config.name}
          </h3>

          <div data-ai-card-agent-wave style={{ marginBottom: 14 }}>
            <VoiceWaveform accent={config.accent} />
          </div>

          <div style={{ flex: 1, width: '100%', padding: '0 8px', marginBottom: 22 }}>
            <p style={{
              margin: 0,
              ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              color: 'var(--ai-ds-helper)',
              fontStyle: 'italic',
              textAlign: 'center',
              minHeight: '5rem',
            }}>
              {talkText}
              {talkText.length < config.talkScript.length && (
                <span
                  data-ai-card-agent-cursor
                  style={{
                    display: 'inline-block',
                    width: 2, height: 14, marginLeft: 2,
                    verticalAlign: 'middle',
                    background: config.accent,
                    borderRadius: 1,
                    animation: 'ai-card-agent-cursor 0.9s steps(1) infinite',
                  }}
                />
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close agent briefing"
            title="Close"
            style={{
              width: 48, height: 48, borderRadius: '50%',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#111827', color: '#FFFFFF',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(17,24,39,0.3)',
              transition: 'transform 0.12s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
          >
            <RiCloseLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Canonical agent configs ─────────────────────────────────────────────────

export const AGENT_CONFIGS: AgentCardConfig[] = [
  {
    role: 'Primary Partner',
    name: 'Territory Health Analyst',
    description: "I look beneath the surface of the data to find the human rhythm of your territories. I'll help you spot where balance is slipping away.",
    capabilities: [
      "When the balance feels 'off'",
      'Validating the human impact of a move',
      'Finding the narrative in the metrics',
    ],
    icon:     <RiPulseLine size={22} />,
    accent:   '#4D60E6',
    accentBg: '#EEF0FF',
    talkScript: "I've been looking over the latest alignment health data. There are a few areas where the balance feels off — particularly in the northeast cluster. Want me to walk you through what I found?",
  },
  {
    role: 'Exploration Partner',
    name: 'Scenario Strategist',
    description: "I help you dream up 'what-if' scenarios that respect the existing flow of your business while finding space for necessary change.",
    capabilities: [
      "Exploring the 'art of the possible'",
      'Minimizing disruption to client relationships',
      'Preparing for leadership discussions',
    ],
    icon:     <RiGitBranchLine size={22} />,
    accent:   '#8B5CF6',
    accentBg: '#F4F0FF',
    talkScript: "Let's explore some what-if scenarios for Q3. I've modeled three territory realignment options that keep disruption under 12% — each one tells a different story about where you want to be by year end.",
  },
  {
    role: 'Risk Control',
    name: 'Impact & Risk Assessor',
    description: "I'm the guardian of continuity. I'll highlight the ripples your decisions make across the territory.",
    capabilities: [
      'Pressure-testing a final decision',
      'Protecting against secondary effects',
      'Supporting evidence-based moves',
    ],
    icon:     <RiAlertLine size={22} />,
    accent:   '#F59E0B',
    accentBg: '#FFFBEB',
    talkScript: "Before you approve this realignment, I want to flag three second-order effects I'm tracking. Two are manageable — one needs your attention. It involves the Newark cluster and a key account transition timing.",
  },
];

export default AICardAgent;
