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
  variant = 'primary',
  className,
  ...rest
}: ButtonProps): ReactNode => {
  const handleClick = (): void => {
    onClick?.();
  };
  return (
    <button className={clsx(styles[`btn-${variant}`], className)} onClick={handleClick} {...rest}>
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};
