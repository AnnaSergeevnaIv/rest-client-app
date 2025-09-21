import { render, screen } from '@testing-library/react';
import { EntryCard } from './EntryCard';
import * as utils from './EntryCard.utils';
import type { RequestHistoryEntry } from '@/services/firebase/admin/request-history/actions';
import { vi } from 'vitest';
import type { IconType } from 'react-icons';
import React from 'react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('EntryCard', () => {
  const data: RequestHistoryEntry = {
    id: '1',
    method: 'GET',
    url: '/test',
    link: '/en/test',
    durationMs: 123,
    httpStatus: 200,
    timestamp: 1695200000000,
    requestSize: 1024,
    responseSize: 2048,
    error: 'Some error',
  };

  beforeAll(() => {
    const MockIcon: IconType = () => <svg data-testid='icon' />;
    vi.spyOn(utils, 'getIconByHttpStatusCode').mockReturnValue({
      Icon: MockIcon,
      color: 'green',
    });
    vi.spyOn(utils, 'timestampToLocaleDateTime').mockReturnValue('21.09.2025, 01:03:30');
  });

  it('renders EntryCard with correct data', () => {
    render(<EntryCard data={data} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('/test')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('21.09.2025, 01:03:30')).toBeInTheDocument();
    expect(screen.getByText('1.00 kb')).toBeInTheDocument();
    expect(screen.getByText('2.00 kb')).toBeInTheDocument();
    expect(screen.getByText('Some error')).toBeInTheDocument();
  });
});
