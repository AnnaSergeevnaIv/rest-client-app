import { PageLoader } from '@/components/Loader/PageLoader.tsx';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const SigninPage = dynamic(async () => await import('@/components/pages/AuthPage/SigninPage.tsx'), {
  loading: () => <PageLoader />,
});
export default function LoginPage(): ReactNode {
  return <SigninPage />;
}
