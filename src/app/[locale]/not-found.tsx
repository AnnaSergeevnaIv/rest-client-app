import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function NotFound(): ReactNode {
  const messages = useMessages();
  const locale = useLocale();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <p>Page not found</p>
    </NextIntlClientProvider>
  );
}
