import { describe, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ResponseSection from './ResponseSection';
import { METHODS } from '../MethodUrlSelector/MethodUrlSelector.constants';
import { getData } from '@/network/getData';
import React from 'react';
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      response: 'Response',
      responseError: 'Response error',
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
vi.mock('@/network/getData', () => ({
  getData: vi.fn(),
}));
vi.mock('@components/Loader/Loader', () => ({
  Loader: () => <div data-testid='loader'>Loading...</div>,
}));

describe('ResponseSection', () => {
  const mockFormData = {
    url: 'https://example.com',
    method: METHODS.GET,
    headers: [],
    body: '',
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders correctly', () => {
    render(<ResponseSection formData={mockFormData} isSubmitting={false} isInitializing={false} />);
    expect(screen.getByText('Response')).toBeInTheDocument();
  });
  test('shows loading state when useState is mocked', () => {
    const useStateSpy = vi.spyOn(React, 'useState');
    useStateSpy
      .mockImplementationOnce(() => [null, vi.fn()])
      .mockImplementationOnce(() => [null, vi.fn()])
      .mockImplementationOnce(() => [true, vi.fn()]);

    render(<ResponseSection formData={mockFormData} isSubmitting={true} isInitializing={false} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    useStateSpy.mockRestore();
  });

  test('shows error state when useState is mocked', async () => {
    vi.mocked(getData).mockResolvedValue({
      data: null,
      error: 'Network error',
    });

    render(<ResponseSection formData={mockFormData} isSubmitting={true} isInitializing={false} />);
    await waitFor(() => {
      expect(screen.getByText('Response error: Network error')).toBeInTheDocument();
    });
  });
  test('shows data state when useState is mocked', async () => {
    vi.mocked(getData).mockResolvedValue({
      data: {
        status: 200,
        statusText: 'OK',
        headers: {},
        body: 'data',
      },
      error: null,
    });
    render(<ResponseSection formData={mockFormData} isSubmitting={true} isInitializing={false} />);
    waitFor(() => {
      expect(screen.getByText('data')).toBeInTheDocument();
    });
  });
});
