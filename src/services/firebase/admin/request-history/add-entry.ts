import { ERR_SOMETHING_WRONG } from '@/common/constants/index.ts';
import { JSONParse } from '@/common/utils/index.ts';
import { hasOwnKeys } from '@/common/utils/type-guards.ts';
import type { UserPartial } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import type { RequestHistoryEntry } from './actions.ts';
import { addHistoryEntry } from './actions.ts';
import { ERR_USER_EMAIL_NOT_SPECIFIED } from './useRequestHistoryQuery.ts';

export const addRequestHistoryEntry = async (
  currentUser: UserPartial | null,
  entry: RequestHistoryEntry,
): Promise<string> => {
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
};
