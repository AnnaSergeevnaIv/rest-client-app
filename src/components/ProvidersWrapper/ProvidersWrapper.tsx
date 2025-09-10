'use client';

import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppErrorBoundary } from './ErrorBoundary/AppErrorBoundary.tsx';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};

const AuthProvider = dynamic(async () => await import('./AuthProvider/AuthProvider.tsx'), {
  ssr: false,
});

export default function ProvidersWrapper({ children }: ProvidersProps): ReactNode {
  return (
    <AppErrorBoundary>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer autoClose={1500} position='top-center' hideProgressBar={true} />
    </AppErrorBoundary>
  );
}
