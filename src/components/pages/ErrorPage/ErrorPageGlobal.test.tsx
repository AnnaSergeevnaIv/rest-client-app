import { render, screen } from '@testing-library/react';
import ErrorPageGlobal from './ErrorPageGlobal';
import { RoutePath } from '@/common/constants/index.ts';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width: number; height: number }) => (
    <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
  ),
}));

vi.mock('@/components/NavButton/RedirectBtn.tsx', () => ({
  RedirectBtn: (props: { to: string; children: React.ReactNode }) => (
    <a href={props.to}>{props.children}</a>
  ),
}));

describe('ErrorPageGlobal', () => {
  it('renders image, text and RedirectBtn', () => {
    render(<ErrorPageGlobal style={{ backgroundColor: 'red' }} />);

    const image = screen.getByAltText('Page not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/404.jpg');

    const text = screen.getByText('Are you lost?');
    expect(text).toBeInTheDocument();

    const link = screen.getByText('Go Home');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', RoutePath.Home);
  });
});
