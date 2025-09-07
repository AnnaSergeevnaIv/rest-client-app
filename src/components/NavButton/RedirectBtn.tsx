'use client';

import clsx from 'clsx';
import { redirect } from 'next/navigation';
import type { PropsWithChildren, ReactNode } from 'react';
import styles from './styles.module.scss';

type NavButtonProps = PropsWithChildren & {
  className?: string;
  text?: string;
  to: string;
};
export const RedirectBtn = ({ className, text, to, children }: NavButtonProps): ReactNode => {
  return (
    <button className={clsx(styles.btn, className)} onClick={() => redirect(to)}>
      {children}
      {text}
    </button>
  );
};
