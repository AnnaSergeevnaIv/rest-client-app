import { type ClientFormType } from '../pages/Client/Client.types';

export function transformFormData(formData: ClientFormType): {
  method: string;
  headers: Record<string, string>;
  body?: string;
} {
  const { method, headers, body } = formData;

  const requestHeaders =
    headers?.reduce<Record<string, string>>((acc, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }
      return acc;
    }, {}) ?? {};

  return {
    method,
    headers: requestHeaders,
    body: body === '' ? undefined : body,
  };
}
