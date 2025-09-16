import { Loader } from '@/components/Loader/Loader.tsx';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const VarsPage = dynamic(() => import('@/components/pages/VarsPage/VarsPage'), {
  loading: () => <Loader />,
});
export default function Vars(): ReactNode {
  return <VarsPage />;
}
