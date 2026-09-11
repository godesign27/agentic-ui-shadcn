import React, { useState } from 'react';
import { ZSAI_TAN, F } from '../../tokens/ai-tokens';
import { AIButton } from '../../atomic/ai-button/AIButton';
import { AIWhyThisLink } from '../../molecules/ai-why-this-link/AIWhyThisLink';
import { AIIcon } from '../../atomic/ai-icon/AIIcon';
import { AIChip, type AIStatusPillTone } from '../../atomic/ai-chip/AIChip';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AIProfileCardDensity = 'basic' | 'simple' | 'rich' | 'robust';
export type AIProfileCardTheme   = 'light' | 'dark-gradient' | 'tan';
export type AIProfileCardContext = 'chat' | 'side-drawer';

export interface AIProfileCardProps {
  density:      AIProfileCardDensity;
  theme?:       AIProfileCardTheme;
  context?:     AIProfileCardContext;
  name:         string;
  specialty:    string;
  organization: string;
  avatarUrl?:   string;
  // Simple+
  decile?:      number;
  role?:        string;
  stats?: {
    totalVisits: number;
    trxLast90d:  number;
    trxDelta?:   string;
    lastVisit:   string;
  };
  // Rich+
  sentiment?:   'positive' | 'negative' | 'neutral';
  confidence?:  'high' | 'medium' | 'low';
  insight?: {
    summary:    string;
    source:     string;
    onDismiss?: () => void;
  };
  // Robust
  recommendation?: {
    rationale:    string;
    source:       string;
    whyThisUrl?:  string;
    actions: {
      primary:    { label: string; icon?: string; onClick: () => void };
      secondary?: { label: string; icon?: string; onClick: () => void };
    };
    onDismiss?: () => void;
  };
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Theme config
// ─────────────────────────────────────────────────────────────────────────────

interface ThemeCfg {
  bg:             string;
  border:         string;
  borderRadius:   string;
  nameColor:      string;
  subColor:       string;
  captionColor:   string;
  dividerColor:   string;
  decileBg:       string;
  decileColor:    string;
  roleBg:         string;
  roleColor:      string;
  roleBorder:     string;
  aiBadgeBg:      string;
  aiBadgeColor:   string;
  insightBg:      string;
  insightBorder:  string;
  insightText:    string;
  insightCaption: string;
  insightLink:    string;
  statValue:      string;
  statDeltaPos:   string;
  statDeltaNeg:   string;
  avatarBg:       string;
  avatarColor:    string;
  onDark:         boolean;
}

const THEME: Record<AIProfileCardTheme, ThemeCfg> = {
  light: {
    bg:             '#FFFFFF',
    border:         '1px solid rgba(0,0,0,0.10)',
    borderRadius:   '12px',
    nameColor:      '#1A1628',
    subColor:       '#5B5864',
    captionColor:   '#8A8699',
    dividerColor:   'rgba(0,0,0,0.10)',
    decileBg:       '#EFF6FF',
    decileColor:    '#1D4ED8',
    roleBg:         '#F3F4F6',
    roleColor:      '#5B5864',
    roleBorder:     'rgba(0,0,0,0.10)',
    aiBadgeBg:      'rgba(77, 96, 230,0.10)',
    aiBadgeColor:   '#4D60E6',
    insightBg:      '#EFF6FF',
    insightBorder:  '#BFDBFE',
    insightText:    '#1A1628',
    insightCaption: '#5B5864',
    insightLink:    '#1D4ED8',
    statValue:      '#1A1628',
    statDeltaPos:   '#16A34A',
    statDeltaNeg:   '#DC2626',
    avatarBg:       '#D2DBFF',
    avatarColor:    '#3544A4',
    onDark:         false,
  },
  'dark-gradient': {
    bg:             'linear-gradient(135deg,#1A3660 0%,#243B72 55%,#2D3480 100%)',
    border:         'none',
    borderRadius:   '12px',
    nameColor:      '#FFFFFF',
    subColor:       '#93C5FD',
    captionColor:   '#8DB8EE',
    dividerColor:   'rgba(147,197,253,0.28)',
    decileBg:       'rgba(255,255,255,0.15)',
    decileColor:    '#D6EEFF',
    roleBg:         'rgba(255,255,255,0.08)',
    roleColor:      '#93C5FD',
    roleBorder:     'rgba(147,197,253,0.25)',
    aiBadgeBg:      'rgba(255,255,255,0.15)',
    aiBadgeColor:   '#D6EEFF',
    insightBg:      'rgba(255,255,255,0.08)',
    insightBorder:  'rgba(147,197,253,0.35)',
    insightText:    '#D6EEFF',
    insightCaption: '#93C5FD',
    insightLink:    '#93C5FD',
    statValue:      '#FFFFFF',
    statDeltaPos:   '#4ADE80',
    statDeltaNeg:   '#F87171',
    avatarBg:       'rgba(255,255,255,0.18)',
    avatarColor:    '#FFFFFF',
    onDark:         true,
  },
  tan: {
    bg:             '#F2E8DB',
    border:         '1px solid #C5AD90',
    borderRadius:   '12px',
    nameColor:      ZSAI_TAN[100],
    subColor:       ZSAI_TAN[80],
    captionColor:   ZSAI_TAN[70],
    dividerColor:   '#C5AD90',
    decileBg:       '#E4D3BE',
    decileColor:    ZSAI_TAN[90],
    roleBg:         '#EAD9C5',
    roleColor:      ZSAI_TAN[80],
    roleBorder:     '#C5AD90',
    aiBadgeBg:      'rgba(53, 68, 164,0.12)',
    aiBadgeColor:   '#3544A4',
    insightBg:      '#EAD9C5',
    insightBorder:  '#C5AD90',
    insightText:    ZSAI_TAN[100],
    insightCaption: ZSAI_TAN[80],
    insightLink:    '#3544A4',
    statValue:      ZSAI_TAN[100],
    statDeltaPos:   '#16A34A',
    statDeltaNeg:   '#DC2626',
    avatarBg:       '#DCC6B0',
    avatarColor:    ZSAI_TAN[90],
    onDark:         false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Internal sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Sparkle({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 1L7.2 4.8L11 6L7.2 7.2L6 11L4.8 7.2L1 6L4.8 4.8L6 1Z" fill={color} />
    </svg>
  );
}

function ProfileAvatar({ name, avatarUrl, bg, color }: { name: string; avatarUrl?: string; bg: string; color: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(p => p[0].toUpperCase())
    .slice(0, 2)
    .join('');

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }

  return (
    <div style={{
      width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
      background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: F, fontSize: 16, fontWeight: 700, letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  );
}

function AIBadgePill({ bg, color }: { bg: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 8px', borderRadius: 100,
      background: bg, color,
      fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
      flexShrink: 0,
    }}>
      <Sparkle size={9} color={color} />
      AI
    </span>
  );
}

const CONFIDENCE_PILL: Record<'high' | 'medium' | 'low', { tone: AIStatusPillTone; label: string }> = {
  high:   { tone: 'success',  label: 'High confidence'   },
  medium: { tone: 'warning',  label: 'Medium confidence' },
  low:    { tone: 'critical', label: 'Low confidence'    },
};

function SentimentBadge({ sentiment, cfg }: { sentiment: 'positive' | 'negative' | 'neutral'; cfg: ThemeCfg }) {
  const dotColor = sentiment === 'positive' ? '#22C55E' : sentiment === 'negative' ? '#EF4444' : '#9CA3AF';
  const label    = sentiment === 'positive' ? 'Positive sentiment' : sentiment === 'negative' ? 'Negative sentiment' : 'Neutral sentiment';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 100,
      background: cfg.roleBg,
      border: `1px solid ${cfg.roleBorder}`,
      flexShrink: 0,
    }}>
      <Sparkle size={9} color={cfg.roleColor} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: cfg.roleColor }}>{label}</span>
    </span>
  );
}

