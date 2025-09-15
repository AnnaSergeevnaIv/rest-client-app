export const USER_ID_TOKEN_NAME = 'fb-idToken-Qf0Hr3Y9';
const DEFAULT_MAX_AGE = 3600 * 24 * 5;
const DEFAULT_PATH = '/';

type TokenCookieOptions = Partial<{
  httpOnly: boolean;
  secure: boolean;
  maxAgeSeconds: number;
  path: string;
}>;

const setToken = (token: string, options?: TokenCookieOptions): void => {
  const {
    maxAgeSeconds = DEFAULT_MAX_AGE,
    path = DEFAULT_PATH,
    httpOnly = false,
    secure = true,
  } = options ?? {};

  const params = [
    `${USER_ID_TOKEN_NAME}=${encodeURIComponent(token)}`,
    `max-age=${Math.round(maxAgeSeconds).toString()}`,
    `path=${path}`,
    `samesite=lax`,
    httpOnly ? 'httpOnly' : '',
    secure ? 'secure' : '',
  ];
  document.cookie = params.filter(Boolean).join(';');
};

const getToken = (): string => {
  const token = document.cookie.match(RegExp(`${USER_ID_TOKEN_NAME}=([^;]+)`))?.[1] ?? '';
  return decodeURIComponent(token);
};

const removeToken = (): void => {
  if (RegExp(`${USER_ID_TOKEN_NAME}=`).test(document.cookie)) {
    document.cookie = [
      `${USER_ID_TOKEN_NAME}=`,
      `expires=${new Date(0).toUTCString()}`,
      `max-age=-1`,
    ].join(';');
  }
};

export const TokenCookieHelper = {
  name: USER_ID_TOKEN_NAME,
  set: setToken,
  get: getToken,
  remove: removeToken,
} as const;
