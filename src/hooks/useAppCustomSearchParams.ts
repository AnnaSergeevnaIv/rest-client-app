'use client';

import { useCustomSearchParams } from './useCustomSearchParams.ts';

export type AppCustomSearchParam = Partial<{
  q: string;
}>;

export type PropsWithAppSearchParams<P = unknown> = P & {
  searchParams?: Promise<AppCustomSearchParam>;
};

export const useAppCustomSearchParams = (): ReturnType<
  typeof useCustomSearchParams<AppCustomSearchParam>
> => {
  return useCustomSearchParams<AppCustomSearchParam>();
};
