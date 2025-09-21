import { PageLoader } from '@/components/Loader/PageLoader.tsx';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const VarsPage = dynamic(async () => await import('@/components/pages/VarsPage/VarsPage'), {
  loading: () => <PageLoader />,
});
export default function Vars(): ReactNode {
  return <VarsPage />;
}
