'use client';

import { RoutePath } from '@/common/constants';
import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext';
import { Link } from '@i18n/navigation';
import { type ReactNode } from 'react';
import styles from './HomePage.module.scss';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import { useTranslations } from 'next-intl';

export default function HomePage(): ReactNode {
  const { currentUser } = useAuth();
  const isAuth = Boolean(currentUser);
  const tCommon = useTranslations('Common');
  return (
    <section className={styles.main}>
      {!isAuth ? (
        <div className={styles.guest}>
          <h1 className={styles.heading}>Welcome!</h1>
          <div className={styles.nav}>
            <Link href={RoutePath.Signin} className={styles.link}>
              {tCommon('signin')}
            </Link>
            <Link href={RoutePath.Signup} className={styles.link}>
              {tCommon('signup')}
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.user}>
          <h1 className={styles.heading}>
            {tCommon('greeting')} {currentUser?.displayName || currentUser?.email}
          </h1>
          <nav className={styles.nav}>
            <Link href={RoutePath.Client} className={styles.link}>
              {tCommon('client')}
            </Link>
            <Link href={RoutePath.History} className={styles.link}>
              {tCommon('history')}
            </Link>
            <Link href={RoutePath.Variables} className={styles.link}>
              {tCommon('variables')}
            </Link>
          </nav>
        </div>
      )}
      <AboutUsPage />
    </section>
  );
}