function StatItem({ value, delta, label, cfg, isPositive }: { value: string | number; delta?: string; label: string; cfg: ThemeCfg; isPositive?: boolean }) {
  const deltaColor = isPositive === true ? cfg.statDeltaPos : isPositive === false ? cfg.statDeltaNeg : cfg.captionColor;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: cfg.statValue, lineHeight: 1 }}>{value}</span>
        {delta && <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: deltaColor }}>{delta}</span>}
      </div>
      <span style={{ fontFamily: F, fontSize: 10, fontWeight: 500, color: cfg.captionColor, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function InsightCallout({ insight, cfg }: { insight: NonNullable<AIProfileCardProps['insight']>; cfg: ThemeCfg }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{
      background: cfg.insightBg,
      border: `1px solid ${cfg.insightBorder}`,
      borderRadius: 8, padding: '10px 12px',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
        <Sparkle size={12} color={cfg.aiBadgeColor} />
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: cfg.insightText, flex: 1, lineHeight: 1.4 }}>
          {insight.summary}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 18 }}>
        <span style={{ fontFamily: F, fontSize: 11, color: cfg.insightCaption }}>{insight.source}</span>
        <button
          onClick={() => { setDismissed(true); insight.onDismiss?.(); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: F, fontSize: 11, color: cfg.insightLink, padding: '0 2px' }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

function RecommendationPanel({ rec, cfg }: {
  rec: NonNullable<AIProfileCardProps['recommendation']>;
  cfg: ThemeCfg;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{
      background: cfg.insightBg,
      border: `1px solid ${cfg.insightBorder}`,
      borderRadius: 8, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Sparkle size={12} color={cfg.aiBadgeColor} />
          <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: cfg.aiBadgeColor, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            AI Recommendation
          </span>
        </div>
        <button
          onClick={() => { setDismissed(true); rec.onDismiss?.(); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: cfg.captionColor, fontSize: 18, lineHeight: 1, padding: '0 4px' }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>

      {/* Rationale */}
      <p style={{ fontFamily: F, fontSize: 12, color: cfg.insightText, lineHeight: 1.55, margin: 0 }}>
        {rec.rationale}
      </p>

      {/* Source + Why this */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        <span style={{ fontFamily: F, fontSize: 11, color: cfg.insightCaption }}>{rec.source}</span>
        <AIWhyThisLink
          variant="why-this"
          color={cfg.onDark ? cfg.insightLink : undefined}
          onClick={() => rec.whyThisUrl && window.open(rec.whyThisUrl, '_blank')}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <AIButton
          variant="primary-solid"
          size="sm"
          label={rec.actions.primary.label}
          onClick={rec.actions.primary.onClick}
        />
        {rec.actions.secondary && (
          <AIButton
            variant="secondary"
            size="sm"
            onDark={cfg.onDark}
            label={rec.actions.secondary.label}
            onClick={rec.actions.secondary.onClick}
          />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function AIProfileCard({
  density,
  theme    = 'light',
  context  = 'side-drawer',
  name,
  specialty,
  organization,
  avatarUrl,
  decile,
  role,
  stats,
  sentiment,
  confidence,
  insight,
  recommendation,
  disabled = false,
}: AIProfileCardProps) {
  const cfg = THEME[theme];

  const isSimple  = density === 'simple' || density === 'rich' || density === 'robust';
  const isRich    = density === 'rich' || density === 'robust';
  const isRobust  = density === 'robust';

  const showDecile         = isSimple && decile !== undefined && !disabled;
  const showRole           = isSimple && !!role;
  const showStats          = isSimple && !!stats;
  const showAIBadge        = isRich && !disabled;
  const showConfidence     = isRich && !!confidence && !disabled;
  const showSentiment      = isRich && !!sentiment && !disabled;
  const showInsight        = isRich && !isRobust && !!insight && !disabled;
  const showRecommendation = isRobust && !!recommendation && !disabled;

  const isDelta = (d?: string) => d ? d.startsWith('+') ? true : d.startsWith('-') ? false : undefined : undefined;

  return (
    <div style={{
      background:    cfg.bg,
      border:        cfg.border,
      borderRadius:  cfg.borderRadius,
      padding:       '16px',
      display:       'flex',
      flexDirection: 'column',
      gap:           12,
      fontFamily:    F,
      maxWidth:      context === 'side-drawer' ? 380 : undefined,
      width:         context === 'chat' ? '100%' : undefined,
      minWidth:      240,
      boxSizing:     'border-box' as const,
    }}>

      {/* ── Identity row ── */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <ProfileAvatar name={name} avatarUrl={avatarUrl} bg={cfg.avatarBg} color={cfg.avatarColor} />

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Name row — name + AI badge left, confidence pill right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: cfg.nameColor, lineHeight: 1.3 }}>
                {name}
              </span>
              {showAIBadge && <AIBadgePill bg={cfg.aiBadgeBg} color={cfg.aiBadgeColor} />}
            </div>
            {showConfidence && (
              <AIChip kind="status" size="sm" onDark={cfg.onDark} tone={CONFIDENCE_PILL[confidence!].tone} label={CONFIDENCE_PILL[confidence!].label} />
            )}
          </div>

          {/* Specialty */}
          <span style={{ fontFamily: F, fontSize: 12, fontWeight: 500, color: cfg.subColor, lineHeight: 1.4 }}>
            {specialty}
          </span>

          {/* Organization */}
          <span style={{ fontFamily: F, fontSize: 11, color: cfg.captionColor, lineHeight: 1.4 }}>
            {organization}
          </span>
        </div>
      </div>

      {/* ── Chip row ── */}
      {(showDecile || showRole || showSentiment) && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {showDecile && (
            <AIChip
              kind="brief"
              label={`Decile ${decile}`}
              noDot
              accentBg={cfg.decileBg}
              accentColor={cfg.decileColor}
              icon={<AIIcon name="ai-assist-fill" size="xs" decorative style={{ color: cfg.decileColor }} />}
            />
          )}
          {showRole && (
            <AIChip
              kind="brief"
              label={role!}
              noDot
              accentBg={cfg.roleBg}
              accentColor={cfg.roleColor}
            />
          )}
          {showSentiment && (
            <SentimentBadge sentiment={sentiment!} cfg={cfg} />
          )}
        </div>
      )}

      {/* ── Stats row ── */}
      {showStats && stats && (
        <div style={{
          display: 'flex', alignItems: 'stretch', gap: 0,
          paddingTop: 8,
          borderTop: `1px solid ${cfg.dividerColor}`,
        }}>
          <div style={{ flex: 1, paddingLeft: 4 }}>
            <StatItem value={stats.totalVisits} label="Total Visits" cfg={cfg} />
          </div>
          <div style={{ width: 1, background: cfg.dividerColor, flexShrink: 0 }} />
          <div style={{ flex: 1, paddingLeft: 16 }}>
            <StatItem value={stats.trxLast90d} delta={stats.trxDelta} label="TRX · Last 90D" cfg={cfg} isPositive={isDelta(stats.trxDelta)} />
          </div>
          <div style={{ width: 1, background: cfg.dividerColor, flexShrink: 0 }} />
          <div style={{ flex: 1, paddingLeft: 16 }}>
            <StatItem value={stats.lastVisit} label="Last Visit" cfg={cfg} />
          </div>
        </div>
      )}

      {/* ── Insight callout (Rich only) ── */}
      {showInsight && insight && (
        <InsightCallout insight={insight} cfg={cfg} />
      )}

      {/* ── Recommendation panel (Robust only) ── */}
      {showRecommendation && recommendation && (
        <RecommendationPanel rec={recommendation} cfg={cfg} />
      )}
    </div>
  );
}

export default AIProfileCard;
