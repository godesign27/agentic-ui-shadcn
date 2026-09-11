import React from 'react';
import { DSFileUpload, type DSFileUploadProps } from './ds-file-upload';

export type AIFileUploadProps = Omit<DSFileUploadProps, 'theme'>;

/**
 * DS AI File Upload — AI-branded DS component (theme="ai" by default).
 */
export function AIFileUpload(props: AIFileUploadProps) {
  return <DSFileUpload theme="ai" {...props} />;
}

export default AIFileUpload;
