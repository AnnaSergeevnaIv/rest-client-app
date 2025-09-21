import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { EMAIL_REGEX, PASSWORD_MAX_LEN, PASSWORD_MIN_LEN } from './AuthForm.constants.ts';

type UseAuthFormValidationResult = {
  validator: {
    password: (value: string) => string | undefined;
    confirmPassword: (confirmValue: string, origValue: string) => string | undefined;
    email: (value: string) => string | undefined;
  };
};
export const useAuthFormValidation = (): UseAuthFormValidationResult => {
  const t = useTranslations('ValidationMessage');

  const password = useCallback(
    (value: string): string | undefined => {
      switch (true) {
        case !value:
          return t('required');

        case !/\p{L}/iu.test(value):
          return t('oneLetter');

        case !/[0-9]/.test(value):
          return t('oneDigit');

        case !/[!@#$%^&*]/.test(value):
          return t('oneSpecial');

        case /^\s+|\s+$/.test(value):
          return t('noSpaces');

        case value.length < PASSWORD_MIN_LEN:
          return t('atLeast').replace('$1', PASSWORD_MIN_LEN.toString());

        case value.length > PASSWORD_MAX_LEN:
          return t('noLonger').replace('$1', PASSWORD_MAX_LEN.toString());
      }
    },
    [t],
  );
  const confirmPassword = useCallback(
    (confirmValue: string, origValue: string): string | undefined => {
      if (confirmValue.localeCompare(origValue) !== 0) {
        return t('notMatch');
      }
    },
    [t],
  );
  const email = useCallback(
    (value: string): string | undefined => {
      switch (true) {
        case !value:
          return t('required');

        case /^\s+|\s+$/.test(value):
          return t('noSpaces');

        case !EMAIL_REGEX.test(value):
          return t('invalidEmail');
      }
    },
    [t],
  );
  return {
    validator: {
      password,
      confirmPassword,
      email,
    },
  };
};
