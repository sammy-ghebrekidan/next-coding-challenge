export type Locale = 'uk' | 'us';

export interface LocaleConfig {
  lang: string;
  currency: string;
  intlLocale: string;
  storeName: string;
  moreProductsHeading: string;
  checkoutHeading: string;
  emptyBasketMessage: string;
  continueShopping: string;
  addToCart: string;
  basketLabel: string;
  totalLabel: string;
  quantityLabel: string;
  productsHeading: string;
  productsDescription: string;
}

const locales: Record<Locale, LocaleConfig> = {
  uk: {
    lang: 'en-GB',
    currency: 'GBP',
    intlLocale: 'en-GB',
    storeName: "Michael's Amazing Web Store",
    moreProductsHeading: 'More Products',
    checkoutHeading: 'Checkout',
    emptyBasketMessage: 'Your basket is empty.',
    continueShopping: 'Continue shopping',
    addToCart: 'Quick add',
    basketLabel: 'Basket',
    totalLabel: 'Total',
    quantityLabel: 'Qty',
    productsHeading: 'Products',
    productsDescription: "Browse Michael's Amazing Web Store Collection",
  },
  us: {
    lang: 'en-US',
    currency: 'USD',
    intlLocale: 'en-US',
    storeName: "Michael's Amazing Web Store",
    moreProductsHeading: 'More Products',
    checkoutHeading: 'Checkout',
    emptyBasketMessage: 'Your cart is empty.',
    continueShopping: 'Continue shopping',
    addToCart: 'Add to cart',
    basketLabel: 'Cart',
    totalLabel: 'Total',
    quantityLabel: 'Qty',
    productsHeading: 'Products',
    productsDescription: "Browse Michael's Amazing Web Store Collection",
  },
};

export const SUPPORTED_LOCALES: Locale[] = Object.keys(locales) as Locale[];
export const DEFAULT_LOCALE: Locale = 'uk';

export const getLocaleConfig = (locale: Locale): LocaleConfig => {
  return locales[locale];
}

export const isValidLocale = (value: string): value is Locale => {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
