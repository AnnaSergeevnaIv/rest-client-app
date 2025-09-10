import { createContext } from 'react';
import { type ClientFormType } from '@/components/pages/Client/Client.types';
export type FormContextType = {
  formData: ClientFormType;
  updateFormData: (data: Partial<ClientFormType>) => void;
  clearFormData: () => void;
};
export const FormContext = createContext<FormContextType | null>(null);
