import { render, screen, fireEvent } from '@testing-library/react';
import { Input, CLEAR_BTN_TEXT } from './Input';
import { vi } from 'vitest';

describe('Input', () => {
  it('renders with down arrow when showDownArrow is true', () => {
    const { container } = render(<Input type='text' showDownArrow />);
    expect(container.querySelector('span[class*="down-arrow"]')).toBeInTheDocument();
  });

  it('toggles password visibility when eye icon clicked', () => {
    const { container } = render(<Input type='password' />);
    const eyeBtn = screen.getByTitle('Show password');
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(eyeBtn);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(eyeBtn);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows and triggers clear button', () => {
    const handleClear = vi.fn();
    const { container } = render(
      <Input type='text' value='abc' onClear={handleClear} onChange={() => {}} />,
    );

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);

    const clearBtn = screen.getByTitle('Clear');
    expect(clearBtn).toHaveTextContent(CLEAR_BTN_TEXT);

    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalled();
  });

  it('renders error message', () => {
    render(<Input type='text' error='Required field' />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    const { container } = render(<Input type='text' value='' onChange={handleChange} />);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
