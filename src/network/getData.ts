import { getErrorMessage, showErrorToast } from '@/common/utils';
import { type ClientFormType } from '@/components/pages/Client/Client.types';
import { transformFormData } from '@/components/ResponseSection/ResponseSection.utils';
export type GetDataType = typeof getData;
type GetDataReturnType = {
  data: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: unknown;
  } | null;
  error: string | null;
};
export const getData = async (formData: ClientFormType): Promise<GetDataReturnType> => {
  const options = transformFormData(formData);

  try {
    const response = await fetch(formData.url, options);
    const contentType = response.headers.get('content-type');

    let body: unknown;

    if (contentType?.includes('application/json')) {
      const json: unknown = await response.json();
      body = json;
    } else {
      body = await response.text();
    }

    return {
      data: {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body,
      },
      error: null,
    };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    if (
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('CORS') ||
      errorMessage.includes('NetworkError')
    ) {
      showErrorToast(errorMessage);
    }

    return { data: null, error: getErrorMessage(error) };
  }
};
