// Route guard running before a page renders, so a guest is redirected instead of served a shell.
//
// The pages keep calling 'requireSession' for the session they need, but a redirect raised there
// happens inside the streaming boundary that 'loading.tsx' opens, which downgrades it to a
// client-side hop. Redirecting here answers the request itself, before any rendering starts.
import { type NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE } from './middleware/cookie';

export function proxy(request: NextRequest): NextResponse {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();

  // Send the guest to the login page, remembering where they were headed.
  const url = new URL('/login', request.url);
  url.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

// Pages that only make sense for a signed-in user.
export const config = {
  matcher: ['/favorites/:path*', '/messages/:path*', '/properties/new/:path*'],
};
