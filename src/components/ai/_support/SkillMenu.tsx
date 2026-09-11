/**
 * Skill Menu — / Skills picker for the AI prompt toolbar.
 * Opens above the toolbar, shows collection + tool skills with
 * search and category filter pills.
 */

import React, { useState, useEffect, useRef } from 'react';
import { RiStackLine, RiFlashlightLine, RiSearchLine } from '@remixicon/react';

// ── Token set (matches DS gray scale) ────────────────────────────────────────
const F = '"Open Sans", sans-serif';
const T = {
  textDefault:  '#1A1628',
  textHelper:   '#5B5864',
  textMuted:    '#9896A0',
  border:       '#B2B0B6',
};

// ── Skill data ─────────────────────────────────────────────────────────────────
export type SkillCategory = 'collection' | 'tool';

export interface Skill {
  id:          string;
  name:        string;
  description: string;
  category:    SkillCategory;
}

export const SKILLS: Skill[] = [
  { id: 'q1-align',     name: 'Q1 Alignment',    description: 'Territory alignment dataset for Q1',      category: 'collection' },
  { id: 'q2-perf',      name: 'Q2 Performance',  description: 'Sales performance reports for Q2',        category: 'collection' },
  { id: 'territory-map',name: 'Territory Map',    description: 'Current territory assignments by rep',    category: 'collection' },
  { id: 'rep-rankings',  name: 'Rep Rankings',    description: 'Rep performance leaderboard YTD',         category: 'collection' },
  { id: 'oncology-q3',   name: 'Oncology Q3',    description: 'Q3 oncology segment alignment data',      category: 'collection' },
  { id: 'gen-report',    name: 'Generate Report', description: 'Create a new report from a template',     category: 'tool' },
  { id: 'compare',       name: 'Compare Periods', description: 'Compare metrics across time periods',     category: 'tool' },
  { id: 'flag-outliers', name: 'RiFlagLine Outliers',   description: 'Identify statistical outliers in data',   category: 'tool' },
  { id: 'export-csv',    name: 'Export CSV',      description: 'Export the current dataset as CSV',       category: 'tool' },
  { id: 'schedule',      name: 'Schedule Review', description: 'Set up a recurring review task',          category: 'tool' },
];

// ── Single skill row ───────────────────────────────────────────────────────────
function SkillItem({ skill, onSelect }: { skill: Skill; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  const isCollection  = skill.category === 'collection';
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: '7px 12px', textAlign: 'left',
        background: hov ? '#F4F3F3' : 'transparent',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'flex-start', gap: '9px',
        transition: 'background 0.1s ease',
      }}
    >
      {/* Category chip icon */}
      <div style={{
        width: 26, height: 26, borderRadius: '7px', flexShrink: 0, marginTop: '1px',
        background:   isCollection ? 'rgba(47,111,123,0.10)' : 'rgba(74,66,244,0.09)',
        color:        isCollection ? '#2F6F7B'               : '#4A42F4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isCollection ? <RiStackLine size={13} strokeWidth={2} /> : <RiFlashlightLine size={13} strokeWidth={2} />}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontFamily: F, fontWeight: 500, color: T.textDefault, lineHeight: 1.35, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {skill.name}
        </div>
        <div style={{ fontSize: '11.5px', fontFamily: F, color: T.textHelper, lineHeight: 1.4, marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {skill.description}
        </div>
      </div>
    </button>
  );
}

// ── Category filter pill ───────────────────────────────────────────────────────
type FilterCat = 'all' | SkillCategory;

function CategoryPill({
  cat, active, onClick,
}: {
  cat: FilterCat; active: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const icon = cat === 'collection'
    ? <RiStackLine size={11} strokeWidth={2.2} />
    : cat === 'tool'
    ? <RiFlashlightLine size={11} strokeWidth={2.2} />
    : null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '3px 9px', borderRadius: '100px',
        border: `1.5px solid ${active ? 'rgba(26,22,40,0.28)' : hov ? 'rgba(26,22,40,0.18)' : 'rgba(0,0,0,0.10)'}`,
        background: active ? 'rgba(26,22,40,0.07)' : hov ? 'rgba(0,0,0,0.04)' : 'white',
        cursor: 'pointer',
        fontSize: '11.5px', fontFamily: F, fontWeight: active ? 600 : 400,
        color: active ? T.textDefault : T.textHelper,
        transition: 'all 0.13s ease', flexShrink: 0, lineHeight: 1,
      }}
    >
      {icon}
      {cat === 'all' ? 'all' : cat}
    </button>
  );
}

