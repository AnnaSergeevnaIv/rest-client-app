import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClientPage from './page';

vi.mock('next/dynamic', () => ({
  default: (importFn: () => Promise<Either>, options: Either) => {
    const MockedComponent = () => <div data-testid='dynamic-client'>Dynamic Client</div>;
    MockedComponent.displayName = 'DynamicClient';
    return MockedComponent;
  },
}));

vi.mock('@/components/Loader/Loader', () => ({
  Loader: () => <div data-testid='loader'>Loading...</div>,
}));

describe('ClientPage', () => {
  test('renders correctly', () => {
    render(<ClientPage />);
    expect(screen.getByTestId('dynamic-client')).toBeInTheDocument();
  });
});
