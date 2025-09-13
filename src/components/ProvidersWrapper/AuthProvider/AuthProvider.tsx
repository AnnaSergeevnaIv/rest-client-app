'use client';

import { AuthClient } from '@/services/firebase/client/auth-client.ts';
import { useCallback, useState, type PropsWithChildren, type ReactNode } from 'react';
import { AuthContext } from './AuthContext.tsx';
import { useAuthHelper } from './AuthProvider.utils.tsx';

export default function AuthProvider({
  children,
  locale,
}: PropsWithChildren & {
  locale?: string;
}): ReactNode {
  const [loading, setLoading] = useState(false);
  const { isAuth, currentUser } = useAuthHelper({ signout: () => signout(), locale });

  const signin: typeof AuthClient.signin = useCallback(async creds => {
    setLoading(true);
    try {
      return await AuthClient.signin(creds);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup: typeof AuthClient.signup = useCallback(async creds => {
    setLoading(true);
    try {
      return await AuthClient.signup(creds);
    } finally {
      setLoading(false);
    }
  }, []);

  const signout: typeof AuthClient.signout = useCallback(async () => {
    setLoading(true);
    try {
      await AuthClient.signout();
      return;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext
      value={{
        isAuth,
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
