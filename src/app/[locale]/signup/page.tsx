import { PageLoader } from '@/components/Loader/PageLoader.tsx';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

const SignupPage = dynamic(async () => await import('@/components/pages/AuthPage/SignupPage.tsx'), {
  loading: () => <PageLoader />,
});
export default function RegisterPage(): ReactNode {
  return <SignupPage />;
}
