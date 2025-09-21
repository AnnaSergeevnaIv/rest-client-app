import { RoutePath } from '@/common/constants/index.ts';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPageGlobal({ style }: { style?: CSSProperties }): ReactNode {
  return (
    <div className={styles.wrapper} style={style}>
      <Image src='/404.jpg' alt='Page not found' width={180} height={0}></Image>
      <span>Are you lost?</span>
      <Link href={RoutePath.Home} className={styles.link}>
        Go Home
      </Link>
    </div>
  );
}
