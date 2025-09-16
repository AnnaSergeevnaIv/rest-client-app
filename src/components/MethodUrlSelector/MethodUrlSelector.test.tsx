import { describe, vi } from 'vitest';
import MethodUrlSelector from './MethodUrlSelector';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Controller } from 'react-hook-form';
import { METHODS } from './MethodUrlSelector.constants';

vi.mock('react-hook-form', () => ({
  Controller: ({ render: renderProp }: any) => {
    const mockField = {
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
    };
    return renderProp({ field: mockField });
  },
  useFieldArray: vi.fn(),
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      urlPlaceholder: 'Enter URL',
    };
    return translations[key] || key;
  },
}));

describe('MethodUrlSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders correctly', () => {
    const mockControl = {} as any;
    render(<MethodUrlSelector control={mockControl} required={false} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  test('changes method when select is changed', async () => {
    const mockOnChange = vi.fn();

    const mockControl = {
      onChange: mockOnChange,
    } as any;
    render(<MethodUrlSelector control={mockControl} required={false} />);

    screen.debug();
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('GET');
    fireEvent.change(select, { target: { value: METHODS.PUT } });
    waitFor(() => {
      expect(select).toHaveValue('PUT');
    });
  });
});
