import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!pathname.startsWith('/admin/login')) {
      const adminToken = process.env.ADMIN_TOKEN;
      const session = req.cookies.get('admin_session');
      if (!adminToken || !timingSafeEqual(session?.value ?? '', adminToken)) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
