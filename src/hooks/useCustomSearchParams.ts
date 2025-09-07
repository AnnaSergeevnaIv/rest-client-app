/* eslint-disable @typescript-eslint/no-base-to-string */
import { usePathname, useRouter } from '@/i18n/navigation.ts';
import { hasOwnKeys, mapObjectValues } from '@utils/index.ts';
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export type UseCustomSearchParamsResult<P extends Record<string, unknown>> = {
  searchParams: ReadonlyURLSearchParams | null;
  getQueryParams: () => Record<string, string>;
  setParams: (props: P, opts?: Options) => void;
  createParams: (props: P, opts?: Options) => void;
  getParams: (...keys: (keyof P)[]) => (string | undefined)[];
  deleteParams: (...keys: (keyof P | Options)[]) => void;
  hasParams: (...keys: (keyof P)[]) => boolean;
  clearParams: (opts?: Options) => void;
};

type Options = {
  replace?: boolean;
};
const stringify = (value: unknown): string => {
  return value != null ? String(value) : '';
};
const isOptions = (v: unknown): v is Options => {
  return hasOwnKeys<Options>(v, 'replace');
};

export const useCustomSearchParams = <
  P extends Record<string, unknown> = Record<string, unknown>,
>(): UseCustomSearchParamsResult<P> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const hasParams = useCallback(
    (...keys: (keyof P)[]): boolean => {
      return keys.every(key => searchParams.has(key.toString()));
    },
    [searchParams],
  );

  const createParams = useCallback(
    (props: P, opts?: Options): void => {
      const action = opts?.replace ? 'replace' : 'push';
      const params = new URLSearchParams(mapObjectValues(props, stringify));
      router[action](`${pathname}?${params.toString()}`);
    },
    [router, pathname],
  );

  const setParams = useCallback(
    (props: P, opts?: Options): void => {
      const action = opts?.replace ? 'replace' : 'push';
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(props).forEach(([key, value]) => {
        params.set(key, stringify(value));
      });
      router[action](`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const getParams = useCallback(
    (...keys: (keyof P)[]): (string | undefined)[] => {
      const params = new URLSearchParams(searchParams.toString());
      return keys.map(key => params.get(key.toString()) ?? undefined);
    },
    [searchParams],
  );

  const deleteParams = useCallback(
    (...keys: (keyof P | Options)[]): void => {
      const action = isOptions(keys[keys.length - 1]) ? 'replace' : 'push';
      const params = new URLSearchParams(searchParams.toString());

      keys.forEach(key => {
        if (!isOptions(key)) {
          params.delete(key.toString());
        }
      });
      router[action](`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const clearParams = useCallback(
    (opts?: Options): void => {
      const action = opts?.replace ? 'replace' : 'push';
      router[action](pathname);
    },
    [router, pathname],
  );

  const getQueryParams = useCallback((): Record<string, string> => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  return {
    searchParams,
    setParams,
    getParams,
    deleteParams,
    createParams,
    hasParams,
    clearParams,
    getQueryParams,
  };
};
