'use client';
import BodyEditor from '@/components/BodyEditor/BodyEditor';
import GeneratedCode from '@/components/GeneratedCode/GeneratedCode';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import MethodUrlSelector from '@/components/MethodUrlSelector/MethodUrlSelector';
import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import { Button } from '@/components/UI/Button/Button';
import { useClientFormSync } from '@/hooks/useClientFormSync';
import { useUpdateUrlWithFormData } from '@/hooks/useUpdateUrlWithFormData';
import { useTranslations } from 'next-intl';
import { useFieldArray, useForm } from 'react-hook-form';
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
  const { handleSubmit, control, setValue, getValues } = useForm<ClientFormType>({
    defaultValues: DEFAULT_FORM_DATA,
  });
  const { currentUser } = useAuth();

  const { fields, append, remove, replace } = useFieldArray<ClientFormType, 'headers'>({
    control,
    name: 'headers',
  });

  const updateUrlWithFormData = useUpdateUrlWithFormData(control);

  const { response, error, loading } = useClientFormSync(setValue, getValues);

  const onSubmit = (): void => {
    updateUrlWithFormData();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{t('heading')}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        className={styles.form}
      >
        <MethodUrlSelector control={control} required />
        <HeadersEditor
          control={control}
          append={append}
          remove={remove}
          fields={fields}
          replace={replace}
        />
        <BodyEditor control={control} />
        <GeneratedCode control={control} currentUser={currentUser} />
        <Button type='submit' label={t('submit')} />
      </form>
      <ResponseSection response={response} error={error} loading={loading} />
    </div>
  );
}
