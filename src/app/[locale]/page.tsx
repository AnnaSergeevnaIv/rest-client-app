/* eslint-disable react-refresh/only-export-components */
import TestPage from '@/components/pages/TestPage/TestPage';
// import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'Rest Client App',
};

export default function HomePage(/*{ searchParams }: PropsWithAppSearchParams*/): ReactNode {
  return <TestPage />;
}