// ── SkillMenu popover ─────────────────────────────────────────────────────────
export function SkillMenu({
  onClose,
  onSelect,
  compact = false,
}: {
  onClose:   () => void;
  onSelect:  (skill: Skill) => void;
  compact?:  boolean;          // narrower layout for the side panel
}) {
  const [query,    setQuery]    = useState('');
  const [category, setCategory] = useState<FilterCat>('all');
  const ref       = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const CATS: FilterCat[] = ['all', 'collection', 'tool'];

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const filtered = SKILLS.filter(s => {
    const matchCat = category === 'all' || s.category === category;
    const q        = query.trim().toLowerCase();
    const matchQ   = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const width = compact ? 240 : 268;

  return (
    <>
      <style>{`
        @keyframes skillMenuIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .skill-scroll::-webkit-scrollbar { width: 4px; }
        .skill-scroll::-webkit-scrollbar-track { background: transparent; }
        .skill-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
      `}</style>
      <div
        ref={ref}
        role="dialog"
        aria-label="Browse skills"
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: 0,
          width: `${width}px`,
          background: 'white',
          borderRadius: '12px',
          border: `1px solid rgba(26,22,40,0.10)`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1px 6px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)',
          zIndex: 400,
          overflow: 'hidden',
          animation: 'skillMenuIn 0.18s cubic-bezier(0.16,1,0.3,1) both',
          transformOrigin: 'bottom left',
        }}
      >
        {/* RiSearchLine */}
        <div style={{ padding: '9px 11px 8px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <RiSearchLine size={13} color={T.textMuted} strokeWidth={2} style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search skills…"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: '12.5px', fontFamily: F, color: T.textDefault, lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        {/* Category filter pills */}
        <div style={{ display: 'flex', gap: '5px', padding: '7px 11px 7px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          {CATS.map(cat => (
            <CategoryPill
              key={cat}
              cat={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>

        {/* Skills list */}
        <div
          className="skill-scroll"
          style={{ maxHeight: compact ? '200px' : '232px', overflowY: 'auto', padding: '3px 0' }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '18px 12px', textAlign: 'center', fontSize: '12.5px', fontFamily: F, color: T.textHelper }}>
              No skills match
            </div>
          ) : (
            filtered.map(skill => (
              <SkillItem
                key={skill.id}
                skill={skill}
                onSelect={() => { onSelect(skill); onClose(); }}
              />
            ))
          )}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '6px 12px 8px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '10.5px', fontFamily: F, color: T.textMuted }}>
            Select a skill to add it to your prompt
          </span>
        </div>
      </div>
    </>
  );
}

// ── Toolbar trigger button ─────────────────────────────────────────────────────
export function SkillMenuButton({
  open,
  onClick,
  size = 'default',
}: {
  open:    boolean;
  onClick: () => void;
  size?:   'default' | 'compact';
}) {
  const [hov, setHov] = useState(false);
  const isCompact = size === 'compact';

  return (
    <button
      onClick={onClick}
      aria-label="Browse skills"
      aria-expanded={open}
      aria-haspopup="dialog"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        height: isCompact ? 'auto' : '34px',
        padding: isCompact ? '4px 9px' : '0 10px',
        boxSizing: 'border-box',
        borderRadius: '8px',
        border: `1.5px solid ${open ? 'rgba(26,22,40,0.28)' : hov ? 'rgba(26,22,40,0.18)' : 'rgba(0,0,0,0.12)'}`,
        background: open ? 'rgba(26,22,40,0.07)' : hov ? 'rgba(0,0,0,0.04)' : 'transparent',
        cursor: 'pointer', flexShrink: 0,
        transition: 'all 0.14s ease',
      }}
    >
      {/* Slash character */}
      <span style={{
        fontSize: isCompact ? '13px' : '14px',
        fontFamily: '"SF Mono", "Fira Code", monospace',
        fontWeight: 600,
        color: open ? T.textDefault : hov ? T.textDefault : '#5B5864',
        lineHeight: 1,
        letterSpacing: '-0.5px',
      }}>
        /
      </span>
      <span style={{
        fontSize: isCompact ? '11.5px' : '12.5px',
        fontFamily: F,
        fontWeight: 500,
        color: open ? T.textDefault : hov ? T.textDefault : T.textHelper,
        lineHeight: 1,
        letterSpacing: '-0.1px',
      }}>
        Skills
      </span>
    </button>
  );
}
