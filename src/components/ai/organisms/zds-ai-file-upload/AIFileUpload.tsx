import React from 'react';
import { ZdsFileUpload, type ZdsFileUploadProps } from './zds-file-upload';

export type AIFileUploadProps = Omit<ZdsFileUploadProps, 'theme'>;

/**
 * ZDS AI File Upload — AI-branded ZDS component (theme="ai" by default).
 */
export function AIFileUpload(props: AIFileUploadProps) {
  return <ZdsFileUpload theme="ai" {...props} />;
}

export default AIFileUpload;
