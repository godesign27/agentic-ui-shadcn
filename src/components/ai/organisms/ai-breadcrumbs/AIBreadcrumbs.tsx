import React from 'react';
import { DSBreadcrumbs, type DSBreadcrumbsProps } from './ds-breadcrumbs';

export type AIBreadcrumbsProps = Omit<DSBreadcrumbsProps, 'theme'>;

/**
 * DS AI Breadcrumbs — AI-branded DS component (theme="ai" by default).
 */
export function AIBreadcrumbs(props: AIBreadcrumbsProps) {
  return <DSBreadcrumbs theme="ai" {...props} />;
}

export default AIBreadcrumbs;
