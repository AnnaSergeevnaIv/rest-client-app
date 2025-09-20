import { render, screen } from '@testing-library/react';
import { Loader, SPINNER_PROPS } from './Loader';
import React from 'react';

describe('Loader', () => {
  it('renders with default size', () => {
    render(<Loader />);
    const img = screen.getByAltText(SPINNER_PROPS.alt) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.width).toBe(40);
    expect(img.height).toBe(40);
    expect(img.src).toContain(SPINNER_PROPS.src);
  });

  it('applies custom size', () => {
    render(<Loader size={60} />);
    const img = screen.getByAltText(SPINNER_PROPS.alt) as HTMLImageElement;
    expect(img.width).toBe(60);
    expect(img.height).toBe(60);
  });

  it('applies additional className and style', () => {
    render(<Loader className='test-class' style={{ opacity: 0.8 }} />);
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('test-class');
    expect(container).toHaveStyle({ opacity: '0.8' });
  });
});
