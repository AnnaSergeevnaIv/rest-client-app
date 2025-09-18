'use server';

import { MS_PER_SEC } from '@/common/constants/index.ts';
import {
  ID_TOKEN_EXPIRED_LAG_MINUTES,
  getIdTokenLaggedMillisecsLeft,
} from '@/components/ProvidersWrapper/AuthProvider/AuthProvider.utils.tsx';
import { getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'node_modules/firebase-admin/lib/auth/token-verifier';
import './config.ts';

export type DecodedIdTokenExtended = DecodedIdToken & {
  hasExpired: boolean;
  millisecsLeft: number;
  secondsLeft: number;
};

export const verifyIdToken = async (
  token: string,
  expLagMinutes: number = ID_TOKEN_EXPIRED_LAG_MINUTES,
): Promise<DecodedIdTokenExtended | null> => {
  try {
    const decodedId = await getAuth().verifyIdToken(token, true);
    const millisecsLeft = getIdTokenLaggedMillisecsLeft(decodedId.exp, expLagMinutes);
    return {
      ...decodedId,
      millisecsLeft,
      hasExpired: millisecsLeft <= 0,
      secondsLeft: millisecsLeft / MS_PER_SEC,
    };
  } catch {
    return null;
  }
};

export const createCustomToken = async (uid: string, claims?: object): Promise<string> => {
  return await getAuth().createCustomToken(uid, claims);
};
