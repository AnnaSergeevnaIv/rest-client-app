import { type ResponseData } from './Client';
import { type Header } from './Client.types';

export function encodeUrlBody(string: string): string {
  return btoa(encodeURIComponent(string));
}

export function headersArrayToObject(
  apply: (s: string) => string,
  headers?: Header[],
): Record<string, string> {
  return (
    headers?.reduce((acc, header) => {
      return { ...acc, [header.key]: apply(header.value) };
    }, {}) ?? {}
  );
}

export function queryParamsToHeaders(queryParams: Record<string, string>): Header[] {
  return Object.entries(queryParams).map(([key, value]) => ({ key, value }));
}

export function decodeUrlBody(encodedUrlBody?: string): string {
  if (!encodedUrlBody) return '';
  return decodeURIComponent(atob(encodedUrlBody));
}

export function parseClientPath(path: string): {
  method: string;
  encodedUrl: string;
  encodedBody: string;
} {
  const pathParts = path.split('/');
  const clientIndex = pathParts.indexOf('client');

  if (clientIndex === -1) {
    return { method: '', encodedUrl: '', encodedBody: '' };
  }

  const [method, encodedUrl, encodedBody] = pathParts.slice(clientIndex + 1);
  return { method, encodedUrl, encodedBody };
}

export function parseStoredResponse(
  input: string | null,
): { data: ResponseData | null; error: string | null; loading: boolean } | null {
  if (!input) return null;
  const parsed: unknown = JSON.parse(input);
  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    'data' in parsed &&
    'error' in parsed &&
    'loading' in parsed
  ) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return parsed as { data: ResponseData | null; error: string | null; loading: boolean };
  }
  return null;
}
