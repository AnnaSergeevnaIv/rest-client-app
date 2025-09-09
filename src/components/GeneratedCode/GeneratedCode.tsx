'use client';

import { useEffect, useState } from 'react';
import { CODE_LANGUAGES } from './GeneratedCode.constants';
import { Select } from '../UI/Select/Select';
import { type Header } from '../pages/Client/Client.types';
import { generateCode } from './GeneratedCode.utils';
import { Highlight, themes } from 'prism-react-renderer';
export type CodeLanguage = keyof typeof CODE_LANGUAGES;
type GeneratedCodeProps = {
  url: string;
  method: string;
  headers: Header[];
  body: string;
};
export default function GeneratedCode({
  url,
  method,
  headers,
  body,
}: GeneratedCodeProps): React.ReactNode {
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('cURL');
  const [code, setCode] = useState<string>('');
  const onChangeCodeLanguage = (v: string): void => {
    setCodeLanguage(v as CodeLanguage); // eslint-disable-line @typescript-eslint/consistent-type-assertions
  };
  useEffect(() => {
    generateCode(codeLanguage, url, method, headers, body)
      .then(c => {
        setCode(c);
      })
      .catch((error: unknown) => {
        console.error('Code generation error:', error);
        setCode('Error generating code');
      });
  }, [codeLanguage, code, url, method, headers, body]);
  return (
    <div>
      <Select labelValuePairs={CODE_LANGUAGES} onChange={onChangeCodeLanguage} />
      <Highlight theme={themes.github} code={code} language='tsx'>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1} </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
