import { getErrorMessage, showErrorToast } from '@/common/utils';
import { type ClientFormType } from '@/components/pages/Client/Client.types';
import { transformFormData } from '@/components/ResponseSection/ResponseSection.utils';
import {
  addHistoryEntry,
  type RequestHistoryEntry,
} from '@/services/firebase/admin/request-history/actions';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
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
export const getData = async (
  formData: ClientFormType,
  link: string,
): Promise<GetDataReturnType> => {
  const options = transformFormData(formData);
  const axiosConfig: AxiosRequestConfig = {
    url: formData.url,
    method: options.method,
    headers: options.headers,
    data: options.body,
    validateStatus: () => true,
  };
  const analyticsData: RequestHistoryEntry = {
    durationMs: 0,
    httpStatus: 0,
    timestamp: Date.now(),
    method: formData.method,
    requestSize: new TextEncoder().encode(options.body ?? undefined).length,
    responseSize: 0,
    url: formData.url,
    link: link,
  };
  const start = Date.now();
  try {
    const response: AxiosResponse<string> = await axios(axiosConfig);
    analyticsData.durationMs = Date.now() - start;
    analyticsData.responseSize = new TextEncoder().encode(JSON.stringify(response.data)).length;
    analyticsData.httpStatus = response.status;
    const headers: Record<string, string> = Object.fromEntries(
      Object.entries(response.headers).map(([k, v]) => [k, String(v)]),
    );
    return {
      data: {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
        body: response.data,
      },
      error: null,
    };
  } catch (error: unknown) {
    analyticsData.durationMs = Date.now() - start;
    analyticsData.error = getErrorMessage(error);
    showErrorToast(analyticsData.error);
    return { data: null, error: analyticsData.error };
  } finally {
    try {
      void addHistoryEntry(analyticsData);
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error));
    }
  }
};
