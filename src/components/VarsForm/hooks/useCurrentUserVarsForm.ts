import { StorageKey } from '@/common/constants/index.ts';
import { isObject, JSONParse } from '@/common/utils/index.ts';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { UseFormGetValues, UseFormReset } from 'react-hook-form';
import type { VarsFormData } from '../VarsForm.tsx';
import { parseVarFieldsArray } from '../VarsForm.utils.ts';
import { useCurrentUserVars, type UseCurrentUserVarsResult } from './useCurrentUserVars.ts';

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
