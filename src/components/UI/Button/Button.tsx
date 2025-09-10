'use client';

import clsx from 'clsx';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { BeatLoader } from 'react-spinners';
import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'primary' | 'secondary';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  label?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  loading?: boolean;
  loaderColor?: string;
  loaderSize?: string | number;
};

export const Button = ({
  label,
  children,
  onClick,
  className,
  type = 'button',
  variant = 'primary',
  loaderColor = 'white',
  loaderSize = 6,
  loading,
  ...rest
}: ButtonProps): ReactNode => {
  if (!label && type === 'submit') {
    label = 'Submit';
  }
  const content = loading ? (
    <BeatLoader size={loaderSize} color={loaderColor} />
  ) : (
    <>
      {children}
      {label && <span>{label}</span>}
    </>
  );
  return (
    <button className={clsx(styles[`btn-${variant}`], className)} onClick={onClick} {...rest}>
      {content}
    </button>
  );
};
