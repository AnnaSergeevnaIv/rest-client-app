import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from './Header';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

vi.mock('@i18n/navigation.ts', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
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

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      signin: 'Sign in',
      signup: 'Sign up',
      client: 'REST Client',
      variables: 'Variables',
      history: 'History',
      home: 'Home',
      logout: 'Logout',
    };
    return translations[key] ?? key;
  },
}));

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo, navigation links, and LangSwitcher', () => {
    render(<Header />);

    expect(screen.getByAltText('app logo')).toBeInTheDocument();
    expect(screen.getByText(/REST Client/i)).toBeInTheDocument();
    expect(screen.getByText(/Variables/i)).toBeInTheDocument();
    expect(screen.getByText(/History/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
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
