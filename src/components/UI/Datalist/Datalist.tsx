'use client';

import type { ReactNode } from 'react';
import type { InputProps } from '../Input/Input.tsx';
import { Input } from '../Input/Input.tsx';

type DatalistProps = Omit<InputProps, 'list'> & {
  options: readonly string[] | string[];
  listId?: string;
};

export const Datalist = ({ listId, options, ...rest }: DatalistProps): ReactNode => {
  return (
    <Input list={listId} showDownArrow {...rest}>
      <datalist id={listId}>
        {options.map(item => {
          return <option key={item} value={item} />;
        })}
      </datalist>
    </Input>
  );
};
