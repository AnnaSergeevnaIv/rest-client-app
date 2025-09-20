import { RoutePath } from '@/common/constants/index.ts';
import { AuthForm } from '@/components/AuthForm/AuthForm.tsx';
import { Link } from '@/i18n/navigation.ts';
import type { ReactNode } from 'react';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

export default function SigninPage(): ReactNode {
  const tAuth = useTranslations('AuthPage');
  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{tAuth('signin')}</h1>
        <AuthForm login submitLabel={tAuth('login')} />
        <div className={styles.hint}>
          <Link href={RoutePath.Signup}>{tAuth('createAccount')}</Link>
        </div>
      </div>
    </section>
  );
}
