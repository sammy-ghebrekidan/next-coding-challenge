import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/config/locales';

describe('middleware locale logic', () => {
  const hasLocale = (pathname: string) =>
    SUPPORTED_LOCALES.some(locale => pathname.startsWith(`/${locale}`));

  const getRedirectPath = (pathname: string) =>
    hasLocale(pathname) ? null : `/${DEFAULT_LOCALE}${pathname}`;

  it('redirects / to /uk/', () => {
    expect(getRedirectPath('/')).toBe('/uk/');
  });

  it('redirects /checkout to /uk/checkout', () => {
    expect(getRedirectPath('/checkout')).toBe('/uk/checkout');
  });

  it('redirects /about to /uk/about', () => {
    expect(getRedirectPath('/about')).toBe('/uk/about');
  });

  it('does not redirect /uk', () => {
    expect(getRedirectPath('/uk')).toBeNull();
  });

  it('does not redirect /us/checkout', () => {
    expect(getRedirectPath('/us/checkout')).toBeNull();
  });

  it('does not redirect /uk/checkout', () => {
    expect(getRedirectPath('/uk/checkout')).toBeNull();
  });
});
