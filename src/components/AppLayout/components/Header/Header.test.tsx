import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from './Header';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

vi.mock('@i18n/navigation.ts', () => ({
  Link: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/',
}));

vi.mock('@/components/LangSwitcher/LangSwitcher.tsx', () => ({
  LangSwitcher: () => <div data-testid='lang-switcher'>LangSwitcher</div>,
}));

const logoutMock = vi.fn();

vi.mock('./hooks/useLogoutButton.ts', () => ({
  useLogoutButton: () => ({
    logout: logoutMock,
    isAuth: true,
    loggingOut: false,
    currentUser: { email: 'test@example.com' },
  }),
}));

vi.mock('./hooks/useStickyHeader.ts', () => ({
  useStickyHeader: () => ({ isSticky: false }),
}));

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and navigation', () => {
    render(<Header />);
    expect(screen.getByAltText('app logo')).toBeInTheDocument();
    expect(screen.getByText('REST client')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
  });

  it('renders Logout button and calls logout on click', () => {
    render(<Header />);
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});
