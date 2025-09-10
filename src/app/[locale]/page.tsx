/* eslint-disable react-refresh/only-export-components */
// import TestPage from '@/components/pages/TestPage/TestPage.tsx';
// import TestPage from '@/components/pages/TestPage/TestPage';
// import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
//import { RoutePath } from '@/common/constants/index.ts';
//import { redirect } from '@/i18n/navigation.ts';
// import SigninPage from '@pages/SigninPage/SigninPage.tsx';
import type { Metadata } from 'next';
//import { useLocale } from 'next-intl';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'Rest Client App',
};

export default function HomePage(/*{ searchParams }: PropsWithAppSearchParams*/): ReactNode {
  //const locale = useLocale();
  //redirect({ href: RoutePath.Signin, locale });

  return <>Home page</>;
}
