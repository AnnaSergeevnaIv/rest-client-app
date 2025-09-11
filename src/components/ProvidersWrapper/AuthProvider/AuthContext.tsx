import type { authClient } from '@/services/firebase/auth.ts';
import type { User } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

const ERR_USE_OUTSIDE_CONTEXT = 'useAuth() can only be used within an AuthContext';

export type UseAuthReturn = Pick<typeof authClient, 'signin' | 'signout' | 'signup'> & {
  currentUser: User | null;
  isAuth: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<UseAuthReturn | null>(null);

export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(ERR_USE_OUTSIDE_CONTEXT);
  }
  return context;
};
