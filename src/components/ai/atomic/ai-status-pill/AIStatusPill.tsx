/**
 * @deprecated Prefer `<AIChip kind="status" tone=… label=… />`.
 * Thin compatibility wrapper kept for existing imports (showcase, package index).
 */
import React from 'react';
import { AIChip, type AIStatusPillTone } from '../ai-chip/AIChip';

export type { AIStatusPillTone };

export interface AIStatusPillProps {
  label: string;
  tone?: AIStatusPillTone;
  size?: 'sm' | 'md';
  showIndicator?: boolean;
  onDark?: boolean;
}

export function AIStatusPill({ label, tone, size, showIndicator, onDark }: AIStatusPillProps) {
  return (
    <AIChip kind="status" label={label} tone={tone} size={size} showIndicator={showIndicator} onDark={onDark} />
  );
}

export default AIStatusPill;
