import { FormContext, type FormContextType } from '@/contexts/FormContext/FormContext';
import { useContext } from 'react';

export const useFormContext = (): FormContextType => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error('FormContext not found');
  }
  return formContext;
};
