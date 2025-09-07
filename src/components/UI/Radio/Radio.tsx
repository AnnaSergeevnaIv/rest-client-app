'use client';

import type { ReactNode } from 'react';
import { Checkbox } from '../Checkbox/Checkbox.tsx';
import type { InputProps } from '../Input/Input.tsx';

export const Radio = ({ label, value, ...rest }: InputProps): ReactNode => {
  return <Checkbox type='radio' label={label || String(value)} value={value || label} {...rest} />;
};
