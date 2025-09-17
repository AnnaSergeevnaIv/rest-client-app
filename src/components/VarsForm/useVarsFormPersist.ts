/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { isObject, JSONParse } from '@/common/utils/index.ts';
import { useMemo } from 'react';
import type { FormPersistConfig } from 'react-hook-form-persist';
import useFormPersist from 'react-hook-form-persist';
import type { UserPartial } from '../ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { useAuth } from '../ProvidersWrapper/AuthProvider/AuthContext.tsx';

const ANON_EMAIL = '<anonymoys>';

const createUserStorage = (
  currentUser: UserPartial | null,
  storage: Storage = localStorage,
): Storage => {
  const email = currentUser?.email ?? ANON_EMAIL;

  return {
    getItem(key: string): string | null {
      const persisted = JSONParse(storage.getItem(key));
      if (isObject(persisted)) {
        return JSON.stringify(persisted[email]);
      } else {
        return null;
      }
    },
    setItem(key: string, value: string): void {
      const persisted = JSONParse(storage.getItem(key));
      if (isObject(persisted)) {
        persisted[email] = JSONParse(value);
        value = JSON.stringify(persisted);
      } else {
        value = JSON.stringify({ [email]: JSONParse(value) });
      }
      storage.setItem(key, value);
    },
  } as Storage;
};

export const useVarsFormPersist = (
  key: string,
  { storage, ...rest }: FormPersistConfig,
): ReturnType<typeof useFormPersist> | undefined => {
  const { currentUser } = useAuth();

  const userStorage = useMemo(() => {
    return createUserStorage(currentUser, storage);
  }, [storage, currentUser]);

  return useFormPersist(key, {
    storage: userStorage,
    ...rest,
  });
};
