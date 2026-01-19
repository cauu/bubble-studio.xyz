import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale + '/'}products`;

  return {
    title: t('seo.products.title'),
    description: t('seo.products.description'),
    openGraph: {
      title: t('seo.products.title'),
      description: t('seo.products.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale: locale,
      images: [
        {
          url: `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: t('seo.siteName')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.products.title'),
      description: t('seo.products.description'),
      images: [`${baseUrl}/og-default.png`]
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/products`,
        'zh': `${baseUrl}/zh/products`,
        'tw': `${baseUrl}/tw/products`
      }
    }
  };
}

export default async function Products({ params: { locale } }: Props) {
  const t = await getTranslations();

  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="relative z-10 py-4 md:py-8 px-4 md:px-6">
          <div className="mx-auto text-center">
            <h1 className="text-2xl md:text-5xl font-black mb-2">
              <div className="candy-gradient text-transparent !bg-clip-text">{t('products.title')}</div>
            </h1>
            <p className="text-sm md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('products.description')}
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-4 md:py-8 px-4 md:px-6">
          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* VODA Product Card */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">V</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-1 md:mb-2">
                    {t('products.voda.name')}
                  </h3>
                  <p className="text-sky-500 font-bold text-center mb-2 md:mb-3 text-sm md:text-base">
                    {t('products.voda.fullName')}
                  </p>
                  <p className="text-gray-600 text-center text-xs md:text-sm mb-4 md:mb-6 flex-grow">
                    {t('products.voda.description')}
                  </p>
                  <a
                    href="https://gov.bubble-studio.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold py-2 md:py-3 px-4 rounded-xl text-sm md:text-base text-center transition-all duration-300 hover:shadow-lg"
                  >
                    {t('products.voda.linkText')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
