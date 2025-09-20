/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { MS_PER_MIN, MS_PER_SEC } from '@/common/constants/index.ts';
import { isPositiveInteger } from '@/common/utils/type-guards.ts';
import { TokenCookieHelper } from '@/services/firebase/utils/token-helper-client.ts';
import jwt from 'jsonwebtoken';

type JwtDecodedIdToken = {
  email: string;
  user_id: string;
  aud: string;
  exp: number;
  hasExpired: boolean;
  secondsLeft: number;
} | null;

export const ID_TOKEN_EXPIRED_LAG_MINUTES = 6;

export const getIdTokenLaggedMillisecsLeft = (
  tokenExpSecs: number,
  lagMinutes: number = 0,
): number => {
  if (!isPositiveInteger(lagMinutes) || !isPositiveInteger(tokenExpSecs)) {
    return 0;
  }
  const lagMs = lagMinutes * MS_PER_MIN;
  return tokenExpSecs * MS_PER_SEC - Date.now() - lagMs;
};

export const decodeIdTokenFromCookie = (
  expLagMinutes: number = ID_TOKEN_EXPIRED_LAG_MINUTES,
): JwtDecodedIdToken => {
  const token = TokenCookieHelper.get();
  const decodedId = jwt.decode(token) as JwtDecodedIdToken;
  if (!decodedId) {
    return null;
  }
  const millisecsLeft = getIdTokenLaggedMillisecsLeft(decodedId.exp, expLagMinutes);
  return {
    ...decodedId,
    hasExpired: millisecsLeft <= 0,
    secondsLeft: millisecsLeft / MS_PER_SEC,
  };
};
