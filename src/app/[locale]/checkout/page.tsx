'use client';

import { useParams } from 'next/navigation';
import { Checkout } from '@/screens/Checkout/Checkout';
import { isValidLocale } from '@/config/locales';

export default function CheckoutPage() {
  const { locale } = useParams();
  const localeStr = Array.isArray(locale) ? locale[0] : locale ?? 'uk';
  const validLocale = isValidLocale(localeStr) ? localeStr : 'uk';

  return <Checkout locale={validLocale} />;
}
