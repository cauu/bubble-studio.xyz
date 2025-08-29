import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
// import { Layers } from 'lucide-react';

export const NavBar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      {
        text: t('header.governance'),
        path: '/governance'
      },
      {
        text: t('header.staking'),
        path: '/staking'
      },
      {
        text: t('header.about'),
        path: '/about'
      }
    ],
    [t]
  );

  const path = router.asPath;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <div className="w-full h-full">
    <nav className="shadow-md md:card bg-white p-4 flex items-center justify-between mb-6 relative">
      <div className="flex items-center">
        <Link href="/" className="text-3xl title-font items-center text-[#0a2463] flex">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <circle cx="20" cy="20" r="18" fill="#d6e4ff" stroke="#0a2463" strokeWidth="4" />
            <circle cx="20" cy="20" r="8" fill="#3f8efc" stroke="#0a2463" strokeWidth="4" />
          </svg>
          <span className="text-xl md:text-3xl">Bubble Studio</span>
        </Link>

        {/* 桌面端导航菜单 */}
        <div className="hidden md:flex space-x-6 ml-10">
          {navItems.map((item) => {
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx('font-bold text-[#0a2463]', {
                  'text-[#3f8efc]': item.path === path
                })}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 桌面端语言选择器 */}
      <div className="hidden md:flex items-center mr-4">
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-[#0a2463]" />
          <select
            className="border-2 border-[#0a2463] rounded-md p-1 text-[#0a2463] font-bold bg-white cursor-pointer"
            value={router.locale}
            onChange={(e) => {
              const locale = e.target.value;
              router.push(router.asPath, router.asPath, { locale });
            }}
          >
            <option value="zh">简体中文</option>
            <option value="tw">繁體中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* 移动端菜单按钮 */}
      <button className="md:hidden text-[#0a2463]" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 移动端下拉菜单 */}
      <div
        className={clsx(
          'md:hidden absolute top-full left-0 right-0 bg-white z-50 shadow-lg p-4 flex flex-col space-y-4 transition-all duration-300 ease-in-out border-t',
          {
            'opacity-100 translate-y-0': isMenuOpen,
            'opacity-0 -translate-y-4 pointer-events-none': !isMenuOpen
          }
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={clsx('font-bold text-[#0a2463] py-2 transition-colors duration-200 hover:text-[#3f8efc]', {
              'text-[#3f8efc]': item.path === path
            })}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.text}
          </Link>
        ))}

        {/* 移动端语言选择器 */}
        <div className="flex items-center gap-2 py-2 border-t border-gray-200 mt-2 pt-4">
          <Globe size={20} className="text-[#0a2463]" />
          <select
            className="border-2 border-[#0a2463] rounded-md p-1 text-[#0a2463] font-bold bg-white cursor-pointer w-full transition-colors duration-200 hover:border-[#3f8efc] focus:border-[#3f8efc] outline-none"
            value={router.locale}
            onChange={(e) => {
              const locale = e.target.value;
              router.push(router.asPath, router.asPath, { locale });
              setIsMenuOpen(false);
            }}
          >
            <option value="zh">简体中文</option>
            <option value="tw">繁體中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
    // </div>
  );
};
