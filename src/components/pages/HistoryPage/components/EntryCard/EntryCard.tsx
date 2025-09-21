/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { RequestHistoryEntry } from '@/services/firebase/admin/request-history/actions.ts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { DeleteBtn } from './DeleteBtn.tsx';
import styles from './EntryCard.module.scss';
import { getIconByHttpStatusCode, timestampToLocaleDateTime } from './EntryCard.utils.ts';

type EntryCardProps = {
  data: RequestHistoryEntry;
  style?: CSSProperties;
};

export const EntryCard = async ({ data, style }: EntryCardProps): Promise<ReactNode> => {
  const t = await getTranslations('EntryCard');
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

  const { Icon, color } = getIconByHttpStatusCode(httpStatus);
  const started = timestampToLocaleDateTime(timestamp);
  const reqKb = (requestSize / 1024).toFixed(2);
  const respKb = (responseSize / 1024).toFixed(2);
  const linkWithoutLocale = link.replace(/\/[^/>]+/, '');

  return (
    <article className={styles.card} style={style}>
      <div className={styles.info}>
        <div className={styles.heading}>
          <div className={styles.header}>
            <div className={styles.prefix}>
              <div className={styles.status}>
                <Icon color={color} size={24} />
                <span style={{ color }}>{httpStatus}</span>
              </div>
              <span className={styles.method}>{method}</span>
            </div>
            <Link href={linkWithoutLocale} className={clsx(styles.ellipsis, styles.link)}>
              {url}
            </Link>
          </div>
          <DeleteBtn id={id!} />
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
              <span className={clsx(styles.ellipsis, styles['error-msg'])}>{error}</span>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
};
