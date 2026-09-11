import React from 'react';
import { ZdsBreadcrumbs, type ZdsBreadcrumbsProps } from './zds-breadcrumbs';

export type AIBreadcrumbsProps = Omit<ZdsBreadcrumbsProps, 'theme'>;

/**
 * ZDS AI Breadcrumbs — AI-branded ZDS component (theme="ai" by default).
 */
export function AIBreadcrumbs(props: AIBreadcrumbsProps) {
  return <ZdsBreadcrumbs theme="ai" {...props} />;
}

export default AIBreadcrumbs;
