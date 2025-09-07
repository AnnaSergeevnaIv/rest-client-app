'use client';

import clsx from 'clsx';
import { useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
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
  variant = 'default',
  className,
  ...rest
}: ButtonProps): ReactNode => {
  const childClickedRef = useRef(false);

  const handleClick = ({ target, currentTarget }: MouseEvent<HTMLButtonElement>): void => {
    if (target === currentTarget) {
      if (!childClickedRef.current) {
        onClick?.();
      }
      childClickedRef.current = false;
    } else if (!childClickedRef.current) {
      childClickedRef.current = true;
      onClick?.();
    }
  };
  return (
    <button className={clsx(styles[`btn-${variant}`], className)} onClick={handleClick} {...rest}>
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};
