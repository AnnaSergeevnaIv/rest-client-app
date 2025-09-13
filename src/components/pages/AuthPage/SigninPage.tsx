'use client';

import { RoutePath } from '@/common/constants/index.ts';
import { AuthForm } from '@/components/AuthForm/AuthForm.tsx';
import { Link } from '@/i18n/navigation.ts';
import type { ReactNode } from 'react';
import styles from './styles.module.scss';

const LINK_TEXT = 'Create account';
const SUBMIT_BTN_TEXT = 'Login';
const HEADING = 'Sign In';

export default function SigninPage(): ReactNode {
  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{HEADING}</h1>
        <AuthForm login submitLabel={SUBMIT_BTN_TEXT} />
        <div className={styles.hint}>
          <Link href={RoutePath.Signup}>{LINK_TEXT}</Link>
        </div>
      </div>
    </section>
  );
}
