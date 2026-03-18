'use client';

import dynamic from 'next/dynamic';
import { Product } from '@/types/cart';
import { Locale } from '@/config/locales';

const MoreProducts = dynamic(() => import('./MoreProducts').then(mod => mod.MoreProducts), {
  ssr: false,
});

interface Props {
  products: Product[];
  locale: Locale;
}

export const MoreProductsClient = ({ products, locale }: Props) => {
  return <MoreProducts products={products} locale={locale} />;
}
