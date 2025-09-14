'use server';

import { MS_PER_SEC } from '@/common/constants/index.ts';
import { getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'node_modules/firebase-admin/lib/auth/token-verifier';
import './config.ts';

type DecodedIdTokenExtended = DecodedIdToken & {
  hasExpired: boolean;
  millisecsLeft: number;
};

type VerificationResult =
  | {
      success: true;
      decodedIdToken: DecodedIdTokenExtended;
    }
  | {
      success: false;
      decodedIdToken: null;
    };

export const verifyIdToken = async (token: string): Promise<Expand<VerificationResult>> => {
  try {
    const decodedId = await getAuth().verifyIdToken(token, true);
    const millisecsLeft = decodedId.exp * MS_PER_SEC - Date.now();
    const decodedIdToken = {
      ...decodedId,
      millisecsLeft,
      hasExpired: millisecsLeft <= 0,
    };
    return {
      success: true,
      decodedIdToken,
    };
  } catch {
    return {
      success: false,
      decodedIdToken: null,
    };
  }
};
