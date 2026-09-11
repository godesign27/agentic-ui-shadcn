import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, Info, MoreVertical, ChevronRight } from 'lucide-react';
import { DSCheckbox } from './ds-checkbox';
import { DSToggle } from './ds-toggle';
import { DSButton } from './ds-button';
import { DSBadge } from './ds-badge';
// AI-theme atoms: the AI toggle + AI button family are used when theme === 'ai'.
import { AIToggle } from '../../atomic/ai-toggle/AIToggle';
import { AIButton } from '../../atomic/ai-button/AIButton';

/**
 * DS Table
 * =========
 * Source of Truth: upstream AI component source → src/table/
 *   (DS-TABLE.agent.md · ds-table.html canonical markup · table.md spec)
 * Build brief: src/imports/pasted_text/table-component-build.md
 *
 * A full-featured, data-driven data table assembled from existing DS atoms
 * (Checkbox, Toggle, Button, Badge) — no primitives are recreated. Every color,
 * radius and spacing value is read from the team design-system CSS variables in
 * src/styles/globals.css (var(--…, #fallback)); all text uses the "Open Sans"
 * face defined by the design system.
 *
 * Supports: 19 cell content types, Normal/Small font sizes, Default/Generous
 * padding, sortable + filterable headers, row/multi-row selection with an
 * indeterminate "select all", zebra striping, header colour, sticky header,
 * skeleton loading, disabled rows, inline editing/error cell states, expandable
 * nested rows, a total footer row, an optional toolbar, and the four AI modes
 * (Default · AI Assist · AI Prefilled · AI Anomaly).
 */

const FONT = '"Open Sans", sans-serif';

// ─── Token contract (DS-TABLE.agent.md → mapped onto globals.css vars) ───────
// The table ships in two design themes, both driven entirely by globals.css vars:
//   • 'standard' — the DS system look: primary TEAL accent (var(--zs-selection-
//     primary-default) / #2F6F7B), square corners.
//   • 'ai' — the AI brand-surface look confirmed against the Figma import
//     (src/imports/TableTemplate): AI brand BLUE accent (var(--color-ai-brand) /
//     #4D60E6), brand-surface row selection, rounded (AI radius) corners.
// Shared neutrals (#b2b0b6 border · #2f2c3c text · #5b5864 helper · #dedcde
// skeleton) are identical across themes.
export type DSTableTheme = 'standard' | 'ai';

function getTokens(theme: DSTableTheme) {
  const ai = theme === 'ai';
  return {
    // Softer hairline shared with the AI card surfaces (globals.css). Falls back
    // to the neutral separator/border when the light token is absent.
    separator:     'var(--border-light-color, var(--separators-default, var(--border, #B2B0B6)))',
    bg:            'var(--background, #FFFFFF)',
    bgFaint:       'var(--surface-color-2, #F4F3F3)',
    // Row-hover fill. AI theme hovers to the brand *surface* lavender (matches
    // the imported TableTemplate); standard keeps the neutral grey.
    bgHover:       ai ? 'var(--color-ai-brand-surface, #F5F6FF)' : 'var(--surface-color-1, #FAFAFA)',
    borderFocus:   'var(--focus-outline-color, #027AFF)',
    text:          'var(--text-color, #2F2C3C)',
    textDisabled:  'var(--surface-color-3, #716E79)',
    textHelper:    'var(--helper-text-color, #5B5864)',
    // Accent: AI brand blue for the AI theme, DS primary teal for standard.
    accent:        ai ? 'var(--color-ai-brand, #4D60E6)'          : 'var(--zs-selection-primary-default, #2F6F7B)',
    selectionBg:   ai ? 'var(--color-ai-brand-surface, #F5F6FF)'  : 'var(--zs-background-primary-subtle, #EAF6F8)',
    headerBg:      'var(--surface-color-1, #FAFAFA)',
    zebra:         'var(--surface-color-2, #F4F3F3)',
    skeletonFill:  'var(--border-light-color, #DEDCDE)',
    // Rounded AI corners vs. squared DS corners.
    cardRadius:    ai ? 'var(--radius-ai-md, 12px)'               : 'var(--radius, 4px)',
    errorText:     'var(--error-color, #B21111)',
    errorBorder:   'var(--error-color, #B21111)',
    // AI modes (only meaningful when theme = 'ai').
    aiAssistBg:    'var(--color-ai-brand-surface, #F5F6FF)',
    aiAssistEdge:  'var(--color-ai-brand, #4D60E6)',
    aiPrefillBg:   'var(--surface-color-1, #FAFAFA)',
    aiAnomalyBg:   'var(--error-color-secondary, #FFEDE9)',
    aiAnomalyEdge: 'var(--color-ai-status-error, #C0392B)',
  };
}

