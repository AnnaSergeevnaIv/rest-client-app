import { RoutePath } from '@/common/constants/index.ts';
import { AuthForm } from '@/components/AuthForm/AuthForm.tsx';
import { Link } from '@/i18n/navigation.ts';
import type { ReactNode } from 'react';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

export default function SignupPage(): ReactNode {
  const tSignup = useTranslations('SignupPage');

  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{tSignup('heading')}</h1>
        <AuthForm submitLabel={tSignup('register')} />
        <div className={styles.hint}>
          {tSignup('alreadyHaveAccount')}
          <Link className={styles.link} href={RoutePath.Signin}>
            {tSignup('signIn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
