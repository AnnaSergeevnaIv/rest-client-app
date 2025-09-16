import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { vi } from 'vitest';

describe('Select', () => {
  it('renders options from labelValuePairs', () => {
    render(<Select labelValuePairs={{ First: 1, Second: 2 }} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);

    expect(options[0]).toHaveAttribute('value', '1');
    expect(options[0]).toHaveAttribute('label', 'First');

    expect(options[1]).toHaveAttribute('value', '2');
    expect(options[1]).toHaveAttribute('label', 'Second');
  });

  it('calls onChange with correct value', () => {
    const handleChange = vi.fn();
    render(<Select labelValuePairs={{ One: 1, Two: 2 }} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('applies custom className', () => {
    render(<Select labelValuePairs={{ A: 'a' }} className='custom-class' />);
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });
});
