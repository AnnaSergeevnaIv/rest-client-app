import { render } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (fn: any) => {
    const Component = (props: any) => <>{props.children}</>;
    return Component;
  },
}));

vi.mock('react-toastify', () => ({
  ToastContainer: (props: any) => <div data-testid='toast'>{props.autoClose}</div>,
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
    expect(toast.textContent).toBe('1500');
  });
});
