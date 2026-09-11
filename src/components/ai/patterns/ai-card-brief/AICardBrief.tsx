import React, { useState } from 'react';
import { AI, DS } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AIChip, type BriefChipStatus } from '../../atomic/ai-chip/AIChip';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';
import { AIAvatar } from '../../atomic/ai-avatar/AIAvatar';

export interface AICardBriefProps {
  agentName?: string;
  goal: string;
  sources?: string[];
  constraints?: string[];
  outputFormat?: string;
  status?: BriefChipStatus;
  onRun?: () => void;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 14px', borderRadius: AI.radius.sm,
  border: '1px solid transparent', cursor: 'pointer',
  fontFamily: DS.font, ...AI_TYPOGRAPHY['@ai-section-subtitle'],
};

// Section label — mixed case, small, light gray. Replaces the all-caps eyebrow
// so the body content reads as the primary signal (matches the preferred
// reference layout).
const sectionLabelStyle: React.CSSProperties = {
  ...AI_TYPOGRAPHY['@ai-meta-label'],
  color: 'var(--ai-ds-helper)',
};

export function AICardBrief({
  agentName = 'Research Agent',
  goal,
  sources = [],
  constraints = [],
  outputFormat,
  status = 'default',
  onRun,
  onEdit,
  onSave,
  onCancel,
}: AICardBriefProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      width: '100%',
      boxSizing: 'border-box',
      background: 'var(--ai-card-bg)',
      border: '1px solid var(--ai-card-border)',
      borderRadius: AI.radius.lg,
      overflow: 'hidden',
      fontFamily: DS.font,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 18px',
        borderBottom: '1px solid var(--ai-card-border)',
        background: 'var(--ai-card-bg-raised)',
      }}>
        <AIAvatar size={28} />
        <div style={{ flex: 1 }}>
          <div style={{ ...AI_TYPOGRAPHY['@ai-section-subtitle'], color: 'var(--ai-ds-text)' }}>{agentName}</div>
          <div style={{ ...AI_TYPOGRAPHY['@ai-agent-name'], color: 'var(--ai-ds-helper)' }}>Task Brief</div>
        </div>
        <AIChip kind="brief" status={status} label={status.replace(/-/g, ' ')} size="sm" />
        <button
          onClick={() => setExpanded(e => !e)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ai-ds-helper)', padding: 4 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={expanded ? 'M2 4.5L7 9.5L12 4.5' : 'M4.5 2L9.5 7L4.5 12'}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {expanded && (
        <>
          <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Goal */}
            <div>
              <div style={{ ...sectionLabelStyle, marginBottom: 6 }}>Goal</div>
              <div style={{ ...AI_TYPOGRAPHY['@ai-body'], color: 'var(--ai-ds-text)' }}>{goal}</div>
            </div>

            {/* Constraints — inline middot list */}
            {constraints.length > 0 && (
              <div>
                <div style={{ ...sectionLabelStyle, marginBottom: 6 }}>Constraints</div>
                <div style={{ ...AI_TYPOGRAPHY['@ai-body-small'], color: 'var(--ai-ds-text)' }}>
                  {constraints.map((c, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && (
                        <span aria-hidden="true" style={{ margin: '0 8px', color: 'var(--ai-ds-helper)' }}>·</span>
                      )}
                      {c}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Expected output */}
            {outputFormat && (
              <div>
                <div style={{ ...sectionLabelStyle, marginBottom: 6 }}>Expected Output</div>
                <div style={{ ...AI_TYPOGRAPHY['@ai-body-small'], color: 'var(--ai-ds-text)' }}>{outputFormat}</div>
              </div>
            )}
          </div>

          {/* Bottom trust-footnote row — Data Sources chips on the left, View
              sources link pushed right. Sits BETWEEN the body and the existing
              action footer so the footer's Run/Edit buttons stay anchored at
              the bottom of the card. */}
          {sources.length > 0 && (
            <div style={{
              padding: '12px 20px',
              borderTop: '1px dashed var(--ai-card-border)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexWrap: 'wrap',
            }}>
              <span style={sectionLabelStyle}>Data Sources</span>
              {sources.map((src, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px',
                  borderRadius: AI.radius.xs,
                  background: 'var(--ai-card-bg-raised)',
                  border: '1px solid var(--ai-card-border)',
                  ...AI_TYPOGRAPHY['@ai-body-small'],
                  color: 'var(--ai-ds-text)',
                }}>
                  <DatabaseIcon />
                  {src}
                </span>
              ))}
              <span style={{ marginLeft: 'auto' }}>
                <AIWhyThisLink variant="view-sources" />
              </span>
            </div>
          )}

          {/* Footer actions — light gray, matches header */}
          <div style={{
            display: 'flex', gap: 8,
            padding: '12px 20px',
            background: 'var(--ai-card-bg-raised)',
            borderTop: '1px solid var(--ai-card-border)',
          }}>
            <button onClick={onRun} style={{ ...BTN_BASE, background: AI.color.brand, color: '#fff', border: `1px solid ${AI.color.brand}` }}>
              Run Agent
            </button>
            <button onClick={onEdit} style={{ ...BTN_BASE, background: 'transparent', color: AI.color.brand, border: `1px solid ${AI.color.brand}` }}>
              Edit Brief
            </button>
            {onSave && (
              <button onClick={onSave} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: '1px solid var(--ai-btn-outline-border)' }}>
                Save
              </button>
            )}
            {onCancel && (
              <button onClick={onCancel} style={{ ...BTN_BASE, background: 'transparent', color: 'var(--ai-ds-helper)', border: 'none' }}>
                Cancel
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// RiDatabaseLine glyph for data-source chips — matches the visual weight of lucide
// icons used elsewhere. Inline SVG so no extra import.
function DatabaseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <ellipse cx="6" cy="2.5" rx="4" ry="1.5" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M2 2.5v3.5c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5V2.5" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M2 6v3.5c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5V6" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  );
}

export default AICardBrief;
