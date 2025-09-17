import type { AuthClient } from '@/services/firebase/client/auth-client';
import type { User } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

const ERR_USE_OUTSIDE_CONTEXT = 'useAuth() can only be used within an AuthContext';

export type UserPartial = PartialWithRequired<User, 'email' | 'uid'>;

export type UseAuthReturn = Pick<typeof AuthClient, 'signin' | 'signout' | 'signup'> & {
  currentUser: UserPartial | null;
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
