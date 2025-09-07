'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import inputStyles from '../Input/Input.module.scss';
import type { InputProps } from '../Input/Input.tsx';
import styles from './Checkbox.module.scss';

type CheckboxProps = Omit<InputProps, 'labelPosition'> & {
  label?: string;
};

export const Checkbox = ({ label, className, error, ...rest }: CheckboxProps): ReactNode => {
  const errorMsg = Array.isArray(error) ? error[0] : error;
  return (
    <label className={clsx(styles.wrapper, className)}>
      <input className={styles.box} type='checkbox' {...rest} />
      <span className={inputStyles.label}>{label}</span>
      {errorMsg && <p className={inputStyles.error}>{errorMsg}</p>}
    </label>
  );
};
