import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VarsPage from './VarsPage';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => <div data-testid='variables-form' />,
}));

describe('VarsPage', () => {
  it('renders heading and VariablesForm', () => {
    render(<VarsPage />);

    expect(screen.getByText('heading')).toBeInTheDocument();
    expect(screen.getByTestId('variables-form')).toBeInTheDocument();
  });
});
