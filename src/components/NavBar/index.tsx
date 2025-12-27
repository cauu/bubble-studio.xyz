'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { GlobalConfig } from '@/constants';
import { Telegram, X } from '../Icons';

export const NavBar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      text: t('header.staking'),
      path: `/staking`,
      isActive: pathname.endsWith('/staking')
    },
    {
      text: t('header.blogs'),
      path: `/blogs`,
      isActive: pathname.endsWith('/blogs')
    },
    {
      text: t('header.about'),
      path: `/about`,
      isActive: pathname.endsWith('/about')
    }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* 移动端：吸顶导航栏，无margin */}
      {/* 桌面端：保持原有浮动样式 */}
      <nav className="sticky top-0 z-50 md:relative md:m-6">
        <div className="bg-white/95 md:bg-white/80 backdrop-blur-sm md:rounded-full px-4 md:px-8 py-3 md:py-4 shadow-sm md:shadow-lg border-b border-gray-100 md:border-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-8">
              <Link href="/" className="flex items-center space-x-2 cursor-pointer" prefetch>
                <div className="w-10 h-10 md:w-16 md:h-16">
                  <img src={GlobalConfig.assetsUrl.bubbleLogo} alt="Bubble Studio Logo" className="w-full h-full" />
                </div>
                <span className="text-base md:text-xl font-bold text-gray-800 wiggle">Bubble Studio</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      prefetch
                      className={clsx('transition-colors font-medium', {
                        'text-sky-500 font-bold': item.isActive,
                        'text-gray-600 hover:text-sky-500': !item.isActive
                      })}
                    >
                      {item.text}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Social Media Links */}
              <div className="hidden md:flex items-center gap-1">
                <a
                  href={GlobalConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  title="Twitter"
                >
                  <X className="w-5 h-5 text-gray-600 group-hover:text-sky-500 transition-colors" />
                </a>

                <a
                  href={GlobalConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  title="Telegram"
                >
                  <Telegram className="w-5 h-5 text-gray-600 group-hover:text-sky-500 transition-colors" />
                </a>
              </div>

              {/* 分隔线 */}
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>

              {/* LanguageSwitcher - 桌面端 */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* 汉堡菜单按钮 - 移动端 */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 侧边弹出菜单 - 移动端 */}
      <div
        className={clsx(
          'fixed inset-0 z-[99] md:hidden transition-opacity duration-300',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeMenu} />

        {/* 侧边栏 */}
        <div
          className={clsx(
            'absolute top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-md shadow-2xl',
            'transform transition-transform duration-300 ease-out',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full p-6">
            {/* 关闭按钮 */}
            <div className="flex justify-end mb-8">
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 导航链接 */}
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  prefetch
                  onClick={closeMenu}
                  className={clsx(
                    'px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200',
                    item.isActive
                      ? 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-sky-500'
                  )}
                >
                  {item.text}
                </Link>
              ))}
            </div>

            {/* 分隔线 */}
            <div className="my-6 border-t border-gray-200" />

            {/* 语言切换 */}
            <div className="px-4">
              {/* <p className="text-sm text-gray-500 mb-3">{t('header.language') || 'Language'}</p> */}
              <LanguageSwitcher />
            </div>

            {/* 社交媒体链接 */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3 px-4">Follow Us</p>
              <div className="flex items-center gap-3 px-4">
                <a
                  href={GlobalConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-sky-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href={GlobalConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-100 hover:bg-sky-100 transition-colors"
                >
                  <Telegram className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
