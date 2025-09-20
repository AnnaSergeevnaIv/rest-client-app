import { RoutePath } from '@/common/constants/index.ts';
import { NavBtn } from '@/components/NavButton/NavBtn.tsx';
import { getAllHistoryEntries } from '@/services/firebase/admin/request-history/actions';
import { type ReactNode } from 'react';
import styles from './HistoryPage.module.scss';
import { EntriesList } from './components/EntriesList/EntriesList.tsx';

export default async function HistoryPage(): Promise<ReactNode> {
  const data = await getAllHistoryEntries();
  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Request history</h1>
        {data && <EntriesList data={data} />}
        {!data && (
          <div className={styles.hint}>
            <p>It is empty here. Go to the REST client page and make your first request.</p>
            <NavBtn text='REST client' href={RoutePath.Client} />
          </div>
        )}
      </div>
    </section>
  );
}
