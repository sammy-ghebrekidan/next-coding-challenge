import { ApiProduct, Product } from '@/types/cart';
import { Locale, getLocaleConfig } from '@/config/locales';

const PRODUCT_IMAGE = '/mockProductImg.jpg';

export const getNormalizedProduct = (apiProduct: ApiProduct, locale: Locale = 'uk'): Product => {
  const currency = locale === 'uk' ? 'gbp' : 'usd';
  return {
    id: apiProduct.id,
    name: apiProduct.name[locale],
    price: apiProduct.price[currency],
    image: PRODUCT_IMAGE,
  };
}

export const formatPrice = (price: number, locale: Locale = 'uk'): string => {
  const localeConfig = getLocaleConfig(locale);
  return new Intl.NumberFormat(localeConfig.intlLocale, {
    style: 'currency',
    currency: localeConfig.currency,
  }).format(price);
}
