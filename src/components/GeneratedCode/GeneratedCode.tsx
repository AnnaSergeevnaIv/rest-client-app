'use client';

import { useEffect, useState } from 'react';
import { CODE_LANGUAGES } from './GeneratedCode.constants';
import { Select } from '../UI/Select/Select';
import type { Header, ClientFormType } from '../pages/Client/Client.types';
import { generateCode } from './GeneratedCode.utils';
import { Highlight, themes } from 'prism-react-renderer';
import styles from './GeneratedCode.module.scss';
import { getErrorMessage } from '@/common/utils';
import { type Control, useWatch } from 'react-hook-form';

export type CodeLanguage = keyof typeof CODE_LANGUAGES;
type GeneratedCodeProps = {
  control: Control<ClientFormType>;
};
export default function GeneratedCode({ control }: GeneratedCodeProps): React.ReactNode {
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('cURL');
  const [code, setCode] = useState<string>('');
  const { url, method, headers, body } = useWatch({
    control,
  });
  const onChangeCodeLanguage = (v: string): void => {
    setCodeLanguage(v as CodeLanguage); // eslint-disable-line @typescript-eslint/consistent-type-assertions
  };

  useEffect(() => {
    const validHeaders = headers?.filter(
      (header): header is Header => header.key !== undefined && header.value !== undefined,
    );
    generateCode(codeLanguage, url ?? '', method ?? '', validHeaders, body ?? '')
      .then(c => {
        setCode(c);
      })
      .catch((error: unknown) => {
        console.error('Code generation error:', getErrorMessage(error));
        setCode('Error generating code: ' + getErrorMessage(error));
      });
  }, [codeLanguage, code, url, method, headers, body]);
  return (
    <div className={styles.wrapper}>
      <Select labelValuePairs={CODE_LANGUAGES} onChange={onChangeCodeLanguage} />
      <Highlight theme={themes.github} code={code} language='tsx'>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={className + ' ' + styles.code}>
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
