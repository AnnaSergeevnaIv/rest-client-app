'use client';
import BodyEditor from '@/components/BodyEditor/BodyEditor';
import GeneratedCode from '@/components/GeneratedCode/GeneratedCode';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import MethodUrlSelector from '@/components/MethodUrlSelector/MethodUrlSelector';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import { Button } from '@/components/UI/Button/Button';
import { useClientFormSync } from '@/hooks/useClientFormSync';
import { useUpdateUrlWithFormData } from '@/hooks/useUpdateUrlWithFormData';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { DEFAULT_FORM_DATA } from './Client.constants';
import styles from './Client.module.scss';
import type { ClientFormType } from './Client.types';
export type ResponseData = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
};
export default function Client(): React.ReactNode {
  const t = useTranslations('Client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { handleSubmit, control, setValue, getValues, watch } = useForm<ClientFormType>({
    defaultValues: DEFAULT_FORM_DATA,
  });

  const { fields, append, remove } = useFieldArray<ClientFormType, 'headers'>({
    control,
    name: 'headers',
  });
  const updateUrlWithFormData = useUpdateUrlWithFormData(control);
  const { formData } = useClientFormSync(setValue, getValues, setIsSubmitting, setIsInitializing);
  useEffect(() => {
    const subscription = watch(() => {
      if (!isInitializing) {
        setIsSubmitting(false);
        setIsInitializing(true);
      }
    });
    return (): void => {
      subscription.unsubscribe();
    };
  }, [watch, isInitializing]);

  const onSubmit: SubmitHandler<ClientFormType> = (): void => {
    setIsSubmitting(true);
    updateUrlWithFormData();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Client REST</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        className={styles.form}
      >
        <MethodUrlSelector control={control} required />
        <HeadersEditor control={control} append={append} remove={remove} fields={fields} />
        <BodyEditor control={control} />
        <GeneratedCode control={control} />
        <Button type='submit' label={t('submit')} />
      </form>
      <ResponseSection
        formData={formData}
        isSubmitting={isSubmitting}
        isInitializing={isInitializing}
      />
    </div>
  );
}
