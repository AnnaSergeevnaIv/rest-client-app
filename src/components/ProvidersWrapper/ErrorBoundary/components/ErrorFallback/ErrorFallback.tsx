import { ERR_SOMETHING_WRONG } from '@common/constants';
import type { ErrorInfo, JSX } from 'react';
import styles from './ErrorFallback.module.scss';

export const RESET_BTN_TEXT = 'Reset error';

export type ErrorFallbackProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
  resetErrorBoundary?: () => void;
};

export const ErrorFallback = ({
  error,
  errorInfo,
  resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <pre className={styles['error-info']}>
        <div className={styles['error-heading']}>
          <b>{`Error: ${error?.message || ERR_SOMETHING_WRONG}`}</b>
        </div>
        {errorInfo && <p>{errorInfo.componentStack}</p>}
      </pre>
      {resetErrorBoundary && (
        <button className={styles['reset-btn']} onClick={resetErrorBoundary}>
          {RESET_BTN_TEXT}
        </button>
      )}
    </div>
  );
};
