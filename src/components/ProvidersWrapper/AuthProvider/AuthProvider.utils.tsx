'use client';

import { AppLocales, MS_PER_MIN, RoutePath } from '@/common/constants/index.ts';
import { redirect } from '@/i18n/navigation.ts';
import { verifyIdToken } from '@/services/firebase/admin/utils.ts';
import {
  AuthClient,
  type FirebaseAuthSubscribeHandler,
} from '@/services/firebase/client/auth-client';
import { TokenCookieHelper } from '@/services/firebase/utils/token-helper';
import type { User } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

const EXPIRED_LAG_MINS = 2;
const EXPIRED_LAG_MS = EXPIRED_LAG_MINS * MS_PER_MIN;

type UseAuthHelperProps = {
  signout: () => Promise<void>;
  locale?: string;
};

type UseAuthHelperResult = {
  currentUser: User | null;
  isAuth: boolean;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const useAuthHelper = ({
  signout,
  locale = AppLocales.Default,
}: UseAuthHelperProps): UseAuthHelperResult => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const timerRef = useRef<number>(0);

  const logout = useCallback(() => {
    void signout().then(() => {
      TokenCookieHelper.remove();
      redirect({ href: RoutePath.Home, locale });
    });
  }, [signout, locale]);

  const handleIdTokenChange: FirebaseAuthSubscribeHandler = useCallback(
    (user: User | null) => {
      clearTimeout(timerRef.current);
      setIsAuth(Boolean(user));
      setCurrentUser(user);

      if (!user) {
        TokenCookieHelper.remove();
        return;
      }
      void user
        .getIdToken()
        .then(async token => {
          const decodedId = await verifyIdToken(token);
          if (!decodedId || decodedId.hasExpired) {
            logout();
            return;
          }
          TokenCookieHelper.set(token);
          timerRef.current = window.setTimeout(
            logout,
            decodedId.minutesLeft * MS_PER_MIN - EXPIRED_LAG_MS,
          );
        })
        .catch(TokenCookieHelper.remove);
    },
    [logout],
  );

  const handleTokenCookieRemove = useCallback(
    (e: CookieChangeEvent): void => {
      const wasRemoved = e.deleted.some(
        item => item.name?.localeCompare(TokenCookieHelper.name) === 0,
      );
      if (wasRemoved) {
        logout();
      }
    },
    [logout],
  );

  useEffect(() => {
    cookieStore.addEventListener('change', handleTokenCookieRemove);
    AuthClient.subscribe(handleIdTokenChange);

    return (): void => {
      clearTimeout(timerRef.current);
      cookieStore.removeEventListener('change', handleTokenCookieRemove);
      AuthClient.unsubscribe(handleIdTokenChange);
    };
  }, [handleIdTokenChange, handleTokenCookieRemove]);

  return {
    currentUser,
    isAuth,
    setCurrentUser,
    setIsAuth,
  };
};
