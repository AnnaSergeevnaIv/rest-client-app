'use client';

import { Button } from '@/components/UI/Button/Button.tsx';
import {
  deleteHistoryEntry,
  type RequestHistoryEntry,
} from '@/services/firebase/admin/request-history/actions.ts';
import { useState, type ReactNode } from 'react';
import { EntryCard } from '../EntryCard/EntryCard.tsx';
import styles from './EntriesList.module.scss';

const ITEMS_PER_PAGE = 5;

type EntriesListProps = {
  data: RequestHistoryEntry[];
};

export const EntriesList = ({ data }: EntriesListProps): ReactNode => {
  const [page, setPage] = useState(1);
  const [shownData, setShownData] = useState([...data]);
  const [deletingId, setDeletingId] = useState('');

  const handleDeleteClick = (id: string): void => {
    setDeletingId(id);
    void deleteHistoryEntry(id)
      .then(() => {
        setShownData(shownData.filter(entry => entry.id !== id));
      })
      .finally(() => {
        setDeletingId('');
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {shownData.slice(0, page * ITEMS_PER_PAGE).map(entry => {
          const isBeingDeleted = deletingId === entry.id;
          return (
            <EntryCard
              data={entry}
              key={entry.id}
              onDelete={handleDeleteClick}
              deleting={isBeingDeleted}
              style={{
                backgroundColor: isBeingDeleted ? 'var(--color-accent-5)' : 'var(--color-bg)',
              }}
            />
          );
        })}
      </div>
      {ITEMS_PER_PAGE * page < shownData.length && (
        <Button
          label='Load more'
          onClick={() => {
            setPage(page + 1);
          }}
        />
      )}
    </div>
  );
};
