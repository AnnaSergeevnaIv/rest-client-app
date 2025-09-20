/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import type { ClientFormType } from '@/components/pages/Client/Client.types';
import {
  decodeUrlBody,
  parseClientPath,
  queryParamsToHeaders,
} from '@/components/pages/Client/Client.utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useCustomSearchParams } from './useCustomSearchParams';
import { useEffect, useState } from 'react';
import { showErrorToast, getErrorMessage } from '@/common/utils';
import { getData } from '@/network/getData';
import type { ResponseData } from '@/components/pages/Client/Client';

export function useClientFormSync(
  setValue: UseFormSetValue<ClientFormType>,
  getValues: UseFormGetValues<ClientFormType>,
): {
  formData: ClientFormType;
  response: ResponseData | null;
  error: string | null;
  loading: boolean;
} {
  const path = usePathname();
  const router = useRouter();
  const searchParamsForLink = useSearchParams();
  const { getQueryParams } = useCustomSearchParams();

  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { method, encodedUrl, encodedBody } = parseClientPath(path);

    if (!method) return;

    if (!Object.values(METHODS).includes(method as keyof typeof METHODS)) {
      router.replace(`/client`);
      return;
    }

    setValue('method', method as keyof typeof METHODS);

    if (!encodedUrl) {
      return;
    }

    let decodedUrl: string;
    let decodedBody: unknown;

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
    setValue('body', decodedBody as string);

    const queryParams = getQueryParams();
    const headers = queryParamsToHeaders(queryParams);

    if (headers.length > 0) {
      setValue('headers', headers);
    }

    setLoading(true);
    const link = `${path}?${searchParamsForLink.toString()}`;
    getData(getValues(), link)
      .then(res => {
        setResponse(res.data);
        setError(res.error);
      })
      .catch((err: unknown) => {
        const msg = getErrorMessage(err);
        showErrorToast(msg);
        setError(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path, setValue, getQueryParams, router]);

  return { formData: getValues(), response, error, loading };
}