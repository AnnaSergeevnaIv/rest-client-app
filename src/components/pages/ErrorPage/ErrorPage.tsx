import { RoutePath } from '@/common/constants/index.ts';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPage(): ReactNode {
  const t = useTranslations('ErrorPage');
  return (
    <div className={styles.wrapper}>
      <Image src='/404.jpg' alt='Page not found' width={180} height={0}></Image>
      <span>{t('notFound')}</span>
      <Link href={RoutePath.Home} className={styles.link}>
        {t('home')}
      </Link>
    </div>
  );
}
