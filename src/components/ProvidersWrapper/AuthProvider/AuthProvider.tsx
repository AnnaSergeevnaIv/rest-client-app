import type { FirebaseAuthSubscribeHandler } from '@/services/firebase/auth.ts';
import { authClient } from '@/services/firebase/auth.ts';
import type { User } from 'firebase/auth';
import { useCallback, useEffect, useState, type PropsWithChildren, type ReactNode } from 'react';
import { AuthContext } from './AuthContext.tsx';

export default function AuthProvider({ children }: PropsWithChildren): ReactNode {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  const handler: FirebaseAuthSubscribeHandler = useCallback(
    (user: User | null) => {
      setIsAuth(Boolean(user));
      setCurrentUser(user);
    },
    [setIsAuth],
  );

  useEffect(() => {
    authClient.subscribe(handler);
    return (): void => {
      authClient.unsubscribe(handler);
    };
  }, [handler]);

  const signin: typeof authClient.signin = async creds => {
    return await authClient.signin(creds);
  };
  const signup: typeof authClient.signup = async creds => {
    return await authClient.signup(creds);
  };
  const signout: typeof authClient.signout = async () => {
    await authClient.signout();
  };

  return (
    <AuthContext
      value={{
        isAuth,
        signin,
        signup,
        signout,
        currentUser,
      }}
    >
      {children}
    </AuthContext>
  );
}
