import ErrorPage from '@pages/ErrorPage/ErrorPage.tsx';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function NotFound(): ReactNode {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorPage />
    </NextIntlClientProvider>
  );
}
