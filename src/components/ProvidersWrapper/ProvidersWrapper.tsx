'use client';

import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
import type { ToastContainerProps } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { AppErrorBoundary } from './ErrorBoundary/AppErrorBoundary.tsx';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};

const ToastOptions: ToastContainerProps = {
  autoClose: 1500,
  position: 'top-center',
  hideProgressBar: true,
};
const AuthProvider = dynamic(
  async () => await import('@components/ProvidersWrapper/AuthProvider/AuthProvider.tsx'),
);
export default function ProvidersWrapper({ children, locale }: ProvidersProps): ReactNode {
  return (
    <AppErrorBoundary>
      <AuthProvider locale={locale}>{children}</AuthProvider>
      <ToastContainer {...ToastOptions} />
    </AppErrorBoundary>
  );
}
