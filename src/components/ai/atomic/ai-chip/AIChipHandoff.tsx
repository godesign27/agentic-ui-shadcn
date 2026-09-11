/**
 * @deprecated Prefer `<AIChip kind="handoff" direction=… fromLabel=… toLabel=… />`.
 * Thin compatibility wrapper kept for existing imports (showcase, package index).
 */
import React from 'react';
import { AIChip, type HandoffDirection } from './AIChip';

export type { HandoffDirection };

export interface AIChipHandoffProps {
  direction: HandoffDirection;
  fromLabel: string;
  toLabel: string;
  size?: 'sm' | 'md';
}

export function AIChipHandoff({ direction, fromLabel, toLabel, size }: AIChipHandoffProps) {
  return <AIChip kind="handoff" direction={direction} fromLabel={fromLabel} toLabel={toLabel} size={size} />;
}

export default AIChipHandoff;
