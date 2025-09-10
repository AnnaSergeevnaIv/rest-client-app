import { type ClientFormType } from '@/components/pages/Client/Client.types';
import { type FormContextType } from '@/contexts/FormContext/FormContext';
import { useCallback, useState } from 'react';

export const useFormProvider = (): FormContextType => {
  const [formData, setFormData] = useState<ClientFormType>({
    method: 'GET',
    url: '',
    headers: [],
    body: '',
  });
  const updateFormData = useCallback((data: Partial<ClientFormType>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);
  const clearFormData = useCallback(() => {
    setFormData({
      method: 'GET',
      url: '',
      headers: [],
      body: '',
    });
  }, []);
  return { formData, clearFormData, updateFormData };
};
