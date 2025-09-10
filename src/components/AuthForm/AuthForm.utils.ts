import {
  EMAIL_REGEX,
  PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN,
  ValidationMessage,
} from './AuthForm.constants.ts';

const passwordValidator = (value: string): string | undefined => {
  switch (true) {
    case !value:
      return ValidationMessage.FieldIsRequired;

    case !/\p{L}/iu.test(value):
      return ValidationMessage.MustContainLetter;

    case !/[0-9]/.test(value):
      return ValidationMessage.MustContainDigit;

    case !/[!@#$%^&*]/.test(value):
      return ValidationMessage.MustContainSpecialChar;

    case /^\s+|\s+$/.test(value):
      return ValidationMessage.MustNotContainWhitespaces;

    case value.length < PASSWORD_MIN_LEN:
      return ValidationMessage.MustBeAtLeast;

    case value.length > PASSWORD_MAX_LEN:
      return ValidationMessage.MustBeNoLonger;
  }
};

const confirmPasswordValidator = (confirmValue: string, origValue: string): string | undefined => {
  if (confirmValue.localeCompare(origValue) !== 0) {
    return ValidationMessage.PasswordsDoNotMatch;
  }
};

const emailValidator = (value: string): string | undefined => {
  switch (true) {
    case !value:
      return ValidationMessage.FieldIsRequired;

    case /^\s+|\s+$/.test(value):
      return ValidationMessage.MustNotContainWhitespaces;

    case !EMAIL_REGEX.test(value):
      return ValidationMessage.InvalidEmail;
  }
};

export const validator = {
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator,
  email: emailValidator,
} as const;
