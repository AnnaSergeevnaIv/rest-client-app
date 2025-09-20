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

vi.mock('@components/Loader/Loader', () => ({
  Loader: () => <div data-testid='loader'>Loading...</div>,
}));

describe('ResponseSection', () => {
  const responseMockData = {
    status: 200,
    statusText: 'OK',
    headers: {},
    body: 'data',
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders correctly', () => {
    render(<ResponseSection response={responseMockData} error={null} loading={false} />);
    expect(screen.getByText('Response')).toBeInTheDocument();
  });
  test('shows loading state when loading is true', () => {
    render(<ResponseSection response={null} error={null} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows error when error is not null', async () => {
    render(<ResponseSection response={responseMockData} error={'Network error'} loading={false} />);
    expect(screen.getByText('Response error: Network error')).toBeInTheDocument();
  });
});