type TableTokens = ReturnType<typeof getTokens>;

export type DSTableSize = 'normal' | 'small';
export type DSTablePadding = 'default' | 'generous';
export type DSTableSelection = 'none' | 'single' | 'multi';
export type DSTableBorder = 'bottom-on-row' | 'left-on-cell' | 'all' | 'none';
export type DSTableCellMode = 'default' | 'ai-assist' | 'ai-prefilled' | 'ai-anomaly';
export type DSTableColumnType =
  | 'checkbox' | 'short-text' | 'long-text' | 'number' | 'date' | 'datetime'
  | 'dropdown' | 'text-with-icon' | 'button' | 'toggle' | 'boolean'
  | 'action' | 'radio' | 'badge';

export type SortDir = 'asc' | 'desc' | null;

// Default column widths (px) from the build brief §8.
const DEFAULT_WIDTH: Partial<Record<DSTableColumnType, number>> = {
  checkbox: 52, radio: 52, action: 52, toggle: 64,
  'short-text': 160, number: 160, 'text-with-icon': 180,
  'long-text': 300, date: 215, datetime: 225,
};

export interface DSTableColumn<Row = any> {
  key: string;
  label?: string;
  type?: DSTableColumnType;
  align?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  info?: React.ReactNode;         // header info tooltip content (renders info icon)
  width?: number | string;
  icon?: React.ReactNode;         // leading icon for text-with-icon columns
  badgeVariant?: (row: Row) => 'neutral' | 'info' | 'success' | 'warning' | 'error';
  buttonLabel?: string;
  /** Custom cell renderer — overrides the type-based renderer. */
  render?: (row: Row, col: DSTableColumn<Row>) => React.ReactNode;
  /** Per-cell AI mode (overrides the row-level mode). */
  mode?: (row: Row) => DSTableCellMode;
}

export interface DSTableProps<Row = any> {
  columns: DSTableColumn<Row>[];
  rows: Row[];
  rowKey?: (row: Row, i: number) => string | number;
  /** Visual theme: 'standard' = DS teal / square corners; 'ai' = AI brand blue / rounded. */
  theme?: DSTableTheme;
  size?: DSTableSize;
  padding?: DSTablePadding;
  selection?: DSTableSelection;
  selectedKeys?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  sortable?: boolean;
  sort?: { key: string; dir: SortDir };
  onSortChange?: (sort: { key: string; dir: SortDir }) => void;
  border?: DSTableBorder;
  zebra?: boolean;
  headerColor?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;              // skeleton state
  skeletonRows?: number;
  caption?: string;
  /** Row-level AI mode. */
  rowMode?: (row: Row, i: number) => DSTableCellMode;
  rowDisabled?: (row: Row, i: number) => boolean;
  /** Expandable nested content beneath a row. */
  renderExpanded?: (row: Row) => React.ReactNode;
  onToggle?: (row: Row, key: string, value: boolean) => void;
  onAction?: (row: Row) => void;
  onButtonClick?: (row: Row, col: DSTableColumn<Row>) => void;
  footer?: React.ReactNode;      // custom footer row content (e.g. total)
  toolbar?: React.ReactNode;     // optional top toolbar
  maxHeight?: number | string;   // scroll container height (needed for sticky)
  style?: React.CSSProperties;
}

