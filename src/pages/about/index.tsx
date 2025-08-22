import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common']);

  const a = [123];

  return {
    props: {
      ...translations
    }
  }
}

export default function About() {
  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative z-10 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <div className="candy-gradient text-transparent !bg-clip-text">你好呀！👋</div>
              <div className="text-gray-800 mt-2">我们是 Bubble Studio!</div>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              一个在 Cardano 上生根发芽的小家庭作坊
            </p>
          </div>
        </section>

        {/* Dream Section */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                我们的梦想 ✨
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-sm md:text-base">
                  在我们看来，未来属于那些能掌握自己节奏的人——主权个人。
                  而这个时代，给了我们两份最棒的礼物：AI 和 Cardano。
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-2xl">
                    <div className="text-3xl mb-2">🤖</div>
                    <h3 className="font-bold text-base mb-1 text-gray-800">AI 的力量</h3>
                    <p className="text-xs text-gray-600">创造力的"外挂"，小团队也能做很多事。</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-2xl">
                    <div className="text-3xl mb-2">💎</div>
                    <h3 className="font-bold text-base mb-1 text-gray-800">Cardano 生态</h3>
                    <p className="text-xs text-gray-600">金融独立与自由的护城河。</p>
                  </div>
                </div>
                <p className="text-sm md:text-base">
                  我们希望，小作坊能扎根Cardano生态，靠着 Staking 和去中心化治理的力量，保持独立、长久地运行下去，同时不断探索Cardano的能力边界，为社区带来有趣、优雅、实用的产品。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
                我们的团队 👨‍💻👩‍💻🐾
              </h2>
              <p className="text-lg text-gray-600">小而美的家庭作坊</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Martin */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Martin</h3>
                  <p className="text-blue-500 font-bold text-center mb-2 text-sm">开发</p>
                  <p className="text-gray-600 text-center text-xs">折腾代码是日常</p>
                </div>
              </div>

              {/* Yoyo */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center">
                    <span className="text-4xl">👩‍🎨</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Yoyo</h3>
                  <p className="text-sky-500 font-bold text-center mb-2 text-sm">设计师</p>
                  <p className="text-gray-600 text-center text-xs">把想法画成温暖的样子</p>
                </div>
              </div>

              {/* Paopao */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="text-4xl">🐾</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Paopao</h3>
                  <p className="text-cyan-500 font-bold text-center mb-2 text-sm">吉祥物</p>
                  <p className="text-gray-600 text-center text-xs">卖萌和打断工作的专家</p>
                </div>
              </div>

              {/* Andy */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <span className="text-4xl">🤝</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Andy</h3>
                  <p className="text-blue-600 font-bold text-center mb-2 text-sm">参与和支持</p>
                  <p className="text-gray-600 text-center text-xs">默默支持的后盾</p>
                </div>
              </div>

              {/* Anna */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                    <span className="text-4xl">💖</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Anna</h3>
                  <p className="text-sky-500 font-bold text-center mb-2 text-sm">参与和支持</p>
                  <p className="text-gray-600 text-center text-xs">温暖陪伴的伙伴</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full shadow-lg"></div>
                <span className="text-lg font-black text-gray-800">Bubble Studio</span>
              </div>
              <p className="text-gray-600 text-sm">扎根 Cardano 的小家庭作坊 💝</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}