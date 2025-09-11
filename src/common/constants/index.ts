export const RoutePath = {
  Home: '/',
  Signin: '/signin',
  Signup: '/signup',
  History: '/history',
  Variables: '/variables',
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
} as const;

export const ERR_SOMETHING_WRONG = 'Something went wrong';

export const KeyboardEventKey = {
  Escape: 'Escape',
  Enter: 'Enter',
  Tab: 'Tab',
} as const;
