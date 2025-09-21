import { showErrorToast } from '@/common/utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useAuth } from '../ProvidersWrapper/AuthProvider/AuthContext';
import { AuthForm } from './AuthForm';

vi.mock('../ProvidersWrapper/AuthProvider/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/common/utils', () => ({
  showErrorToast: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      email: 'email',
      password: 'password',
      confirmPassword: 'confirmPassword',
    };
    return translations[key] ?? key;
  },
}));

vi.mock('@/i18n/navigation.ts', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn() },
}));

const signin = vi.fn();
const signup = vi.fn();

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({
      signin,
      signup,
      loading: false,
    });
  });

  it('successful signin submit calls signin and shows toast', async () => {
    const user = { email: 'test@example.com' };
    signin.mockResolvedValueOnce({ user });

    render(<AuthForm login submitLabel='Sign in' />);

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123!',
      });
      expect(toast.success).toHaveBeenCalledWith('welcome, test@example.com');
    });
  });

  it('signup submit calls signup and shows toast', async () => {
    const user = { email: 'new@example.com' };
    signup.mockResolvedValueOnce({ user });

    render(<AuthForm submitLabel='Sign up' />);

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('confirmPassword'), {
      target: { value: 'password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123!',
        confirmPassword: 'password123!',
      });
      expect(toast.success).toHaveBeenCalledWith('welcome, new@example.com');
    });
  });

  it('error during signin calls showErrorToast', async () => {
    const error = new Error('Invalid credentials');
    signin.mockRejectedValueOnce(error);

    render(<AuthForm login submitLabel='Sign in' />);

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith(error);
    });
  });

  it('clears email input when clear button is clicked', async () => {
    render(<AuthForm login submitLabel='Sign in' />);

    const input = screen.getByPlaceholderText('email');
    fireEvent.change(input, { target: { value: 'to-clear@example.com' } });
    expect(input).toHaveValue('to-clear@example.com');

    const clearButton = screen.getAllByTitle('Clear')[0];
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});
