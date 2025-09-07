'use client';

// import { store } from '@/redux/store/store.ts';
// import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
// import { Provider } from 'react-redux';
import { AppErrorBoundary } from './ErrorBoundary/AppErrorBoundary.tsx';

type ProvidersProps = PropsWithChildren & {
  locale?: string;
};
// const ThemeProvider = dynamic(
//   async () => await import('@components/ThemeProvider/ThemeProvider.tsx'),
//   { ssr: false },
// );

export default function ProvidersWrapper({ children }: ProvidersProps): ReactNode {
  return (
    <AppErrorBoundary>
      {/* <ThemeProvider> */}
      {/* <Provider store={store}> */}
      {children}
      {/* </Provider> */}
      {/* </ThemeProvider> */}
    </AppErrorBoundary>
  );
}
