import React from 'react';
import { AITextLink, AITextLinkTone } from '../ai-text-link/AITextLink';

export type WhyThisVariant = 'why-this' | 'view-rationale' | 'view-sources' | 'view-assumptions' | 'explain-risk';

export interface AIWhyThisLinkProps {
  variant?: WhyThisVariant;
  label?: string;
  onClick?: () => void;
  /** Overrides the default brand link color (e.g. for dark surfaces). */
  color?: string;
}

const VARIANT_CONFIG: Record<WhyThisVariant, { defaultLabel: string; icon: React.ReactNode; tone: AITextLinkTone }> = {
  'why-this':         { defaultLabel: 'Why this?',         icon: <QuestionIcon />,  tone: 'ai'        },
  'view-rationale':   { defaultLabel: 'View rationale',    icon: <BookIcon />,      tone: 'ai'        },
  'view-sources':     { defaultLabel: 'View sources',      icon: <LinkIcon />,      tone: 'ai'        },
  'view-assumptions': { defaultLabel: 'View assumptions',  icon: <LightbulbIcon />, tone: 'ai'        },
  'explain-risk':     { defaultLabel: 'Explain risk',      icon: <WarningIcon />,   tone: 'attention' },
};

function QuestionIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4.5 4.5a1.5 1.5 0 0 1 3 0c0 1-1.5 1.25-1.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="6" cy="8.5" r="0.65" fill="currentColor"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2h3.5a2 2 0 0 1 2 2v5.5H2V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M7.5 4h2.5v5.5H7.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="3" y1="4.5" x2="6" y2="4.5" stroke="currentColor" strokeWidth="1"/>
      <line x1="3" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

function LinkIcon() {
  // External-link glyph — square with arrow exiting top-right. Conventional
  // "open / view another resource" affordance; clearer than the chain glyph
  // when used in "View sources" links.
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 3h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M3 3v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M3 9h6V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 1h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1.5a3 3 0 0 1 1.5 5.6V8.5H4.5V7.1A3 3 0 0 1 6 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="5" y1="10.8" x2="7" y2="10.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1.5L10.5 10H1.5L6 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="6" y1="5" x2="6" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="6" cy="8.8" r="0.6" fill="currentColor"/>
    </svg>
  );
}

export function AIWhyThisLink({ variant = 'why-this', label, onClick, color }: AIWhyThisLinkProps) {
  const cfg = VARIANT_CONFIG[variant];

  // Composes the AITextLink atom — the why-this link is a transparency-scoped
  // preset of it: fixed variant icons + default labels + tone mapping.
  return (
    <AITextLink
      label={label ?? cfg.defaultLabel}
      leadingIcon={cfg.icon}
      tone={cfg.tone}
      size="sm"
      onClick={onClick}
      ariaLabel={label ?? cfg.defaultLabel}
      style={color ? { color } : undefined}
    />
  );
}

export default AIWhyThisLink;
