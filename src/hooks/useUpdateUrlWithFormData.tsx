/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import type { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import type { ClientFormType } from '@/components/pages/Client/Client.types';
import { encodeUrlBody, headersArrayToObject } from '@/components/pages/Client/Client.utils';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { type Control, useWatch } from 'react-hook-form';
import { useCustomSearchParams } from './useCustomSearchParams';
import { useCurrentUserVars } from '@/components/VarsForm/hooks/useCurrentUserVars';

export function useUpdateUrlWithFormData(control: Control<ClientFormType>): () => void {
  const watchedFields = useWatch({
    control,
    name: ['url', 'method', 'headers', 'body'],
  });

  const { createParamsWithEncodedData } = useCustomSearchParams();
  const path = usePathname();
  const { apply } = useCurrentUserVars();
  return useCallback(
    (v?: keyof typeof METHODS) => {
      const [url, method, headers, body] = watchedFields;
      const encodedUrl = encodeUrlBody(apply(url));
      const encodedBody = encodeUrlBody(apply(body ?? ''));
      const basePath = `/client/${v ?? method}/${encodedUrl}/${encodedBody}`;
      const headersObject = headersArrayToObject(apply, headers);
      createParamsWithEncodedData(headersObject, basePath);
    },
    [watchedFields, createParamsWithEncodedData, path],
  );
}
