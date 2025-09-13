'use server';

import { MS_PER_SEC } from '@/common/constants/index.ts';
import { getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'node_modules/firebase-admin/lib/auth/token-verifier';
import './config.ts';

type DecodedIdTokenExtended = DecodedIdToken & {
  hasExpired: boolean;
  minutesLeft: number;
};

export const verifyIdToken = async (token: string): Promise<DecodedIdTokenExtended | null> => {
  try {
    const decodedId = await getAuth().verifyIdToken(token);
    const minutesLeft = new Date(decodedId.exp * MS_PER_SEC - Date.now()).getMinutes();
    return {
      ...decodedId,
      minutesLeft,
      hasExpired: minutesLeft <= 0,
    };
  } catch {
    return null;
  }
};
