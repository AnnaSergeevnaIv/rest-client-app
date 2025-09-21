import Editor from '@monaco-editor/react';
import styles from './ResponseSection.module.scss';

import { useTranslations } from 'next-intl';
import { Loader } from '../Loader/Loader';

import type { ResponseData } from '../pages/Client/Client';
type ResponseSectionProps = {
  response: ResponseData | null;
  error: string | null;
  loading: boolean;
};

export default function ResponseSection({
  response,
  error,
  loading,
}: ResponseSectionProps): React.ReactNode {
  const t = useTranslations('ResponseSection');

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{t('response')}</h2>
      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
      {error && !loading && (
        <div className={styles.error}>
          <p>
            {t('responseError')}: {error}
          </p>
        </div>
      )}
      {!loading && !error && (
        <Editor
          value={JSON.stringify(response ?? {}, null, 2)}
          height='400px'
          options={{
            padding: { top: 10, bottom: 10 },
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            readOnly: true,
          }}
        />
      )}
    </div>
  );
}
