import { render, screen } from '@testing-library/react';
import React from 'react';
import AppErrorBoundary from './AppErrorBoundary';
import { vi } from 'vitest';

vi.mock('./components/ErrorFallback/ErrorFallback.tsx', () => ({
  ErrorFallback: () => <div data-testid='error-fallback'>Something went wrong</div>,
}));

describe('AppErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <AppErrorBoundary>
        <div data-testid='child'>Hello World</div>
      </AppErrorBoundary>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders ErrorFallback when an error is thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    render(
      <AppErrorBoundary>
        <ThrowError />
      </AppErrorBoundary>,
    );
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });
});
