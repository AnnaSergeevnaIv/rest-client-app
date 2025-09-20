import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';
import { RedirectBtn } from './RedirectBtn';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { redirect } from 'next/navigation';

describe('RedirectBtn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children and text', () => {
    render(
      <RedirectBtn to='/test' text='Go'>
        ClickMe
      </RedirectBtn>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('ClickMe');
    expect(button).toHaveTextContent('Go');
  });

  it('calls redirect with correct path when clicked', async () => {
    const user = userEvent.setup();
    render(
      <RedirectBtn to='/target' text='Navigate'>
        Link
      </RedirectBtn>,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(redirect).toHaveBeenCalledWith('/target');
  });
});
