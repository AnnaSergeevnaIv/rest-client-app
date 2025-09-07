'use client';

import { IconArrowDown } from '@/common/constants/icons.ts';
import clsx from 'clsx';
import type { ChangeEvent, Ref } from 'react';
import { useCallback, type ReactNode, type SelectHTMLAttributes } from 'react';
import { ARROW_SIZE } from '../Input/Input.tsx';
import styles from './Select.module.scss';

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  labelValuePairs: Record<string, unknown>;
  ref?: Ref<HTMLSelectElement>;
  onChange?: (v: string) => void;
};

export const Select = ({
  labelValuePairs,
  className,
  onChange,
  ref,
  ...rest
}: SelectProps): ReactNode => {
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>): void => {
      onChange?.(target.value);
    },
    [onChange],
  );

  return (
    <label className={styles.wrapper}>
      <span className={styles['down-arrow']}>
        <IconArrowDown size={ARROW_SIZE} />
      </span>
      <select
        ref={ref}
        className={clsx(styles.select, className)}
        onChange={handleChange}
        {...rest}
      >
        {Object.entries(labelValuePairs).map(([label, value]) => {
          const valueStr = String(value);
          return <option value={valueStr} label={label} key={valueStr} />;
        })}
      </select>
    </label>
  );
};
