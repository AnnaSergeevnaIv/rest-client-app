import { PageLoader } from '@/components/Loader/PageLoader.tsx';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const HistoryPage = dynamic(
  async () => await import('@/components/pages/HistoryPage/HistoryPage.tsx'),
  {
    loading: () => <PageLoader />,
  },
);
export default function History(): ReactNode {
  return <HistoryPage />;
}
