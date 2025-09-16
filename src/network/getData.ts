import { getErrorMessage, showErrorToast } from '@/common/utils';
import { type ClientFormType } from '@/components/pages/Client/Client.types';
import { transformFormData } from '@/components/ResponseSection/ResponseSection.utils';
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
type AnaliticsDataType = {
  durationMs: number;
  status: number;
  timestamp: string;
  method: string;
  requestSize: number;
  responseSize: number;
  error: string | null;
  url: string;
};
export const getData = async (formData: ClientFormType): Promise<GetDataReturnType> => {
  const options = transformFormData(formData);
  const axiosConfig: AxiosRequestConfig = {
    url: formData.url,
    method: options.method,
    headers: options.headers,
    data: options.body,
    validateStatus: () => true,
  };
  const analyticsData: AnaliticsDataType = {
    durationMs: 0,
    status: 0,
    timestamp: new Date().toISOString(),
    method: formData.method,
    requestSize: new TextEncoder().encode(JSON.stringify(options.body ?? '')).length,
    responseSize: 0,
    error: null,
    url: formData.url,
  };
  const start = Date.now();
  try {
    analyticsData.timestamp = new Date().toISOString();
    const response: AxiosResponse<string> = await axios(axiosConfig);
    analyticsData.durationMs = Date.now() - start;
    analyticsData.responseSize = new TextEncoder().encode(JSON.stringify(response.data)).length;
    analyticsData.status = response.status;
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
  }
};
