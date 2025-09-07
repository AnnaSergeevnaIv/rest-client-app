import { Header } from '@/components/AppLayout/components/Header/Header.tsx';
import type { PropsWithChildren, ReactNode } from 'react';
import { Footer } from './components/Footer/Footer.tsx';

export default function AppLayout({ children }: PropsWithChildren): ReactNode {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
