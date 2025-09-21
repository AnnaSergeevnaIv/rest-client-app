import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import styles from './VarsPage.module.scss';

const VariablesForm = dynamic(async () => await import('@/components/VarsForm/VarsForm'));

export default function VarsPage(): ReactNode {
  const t = useTranslations('VariablesPage');
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{t('heading')}</h1>
      <VariablesForm />
    </div>
  );
}
