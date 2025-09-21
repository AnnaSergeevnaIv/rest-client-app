import { ERR_SOMETHING_WRONG } from '@common/constants/index.ts';
import { render } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import { clickElement, getNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import { ErrorFallback, RESET_BTN_TEXT } from './ErrorFallback.tsx';

const FAKE_ERROR = Error(FAKE_VALUE);
const FAKE_ERROR_INFO = {
  componentStack: FAKE_VALUE,
};
const resetMock = vi.fn();

describe('ErrorFallback', () => {
  it(`Renders error fallback correctly`, () => {
    const { rerender } = render(
      <ErrorFallback
        error={FAKE_ERROR}
        errorInfo={FAKE_ERROR_INFO}
        resetErrorBoundary={resetMock}
      />,
    );
    const heading = getNestedChild('ErrorFallbackHeading');
    const message = getNestedChild(heading, 'ErrorFallbackMessage');
    const errorInfo = getNestedChild('ErrorFallbackStack');
    const errorBtn = getNestedChild('ErrorFallbackResetBtn');

    expect(message).toHaveTextContent(FAKE_ERROR.message);
    expect(getNestedChild(heading, 'ErrorFallbackIcon')).toBeInTheDocument();

    expect(errorInfo).toBeInTheDocument();
    expect(errorInfo).toHaveTextContent(FAKE_ERROR_INFO.componentStack);

    expect(errorBtn).toBeInTheDocument();
    expect(errorBtn).toHaveTextContent(RESET_BTN_TEXT);

    clickElement(errorBtn);
    expect(resetMock).toHaveBeenCalled();

    rerender(<ErrorFallback />);
    expect(getNestedChild('ErrorFallbackHeading', 'ErrorFallbackMessage')).toHaveTextContent(
      ERR_SOMETHING_WRONG,
    );
  });
});
