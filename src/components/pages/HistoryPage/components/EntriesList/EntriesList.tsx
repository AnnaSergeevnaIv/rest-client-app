'use client';

import { Button } from '@/components/UI/Button/Button.tsx';
import {
  deleteAllHistoryEntries,
  type RequestHistoryEntry,
} from '@/services/firebase/admin/request-history/actions.ts';
import { useTranslations } from 'next-intl';
import { useTransition, type ReactNode } from 'react';
import { EntryCard } from '../EntryCard/EntryCard.tsx';
import styles from './EntriesList.module.scss';

type EntriesListProps = {
  data: RequestHistoryEntry[];
};

export const EntriesList = ({ data }: EntriesListProps): ReactNode => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('EntriesList');

  const handleDeleteAll = (): void => {
    startTransition(async () => {
      await deleteAllHistoryEntries();
    });
  };
  return (
    <div className={styles.wrapper}>
      <Button
        label={t('deleteAll')}
        className={styles.btn}
        onClick={handleDeleteAll}
        loading={isPending}
      />
      <div className={styles.cards}>
        {data.map(entry => {
          return <EntryCard data={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};
