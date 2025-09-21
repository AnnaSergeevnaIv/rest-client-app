import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { RoutePath } from '@/common/constants/index.ts';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      notFound: 'Page not found',
      home: 'Go Home',
    };
    return map[key] ?? key;
  },
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width: number; height: number }) => (
    <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
  ),
}));

vi.mock('@/components/NavButton/NavBtn.tsx', () => ({
  NavBtn: (props: { href: string; text: string }) => <a href={props.href}>{props.text}</a>,
}));

describe('ErrorPage', () => {
  it('renders image, text and NavBtn', () => {
    render(<ErrorPage />);

    const image = screen.getByAltText('Page not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/404.jpg');

    const text = screen.getByText('Page not found');
    expect(text).toBeInTheDocument();

    const link = screen.getByText('Go Home');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', RoutePath.Home);
  });
});
