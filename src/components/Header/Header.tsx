'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Locale, getLocaleConfig } from '@/config/locales';
import styles from './Header.module.css';

const Cart = dynamic(() => import('@/components/Cart/Cart').then(mod => mod.Cart), {
  ssr: false,
});

interface HeaderProps {
  locale: Locale;
}

export const Header = ({ locale }: HeaderProps) => {
  const localeConfig = getLocaleConfig(locale);

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <header className={styles.header} role="banner">
        <nav aria-label="Main">
          <Link href={`/${locale}`} className={styles.storeName}>{localeConfig.storeName}</Link>
        </nav>
        <Cart locale={locale} />
      </header>
      <div className={styles.spacer} />
    </>
  );
}
