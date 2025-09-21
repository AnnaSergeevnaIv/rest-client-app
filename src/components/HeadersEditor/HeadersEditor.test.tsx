import { describe, vi } from 'vitest';

vi.mock('react-hook-form', () => ({
  Controller: ({ render: renderProp }: Either) => {
    const mockField = {
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
    };
    return renderProp({ field: mockField });
  },
  useFieldArray: vi.fn(),
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

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      addHeader: 'Add Header',
      headerKeyPlaceholder: 'Header Key',
      headerValuePlaceholder: 'Header Value',
    };
    return translations[key] || key;
  },
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HeadersEditor from './HeadersEditor';
import { CLEAR_BTN_TEXT } from '../UI/Input/Input';

describe('HeadersEditor', () => {
  const mockFields = [{ id: '1', key: '', value: '' }];
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders correctly', () => {
    const mockControl = {} as Either;
    render(
      <HeadersEditor control={mockControl} append={vi.fn()} remove={vi.fn()} fields={mockFields} />,
    );
    const addButton = screen.getByRole('button', { name: 'Add Header' });
    expect(addButton).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: CLEAR_BTN_TEXT })).toBeInTheDocument();
  });
  test('adds header when button is clicked', async () => {
    const mockControl = {} as Either;
    const mockAppend = vi.fn();
    render(
      <HeadersEditor control={mockControl} append={mockAppend} remove={vi.fn()} fields={[]} />,
    );
    const addButton = screen.getByRole('button', { name: 'Add Header' });
    fireEvent.click(addButton);
    expect(mockAppend).toHaveBeenCalledWith({ key: '', value: '' });
    waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });
  test('removes header when button is clicked', async () => {
    const mockControl = {} as Either;
    const mockRemove = vi.fn();
    render(
      <HeadersEditor
        control={mockControl}
        append={vi.fn()}
        remove={mockRemove}
        fields={mockFields}
      />,
    );
    const removeButton = screen.getByRole('button', { name: CLEAR_BTN_TEXT });
    fireEvent.click(removeButton);
    expect(mockRemove).toHaveBeenCalled();
  });
});
