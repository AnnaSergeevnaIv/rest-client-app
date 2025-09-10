import { type METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';

export type ClientFormType = {
  method: keyof typeof METHODS;
  url: string;
  headers?: Header[];
  body?: string;
};
export type Header = {
  key: string;
  value: string;
};
