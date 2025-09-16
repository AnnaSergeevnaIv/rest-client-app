'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from './HomePage';
import * as AuthContext from '@/components/ProvidersWrapper/AuthProvider/AuthContext';

vi.mock('../AboutUsPage/AboutUsPage', () => ({
  default: () => React.createElement('div', { 'data-testid': 'about-us-page' }),
}));

vi.mock('@i18n/navigation', () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: ReactNode;
    href: string;
    className?: string;
  }): React.ReactElement => React.createElement('a', { href, className }, children),
}));

vi.mock('next/navigation', () => ({
  useRouter: (): any => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe('HomePage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders guest view when user is not authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ currentUser: null } as any);
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /welcome!/i })).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByTestId('about-us-page')).toBeInTheDocument();
  });

  it('renders user view when user is authenticated', () => {
    const mockUser = { displayName: 'John Doe', email: 'john@example.com' };
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ currentUser: mockUser } as any);
    render(<HomePage />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(/welcome back, john doe/i);
    expect(screen.getByText(/rest client/i)).toBeInTheDocument();
    expect(screen.getByText(/history/i)).toBeInTheDocument();
    expect(screen.getByText(/variables/i)).toBeInTheDocument();
    expect(screen.getByTestId('about-us-page')).toBeInTheDocument();
  });

  it('falls back to email if displayName is not provided', () => {
    const mockUser = { displayName: '', email: 'john@example.com' };
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ currentUser: mockUser } as any);
    render(<HomePage />);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Welcome back, john@example.com');
    expect(screen.getByTestId('about-us-page')).toBeInTheDocument();
  });
});
