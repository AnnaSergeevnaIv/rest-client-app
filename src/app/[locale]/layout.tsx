import AppLayout from '@components/AppLayout/AppLayout';
import ProvidersWrapper from '@components/ProvidersWrapper/ProvidersWrapper.tsx';
import { routing } from '@i18n/routing';
import '@styles/global.scss';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Open_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

const ROOT_ID = 'root';

const geist = Open_Sans({
  subsets: ['latin'],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<ReactNode> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={geist.className} data-scroll-behavior='smooth'>
      <body>
        <div id={ROOT_ID}>
          <ProvidersWrapper>
            <NextIntlClientProvider>
              <AppLayout>{children}</AppLayout>
            </NextIntlClientProvider>
          </ProvidersWrapper>
        </div>
      </body>
    </html>
  );
}
