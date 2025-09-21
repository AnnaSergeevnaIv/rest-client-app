/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client';

import { HttpRequestHeadersArray } from '@/data/headers-list.ts';
import { TestId } from '@/test-utils/constants.ts';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import type { UseFieldArrayReplace } from 'react-hook-form';
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
  replace: UseFieldArrayReplace<ClientFormType>;
};

export default function HeadersEditor({
  control,
  append,
  remove,
  fields,
  replace,
}: HeadersEditorProps): React.ReactNode {
  const t = useTranslations('HeadersEditor');

  const addHeader = (): void => {
    append({ key: '', value: '' });
  };
  const removeHeader = (index: number): void => {
    remove(index);
  };
  const handleClearClick = useCallback((): void => {
    replace([]);
  }, [replace]);

  return (
    <div className={styles.headers}>
      <div className={styles.group}>
        <Button type='button' label={t('addHeader')} onClick={addHeader} className={styles.add} />
        <Button
          className={styles.btn}
          label={t('clear')}
          onClick={handleClearClick}
          data-testid={TestId.ClearBtn}
        />
      </div>
      {fields.map((arrayField, index) => {
        return (
          <div key={arrayField.id} className={styles.field}>
            <Controller
              name={`headers.${index}.key`}
              key={`controller-key-${arrayField.id}`}
              control={control}
              render={({ field }) => (
                <Datalist
                  className={styles.key}
                  items={HttpRequestHeadersArray}
                  listId={`header-key-${arrayField.id}`}
                  width='60%'
                  placeholder={t('headerKeyPlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                  onClear={field.onChange}
                />
              )}
            />
            <Controller
              name={`headers.${index}.value`}
              key={`controller-value-${arrayField.id}`}
              control={control}
              render={({ field }) => (
                <Input
                  className={styles.value}
                  width='100%'
                  placeholder={t('headerValuePlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                  onClear={field.onChange}
                />
              )}
            />
            <Button
              className={styles['delete-header']}
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
