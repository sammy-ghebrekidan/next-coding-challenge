'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Locale, getLocaleConfig } from '@/config/locales';
import { useCart } from '@/hooks/useCart';
import { formatItemCount } from '@/utils';
import { CheckoutItems } from '@/components/ui';
import styles from './Checkout.module.css';

interface EmptyBasketProps {
  locale: Locale;
  localeConfig: ReturnType<typeof getLocaleConfig>;
}

const EmptyBasket = ({ locale, localeConfig }: EmptyBasketProps) => {
  return (
    <main className={styles.main} aria-labelledby="checkout-heading">
      <h1 id="checkout-heading">{localeConfig.checkoutHeading}</h1>
      <div className={styles.empty} role="status">
        <p>{localeConfig.emptyBasketMessage}</p>
      </div>
      <Link href={`/${locale}`} className={styles.emptyBackLink}>{localeConfig.continueShopping}</Link>
    </main>
  );
}

export const Checkout = ({ locale }: { locale: Locale }) => {
  const { items, totalCount, removeItem, addToCart, decrementItem } = useCart();
  const localeConfig = useMemo(() => getLocaleConfig(locale), [locale]);

  if (items.length === 0) {
    return <EmptyBasket locale={locale} localeConfig={localeConfig} />;
  }

  return (
    <main className={styles.main} aria-labelledby="checkout-heading">
      <h1 id="checkout-heading">{localeConfig.checkoutHeading}</h1>
      <CheckoutItems
        items={items}
        heading={localeConfig.checkoutHeading}
        quantityLabel={localeConfig.quantityLabel}
        onIncrement={addToCart}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
      <div className={styles.belowTable}>
        <Link href={`/${locale}`} className={styles.backLink}>{localeConfig.continueShopping}</Link>
      </div>
      <div className={styles.total} aria-live="polite" aria-atomic="true">
        {localeConfig.totalLabel}: {formatItemCount(totalCount)}
      </div>
    </main>
  );
}
