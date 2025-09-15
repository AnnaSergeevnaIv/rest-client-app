import { type ResponseData } from './Client';
import { type ClientFormType, type Header } from './Client.types';

export function encodeUrlBody({ url, body }: Partial<ClientFormType>): string {
  const encodedUrl = btoa(JSON.stringify({ url, body }));
  return encodedUrl;
}

export function headersArrayToObject(headers?: Header[]): Record<string, string> {
  return (
    headers?.reduce((acc, header) => {
      return { ...acc, [header.key]: header.value };
    }, {}) ?? {}
  );
}

export function queryParamsToHeaders(queryParams: Record<string, string>): Header[] {
  return Object.entries(queryParams).map(([key, value]) => ({ key, value }));
}

export function decodeUrlBody(encodedUrlBody?: string): Partial<ClientFormType> {
  if (!encodedUrlBody) return { url: '', body: undefined };
  const decodedUrl: string = atob(encodedUrlBody);
  const parsed: unknown = JSON.parse(decodedUrl);
  if (typeof parsed === 'object' && parsed !== null) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const obj = parsed as Record<string, unknown>;
    return {
      url: typeof obj.url === 'string' ? obj.url : '',
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      body: obj.body as string | undefined,
    };
  }
  return { url: '', body: undefined };
}

export function parseClientPath(path: string): { method: string; encodedUrlBody: string } {
  const pathParts = path.split('/');
  const clientIndex = pathParts.indexOf('client');

  if (clientIndex === -1) {
    return { method: '', encodedUrlBody: '' };
  }

  const [method, encodedUrlBody] = pathParts.slice(clientIndex + 1);
  console.log('method', method);
  return { method, encodedUrlBody };
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
