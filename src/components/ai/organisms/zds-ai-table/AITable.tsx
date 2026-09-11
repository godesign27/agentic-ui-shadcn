import React from 'react';
import { ZdsTable, type ZdsTableProps } from './zds-table';

export type AITableProps = Omit<ZdsTableProps, 'theme'>;

/**
 * ZDS AI Table — AI-branded ZDS component (theme="ai" by default).
 */
export function AITable(props: AITableProps) {
  return <ZdsTable theme="ai" {...props} />;
}

export default AITable;
