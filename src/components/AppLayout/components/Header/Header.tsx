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

const LinkText = {
  Signin: 'Sign in',
  Signup: 'Sign up',
  Logout: 'Logout',
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
          className={styles.image}
          src='/logo.png'
          alt='logo'
          width={0}
          height={0}
          priority
          sizes='100vw'
        />
      </Link>
      <div className={styles.group}>
        {!isAuth && (
          <Link
            className={styles.link}
            href={RoutePath.Signin}
            data-disable={!RoutePath.Signin.localeCompare(pathname)}
          >
            {LinkText.Signin}
          </Link>
        )}
        {!isAuth && (
          <Link
            className={styles.link}
            href={RoutePath.Signup}
            data-disable={!RoutePath.Signup.localeCompare(pathname)}
          >
            {LinkText.Signup}
          </Link>
        )}
        {isAuth && (
          <Button label={LinkText.Logout} onClick={handleLogout}>
            <IconLogout size={16} />
          </Button>
        )}
        <LangSwitcher />
      </div>
    </header>
  );
};
