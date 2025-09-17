'use client';

import { IconLogout } from '@/common/constants/icons.ts';
import { RoutePath } from '@/common/constants/index.ts';

import { LangSwitcher } from '@/components/LangSwitcher/LangSwitcher.tsx';
import { Button } from '@/components/UI/Button/Button.tsx';
import { Link, usePathname } from '@i18n/navigation.ts';
import clsx from 'clsx';
import Image from 'next/image';
import { type ReactNode } from 'react';
import styles from './Header.module.scss';
import { useLogoutButton } from './hooks/useLogoutButton.ts';
import { useStickyHeader } from './hooks/useStickyHeader.ts';

const LOGO_PROPS = { src: '/logo.png', alt: 'app logo' };
const ICON_SIZE = 16;
const LinkText = {
  Signin: 'Sign in',
  Signup: 'Sign up',
  Logout: 'Logout',
  Home: 'Home',
  History: 'History',
  Variables: 'Variables',
  Client: 'REST client',
} as const;

export const Header = (): ReactNode => {
  const { logout, isAuth, loggingOut, currentUser } = useLogoutButton();
  const { isSticky } = useStickyHeader({ scrollThreshold: 70 });
  const pathname = usePathname();

  return (
    <header className={clsx(styles.header, isSticky && styles.sticky)}>
      <div className={styles.wrapper}>
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
        <nav className={styles.nav}>
          {!isAuth && (
            <>
              <Link
                className={styles.link}
                href={RoutePath.Signin}
                data-disable={pathname.includes(RoutePath.Signin)}
              >
                {LinkText.Signin}
              </Link>
              <Link
                className={styles.link}
                href={RoutePath.Signup}
                data-disable={pathname.includes(RoutePath.Signup)}
              >
                {LinkText.Signup}
              </Link>
            </>
          )}
          {isAuth && (
            <>
              <div className={styles['nav-group']}>
                <Link
                  className={styles.link}
                  href={RoutePath.Client}
                  data-disable={pathname.includes(RoutePath.Client)}
                >
                  {LinkText.Client}
                </Link>
                <Link
                  className={styles.link}
                  href={RoutePath.Variables}
                  data-disable={pathname.includes(RoutePath.Variables)}
                >
                  {LinkText.Variables}
                </Link>
                <Link
                  className={styles.link}
                  href={RoutePath.History}
                  data-disable={pathname.includes(RoutePath.History)}
                >
                  {LinkText.History}
                </Link>
              </div>
              <Link
                className={styles.link}
                href={RoutePath.Home}
                data-disable={pathname === RoutePath.Home}
              >
                {LinkText.Home}
              </Link>
            </>
          )}
          <LangSwitcher />
          {isAuth && (
            <Button
              className={styles.logout}
              label={LinkText.Logout}
              title={currentUser?.email ?? ''}
              onClick={logout}
              loading={loggingOut}
            >
              <IconLogout size={ICON_SIZE} />
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
