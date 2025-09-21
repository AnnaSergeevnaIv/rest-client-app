import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { RoutePath, AppLocales } from './common/constants/index.ts';

vi.mock('next-intl/middleware', () => ({
  default: () => (request: Either) => {
    const token = request.cookies?.get?.('token');
    const isPrivateRoute = request.nextUrl.pathname === RoutePath.History;
    if (!token && isPrivateRoute) {
      return NextResponse.redirect(`http://localhost/${AppLocales.Default}/`);
    }
    return NextResponse.next();
  },
}));

import middleware, { config } from './middleware';

describe('middleware', () => {
  let req: NextRequest;

  beforeEach(() => {
    req = {
      nextUrl: {
        pathname: RoutePath.History,
        clone: () => req.nextUrl,
      },
      cookies: {
        get: vi.fn(),
      },
      url: 'http://localhost/history',
    } as unknown as NextRequest;
  });

  it('redirects unauthenticated user from private route to home', () => {
    (req.cookies.get as Either).mockReturnValue(undefined);

    const res = middleware(req);

    expect(res).toBeInstanceOf(NextResponse);
    expect(res.headers.get('location')).toBe(`http://localhost/${AppLocales.Default}/`);
  });

  it('allows access to auth route if no token', () => {
    req.nextUrl.pathname = RoutePath.Signin;
    (req.cookies.get as Either).mockReturnValue(undefined);

    const res = middleware(req);

    expect(res).toBeInstanceOf(NextResponse);
    expect(res.headers.get('location')).toBeNull();
  });

  it('exports config correctly', () => {
    expect(config).toHaveProperty('matcher');
    expect(config).toHaveProperty('runtime', 'nodejs');
  });
});
