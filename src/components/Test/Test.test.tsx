import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import { Test } from './Test.tsx';

describe('Test', () => {
  it(`Renders correctly`, () => {
    render(<Test />);
    expect(screen.getByText(/test/i)).toBeDefined();
  });
});
