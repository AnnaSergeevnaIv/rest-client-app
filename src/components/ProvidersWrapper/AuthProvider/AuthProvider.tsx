/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { MS_PER_SEC, StorageKey } from '@/common/constants/index.ts';
import { verifyIdToken } from '@/services/firebase/admin/utils.ts';
import type { EmailAndPassword } from '@/services/firebase/client/auth-client.ts';
import { AuthClient } from '@/services/firebase/client/auth-client.ts';
import {
  getTokenCookie,
  removeTokenCookie,
  setTokenCookie,
} from '@/services/firebase/utils/token-helper-server.ts';
import { type User } from 'firebase/auth';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import type { UserPartial } from './AuthContext.tsx';
import { AuthContext } from './AuthContext.tsx';
import { getCurrentUserFromIdToken } from './AuthProvider.utils.tsx';

type AuthAction = Extract<keyof typeof AuthClient, 'signin' | 'signup'>;

export default function AuthProvider({ children }: PropsWithChildren): ReactNode {
  const [loading, setLoading] = useState(false);
  const possibleCurrentUser = getCurrentUserFromIdToken() ?? AuthClient.currentUser;
  const [currentUser, setCurrentUser] = useState<UserPartial | null>(possibleCurrentUser);
  const timerRef = useRef<number>(0);

  const signout: typeof AuthClient.signout = useCallback(async () => {
    setLoading(true);
    try {
      await AuthClient.signout();
      void removeTokenCookie();
      setCurrentUser(null);
      return;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuthStateChange = useCallback(
    (user: User | null) => {
      window.clearTimeout(timerRef.current);

      if (!user) {
        void removeTokenCookie();
        setCurrentUser(null);
        return;
      }
      void user
        .getIdToken()
        .then(async token => {
          const decodedIdToken = await verifyIdToken(token);
          if (!decodedIdToken || decodedIdToken.hasExpired) {
            void signout();
            return;
          }
          void setTokenCookie(token, {
            maxAge: decodedIdToken.millisecsLeft / MS_PER_SEC,
          });
          timerRef.current = window.setTimeout(() => void signout(), decodedIdToken.millisecsLeft);
          setCurrentUser(user);
        })
        .catch((error: unknown) => {
          console.debug('getIdToken failed: ', error);
          void signout();
        });
    },
    [signout],
  );

  const handleTokenCookieRemove = useCallback(
    (e: CookieChangeEvent): void => {
      const wasRemoved = e.deleted.some(item => item.name?.localeCompare(StorageKey.IdToken) === 0);
      if (wasRemoved) {
        void signout();
      }
    },
    [signout],
  );

  useEffect(() => {
    cookieStore.addEventListener('change', handleTokenCookieRemove);
    AuthClient.subscribe(handleAuthStateChange);

    void getTokenCookie().then(async token => {
      const decodedId = await verifyIdToken(token);
      if (!decodedId || decodedId.hasExpired) {
        void signout().then(() => {
          void removeTokenCookie();
          setCurrentUser(null);
        });
      } else {
        setCurrentUser({
          email: decodedId.email!,
          uid: decodedId.uid,
        });
      }
      return (): void => {
        window.clearTimeout(timerRef.current);
        cookieStore.removeEventListener('change', handleTokenCookieRemove);
        AuthClient.unsubscribe(handleAuthStateChange);
      };
    });
  }, [signout, handleAuthStateChange, handleTokenCookieRemove]);

  const authenticate = useCallback(async (creds: EmailAndPassword, action: AuthAction) => {
    setLoading(true);
    try {
      const result = await AuthClient[action](creds);
      setCurrentUser(result.user);
      const idToken = await result.user.getIdToken();
      void setTokenCookie(idToken);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const signin: typeof AuthClient.signin = useCallback(
    async creds => {
      return await authenticate(creds, 'signin');
    },
    [authenticate],
  );

  const signup: typeof AuthClient.signup = useCallback(
    async creds => {
      return await authenticate(creds, 'signup');
    },
    [authenticate],
  );

  return (
    <AuthContext
      value={{
        signin,
        signup,
        signout,
        currentUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
