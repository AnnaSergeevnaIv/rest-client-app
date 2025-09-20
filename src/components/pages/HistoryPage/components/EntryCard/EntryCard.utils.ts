import { IconError, IconSuccess, IconWarn } from '@/common/constants/icons.ts';
import { IconInfo } from '@common/constants/icons.ts';
import type { IconType } from 'react-icons/lib';

export const getIconByHttpStatusCode = (
  code: number,
): {
  Icon: IconType;
  color: string;
} => {
  if (code >= 100 && code <= 199) {
    return { Icon: IconInfo, color: 'var(--color-blue)' };
  }
  if (code >= 200 && code <= 299) {
    return { Icon: IconSuccess, color: 'var(--color-green)' };
  }
  if (code >= 300 && code <= 399) {
    return { Icon: IconWarn, color: 'var(--color-orange)' };
  }
  return { Icon: IconError, color: 'var(--color-accent)' };
};

export const timestampToLocaleDateTime = (ts: number): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(ts);
};
