import { render, screen } from '@testing-library/react';
import ErrorPageGlobal from './ErrorPageGlobal';
import { RoutePath } from '@/common/constants/index.ts';

describe('ErrorPageGlobal', () => {
  it('renders text and link', () => {
    render(<ErrorPageGlobal style={{ backgroundColor: 'red' }} />);

    const text = screen.getByText('Are you lost?');
    expect(text).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Go Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', RoutePath.Home);
  });
});
