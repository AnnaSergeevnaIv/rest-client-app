import { ERR_SOMETHING_WRONG } from '@/common/constants/index.ts';
import { JSONParse, showErrorToast } from '@/common/utils/index.ts';
import { hasOwnKeys } from '@/common/utils/type-guards.ts';
import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { useCallback, useEffect, useState } from 'react';
import type { QueryHistoryEntriesResult, RequestHistoryEntry } from './actions.ts';
import {
  addHistoryEntry,
  deleteHistoryEntry,
  queryHistoryEntries,
  resetQueryCursor,
} from './actions.ts';
import { isLikeQueryHistoryEntries } from './utils.ts';

const ERR_USER_EMAIL_NOT_SPECIFIED = "The current user's email is not specified";

type UseRequestHistoryResult = {
  hasNextPage: boolean;
  data: RequestHistoryEntry[];
  addEntry: (entry: RequestHistoryEntry) => Promise<string>;
  deleteEntry: (id: string) => Promise<string>;
  queryEntries: () => Promise<QueryHistoryEntriesResult>;
};

export const useRequestHistory = (): UseRequestHistoryResult => {
  const { currentUser } = useAuth();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [data, setData] = useState<RequestHistoryEntry[]>([]);

  const addEntry = useCallback(
    async (entry: RequestHistoryEntry) => {
      if (!currentUser?.email) {
        throw Error(ERR_USER_EMAIL_NOT_SPECIFIED);
      }
      const result = JSONParse(await addHistoryEntry(currentUser.email, entry));
      if (hasOwnKeys<{ id: string }>(result, 'id')) {
        return result.id;
      }
      if (hasOwnKeys<{ error: string }>(result, 'error')) {
        throw Error(result.error);
      }
      throw Error(ERR_SOMETHING_WRONG);
    },
    [currentUser?.email],
  );

  const deleteEntry = useCallback(
    async (id: string) => {
      if (!currentUser?.email) {
        throw Error(ERR_USER_EMAIL_NOT_SPECIFIED);
      }
      const result = JSONParse(await deleteHistoryEntry(currentUser.email, id));
      if (hasOwnKeys<{ id: string }>(result, 'id')) {
        return result.id;
      }
      if (hasOwnKeys<{ error: string }>(result, 'error')) {
        throw Error(result.error);
      }
      throw Error(ERR_SOMETHING_WRONG);
    },
    [currentUser?.email],
  );

  const queryEntries = useCallback(async () => {
    if (!currentUser?.email) {
      throw Error(ERR_USER_EMAIL_NOT_SPECIFIED);
    }
    const result = JSONParse(await queryHistoryEntries(currentUser.email));
    if (isLikeQueryHistoryEntries(result)) {
      return result;
    }
    if (hasOwnKeys<{ error: string }>(result, 'error')) {
      throw Error(result.error);
    }
    throw Error(ERR_SOMETHING_WRONG);
  }, [currentUser?.email]);

  useEffect(() => {
    void resetQueryCursor().then(() => {
      void queryEntries()
        .then(result => {
          setHasNextPage(result.done);
          setData(result.data);
        })
        .catch(showErrorToast);
    });
  }, [queryEntries]);

  return {
    hasNextPage,
    data,
    addEntry,
    deleteEntry,
    queryEntries,
  };
};
