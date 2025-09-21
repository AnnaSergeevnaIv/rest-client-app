import { ErrorBoundary } from '@components/ProvidersWrapper/ErrorBoundary/ErrorBoundary.tsx';
import { vi } from 'vitest';

export const resetErrorMock = vi.fn();
export const componentDidCatchMock = vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
export const setStateMock = vi.spyOn(ErrorBoundary.prototype, 'setState');

export class ErrorBoundaryMock extends ErrorBoundary {
  protected override resetError(): void {
    resetErrorMock();
    super.resetError();
  }
}
