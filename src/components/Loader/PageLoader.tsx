import type { ReactNode } from 'react';
import { Loader } from './Loader.tsx';

export const PageLoader = (): ReactNode => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Loader style={{ margin: 'auto' }} />;
    </div>
  );
};
