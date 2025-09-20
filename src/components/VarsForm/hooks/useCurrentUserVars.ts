/* eslint-disable max-len */
import { StorageKey } from '@/common/constants/index.ts';
import { isObject, JSONParse } from '@/common/utils/index.ts';
import type { PropsWithCurrentUser } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { useCallback } from 'react';
import type { ParsedVars } from '../VarsForm.utils.ts';
import { isLikePersistedVarsFormData, parseVarFieldsArray } from '../VarsForm.utils.ts';

export type UseCurrentUserVarsResult = {
  getFromLocalStorage: () => ParsedVars | null;
  apply: (s: string) => string;
};

export const useCurrentUserVars = ({
  currentUser,
}: PropsWithCurrentUser): UseCurrentUserVarsResult => {
  const getFromLocalStorage = useCallback((): ParsedVars | null => {
    if (!currentUser?.email) {
      return null;
    }
    const allVars = JSONParse(localStorage.getItem(StorageKey.Vars));
    if (!isObject(allVars)) {
      return null;
    }
    const userVars = allVars[currentUser.email];
    return isLikePersistedVarsFormData(userVars) ? parseVarFieldsArray(userVars.vars) : null;
  }, [currentUser?.email]);

  const apply = useCallback(
    (source: string): string => {
      const persistedVars = getFromLocalStorage()?.plainObject;
      if (!persistedVars) {
        return source;
      }
      return Object.entries(persistedVars).reduce((result, [key, value]) => {
        return result.replaceAll(`{{${key}}}`, value);
      }, source);
    },
    [getFromLocalStorage],
  );

  return {
    getFromLocalStorage,
    apply,
  };
};
