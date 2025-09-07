import { AppLocales } from '@/common/constants/index.ts';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export default function RootPage(): ReactNode {
  redirect(`/${AppLocales.EN}`);
}
