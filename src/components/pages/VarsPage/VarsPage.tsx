'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import styles from './VarsPage.module.scss';
import { useTranslations } from 'next-intl';

const VariablesForm = dynamic(async () => await import('@/components/VarsForm/VarsForm'), {
  ssr: false,
});

export default function VarsPage(): ReactNode {
  const tVars = useTranslations('VariablesPage');
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{tVars('heading')}</h1>
      <VariablesForm />
    </div>
  );
}
