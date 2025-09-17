/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { TokenCookieHelper } from '@/services/firebase/utils/token-helper-client.ts';
import jwt from 'jsonwebtoken';
import type { UserPartial } from './AuthContext.tsx';

type JwtDecodedToken = {
  email: string;
  user_id: string;
} | null;

export const getCurrentUserFromIdToken = (): UserPartial | null => {
  const token = TokenCookieHelper.get();
  const decodedId = jwt.decode(token) as JwtDecodedToken;
  return (
    decodedId && {
      email: decodedId.email,
      uid: decodedId.user_id,
    }
  );
};
