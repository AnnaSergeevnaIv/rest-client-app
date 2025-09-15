/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';
import { getErrorMessage } from '@/common/utils';
import BodyEditor from '@/components/BodyEditor/BodyEditor';
import GeneratedCode from '@/components/GeneratedCode/GeneratedCode';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import MethodUrlSelector from '@/components/MethodUrlSelector/MethodUrlSelector';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import { Button } from '@/components/UI/Button/Button';
import { useClientFormSync } from '@/hooks/useClientFormSync';
import { useUpdateUrlWithFormData } from '@/hooks/useUpdateUrlWithFormData';
import { getData } from '@/network/getData';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { DEFAULT_FORM_DATA } from './Client.constants';
import styles from './Client.module.scss';
import type { ClientFormType } from './Client.types';
import { parseStoredResponse } from './Client.utils';
export type ResponseData = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
};
export default function Client(): React.ReactNode {
  const t = useTranslations('Client');

  const { handleSubmit, control, setValue } = useForm<ClientFormType>({
    defaultValues: DEFAULT_FORM_DATA,
  });
  const [response, setResponse] = useState<{
    data: ResponseData | null;
    error: string | null;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: false,
  });
  const { fields, append, remove } = useFieldArray<ClientFormType, 'headers'>({
    control,
    name: 'headers',
  });
  const updateUrlWithFormData = useUpdateUrlWithFormData(control);
  useClientFormSync(setValue);

  useEffect(() => {
    const storedResponse = sessionStorage.getItem('clientResponse');
    if (storedResponse) {
      try {
        const parsed = parseStoredResponse(storedResponse);
        setResponse(parsed ?? { data: null, error: null, loading: false });
      } catch {
        sessionStorage.removeItem('clientResponse');
      }
    }
  }, []);

  const onSubmit: SubmitHandler<ClientFormType> = async data => {
    setResponse({ data: null, error: null, loading: true });
    try {
      const result = await getData({
        url: data.url,
        method: data.method,
        headers: data.headers,
        body: data.body,
      });
      const newResponse = {
        data: result.data as ResponseData,
        error: result.error,
        loading: false,
      };
      setResponse(newResponse);
      sessionStorage.setItem('clientResponse', JSON.stringify(newResponse));
      updateUrlWithFormData();
    } catch (error) {
      const errorResponse = { data: null, error: getErrorMessage(error), loading: false };
      setResponse(errorResponse);
      sessionStorage.setItem('clientResponse', JSON.stringify(errorResponse));
      updateUrlWithFormData();
    }
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
        <MethodUrlSelector control={control} required onChangeMethod={updateUrlWithFormData} />
        <HeadersEditor control={control} append={append} remove={remove} fields={fields} />
        <BodyEditor control={control} />
        <GeneratedCode control={control} />
        <Button type='submit' label={t('submit')} />
      </form>
      <ResponseSection response={response} />
    </div>
  );
}
