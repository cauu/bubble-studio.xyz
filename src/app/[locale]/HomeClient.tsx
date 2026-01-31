'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PostData } from '@/lib/posts';
import { BlogCard } from '@/components/blogs/BlogCard';
import { useRouter } from '@/i18n/navigation';

// SVG Icons
const PoolIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const GovernanceIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ProductIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6v6H9z" />
  </svg>
);

type Props = {
  latestPosts: PostData[];
};

export function HomeClient({ latestPosts }: Props) {
  const t = useTranslations();
  const router = useRouter();

  const handlePostClick = (post: PostData) => {
    router.push(`/blogs/${post.slug}`);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-4">Bubble Studio</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-6">{t('home.subtitle')}</p>
        <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">{t('home.description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#philosophy"
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg transition-shadow"
          >
            {t('common.learnMore')}
          </a>
          <Link
            href="/staking"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-500 transition-colors"
          >
            {t('header.staking')}
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-12 md:py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            {t('home.philosophy.title')}
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <p>{t('home.philosophy.paragraph1')}</p>
            <p>{t('home.philosophy.paragraph2')}</p>
            <p className="font-medium text-gray-800">{t('home.philosophy.paragraph3')}</p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">{t('home.whatWeDo.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pao Pool */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center text-sky-500 mb-4">
              <PoolIcon />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t('home.whatWeDo.paoPool.title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('home.whatWeDo.paoPool.description')}</p>
          </div>

          {/* Governance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center text-sky-500 mb-4">
              <GovernanceIcon />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t('home.whatWeDo.governance.title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('home.whatWeDo.governance.description')}</p>
          </div>

          {/* Products */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center text-sky-500 mb-4">
              <ProductIcon />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t('home.whatWeDo.products.title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('home.whatWeDo.products.description')}</p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 md:py-16">
        <div className="bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('home.support.title')}</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">{t('home.support.description')}</p>
          <Link
            href="/staking"
            className="inline-block px-8 py-3 bg-white text-sky-500 font-medium rounded-full hover:shadow-lg transition-shadow"
          >
            {t('home.support.button')}
          </Link>
        </div>
      </section>

      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            {t('home.latestPosts.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} onClick={handlePostClick} />
            ))}
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('home.team.title')}</h2>
          <p className="text-gray-600">{t('home.team.description')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Martin */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">M</span>
            </div>
            <h3 className="font-bold text-gray-800">{t('home.team.martin.name')}</h3>
            <p className="text-sm text-gray-500">{t('home.team.martin.role')}</p>
          </div>

          {/* Yoyo */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">Y</span>
            </div>
            <h3 className="font-bold text-gray-800">{t('home.team.yoyo.name')}</h3>
            <p className="text-sm text-gray-500">{t('home.team.yoyo.role')}</p>
          </div>

          {/* Paopao */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-2xl">🐾</span>
            </div>
            <h3 className="font-bold text-gray-800">{t('home.team.paopao.name')}</h3>
            <p className="text-sm text-gray-500">{t('home.team.paopao.role')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
