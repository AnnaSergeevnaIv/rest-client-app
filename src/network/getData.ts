/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { getErrorMessage, showErrorToast } from '@/common/utils';
import { type ClientFormType } from '@/components/pages/Client/Client.types';
import { type UserPartial } from '@/components/ProvidersWrapper/AuthProvider/AuthContext';
import { transformFormData } from '@/components/ResponseSection/ResponseSection.utils';
import {
  type HttpMethodName,
  type RequestHistoryEntry,
} from '@/services/firebase/admin/request-history/actions';
import { addRequestHistoryEntry } from '@/services/firebase/admin/request-history/add-entry';
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
  currentUser: UserPartial | null,
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
    method: formData.method as Uppercase<HttpMethodName>,
    requestSize: new TextEncoder().encode(JSON.stringify(options.body ?? undefined)).length,
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
    console.log('analyticsData', analyticsData);
    try {
      void addRequestHistoryEntry(currentUser, analyticsData);
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error));
    }
  }
};
