'use client';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Locale, getLocaleConfig } from '@/config/locales';
import { useCart } from '@/hooks/useCart';
import { usePanel } from '@/hooks/usePanel';
import { formatItemCount } from '@/utils';
import { CartItemRow } from '@/components/ui';
import styles from './Cart.module.css';

export const Cart = ({ locale }: { locale: Locale }) => {
  const { items, totalCount, removeItem, addToCart, decrementItem } = useCart();
  const localeConfig = getLocaleConfig(locale);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { open, toggle, close, panelRef } = usePanel(btnRef);

  const panel = open && (
    <>
      <div className={styles.overlay} onClick={close} aria-hidden="true" />
      <div className={styles.panel} ref={panelRef} role="dialog" aria-label={localeConfig.basketLabel} aria-modal="true">
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>{localeConfig.basketLabel}</span>
          <span className={styles.panelHeaderQty}>{localeConfig.quantityLabel}</span>
          <button className={styles.closeBtn} onClick={close} aria-label="Close basket">×</button>
        </div>
        {items.length === 0 ? (
          <p className={styles.empty} role="status">{localeConfig.emptyBasketMessage}</p>
        ) : (
          <>
            <ul className={styles.itemList} aria-label="Basket items">
              {items.map(item => (
                <li key={item.name} className={styles.item}>
                  <CartItemRow item={item} onIncrement={addToCart} onDecrement={decrementItem} onRemove={removeItem} />
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <span className={styles.total} aria-live="polite">{formatItemCount(totalCount)}</span>
              <Link href={`/${locale}/checkout`} className={styles.checkoutLink} onClick={close}>
                Proceed to {localeConfig.checkoutHeading}
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <button ref={btnRef} className={styles.basket} onClick={toggle} aria-label={`${localeConfig.basketLabel}, ${totalCount} items`} aria-expanded={open} aria-haspopup="dialog">
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {totalCount > 0 && <span className={styles.badge} aria-hidden="true">{totalCount}</span>}
      </button>
      {typeof document !== 'undefined' && panel && createPortal(panel, document.body)}
    </div>
  );
}
