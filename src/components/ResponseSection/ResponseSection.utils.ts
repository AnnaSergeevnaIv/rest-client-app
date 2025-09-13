import { type ClientFormType } from '../pages/Client/Client.types';

export function transformFormData(formData: ClientFormType): RequestInit {
  const { method, headers, body } = formData;
  const requestHeaders = headers?.reduce((acc, header) => {
    if (header.key && header.value) {
      return {
        ...acc,
        [header.key]: header.value,
      };
    }
    return acc;
  }, {});
  const options = {
    method,
    headers: requestHeaders,
    body: body === '' ? undefined : body,
  };
  return options;
}
