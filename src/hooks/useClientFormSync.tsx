/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { showErrorToast } from '@/common/utils';
import { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import type { ClientFormType } from '@/components/pages/Client/Client.types';
import {
  decodeUrlBody,
  parseClientPath,
  queryParamsToHeaders,
} from '@/components/pages/Client/Client.utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useCustomSearchParams } from './useCustomSearchParams';

export function useClientFormSync(
  setValue: UseFormSetValue<ClientFormType>,
  getValues: UseFormGetValues<ClientFormType>,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setIsInitializing: (isInitializing: boolean) => void,
): { formData: ClientFormType } {
  const path = usePathname();
  const router = useRouter();
  const { getQueryParams } = useCustomSearchParams();

  useEffect(() => {
    const { method, encodedUrl, encodedBody } = parseClientPath(path);

    if (!method) {
      return;
    }
    if (!Object.values(METHODS).includes(method as keyof typeof METHODS)) {
      router.replace(`/client`);
      return;
    }
    setValue('method', method as keyof typeof METHODS);
    if (!encodedUrl) {
      setIsInitializing(false);
      return;
    }
    setIsSubmitting(true);
    let decodedUrl;
    let decodedBody;

    try {
      decodedUrl = decodeUrlBody(encodedUrl);
      if (!decodedUrl.includes('http') && !decodedUrl.includes('://')) {
        throw Error('Invalid encoded URL or body');
      }
      decodedBody = decodeUrlBody(encodedBody);
    } catch {
      decodedUrl = '';
      decodedBody = undefined;
      showErrorToast('Invalid encoded URL or body');
      router.replace(`/client/${method}`);
    }
    setValue('url', decodedUrl);
    setValue('body', decodedBody);

    const queryParams = getQueryParams();
    const headers = queryParamsToHeaders(queryParams);

    if (headers.length > 0) {
      setValue('headers', headers);
    }
    setIsInitializing(false);
  }, [path, setValue, getQueryParams, router, setIsInitializing, setIsSubmitting]);
  return { formData: getValues() };
}
