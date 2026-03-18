import { memo } from 'react';
import Image from 'next/image';
import { Product } from '@/types/cart';
import { Locale, getLocaleConfig } from '@/config/locales';
import { formatPrice } from '@/utils';
import styles from './ProductListItem.module.css';

interface Props {
  product: Product;
  onAddToBasket: (name: string) => void;
  locale: Locale;
  priority?: boolean;
}

export const ProductListItem = memo(function ProductListItem({ product, onAddToBasket, locale, priority }: Props) {
  const localeConfig = getLocaleConfig(locale);

  return (
    <article className={styles.item} role="listitem" aria-label={`${product.name}, ${formatPrice(product.price, locale)}`}>
      <div className={styles.imageWrapper}>
        <Image src={product.image} alt={product.name} width={400} height={300} className={styles.image} priority={priority} />
        <button
          className={styles.cta}
          onClick={() => onAddToBasket(product.name)}
          aria-label={`${localeConfig.addToCart}: ${product.name}`}
        >
          {localeConfig.addToCart}
        </button>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{product.name}</span>
        <span className={styles.price} aria-label={`Price: ${formatPrice(product.price, locale)}`}>
          {formatPrice(product.price, locale)}
        </span>
      </div>
    </article>
  );
});
