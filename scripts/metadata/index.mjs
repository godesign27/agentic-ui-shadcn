/**
 * Curated metadata index.
 *
 * Merges the per-category modules into one lookup keyed by component name.
 * Mechanical facts are merged in at build time by scripts/lib/extract-facts.mjs.
 */
import { forms } from './forms.mjs'
import { overlays } from './overlays.mjs'
import { display } from './display.mjs'
import { navigation } from './navigation.mjs'
import { ai } from './ai.mjs'
import { ai2 } from './ai2.mjs'
import { ai3 } from './ai3.mjs'

export const metadata = { ...forms, ...overlays, ...display, ...navigation, ...ai, ...ai2, ...ai3 }

export const CATEGORIES = {
  Forms: 'Input collection and submission',
  Overlay: 'Surfaces that float above the page',
  Navigation: 'Moving between views and sections',
  Layout: 'Structure and spatial organization',
  'Data Display': 'Presenting information at rest',
  Feedback: 'System status and response',
  Disclosure: 'Progressive reveal of content',
  AI: 'AI-native surfaces',
}
