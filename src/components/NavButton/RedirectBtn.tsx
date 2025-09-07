'use client';

import { redirect } from 'next/navigation';
import type { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../UI/Button/Button.tsx';

type NavButtonProps = PropsWithChildren & {
  className?: string;
  text?: string;
  to: string;
};
export const RedirectBtn = ({ className, text, to, children }: NavButtonProps): ReactNode => {
  return (
    <Button className={className} onClick={() => redirect(to)}>
      {children}
      {text}
    </Button>
  );
};
