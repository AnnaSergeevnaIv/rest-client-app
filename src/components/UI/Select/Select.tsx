'use client';

import { IconArrowDown } from '@/common/constants/icons.ts';
import clsx from 'clsx';
import type { Ref } from 'react';
import { type ReactNode, type SelectHTMLAttributes } from 'react';
import inputStyles from '../Input/Input.module.scss';
import { ARROW_SIZE, type LabelPosition } from '../Input/Input.tsx';
import styles from './Select.module.scss';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  labelValuePairs: Record<string, unknown>;
  label?: string;
  labelPosition?: LabelPosition;
  ref?: Ref<HTMLSelectElement>;
};

export const Select = ({
  labelValuePairs,
  label,
  className,
  labelPosition,
  ref,
  ...rest
}: SelectProps): ReactNode => {
  return (
    <label className={clsx(inputStyles.wrapper, labelPosition === 'left' && inputStyles.oneline)}>
      {label && <span>{label}</span>}
      <div className={styles['select-wrapper']}>
        <span className={styles['down-arrow']}>
          <IconArrowDown size={ARROW_SIZE} />
        </span>
        <select ref={ref} className={clsx(styles.select, className)} {...rest}>
          {Object.entries(labelValuePairs).map(([label, value]) => {
            const valueStr = String(value);
            return <option value={valueStr} label={label} key={valueStr} />;
          })}
        </select>
      </div>
    </label>
  );
};
