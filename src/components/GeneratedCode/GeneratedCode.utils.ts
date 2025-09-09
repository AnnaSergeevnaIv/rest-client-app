import { type Header } from '../pages/Client/Client.types';
import { type CodeLanguage } from './GeneratedCode';
import { convert } from 'postman-code-generators';
import { Request } from 'postman-collection';
import { CODE_VARIANTS } from './GeneratedCode.constants';

export async function generateCode(
  codeLanguage: CodeLanguage,
  url: string,
  method: string,
  headers?: Header[],
  body?: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const language = codeLanguage.includes('JavaScript') ? 'JavaScript' : codeLanguage;
    const bodyObject = body ? { mode: 'raw', raw: body } : undefined;
    const headersArray =
      headers?.map(header => {
        return {
          key: header.key,
          value: header.value,
        };
      }) || [];
    const request = new Request({
      url: url,
      method: method,
      body: bodyObject,
      header: headersArray,
    });
    const options = {};
    convert(language, CODE_VARIANTS[codeLanguage], request, options, (error, snippet) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(snippet);
      }
    });
  });
}
