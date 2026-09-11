/**
 * @deprecated Prefer `<AIChip kind="brief" status=… label=… />`.
 * Thin compatibility wrapper kept for existing imports (package index).
 */
import React from 'react';
import { AIChip, type BriefChipStatus } from './AIChip';

export type { BriefChipStatus };

export interface AIChipBriefProps {
  status?: BriefChipStatus;
  label: string;
  size?: 'sm' | 'md';
  accentColor?: string;
  accentBg?: string;
  noDot?: boolean;
  icon?: string | React.ReactNode;
}

export type AIBriefChipProps = AIChipBriefProps;

export function AIChipBrief(props: AIChipBriefProps) {
  return <AIChip kind="brief" {...props} />;
}

/** Alias used by package barrel exports. */
export const AIBriefChip = AIChipBrief;

export default AIChipBrief;
