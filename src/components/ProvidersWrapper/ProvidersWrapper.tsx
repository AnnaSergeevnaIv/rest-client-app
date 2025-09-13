'use client';

import type { PropsWithChildren, ReactNode } from 'react';
import type { ToastContainerProps } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './AuthProvider/AuthProvider.tsx';
import { AppErrorBoundary } from './ErrorBoundary/AppErrorBoundary.tsx';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};

const ToastOptions: ToastContainerProps = {
  autoClose: 1500,
  position: 'top-center',
  hideProgressBar: true,
};

export default function ProvidersWrapper({ children, locale }: ProvidersProps): ReactNode {
  return (
    <AppErrorBoundary>
      <AuthProvider locale={locale}>{children}</AuthProvider>
      <ToastContainer {...ToastOptions} />
    </AppErrorBoundary>
  );
}
