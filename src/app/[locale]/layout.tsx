import { notFound } from 'next/navigation';
import { isValidLocale, getLocaleConfig, SUPPORTED_LOCALES } from '@/config/locales';
import { Header } from '@/components/Header/Header';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) return {};
  const localeConfig = getLocaleConfig(params.locale);
  return {
    title: localeConfig.storeName,
    description: localeConfig.storeName,
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const localeConfig = getLocaleConfig(params.locale);

  return (
    <>
      <Header locale={params.locale} />
      <div lang={localeConfig.lang}>
        {children}
      </div>
    </>
  );
}
