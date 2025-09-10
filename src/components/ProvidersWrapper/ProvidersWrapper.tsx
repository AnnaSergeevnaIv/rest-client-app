'use client';

// import { store } from '@/redux/store/store.ts';
// import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
// import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AppErrorBoundary } from './ErrorBoundary/AppErrorBoundary.tsx';
import { FormContext } from '@/contexts/FormContext/FormContext.tsx';
import { useFormProvider } from '@/hooks/useFormProvider.tsx';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};
// const ThemeProvider = dynamic(
//   async () => await import('@components/ThemeProvider/ThemeProvider.tsx'),
//   { ssr: false },
// );

export default function ProvidersWrapper({ children }: ProvidersProps): ReactNode {
  const formProvider = useFormProvider();
  return (
    <AppErrorBoundary>
      <FormContext.Provider value={formProvider}>
        {/* <ThemeProvider> */}
        {/* <Provider store={store}> */}
        {children}
        {/* </Provider> */}
        {/* </ThemeProvider> */}
      </FormContext.Provider>
      <ToastContainer autoClose={1500} position='top-center' hideProgressBar={true} />
    </AppErrorBoundary>
  );
}
