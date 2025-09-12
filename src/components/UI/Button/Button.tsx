'use client';

import clsx from 'clsx';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'primary' | 'secondary';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  label?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
};

export const Button = ({
  label,
  children,
  onClick,
  className,
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps): ReactNode => {
  if (!label && type === 'submit') {
    label = 'Submit';
  }
  return (
    <button
      className={clsx(styles[`btn-${variant}`], className)}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};
