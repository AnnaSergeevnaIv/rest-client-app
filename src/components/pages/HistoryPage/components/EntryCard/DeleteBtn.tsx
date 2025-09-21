'use client';

import { Loader } from '@/components/Loader/Loader.tsx';
import { Button } from '@/components/UI/Button/Button.tsx';
import { CLEAR_BTN_TEXT } from '@/components/UI/Input/Input.tsx';
import { deleteHistoryEntry } from '@/services/firebase/admin/request-history/actions.ts';
import { useTransition, type ReactNode } from 'react';
import styles from './EntryCard.module.scss';

export const DeleteBtn = ({ id }: { id: string }): ReactNode => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (): void => {
    startTransition(async () => {
      await deleteHistoryEntry(id);
    });
  };
  return (
    <Button variant='default' className={styles.remove} onClick={handleDelete}>
      {isPending ? <Loader size={20} /> : CLEAR_BTN_TEXT}
    </Button>
  );
};
