import Editor from '@monaco-editor/react';
import styles from './ResponseSection.module.scss';

import { useTranslations } from 'next-intl';
import { Loader } from '../Loader/Loader';

import type { ResponseData } from '../pages/Client/Client';
import type { ClientFormType } from '../pages/Client/Client.types';
import { useEffect, useState } from 'react';
import { getData } from '@/network/getData';
import { getErrorMessage, showErrorToast } from '@/common/utils';
type ResponseSectionProps = {
  formData: ClientFormType;
  isSubmitting: boolean;
  isInitializing: boolean;
};

export default function ResponseSection({
  formData,
  isSubmitting,
  isInitializing,
}: ResponseSectionProps): React.ReactNode {
  const t = useTranslations('ResponseSection');
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const result = await getData({
          url: formData.url,
          method: formData.method,
          headers: formData.headers,
          body: formData.body,
        });
        setData(result.data);
        setError(result.error);
      } catch (error) {
        showErrorToast(getErrorMessage(error));
      }
    };
    if (isSubmitting && !isInitializing) {
      setLoading(true);
      void fetchData();
      setLoading(false);
    } else {
      setData(null);
    }
  }, [formData]);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{t('response')}</h2>
      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <p>
            {t('responseError')}: {error}
          </p>
        </div>
      )}
      {!loading && !error && (
        <Editor
          value={JSON.stringify(data ?? {}, null, 2)}
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
