import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useMemo, useState } from 'react';

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

          <button className="px-6 py-2 candy-gradient text-white rounded-full shadow-lg hover-grow font-bold">
            连接钱包
          </button>
        </div>
      </div>
    </nav>
  )
};