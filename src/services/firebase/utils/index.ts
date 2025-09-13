import { ERR_SOMETHING_WRONG } from '@/common/constants/index.ts';
import { capitalize, getErrorMessage } from '@/common/utils/index.ts';
import { FirebaseError } from 'firebase/app';

const getFirebaseErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    const code = error.code.match(/\/([\w-]+)/)?.[1] ?? '';
    return capitalize(code.replace(/-/g, ' ')) || ERR_SOMETHING_WRONG;
  } else {
    return getErrorMessage(error, ERR_SOMETHING_WRONG);
  }
};

class FirebaseAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirebaseAuthError';
  }
}

export const throwFirebaseAuthError: Throwable = (err: unknown): never => {
  const message = getFirebaseErrorMessage(err);
  throw new FirebaseAuthError(message);
};
