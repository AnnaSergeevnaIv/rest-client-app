/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { getErrorMessage } from '@/common/utils';
import { Highlight, themes } from 'prism-react-renderer';
import { useEffect, useState } from 'react';
import { type Control, useWatch } from 'react-hook-form';
import { Select } from '../UI/Select/Select';
import type { ClientFormType, Header } from '../pages/Client/Client.types';
import { CODE_LANGUAGES } from './GeneratedCode.constants';
import styles from './GeneratedCode.module.scss';
import { generateCode } from './GeneratedCode.utils';
import { useCurrentUserVars } from '../VarsForm/hooks/useCurrentUserVars';

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
    setCodeLanguage(v as CodeLanguage);
  };
  const { apply } = useCurrentUserVars();

  useEffect(() => {
    const validHeaders = headers
      ?.filter((header): header is Header => header.key !== undefined && header.value !== undefined)
      .map(header => ({
        ...header,
        value: apply(header.value),
      }));
    generateCode(codeLanguage, apply(url ?? ''), method ?? '', validHeaders, apply(body ?? ''))
      .then(c => {
        setCode(c);
      })
      .catch((error: unknown) => {
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
