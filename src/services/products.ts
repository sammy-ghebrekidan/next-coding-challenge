import { ApiProductsResponse, Product } from '@/types/cart';
import { getNormalizedProduct } from '@/utils';
import { Locale } from '@/config/locales';

const PRODUCTS_API = 'https://v0-api-endpoint-request.vercel.app/api/products';
const MORE_PRODUCTS_API = 'https://v0-api-endpoint-request.vercel.app/api/more-products';

export const getProducts = async (locale: Locale = 'uk'): Promise<Product[]> => {
  const res = await fetch(PRODUCTS_API, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ApiProductsResponse = await res.json();
  return data.products.map(product => getNormalizedProduct(product, locale));
}

export const getMoreProducts = async (locale: Locale = 'uk'): Promise<Product[]> => {
  const res = await fetch(MORE_PRODUCTS_API, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch more products');
  }

  const data: ApiProductsResponse = await res.json();
  return data.products.map(p => getNormalizedProduct(p, locale));
}
