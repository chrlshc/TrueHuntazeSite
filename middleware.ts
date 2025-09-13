import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  // Geo-targeting
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';
  
  response.headers.set('X-User-Country', country);
  response.headers.set('X-User-City', city);
  
  // A/B Testing
  const bucket = Math.random() > 0.5 ? 'A' : 'B';
  response.cookies.set('ab-test-bucket', bucket, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  
  // Cache headers by route
  if (pathname === '/') {
    // Homepage: short cache with revalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );
  } else if (pathname.startsWith('/blog')) {
    // Blog: longer cache
    response.headers.set(
      'Cache-Control', 
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  } else if (pathname.startsWith('/pricing')) {
    // Pricing: no cache (dynamic data)
    response.headers.set(
      'Cache-Control',
      'private, no-cache, no-store, must-revalidate'
    );
  } else if (pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|otf)$/)) {
    // Static assets: immutable cache
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  
  // Performance hints
  response.headers.set('Link', '<https://fonts.googleapis.com>; rel=preconnect');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Local dev convenience: disable auth checks on localhost/non-production
  const host = request.nextUrl.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
  const DEV_MODE = process.env.NODE_ENV !== 'production' && isLocalhost;
  if (DEV_MODE) {
    return response;
  }
  
  // Get auth token (prefer new cookie, keep legacy compatibility)
  const authToken = request.cookies.get('access_token')?.value || request.cookies.get('auth_token')?.value;
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    '/configure',
    '/analytics',
    '/messages',
    '/campaigns',
    '/fans',
    '/platforms',
    '/billing',
    '/social'
  ];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Onboarding route
  const isOnboardingRoute = pathname.startsWith('/onboarding');
  
  // Auth routes (including OAuth callbacks)
  const authRoutes = ['/auth', '/join'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // OAuth routes that should bypass onboarding check
  const oauthRoutes = ['/auth/tiktok', '/auth/instagram', '/auth/reddit', '/auth/google'];
  const isOAuthRoute = oauthRoutes.some(route => pathname.startsWith(route));
  
  // Test routes that should bypass onboarding check
  const testRoutes = ['/test-', '/tiktok-diagnostic', '/debug-'];
  const isTestRoute = testRoutes.some(route => pathname.includes(route));
  
  // If no auth token and trying to access protected route, redirect to auth
  if (!authToken && (isProtectedRoute || isOnboardingRoute)) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  
  // If authenticated and accessing protected routes (not onboarding, OAuth, or test routes)
  if (authToken && isProtectedRoute && !isOAuthRoute && !isTestRoute) {
    // Check if onboarding is bypassed
    const onboardingCompleted = request.cookies.get('onboarding_completed')?.value;
    
    if (!onboardingCompleted) {
      try {
        // Check onboarding status
        const response = await fetch(new URL('/api/users/onboarding-status', request.url), {
          headers: {
            // forward whichever cookie we have
            Cookie: `${request.cookies.get('access_token') ? 'access_token' : 'auth_token'}=${authToken}`,
          },
        });
        
        if (response.ok) {
          const status = await response.json();
          
          // If onboarding not completed, redirect to onboarding
          if (!status.completed) {
            return NextResponse.redirect(new URL('/onboarding/setup', request.url));
          }
        }
      } catch (error) {
        console.error('Failed to check onboarding status:', error);
      }
    }
  }
  
  // If authenticated and trying to access auth routes, redirect to dashboard
  if (authToken && isAuthRoute && !isOAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - static files
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|static).*)',
  ],
};
