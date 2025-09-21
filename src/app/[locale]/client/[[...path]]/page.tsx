import { PageLoader } from '@/components/Loader/PageLoader.tsx';
import dynamic from 'next/dynamic';

const DynamicClient = dynamic(async () => await import('@/components/pages/Client/Client'), {
  loading: () => <PageLoader />,
});
export default function ClientPage(): React.ReactNode {
  return <DynamicClient />;
}