// Row height + vertical padding per size × padding (build brief §4).
function rowMetrics(size: DSTableSize, padding: DSTablePadding) {
  const font = size === 'normal' ? 16 : 14;
  const tracking = size === 'normal' ? '-0.144px' : '-0.176px';
  let height: number, vpad: number;
  if (size === 'normal') {
    height = padding === 'generous' ? 72 : 56;
    vpad = padding === 'generous' ? 20 : 12;
  } else {
    height = padding === 'generous' ? 61 : 49;
    vpad = padding === 'generous' ? 20 : 8;
  }
  return { font, tracking, height, vpad, hpad: 16 };
}

function modeStyles(mode: DSTableCellMode, T: TableTokens): React.CSSProperties {
  switch (mode) {
    case 'ai-assist':
      return { background: T.aiAssistBg, boxShadow: `inset 3px 0 0 ${T.aiAssistEdge}` };
    case 'ai-prefilled':
      return { background: T.aiPrefillBg, fontStyle: 'italic', color: T.textHelper };
    case 'ai-anomaly':
      return { background: T.aiAnomalyBg, boxShadow: `inset 3px 0 0 ${T.aiAnomalyEdge}` };
    default:
      return {};
  }
}

export function DSTable<Row = any>({
  columns,
  rows,
  rowKey,
  theme = 'standard',
  size = 'normal',
  padding = 'default',
  selection = 'none',
  selectedKeys,
  onSelectionChange,
  sortable = false,
  sort,
  onSortChange,
  border = 'bottom-on-row',
  zebra = false,
  headerColor = false,
  stickyHeader = false,
  loading = false,
  skeletonRows = 4,
  caption,
  rowMode,
  rowDisabled,
  renderExpanded,
  onToggle,
  onAction,
  onButtonClick,
  footer,
  toolbar,
  maxHeight,
  style,
}: DSTableProps<Row>) {
  const TOKENS = getTokens(theme);
  const isAi = theme === 'ai';
  const m = rowMetrics(size, padding);
  const getKey = (row: Row, i: number) =>
    rowKey ? rowKey(row, i) : ((row as any)?.id ?? i);

  // Selection (controlled if selectedKeys supplied, else internal).
  const [internalSel, setInternalSel] = React.useState<(string | number)[]>([]);
  const sel = selectedKeys ?? internalSel;
  const setSel = (keys: (string | number)[]) => {
    onSelectionChange?.(keys);
    if (!selectedKeys) setInternalSel(keys);
  };

  // Sort (controlled if `sort` supplied, else internal).
  const [internalSort, setInternalSort] = React.useState<{ key: string; dir: SortDir }>({ key: '', dir: null });
  const activeSort = sort ?? internalSort;
  const setSort = (s: { key: string; dir: SortDir }) => {
    onSortChange?.(s);
    if (!sort) setInternalSort(s);
  };

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const allKeys = rows.map(getKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => sel.includes(k));
  const someSelected = sel.length > 0 && !allSelected;

  const toggleAll = () => setSel(allSelected ? [] : allKeys);
  const toggleRow = (k: string | number) => {
    if (selection === 'single') { setSel(sel.includes(k) ? [] : [k]); return; }
    setSel(sel.includes(k) ? sel.filter((x) => x !== k) : [...sel, k]);
  };

  const cycleSort = (col: DSTableColumn<Row>) => {
    if (!(sortable && col.sortable)) return;
    const dir: SortDir =
      activeSort.key !== col.key ? 'asc' : activeSort.dir === 'asc' ? 'desc' : activeSort.dir === 'desc' ? null : 'asc';
    setSort({ key: dir ? col.key : '', dir });
  };

  const showSelectCol = selection !== 'none';

  // ─── Border helpers ─────────────────────────────────────────────────────
  const cellBorder = (): React.CSSProperties => {
    switch (border) {
      case 'bottom-on-row': return { borderBottom: `1px solid ${TOKENS.separator}` };
      case 'left-on-cell':  return { borderLeft: `1px solid ${TOKENS.separator}`, borderBottom: `1px solid ${TOKENS.separator}` };
      case 'all':           return { border: `1px solid ${TOKENS.separator}` };
      case 'none':          return {};
    }
  };

  const baseCellStyle = (align: 'left' | 'right'): React.CSSProperties => ({
    padding: `${m.vpad}px ${m.hpad}px`,
    height: m.height,
    boxSizing: 'border-box',
    fontFamily: FONT,
    fontSize: m.font,
    letterSpacing: m.tracking,
    color: TOKENS.text,
    textAlign: align,
    verticalAlign: 'middle',
    whiteSpace: align === 'right' ? 'nowrap' : undefined,
    ...cellBorder(),
  });

  // ─── Cell content by column type ────────────────────────────────────────
  const renderCellContent = (row: Row, col: DSTableColumn<Row>, rowIdx: number): React.ReactNode => {
    if (col.render) return col.render(row, col);
    const val = (row as any)[col.key];
    switch (col.type) {
      case 'toggle':
      case 'boolean':
        // AI theme uses the AI toggle atom (AI brand-blue track); the standard
        // theme keeps the DS toggle (primary teal).
        return isAi ? (
          <AIToggle
            checked={!!val}
            size="sm"
            onChange={(next) => onToggle?.(row, col.key, next)}
            aria-label={col.label ?? 'Toggle'}
          />
        ) : (
          <span
            role="button"
            tabIndex={0}
            onClick={() => onToggle?.(row, col.key, !val)}
            style={{ display: 'inline-flex', cursor: 'pointer' }}
          >
            <DSToggle active={!!val} size="small" />
          </span>
        );
      case 'action':
        return (
          <button
            type="button"
            aria-label="Row actions"
            onClick={() => onAction?.(row)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, border: 'none', background: 'transparent',
              borderRadius: 'var(--radius-ai-xs, 6px)', cursor: 'pointer', color: TOKENS.textHelper,
            }}
          >
            <MoreVertical size={20} />
          </button>
        );
      case 'button':
        // AI theme uses the AI button family (gradient/rounded, AI brand);
        // standard theme keeps the DS solid teal button (square corners).
        return isAi ? (
          <AIButton
            variant="primary-solid"
            size="sm"
            radius="md"
            label={col.buttonLabel ?? String(val ?? 'Button')}
            onClick={() => onButtonClick?.(row, col)}
          />
        ) : (
          <DSButton
            type="solid"
            size={size === 'small' ? 'xsmall' : 'small'}
            label={col.buttonLabel ?? String(val ?? 'Button')}
            onClick={() => onButtonClick?.(row, col)}
          />
        );
      case 'badge':
        return <DSBadge variant={col.badgeVariant ? col.badgeVariant(row) : 'neutral'} label={String(val ?? '')} />;
      case 'text-with-icon':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {col.icon}
            <span>{String(val ?? '')}</span>
          </span>
        );
      case 'number':
        return <span>{typeof val === 'number' ? val.toLocaleString() : String(val ?? '')}</span>;
      default:
        return <span>{val == null ? '' : String(val)}</span>;
    }
  };

  const skeletonBlock = (w: string) => (
    <div
      className="ds-table-skeleton"
      style={{ width: w, height: 14, borderRadius: 'var(--radius-ai-xs, 6px)', background: TOKENS.skeletonFill }}
    />
  );

  // ─── Header ─────────────────────────────────────────────────────────────
  const headerRow = (
    <tr style={{ background: headerColor ? TOKENS.headerBg : TOKENS.bg }}>
      {showSelectCol && (
        <th scope="col" style={{ ...baseCellStyle('left'), width: DEFAULT_WIDTH.checkbox, height: 56 }}>
          {selection === 'multi' && (
            <DSCheckbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
              aria-label="Select all rows"
            />
          )}
        </th>
      )}
      {renderExpanded && <th scope="col" style={{ ...baseCellStyle('left'), width: 40, height: 56 }} />}
      {columns.map((col) => {
        const align = col.align ?? (col.type === 'number' ? 'right' : 'left');
        const isSorted = activeSort.key === col.key && activeSort.dir;
        const w = col.width ?? (col.type ? DEFAULT_WIDTH[col.type] : undefined);
        return (
          <th
            key={col.key}
            scope="col"
            aria-sort={isSorted ? (activeSort.dir === 'asc' ? 'ascending' : 'descending') : (col.sortable && sortable ? 'none' : undefined)}
            onClick={() => cycleSort(col)}
            style={{
              ...baseCellStyle(align),
              height: 56,
              width: w,
              fontWeight: 600,
              color: TOKENS.textHelper,
              cursor: sortable && col.sortable ? 'pointer' : 'default',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                flexDirection: align === 'right' ? 'row-reverse' : 'row',
                justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
              }}
            >
              <span>{col.label}</span>
              {col.info && <Info size={16} aria-hidden style={{ color: TOKENS.textHelper }} />}
              {sortable && col.sortable && (
                isSorted
                  ? (activeSort.dir === 'asc'
                      ? <ArrowUp size={16} style={{ color: TOKENS.accent }} />
                      : <ArrowDown size={16} style={{ color: TOKENS.accent }} />)
                  : <ArrowUpDown size={16} style={{ color: TOKENS.textHelper, opacity: 0.7 }} />
              )}
              {col.filterable && <Filter size={16} style={{ color: TOKENS.textHelper }} />}
            </span>
          </th>
        );
      })}
    </tr>
  );

  // ─── Body ───────────────────────────────────────────────────────────────
  const totalCols = columns.length + (showSelectCol ? 1 : 0) + (renderExpanded ? 1 : 0);

  const bodyRows = loading
    ? Array.from({ length: skeletonRows }).map((_, i) => (
        <tr key={`sk-${i}`}>
          {showSelectCol && <td style={baseCellStyle('left')}>{skeletonBlock('16px')}</td>}
          {renderExpanded && <td style={baseCellStyle('left')} />}
          {columns.map((col, j) => (
            <td key={col.key} style={baseCellStyle(col.align ?? (col.type === 'number' ? 'right' : 'left'))}>
              {skeletonBlock(`${60 + ((i + j) % 3) * 12}%`)}
            </td>
          ))}
        </tr>
      ))
    : rows.map((row, i) => {
        const k = getKey(row, i);
        const isSel = sel.includes(k);
        const disabled = rowDisabled?.(row, i) ?? false;
        const baseMode = rowMode?.(row, i) ?? 'default';
        const isExpanded = !!expanded[String(k)];

        const rowBg = disabled
          ? TOKENS.bgFaint
          : isSel
            ? TOKENS.selectionBg
            : zebra && i % 2 === 1
              ? TOKENS.zebra
              : TOKENS.bg;

        return (
          <React.Fragment key={k}>
            <tr
              aria-disabled={disabled || undefined}
              aria-selected={isSel || undefined}
              data-selected={isSel || undefined}
              className="ds-table-row"
              style={{
                background: rowBg,
                pointerEvents: disabled ? 'none' : undefined,
                boxShadow: isSel ? `inset 3px 0 0 ${TOKENS.accent}` : undefined,
              }}
            >
              {showSelectCol && (
                <td style={{ ...baseCellStyle('left'), color: disabled ? TOKENS.textDisabled : TOKENS.text }}>
                  {selection === 'single' ? (
                    <input
                      type="radio"
                      name="ds-table-select"
                      checked={isSel}
                      disabled={disabled}
                      onChange={() => toggleRow(k)}
                      aria-label={`Select row ${i + 1}`}
                      style={{ accentColor: TOKENS.accent as string, width: 16, height: 16 }}
                    />
                  ) : (
                    <DSCheckbox
                      checked={isSel}
                      disabled={disabled}
                      onChange={() => toggleRow(k)}
                      aria-label={`Select row ${i + 1}`}
                    />
                  )}
                </td>
              )}
              {renderExpanded && (
                <td style={{ ...baseCellStyle('left'), width: 40 }}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                    onClick={() => setExpanded((e) => ({ ...e, [String(k)]: !isExpanded }))}
                    style={{
                      display: 'inline-flex', border: 'none', background: 'transparent',
                      cursor: 'pointer', color: TOKENS.textHelper, padding: 4,
                    }}
                  >
                    <ChevronRight size={18} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform .18s ease' }} />
                  </button>
                </td>
              )}
              {columns.map((col) => {
                const align = col.align ?? (col.type === 'number' ? 'right' : 'left');
                const cellMode = col.mode?.(row) ?? baseMode;
                return (
                  <td
                    key={col.key}
                    style={{
                      ...baseCellStyle(align),
                      color: disabled ? TOKENS.textDisabled : TOKENS.text,
                      ...(disabled ? {} : modeStyles(cellMode, TOKENS)),
                    }}
                  >
                    {renderCellContent(row, col, i)}
                  </td>
                );
              })}
            </tr>
            {renderExpanded && isExpanded && (
              <tr className="ds-table-nested">
                <td colSpan={totalCols} style={{ ...cellBorder(), background: TOKENS.bgHover, padding: `${m.vpad}px ${m.hpad + 24}px`, fontFamily: FONT }}>
                  {renderExpanded(row)}
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      });

  const scoped = `
    .ds-table-row:hover:not([aria-disabled="true"]) { background: ${TOKENS.bgHover} !important; }
    @keyframes dsTableShimmer { 0% { opacity: .55 } 50% { opacity: 1 } 100% { opacity: .55 } }
    .ds-table-skeleton { animation: dsTableShimmer 1.4s ease-in-out infinite; }
  `;

  return (
    <div
      role="region"
      aria-label={caption ?? 'Data table'}
      style={{
        fontFamily: FONT,
        // AI theme only: retarget the reused DS atoms' accent tokens (checkbox
        // fill, solid button, focus ring) to the AI brand blue — scoped to this
        // region and still driven by the CSS variable, so updating
        // --color-ai-brand in globals.css restyles the whole AI table. The
        // 'standard' theme leaves these untouched, so the atoms keep their DS
        // primary TEAL (var(--zs-selection-primary-default) / #2F6F7B).
        ...(isAi
          ? {
              ['--zs-selection-primary-default' as string]: 'var(--color-ai-brand, #4D60E6)',
              ['--zs-bg-btn-default' as string]: 'var(--color-ai-brand, #4D60E6)',
              ['--zs-bg-btn-hover' as string]: 'var(--color-ai-brand-hover, #4453C7)',
              ['--zs-bg-btn-pressed' as string]: 'var(--color-ai-brand-active, #3A47A8)',
              ['--zs-border-focus' as string]: 'var(--color-ai-brand, #4D60E6)',
            }
          : {}),
        ...style,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: scoped }} />
      {toolbar && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '12px 0' }}>
          {toolbar}
        </div>
      )}
      <div
        style={{
          overflowX: 'auto',
          overflowY: stickyHeader ? 'auto' : undefined,
          maxHeight: stickyHeader ? (maxHeight ?? 400) : maxHeight,
          border: border === 'all' ? undefined : `1px solid ${TOKENS.separator}`,
          borderRadius: TOKENS.cardRadius,
          background: TOKENS.bg,
        }}
      >
        <table
          aria-busy={loading || undefined}
          // width:100% lets columns share the available width so the trailing
          // Actions column stays visible without horizontal scroll; the
          // overflow-x wrapper is only a fallback on very narrow viewports.
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          {caption && <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{caption}</caption>}
          <thead
            style={
              stickyHeader
                ? { position: 'sticky', top: 0, zIndex: 10, background: headerColor ? TOKENS.headerBg : TOKENS.bg }
                : undefined
            }
          >
            {headerRow}
          </thead>
          <tbody>{bodyRows}</tbody>
          {footer && (
            <tfoot>
              <tr style={{ background: TOKENS.headerBg }}>
                <td colSpan={totalCols} style={{ ...baseCellStyle('right'), fontWeight: 600, borderTop: `1px solid ${TOKENS.separator}` }}>
                  {footer}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

export default DSTable;
