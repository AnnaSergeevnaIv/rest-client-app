'use server';

import { MS_PER_MIN, MS_PER_SEC } from '@/common/constants/index.ts';
import { getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'node_modules/firebase-admin/lib/auth/token-verifier';
import './config.ts';

const EXPIRED_LAG_MINUTES = 6;

export type DecodedIdTokenExtended = DecodedIdToken & {
  hasExpired: boolean;
  millisecsLeft: number;
  secondsLeft: number;
};

export const verifyIdToken = async (
  token: string,
  expLagMinutes: number = EXPIRED_LAG_MINUTES,
): Promise<DecodedIdTokenExtended | null> => {
  const lagMs = Math.max(0, expLagMinutes * MS_PER_MIN);
  try {
    const decodedId = await getAuth().verifyIdToken(token, true);
    const millisecsLeft = decodedId.exp * MS_PER_SEC - Date.now() - lagMs;
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
