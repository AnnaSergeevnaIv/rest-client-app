/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import type { ClientFormType } from '@/components/pages/Client/Client.types';
import {
  decodeUrlBody,
  parseClientPath,
  queryParamsToHeaders,
} from '@/components/pages/Client/Client.utils';
import { usePathname, useRouter } from 'next/navigation';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useCustomSearchParams } from './useCustomSearchParams';
import { useEffect } from 'react';
import { showErrorToast } from '@/common/utils';

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
    const pathParts = path.split('/');
    const { method, encodedUrlBody } = parseClientPath(path);
    const hasEncodedUrlBody = pathParts.length > 4;

    if (!method) {
      // setIsInitializing(false);
      return;
    }
    setValue('method', method as keyof typeof METHODS);
    if (!hasEncodedUrlBody) {
      setIsInitializing(false);
      return;
    }
    setIsSubmitting(true);
    let decodedUrlBody;
    try {
      decodedUrlBody = decodeUrlBody(encodedUrlBody);
    } catch {
      decodedUrlBody = { url: '', body: undefined };
      showErrorToast('Invalid URL body');
      router.replace(`/client/${method}`);
    }
    setValue('url', decodedUrlBody.url ?? '');
    setValue('body', decodedUrlBody.body ?? '');

    const queryParams = getQueryParams();
    const headers = queryParamsToHeaders(queryParams);

    if (headers.length > 0) {
      setValue('headers', headers);
    }
    setIsInitializing(false);
  }, [path, setValue, getQueryParams, router]);
  return { formData: getValues() };
}
