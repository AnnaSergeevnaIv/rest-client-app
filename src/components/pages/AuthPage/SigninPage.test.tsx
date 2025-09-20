import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, type MockedFunction } from 'vitest';
import SigninPage from './SigninPage';
import { RoutePath } from '@/common/constants/index';

vi.mock('@/components/AuthForm/AuthForm.tsx', () => ({
  AuthForm: vi.fn(() => <div data-testid='auth-form' />),
}));

vi.mock('@/i18n/navigation.ts', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid='mock-link'>
      {children}
    </a>
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      signin: 'Sign in',
      login: 'Login',
      createAccount: 'Create account',
    };
    return translations[key];
  }),
}));

import { AuthForm } from '@/components/AuthForm/AuthForm.tsx';
import { useTranslations } from 'next-intl';

describe('SigninPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading, AuthForm and link with translations', () => {
    render(<SigninPage />);

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();

    const mockedAuthForm = AuthForm as MockedFunction<typeof AuthForm>;
    const firstCallProps = mockedAuthForm.mock.calls[0][0];
    expect(firstCallProps).toEqual(
      expect.objectContaining({
        login: true,
        submitLabel: 'Login',
      }),
    );

    const link = screen.getByTestId('mock-link');
    expect(link).toHaveAttribute('href', RoutePath.Signup);
    expect(link).toHaveTextContent('Create account');
  });
});
