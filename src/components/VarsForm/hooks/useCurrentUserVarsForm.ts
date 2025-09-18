import { StorageKey } from '@/common/constants/index.ts';
import { isObject, JSONParse } from '@/common/utils/index.ts';
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
  saveToLocalStorage: () => void;
};

export const useCurrentUserVarsForm = ({
  getValues,
  reset,
}: UseCurrentUserFormProps): UseCurrentUserFormResult => {
  const result = useCurrentUserVars();
  const { getFromLocalStorage, currentUser } = result;

  const saveToLocalStorage = useCallback(() => {
    if (!currentUser?.email) {
      return null;
    }
    const parsed = parseVarFieldsArray(getValues().vars);
    let allVars = JSONParse(localStorage.getItem(StorageKey.Vars));

    if (isObject(allVars)) {
      allVars[currentUser.email] = { vars: parsed.normalizedArray };
    } else {
      allVars = { [currentUser.email]: { vars: parsed.normalizedArray } };
    }
    localStorage.setItem(StorageKey.Vars, JSON.stringify(allVars));
  }, [currentUser?.email, getValues]);

  const handleBeforeUnload = useCallback((): void => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  useEffect(() => {
    reset({ vars: getFromLocalStorage()?.normalizedArray });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return (): void => {
      saveToLocalStorage();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveToLocalStorage, handleBeforeUnload, reset, getFromLocalStorage]);

  return {
    ...result,
    saveToLocalStorage,
  };
};
