import { RoutePath } from '@/common/constants/index.ts';
// import { NavBtn } from '@/components/NavButton/NavBtn.tsx';
import { RedirectBtn } from '@/components/NavButton/RedirectBtn.tsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPage(): ReactNode {
  const t = useTranslations('ErrorPage');
  return (
    <div className={styles.wrapper}>
      <Image src='/404.jpg' alt='Page not found' width={180} height={0}></Image>
      <span>{t('notFound')}</span>
      <RedirectBtn text={t('home')} to={RoutePath.Home} />
      {/* <NavBtn href={RoutePath.Home} text={t('home')} /> */}
    </div>
  );
}
