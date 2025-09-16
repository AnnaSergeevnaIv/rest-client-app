import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';
import { vi } from 'vitest';

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio label='Option A' value='a' />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('uses value when label not provided', () => {
    render(<Radio value='123' />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Radio label='Option B' value='b' onChange={handleChange} />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });
});
