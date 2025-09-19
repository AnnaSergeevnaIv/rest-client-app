'use client';

import { StorageKey } from '@/common/constants/index.ts';
import { verifyIdToken } from '@/services/firebase/admin/utils.ts';
import type { EmailAndPassword } from '@/services/firebase/client/auth-client.ts';
import { AuthClient } from '@/services/firebase/client/auth-client.ts';
import {
  removeIdTokenCookie,
  setIdTokenCookie,
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
import { decodeIdTokenFromCookie } from './AuthProvider.utils.tsx';

type AuthAction = Extract<keyof typeof AuthClient, 'signin' | 'signup'>;

type AuthProviderProps = PropsWithChildren & {
  locale?: string;
};

export default function AuthProvider({ children }: AuthProviderProps): ReactNode {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserPartial | null>(AuthClient.currentUser);
  const timerRef = useRef<number>(0);

  const signout: typeof AuthClient.signout = useCallback(async () => {
    setLoading(true);
    try {
      await AuthClient.signout();
      void removeIdTokenCookie();
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
        void removeIdTokenCookie();
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
          void setIdTokenCookie(token, { maxAge: decodedIdToken.secondsLeft });
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

  const checkCookieIdTokenExpiration = useCallback(async () => {
    const decodedIdToken = decodeIdTokenFromCookie();
    if (!decodedIdToken || decodedIdToken.hasExpired) {
      await removeIdTokenCookie();
      await signout();
      setCurrentUser(null);
    } else {
      setCurrentUser({
        email: decodedIdToken.email,
        uid: decodedIdToken.user_id,
      });
    }
  }, [signout]);

  useEffect(() => {
    cookieStore.addEventListener('change', handleTokenCookieRemove);

    void checkCookieIdTokenExpiration().then(() => {
      AuthClient.subscribe(handleAuthStateChange);
    });
    return (): void => {
      window.clearTimeout(timerRef.current);
      cookieStore.removeEventListener('change', handleTokenCookieRemove);
      AuthClient.unsubscribe(handleAuthStateChange);
    };
  }, [handleAuthStateChange, handleTokenCookieRemove, checkCookieIdTokenExpiration]);

  const authenticate = useCallback(async (creds: EmailAndPassword, action: AuthAction) => {
    setLoading(true);
    try {
      const result = await AuthClient[action](creds);
      setCurrentUser(result.user);
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
