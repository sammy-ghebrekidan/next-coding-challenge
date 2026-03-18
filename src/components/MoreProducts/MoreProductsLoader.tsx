import { getMoreProducts } from '@/services/products';
import { Locale } from '@/config/locales';
import { MoreProductsClient } from './MoreProductsClient';

export async function MoreProductsLoader({ locale }: { locale: Locale }) {
  try {
    const products = await getMoreProducts(locale);
    if (products.length === 0) return null;
    return <MoreProductsClient products={products} locale={locale} />;
  } catch {
    return null;
  }
}
