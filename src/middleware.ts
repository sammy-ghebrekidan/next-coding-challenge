import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config/locales';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const hasLocale = SUPPORTED_LOCALES.some(locale => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
