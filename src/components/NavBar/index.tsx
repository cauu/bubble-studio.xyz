'use client';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Globe } from 'lucide-react';

export const NavBar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      {
        text: t('header.staking'),
        path: '/staking',
        isActive: router.asPath === '/staking'
      },
      {
        text: t('header.blogs'),
        path: '/blogs',
        isActive: router.asPath === '/blogs'
      },
      {
        text: t('header.about'),
        path: '/about',
        isActive: router.asPath === '/about'
      }
    ],
    [t, router.asPath]
  );


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-50 m-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-8 h-8 candy-gradient rounded-full shadow-lg"></div>
              <span className="text-xl font-bold text-gray-800 wiggle">Bubble Studio</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.path}
                    href={item.path}
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

          <div className="hidden md:flex items-center">
            <div className="relative">
              <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-10" />
              <select
                className="candy-gradient text-white font-bold rounded-full pl-10 pr-6 py-2 shadow-lg hover-grow cursor-pointer appearance-none border-none outline-none transition-all"
                value={router.locale}
                onChange={(e) => {
                  const locale = e.target.value;
                  router.push(router.asPath, router.asPath, { locale });
                }}
              >
                <option value="zh" className="text-gray-800 bg-white">简体中文</option>
                <option value="tw" className="text-gray-800 bg-white">繁體中文</option>
                <option value="en" className="text-gray-800 bg-white">English</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav >
  )
};