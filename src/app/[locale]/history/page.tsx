import { Loader } from '@/components/Loader/Loader.tsx';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const HistoryPage = dynamic(() => import('@/components/pages/HistoryPage/HistoryPage.tsx'), {
  loading: () => <Loader />,
});
export default function History(): ReactNode {
  return <HistoryPage />;
}
