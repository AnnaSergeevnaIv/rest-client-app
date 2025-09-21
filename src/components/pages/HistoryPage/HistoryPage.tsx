import { RoutePath } from '@/common/constants/index.ts';
import { NavBtn } from '@/components/NavButton/NavBtn.tsx';
import { getAllHistoryEntries } from '@/services/firebase/admin/request-history/actions';
import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';
import { EntryCard } from './components/EntryCard/EntryCard.tsx';
import styles from './HistoryPage.module.scss';

export default async function HistoryPage(): Promise<ReactNode> {
  const t = await getTranslations('HistoryPage');
  const data = await getAllHistoryEntries();
  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{t('heading')}</h1>
        {data &&
          data.map(entry => {
            return <EntryCard data={entry} key={entry.id} />;
          })}
        {!data && (
          <div className={styles.hint}>
            <p>{t('hint')}</p>
            <NavBtn text={t('navBtn')} href={RoutePath.Client} />
          </div>
        )}
      </div>
    </section>
  );
}
