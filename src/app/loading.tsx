import { AppLocales } from '@/common/constants/index.ts';
import { Loader } from '@/components/Loader/Loader.tsx';
import type { ReactNode } from 'react';

export default function Loading(): ReactNode {
  return (
    <html lang={AppLocales.EN}>
      <body>
        <Loader style={{ margin: 'auto' }} />;
      </body>
    </html>
  );
}
