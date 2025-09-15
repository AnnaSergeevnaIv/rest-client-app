'use client';

import { removeDups } from '@/common/utils/index.ts';
import type { ReactNode } from 'react';
import type { InputProps } from '../Input/Input.tsx';
import { Input } from '../Input/Input.tsx';

type DatalistProps = Omit<InputProps, 'list'> & {
  items: string[];
  listId: string;
};

export const Datalist = ({ listId, items, ...rest }: DatalistProps): ReactNode => {
  return (
    <Input list={listId} showDownArrow {...rest}>
      <datalist id={listId}>
        {removeDups(items).map(item => {
          return <option key={item} value={item} />;
        })}
      </datalist>
    </Input>
  );
};
