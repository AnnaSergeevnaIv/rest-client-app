/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client';

import { useCallback, type ReactNode } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../UI/Button/Button.tsx';
import { CLEAR_BTN_TEXT, Input } from '../UI/Input/Input.tsx';
import { useCurrentUserVarsForm } from './VarsForm.hooks.ts';
import styles from './VarsForm.module.scss';
import { DEFAULT_FORMDATA_VALUES } from './VarsForm.utils.ts';

const ADD_BTN_TEXT = 'Add';
const CLEAR_ALL_BTN_TEXT = 'Clear';

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
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<VarsFormData>({ defaultValues: DEFAULT_FORMDATA_VALUES });

  useCurrentUserVarsForm({ getValues, reset });

  const { fields, prepend, remove } = useFieldArray<VarsFormData, 'vars'>({
    control,
    name: 'vars',
  });

  const handleAddClick = useCallback((): void => {
    prepend({ key: '', value: '' });
  }, [prepend]);

  const handleClearClick = useCallback((): void => {
    reset(DEFAULT_FORMDATA_VALUES);
  }, [reset]);

  const handleRemoveClick = useCallback(
    (idx: number): void => {
      remove(idx);
    },
    [remove],
  );

  return (
    <form className={styles.form}>
      <div className={styles.group}>
        <Button className={styles.add} label={ADD_BTN_TEXT} onClick={handleAddClick} />
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
              disabled={fields.length === 1}
              onClick={() => {
                handleRemoveClick(idx);
              }}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
