import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import VarsForm from './VarsForm';
import { AuthContext } from '@/components/ProvidersWrapper/AuthProvider/AuthContext';
import { vi } from 'vitest';

const messages = {
  VariablesPage: {
    add: 'add',
    clear: 'clear',
    key: 'key',
    value: 'value',
  },
};

const mockAuth = {
  signin: vi.fn(),
  signout: vi.fn(),
  signup: vi.fn(),
  currentUser: { uid: '1', email: 'test@test.com' },
  loading: false,
  setLoading: vi.fn(),
};

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale='en' messages={messages}>
      <AuthContext.Provider value={mockAuth}>{ui}</AuthContext.Provider>
    </NextIntlClientProvider>,
  );
}

describe('VarsForm', () => {
  it('renders initial field with key and value inputs', () => {
    renderWithProviders(<VarsForm />);
    expect(screen.getByPlaceholderText('key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('value')).toBeInTheDocument();
  });

  it('adds a new field when clicking add', () => {
    renderWithProviders(<VarsForm />);
    fireEvent.click(screen.getByText('add'));
    expect(screen.getAllByPlaceholderText('key')).toHaveLength(2);
  });

  it('removes a field when clicking ✕', () => {
    renderWithProviders(<VarsForm />);
    fireEvent.click(screen.getByText('add'));
    const removeBtns = screen.getAllByRole('button', { name: '✕' });
    fireEvent.click(removeBtns[1]);
    expect(screen.getAllByPlaceholderText('key')).toHaveLength(1);
  });

  it('does not remove the last remaining field', () => {
    renderWithProviders(<VarsForm />);
    const removeBtn = screen.getByRole('button', { name: '✕' });
    fireEvent.click(removeBtn);
    expect(screen.getAllByPlaceholderText('key')).toHaveLength(1);
  });

  it('updates state when typing in inputs', () => {
    renderWithProviders(<VarsForm />);
    const input = screen.getByPlaceholderText('key') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'foo' } });
    expect(input.value).toBe('foo');
  });
});
