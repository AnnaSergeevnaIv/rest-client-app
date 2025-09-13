const USER_ID_NAME = 'fb-userId-Qf0Hr3Y9';
const DEFAULT_MAX_DAYS = 5;
const DEFAULT_PATH = '/';

type TokenCookieOptions = Partial<{
  httpOnly: boolean;
  secure: boolean;
  maxDays: number;
  path: string;
}>;

const setToken = (token: string, options?: TokenCookieOptions): void => {
  const {
    maxDays = DEFAULT_MAX_DAYS,
    path = DEFAULT_PATH,
    httpOnly = false,
    secure = true,
  } = options ?? {};

  const maxAge = 60 * 60 * 24 * maxDays;
  const params = [
    `${USER_ID_NAME}=${encodeURIComponent(token)}`,
    `max-age=${maxAge.toString()}`,
    `path=${path}`,
    `samesite=lax`,
    httpOnly ? 'httpOnly' : '',
    secure ? 'secure' : '',
  ];
  document.cookie = params.filter(Boolean).join(';');
};

const getToken = (): string => {
  const token = document.cookie.match(RegExp(`${USER_ID_NAME}=([^;]+)`))?.[1] ?? '';
  return decodeURIComponent(token);
};

const removeToken = (): void => {
  if (RegExp(`${USER_ID_NAME}=`).test(document.cookie)) {
    document.cookie = `${USER_ID_NAME}=;expires=${new Date(0).toUTCString()};path=/;`;
  }
};

export const TokenCookieHelper = {
  name: USER_ID_NAME,
  set: setToken,
  get: getToken,
  remove: removeToken,
} as const;
