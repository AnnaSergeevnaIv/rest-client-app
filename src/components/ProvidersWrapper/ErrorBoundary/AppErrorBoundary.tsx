'use client';

import type { PropsWithChildren, ReactNode } from 'react';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';

export default function AppErrorBoundary({ children }: PropsWithChildren): ReactNode {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}
