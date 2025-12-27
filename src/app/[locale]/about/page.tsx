import React from 'react';
import { getTranslations } from 'next-intl/server';

export default async function About() {
  const t = await getTranslations();

  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="relative z-10 py-4 md:py-8 px-4 md:px-6">
          <div className="mx-auto text-center">
            <h1 className="text-2xl md:text-5xl font-black mb-2">
              <div className="candy-gradient text-transparent !bg-clip-text">{t('about.title1')}</div>
              <div className="text-gray-800 mt-1 md:mt-2">{t('about.title2')}</div>
            </h1>
            <p className="text-sm md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{t('about.title3')}</p>
          </div>
        </section>

        {/* Dream Section */}
        <section className="py-4 md:py-8 px-4 md:px-6">
          <div className="mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg md:shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-lg md:text-3xl font-bold text-gray-800 mb-3 md:mb-6 text-center">
                {t('about.ourDreams.title')}
              </h2>
              <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p className="text-xs md:text-base">{t('about.ourDreams.description')}</p>
                <div className="grid grid-cols-2 gap-3 md:gap-4 my-4 md:my-6">
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">🤖</div>
                    <h3 className="font-bold text-sm md:text-base mb-1 text-gray-800">{t('about.ourDreams.column1.title')}</h3>
                    <p className="text-[10px] md:text-xs text-gray-600 line-clamp-3 md:line-clamp-none">{t('about.ourDreams.column1.description')}</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">💎</div>
                    <h3 className="font-bold text-sm md:text-base mb-1 text-gray-800">{t('about.ourDreams.column2.title')}</h3>
                    <p className="text-[10px] md:text-xs text-gray-600 line-clamp-3 md:line-clamp-none">{t('about.ourDreams.column2.description')}</p>
                  </div>
                </div>
                <p className="text-xs md:text-base">{t('about.ourDreams.vision')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-4 md:py-8 px-4 md:px-6">
          <div className="mx-auto">
            <div className="text-center mb-4 md:mb-8">
              <h2 className="text-lg md:text-3xl font-black text-gray-800 mb-1 md:mb-2">{t('about.ourTeam.title')}</h2>
              <p className="text-sm md:text-lg text-gray-600">{t('about.ourTeam.description')}</p>
            </div>

            {/* 移动端：横向滚动卡片 */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {/* Martin */}
                <div className="flex-shrink-0 w-[70vw] snap-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg h-full">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center">
                      <span className="text-2xl">👨‍💻</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 text-center mb-0.5">{t('about.ourTeam.martin.name')}</h3>
                    <p className="text-blue-500 font-bold text-center mb-1.5 text-xs">{t('about.ourTeam.martin.title')}</p>
                    <p className="text-gray-600 text-center text-[10px] line-clamp-3">{t('about.ourTeam.martin.description')}</p>
                  </div>
                </div>

                {/* Yoyo */}
                <div className="flex-shrink-0 w-[70vw] snap-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg h-full">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center">
                      <span className="text-2xl">👩‍🎨</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 text-center mb-0.5">{t('about.ourTeam.yoyo.name')}</h3>
                    <p className="text-sky-500 font-bold text-center mb-1.5 text-xs">{t('about.ourTeam.yoyo.title')}</p>
                    <p className="text-gray-600 text-center text-[10px] line-clamp-3">{t('about.ourTeam.yoyo.description')}</p>
                  </div>
                </div>

                {/* Paopao */}
                <div className="flex-shrink-0 w-[70vw] snap-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg h-full">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <span className="text-2xl">🐾</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 text-center mb-0.5">{t('about.ourTeam.paopao.name')}</h3>
                    <p className="text-cyan-500 font-bold text-center mb-1.5 text-xs">{t('about.ourTeam.paopao.title')}</p>
                    <p className="text-gray-600 text-center text-[10px] line-clamp-3">{t('about.ourTeam.paopao.description')}</p>
                  </div>
                </div>
              </div>
              {/* 滚动指示器 */}
              <div className="flex justify-center gap-1.5 mt-2">
                <div className="w-6 h-1 rounded-full bg-sky-400"></div>
                <div className="w-1.5 h-1 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* 桌面端：网格布局 */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
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
        <footer className="py-4 md:py-8 px-4 md:px-6">
          <div className="mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg md:shadow-xl text-center">
              <div className="flex items-center justify-center space-x-2 mb-2 md:mb-3">
                <span className="text-base md:text-lg font-black text-gray-800">Bubble Studio</span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">{t('about.slogan')}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
