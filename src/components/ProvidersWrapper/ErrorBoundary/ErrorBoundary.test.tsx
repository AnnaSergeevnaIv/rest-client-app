import { FAKE_VALUE } from '@/test-utils/constants.ts';
import { clickElement, getNestedChild, queryNestedChild } from '@/test-utils/utils.ts';
import { ERR_SOMETHING_WRONG } from '@common/constants';
import { getErrorInstance } from '@common/utils';
import { render } from '@testing-library/react';
import {
  componentDidCatchMock,
  ErrorBoundaryMock,
  resetErrorMock,
  setStateMock,
} from 'src/test-utils/mocks/ErrorBoundaryMock.tsx';
import { ProblematicChildMock } from 'src/test-utils/mocks/ProblematicChildMock.tsx';
import { vi } from 'vitest';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback.tsx';
import { ErrorBoundary, ErrorBoundaryState } from './ErrorBoundary.tsx';

const STATE_TO_RESET: ErrorBoundaryState = {
  error: undefined,
  errorInfo: undefined,
};
vi.mock('@common/utils/index.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@common/utils')>();
  return {
    ...actual,
    getErrorInstance: vi.fn(() => Error(FAKE_VALUE)),
  };
});
const renderErrorBoundary = (throwError: boolean, mock: boolean = false): void => {
  const ErrBoundary = mock ? ErrorBoundaryMock : ErrorBoundary;
  render(
    <ErrBoundary FallbackComponent={ErrorFallback}>
      <ProblematicChildMock throwError={throwError} />
    </ErrBoundary>,
  );
};

describe('ErrorBoundary', () => {
  it(`Renders child if no errors where thrown`, () => {
    renderErrorBoundary(false);
    expect(getNestedChild('ProblematicChildMock')).toBeInTheDocument();
    expect(queryNestedChild('ErrorFallback')).toBeNull();
  });

  it(`Displays fallback UI when error occurs`, () => {
    renderErrorBoundary(true);
    expect(getNestedChild('ErrorFallback')).toBeInTheDocument();
    expect(queryNestedChild('ProblematicChildMock')).toBeNull();
  });

  it(`Invokes componentDidCatch and logs error to console`, () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementationOnce(() => {});
    renderErrorBoundary(true);

    const args = componentDidCatchMock.mock.calls[0];
    expect(setStateMock).toHaveBeenCalledWith({
      error: Error(FAKE_VALUE),
      errorInfo: args[1],
    });
    expect(getErrorInstance).toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledWith(Error(ERR_SOMETHING_WRONG), args[1]);
  });

  it(`Resets error on button click`, () => {
    renderErrorBoundary(true, true);
    clickElement(getNestedChild('ErrorFallbackResetBtn'));
    expect(resetErrorMock).toHaveBeenCalled();
    expect(setStateMock.mock.calls[1][0]).toEqual(STATE_TO_RESET);
  });
});
