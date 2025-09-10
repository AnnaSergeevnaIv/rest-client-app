'use client';

import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppErrorBoundary } from './ErrorBoundary/AppErrorBoundary.tsx';
import { FormContext } from '@/contexts/FormContext/FormContext.tsx';
import { useFormProvider } from '@/hooks/useFormProvider.tsx';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};

const AuthProvider = dynamic(async () => await import('./AuthProvider/AuthProvider.tsx'), {
  ssr: false,
});

export default function ProvidersWrapper({ children }: ProvidersProps): ReactNode {
  const formProvider = useFormProvider();
  return (
    <AppErrorBoundary>
<FormContext.Provider value={formProvider}>
      <AuthProvider>
{children}
</AuthProvider>
<FormContext.Provider value={formProvider}>
      <ToastContainer autoClose={1500} position='top-center' hideProgressBar={true} />
    </AppErrorBoundary>
  );
}
