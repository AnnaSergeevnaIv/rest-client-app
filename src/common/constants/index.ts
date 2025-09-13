export const MS_PER_SEC = 1000;
export const MS_PER_MIN = 60 * MS_PER_SEC;
export const ERR_SOMETHING_WRONG = 'Something went wrong';

export const RoutePath = {
  Home: '/',
  Signin: '/signin',
  Signup: '/signup',
  History: '/history',
  Variables: '/variables',
  Client: '/client',
  Any: '*',
} as const;

export const LinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
} as const;

export const HttpStatus = {
  NotFound: 404,
  OK: 200,
} as const;

export const AppLocales = {
  EN: 'en',
  RU: 'ru',
  Default: 'en',
} as const;

export const KeyboardEventKey = {
  Escape: 'Escape',
  Enter: 'Enter',
  Tab: 'Tab',
} as const;
