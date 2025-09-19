import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';

const logoutMock = vi.fn();
vi.mock('./hooks/useLogoutButton.ts', () => ({
  useLogoutButton: vi.fn(() => ({
    logout: logoutMock,
    isAuth: false,
    loggingOut: false,
    currentUser: null,
  })),
}));

vi.mock('./hooks/useStickyHeader.ts', () => ({
  useStickyHeader: vi.fn(() => ({ isSticky: false })),
}));

vi.mock('@i18n/navigation.ts', () => ({
  Link: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: vi.fn(() => '/'),
}));

vi.mock('@/components/LangSwitcher/LangSwitcher.tsx', () => ({
  LangSwitcher: () => <div data-testid='lang-switcher'>LangSwitcher</div>,
}));
vi.mock('@/common/constants/icons.ts', () => ({
  IconLogout: ({ size }: { size: number }) => <span data-testid='icon-logout'>logout-{size}</span>,
}));

import { useLogoutButton } from './hooks/useLogoutButton.ts';
import { useStickyHeader } from './hooks/useStickyHeader.ts';
import { usePathname } from '@i18n/navigation.ts';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Sign in and Sign up links when user is not authenticated', () => {
    (useLogoutButton as any).mockReturnValue({
      logout: logoutMock,
      isAuth: false,
      loggingOut: false,
      currentUser: null,
    });
    (usePathname as any).mockReturnValue('/');

    render(<Header />);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('renders navigation links and Logout when user is authenticated', () => {
    (useLogoutButton as any).mockReturnValue({
      logout: logoutMock,
      isAuth: true,
      loggingOut: false,
      currentUser: { email: 'test@example.com' },
    });
    (usePathname as any).mockReturnValue('/client');

    render(<Header />);

    expect(screen.getByText('REST client')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
    expect(logoutMock).toHaveBeenCalled();
  });

  it('applies sticky class when isSticky = true', () => {
    (useLogoutButton as any).mockReturnValue({
      logout: logoutMock,
      isAuth: false,
      loggingOut: false,
      currentUser: null,
    });
    (useStickyHeader as any).mockReturnValue({ isSticky: true });
    (usePathname as any).mockReturnValue('/');

    const { container } = render(<Header />);
    expect(container.querySelector('header')?.className).toMatch(/sticky/);
  });
});
