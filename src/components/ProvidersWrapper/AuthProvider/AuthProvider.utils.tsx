'use client';

import { AppLocales, MS_PER_SEC, RoutePath } from '@/common/constants/index.ts';
import { redirectAsync } from '@/common/utils/index.ts';
import { verifyIdToken } from '@/services/firebase/admin/utils.ts';
import {
  AuthClient,
  type FirebaseAuthSubscribeHandler,
} from '@/services/firebase/client/auth-client';
import { TokenCookieHelper } from '@/services/firebase/utils/token-helper-client';
import type { User } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseAuthHelperProps = {
  signout: () => Promise<void>;
  locale?: string;
};

type UseAuthHelperResult = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

export const useAuthHelper = ({
  signout,
  locale = AppLocales.Default,
}: UseAuthHelperProps): UseAuthHelperResult => {
  const [currentUser, setCurrentUser] = useState(AuthClient.currentUser);
  const timerRef = useRef<number>(0);

  const logout = useCallback(() => {
    void signout().then(() => {
      void redirectAsync({ href: RoutePath.Home, locale }).then(() => {
        TokenCookieHelper.remove();
        setCurrentUser(null);
      });
    });
  }, [signout, locale]);

  const handleIdTokenChange: FirebaseAuthSubscribeHandler = useCallback(
    (user: User | null) => {
      window.clearTimeout(timerRef.current);

      if (!user) {
        TokenCookieHelper.remove();
        setCurrentUser(null);
        return;
      }
      void user
        .getIdToken()
        .then(async token => {
          const decodedIdToken = await verifyIdToken(token);
          if (!decodedIdToken || decodedIdToken.hasExpired) {
            logout();
            return;
          }
          TokenCookieHelper.set(token, {
            maxAgeSeconds: decodedIdToken.millisecsLeft / MS_PER_SEC,
          });
          timerRef.current = window.setTimeout(logout, decodedIdToken.millisecsLeft);
          setCurrentUser(user);
        })
        .catch((error: unknown) => {
          console.debug('getIdToken failed: ', error);
          logout();
        });
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
      window.clearTimeout(timerRef.current);
      cookieStore.removeEventListener('change', handleTokenCookieRemove);
      AuthClient.unsubscribe(handleIdTokenChange);
    };
  }, [handleIdTokenChange, handleTokenCookieRemove]);

  return {
    currentUser,
    setCurrentUser,
  };
};
