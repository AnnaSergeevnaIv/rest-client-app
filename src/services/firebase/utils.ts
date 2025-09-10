/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ERR_SOMETHING_WRONG } from '@/common/constants/index.ts';
import { capitalize, getErrorMessage as getErrMsg } from '@/common/utils/index.ts';
import { FirebaseError, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import type { Database } from 'firebase/database';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAfpZs5dU18WIcnKOX1-z4A0gIt834VvuQ',
  authDomain: 'rest-client-app-fa2f4.firebaseapp.com',
  projectId: 'rest-client-app-fa2f4',
  storageBucket: 'rest-client-app-fa2f4.firebasestorage.app',
  messagingSenderId: '379629067345',
  appId: '1:379629067345:web:be4cbf1e5fdf37d6ac6c70',
  measurementId: 'G-4B31QXJM93',
} as const;

const key = JSON.stringify(firebaseConfig);

type InitFirebaseAppResult = {
  auth: Auth;
  db: Database;
};

const cache = new Map<string, InitFirebaseAppResult>();

export const initFirebaseApp = (): InitFirebaseAppResult => {
  if (!cache.has(key)) {
    const app = initializeApp(firebaseConfig);
    cache.set(key, {
      auth: getAuth(app),
      db: getDatabase(app),
    });
  }
  return cache.get(key) as InitFirebaseAppResult;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    const code = error.code.match(/\/([\w-]+)/)?.[1] ?? '';
    return capitalize(code.replace(/-/g, ' ')) || ERR_SOMETHING_WRONG;
  } else {
    return getErrMsg(error, ERR_SOMETHING_WRONG);
  }
};

export class FirebaseAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirebaseAuthError';
  }
}
