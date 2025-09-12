'use client';
import MethodUrlSelector from '@/components/MethodUrlSelector/MethodUrlSelector';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import type { ClientFormType } from './Client.types';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import { useTranslations } from 'next-intl';
import GeneratedCode from '@/components/GeneratedCode/GeneratedCode';
import BodyEditor from '@/components/BodyEditor/BodyEditor';
import styles from './Client.module.scss';
import { Button } from '@/components/UI/Button/Button';
import { useEffect, useState } from 'react';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import { DEFAULT_FORM_DATA } from './Client.constants';
import { getData } from '@/network/getData';
import { getErrorMessage } from '@/common/utils';
import { useUpdateUrlWithFormData } from '@/hooks/useUpdateUrlWithFormData';
import { useClientFormSync } from '@/hooks/useClientFormSync';
import { parseStoredResponse } from './Client.utils';
export type ResponseData = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
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
      const newResponse = { data: result.data, error: result.error, loading: false };
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
