import type { ReactNode } from 'react';
import { Loader } from './Loader.tsx';

export const PageLoader = (): ReactNode => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Loader style={{ margin: 'auto' }} />;
    </div>
  );
};
