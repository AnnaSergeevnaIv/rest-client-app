import { RoutePath } from '@/common/constants/index.ts';
import { getAllHistoryEntries } from '@/services/firebase/admin/request-history/actions';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { type ReactNode } from 'react';
import { EntriesList } from './components/EntriesList/EntriesList.tsx';
import styles from './HistoryPage.module.scss';

export default async function HistoryPage(): Promise<ReactNode> {
  const t = await getTranslations('HistoryPage');
  const data = await getAllHistoryEntries();
  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{t('heading')}</h1>
        {data && <EntriesList data={data} />}
        {!data && (
          <div className={styles.hint}>
            <p>{t('hint')}</p>
            <Link href={RoutePath.Client} className={styles.link}>
              {t('navBtn')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
