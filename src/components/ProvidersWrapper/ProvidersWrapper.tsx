'use client';

import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
import type { ToastContainerProps } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};

const ToastOptions: ToastContainerProps = {
  autoClose: 1000,
  position: 'top-left',
  hideProgressBar: true,
};
const AuthProvider = dynamic(
  async () => await import('@components/ProvidersWrapper/AuthProvider/AuthProvider.tsx'),
);
const AppErrorBoundary = dynamic(async () => await import('./ErrorBoundary/AppErrorBoundary.tsx'));

export default function ProvidersWrapper({ children, locale }: ProvidersProps): ReactNode {
  return (
    <AppErrorBoundary>
      <AuthProvider locale={locale}>{children}</AuthProvider>
      <ToastContainer {...ToastOptions} />
    </AppErrorBoundary>
  );
}
