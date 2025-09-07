import { RoutePath } from '@/common/constants/index.ts';
import { LangSwitcher } from '@/components/LangSwitcher/LangSwitcher.tsx';
import { Link } from '@i18n/navigation.ts';
import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './Header.module.scss';

export const Header = (): ReactNode => {
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
      <LangSwitcher />
    </header>
  );
};
