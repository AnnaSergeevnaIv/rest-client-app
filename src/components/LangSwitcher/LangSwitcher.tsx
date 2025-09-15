'use client';

import { IconLang } from '@/common/constants/icons.ts';
import { AppLocales } from '@/common/constants/index.ts';
import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { usePathname, useRouter } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import { useTransition, type ReactNode } from 'react';
import { Button } from '../UI/Button/Button.tsx';
import styles from './LangSiwtcher.module.scss';

const getLocale = (locale: string, upperCase?: boolean): string => {
  const result = locale === AppLocales.EN ? AppLocales.RU : AppLocales.EN;
  return upperCase ? result.toLocaleUpperCase() : result;
};

const ICON_SIZE = 16;

export const LangSwitcher = (): ReactNode => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryParams } = useAppCustomSearchParams();
  const [isPending, startTransition] = useTransition();

  const toggleLang = (): void => {
    startTransition(() => {
      router.replace({ pathname, query: getQueryParams() }, { locale: getLocale(locale) });
    });
  };
  return (
    <label className={styles.wrapper}>
      <IconLang size={ICON_SIZE} />
      <Button variant='default' onClick={toggleLang} disabled={isPending}>
        {getLocale(locale, true)}
      </Button>
    </label>
  );
};
