import { StorageKey } from '@/common/constants/index.ts';
import { isObject, JSONParse } from '@/common/utils/index.ts';
import { usePathname } from '@/i18n/navigation.ts';
import { useCallback, useEffect } from 'react';
import type { UseFormGetValues, UseFormReset } from 'react-hook-form';
import type { UserPartial } from '../ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { useAuth } from '../ProvidersWrapper/AuthProvider/AuthContext.tsx';
import type { VarsFormData } from './VarsForm.tsx';
import type { ParsedVars } from './VarsForm.utils.ts';
import { isLikePersistedVarsFormData, parseVarFieldsArray } from './VarsForm.utils.ts';

type UseCurrentUserVarsResult = {
  getFromLocalStorage: () => ParsedVars | null;
  apply: (s: string) => string;
  currentUser: UserPartial | null;
};

export const useCurrentUserVars = (): UseCurrentUserVarsResult => {
  const { currentUser } = useAuth();

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
    currentUser,
    getFromLocalStorage,
    apply,
  };
};

type UseCurrentUserFormProps = {
  getValues: UseFormGetValues<VarsFormData>;
  reset: UseFormReset<VarsFormData>;
};

type UseCurrentUserFormResult = UseCurrentUserVarsResult & {
  saveToLocalStorage: () => VarsFormData | null;
};

export const useCurrentUserVarsForm = ({
  getValues,
  reset,
}: UseCurrentUserFormProps): UseCurrentUserFormResult => {
  const pathname = usePathname();
  const result = useCurrentUserVars();
  const { getFromLocalStorage, currentUser } = result;

  const saveToLocalStorage = useCallback(() => {
    if (!currentUser?.email) {
      return null;
    }
    const currentPersisted = parseVarFieldsArray(getValues().vars, true);
    const vars = { vars: currentPersisted ? currentPersisted.array : [] };
    let allVars = JSONParse(localStorage.getItem(StorageKey.Vars));

    if (!isObject(allVars)) {
      allVars = { [currentUser.email]: vars };
    } else {
      allVars[currentUser.email] = vars;
    }
    localStorage.setItem(StorageKey.Vars, JSON.stringify(allVars));

    return vars;
  }, [currentUser?.email, getValues]);

  const handleBeforeUnload = useCallback((): void => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  useEffect(() => {
    reset({ vars: getFromLocalStorage()?.array });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return (): void => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveToLocalStorage();
    };
  }, [pathname, saveToLocalStorage, handleBeforeUnload, reset, getFromLocalStorage]);

  return {
    ...result,
    saveToLocalStorage,
  };
};
