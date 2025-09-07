'use client';

import { IconArrowDown, IconEye, IconEyeInvisible } from '@/common/constants/icons.ts';
import clsx from 'clsx';
import { useCallback, useState, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';
import { Button } from '../Button/Button.tsx';
import styles from './Input.module.scss';

export const ARROW_SIZE = 16;
const CLEAR_BTN_TEXT = '✕';

export type LabelPosition = 'up' | 'left';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  label?: string;
  error?: string | string[];
  showDownArrow?: boolean;
  onClear?: () => void;
  labelPosition?: LabelPosition;
};

export const Input = ({
  label,
  labelPosition,
  children,
  error,
  className,
  value,
  onClear,
  showDownArrow,
  type,
  ref,
  ...rest
}: InputProps): ReactNode => {
  const [showPassword, setShowPassword] = useState(false);
  const errorMsg = Array.isArray(error) ? error[0] : error;

  const handleShowPasswordClick = useCallback((): void => {
    setShowPassword(p => !p);
  }, []);

  const securely = type === 'password';
  const inputType = securely ? (showPassword ? 'text' : 'password') : type;
  const EyeIcon = showPassword ? IconEyeInvisible : IconEye;

  return (
    <label className={clsx(styles.wrapper, labelPosition === 'left' && styles.oneline)}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles['input-wrapper']}>
        {securely && (
          <Button className={styles['show-password']} onClick={handleShowPasswordClick}>
            <EyeIcon />
          </Button>
        )}
        {!securely && showDownArrow && (
          <span className={styles['down-arrow']}>
            <IconArrowDown size={ARROW_SIZE} />
          </span>
        )}
        <Button
          className={styles['clear-btn']}
          onClick={onClear}
          style={{ display: value ? 'flex' : 'none' }}
        >
          {CLEAR_BTN_TEXT}
        </Button>
        <input
          ref={ref}
          className={clsx(styles.input, className)}
          type={inputType}
          autoComplete='off'
          {...rest}
        ></input>
      </div>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {children}
    </label>
  );
};
