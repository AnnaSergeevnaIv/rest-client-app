import { Loader } from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';

const DynamicClient = dynamic(() => import('@/components/pages/Client/Client'), {
  loading: () => <Loader />,
});
export default function ClientPage(): React.ReactNode {
  return <DynamicClient />;
}
