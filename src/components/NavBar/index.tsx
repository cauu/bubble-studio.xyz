'use client';

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

  return (
    <nav className="relative z-50 m-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer" prefetch>
              <div className="w-16 h-16">
                <img src={GlobalConfig.assetsUrl.bubbleLogo} alt="Bubble Studio Logo" />
              </div>
              <span className="text-xl font-bold text-gray-800 wiggle">Bubble Studio</span>
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

          <div className="flex items-center gap-4">
            {/* Social Media Links */}
            <div className="flex items-center gap-1">
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

            {/* LanguageSwitcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
