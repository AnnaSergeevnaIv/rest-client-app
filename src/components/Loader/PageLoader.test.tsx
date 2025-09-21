import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { PageLoader } from './PageLoader';

vi.mock('./Loader', () => ({
  Loader: vi.fn(() => <div data-testid='mock-loader' />),
}));

describe('PageLoader', () => {
  it('renders the Loader component', () => {
    render(<PageLoader />);
    const loader = screen.getByTestId('mock-loader');
    expect(loader).toBeInTheDocument();
  });

  it('has full viewport styling', () => {
    const { container } = render(<PageLoader />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    });
  });
});
