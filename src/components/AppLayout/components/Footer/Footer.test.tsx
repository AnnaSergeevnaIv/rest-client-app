import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { COPYRIGHT, Footer, RSS_LOGO_SRC, RSS_URL } from './Footer';

describe('Footer', () => {
  test('renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText(COPYRIGHT)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', RSS_URL);
    expect(screen.getByRole('img')).toHaveAttribute('src', RSS_LOGO_SRC);
  });
});
