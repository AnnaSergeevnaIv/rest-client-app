'use client';

import { hasOwnKeys } from '@/common/utils/type-guards.ts';
import { redirect, useRouter } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import type { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../UI/Button/Button.tsx';

type RedirectProps = Partial<Parameters<typeof redirect>[0]>;
type RouterAction = {
  action: 'back' | 'forward' | 'refresh';
};
type NavButtonProps = PropsWithChildren & {
  className?: string;
  text?: string;
} & (RedirectProps | RouterAction);

export const NavBtn = ({ className, text, children, ...rest }: NavButtonProps): ReactNode => {
  const router = useRouter();
  const locale = useLocale();

  const handleClick = (): void => {
    if (hasOwnKeys<RedirectProps>(rest, 'href') && rest.href) {
      redirect({ href: rest.href, locale });
    } else if (hasOwnKeys<RouterAction>(rest, 'action')) {
      router[rest.action]();
    }
  };
  return (
    <Button className={className} onClick={handleClick}>
      {children}
      {text}
    </Button>
  );
};
