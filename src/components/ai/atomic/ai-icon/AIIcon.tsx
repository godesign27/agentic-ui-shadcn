import React from 'react';
import { AI, ZDS, ZS_ORANGE, ZSAI_TAN, F } from '../../tokens/ai-tokens';

// ── ZDS Icon Path Registry ────────────────────────────────────────────────────
// Source: zsainc/9904PD0068_zds-ai-mirror · src/core/SVGs/
// All icons use 24×24 viewBox. fill="currentColor" applied at render time.
//
// FALLBACK PRIORITY:
//   1. [ZDS]   — path data confirmed from ZDS SVG source files (always prefer)
//   2. [Remix] — Remix Icons fallback when no ZDS equivalent exists.
//                Paths normalized to 24×24. Replace with ZDS when a match ships.
//                React: import from '@remixicon/react'. Angular: use ri-* CSS classes.
//
// Naming: use the short name (strip the "zs-icon-" prefix)

export type ZDSIconSource = 'zds' | 'remix-fallback';

interface IconEntry {
  d:        string;
  /** Opacity applied to the primary <path> (used for ring tracks etc). */
  opacity?: number;
  extra?:   { d: string; opacity?: number }[];  // additional <path> elements (multi-path icons)
  src:      ZDSIconSource;
  /** When true, render as an open stroked path instead of a filled shape. */
  stroke?:      boolean;
  strokeWidth?: number;  // defaults to 2 when stroke=true
}

