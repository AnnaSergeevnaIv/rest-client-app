import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, type MockedFunction } from 'vitest';
import HistoryPage from './HistoryPage';
import { useRequestHistoryQuery } from '@/services/firebase/admin/request-history/useRequestHistoryQuery';
import { addRequestHistoryEntry } from '@/services/firebase/admin/request-history/add-entry.ts';

vi.mock('@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx', () => ({
  useAuth: vi.fn(() => ({ currentUser: { uid: 'user123' } })),
}));

vi.mock('@/services/firebase/admin/request-history/actions');
vi.mock('@/services/firebase/admin/request-history/add-entry.ts', () => ({
  addRequestHistoryEntry: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/services/firebase/admin/request-history/useRequestHistoryQuery');

describe('HistoryPage', () => {
  const queryEntriesMock = vi.fn(() => Promise.resolve({} as any));
  const deleteEntryMock = vi.fn((id: string) => Promise.resolve('deleted' as string));

  beforeEach(() => {
    vi.clearAllMocks();
    (useRequestHistoryQuery as MockedFunction<typeof useRequestHistoryQuery>).mockReturnValue({
      queryEntries: queryEntriesMock,
      deleteEntry: deleteEntryMock,
    } as any);
  });

  it('renders heading, description, buttons and input', () => {
    render(<HistoryPage />);
    expect(screen.getByRole('heading', { name: /request history/i })).toBeInTheDocument();
    expect(screen.getByText(/saved queries are stored here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add entry/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete entry/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls addRequestHistoryEntry when "Add entry" clicked', async () => {
    render(<HistoryPage />);
    await fireEvent.click(screen.getByRole('button', { name: /add entry/i }));
    expect(addRequestHistoryEntry).toHaveBeenCalledWith({ uid: 'user123' }, expect.any(Object));
  });

  it('calls queryEntries when "Get ALL" clicked', async () => {
    render(<HistoryPage />);
    await fireEvent.click(screen.getByRole('button', { name: /get all/i }));
    expect(queryEntriesMock).toHaveBeenCalled();
  });

  it('calls deleteEntry with input value when "Delete entry" clicked', async () => {
    render(<HistoryPage />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'entry1' } });
    await fireEvent.click(screen.getByRole('button', { name: /delete entry/i }));
    expect(deleteEntryMock).toHaveBeenCalledWith('entry1');
  });

  it('updates input value when typing', () => {
    render(<HistoryPage />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input).toHaveValue('test value');
  });
});
