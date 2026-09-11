/**
 * ZAIDYN AI Design Tokens
 *
 * Three-tier structure:
 *   Tier 1 — Global Palette   ZSAI ramp  (raw values, no semantic meaning)
 *   Tier 2 — Semantic Aliases AI.*       (maps palette → intent)
 *   Tier 3 — Component Tokens ai-*       (maps semantic → component slots)
 *                                         (defined per-component in component files)
 *
 * Rules:
 *  - Component code must only reference AI.* (Tier 2). Never ZSAI[n] directly.
 *  - Token names encode INTENT, not appearance.
 *  - No color words (purple, iris, violet, blue, teal) in Tier 2 or 3 names.
 *  - ai. prefix = Tier 2  |  ai- prefix = Tier 3 component
 *  - Standard ZAIDYN tokens remain under the zs. / ZDS namespace — never mixed.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TIER 1 — Global Palette
// Naming: zsai-{step}  (scale prefix + numeric step, 00–100)
// These are the ONLY tokens that hold raw hex values.
// They must never appear in component code.
// ─────────────────────────────────────────────────────────────────────────────
export const ZSAI = {
  100: '#1F2A66',
  90:  '#3544A4',
  80:  '#4D60E6',
  70:  '#657CEC',
  60:  '#7F95F2',
  50:  '#90A3F9',
  40:  '#A6B4FC',
  30:  '#BECAFE',
  20:  '#D2DBFF',
  10:  '#E0E7FF',
  '00': '#F5F6FF',
} as const;

// ZS Orange — signal / attention / escalation (10% accent role)
export const ZS_ORANGE = {
  100: '#481A00',
  90:  '#663000',
  80:  '#A54F00',
  70:  '#CB6100',
  60:  '#EC7200',
  50:  '#FF9900',
  40:  '#FFB234',
  30:  '#FFC657',
  20:  '#FFD68F',
  10:  '#FFF1D6',
  '00': '#FEFBF4',
} as const;

// ZSAI Tan — companion surface / warm neutral (10% accent role)
export const ZSAI_TAN = {
  100: '#3C2A1D',
  90:  '#5A3E2C',
  80:  '#7A5944',
  70:  '#9A7560',
  60:  '#B89580',
  50:  '#CDB39C',
  40:  '#DCC6B0',
  30:  '#E8D6BF',
  20:  '#F1E4D0',
  10:  '#ECE6DD',
  '00': '#F6F2EB',
} as const;

// ZS Red — error / destructive status
export const ZS_RED = {
  100: '#4A0E08',
  90:  '#6E1710',
  80:  '#9A241A',
  70:  '#A5322A',
  60:  '#C0392B',
  50:  '#D65043',
  40:  '#E0776D',
  30:  '#EBA097',
  20:  '#F3C6C0',
  10:  '#FBE4E1',
  '00': '#FEF4F3',
} as const;

// ZS Green — success / positive status
export const ZS_GREEN = {
  80: '#0A6E5E',
  60: '#27AE60',
} as const;

// ZS Amber — warning / caution status
export const ZS_AMBER = {
  80: '#8A640C',
  60: '#E67E22',
} as const;

// ZS Dataviz — chart / series palette (not for UI chrome)
export const ZS_DATAVIZ = {
  1:  '#DB6C03',
  2:  '#3287C4',
  3:  '#8D38FC',
  4:  '#2DA40C',
  5:  '#ED39DB',
  6:  '#764204',
  7:  '#686EFF',
  8:  '#566C32',
  9:  '#BC5422',
  10: '#299C91',
  11: '#FD595F',
  12: '#795106',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TIER 2 — Semantic Tokens
// Naming: ai.{category}.{role}[.{variant}][.{state}]
// Encoded as a nested JS object; use dot-path comments for design-tool export.
// ─────────────────────────────────────────────────────────────────────────────
export const AI = {

  // ── ai.color.* ──────────────────────────────────────────────────────────
  color: {

    // ai.color.action.primary          — filled interactive surface (buttons, active chips)
    // ai.color.action.primary.hover
    // ai.color.action.primary.active
    action: {
      primary:       ZSAI[80],    // #4D60E6
      primaryHover:  ZSAI[90],    // #3544A4
      primaryActive: ZSAI[100],   // #1F2A66
    },

    // ai.color.surface.*               — background fills (non-interactive)
    surface: {
      default:  ZSAI['00'],        // #F5F6FF  — lightest tint, panel bg
      subtle:   ZSAI[20],          // #D2DBFF  — card bg, insight fill
      emphasis: ZSAI[30],          // #BECAFE  — badge fill, table header
    },

    // ai.color.border.*                — stroke / outline
    border: {
      default: ZSAI[80],           // #4D60E6  — default card/insight border
      strong:  ZSAI[90],           // #3544A4  — panel border, chip hover
      focus:   ZSAI[80],           // #4D60E6  — input focus ring accent
      subtle:  ZSAI[60],           // #7F95F2  — soft / secondary border
    },

    // ai.color.text.*                  — typographic colors on AI surfaces
    text: {
      primary:   ZSAI[100],        // #1F2A66  — heading / label on light surface
      secondary: ZSAI[90],         // #3544A4  — sub-label, badge label
      onAction:  '#FFFFFF',        // on filled AI button or gradient surface
    },

    // ai.color.brand.*                 — ZSAI brand identity references
    brand:        ZSAI[80],        // #4D60E6 — primary brand accent
    brandSubtle:  ZSAI[20],        // #D2DBFF — tinted bg for brand-accented elements
    brandSurface: ZSAI['00'],      // #F5F6FF — lightest brand tint (panel/card bg)
    brandBorder:  ZSAI[30],        // #BECAFE — brand-tinted border
    brandStrong:  ZSAI[90],        // #3544A4 — deep brand for emphasis / dark text
    brandInk:     ZSAI[100],       // #1F2A66 — darkest brand ink

    // ai.color.decorative.*            — non-interactive wash accents
    decorative: {
      wash:       ZSAI[40],        // #A6B4FC
      washStrong: ZSAI[60],        // #7F95F2
    },

    // ai.color.signal.*               — ZS Orange: attention, escalation, CTA (10% rule)
    signal: {
      default:  ZS_ORANGE[80],     // #A54F00 — primary signal color
      hover:    ZS_ORANGE[90],     // #663000 — signal hover state
      strong:   ZS_ORANGE[100],    // #481A00 — signal emphasis / high-stakes
      subtle:   ZS_ORANGE[10],     // #FFF1D6 — signal tinted bg
      surface:  ZS_ORANGE['00'],   // #FEFBF4 — lightest signal tint
    },

    // ai.color.companion.*            — ZSAI Tan: warm neutral companion surface (10% rule)
    companion: {
      paper:     ZSAI_TAN['00'],   // #F6F2EB — warmest paper surface
      surface:   ZSAI_TAN[10],     // #ECE6DD — companion card bg
      highlight: ZSAI_TAN[20],     // #F1E4D0 — companion highlight / selection
      border:    ZSAI_TAN[30],     // #E8D6BF — companion border
      ink:       ZSAI_TAN[100],    // #3C2A1D — companion text / dark ink
    },

    // ai.color.status.*               — semantic status fills (success / warning / error)
    status: {
      success:    ZS_GREEN[80],    // #0A6E5E — success / positive status fill
      warning:    ZS_AMBER[80],    // #8A640C — warning / caution status fill
      error:      ZS_RED[60],      // #C0392B — error / destructive action fill
      errorHover: ZS_RED[70],      // #A5322A — error fill hover
    },
  },

  // ── ai.gradient.* ───────────────────────────────────────────────────────
  gradient: {

    // ai.gradient.action.*             — gradient for interactive filled elements
    action: {
      full:      'linear-gradient(135deg, #657CEC 0%, #4D60E6 100%)',
      secondary: 'linear-gradient(135deg, #7F95F2 0%, #657CEC 50%, #4D60E6 100%)',
      start:     ZSAI[70],    // #657CEC
      mid:       ZSAI[80],    // #4D60E6
      end:       ZSAI[80],    // #4D60E6
    },

    // ai.gradient.surface.*            — page-level background gradients
    surface: {
      idle:    'linear-gradient(to bottom, #F3FCFE, #F9FAFB, #FFFFFF)',
      active:  'linear-gradient(to bottom, #FFFFFF 0%, #F5FBFC 55%, #EDF8FA 100%)',
      subtle:  'linear-gradient(135deg, #F5F6FF 0%, #D2DBFF 50%, #F5F6FF 100%)',
      neutral: 'linear-gradient(135deg, #F4F3F3 0%, #E8E7EA 100%)',
    },
  },

  // ── ai.shadow.* ─────────────────────────────────────────────────────────
  shadow: {

    // ai.shadow.action.*               — drop shadow for interactive/elevated elements
    action: {
      default:  'rgba(77, 96, 230, 0.18)',
      emphasis: 'rgba(77, 96, 230, 0.24)',
    },

    // ai.shadow.input.*                — composite shadow for the AI input card
    input: {
      default: '0 0 0 1.5px rgba(26,22,40,0.18), 0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.05)',
      focus:   '0 0 0 2px rgba(77,96,230,0.35), 0 12px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)',
    },

    // ai.shadow.field.*                — form field outline shadows
    field: {
      default: '0 0 0 1px #BECAFE',
      focus:   '0 0 0 2px #3544A4',
      warning: '0 0 0 1px #8A640C',
      error:   '0 0 0 1px #C0392B',
    },

    // ai.shadow.card.*                 — card elevation
    card: {
      default: '0 1px 4px 0 rgba(77, 96, 230, 0.10)',
      raised:  '0 4px 16px 0 rgba(77, 96, 230, 0.14)',
    },
  },

  // ── ai.radius.* ─────────────────────────────────────────────────────────
  // Scale names (xs/sm/md/lg/full) encode size intent, never raw pixels.
  radius: {
    xs:   '6px',    // tight — insight card accents
    sm:   '12px',   // small — badges, loader pills
    md:   '16px',   // medium — buttons, chips, input card in chat state
    lg:   '20px',   // large — input card in empty state, panels
    full: '100px',  // full-round — pill chips, "All Prompts" chip
  },

  // ── ai.motion.icon.* ────────────────────────────────────────────────────
  // Semantic motion aliases for the Motion Icon treatment layer.
  // Only used when state requires emphasis; default is no motion (none).
  // All timings respect prefers-reduced-motion (see AIIcon component).
  motion: {
    icon: {
      pulse:      { duration: '1200ms', easing: 'ease-in-out' },
      spin:       { duration: '900ms',  easing: 'linear'      },
      shimmer:    { duration: '1400ms', easing: 'ease-in-out' },
      nudge:      { duration: '220ms',  easing: 'ease-out'    },
      handoff:    { duration: '600ms',  easing: 'ease-in-out' },
      completion: { duration: '280ms',  easing: 'ease-out'    },
      alertRing:  { duration: '1000ms', easing: 'ease-out'    },
    },
  },

} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shared utilities (not color tokens)
// ─────────────────────────────────────────────────────────────────────────────
export const F = '"Open Sans", sans-serif';

// ─────────────────────────────────────────────────────────────────────────────
// ZDS — Standard ZAIDYN neutral tokens (separate namespace, never mix with AI.*)
// ─────────────────────────────────────────────────────────────────────────────
export const ZDS = {
  font:          F,
  textDefault:   '#2f2c3c',
  textHelper:    '#5b5864',
  textDisabled:  '#716e79',
  iconDefault:   '#5b5864',
  iconHover:     '#2f2c3c',
  menuHoverBg:   'rgba(178,176,182,0.4)',
  border:        '#B2B0B6',
  borderFunc:    '#5b5864',
  borderSubtle:  'var(--zs-border-neutral-subtle, #d5d3d8)',
  iconDisabled:  'var(--zs-icon-neutral-disabled, #c7c5cc)',
  surface:       'var(--zs-background-default, #ffffff)',
  textInverse:   'var(--zs-text-inverse, #ffffff)',
  inkBold:       'var(--zs-background-extra-bold, #1a1628)',
  lineDashed:    'var(--zs-node-connector-dashed-border-color, #9c9aa1)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Theme variant overrides
// The 'aqua' variant uses different surface gradients (ZDS teal-influenced).
// These are theme overrides of ai.gradient.surface.idle / active.
// ─────────────────────────────────────────────────────────────────────────────
export const AI_THEME = {
  default: {
    'gradient.surface.idle':   AI.gradient.surface.idle,
    'gradient.surface.active': AI.gradient.surface.active,
  },
  aqua: {
    // Override: idle state has more pronounced ZDS-teal ambient tint
    'gradient.surface.idle':   'linear-gradient(to bottom, #F3FCFE 0%, #F8FAFB 35%, #F4F3F3 70%, #FAFAFA 100%)',
    // Override: active state blends ZDS teal into the AI brand palette
    'gradient.surface.active': 'linear-gradient(to bottom, #FFFFFF 0%, #F4F3F3 40%, #EDF8FA 100%)',
    // Override: neutral ambient becomes teal-tinted (command-center aqua variant)
    'gradient.surface.neutral': 'linear-gradient(135deg, #E6F6F6 0%, #D0EFEF 100%)',
  },
} as const;
