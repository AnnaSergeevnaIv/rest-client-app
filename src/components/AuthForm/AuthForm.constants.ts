export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const EMAIL_EXAMPLE = 'login@domain.com';
export const PASSWORD_MIN_LEN = 8;
export const PASSWORD_MAX_LEN = 16;

export const ValidationMessage = {
  FieldIsRequired: 'The field is required.',
  MustContainLetter: 'Must contain at least one letter.',
  MustContainDigit: 'Must contain at least one digit (0-9).',
  MustContainSpecialChar: 'Must contain at least one special character (!@#$%^&*).',
  MustNotContainWhitespaces: 'Must not contain leading or trailing whitespace.',
  MustBeAtLeast: `Must be at least ${PASSWORD_MIN_LEN.toString()} characters long.`,
  MustBeNoLonger: `Must be no longer than ${PASSWORD_MAX_LEN.toString()} characters.`,
  InvalidEmail: `Invalid email (e.g. ${EMAIL_EXAMPLE})`,
  PasswordsDoNotMatch: 'Passwords do not match',
} as const;
