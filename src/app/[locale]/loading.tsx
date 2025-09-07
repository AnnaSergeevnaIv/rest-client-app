import { Loader } from '@/components/Loader/Loader.tsx';
import type { ReactNode } from 'react';

export default function Loading(): ReactNode {
  return <Loader style={{ margin: 'auto' }} />;
}
