declare module 'postman-code-generators' {
  import { type Request } from 'postman-collection';
  import { type CODE_VARIANTS } from '@/components/GeneratedCode/GeneratedCode.constants';

  export function convert(
    language: string,
    variant: (typeof CODE_VARIANTS)[keyof typeof CODE_VARIANTS],
    request: Request,
    options: Record<string, string>,
    callback: (error: string, snippet: string) => void,
  ): void;
}
