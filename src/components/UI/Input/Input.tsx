'use client';

import { IconArrowDown, IconEye, IconEyeInvisible } from '@/common/constants/icons.ts';
import clsx from 'clsx';
import type { ChangeEvent, Ref } from 'react';
import { useCallback, useEffect, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.scss';

export const ARROW_SIZE = 16;
const EYE_SIZE = 16;
const SHOW_PASSWORD_BTN_TITLE = 'Show password';
const CLEAR_BTN_TEXT = '✕';
const CLEAR_BTN_TITLE = 'Clear';

export type InputBaseProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  error?: string | string[];
  width?: string | number;
  wrapperClassName?: string;
};

export type InputProps = InputBaseProps & {
  showDownArrow?: boolean;
  onClear?: () => void;
};

export const Input = ({
  error,
  className,
  value,
  onClear,
  onChange,
  showDownArrow,
  type,
  children,
  width,
  wrapperClassName,
  ref,
  ...rest
}: InputProps): ReactNode => {
  const [showPassword, setShowPassword] = useState(false);
  const [val, setVal] = useState(value ?? '');

  useEffect(() => {
    setVal(value ?? '');
  }, [value]);

  const handleShowPasswordClick = useCallback((): void => {
    setShowPassword(p => !p);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setVal(e.target.value);
      onChange?.(e);
    },
    [onChange],
  );

  const handleClear = useCallback((): void => {
    setVal('');
    onClear?.();
  }, [onClear]);

  const securely = type === 'password';
  const inputType = securely ? (showPassword ? 'text' : 'password') : type;
  const EyeIcon = showPassword ? IconEyeInvisible : IconEye;
  const errorMsg = Array.isArray(error) ? error[0] : error;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)} style={{ width }}>
      {securely && (
        <span
          className={styles['show-password']}
          onClick={handleShowPasswordClick}
          title={SHOW_PASSWORD_BTN_TITLE}
        >
          <EyeIcon size={EYE_SIZE} />
        </span>
      )}
      {!securely && showDownArrow && (
        <span className={styles['down-arrow']}>
          <IconArrowDown size={ARROW_SIZE} />
        </span>
      )}
      {type !== 'search' && (
        <span
          className={styles['clear-btn']}
          onClick={handleClear}
          style={{ display: val ? 'flex' : 'none' }}
          title={CLEAR_BTN_TITLE}
        >
          {CLEAR_BTN_TEXT}
        </span>
      )}
      <input
        ref={ref}
        className={clsx(styles.input, className)}
        type={inputType}
        value={val}
        autoComplete='off'
        onChange={handleChange}
        title={String(val)}
        {...rest}
      />
      {errorMsg && (
        <p className={styles.error} title={errorMsg}>
          {errorMsg}
        </p>
      )}
      {children}
    </div>
  );
};
