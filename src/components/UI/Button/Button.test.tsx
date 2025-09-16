import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from './Button';

vi.mock('react-spinners', () => ({
  BeatLoader: ({ color, size }: { color: string; size: number }) => (
    <div data-testid='loader' style={{ color, fontSize: size }}>
      Loading...
    </div>
  ),
}));

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label='Click me' />);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(<Button>Child content</Button>);
    expect(screen.getByText(/child content/i)).toBeInTheDocument();
  });

  it('renders default label when type is submit and label is missing', () => {
    render(<Button type='submit' />);
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it('shows loader when loading is true', () => {
    render(<Button label='Click me' loading />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText(/click me/i)).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label='Click me' onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button label='Styled' className='extra-class' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('extra-class');
  });
});
