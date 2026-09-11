import React from 'react';
import { DSTable, type DSTableProps } from './ds-table';

export type AITableProps = Omit<DSTableProps, 'theme'>;

/**
 * DS AI Table — AI-branded DS component (theme="ai" by default).
 */
export function AITable(props: AITableProps) {
  return <DSTable theme="ai" {...props} />;
}

export default AITable;
