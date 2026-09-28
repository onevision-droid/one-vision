import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Check for standard Supabase auth cookies. 
    // Supabase stores session tokens in cookies starting with 'sb-' and ending with '-auth-token'.
    const hasAuthCookie = req.cookies.getAll().some(cookie => cookie.name.includes('-auth-token'));
    
    if (!hasAuthCookie) {
      // Bounce unauthenticated users to the dedicated /login route
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
