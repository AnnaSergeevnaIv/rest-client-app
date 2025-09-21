import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NavBtn } from './NavBtn';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const mockRouter = { back: vi.fn(), forward: vi.fn(), refresh: vi.fn() };

vi.mock('@/i18n/navigation.ts', () => {
  return {
    redirect: vi.fn(),
    useRouter: () => mockRouter,
  };
});

vi.mock('@/common/utils/type-guards.ts', async () => {
  const actual: Either = await vi.importActual('@/common/utils/type-guards.ts');
  return { ...actual };
});

import { redirect } from '@/i18n/navigation.ts';

describe('NavBtn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children and text', () => {
    render(<NavBtn text='Click me'>Hello</NavBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Hello');
    expect(button).toHaveTextContent('Click me');
  });

  it('calls redirect when href is provided', () => {
    render(
      <NavBtn href='/test' text='Go'>
        Link
      </NavBtn>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(redirect).toHaveBeenCalledWith({ href: '/test', locale: 'en' });
  });

  it('calls router action when action is provided', () => {
    render(
      <NavBtn action='back' text='Back'>
        Button
      </NavBtn>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
