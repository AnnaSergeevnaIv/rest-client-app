'use client';

import {
  type Control,
  Controller,
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from 'react-hook-form';
import { type ClientFormType } from '../pages/Client/Client.types';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import styles from './HeadersEditor.module.scss';
import { useTranslations } from 'next-intl';
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
              name={`headers.${index}.key`} // eslint-disable-line @typescript-eslint/restrict-template-expressions
              key={`header-key-${String(index)}`}
              control={control}
              render={({ field }) => (
                <Input
                  placeholder={t('headerKeyPlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name={`headers.${index}.value`} // eslint-disable-line @typescript-eslint/restrict-template-expressions
              key={`header-value-${String(index)}`}
              control={control}
              render={({ field }) => (
                <Input
                  placeholder={t('headerValuePlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Button
              type='button'
              label={t('removeHeader')}
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
