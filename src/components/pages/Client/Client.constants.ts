import type { ClientFormType } from './Client.types';

export const DEFAULT_FORM_DATA: ClientFormType = {
  method: 'GET',
  url: '',
  headers: [],
  body: '',
} as const;
