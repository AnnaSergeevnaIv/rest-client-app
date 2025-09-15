import { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import type { ClientFormType } from '@/components/pages/Client/Client.types';
import {
  decodeUrlBody,
  parseClientPath,
  queryParamsToHeaders,
} from '@/components/pages/Client/Client.utils';
import { usePathname, useRouter } from 'next/navigation';
import type { UseFormSetValue } from 'react-hook-form';
import { useCustomSearchParams } from './useCustomSearchParams';
import { useEffect } from 'react';
import { showErrorToast } from '@/common/utils';

export function useClientFormSync(setValue: UseFormSetValue<ClientFormType>): void {
  const path = usePathname();
  const router = useRouter();
  const { getQueryParams } = useCustomSearchParams();

  useEffect(() => {
    const pathParts = path.split('/');
    const { method, encodedUrlBody } = parseClientPath(path);
    const hasEncodedUrlBody = pathParts.length > 4;

    if (!method) {
      sessionStorage.removeItem('clientResponse');
      router.replace(`/client/${Object.keys(METHODS)[0]}`);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    setValue('method', method as keyof typeof METHODS);
    if (!hasEncodedUrlBody) {
      console.log('hasEncodedUrlBody', hasEncodedUrlBody);
      sessionStorage.removeItem('clientResponse');
      return;
    }
    let decodedUrlBody;
    try {
      decodedUrlBody = decodeUrlBody(encodedUrlBody);
    } catch {
      decodedUrlBody = { url: '', body: undefined };
      showErrorToast('Invalid URL body');
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions

    setValue('url', decodedUrlBody.url ?? '');
    setValue('body', decodedUrlBody.body ?? '');

    const queryParams = getQueryParams();
    const headers = queryParamsToHeaders(queryParams);

    if (headers.length > 0) {
      setValue('headers', headers);
    }
  }, [path, setValue, getQueryParams, router]);
}
