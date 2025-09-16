/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client';

import { StorageKey } from '@/common/constants/index.ts';
import { useCallback, type ReactNode } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { Button } from '../UI/Button/Button.tsx';
import { CLEAR_BTN_TEXT, Input } from '../UI/Input/Input.tsx';
import styles from './VarsForm.module.scss';
import { DEFAULT_FORMDATA_VALUES, getPersistedFormData, VarsHelper } from './VarsForm.utils.ts';

const ADD_BTN_TEXT = 'Add';
const CLEAR_ALL_BTN_TEXT = 'Clear';
const NORMALIZE_BTN_TEXT = 'Normalize';

export type VarField<T = string> = {
  key: string;
  value: T;
};
export type VarsFormData<T = VarField> = {
  vars: T[];
};

export default function VarsForm(): ReactNode {
  const {
    control,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<VarsFormData>({
    defaultValues: getPersistedFormData(),
  });

  const { fields, prepend, remove } = useFieldArray<VarsFormData, 'vars'>({
    control,
    name: 'vars',
  });

  useFormPersist(StorageKey.Vars, {
    watch,
    setValue,
    storage: localStorage,
  });

  const handleAddClick = useCallback((): void => {
    prepend({ key: '', value: '' });
  }, [prepend]);

  const handleClearClick = useCallback((): void => {
    reset(DEFAULT_FORMDATA_VALUES);
  }, [reset]);

  const handleNormalizeClick = useCallback((): void => {
    const normalized = VarsHelper.getPersisted();
    if (normalized) {
      reset({ vars: normalized.array });
    } else {
      handleClearClick();
    }
  }, [reset, handleClearClick]);

  return (
    <form className={styles.form}>
      <div className={styles.group}>
        <Button className={styles.add} label={ADD_BTN_TEXT} onClick={handleAddClick} />
        <Button className={styles.btn} label={NORMALIZE_BTN_TEXT} onClick={handleNormalizeClick} />
        <Button className={styles.btn} label={CLEAR_ALL_BTN_TEXT} onClick={handleClearClick} />
      </div>
      <div className={styles.fields}>
        {fields.map((field, idx) => (
          <div key={field.id} className={styles.field}>
            <Input
              className={styles.key}
              width='40%'
              {...register(`vars.${idx}.key`)}
              error={errors.vars?.[idx]?.message}
              placeholder='key'
              onClear={() => {
                setValue(`vars.${idx}.key`, '');
              }}
            />
            <Input
              className={styles.value}
              width='100%'
              {...register(`vars.${idx}.value`)}
              placeholder='value'
              onClear={() => {
                setValue(`vars.${idx}.value`, '');
              }}
            />
            <Button
              className={styles.remove}
              variant='default'
              label={CLEAR_BTN_TEXT}
              style={{ fontSize: 20 }}
              onClick={() => {
                remove(idx);
              }}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
