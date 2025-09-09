import { RoutePath } from '@/common/constants/index.ts';
import { AuthForm } from '@/components/AuthForm/AuthForm.tsx';
import { Link } from '@/i18n/navigation.ts';
import type { ReactNode } from 'react';
import styles from './styles.module.scss';

const HINT = 'Already have an account?';
const LINK_TEXT = 'Sign in';
const SUBMIT_BTN_TEXT = 'Register';
const HEADING = 'Sign Up';

export default function SignupPage(): ReactNode {
  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{HEADING}</h1>
        <AuthForm signup submitText={SUBMIT_BTN_TEXT} />
        <div className={styles.hint}>
          {HINT}
          <Link className={styles.link} href={RoutePath.Signin}>
            {LINK_TEXT}
          </Link>
        </div>
      </div>
    </section>
  );
}
