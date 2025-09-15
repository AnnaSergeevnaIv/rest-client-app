'use client';

import clsx from 'clsx';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { BeatLoader } from 'react-spinners';
import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'primary' | 'secondary';

type SpinnerStyle = {
  color: string;
  size: string | number;
};

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  label?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  loading?: boolean;
  spinnerStyle?: SpinnerStyle;
};

export const Button = ({
  label,
  children,
  onClick,
  className,
  type = 'button',
  variant = 'primary',
  spinnerStyle = { color: 'white', size: 6 },
  loading,
  ...rest
}: ButtonProps): ReactNode => {
  if (!label && type === 'submit') {
    label = 'Submit';
  }
  const content = loading ? (
    <BeatLoader {...spinnerStyle} />
  ) : (
    <>
      {children}
      {label && <span>{label}</span>}
    </>
  );
  return (
    <button
      className={clsx(styles[`btn-${variant}`], className)}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {content}
    </button>
  );
};
