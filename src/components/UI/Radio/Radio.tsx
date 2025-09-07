'use client';

import type { ReactNode } from 'react';
import type { CheckboxProps } from '../Checkbox/Checkbox.tsx';
import { Checkbox } from '../Checkbox/Checkbox.tsx';

export const Radio = ({ label, value, ...rest }: CheckboxProps): ReactNode => {
  return <Checkbox type='radio' label={label || String(value)} value={value || label} {...rest} />;
};
