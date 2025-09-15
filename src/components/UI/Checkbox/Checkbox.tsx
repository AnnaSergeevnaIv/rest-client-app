'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import inputStyles from '../Input/Input.module.scss';
import type { InputBaseProps } from '../Input/Input.tsx';
import styles from './Checkbox.module.scss';

export type CheckboxProps = InputBaseProps & {
  label?: string;
};

export const Checkbox = ({ label, className, error, ...rest }: CheckboxProps): ReactNode => {
  const errorMsg = Array.isArray(error) ? error[0] : error;
  return (
    <label className={clsx(styles.wrapper, className)}>
      <input className={styles.box} type='checkbox' {...rest} />
      <span className={styles.label}>{label}</span>
      {errorMsg && <p className={inputStyles.error}>{errorMsg}</p>}
    </label>
  );
};
