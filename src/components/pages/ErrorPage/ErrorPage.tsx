import { RoutePath } from '@/common/constants/index.ts';
import { NavBtn } from '@/components/NavButton/NavBtn.tsx';
import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPage(): ReactNode {
  return (
    <div className={styles.wrapper}>
      <Image src='/404.jpg' alt='Page not found' width={180} height={0}></Image>
      <span>Page not found</span>
      <NavBtn href={RoutePath.Home} text='Go Home' />
    </div>
  );
}
