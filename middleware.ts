import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const redirect = (url: string) => {
    return NextResponse.redirect(new URL(url, request.url));
  };
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    if (!token) return;
    return redirect('/dashboard');
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) return redirect('/');
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
