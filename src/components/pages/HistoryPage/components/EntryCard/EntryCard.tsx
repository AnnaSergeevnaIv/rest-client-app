/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { Loader } from '@/components/Loader/Loader.tsx';
import { Button } from '@/components/UI/Button/Button.tsx';
import { CLEAR_BTN_TEXT } from '@/components/UI/Input/Input.tsx';
import { Link } from '@/i18n/navigation.ts';
import {
  deleteHistoryEntry,
  type RequestHistoryEntry,
} from '@/services/firebase/admin/request-history/actions.ts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useTransition, type CSSProperties, type ReactNode } from 'react';
import styles from './EntryCard.module.scss';
import { getIconByHttpStatusCode, timestampToLocaleDateTime } from './EntryCard.utils.ts';

type EntryCardProps = {
  data: RequestHistoryEntry;
  style?: CSSProperties;
};

export const EntryCard = ({ data }: EntryCardProps): ReactNode => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('EntryCard');
  const {
    method,
    url,
    link,
    durationMs,
    httpStatus,
    timestamp,
    requestSize,
    responseSize,
    error,
    id,
  } = data;

  const handleDelete = useCallback((): void => {
    startTransition(async () => {
      await deleteHistoryEntry(id!);
    });
  }, [id]);

  const { Icon, color } = getIconByHttpStatusCode(httpStatus);
  const started = timestampToLocaleDateTime(timestamp);
  const reqKb = (requestSize / 1024).toFixed(2);
  const respKb = (responseSize / 1024).toFixed(2);
  const linkWithoutLocale = link.replace(/\/[^/>]+/, '');

  return (
    <article
      className={styles.card}
      style={{ backgroundColor: isPending ? 'var(--color-accent-5)' : 'var(--color-bg)' }}
    >
      <div className={styles.info}>
        <div className={styles.heading}>
          <div className={styles.header}>
            <div className={styles.prefix}>
              <div className={styles.status}>
                <Icon color={color} size={24} />
                <span style={{ color }}>{httpStatus || 'ERR'}</span>
              </div>
              <span className={styles.method}>{method}</span>
            </div>
            <Link
              href={linkWithoutLocale}
              className={clsx(styles.ellipsis, styles.link)}
              title={url}
            >
              {url}
            </Link>
          </div>
          <Button variant='default' className={styles.remove} onClick={handleDelete}>
            {isPending ? <Loader size={20} /> : CLEAR_BTN_TEXT}
          </Button>
        </div>
        <ul className={styles.delails}>
          <li className={styles.item}>
            <span className={styles.label}>{t('started')}:</span>
            <span>{started}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>{t('latency')}:</span>
            <span>
              {durationMs} {t('ms')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>{t('request')}:</span>
            <span>
              {reqKb} {t('kb')}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>{t('response')}:</span>
            <span>
              {respKb} {t('kb')}
            </span>
          </li>
          {error && (
            <li className={styles.item}>
              <span className={styles.label}>{t('error')}:</span>
              <span className={clsx(styles.ellipsis, styles['error-msg'])} title={error}>
                {error}
              </span>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
};
