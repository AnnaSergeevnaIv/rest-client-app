import { getErrorInstance } from '@common/utils/index.ts';
import type { ErrorInfo } from 'react';
import { Component, type ReactNode } from 'react';
import type { ErrorFallback } from './index.ts';

export type ErrorBoundaryProps = {
  FallbackComponent?: typeof ErrorFallback;
  children?: ReactNode;
};

export type ErrorBoundaryState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  public state: ErrorBoundaryState = {};

  public componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    this.setState({
      error: getErrorInstance(error),
      errorInfo,
    });
    console.error(error, errorInfo);
  }

  protected resetError(): void {
    this.setState({
      error: undefined,
      errorInfo: undefined,
    });
  }

  public render(): ReactNode {
    const { FallbackComponent, children } = this.props;
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        FallbackComponent && (
          <FallbackComponent
            error={error}
            errorInfo={errorInfo}
            resetErrorBoundary={this.resetError.bind(this)}
          />
        )
      );
    }
    return children;
  }
}
