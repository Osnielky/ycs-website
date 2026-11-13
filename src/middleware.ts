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

const SITE_ORIGIN = 'https://ycosmeticsurgery.com';

// The clinic's previous WordPress site lived on this domain. Once its DNS points at
// this app, every old URL is permanently redirected to the matching page here, so
// old links and listings keep working and their search value carries over.
const OLD_HOSTS = new Set(['xcosmeticsurgery.com', 'www.xcosmeticsurgery.com']);
const OLD_SITE_REDIRECTS: Record<string, string> = {
  '/brazilian-butt-lift': '/procedures/brazilian-butt-lift',
  '/tummy-tuck': '/procedures/tummy-tuck',
  '/lipo-360-2': '/procedures/lipo-360',
  '/breast-augementation': '/procedures/breast-augmentation',
  '/understanding-chin-liposuction-what-you-need-to-know': '/procedures/lipo-360',
  '/services': '/procedures',
  '/special-offers': '/procedures',
  '/photo-gallery': '/gallery',
  '/category/gallery': '/gallery',
  '/bbl-gallery': '/gallery?category=Body',
  '/tummy-tuck-gallery': '/gallery?category=Body',
  '/lipo-360-gallery': '/gallery?category=Body',
  '/breast-augmentation-gallery': '/gallery?category=Breast',
  '/dr-mario-e-reyes': '/dr-mario-reyes-serrano',
  '/category/doctors': '/about',
  '/contact': '/contact',
  '/consults': '/contact',
  '/evaluation': '/contact',
  '/financing-options': '/financing',
  '/out-of-town': '/out-of-town-patients',
  '/privacy-policy': '/privacy-policy',
  '/terms-and-conditions': '/terms',
};

function hostRedirect(req: NextRequest): NextResponse | null {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '')
    .toLowerCase()
    .replace(/:\d+$/, '');

  if (OLD_HOSTS.has(host)) {
    const path = req.nextUrl.pathname.replace(/\/+$/, '') || '/';
    return NextResponse.redirect(SITE_ORIGIN + (OLD_SITE_REDIRECTS[path] ?? '/'), 301);
  }
  // Canonical host: www → bare domain, keeping the path.
  if (host === 'www.ycosmeticsurgery.com') {
    return NextResponse.redirect(SITE_ORIGIN + req.nextUrl.pathname + req.nextUrl.search, 301);
  }
  return null;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const redirected = hostRedirect(req);
  if (redirected) return redirected;

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
