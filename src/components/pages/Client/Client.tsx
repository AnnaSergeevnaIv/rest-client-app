'use client';
import MethodUrlSelector from '@/components/MethodUrlSelector/MethodUrlSelector';
import { type SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { type ClientFormType } from './Client.types';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import { useTranslations } from 'next-intl';
import GeneratedCode from '@/components/GeneratedCode/GeneratedCode';
import BodyEditor from '@/components/BodyEditor/BodyEditor';
import styles from './Client.module.scss';
import { Button } from '@/components/UI/Button/Button';
import { useFormContext } from '@/hooks/useFormContext';
import { useEffect } from 'react';

export default function Client(): React.ReactNode {
  const t = useTranslations('Client');
  const { formData, updateFormData } = useFormContext();
  const { handleSubmit, control, setValue } = useForm<ClientFormType>({
    defaultValues: formData,
  });
  const { fields, append, remove } = useFieldArray<ClientFormType, 'headers'>({
    control,
    name: 'headers',
  });
  const watchedFields = useWatch({
    control,
    name: ['url', 'method', 'headers', 'body'],
  });
  useEffect(() => {
    const [url, method, headers, body] = watchedFields;
    updateFormData({ url, method, headers, body });
    console.log(formData);
  }, [watchedFields, updateFormData]);

  const onSubmit: SubmitHandler<ClientFormType> = data => {
    console.log(data);
  };

  return (
    <>
      <h1 className={styles.heading}>Client REST</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        className={styles.wrapper}
      >
        <MethodUrlSelector control={control} setValue={setValue} required={true} />
        <HeadersEditor control={control} append={append} remove={remove} fields={fields} />
        <BodyEditor control={control} />
        <GeneratedCode
          url={watchedFields[0]}
          method={watchedFields[1]}
          headers={watchedFields[2]}
          body={watchedFields[3]}
        />
        <Button type='submit' label={t('submit')} />
      </form>
    </>
  );
}
