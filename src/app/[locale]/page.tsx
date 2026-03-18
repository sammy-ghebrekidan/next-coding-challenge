import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProducts } from '@/services/products';
import { ProductListing } from '@/screens/PLP/ProductListing';
import { MoreProductsLoader } from '@/components/MoreProducts/MoreProductsLoader';
import { isValidLocale } from '@/config/locales';
import styles from '@/screens/PLP/ProductListing.module.css';

export default async function LocalePage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const products = await getProducts(params.locale);

  return (
    <main className={styles.main} id="main-content">
      <ProductListing products={products} locale={params.locale} />
      <Suspense fallback={<p className={styles.loading}>Loading more products...</p>}>
        <MoreProductsLoader locale={params.locale} />
      </Suspense>
    </main>
  );
}
