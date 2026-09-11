// AIAction was merged into AIButton — the multi-button action row pattern now
// lives in the same file as the button atom it composes. This shim re-exports
// the public surface so legacy import paths keep working; new code should
// import directly from './AIButton'.

export {
  AIAction,
  type AIActionProps,
  type AIActionStatus,
  type AIActionSize,
  type AIActionLayout,
  type AIActionRadius,
} from './AIButton';

export { AIAction as default } from './AIButton';
