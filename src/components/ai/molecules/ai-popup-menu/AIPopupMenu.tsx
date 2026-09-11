/**
 * AIPopupMenu — thin re-export from AIMenu (Make ships both in one module).
 * Keeps a dedicated package path for `./AIPopupMenu` consumers.
 */
export {
  AIMenu,
  AIPopupMenu,
  type AIMenuItem,
  type AIMenuProps,
  type AIMenuSize,
  type AIPopupMenuProps,
} from '../ai-menu/AIMenu';

export { AIPopupMenu as default } from '../ai-menu/AIMenu';
