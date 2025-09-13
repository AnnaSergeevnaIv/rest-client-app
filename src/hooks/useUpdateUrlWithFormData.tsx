import type { ClientFormType } from '@/components/pages/Client/Client.types';
import { encodeUrlBody, headersArrayToObject } from '@/components/pages/Client/Client.utils';
import { useCustomSearchParams } from './useCustomSearchParams';
import { useCallback } from 'react';
import { type Control, useWatch } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import type { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';

export function useUpdateUrlWithFormData(control: Control<ClientFormType>): () => void {
  const watchedFields = useWatch({
    control,
    name: ['url', 'method', 'headers', 'body'],
  });

  const { createParamsWithEncodedData } = useCustomSearchParams();
  const path = usePathname();

  return useCallback(
    (v?: keyof typeof METHODS) => {
      const [url, method, headers, body] = watchedFields;
      const encodedUrlBody = encodeUrlBody({ url, body });
      const basePath = `/client/${v ?? method}/${encodedUrlBody}`;
      const headersObject = headersArrayToObject(headers);
      createParamsWithEncodedData(headersObject, basePath);
    },
    [watchedFields, createParamsWithEncodedData, path],
  );
}
