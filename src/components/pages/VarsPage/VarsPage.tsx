'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import styles from './VarsPage.module.scss';

const VariablesForm = dynamic(async () => await import('@/components/VarsForm/VarsForm'), {
  ssr: false,
});

export default function VarsPage(): ReactNode {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Variables</h1>
      <VariablesForm />
    </div>
  );
}
