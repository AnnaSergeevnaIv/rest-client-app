import createMiddleware from 'next-intl/middleware';
// import type { NextRequest } from 'next/server';
// import { RoutePath } from './common/constants/index.ts';
import { routing } from './i18n/routing';
// import { authClient } from './services/firebase/auth.ts';

export default createMiddleware(routing);

// const publicRoutes = [RoutePath.Signin, RoutePath.Signup] as string[];

// export default async function middleware(
//   req: NextRequest,
// ): Promise<((req: NextRequest) => NextResponse) | NextResponse> {
//   console.error('s');

//   const path = req.nextUrl.pathname;
//   const isPublicRoute = publicRoutes.includes(path);
//   const currentUser = await authClient.getCurrentUser();

//   // if (!isPublicRoute && !currentUser) {
//   //   return NextResponse.redirect(new URL(RoutePath.Signin, req.nextUrl));
//   // }

//   return intlMiddleware(req);
// }

// import { withAuth } from 'next-auth/middleware';

// // Initialize next-intl middleware
// const intlMiddleware = createMiddleware(routing);

// export default withAuth(
//   function middleware(request: NextRequest) {
//     return intlMiddleware(request);
//   },
//   {
//     callbacks: {
//       authorized: async ({ token, req }) => {
//         const user = await authClient.getCurrentUser();
//         const { pathname } = req.nextUrl;

//         // Public routes that don't require authentication
//         const publicPaths = [RoutePath.Signin, RoutePath.Signup];

//         // console.debug('Sss');

//         // Check if current path is public
//         const isPublicPath = publicPaths.some(
//           path => pathname === path || pathname.startsWith(`${path}/`),
//         );

//         // Allow public routes and authenticated users
//         return isPublicPath || !!user;
//       },
//     },
//     pages: {
//       signIn: RoutePath.Signin,
//       error: RoutePath.Signin,
//     },
//   },
// );

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
