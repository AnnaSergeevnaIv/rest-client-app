'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { METHODS } from './MethodUrlSelector.constants';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './MethodUrlSelector.module.scss';
import { type Control, Controller, type UseFormSetValue } from 'react-hook-form';
import { type ClientFormType } from '../pages/Client/Client.types';

type MethodUrlSelectorProps = {
  control: Control<ClientFormType>;
  setValue: UseFormSetValue<ClientFormType>;
  required: boolean;
};

export default function MethodUrlSelector({
  control,
  setValue,
  required,
}: MethodUrlSelectorProps): React.ReactNode {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations('MethodUrlSelector');
  const method = path.split('/').pop() ?? '';
  const isMethod = Object.keys(METHODS).includes(method);

  useEffect(() => {
    if (!isMethod) {
      router.replace(`/client/${Object.keys(METHODS)[0]}`);
    } else {
      setValue('method', method as keyof typeof METHODS); // eslint-disable-line @typescript-eslint/consistent-type-assertions
    }
  }, [isMethod, router]);

  return (
    <div className={styles.wrapper}>
      <Controller
        name='method'
        control={control}
        render={({ field }) => (
          <Select
            labelValuePairs={METHODS}
            value={isMethod ? method : ''}
            onChange={v => {
              field.onChange(v);
              router.push(`/client/${v}`);
            }}
          />
        )}
      />
      <Controller
        name='url'
        control={control}
        render={({ field }) => (
          <Input
            type='url'
            placeholder={t('urlPlaceholder')}
            className={styles.input}
            value={field.value}
            onChange={v => {
              field.onChange(v);
              setValue('url', v);
            }}
            required={required}
          />
        )}
      />
    </div>
  );
}
