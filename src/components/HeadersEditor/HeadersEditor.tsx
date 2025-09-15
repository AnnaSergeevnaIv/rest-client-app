/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client';

import { HttpRequestHeadersArray } from '@/data/headers-list.ts';
import { useTranslations } from 'next-intl';
import {
  type Control,
  Controller,
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from 'react-hook-form';
import { type ClientFormType } from '../pages/Client/Client.types';
import { Button } from '../UI/Button/Button';
import { Datalist } from '../UI/Datalist/Datalist.tsx';
import { CLEAR_BTN_TEXT, Input } from '../UI/Input/Input';
import styles from './HeadersEditor.module.scss';
type HeadersEditorProps = {
  control: Control<ClientFormType>;
  append: UseFieldArrayAppend<ClientFormType, 'headers'>;
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<ClientFormType, 'headers'>[];
};

export default function HeadersEditor({
  control,
  append,
  remove,
  fields,
}: HeadersEditorProps): React.ReactNode {
  const t = useTranslations('HeadersEditor');

  const addHeader = (): void => {
    append({ key: '', value: '' });
  };
  const removeHeader = (index: number): void => {
    remove(index);
  };

  return (
    <div className={styles.headers}>
      <Button type='button' label={t('addHeader')} onClick={addHeader} />
      {fields.map((_, index) => {
        return (
          <div key={`header-${String(index)}`} className={styles.header}>
            <Controller
              name={`headers.${index}.key`}
              key={`header-key-${String(index)}`}
              control={control}
              render={({ field }) => (
                <Datalist
                  items={HttpRequestHeadersArray}
                  listId={`header-key-${String(index)}`}
                  width='100%'
                  placeholder={t('headerKeyPlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                  onClear={field.onChange}
                />
              )}
            />
            <Controller
              name={`headers.${index}.value`}
              key={`header-value-${String(index)}`}
              control={control}
              render={({ field }) => (
                <Input
                  width='100%'
                  placeholder={t('headerValuePlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                  onClear={field.onChange}
                />
              )}
            />
            <Button
              className={styles.btn}
              variant='default'
              label={CLEAR_BTN_TEXT}
              style={{ fontSize: 20 }}
              onClick={() => {
                removeHeader(index);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
