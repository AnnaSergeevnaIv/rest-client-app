import { AppLocales } from '@/common/constants/index.ts';
import ErrorPageGlobal from '@pages/ErrorPage/ErrorPageGlobal.tsx';
import type { ReactNode } from 'react';

export default function NotFoundGlobal(): ReactNode {
  return (
    <html lang={AppLocales.EN}>
      <body
        style={{
          display: 'flex',
          backgroundColor: 'var(--color-body-bg)',
        }}
      >
        <ErrorPageGlobal style={{ marginTop: 40 }} />
      </body>
    </html>
  );
}
