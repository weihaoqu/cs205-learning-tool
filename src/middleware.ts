import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'cs205_session';

// Paths that don't require authentication (without basePath prefix)
const PUBLIC_PATHS = ['/login', '/register'];

// Paths to skip entirely (static assets, API auth routes)
const SKIP_PATTERNS = [
  /^\/_next/,
  /^\/slides\//,
  /^\/api\/auth\//,
  /\.\w+$/, // files with extensions (favicon.ico, etc.)
];

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and auth API routes
  if (SKIP_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Check if this is a public path
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p);

  if (!token) {
    if (isPublicPath) {
      return NextResponse.next();
    }
    // Redirect to login with ?from= for post-login redirect
    const loginUrl = new URL('/cs205/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Verify the token
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    // If user is on a public path and already authenticated, redirect to home
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/cs205', request.url));
    }

    // Admin route protection
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.next();
  } catch {
    // Invalid/expired token — clear cookie and redirect to login
    const loginUrl = new URL('/cs205/login', request.url);
    loginUrl.searchParams.set('expired', '1');
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      path: '/cs205',
      maxAge: 0,
    });
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
