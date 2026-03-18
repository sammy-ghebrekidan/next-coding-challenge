'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { Product } from '@/types/cart';
import { Locale, getLocaleConfig } from '@/config/locales';
import { useCart } from '@/hooks/useCart';
import { formatItemCount } from '@/utils';
import { ProductListItem } from '@/components/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from './MoreProducts.module.css';

interface Props {
  products: Product[];
  locale: Locale;
}

export const MoreProducts = ({ products, locale }: Props) => {
  const { addToCart } = useCart();
  const localeConfig = getLocaleConfig(locale);
  const swiperRef = useRef<SwiperType | null>(null);
  const [navState, setNavState] = useState({ isBeginning: true, isEnd: false });

  const onUpdate = useCallback((s: SwiperType) => setNavState({ isBeginning: s.isBeginning, isEnd: s.isEnd }), []);
  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const canScroll = useMemo(() => !navState.isBeginning || !navState.isEnd, [navState]);

  return (
    <section className={styles.section} aria-labelledby="more-products-heading">
      <div className={styles.header}>
        <h2 id="more-products-heading" className={styles.heading}>{localeConfig.moreProductsHeading}</h2>
        <div className={styles.headerRight}>
          <span className={styles.count} aria-label={`${products.length} products available`}>{formatItemCount(products.length)}</span>
          {canScroll && (
            <div className={styles.arrows} role="group" aria-label="Carousel navigation">
              <button
                className={`${styles.arrow} ${navState.isBeginning ? styles.disabled : ''}`}
                onClick={handlePrev}
                disabled={navState.isBeginning}
                aria-label="Previous products"
              >&#8249;</button>
              <button
                className={`${styles.arrow} ${navState.isEnd ? styles.disabled : ''}`}
                onClick={handleNext}
                disabled={navState.isEnd}
                aria-label="Next products"
              >&#8250;</button>
            </div>
          )}
        </div>
      </div>
      <Swiper
        onSwiper={s => { swiperRef.current = s; onUpdate(s); }}
        onSlideChange={onUpdate}
        onResize={onUpdate}
        modules={[FreeMode, Navigation]}
        freeMode
        grabCursor
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{ 701: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
        aria-label="Product carousel"
      >
        {products.map(p => (
          <SwiperSlide key={p.id}>
            <ProductListItem product={p} onAddToBasket={addToCart} locale={locale} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
