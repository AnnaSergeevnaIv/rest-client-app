/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { KeyboardEventKey } from '@constants/index.ts';
import { ERR_SOMETHING_WRONG } from '@constants/index.ts';
import type { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { isError, isString } from './type-guards.ts';

export * from './type-guards.ts';

export const rndInt = (min: number, max: number): number => {
  return Math.round(min + Math.random() * (max - min));
};

export const getErrorInstance = (
  error: unknown,
  defaultMessage = ERR_SOMETHING_WRONG,
): Error | undefined => {
  return isError(error) ? error : isString(error) ? Error(error) : Error(defaultMessage);
};

export const getErrorMessage = (error: unknown, defaultMessage: string = ''): string => {
  return isString(error) ? error : isError(error) ? error.message : defaultMessage;
};

export const capitalize = (str: string, locale: string = navigator.language): string => {
  return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));
};

export const isKeyPressed = (key: keyof typeof KeyboardEventKey, event: Event): boolean => {
  if (!(event instanceof KeyboardEvent)) {
    return false;
  }
  const { key: k, ctrlKey: ctrl, altKey: alt, shiftKey: shift } = event;
  return k === key && !ctrl && !alt && !shift;
};

export const getOrCreateElementWithId = (
  id: string,
  tag: keyof HTMLElementTagNameMap = 'div',
): HTMLElement => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement(tag);
    el.id = id;
    document.body.append(el);
  }
  return el;
};

export const getFormData = (
  obj: HTMLFormElement | FormEvent<HTMLFormElement>,
): Record<string, FormDataEntryValue> => {
  const form = obj instanceof HTMLFormElement ? obj : obj.currentTarget;
  return Object.fromEntries(new FormData(form).entries());
};

export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};

export const getId = (): string => {
  return crypto.randomUUID().replace(/-/g, '');
};

export const removeDups = <T = unknown[]>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

export const createRecord = <T = unknown>({
  keys,
  values = keys,
  placeholder,
}: {
  keys: PropertyKey[];
  values?: unknown[];
  placeholder?: unknown;
}): Record<string, T> => {
  const entries = keys.map((key, idx) => [key, values[idx] ?? placeholder]);
  return Object.fromEntries(entries) as Record<string, T>;
};

export const mapObjectValues = <T>(
  obj: Record<string, unknown>,
  mapper: (v: unknown) => T,
): Record<string, T> => {
  return Object.keys(obj).reduce<Record<string, T>>((res, key) => {
    res[key] = mapper(obj[key]);
    return res;
  }, {});
};

export const showErrorToast = (err: unknown): void => {
  toast.error(getErrorMessage(err));
};
