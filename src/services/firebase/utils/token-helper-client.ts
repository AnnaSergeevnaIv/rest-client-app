import { StorageKey } from '@/common/constants/index.ts';

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
    `${StorageKey.IdToken}=${encodeURIComponent(token)}`,
    `max-age=${Math.round(maxAgeSeconds).toString()}`,
    `path=${path}`,
    `samesite=lax`,
    httpOnly ? 'httpOnly' : '',
    secure ? 'secure' : '',
  ];
  document.cookie = params.filter(Boolean).join(';');
};

const getToken = (): string => {
  const token = document.cookie.match(RegExp(`${StorageKey.IdToken}=([^;]+)`))?.[1] ?? '';
  return decodeURIComponent(token);
};

const removeToken = (): void => {
  if (RegExp(`${StorageKey.IdToken}=`).test(document.cookie)) {
    console.debug('remive cookie token');

    document.cookie = [
      `${StorageKey.IdToken}=`,
      `expires=${new Date(0).toUTCString()}`,
      `max-age=-1`,
    ].join(';');
  }
};

export const TokenCookieHelper = {
  name: StorageKey.IdToken,
  set: setToken,
  get: getToken,
  remove: removeToken,
} as const;
