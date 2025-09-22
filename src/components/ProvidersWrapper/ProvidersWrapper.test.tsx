import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFn: Either, options?: Either) => {
    const Component: React.FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
      <>{children}</>
    );
    return Component;
  },
}));

vi.mock('react-toastify', () => ({
  ToastContainer: (props: React.PropsWithChildren<{ autoClose: number }>) => (
    <div data-testid='toast'>{props.autoClose}</div>
  ),
}));

import ProvidersWrapper from './ProvidersWrapper';

describe('ProvidersWrapper', () => {
  it('renders children and toast container', () => {
    const { getByText, getByTestId } = render(
      <ProvidersWrapper locale='en'>
        <div>Child content</div>
      </ProvidersWrapper>,
    );

    expect(getByText('Child content')).toBeDefined();

    const toast = getByTestId('toast');
    expect(toast).toBeDefined();
    expect(toast.textContent).toBe('1000');
  });
});
