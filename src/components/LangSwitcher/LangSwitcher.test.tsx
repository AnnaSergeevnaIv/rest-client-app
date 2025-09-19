import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppLocales } from '@/common/constants/index';
import { vi } from 'vitest';
import React from 'react';

const replace = vi.fn();

vi.mock('@/i18n/navigation.ts', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/test-path',
}));

vi.mock('next-intl', () => ({
  useLocale: () => AppLocales.EN,
}));

vi.mock('@/hooks/useAppCustomSearchParams.ts', () => ({
  useAppCustomSearchParams: () => ({
    getQueryParams: () => ({ foo: 'bar' }),
  }),
}));

import { LangSwitcher } from './LangSwitcher';

describe('LangSwitcher', () => {
  it('renders button with opposite locale label', () => {
    render(<LangSwitcher />);
    expect(screen.getByRole('button')).toHaveTextContent(AppLocales.RU.toUpperCase());
  });

  it('calls router.replace with correct args on click', async () => {
    render(<LangSwitcher />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith(
        { pathname: '/test-path', query: { foo: 'bar' } },
        { locale: AppLocales.RU },
      ),
    );
  });

  it('button is disabled when transition is pending', () => {
    const TestLangSwitcher = () => {
      const [isPending] = React.useState(true);
      const TestSwitcher = () => {
        const locale: string = AppLocales.EN;
        const router = { replace };
        const pathname = '/test-path';
        const getQueryParams = () => ({ foo: 'bar' });
        const startTransition = (cb: () => void) => cb();

        const toggleLang = () =>
          startTransition(() => {
            router.replace({ pathname, query: getQueryParams() }, { locale: AppLocales.RU });
          });

        return (
          <label>
            <button disabled={isPending} onClick={toggleLang}>
              {(locale === AppLocales.EN ? AppLocales.RU : AppLocales.EN).toUpperCase()}
            </button>
          </label>
        );
      };
      return <TestSwitcher />;
    };

    render(<TestLangSwitcher />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
