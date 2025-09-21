import { fireEvent, render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import BodyEditor from './BodyEditor';
import { BODY_LANGUAGES } from './BodyEditor.constants';

vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(({ value, onChange, language }) => (
    <textarea
      data-testid='monaco-editor'
      value={value}
      onChange={e => onChange?.(e.target.value)}
      data-language={language}
    />
  )),
}));
vi.mock('react-hook-form', () => ({
  Controller: ({ render: renderProp }: Either) => {
    const mockField = {
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
    };
    return renderProp({ field: mockField });
  },
}));

describe('BodyEditor', () => {
  test('renders correctly', () => {
    const mockControl = {} as Either;

    render(<BodyEditor control={mockControl} />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });
  test('changes language when select value changes', () => {
    const mockControl = {} as Either;
    render(<BodyEditor control={mockControl} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: BODY_LANGUAGES.text } });
    const monacoEditor = screen.getByTestId('monaco-editor');
    expect(monacoEditor).toHaveAttribute('data-language', BODY_LANGUAGES.text);
  });
});
