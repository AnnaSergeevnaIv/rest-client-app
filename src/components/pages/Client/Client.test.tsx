import { describe, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Client from './Client';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      submit: 'Submit',
      urlPlaceholder: 'Enter URL',
    };
    return translations[key] || key;
  },
}));
vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: 'a',
    redirect: vi.fn(),
    usePathname: () => '/',
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
    }),
    getPathname: () => '/',
  }),
}));
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('@/hooks/useCustomSearchParams', () => ({
  useCustomSearchParams: () => ({
    createParamsWithEncodedData: vi.fn(),
  }),
}));

const mockUpdateUrlWithFormData = vi.fn();
vi.mock('@/hooks/useUpdateUrlWithFormData', () => ({
  useUpdateUrlWithFormData: () => mockUpdateUrlWithFormData,
}));

describe('Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<Client />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('calls updateUrlWithFormData when submit button is clicked', async () => {
    render(<Client />);
    const urlInput = screen.getByPlaceholderText('Enter URL');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    waitFor(() => {
      expect(urlInput).toHaveValue('https://example.com');
      expect(screen.getAllByRole('combobox')[0]).toHaveValue('GET');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    waitFor(() => {
      expect(mockUpdateUrlWithFormData).toHaveBeenCalled();
    });
  });
});
