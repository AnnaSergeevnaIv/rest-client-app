import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useWatch } from 'react-hook-form';
import { describe, vi } from 'vitest';
import { useCurrentUserVars } from '../VarsForm/hooks/useCurrentUserVars';
import GeneratedCode from './GeneratedCode';
import { CODE_LANGUAGES } from './GeneratedCode.constants';
import { generateCode } from './GeneratedCode.utils';

vi.mock('react-hook-form', () => ({
  Controller: ({ render: renderProp }: Either) => {
    const mockField = {
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
    };
    return renderProp({ field: mockField });
  },
  useWatch: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/',
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

vi.mock('./GeneratedCode.utils', () => ({
  generateCode: vi.fn().mockResolvedValue(''),
}));
vi.mock('../VarsForm/hooks/useCurrentUserVars', () => ({
  useCurrentUserVars: vi.fn(),
}));

describe('GeneratedCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(generateCode).mockResolvedValue('');
    vi.mocked(useWatch).mockReturnValue({
      url: '',
      method: '',
      headers: [],
      body: '',
    });
    vi.mocked(useCurrentUserVars).mockReturnValue({
      apply: vi.fn().mockImplementation((value: string) => value),
      getFromLocalStorage: vi.fn(),
    });
  });
  test('renders correctly', () => {
    const mockControl = {} as Either;

    render(<GeneratedCode control={mockControl} currentUser={null} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  test('changes language when select value changes', async () => {
    const mockCode = 'Hello';
    vi.mocked(generateCode).mockResolvedValue(mockCode);
    vi.mocked(useCurrentUserVars).mockReturnValue({
      apply: vi.fn().mockImplementation((value: string) => value),
      getFromLocalStorage: vi.fn(),
    });
    const mockControl = {} as Either;
    render(<GeneratedCode control={mockControl} currentUser={null} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: CODE_LANGUAGES.Java } });
    await waitFor(() => {
      expect(screen.getByText(mockCode)).toBeInTheDocument();
    });
  });
  test('shows error when generating code fails', async () => {
    vi.mocked(generateCode).mockRejectedValue('');
    const mockControl = {} as Either;
    render(<GeneratedCode control={mockControl} currentUser={null} />);
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
  test('replaces undefined form values with empty strings when generating code', () => {
    vi.mocked(useWatch).mockImplementation(() => ({
      url: undefined,
      method: undefined,
      headers: [],
      body: undefined,
    }));
    vi.mocked(useCurrentUserVars).mockReturnValue({
      apply: vi.fn().mockImplementation((value: string | undefined) => value ?? ''),
      getFromLocalStorage: vi.fn(),
    });
    const mockControl = {} as Either;
    render(<GeneratedCode control={mockControl} currentUser={null} />);
    expect(generateCode).toHaveBeenCalledWith('cURL', '', '', [], '');
  });
});
