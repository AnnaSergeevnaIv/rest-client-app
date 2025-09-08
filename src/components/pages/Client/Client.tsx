'use client';
import MethodUrlSelector from '@/components/MethodUrlSelector/MethodUrlSelector';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { type ClientFormType } from './Client.types';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import { useTranslations } from 'next-intl';

export default function Client(): React.ReactNode {
  const t = useTranslations('Client');
  const { handleSubmit, control, setValue } = useForm<ClientFormType>();
  const { fields, append, remove } = useFieldArray<ClientFormType, 'headers'>({
    control,
    name: 'headers',
  });

  const onSubmit: SubmitHandler<ClientFormType> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={() => void handleSubmit(onSubmit)()}>
      <MethodUrlSelector control={control} setValue={setValue} required={true} />
      <HeadersEditor control={control} append={append} remove={remove} fields={fields} />
      <input type='submit' value={t('submit')} />
    </form>
  );
}
