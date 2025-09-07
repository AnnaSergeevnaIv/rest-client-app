import { RoutePath } from '@/common/constants/index.ts';
import { NavBtn } from '@/components/NavButton/NavBtn.tsx';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function NotFound(): ReactNode {
  const messages = useMessages();
  const locale = useLocale();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <p>Page not found</p>
      <NavBtn href={RoutePath.Home} text='Go Home' />
    </NextIntlClientProvider>
  );
}
