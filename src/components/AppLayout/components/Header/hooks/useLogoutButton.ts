import { RoutePath } from '@/common/constants/index.ts';
import type { UserPartial } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams.ts';
import { useRouter } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

const LOGOUT_ID = 'cba032f3fbe1';

export const useLogoutButton = (): {
  logout: () => void;
  isAuth: boolean;
  loggingOut: boolean;
  currentUser: UserPartial | null;
} => {
  const { currentUser, signout } = useAuth();
  const [loggingOut, setLogginOut] = useState(false);
  const { searchParams, clearParams } = useCustomSearchParams();
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.toString() === `logout=${LOGOUT_ID}`) {
      clearParams();
      setLogginOut(false);
    }
  }, [searchParams, clearParams]);

  const logout = useCallback((): void => {
    setLogginOut(true);
    void signout().then(() => {
      router.replace({ pathname: RoutePath.Home, query: { logout: LOGOUT_ID } }, { locale });
    });
  }, [locale, signout, router]);

  const isAuth = useMemo(() => {
    return !!currentUser || loggingOut;
  }, [currentUser, loggingOut]);

  return {
    loggingOut,
    currentUser,
    logout,
    isAuth,
  };
};
