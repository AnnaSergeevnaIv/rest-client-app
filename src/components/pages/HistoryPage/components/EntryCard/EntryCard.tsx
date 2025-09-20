/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { Loader } from '@/components/Loader/Loader.tsx';
import { Button } from '@/components/UI/Button/Button.tsx';
import { CLEAR_BTN_TEXT } from '@/components/UI/Input/Input.tsx';
import { Link } from '@/i18n/navigation.ts';
import type { RequestHistoryEntry } from '@/services/firebase/admin/request-history/actions.ts';
import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import styles from './EntryCard.module.scss';
import { getIconByHttpStatusCode, timestampToLocaleDateTime } from './EntryCard.utils.ts';

type EntryCardProps = {
  data: RequestHistoryEntry;
  onDelete?: (id: string) => void;
  deleting?: boolean;
  style?: CSSProperties;
};

export const EntryCard = ({ data, onDelete, deleting, style }: EntryCardProps): ReactNode => {
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
          <Button variant='default' className={styles.remove} onClick={() => onDelete?.(id!)}>
            {deleting ? <Loader size={20} /> : CLEAR_BTN_TEXT}
          </Button>
        </div>
        <ul className={styles.delails}>
          <li className={styles.item}>
            <span className={styles.label}>Started:</span>
            <span>{started}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Latency:</span>
            <span>{durationMs}ms</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Req:</span>
            <span>{reqKb}kB</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Resp:</span>
            <span>{respKb}kB</span>
          </li>
          {error && (
            <li className={styles.item}>
              <span className={styles.label}>Error:</span>
              <span className={clsx(styles.ellipsis, styles['error-msg'])}>{error}</span>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
};
