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
import HomePage from '@/components/pages/HomePage/HomePage';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'Rest Client App',
};

export default function Home(): ReactNode {
  return <HomePage />;
}
