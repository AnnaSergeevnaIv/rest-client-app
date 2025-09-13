'use client';
import Editor from '@monaco-editor/react';
import { BODY_LANGUAGES } from './BodyEditor.constants';
import { useState } from 'react';
import { Select } from '../UI/Select/Select';
import styles from './BodyEditor.module.scss';
import { type Control, Controller } from 'react-hook-form';
import { type ClientFormType } from '../pages/Client/Client.types';
type BodyEditorProps = {
  control: Control<ClientFormType>;
};
export default function BodyEditor({ control }: BodyEditorProps): React.ReactNode {
  const [language, setLanguage] = useState<string>(BODY_LANGUAGES.JSON);
  return (
    <div className={styles.wrapper}>
      <Select
        labelValuePairs={BODY_LANGUAGES}
        onChange={(v: string) => {
          setLanguage(v);
        }}
      />
      <Controller
        name='body'
        control={control}
        render={({ field }) => (
          <Editor
            height='150px'
            options={{
              padding: { top: 10, bottom: 10 },
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
            }}
            value={field.value}
            language={language}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
