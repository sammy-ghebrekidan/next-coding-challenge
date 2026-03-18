import { Product } from '@/types/cart';
import { Locale } from '@/config/locales';
import { ProductListItem } from '@/components/ui';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  onAddToBasket: (productName: string) => void;
  locale: Locale;
  compact?: boolean;
}

export const ProductList = ({ products, onAddToBasket, locale, compact }: ProductListProps) => {
  return (
    <div className={compact ? styles.compactList : styles.list} role="list" aria-label="Products">
      {products.map((product, index) => (
        <ProductListItem
          key={product.id}
          product={product}
          onAddToBasket={onAddToBasket}
          locale={locale}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
