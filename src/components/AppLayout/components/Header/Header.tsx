'use client';

import { IconLogout } from '@/common/constants/icons.ts';
import { RoutePath } from '@/common/constants/index.ts';
import { LangSwitcher } from '@/components/LangSwitcher/LangSwitcher.tsx';
import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { Button } from '@/components/UI/Button/Button.tsx';
import { Link, redirect, usePathname } from '@i18n/navigation.ts';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useCallback, type ReactNode } from 'react';
import styles from './Header.module.scss';

const LOGO_PROPS = { src: '/logo.png', alt: 'app logo' };
const ICON_SIZE = 16;
const LinkText = {
  Signin: 'Sign in',
  Signup: 'Sign up',
  Logout: 'Logout',
  Home: 'Home',
  History: 'History',
  Variables: 'Variables',
} as const;

export const Header = (): ReactNode => {
  const { isAuth, signout } = useAuth();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLogout = useCallback((): void => {
    void signout().then(() => redirect({ href: RoutePath.Signin, locale }));
  }, [locale, signout]);

  return (
    <header className={styles.header}>
      <Link href={RoutePath.Home}>
        <Image
          {...LOGO_PROPS}
          className={styles.image}
          width={0}
          height={0}
          priority
          sizes='100vw'
        />
      </Link>
      <div className={styles.group}>
        {!isAuth && (
          <>
            <Link
              className={styles.link}
              href={RoutePath.Signin}
              data-disable={!RoutePath.Signin.localeCompare(pathname)}
            >
              {LinkText.Signin}
            </Link>
            <Link
              className={styles.link}
              href={RoutePath.Signup}
              data-disable={!RoutePath.Signup.localeCompare(pathname)}
            >
              {LinkText.Signup}
            </Link>
          </>
        )}
        {isAuth && (
          <>
            <Link
              className={styles.link}
              href={RoutePath.Variables}
              data-disable={!RoutePath.Variables.localeCompare(pathname)}
            >
              {LinkText.Variables}
            </Link>
            <Link
              className={styles.link}
              href={RoutePath.History}
              data-disable={!RoutePath.History.localeCompare(pathname)}
            >
              {LinkText.History}
            </Link>
            <Link
              className={styles.link}
              href={RoutePath.Home}
              data-disable={!RoutePath.Home.localeCompare(pathname)}
            >
              {LinkText.Home}
            </Link>
          </>
        )}
        <LangSwitcher />
        {isAuth && (
          <Button className={styles.logout} label={LinkText.Logout} onClick={handleLogout}>
            <IconLogout size={ICON_SIZE} />
          </Button>
        )}
      </div>
    </header>
  );
};