export const ZDS_ICON_PATHS: Record<string, IconEntry> = {

  // ── 13_AI (ZDS) ────────────────────────────────────────────────────────────
  // AI sparkle / assistant identity icon (outline)
  'ai-assist': {
    src: 'zds',
    d: 'M10.6144 6.2254C10.277 5.4528 9.20776 5.4528 8.8704 6.2254L7.99275 8.23559C7.21171 10.0244 5.80589 11.4484 4.0523 12.2268L1.63658 13.2991C0.868536 13.64 0.868537 14.7573 1.63658 15.0982L3.97685 16.1371C5.77553 16.9355 7.20657 18.4122 7.97427 20.2621L8.8633 22.4043C9.19319 23.1992 10.2916 23.1992 10.6215 22.4043L11.5105 20.2621C12.2782 18.4122 13.7092 16.9355 15.5079 16.1371L17.8482 15.0982C18.6162 14.7573 18.6162 13.64 17.8482 13.2991L15.4325 12.2268C13.6789 11.4484 12.2731 10.0244 11.492 8.23559L10.6144 6.2254ZM4.53956 14.1987C6.8254 13.184 8.68402 11.5162 9.74238 9.2214C10.8008 11.5162 12.6594 13.184 14.9452 14.1987C12.6321 15.2254 10.7676 16.9745 9.74239 19.3101C8.71719 16.9745 6.85267 15.2254 4.53956 14.1987ZM19.4014 1.3311L19.6482 1.8968C20.0882 2.9054 20.8807 3.7085 21.8695 4.1478L22.6299 4.4857C23.0412 4.6684 23.0412 5.2661 22.6299 5.4488L21.9121 5.7678C20.8978 6.2184 20.0911 7.0512 19.6586 8.0941L19.4052 8.70539C19.2285 9.13139 18.6395 9.13139 18.4628 8.70539L18.2094 8.0941C17.777 7.0512 16.9703 6.2184 15.956 5.7678L15.2381 5.4488C14.8269 5.2661 14.8269 4.6684 15.2381 4.4857L15.9985 4.1478C16.9874 3.7085 17.7798 2.9054 18.2198 1.8968L18.4667 1.3311C18.6473 0.916997 19.2207 0.916997 19.4014 1.3311Z',
  },
  // AI sparkle / assistant identity icon (filled)
  'ai-assist-fill': {
    src: 'zds',
    d: 'M10.6144 6.2254L11.492 8.23559C12.2731 10.0244 13.6789 11.4484 15.4325 12.2268L17.8482 13.2991C18.6162 13.64 18.6162 14.7573 17.8482 15.0982L15.5079 16.1371C13.7092 16.9355 12.2782 18.4122 11.5105 20.2621L10.3985 22.4043C10.0686 23.1992 9.32989 23.1992 9 22.4043L7.97427 20.2621C7.20657 18.4122 5.77553 16.9355 3.97685 16.1371L1.63658 15.0982C0.868537 14.7573 0.868536 13.64 1.63658 13.2991L4.0523 12.2268C5.80589 11.4484 7.21171 10.0244 7.99275 8.23559L8.8704 6.2254C9.20776 5.4528 10.277 5.4528 10.6144 6.2254ZM19.4014 1.3311L19.6482 1.8968C20.0882 2.9054 20.8807 3.7085 21.8695 4.1478L22.6299 4.4857C23.0412 4.6684 23.0412 5.2661 22.6299 5.4488L21.9121 5.7678C20.8978 6.2184 20.0911 7.0512 19.6586 8.0941L19.4052 8.70539C19.2285 9.13139 18.6395 9.13139 18.4628 8.70539L18.2094 8.0941C17.777 7.0512 16.9703 6.2184 15.956 5.7678L15.2381 5.4488C14.8269 5.2661 14.8269 4.6684 15.2381 4.4857L15.9985 4.1478C16.9874 3.7085 17.7798 2.9054 18.2198 1.8968L18.4667 1.3311C18.6473 0.916996 19.2207 0.916996 19.4014 1.3311Z',
  },
  // AI prefilled — AI-generated content with document grid context
  'ai-prefilled': {
    src: 'zds',
    d: 'M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.89349 19.7058 0.89349 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z',
  },
  // AI warning — warning triangle with sparkle (outline)
  'ai-warning': {
    src: 'zds',
    d: 'M12.026 3.18067C12.2015 3.18067 12.3739 3.22687 12.526 3.31463C12.678 3.40239 12.8042 3.52862 12.892 3.68063L22.418 20.1807C22.5057 20.3327 22.5519 20.5051 22.5519 20.6807C22.5519 20.8562 22.5057 21.0286 22.418 21.1806C22.3302 21.3327 22.204 21.4589 22.052 21.5467C21.8999 21.6344 21.7275 21.6807 21.552 21.6807H2.49997L2.36914 21.6719C2.23952 21.6548 2.11395 21.6125 1.99998 21.5467C1.84797 21.4589 1.72173 21.3327 1.63397 21.1806C1.5462 21.0286 1.5 20.8562 1.5 20.6807C1.5 20.5051 1.54621 20.3327 1.63397 20.1807L11.16 3.68063C11.2477 3.52862 11.374 3.40239 11.526 3.31463C11.678 3.22687 11.8504 3.18067 12.026 3.18067ZM4.23197 19.6807H19.82L12.026 6.18063L4.23197 19.6807ZM13.026 18.6807H11.026V16.6807H13.026V18.6807ZM13.026 14.6807H11.026V9.68063H13.026V14.6807ZM18.5293 1.5C18.7058 1.07423 19.2941 1.07423 19.4706 1.5L19.7238 2.11096C20.2577 3.25552 21.0251 4.01376 21.9748 4.43599L22.6919 4.75482C23.1027 4.93742 23.1027 5.53479 22.6919 5.71739L21.9323 6.0551C20.8468 6.59521 20.1254 7.36008 19.7134 8.30487L19.4669 8.87026C19.2864 9.28414 18.7136 9.28414 18.5332 8.87026L18.2865 8.30487C17.847 7.29683 17.0555 6.49416 16.0676 6.0551L15.3081 5.71739C14.8973 5.53479 14.8973 4.93742 15.3081 4.75482L16.0252 4.43599C16.9749 4.01375 17.7423 3.25554 18.1904 2.30371L18.5293 1.5Z',
  },
  // AI warning — filled version (multi-path)
  'ai-warning-fill': {
    src: 'zds',
    d: 'M12.892 3.49996L22.418 20C22.5057 20.152 22.5519 20.3244 22.5519 20.5C22.5519 20.6755 22.5057 20.8479 22.418 20.9999C22.3302 21.152 22.204 21.2782 22.052 21.366C21.9 21.4537 21.7275 21.5 21.552 21.5H2.49997C2.32444 21.5 2.152 21.4537 1.99998 21.366C1.84797 21.2782 1.72173 21.152 1.63397 20.9999C1.5462 20.8479 1.5 20.6755 1.5 20.5C1.5 20.3244 1.54621 20.152 1.63397 20L11.16 3.49996C11.2477 3.34795 11.374 3.22172 11.526 3.13396C11.678 3.0462 11.8504 3 12.026 3C12.2015 3 12.3739 3.0462 12.526 3.13396C12.678 3.22172 12.8042 3.34795 12.892 3.49996ZM11.026 16.5V18.5H13.026V16.5H11.026ZM11.026 9.49996V14.5H13.026V9.49996H11.026Z',
    extra: [{ d: 'M19.4669 8.68959L19.7134 8.1242C20.1529 7.11616 20.9446 6.31349 21.9323 5.87443L22.6919 5.53672C23.1027 5.35412 23.1027 4.75675 22.6919 4.57415L21.9748 4.25532C20.9616 3.80497 20.1558 2.97262 19.7238 1.93029L19.4707 1.31933C19.2941 0.893557 18.7058 0.893557 18.5293 1.31933L18.2761 1.93029C17.8442 2.97262 17.0384 3.80497 16.0252 4.25532L15.3081 4.57415C14.8973 4.75675 14.8973 5.35412 15.3081 5.53672L16.0676 5.87443C17.0555 6.31349 17.847 7.11616 18.2865 8.1242L18.5332 8.68959C18.7136 9.10347 19.2864 9.10347 19.4669 8.68959Z' }],
  },

  // ── 01_Action (ZDS) ────────────────────────────────────────────────────────
  'search': {
    src: 'zds',
    d: 'M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z',
  },
  'bookmark': {
    src: 'zds',
    d: 'M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z',
  },
  'close': {
    src: 'zds',
    d: 'M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z',
  },
  'check': {
    src: 'zds',
    d: 'M9.99999 15.172L19.192 5.979L20.607 7.393L9.99999 18L3.63599 11.636L5.04999 10.222L9.99999 15.172Z',
  },

  // ── 02_Alerts (ZDS) ────────────────────────────────────────────────────────
  'error-circle': {
    src: 'zds',
    d: 'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z',
  },
  'error-triangle': {
    src: 'zds',
    d: 'M12.866 2.99999L22.392 19.5C22.4797 19.652 22.5259 19.8244 22.5259 20C22.5259 20.1755 22.4797 20.348 22.392 20.5C22.3042 20.652 22.178 20.7782 22.026 20.866C21.8739 20.9538 21.7015 21 21.526 21H2.47397C2.29844 21 2.126 20.9538 1.97398 20.866C1.82197 20.7782 1.69573 20.652 1.60797 20.5C1.5202 20.348 1.474 20.1755 1.474 20C1.474 19.8244 1.52021 19.652 1.60797 19.5L11.134 2.99999C11.2217 2.84798 11.348 2.72175 11.5 2.63399C11.652 2.54623 11.8244 2.50003 12 2.50003C12.1755 2.50003 12.3479 2.54623 12.5 2.63399C12.652 2.72175 12.7782 2.84798 12.866 2.99999ZM4.20597 19H19.794L12 5.49999L4.20597 19ZM11 16H13V18H11V16ZM11 8.99999H13V14H11V8.99999Z',
  },

  // ── Lucide fallbacks — normalized to 24×24 viewBox, documented, replacement-ready ───
  // [Remix]info-circle — no direct ZDS equivalent confirmed in 02_Alerts
  'info': {
    src: 'remix-fallback',
    d: 'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z',
  },
  // [Remix]check-circle — success / complete state
  'check-circle': {
    src: 'remix-fallback',
    d: 'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20ZM11.003 16L6.76 11.757L8.174 10.343L11.003 13.172L16.245 7.929L17.659 9.343L11.003 16Z',
  },
  // [Remix]thumbs-up — feedback helpful
  'thumbs-up': {
    src: 'remix-fallback',
    d: 'M14.3636 9.19247H20.1818C20.664 9.19247 21.1265 9.38403 21.4675 9.72501C21.8084 10.066 22 10.5284 22 11.0107V12.9234C22.0002 13.161 21.9539 13.3963 21.8636 13.6161L19.05 20.4479C18.9814 20.6145 18.8648 20.7569 18.7151 20.8571C18.5653 20.9573 18.3892 21.0107 18.2091 21.0107H2.90909C2.66798 21.0107 2.43675 20.9149 2.26627 20.7444C2.09578 20.5739 2 20.3427 2 20.1016V11.0107C2 10.7695 2.09578 10.5383 2.26627 10.3678C2.43675 10.1973 2.66798 10.1016 2.90909 10.1016H6.07454C6.22009 10.1016 6.36351 9.96673 6.49276 9.99978C6.622 9.93286 6.73329 9.83589 6.81727 9.71702L11.7745 2.69247C11.8372 2.60367 11.9296 2.54026 12.035 2.51374C12.1404 2.48722 12.2519 2.49935 12.3491 2.54793L13.9982 3.37247C14.4623 3.60444 14.833 3.98821 15.0488 4.46003C15.2647 4.93185 15.3125 5.46331 15.1845 5.96611L14.3636 9.19247ZM7.45455 11.5452V19.1925H17.6L20.1818 12.9234V11.0107H14.3636C14.0867 11.0106 13.8135 10.9473 13.5648 10.8256C13.316 10.7039 13.0984 10.527 12.9284 10.3084C12.7585 10.0897 12.6407 9.83519 12.5841 9.56413C12.5275 9.29307 12.5336 9.01266 12.6018 8.74429L13.4227 5.51884C13.4484 5.41823 13.4389 5.31185 13.3957 5.21741C13.3525 5.12297 13.2783 5.04615 13.1855 4.99975L12.5845 4.69975L8.30273 10.7652C8.07545 11.087 7.78454 11.3507 7.45455 11.5452ZM5.63636 11.9197H3.81818V19.1925H5.63636V11.9197Z',
  },
  // [Remix]thumbs-down — feedback unhelpful
  'thumbs-down': {
    src: 'remix-fallback',
    d: 'M9.63636 14.3182H3.81818C3.33597 14.3182 2.87351 14.1266 2.53253 13.7856C2.19156 13.4447 2 12.9822 2 12.5V10.5873C1.99976 10.3497 2.04608 10.1143 2.13636 9.89455L4.95 3.06273C5.01864 2.89617 5.13521 2.75375 5.28493 2.65356C5.43465 2.55337 5.61076 2.49992 5.79091 2.5H21.0909C21.332 2.5 21.5632 2.59578 21.7337 2.76627C21.9042 2.93675 22 3.16798 22 3.40909V12.5C22 12.7411 21.9042 12.9723 21.7337 13.1428C21.5632 13.3133 21.332 13.4091 21.0909 13.4091H17.9255C17.7799 13.4091 17.6365 13.444 17.5072 13.5109C17.378 13.5778 17.2667 13.6748 17.1827 13.7936L12.2255 20.8182C12.1628 20.907 12.0704 20.9704 11.965 20.9969C11.8596 21.0234 11.7481 21.0113 11.6509 20.9627L10.0018 20.1382C9.53773 19.9062 9.16697 19.5224 8.95115 19.0506C8.73534 18.5788 8.68745 18.0473 8.81545 17.5445L9.63636 14.3182ZM16.5455 11.9655V4.31818H6.4L3.81818 10.5873V12.5H9.63636C9.91327 12.5 10.1865 12.5633 10.4352 12.685C10.684 12.8067 10.9016 12.9837 11.0716 13.2023C11.2415 13.4209 11.3593 13.6755 11.4159 13.9465C11.4725 14.2176 11.4664 14.498 11.3982 14.7664L10.5773 17.9918C10.5516 18.0924 10.5611 18.1988 10.6043 18.2932C10.6474 18.3877 10.7217 18.4645 10.8145 18.5109L11.4155 18.8109L15.6973 12.7455C15.9245 12.4236 16.2155 12.16 16.5455 11.9655ZM18.3636 11.5909H20.1818V4.31818H18.3636V11.5909Z',
  },
  // [Remix]share
  'share': {
    src: 'remix-fallback',
    d: 'M13.12 17.023L8.92101 14.733C8.3728 15.3191 7.66099 15.7267 6.87808 15.9029C6.09517 16.0791 5.27736 16.0157 4.53093 15.721C3.7845 15.4263 3.14397 14.914 2.69258 14.2504C2.24118 13.5869 1.9998 12.803 1.9998 12.0005C1.9998 11.198 2.24118 10.4141 2.69258 9.75055C3.14397 9.08704 3.7845 8.57465 4.53093 8.27996C5.27736 7.98527 6.09517 7.92191 6.87808 8.09811C7.66099 8.27431 8.3728 8.68193 8.92101 9.268L13.121 6.978C12.8826 6.03407 12.9966 5.03559 13.4416 4.1697C13.8867 3.30381 14.6323 2.62998 15.5387 2.2745C16.445 1.91902 17.4499 1.9063 18.365 2.23873C19.2801 2.57116 20.0425 3.22591 20.5093 4.08026C20.9762 4.9346 21.1154 5.92989 20.9009 6.87954C20.6864 7.8292 20.133 8.66803 19.3442 9.23881C18.5555 9.80958 17.5857 10.0731 16.6166 9.97999C15.6475 9.88687 14.7456 9.44351 14.08 8.733L9.88001 11.023C10.0412 11.6644 10.0412 12.3356 9.88001 12.977L14.079 15.267C14.7446 14.5565 15.6465 14.1131 16.6156 14.02C17.5847 13.9269 18.5545 14.1904 19.3432 14.7612C20.132 15.332 20.6854 16.1708 20.8999 17.1205C21.1144 18.0701 20.9752 19.0654 20.5083 19.9197C20.0415 20.7741 19.2791 21.4288 18.364 21.7613C17.4489 22.0937 16.444 22.081 15.5377 21.7255C14.6313 21.37 13.8857 20.6962 13.4406 19.8303C12.9956 18.9644 12.8816 17.9659 13.12 17.022V17.023Z',
  },
  // [Remix]copy
  'copy': {
    src: 'remix-fallback',
    d: 'M7 6V3C7 2.44772 7.44772 2 8 2H20C20.5523 2 21 2.44772 21 3V17C21 17.5523 20.5523 18 20 18H17V21C17 21.5523 16.5523 22 16 22H4C3.44772 22 3 21.5523 3 21V7C3 6.44772 3.44772 6 4 6H7ZM9 6H16C16.5523 6 17 6.44772 17 7V16H19V4H9V6ZM5 8V20H15V8H5Z',
  },
  // [Remix]tag / save label
  'tag': {
    src: 'remix-fallback',
    d: 'M10.9042 2.10006L20.8037 5.1941L23.8978 15.0936L13.0784 25.9131L2.08325 14.918L10.9042 2.10006ZM11.5758 4.75L4.74371 14.2218L13.7713 23.2495L22.243 13.9952L20.0684 6.92473L11.5758 4.75ZM13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12ZM12 8.5C13.9330 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5Z',
  },
  // [Remix]volume / read aloud
  'volume': {
    src: 'remix-fallback',
    d: 'M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.4089 11.3846 20.4499 11.5 20.4499C11.7761 20.4499 12 20.2261 12 19.9499V4.0498C12 3.9344 11.959 3.8225 11.8821 3.7332C11.704 3.5292 11.3894 3.5062 11.1834 3.6841L5.88889 8.0001H2C1.44772 8.0001 1 8.4478 1 9.0001V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.2923 21.5539 18.2512 19.2497 20.2854L17.8033 18.8389C19.7274 17.1614 21 14.7237 21 12C21 9.2763 19.7274 6.8386 17.8033 5.1612L19.2497 3.7148C21.5539 5.7489 23 8.7077 23 12ZM16.7 8.7C17.8144 9.7604 18.5 11.2997 18.5 13C18.5 14.6997 17.8144 16.2396 16.7 17.3L15.2535 15.8535C15.9612 15.1458 16.5 14.1299 16.5 13C16.5 11.8701 15.9612 10.8542 15.2535 10.1465L16.7 8.7Z',
  },
  // [Remix]refresh / sync (processing — with arrowheads)
  'refresh': {
    src: 'remix-fallback',
    d: 'M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z',
  },
  // Spinner — matches AILoadingIndicators ring (faint full track + bright top+right arc).
  // Renders two concentric stroked paths so the arc reads as a partial-color spinner
  // identical to the CSS border-spinner used in src/app/components/ai/atomic/loading-indicator/AILoadingIndicators.tsx.
  'spinner': {
    src:         'remix-fallback',
    stroke:      true,
    strokeWidth: 2.25,
    // Full ring at low opacity (the "track") — two half-arcs both sweeping clockwise
    d:           'M12 3 A9 9 0 1 1 11.999 3 Z',
    opacity:     0.25,
    // Quarter arc top + right (12 o'clock → 3 o'clock), clockwise
    extra: [
      { d: 'M12 3 A9 9 0 0 1 21 12' },
    ],
  },
  // [Remix]clock / waiting / pending
  'clock': {
    src: 'remix-fallback',
    d: 'M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z',
  },
  // [Remix]database / data source
  'database': {
    src: 'remix-fallback',
    d: 'M11 4C8.79086 4 7 5.34315 7 7C7 8.65685 8.79086 10 11 10C13.2091 10 15 8.65685 15 7C15 5.34315 13.2091 4 11 4ZM5 7C5 4.23858 7.68629 2 11 2C14.3137 2 17 4.23858 17 7V17C17 19.7614 14.3137 22 11 22C7.68629 22 5 19.7614 5 17V7ZM7 9.82929C7.62745 10.5507 8.73096 11 11 11C13.269 11 14.3725 10.5507 15 9.82929V12.8293C14.3725 13.5507 13.269 14 11 14C8.73096 14 7.62745 13.5507 7 12.8293V9.82929ZM7 14.8293C7.62745 15.5507 8.73096 16 11 16C13.269 16 14.3725 15.5507 15 14.8293V17C15 18.6569 13.2091 20 11 20C8.79086 20 7 18.6569 7 17V14.8293Z',
  },
  // [Remix]user / agent identity
  'user': {
    src: 'remix-fallback',
    d: 'M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11ZM12 13C8.13401 13 5 16.134 5 20H19C19 16.134 15.866 13 12 13Z',
  },
  // [Remix]users / multi-agent
  'users': {
    src: 'remix-fallback',
    d: 'M9.33333 11C11.5425 11 13.3333 9.20914 13.3333 7C13.3333 4.79086 11.5425 3 9.33333 3C7.12419 3 5.33333 4.79086 5.33333 7C5.33333 9.20914 7.12419 11 9.33333 11ZM9.33333 13C5.2688 13 2 16.2688 2 20.3333H16.6667C16.6667 16.2688 13.3979 13 9.33333 13ZM14.6667 11C16.5076 11 18 9.50762 18 7.66667C18 5.82572 16.5076 4.33333 14.6667 4.33333C14.0764 4.33333 13.5217 4.4966 13.0517 4.7798C13.4882 5.66538 13.7333 6.65962 13.7333 7.71C13.7333 8.6924 13.5063 9.62302 13.1006 10.4564C13.5852 10.8107 14.1885 11 14.6667 11ZM17.4714 13.3534C18.9183 14.3649 19.9167 15.9745 20.1533 17.8333H22V20.3333H17.5C17.5 19.0476 17.3261 17.8029 16.9994 16.6249C16.5981 15.2233 15.8883 13.9683 14.9681 12.9289C15.4536 12.7069 15.9803 12.5628 16.5333 12.5265C16.8731 12.5089 17.2151 12.5521 17.5328 12.6527L17.4714 13.3534Z',
  },
  // [Remix]shield-check / governance / approval
  'shield-check': {
    src: 'remix-fallback',
    d: 'M12 1L21.5 5.5V11C21.5 16.1086 17.2823 20.7811 12 22C6.71772 20.7811 2.5 16.1086 2.5 11V5.5L12 1ZM12 3.311L4.5 7.0619V11C4.5 15.0606 7.82211 18.9268 12 20.0005C16.1779 18.9268 19.5 15.0606 19.5 11V7.0619L12 3.311ZM16.4874 9L17.9 10.4126L11.2 17.1126L7.1 13.0126L8.5126 11.6L11.2 14.2873L16.4874 9Z',
  },
  // [Remix]flag / escalation
  'flag': {
    src: 'remix-fallback',
    d: 'M12.9999 5H20.9999C21.5522 5 21.9999 5.44772 21.9999 6V16C21.9999 16.5523 21.5522 17 20.9999 17H12.9999V21H10.9999V3H12.9999V5ZM12.9999 7V15H19.9999V7H12.9999ZM1.99988 6L6.99988 6V18L1.99988 18V6Z',
  },
  // [Remix]history / memory
  'history': {
    src: 'remix-fallback',
    d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C9.29614 22 6.85234 20.9371 5.06887 19.2001L6.4904 17.7785C7.90878 19.1498 9.85573 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C8.31087 4 5.22456 6.52046 4.27981 9.92718L6.99988 9.92718L3.49988 14.9272L-0.000122070 9.92718H2.24338C3.2711 5.42174 7.26332 2 12 2ZM13 12V7H11V13L16.2427 15.6213L17.1213 14.0071L13 12Z',
  },
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type AIIconTreatment =
  | 'neutral'        // utility, metadata, low-emphasis
  | 'ai'             // AI identity, agent activity, generated output
  | 'ai-contained'   // contained — rounded square bg + brand glyph
  | 'semantic'       // status-based color from tone prop
  | 'orange-signal'  // escalation, pending, stale data
  | 'tan-container'  // companion surface container
  | 'category';      // category-tinted tile — rounded square, tinted bg + matching glyph

export type AIIconTone =
  | 'default' | 'subtle' | 'strong' | 'inverse'
  | 'success' | 'warning' | 'error' | 'urgent'
  | 'blocked' | 'approval' | 'escalated';

// Category tones for the `category` treatment — used to distinguish
// resource / asset / file / bundle types where each item has a visual
// identity but no semantic meaning (unlike `semantic`, which encodes state).
export type AIIconCategoryTone =
  | 'teal'      // brand — tokens, primitives
  | 'magenta'   // design — palettes, themes
  | 'green'     // code — global css, plugins
  | 'violet'    // docs — typography, guides
  | 'indigo'    // patterns — skills, prompts
  | 'blue'      // rules — cursor, lint
  | 'yellow';   // archives — zips, bundles

const CATEGORY_TONE_PAIRS: Record<AIIconCategoryTone, { bg: string; fg: string }> = {
  teal:    { bg: '#E6F7F7', fg: '#0F8B8B' },
  magenta: { bg: '#FCE9F4', fg: '#B8388B' },
  green:   { bg: '#E6F7EE', fg: '#0A6E5E' },
  violet:  { bg: '#F1E9FC', fg: '#7A3EC4' },
  indigo:  { bg: '#EAE9FC', fg: '#4B44C4' },
  blue:    { bg: '#E6F0FB', fg: '#1F6FCB' },
  yellow:  { bg: '#FFF6E1', fg: '#8A640C' },
};

export type AIIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AIIconMotion =
  | 'none'
  | 'pulse'              // waiting for review, active AI presence
  | 'spin'               // processing, loading
  | 'shimmer'            // AI generating, retrieving
  | 'nudge'              // new notification, new suggestion
  | 'handoff-trail'      // agent handoff
  | 'completion-settle'  // success, applied, saved
  | 'alert-ring';        // action required, escalation

export type AIIconMotionState =
  | 'idle' | 'active' | 'attention' | 'processing'
  | 'handoff' | 'complete' | 'blocked' | 'escalated';

export interface AIIconProps {
  name:                 string;
  size?:                AIIconSize;
  treatment?:           AIIconTreatment;
  tone?:                AIIconTone;
  categoryTone?:        AIIconCategoryTone;
  container?:           boolean;
  label?:               string;
  decorative?:          boolean;
  motion?:              AIIconMotion;
  motionLoop?:          boolean;
  style?:               React.CSSProperties;
}

// ── Size map (px) ─────────────────────────────────────────────────────────────
// Aligned with ZDS: normal=16 (sm), large=20 (md), x-large=24 (lg)
const SIZE_PX: Record<AIIconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

// Container padding (px) and border-radius
const CONTAINER_PAD: Record<AIIconSize, number> = {
  xs: 4, sm: 6, md: 7, lg: 8, xl: 10,
};
const CONTAINER_RADIUS: Record<AIIconSize, number> = {
  xs: 6, sm: 8, md: 10, lg: 12, xl: 14,
};

// ── Treatment → color resolver ────────────────────────────────────────────────

const SEMANTIC_TONE_COLORS: Record<AIIconTone, string> = {
  default:   AI.color.action.primary,
  subtle:    AI.color.text.secondary,
  strong:    AI.color.brandStrong,
  inverse:   '#ffffff',
  success:   '#0A6E5E',  // ZDS success default
  warning:   '#8A640C',  // ZDS warning default
  error:     '#B21111',  // ZDS error default
  urgent:    '#C0392B',
  blocked:   '#7D3C98',
  approval:  '#1A5276',
  escalated: ZS_ORANGE[70],
};

function resolveColor(treatment: AIIconTreatment, tone: AIIconTone, categoryTone: AIIconCategoryTone): string {
  switch (treatment) {
    case 'neutral':       return ZDS.textHelper;
    case 'ai':            return AI.color.brand;
    case 'ai-contained':  return AI.color.brand;
    case 'semantic':      return SEMANTIC_TONE_COLORS[tone];
    case 'orange-signal': return ZS_ORANGE[60];
    case 'tan-container': return ZSAI_TAN[100];
    case 'category':      return CATEGORY_TONE_PAIRS[categoryTone].fg;
  }
}

function resolveContainerBg(treatment: AIIconTreatment, tone: AIIconTone, categoryTone: AIIconCategoryTone): string {
  switch (treatment) {
    case 'ai-contained':  return AI.color.brandSubtle; // #D2DBFF — brand container tint
    case 'tan-container': return ZSAI_TAN['00'];
    case 'semantic':      return SEMANTIC_TONE_COLORS[tone] + '14'; // ~8% tint
    case 'orange-signal': return ZS_ORANGE['00'];
    case 'category':      return CATEGORY_TONE_PAIRS[categoryTone].bg;
    default:              return 'rgba(0,0,0,0.05)';
  }
}

// ── Motion keyframes (injected once) ─────────────────────────────────────────

const MOTION_STYLES = `
  @keyframes ai-icon-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.55; transform: scale(0.94); }
  }
  @keyframes ai-icon-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ai-icon-shimmer {
    0%, 100% { opacity: 0.35; }
    50%      { opacity: 1; }
  }
  @keyframes ai-icon-nudge {
    0%, 100% { transform: translateY(0); }
    35%      { transform: translateY(-3px); }
    65%      { transform: translateY(-1px); }
  }
  @keyframes ai-icon-handoff {
    0%   { opacity: 0.25; transform: translateX(-5px); }
    60%  { opacity: 1;    transform: translateX(0); }
    100% { opacity: 1;    transform: translateX(0); }
  }
  @keyframes ai-icon-settle {
    0%   { opacity: 0;    transform: scale(0.65) rotate(-12deg); }
    70%  { transform: scale(1.08) rotate(3deg); }
    100% { opacity: 1;    transform: scale(1) rotate(0); }
  }
  @keyframes ai-icon-ring {
    0%   { box-shadow: 0 0 0 0 currentColor; opacity: 0.5; }
    60%  { box-shadow: 0 0 0 7px transparent; opacity: 0; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ai-icon-anim { animation: none !important; }
  }
`;

interface MotionConfig {
  animation:  string;
  iterations: number | 'infinite';
}

const MOTION_CONFIG: Record<AIIconMotion, MotionConfig | null> = {
  'none':               null,
  'pulse':              { animation: 'ai-icon-pulse 1200ms ease-in-out',         iterations: 'infinite' },
  'spin':               { animation: 'ai-icon-spin 900ms linear',                iterations: 'infinite' },
  'shimmer':            { animation: 'ai-icon-shimmer 1400ms ease-in-out',       iterations: 'infinite' },
  'nudge':              { animation: 'ai-icon-nudge 220ms ease-out',             iterations: 1 },
  'handoff-trail':      { animation: 'ai-icon-handoff 600ms ease-in-out',        iterations: 1 },
  'completion-settle':  { animation: 'ai-icon-settle 280ms ease-out',            iterations: 1 },
  'alert-ring':         { animation: 'ai-icon-ring 1000ms ease-out',             iterations: 2 },
};

// ── AIIcon ────────────────────────────────────────────────────────────────────

export function AIIcon({
  name,
  size      = 'md',
  treatment = 'neutral',
  tone      = 'default',
  categoryTone = 'teal',
  container = false,
  label,
  decorative = false,
  motion    = 'none',
  motionLoop = false,
  style,
}: AIIconProps) {
  const icon    = ZDS_ICON_PATHS[name];
  const px      = SIZE_PX[size];
  const color   = resolveColor(treatment, tone, categoryTone);
  const motCfg  = MOTION_CONFIG[motion];
  const doContainer = container || treatment === 'ai-contained' || treatment === 'tan-container' || treatment === 'category';

  if (!icon) {
    return (
      <span
        role="img"
        aria-label={label ?? `Unknown icon: ${name}`}
        style={{ display: 'inline-flex', width: px, height: px, ...style }}
      />
    );
  }

  const iterations = motionLoop ? 'infinite' : (motCfg?.iterations ?? 1);
  const animStr    = motCfg
    ? `${motCfg.animation} ${typeof iterations === 'number' ? iterations : 'infinite'}`
    : undefined;

  const isStroke   = !!icon.stroke;
  const strokeProp = isStroke
    ? { fill: 'none', stroke: 'currentColor', strokeWidth: icon.strokeWidth ?? 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    : {};
  const svgEl = (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill={isStroke ? 'none' : 'currentColor'}
      aria-hidden={decorative || !!label ? 'true' : undefined}
      role={!decorative && !label ? 'img' : undefined}
      aria-label={!decorative && !doContainer ? label : undefined}
      style={{ flexShrink: 0, display: 'block' }}
    >
      <path d={icon.d} opacity={icon.opacity} {...strokeProp} />
      {icon.extra?.map((p, i) => <path key={i} d={p.d} opacity={p.opacity} {...strokeProp} />)}
    </svg>
  );

  if (doContainer) {
    const pad    = CONTAINER_PAD[size];
    const radius = CONTAINER_RADIUS[size];
    const bgColor = resolveContainerBg(treatment, tone, categoryTone);
    return (
      <>
        <style>{MOTION_STYLES}</style>
        <span
          role={label ? 'img' : undefined}
          aria-label={label}
          aria-hidden={decorative ? 'true' : undefined}
          className={animStr ? 'ai-icon-anim' : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: px + pad * 2,
            height: px + pad * 2,
            borderRadius: radius,
            background: bgColor,
            color,
            flexShrink: 0,
            animation: treatment === 'alert-ring' ? animStr : undefined,
            ...style,
          }}
        >
          <span
            className={animStr && treatment !== 'alert-ring' ? 'ai-icon-anim' : undefined}
            style={{
              display: 'flex',
              animation: animStr && treatment !== 'alert-ring' ? animStr : undefined,
            }}
          >
            {svgEl}
          </span>
        </span>
      </>
    );
  }

  return (
    <>
      <style>{MOTION_STYLES}</style>
      <span
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={decorative ? 'true' : undefined}
        className={animStr ? 'ai-icon-anim' : undefined}
        style={{
          display: 'inline-flex',
          color,
          flexShrink: 0,
          animation: animStr,
          ...style,
        }}
      >
        {svgEl}
      </span>
    </>
  );
}

export default AIIcon;
