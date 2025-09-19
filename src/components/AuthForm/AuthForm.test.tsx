import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { AuthForm } from './AuthForm';
import { useAuth } from '../ProvidersWrapper/AuthProvider/AuthContext';
import { showErrorToast } from '@/common/utils';
import { toast } from 'react-toastify';

vi.mock('../ProvidersWrapper/AuthProvider/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/common/utils', () => ({
  showErrorToast: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
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
    console.debug = vi.fn();
  });

  it('successful submit calls signin and toast', async () => {
    const user = { email: 'test@example.com' };
    signin.mockResolvedValueOnce({ user });

    render(<AuthForm login submitLabel='Sign in' />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123!',
      });
      expect(toast.success).toHaveBeenCalledWith('Welcome, test@example.com');
    });
  });

  it('error calls showErrorToast', async () => {
    const error = new Error('Invalid credentials');
    signin.mockRejectedValueOnce(error);

    render(<AuthForm login submitLabel='Sign in' />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith(error);
    });
  });

  it('email clear works', async () => {
    render(<AuthForm login submitLabel='Sign in' />);

    const input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(input, { target: { value: 'to-clear@example.com' } });
    expect(input).toHaveValue('to-clear@example.com');

    const clearButton = screen.getAllByTitle('Clear')[0];
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});
