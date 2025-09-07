import { AppLocales, RoutePath } from '@/common/constants/index.ts';
import { RedirectBtn } from '@/components/NavButton/RedirectBtn.tsx';
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
        <div
          style={{
            display: 'flex',
            padding: '40px',
            minWidth: '200px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            margin: '24px auto',
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
          }}
        >
          <p>Are you lost?</p>
          <RedirectBtn to={RoutePath.Home}>Go Home</RedirectBtn>
        </div>
      </body>
    </html>
  );
}
