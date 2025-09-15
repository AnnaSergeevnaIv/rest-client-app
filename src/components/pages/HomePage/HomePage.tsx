'use client';

import { RoutePath } from '@/common/constants';
import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext';
import { Link } from '@i18n/navigation';
import { type ReactNode } from 'react';
import styles from './HomePage.module.scss';
import AboutUsPage from '../AboutUsPage/AboutUsPage';

export default function HomePage(): ReactNode {
  const { currentUser } = useAuth();
  const isAuth = Boolean(currentUser);

  return (
    <section className={styles.main}>
      {!isAuth ? (
        <div className={styles.guest}>
          <h1 className={styles.heading}>Welcome!</h1>
          <div className={styles.nav}>
            <Link href={RoutePath.Signin} className={styles.link}>
              Sign In
            </Link>
            <Link href={RoutePath.Signup} className={styles.link}>
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.user}>
          <h1 className={styles.heading}>
            Welcome back,{' '}
            <span className={styles.email}>{currentUser?.displayName ?? currentUser?.email}</span>
          </h1>
          <nav className={styles.nav}>
            <Link href={RoutePath.Client} className={styles.link}>
              REST Client
            </Link>
            <Link href={RoutePath.History} className={styles.link}>
              History
            </Link>
            <Link href={RoutePath.Variables} className={styles.link}>
              Variables
            </Link>
          </nav>
        </div>
      )}
      <AboutUsPage />
    </section>
  );
}
