'use client';

import { Product } from '@/types/cart';
import { Locale, getLocaleConfig } from '@/config/locales';
import { useCart } from '@/hooks/useCart';
import { formatItemCount } from '@/utils';
import { ProductList } from '@/components/ProductList/ProductList';
import styles from './ProductListing.module.css';

interface ProductListingProps {
  products: Product[];
  locale: Locale;
}

export const ProductListing = ({ products, locale }: ProductListingProps) => {
  const { addToCart } = useCart();
  const localeConfig = getLocaleConfig(locale);

  return (
    <div className={styles.section}>
      <h1 className={styles.heading}>{localeConfig.productsHeading}</h1>
      <p className={styles.description}>{localeConfig.productsDescription}</p>
      <span className={styles.count}>{formatItemCount(products.length)}</span>
      <ProductList products={products} onAddToBasket={addToCart} locale={locale} />
    </div>
  );
}
