import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label='Accept terms' />);
    expect(screen.getByText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox label='Check me' onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders error message when error is string', () => {
    render(<Checkbox label='Test' error='Required field' />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
  });

  it('renders first error message when error is array', () => {
    render(<Checkbox label='Test' error={['First error', 'Second error']} />);
    expect(screen.getByText(/first error/i)).toBeInTheDocument();
    expect(screen.queryByText(/second error/i)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Checkbox label='Styled' className='custom-class' />);
    const wrapper = screen.getByLabelText(/styled/i).parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('can be controlled with checked prop', () => {
    render(<Checkbox label='Controlled' checked />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
