import React from 'react';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default async function About({ params: { locale } }: Props) {
  const t = await getTranslations();

  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="relative z-10 py-8 px-6">
          <div className="mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <div className="candy-gradient text-transparent !bg-clip-text">{t('about.title1')}</div>
              <div className="text-gray-800 mt-2">{t('about.title2')}</div>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{t('about.title3')}</p>
          </div>
        </section>

        {/* Dream Section */}
        <section className="py-8 px-6">
          <div className="mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                {t('about.ourDreams.title')}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-sm md:text-base">{t('about.ourDreams.description')}</p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-2xl">
                    <div className="text-3xl mb-2">🤖</div>
                    <h3 className="font-bold text-base mb-1 text-gray-800">{t('about.ourDreams.column1.title')}</h3>
                    <p className="text-xs text-gray-600">{t('about.ourDreams.column1.description')}</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-2xl">
                    <div className="text-3xl mb-2">💎</div>
                    <h3 className="font-bold text-base mb-1 text-gray-800">{t('about.ourDreams.column2.title')}</h3>
                    <p className="text-xs text-gray-600">{t('about.ourDreams.column2.description')}</p>
                  </div>
                </div>
                <p className="text-sm md:text-base">{t('about.ourDreams.vision')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-8 px-6">
          <div className="mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">{t('about.ourTeam.title')}</h2>
              <p className="text-lg text-gray-600">{t('about.ourTeam.description')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
              {/* Martin */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">{t('about.ourTeam.martin.name')}</h3>
                  <p className="text-blue-500 font-bold text-center mb-2 text-sm">{t('about.ourTeam.martin.title')}</p>
                  <p className="text-gray-600 text-center text-xs">{t('about.ourTeam.martin.description')}</p>
                </div>
              </div>

              {/* Yoyo */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center">
                    <span className="text-4xl">👩‍🎨</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">{t('about.ourTeam.yoyo.name')}</h3>
                  <p className="text-sky-500 font-bold text-center mb-2 text-sm">{t('about.ourTeam.yoyo.title')}</p>
                  <p className="text-gray-600 text-center text-xs">{t('about.ourTeam.yoyo.description')}</p>
                </div>
              </div>

              {/* Paopao */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="text-4xl">🐾</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">{t('about.ourTeam.paopao.name')}</h3>
                  <p className="text-cyan-500 font-bold text-center mb-2 text-sm">{t('about.ourTeam.paopao.title')}</p>
                  <p className="text-gray-600 text-center text-xs">{t('about.ourTeam.paopao.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6">
          <div className="mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full shadow-lg"></div>
                <span className="text-lg font-black text-gray-800">Bubble Studio</span>
              </div>
              <p className="text-gray-600 text-sm">{t('about.slogan')}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
