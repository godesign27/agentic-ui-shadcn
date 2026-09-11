import React from 'react';
import { RiPulseLine, RiSparklingLine, RiBarChart2Line, RiFileTextLine } from '@remixicon/react';
import { F, AI } from '../../tokens/ai-tokens';
import { AI_TYPOGRAPHY } from '../../tokens/ai-typography';
import { AISoftSurface, AISoftSurfaceTone } from '../../atomic/ai-soft-surface/AISoftSurface';
import { AIList, AIListProps, AIListStatus } from '../../organisms/ai-list/AIList';
import { AIListItemProps } from '../../molecules/ai-list-item/AIListItem';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AIListLandingSection extends Omit<AIListProps, 'items' | 'onItemOpen'> {
  id:    string;
  items: AIListItemProps[];
}

export interface AIListLandingProps {
  /** Title above the page header. Defaults to "AI Briefing". */
  eyebrow?:        string;
  heading?:        string;
  intro?:          string;
  lastUpdated?:    string;
  backgroundTone?: AISoftSurfaceTone;
  sections?:       AIListLandingSection[];
  /** When true, sections render in a generating/loading state. */
  generating?:     boolean;
  onItemOpen?:     (item: AIListItemProps, sectionId: string, index: number) => void;
  onSectionToggle?: (sectionId: string, collapsed: boolean) => void;
  onAssessmentStart?: (item: AIListItemProps) => void;
}

// ── Default sections (matches the North Star spec) ───────────────────────────

const DEFAULT_SECTIONS: AIListLandingSection[] = [
  {
    id: 'territory-health',
    title: 'Territory Health Overview',
    icon: <RiPulseLine size={18} />,
    intro: "I've been monitoring the territories. While most have a steady rhythm, I'm noticing a slight increase in pressure around Newark following the recent zip moves.",
    items: [
      {
        variant: 'signal',
        title: 'Newark Territory',
        label: 'Alignment Monitor',
        status: 'needsReview',
        body: "There's a noticeable shift in workload — it's climbed to 1.15 in zip 07102. It might be time to look at easing that pressure.",
        metric: 'Workload 1.15×',
        confidence: 'medium',
        actionLabel: 'Review',
      },
      {
        variant: 'stable',
        title: 'Boston South',
        label: 'Alignment Monitor',
        status: 'balanced',
        body: 'Boston remains stable. Coverage is efficient and the current flow looks sustainable.',
        confidence: 'high',
      },
    ],
  },
  {
    id: 'recent-impact',
    title: 'Recent Impact',
    icon: <RiSparklingLine size={18} />,
    items: [
      {
        variant: 'impact',
        title: 'Two territory adjustments improved workload balance by 6% in the Northeast region.',
        body: 'Optimized 480 prescriptions across 3 territories.',
        metric: '+6% balance',
      },
      {
        variant: 'impact',
        title: 'One high-risk maintenance request was resolved with minimal disruption to current coverage.',
        body: 'Preserved 98% geographic continuity in Boston South.',
      },
      {
        variant: 'impact',
        title: 'System-wide alignment check completed. No critical drift detected in Tier 1 markets.',
        body: 'Verified against Q3 objectives and alignment constraints.',
      },
    ],
  },
  {
    id: 'next-assessments',
    title: 'Suggested Next Assessments',
    icon: <RiBarChart2Line size={18} />,
    items: [
      { variant: 'assessment', title: 'Assess Newark Health',     label: 'Analytics',  status: 'recommended', body: 'Deep dive into the workload drivers causing the recent spike in Newark.', actionLabel: 'Start assessment' },
      { variant: 'assessment', title: 'Generate Scenarios',       label: 'Strategy',   status: 'ready',       body: 'Model territory realignment options for Q3 with disruption thresholds.',  actionLabel: 'Open scenarios' },
      { variant: 'assessment', title: 'Compare Workload Impact',  label: 'Simulation', status: 'optional',    body: 'Side-by-side comparison of two reassignment proposals.',                  actionLabel: 'Compare' },
    ],
  },
  {
    id: 'what-changed',
    title: 'What Changed Since You Last Looked',
    icon: <RiFileTextLine size={18} />,
    layout: 'grid',
    items: [
      { variant: 'change',     type: 'Request',     title: 'District Change Request', body: 'A district-level request proposes moving 10 zips into the Newark territory.', actionLabel: 'Review request' },
      { variant: 'dataUpdate', type: 'Data Update', title: 'Q3 Prescription Data',    body: 'New prescription volume data has been ingested and normalized.',              actionLabel: 'View update' },
    ],
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export function AIListLanding({
  eyebrow = 'AI Briefing',
  heading = 'Good morning, Sarah.',
  intro   = "Here's what's changed, what matters, and what to look at next.",
  lastUpdated = 'Updated 2m ago',
  backgroundTone = 'ambient',
  sections = DEFAULT_SECTIONS,
  generating = false,
  onItemOpen,
  onSectionToggle,
  onAssessmentStart,
}: AIListLandingProps) {
  return (
    <AISoftSurface
      tone={backgroundTone}
      intensity="medium"
      radius={0}
      style={{ minHeight: '100%', padding: '32px 32px 80px', position: 'relative' }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto', fontFamily: F, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <p style={{
            margin: '0 0 6px',
            ...AI_TYPOGRAPHY['@ai-micro-eyebrow'],
            textTransform: 'uppercase' as const,
            color: AI.color.action.primary,
          }}>{eyebrow}</p>
          <h1 style={{
            margin: '0 0 8px',
            ...AI_TYPOGRAPHY['@ai-h2'],
            color: 'var(--ai-ds-text)',
          }}>{heading}</h1>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          }}>
            <p style={{
              margin: 0,
              ...AI_TYPOGRAPHY['@ai-section-subtitle'],
              color: 'var(--ai-ds-helper)',
              maxWidth: 680,
            }}>{intro}</p>
            <span style={{
              ...AI_TYPOGRAPHY['@ai-meta-label'],
              color: 'var(--ai-ds-helper)',
              padding: '2px 10px',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid var(--ai-card-border)',
              borderRadius: AI.radius.full,
            }}>{lastUpdated}</span>
          </div>
        </header>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {sections.map((section) => {
            const sectionStatus: AIListStatus = generating
              ? 'loading'
              : section.status ?? 'default';

            return (
              <AIList
                key={section.id}
                {...section}
                status={sectionStatus}
                onToggle={(c) => onSectionToggle?.(section.id, c)}
                onItemOpen={(item, idx) => {
                  if (section.id === 'next-assessments' && onAssessmentStart) onAssessmentStart(item);
                  onItemOpen?.(item, section.id, idx);
                }}
              />
            );
          })}
        </div>
      </div>
    </AISoftSurface>
  );
}

export default AIListLanding;
