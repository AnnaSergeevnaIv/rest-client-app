import { PageLoader } from '@/components/Loader/PageLoader';
import dynamic from 'next/dynamic';

const DynamicClient = dynamic(() => import('@/components/pages/Client/Client'), {
  loading: () => <PageLoader />,
});
export default function ClientPage(): React.ReactNode {
  return <DynamicClient />;
}
