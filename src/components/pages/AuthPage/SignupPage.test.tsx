import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, type MockedFunction } from 'vitest';
import SignupPage from './SignupPage';
import { RoutePath } from '@/common/constants/index';

vi.mock('@/components/AuthForm/AuthForm.tsx', () => ({
  AuthForm: vi.fn(() => <div data-testid='auth-form' />),
}));

vi.mock('@/i18n/navigation.ts', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid='mock-link'>
      {children}
    </a>
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      heading: 'Sign up',
      register: 'Register',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
    };
    return translations[key] ?? key;
  },
}));

import { AuthForm } from '@/components/AuthForm/AuthForm.tsx';

describe('SignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading, AuthForm with correct props, hint and link', () => {
    render(<SignupPage />);

    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();

    const mockedAuthForm = AuthForm as MockedFunction<typeof AuthForm>;
    const firstCallProps = mockedAuthForm.mock.calls[0][0];
    expect(firstCallProps).toEqual(
      expect.objectContaining({
        submitLabel: 'Register',
      }),
    );

    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();

    const link = screen.getByTestId('mock-link');
    expect(link).toHaveAttribute('href', RoutePath.Signin);
    expect(link).toHaveTextContent('Sign in');
  });
});
