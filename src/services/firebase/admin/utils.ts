'use server';

import { MS_PER_SEC } from '@/common/constants/index.ts';
import { getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'node_modules/firebase-admin/lib/auth/token-verifier';
import './config.ts';

type DecodedIdTokenExtended = DecodedIdToken & {
  hasExpired: boolean;
  millisecsLeft: number;
};

export const verifyIdToken = async (token: string): Promise<DecodedIdTokenExtended | null> => {
  try {
    const decodedId = await getAuth().verifyIdToken(token, true);
    const millisecsLeft = decodedId.exp * MS_PER_SEC - Date.now();
    return {
      ...decodedId,
      millisecsLeft,
      hasExpired: millisecsLeft <= 0,
    };
  } catch {
    return null;
  }
};

export const createCustomToken = async (uid: string, claims?: object): Promise<string> => {
  return await getAuth().createCustomToken(uid, claims);
};
