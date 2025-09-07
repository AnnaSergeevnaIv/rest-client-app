import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import TestPage from './TestPage.tsx';

describe('TestPage', () => {
  it(`Renders correctly`, () => {
    render(<TestPage />);
    expect(screen.getAllByText(/example/i)).toBeDefined();
  });
});
