import {
  getLocaleConfig,
  isValidLocale,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} from './locales';

describe('locales config', () => {
  describe('SUPPORTED_LOCALES', () => {
    it('includes uk and us', () => {
      expect(SUPPORTED_LOCALES).toContain('uk');
      expect(SUPPORTED_LOCALES).toContain('us');
    });
  });

  describe('DEFAULT_LOCALE', () => {
    it('is uk', () => {
      expect(DEFAULT_LOCALE).toBe('uk');
    });
  });

  describe('getLocaleConfig', () => {
    it('returns UK config', () => {
      const config = getLocaleConfig('uk');
      expect(config.currency).toBe('GBP');
      expect(config.lang).toBe('en-GB');
      expect(config.basketLabel).toBe('Basket');
    });

    it('returns US config', () => {
      const config = getLocaleConfig('us');
      expect(config.currency).toBe('USD');
      expect(config.lang).toBe('en-US');
      expect(config.basketLabel).toBe('Cart');
    });
  });

  describe('isValidLocale', () => {
    it('returns true for valid locales', () => {
      expect(isValidLocale('uk')).toBe(true);
      expect(isValidLocale('us')).toBe(true);
    });

    it('returns false for invalid locales', () => {
      expect(isValidLocale('fr')).toBe(false);
      expect(isValidLocale('')).toBe(false);
      expect(isValidLocale('UK')).toBe(false);
    });
  });
});
