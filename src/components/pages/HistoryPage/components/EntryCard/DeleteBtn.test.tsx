import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteBtn } from './DeleteBtn';
import { CLEAR_BTN_TEXT } from '@/components/UI/Input/Input.tsx';
import { deleteHistoryEntry } from '@/services/firebase/admin/request-history/actions.ts';
import { vi } from 'vitest';
import { Loader } from '@/components/Loader/Loader.tsx';

vi.mock('@/services/firebase/admin/request-history/actions.ts', () => ({
  deleteHistoryEntry: vi.fn(),
}));

vi.mock('@/components/Loader/Loader.tsx', () => ({
  Loader: ({ size }: { size: number }) => <div>Loader {size}</div>,
}));

vi.mock('@/components/UI/Button/Button.tsx', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('DeleteBtn', () => {
  const mockId = '123';

  it('renders button with CLEAR_BTN_TEXT initially', () => {
    render(<DeleteBtn id={mockId} />);
    expect(screen.getByText(CLEAR_BTN_TEXT)).toBeInTheDocument();
  });

  it('calls deleteHistoryEntry on click', async () => {
    render(<DeleteBtn id={mockId} />);
    const button = screen.getByText(CLEAR_BTN_TEXT);

    fireEvent.click(button);

    await waitFor(() => {
      expect(deleteHistoryEntry).toHaveBeenCalledWith(mockId);
    });
  });
});
