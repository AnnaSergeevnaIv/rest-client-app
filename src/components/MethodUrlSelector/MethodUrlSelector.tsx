'use client';
import { useTranslations } from 'next-intl';
import { type Control, Controller } from 'react-hook-form';
import { type ClientFormType } from '../pages/Client/Client.types';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { METHODS } from './MethodUrlSelector.constants';
import styles from './MethodUrlSelector.module.scss';

type MethodUrlSelectorProps = {
  control: Control<ClientFormType>;
  required: boolean;
  onChangeMethod: (v: keyof typeof METHODS) => void;
};

export default function MethodUrlSelector({
  control,
  required,
  onChangeMethod,
}: MethodUrlSelectorProps): React.ReactNode {
  const t = useTranslations('MethodUrlSelector');

  const onMethodChange = (
    v: string,
    field: { value: string; onChange: (val: keyof typeof METHODS) => void },
  ): void => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const methodKey = (Object.keys(METHODS) as Array<keyof typeof METHODS>).find(
      key => METHODS[key] === v,
    );

    if (methodKey) {
      field.onChange(methodKey);
      onChangeMethod(methodKey);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Controller
        name='method'
        control={control}
        render={({ field }) => (
          <Select
            className={styles.method}
            labelValuePairs={METHODS}
            value={field.value}
            onChange={v => {
              onMethodChange(v, field);
              sessionStorage.removeItem('clientResponse');
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
            width='100%'
            placeholder={t('urlPlaceholder')}
            className={styles.input}
            value={field.value}
            onClear={field.onChange}
            onChange={field.onChange}
            required={required}
          />
        )}
      />
    </div>
  );
}
