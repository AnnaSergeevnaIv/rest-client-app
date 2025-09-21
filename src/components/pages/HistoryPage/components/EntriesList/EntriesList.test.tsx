import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EntriesList } from './EntriesList';
import * as actions from '@/services/firebase/admin/request-history/actions';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/services/firebase/admin/request-history/actions', () => ({
  deleteAllHistoryEntries: vi.fn(() => Promise.resolve()),
}));

const mockData: actions.RequestHistoryEntry[] = [
  {
    id: '1',
    method: 'GET',
    url: '/test1',
    link: '/test1',
    durationMs: 120,
    httpStatus: 200,
    timestamp: Date.now(),
    requestSize: 1024,
    responseSize: 2048,
    error: undefined,
  },
  {
    id: '2',
    method: 'POST',
    url: '/test2',
    link: '/test2',
    durationMs: 250,
    httpStatus: 404,
    timestamp: Date.now(),
    requestSize: 512,
    responseSize: 1024,
    error: 'Not found',
  },
];

describe('EntriesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders entries correctly', () => {
    render(<EntriesList data={mockData} />);
    expect(screen.getByText('/test1')).toBeInTheDocument();
    expect(screen.getByText('/test2')).toBeInTheDocument();
  });

  it('handles deletion of all entries', async () => {
    render(<EntriesList data={mockData} />);

    const deleteAllButton = screen.getByRole('button', { name: 'deleteAll' });
    fireEvent.click(deleteAllButton);

    await waitFor(() => {
      expect(actions.deleteAllHistoryEntries).toHaveBeenCalledTimes(1);
    });
  });
});
