import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';
import { vi } from 'vitest';

vi.mock('@/components/AppLayout/components/Header/Header.tsx', () => ({
  Header: () => <div data-testid='header'>Header</div>,
}));

vi.mock('./components/Footer/Footer.tsx', () => ({
  Footer: () => <div data-testid='footer'>Footer</div>,
}));

describe('AppLayout', () => {
  it('renders header, main and footer with children', () => {
    render(
      <AppLayout>
        <div data-testid='child'>Child content</div>
      </AppLayout>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
