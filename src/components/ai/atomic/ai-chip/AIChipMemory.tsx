/**
 * @deprecated Prefer `<AIChip kind="memory" variant=… label=… />`.
 * Thin compatibility wrapper kept for existing imports (showcase, package index).
 */
import React from 'react';
import { AIChip, type MemoryVariant } from './AIChip';

export type { MemoryVariant };

export interface AIChipMemoryProps {
  variant: MemoryVariant;
  label: string;
  size?: 'sm' | 'md';
}

export function AIChipMemory({ variant, label, size }: AIChipMemoryProps) {
  return <AIChip kind="memory" variant={variant} label={label} size={size} />;
}

export default AIChipMemory;
