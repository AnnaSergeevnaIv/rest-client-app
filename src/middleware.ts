import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { AppLocales, RoutePath, StorageKey } from './common/constants/index.ts';
import { routing } from './i18n/routing';

const i18nMiddleware = createMiddleware(routing);

const authRoutes: string[] = [RoutePath.Signin, RoutePath.Signup];
const privateRoutes: string[] = [RoutePath.History, RoutePath.Variables, RoutePath.Client];

function authMiddleware(request: NextRequest, response: NextResponse): NextResponse {
  const token = request.cookies.get(StorageKey.IdToken)?.value ?? '';

  const { pathname } = request.nextUrl;
  const [, locale = AppLocales.Default, ...rest] = pathname.split('/');
  const pathnameWithoutLocale = `/${rest.join('/')}`;

  const isPrivateRoute =
    privateRoutes.some(p => pathnameWithoutLocale.localeCompare(p) === 0) ||
    pathnameWithoutLocale.includes(RoutePath.Client);
  const isAuthRoute = authRoutes.some(p => pathnameWithoutLocale.localeCompare(p) === 0);

  if ((!token && isPrivateRoute) || (token && isAuthRoute)) {
    return NextResponse.redirect(new URL(`/${locale}${RoutePath.Home}`, request.url));
  }

  return response;
}

export default function middleware(request: NextRequest): NextResponse {
  const response = i18nMiddleware(request);
  if (!response.ok) {
    return response;
  }
  return authMiddleware(request, response);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  runtime: 'nodejs',
};
