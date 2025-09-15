'use server';

import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { USER_ID_TOKEN_NAME } from './token-helper-client.ts';

async function setCookie(
  name: string,
  value: string,
  options?: Partial<ResponseCookie>,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

async function removeCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

async function getCookie(name: string): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? '';
}

export const setTokenCookie = async (
  token: string,
  options?: Partial<ResponseCookie>,
): Promise<void> => {
  const opts: Partial<ResponseCookie> = {
    path: '/',
    sameSite: 'lax',
    secure: true,
    ...options,
  };
  await setCookie(USER_ID_TOKEN_NAME, token, opts);
};

export const removeTokenCookie = async (): Promise<void> => {
  await removeCookie(USER_ID_TOKEN_NAME);
};

export const getTokenCookie = async (): Promise<string> => {
  return await getCookie(USER_ID_TOKEN_NAME);
};
