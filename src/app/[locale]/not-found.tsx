import { RoutePath } from '@/common/constants/index.ts';
import { NavBtn } from '@/components/NavButton/NavBtn.tsx';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import Image from 'next/image';
import type { ReactNode } from 'react';

export default function NotFound(): ReactNode {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          backgroundColor: 'var(--color-body-bg)',
          padding: '2rem',
        }}
      >
        <Image
          src='/error.jpg'
          alt='Page not found'
          width={700}
          height={550}
          style={{
            borderRadius: 'var(--border-radius)',
            objectFit: 'cover',
            boxShadow: 'var(--box-shadow)',
          }}
          priority
        />
        <NavBtn href={RoutePath.Home} text='Go Home' />
      </div>
    </NextIntlClientProvider>
  );
}
