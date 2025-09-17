import { render, screen } from '@testing-library/react';
import { Footer, COPYRIGHT, RSS_URL, RSS_LOGO_SRC } from './Footer';

describe('Footer', () => {
  it('renders all authors with links', () => {
    render(<Footer />);
    expect(screen.getByText('Nataliya')).toHaveAttribute('href', 'https://github.com/nataliyamoon');
    expect(screen.getByText('Anna')).toHaveAttribute('href', 'https://github.com/AnnaSergeevnaIv');
    expect(screen.getByText('Andrew')).toHaveAttribute('href', 'https://github.com/dusixx');
  });

  it('renders RSS link with logo and copyright', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /rss logo/i });
    expect(link).toHaveAttribute('href', RSS_URL);

    const img = screen.getByAltText(/rss logo/i);
    expect(img).toHaveAttribute('src', expect.stringContaining(RSS_LOGO_SRC));

    expect(screen.getByText(COPYRIGHT)).toBeInTheDocument();
  });
});
